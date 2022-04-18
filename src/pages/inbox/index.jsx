import React, { useEffect, useState, useCallback, useRef } from "react";
import { withRouter, useHistory, useParams } from "react-router-dom";
import { observer, inject } from "mobx-react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { fromJS } from "immutable";
import {
  useLoadItems,
  setFavorites,
  setRead,
  batchDelete,
  batchSpam,
  getAttachList,
} from "./fetch";
import { MenuTabs, getDelList, getUpdateList, batchAction, useMenuChecked, useFetchData, useSetFocusLineStyle } from './utils'
import { Root, Left, Menus, SearchActions, List } from "./css";

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
  // const { Params, token } = useParams;
  // console.log("path: ", Params, token);

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

  const onDelete = (current, ev = null) => {
    batchAction(menuList, setMenuList, current, false, async (params) => await batchDelete(params), getDelList, ev)
  };

  const onSpam = async (current, ev = null) => {
    batchAction(menuList, setMenuList, current, false, async (params) => await batchSpam(params), getDelList, ev)
  };

  const setReadOrUnread = async (value, current = null, ev = null) => {
    batchAction(menuList, setMenuList, current, false, async (params) => await setRead(value, params), getUpdateList(value, 'first_recipient_read'), ev)
  };

  const setCollected = async (value, current = null, ev = null) => {
    batchAction(menuList, setMenuList, current, false, async (params) => await setFavorites(value, params), getUpdateList(value, 'first_recipient_favorites'), ev)
  };

  const querySessionById = async (index, item, ev) => {
    ev && ev.preventDefault && ev.preventDefault();
   
    // set read
    if (!item[1]?.first_recipient_read[0]) {
      setReadOrUnread(true, item);
    }

    setDetailLoading(true)

    // call bucket can query_attachment_by_id API
    // console.log(' menuList[index][0]', menuList[index][0])
    const list = fromJS(menuList).toJS();
    console.log(" list[index][0]", list[index][0]);
    for (let i = 0; i < list[index][0].length; i++) {
      console.log("i", i);
      let subject_email = list[index][0][i];
      console.log("subject_email", subject_email);
      for (let j = 0; j < subject_email.email_body.attach[0].length; j++) {
        const fileInfo = await getAttachList({
          alias: subject_email.email_header.sender_alias,
          file_id: subject_email.email_body.attach[0][j].file_id,
          cid: subject_email.email_body.attach[0][j].canister_id,
        });
        subject_email.email_body.attach[0][j] = {
          ...subject_email.email_body.attach[0][j],
          ...fileInfo,
        };
        console.log(
          "subject_email.email_body.attach[0][j]",
          subject_email.email_body.attach[0][j]
        );
      }
    }

    setDetailLoading(false)

    console.log("list", list);
    setMenuList(list);
    setCurrentEmailIndex(index);
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
            <div className="delete" onClick={() => onDelete("multi")}></div>
          </div>
          <div className="chunk">
            <div
              className={`collect ${collected ? "on" : ""}`}
              onClick={() => setCollected(!collected)}
            ></div>
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
          </Menus> */}
          <List>
            <ul>
              {menuList.map((item, index) => {
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
                {queryMenusLoading ? <Loading rootStyle={{ padding: '40px 0' }} /> : ""}
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
            onDelete={onDelete}
            onSpam={onSpam}
            Status={"index"}
          />
        )}
      </Root>
    </Container>
  );
};

export default withRouter(inject("store")(observer(Index)));
