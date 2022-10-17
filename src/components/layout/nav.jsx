import React, { useEffect, useState, useCallback, useRef } from "react";
import { withRouter, useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { observer, inject } from "mobx-react";
// import Modal from "@/components/Modal/index";
import { Dmail, bindNftDialog } from "@/utils/index";

import { Logo, Nav, UseLimit, SplitLine, FlexBetweenWrapper } from "./css";
import { NavList, NavLineBeforeItem } from "./utils";
import NavLogo from "../../static/images/nav-logo.svg";

const Root = styled.div`
  width: 15vw;
  max-width: 340px;
  min-width: 245px;
  background: #272524;
  height: 100vh;
  position: relative;
  //overflow-y: auto;
`;

const Header = ({ location: { pathname }, store }) => {
  const { unReadList, usedVolume, initing, routerBlockFn } = store.common;
  const history = useHistory();
  const toPath = (path) => async () => {
    const notInbox = !pathname.includes('/inbox') && path.includes(pathname)
    if (initing || notInbox) {
      return
    }
    if (routerBlockFn) {
      routerBlockFn(() => history.push(path))
      return
    }
    if (path.includes('/setting')) {
      history.push(path);
      return
    }
    const bindedNft = await store.common.detectGettingBindedNftEnded()
    if (!bindedNft) {
      bindNftDialog(()=> history.push("/setting/account"), ()=> history.push("/presale"))
    } else if (path) {
      if (path.includes('/inbox')) {
        store.common.triggerInboxRefresh()
      }
      history.push(path);
    }
  };

  useEffect(() => {
    const filterNav = NavList.filter(({ path }) => path === pathname)
    const currentNavName = filterNav.length ? filterNav[0].name : ''
    const num = unReadList.Inbox > 0 ? `(${unReadList.Inbox}) ` : ''
    document.title = currentNavName ? `${num}${currentNavName} | ${Dmail}` : `${num}${Dmail}`
  }, [pathname, unReadList])

  return (
    <>
      <Root>
        <Logo>
          <img src={NavLogo} alt="" />
        </Logo>
        <Nav>
          {NavList.map(({ key, name, path }) => (
            <div key={name} className="menu">
              {NavLineBeforeItem === name ? <SplitLine></SplitLine> : null}
              <div
                style={{ cursor: initing ? 'wait' : 'pointer' }}
                className={pathname.includes(path) ? "on li" : "li"}
                onClick={toPath(path)}
              >
                <span className={`icon-${key} nav-icon`}></span>
                <span className="name">{name}</span>
                <span className={unReadList[name] ? "unread show" : "unread"}>
                  {unReadList[name]}
                </span>
              </div>
            </div>
          ))}
        </Nav>
        <UseLimit>
          <FlexBetweenWrapper>
            <div className="name">Daily limit</div>
            <div className="limit"><span>{usedVolume.page}</span>/{usedVolume.totalPage}</div>
          </FlexBetweenWrapper>
          <div className="use-volume" title={`${usedVolume.volume}${usedVolume.volumeUnit} used`}>
            <i style={{ width: `${usedVolume.usedVolumePercent}%` }}></i>
          </div>
          <FlexBetweenWrapper>
            <div className="name">V1.3.0_beta</div>
            <div className="limit"><span>{usedVolume.volume}{usedVolume.volumeUnit}</span>/{usedVolume.totalVolume}{usedVolume.totalVolumeUnit}</div>
          </FlexBetweenWrapper>
        </UseLimit>
      </Root>
    </>
  );
};

export default withRouter(inject("store")(observer(Header)));
