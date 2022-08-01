import React, { useEffect, useState, useCallback, useRef } from "react";
import { withRouter, useHistory, useParams } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { fromJS } from "immutable";
import { scrollIntoViewKey } from '@/utils/index'
import {
  useQueryMenus,
  loadNormalItems,
  setFavorites,
  setRead,
  batchDelete,
  batchSpam,
} from "./fetch";
import { MenuTabs, getDelList, getUpdateList, batchAction, useMenuChecked, useInit } from './utils'
import { Root, Left, Menus, SearchActions, List } from "./css";

import Message from "@/components/Message/index";
import Pagination from "@/components/layout/pagination";
import Container from "@/components/container";
import SearchBar from "@/components/layout/searchBar";
import EmailItem from "@/components/emails/emails";
import Content from "@/components/emails/content";
import PageEmpty from "@/components/empty";
import { Spin } from "@/components/Loading";

const Index = ({ store }) => {
  const { principalId, inboxRefresh, stopKeyDownSwitchEmail } = store.common;
  const [currentEmailIndex, setCurrentEmailIndex] = useState(-1);
  const [detailLoading, setDetailLoading] = useState(false)
  // const { Params, token } = useParams;

  const {
    toPage,
    offset,
    limit,
    menuList,
    menuListRef,
    setMenuList,
    loading: queryMenusLoading,
    allEmailsloaded,
    total,
    reQueryFirstPage,
    error: queryMenusError,
  } = useQueryMenus(loadNormalItems, principalId, "")

  useEffect(() => {
    principalId && reQueryFirstPage()
  }, [principalId])

  const onDelete = async (current, ev = null) => {
    const success = await batchAction(menuListRef, setMenuList, current, false, async (params) => await batchDelete(params, principalId), getDelList, ev)
    setCurrentEmailIndex(null);
    if (success && !menuListRef.current.length) {
      reQueryFirstPage()
    }
  };

  const onSpam = async (current, ev = null) => {
    const success = await batchAction(menuListRef, setMenuList, current, false, async (params) => await batchSpam(params, principalId), getDelList, ev)
    setCurrentEmailIndex(null);
    if (success && !menuListRef.current.length) {
      reQueryFirstPage()
    }
  };

  const setReadOrUnread = async (value, current = null, ev = null) => {
    if (current && value && current.other?.is_read) {
      return
    }
    const success = await batchAction(menuListRef, setMenuList, current, principalId, async (params) => await setRead(value, params, principalId), getUpdateList(value, 'read'), ev)
    if (success) {
      store.common.queryFrequentData()
    }
  };

  const setCollected = async (value, current = null, ev = null) => {
    const success = await batchAction(menuListRef, setMenuList, current, principalId, async (params) => await setFavorites(value, params, principalId), getUpdateList(value, 'favorites'), ev)
    if (success && !current) {
      _setCollected(value)
    }
  };

  const {
    collected,
    _setCollected,
    allChecked,
    anyChecked,
    setAllChecked,
    onCheckbox,
    unCheckedAll,
  } = useMenuChecked(menuList, menuListRef, setMenuList, setCurrentEmailIndex, principalId)

  const querySessionById = async (index, item, ev) => {
    ev && ev.preventDefault && ev.preventDefault();
    if (item.loading) {
      return
    }
    setCurrentEmailIndex(index);
    unCheckedAll()
    // set read
    await setReadOrUnread(true, item);
  };
  useEffect(() => {
    if (queryMenusLoading) {
      setCurrentEmailIndex(-1)
    }
  }, [queryMenusLoading])
  useEffect(() => {
    reQueryFirstPage()
  }, [inboxRefresh])

  useInit(stopKeyDownSwitchEmail, currentEmailIndex, setCurrentEmailIndex, setReadOrUnread, menuListRef)

  // const { focusLineRef, menusRef } = useSetFocusLineStyle(currentMenu)

  return (
    <Container>
      <SearchBar>
        <SearchActions>
          <div className="chunk">
            <div
              className={ `checkbox ${allChecked ? "checked" : ""}` }
              onClick={ onCheckbox("multi", !allChecked) }
            ></div>
            <div
              title="unread"
              className={`iconfontdmail dmailicon-unread ${anyChecked ? "black" : ""}`}
              onClick={ () => anyChecked && setReadOrUnread(false) }
            >
            </div>
            <div 
              title="read"
              className={`iconfontdmail dmailicon-read ${anyChecked ? "black" : ""}`} 
              onClick={ () => anyChecked && setReadOrUnread(true) }
            >
            </div>
          </div>
          <div className="chunk">
            <div title="trash" className={`iconfontdmail dmailicon-trash ${anyChecked ? "black" : ""}`} onClick={ () => anyChecked && onDelete("multi") }></div>
            <div title="spam" className={`iconfontdmail dmailicon-warn1 ${anyChecked ? "black" : ""}`} onClick={ () => anyChecked && onSpam("multi") }></div>
          </div>
          <div className="chunk">
            <div
              title={`${collected ? 'un' : ''}star`}
              className={ `iconfontdmail ${collected ? "dmailicon-star_y on" : "dmailicon-star"} ${anyChecked ? "black" : ""}` }
              onClick={ () => anyChecked && setCollected(!collected) }
            >
            </div>
          </div>
        </SearchActions>
        <Pagination disablePage={!allEmailsloaded} loading={queryMenusLoading} limit={limit} total={total} offset={offset} toPage={toPage} />
      </SearchBar>
      { !menuList.length ? (
        <PageEmpty />
      ) : (
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
              <Spin loading={ queryMenusLoading }>
                <ul>
                  { menuList.map((item, index) => {
                    return (
                      <EmailItem
                        key={ index }
                        index={ index }
                        data={ item }
                        selected={currentEmailIndex === index}
                        detailLoading={ detailLoading }
                        viewDetail={ querySessionById }
                        onCheckbox={ onCheckbox }
                        setCollected={ setCollected }
                      />
                    );
                  }) }
                </ul>
              </Spin>
            </List>
          </Left>
          <Content
            loading={ detailLoading }
            data={ menuList[currentEmailIndex] }
            total={ total }
            setCollected={ setCollected }
            onDelete={ onDelete }
            onSpam={ onSpam }
            Status={ "index" }
          />
        </Root>
      ) }
    </Container>
  );
};

export default withRouter(inject("store")(observer(Index)));
