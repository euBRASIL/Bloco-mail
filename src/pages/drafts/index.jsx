import React, { useEffect, useState, useCallback, useRef } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, useHistory } from "react-router-dom";
// https://github.com/onderonur/react-infinite-scroll-hook
import useInfiniteScroll from "react-infinite-scroll-hook";
import { fromJS } from "immutable";

import { CanisterIds, http, transformPrincipalId } from "@/api/index";
import { useLoadItems, setFavorites } from "./utils";
import { batchRealDelete } from "../inbox/fetch";
import { MenuTabs, getDelList, getUpdateList, batchAction, useMenuChecked, useFetchData, useSetFocusLineStyle } from '../inbox/utils'
import { Root, Left, Menus, SearchActions, List } from "../inbox/css";

import Container from "@/components/container";
import SearchBar from "@/components/layout/searchBar";
import EmailDraftItem from "@/components/emails/emailsDraft";
import ContentDraft from "@/components/emails/contentDraft";
import PageEmpty from "@/components/empty";
import { Loading } from "@/components/Loading";

const Index = ({ store }) => {
  const { bindedNft, principalId, getMyNftList } = store.common;
  const [resetData, setResetData] = useState(null);
  const [attach, setAttach] = useState([]);
  const [currentEmailIndex, setCurrentEmailIndex] = useState(-1);
  const [detailLoading, setDetailLoading] = useState(false)

  const getAttachList = async (params) => {
    const res = await http(CanisterIds.bucket, "query_attachment_by_id", [
      transformPrincipalId(principalId),
      0,
    ]);

    if (res?.Ok) {
      setAttach(res.Ok);
    } else {
    }
    // return res
  };

  // load more when scroll
  const {
    loading: queryMenusLoading,
    items: menuList,
    setItems: setMenuList,
    hasNextPage,
    error: queryMenusError,
    loadMore,
  } = useLoadItems(resetData);

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading: queryMenusLoading,
    hasNextPage,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!queryMenusError,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: "0px 0px 400px 0px",
  });

  const onRealDelete = async (current, ev = null) => {
    batchAction(menuList, setMenuList, current, true, async (params) => await batchRealDelete(params), getDelList, ev)
  };

  const querySessionById = async (index, item, e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }

    setCurrentEmailIndex(index);
    setDetailLoading(true)
    try {
      await getAttachList(index);
    } catch (error) {
      //
    }
    setDetailLoading(false)
  };

  const {
    collected,
    _setCollected,
    allChecked, 
    setAllChecked,
    onCheckbox,
  } = useMenuChecked(menuList, setMenuList, (menuList) => menuList.filter(({ checked }) => !!checked))

  const {
    currentMenu, 
    currentMenuChange
  } = useFetchData(_setCollected, setAllChecked, setResetData, loadMore, principalId)

  const { focusLineRef, menusRef } = useSetFocusLineStyle(currentMenu)

  return (
    <Container refs={rootRef}>
      <SearchBar>
        <SearchActions>
          <div className="chunk">
            <div
              className={`checkbox ${allChecked ? "checked" : ""}`}
              onClick={onCheckbox("multi", !allChecked)}
            ></div>
            {/* <div className="unread" onClick={() => setReadOrUnread(false)}></div> */}
            {/* <div className="read" onClick={() => setReadOrUnread(true)}></div> */}
          </div>
          <div className="chunk">
            <div
              className="realdelete"
              onClick={() => onRealDelete("multi")}
            ></div>
          </div>
          {/* <div className="chunk"> */}
          {/* <div className="undelete" onClick={() => onUnDelete('all')}></div> */}
          {/* <div className="report" onClick={() => onSpam('all')}></div> */}
          {/* </div> */}
        </SearchActions>
      </SearchBar>
      <Root>
        <Left>
          <List>
            <ul>
              {/* {console.log("menuList", menuList)} */}
              {menuList.map((item, index) => {
                // console.log("item111: ", item, item[0]);
                return (
                  <EmailDraftItem
                    key={index}
                    index={index}
                    data={item}
                    detailLoading={detailLoading}
                    viewDetail={querySessionById}
                    onCheckbox={onCheckbox}
                  />
                );
              })}
            </ul>
            {hasNextPage && (
              <div ref={infiniteRef}>
                {queryMenusLoading ? <Loading /> : ""}
              </div>
            )}
          </List>
        </Left>
        {!menuList.length ? (
          <PageEmpty />
        ) : (
          <ContentDraft 
            loading={detailLoading}
            data={menuList[currentEmailIndex]} 
            attach={attach} 
          />
        )}
      </Root>
    </Container>
  );
};

export default withRouter(inject("store")(observer(Index)));
