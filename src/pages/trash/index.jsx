import React, { useEffect, useState, useCallback, useRef } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, useHistory } from "react-router-dom";
// https://github.com/onderonur/react-infinite-scroll-hook
import useInfiniteScroll from "react-infinite-scroll-hook";
import { fromJS } from "immutable";

import { CanisterIds, http, transformPrincipalId } from "@/api/index";
import { useLoadItems, setFavorites } from "./utils";
import { setRead, batchRealDelete, batchDelete, batchSpam } from "../inbox/fetch";
import { MenuTabs, getDelList, getUpdateList, batchAction, useMenuChecked, useFetchData, useSetFocusLineStyle } from '../inbox/utils'
import { Root, Left, Menus, SearchActions, List } from "../inbox/css";

import Container from "@/components/container";
import SearchBar from "@/components/layout/searchBar";
import EmailItem from "@/components/emails/emails";
import Content from "@/components/emails/content";
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
    batchAction(menuList, setMenuList, current, bindedNft?.emailName, async (params) => await batchRealDelete(params), getDelList, ev)
  };

  const onUnDelete = async (current, ev = null) => {
    batchAction(menuList, setMenuList, current, bindedNft?.emailName, async (params) => await batchDelete(params, false), getDelList, ev)
  };

  const onSpam = async (current, ev = null) => {
    batchAction(menuList, setMenuList, current, bindedNft?.emailName, async (params) => await batchSpam(params), getDelList, ev)
  };

  const setReadOrUnread = async (value, current = null, ev = null) => {
    batchAction(menuList, setMenuList, current, bindedNft?.emailName, async (params) => await setRead(value, params), getUpdateList(value, 'first_recipient_read'), ev)
  };

  const setCollected = async (value, current = null, ev = null) => {
    batchAction(menuList, setMenuList, current, bindedNft?.emailName, async (params) => await setFavorites(value, params), getUpdateList(value, 'first_recipient_favorites'), ev)
  };

  const querySessionById = async (index, item, e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    // set read
    if (!item[1]?.first_sender_read[0]) {
      setReadOrUnread(true, item);
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
  } = useMenuChecked(menuList, setMenuList)  

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
            <div
              className="unread"
              onClick={() => setReadOrUnread(false)}
            ></div>
            <div className="read" onClick={() => setReadOrUnread(true)}></div>
          </div>
          <div className="chunk">
            <div
              className="realdelete"
              onClick={() => onRealDelete("multi")}
            ></div>
          </div>
          <div className="chunk">
            <div className="undelete" onClick={() => onUnDelete("multi")}></div>
            <div className="report" onClick={() => onSpam("multi")}></div>
          </div>
        </SearchActions>
      </SearchBar>
      <Root>
        <Left>
          {/* <Menus>
            <ul ref={menusRef}>
              {MenuTabs.map(({ name, value }) => (
                <li
                  className={value === currentMenu ? "on" : ""}
                  onClick={() => currentMenuChange(value)}
                  key={value}
                >
                  {name}
                </li>
              ))}
            </ul>
            <div className="focusLine" ref={focusLineRef}></div>
            <div className="orders">
              <span>latest</span>
              <i></i>
            </div>
          </Menus> */}
          <List>
            <ul>
              {/* {console.log("menuList", menuList)} */}
              {menuList.map((item, index) => {
                // console.log("item111: ", item, item[0]);
                return (
                  <EmailItem
                    key={index}
                    index={index}
                    data={item}
                    detailLoading={detailLoading}
                    viewDetail={querySessionById}
                    onCheckbox={onCheckbox}
                    setCollected={setCollected}
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
          <Content
            loading={detailLoading}
            data={menuList[currentEmailIndex]}
            attach={attach}
            setCollected={setCollected}
            onDelete={onRealDelete}
          />
        )}
      </Root>
    </Container>
  );
};

export default withRouter(inject("store")(observer(Index)));
