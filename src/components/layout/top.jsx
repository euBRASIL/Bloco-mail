import React, { useEffect, useState, useCallback, useRef } from "react";
import { observer, inject } from "mobx-react";
import styled, { keyframes } from "styled-components";
import { withRouter, useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import { userInfoKeys } from "@/utils/storage";
import Modal from "@/components/Modal/index";
import { copyTextToClipboard, con } from '@/utils/index'
import { clearStorage } from "@/utils/storage";

import { flexBetween, LoginLogo } from "../css.common";

import { UserInfo, Info, User } from "./css";
import UserAva from "@/static/images/avatar.svg";

const Root = styled.div`
  ${flexBetween}
  margin-bottom: 1vw;
`;

const Top = ({ location: { pathname }, store }) => {
  const { bindedNft, getBindedNftEnd, bindingDmailAlias, principalId, profileInfo, userInfo, usedVolume, routerBlockFn } = store.common;
  const history = useHistory();

  const loginType = userInfo[userInfoKeys[1]]
  const address = userInfo[userInfoKeys[2]]

  // const onBinding = () => {
  //   if (pathname.includes('setting')) {
  //     if (gettingMyNft) {
  //       return
  //     }
  //     Modal({
  //       type: "warn",
  //       title: "No NFT Domain Account!",
  //       noCancel: true,
  //       content:
  //         "Please buy a NFT Domain Account frist!",
  //       okText: 'Get Now',
  //       onOk: async () => {
  //         window.location.href = 'https://dmail.ai/presale'
  //         return true;
  //       },
  //     });
  //   } else {
  //     history.push("/setting");
  //   }
  // };

  const toSetting = () => history.push("/setting");
  const toPresale = () => history.push("/presale");

  const logoutModal = () => {
    Modal({
      type: "info",
      title: "Sure to Logout?",
      okText: 'Logout',
      onOk: async () => {
        clearStorage();
        setTimeout(() => {
          window.location.href = '/login'
        }, 300);
        return true;
      },
    });
    return true
  }

  const onQuit = () => {
    if (routerBlockFn) {
      routerBlockFn(logoutModal)
      return
    }
    logoutModal()
  }

  const onCopy = (text) => () => {
    text && copyTextToClipboard(text)
  }

  return (
    <>
      <Root className="chunks">
        <Info>
          <p>
            <strong>Principal ID:</strong>
            <span className="pid" onClick={onCopy(principalId)}>{principalId} <i className="copy" title="copy" /></span>
          </p>
          <p className={bindedNft ? 'can-copy' : ''}>
            <strong>NFT Domain Account:</strong>
            {(!getBindedNftEnd || bindingDmailAlias) ? <span className="nft-getting"><CircularProgress size={14} /></span> : null}
            {bindedNft ? (
              <span onClick={onCopy(`${bindedNft}@dmail.ai`)}>{`${bindedNft}@dmail.ai`} <i className="copy" title="copy" /></span>
            ) : (
              <span style={{color: 'gray'}}>Unbound</span>
              // <a rel="noopener noreferrer"   onClick={onBinding} className="binding">
              //   Binding
              // </a>
            )}
          </p>
        </Info>
        <UserInfo>
          <div className="address" title={address}>{con(address, 5, 3)}</div>
          <div className="user-pop">
            <div className="item logo">
              {/* <LoginLogo className={`logo-icon logo-${loginType}`}></LoginLogo> */}
              <img src={profileInfo || UserAva} width={45} height={45} />
              <span className="address" title={address}>{con(address, 5, 3)}</span>
            </div>
            <div className="line"></div>
            <div className="item">
              <span>Daily limit</span>
              <span className="value">{usedVolume.totalPage}</span>
            </div>
            <div className="item">
              <span>Storage</span>
              <span className="value">{usedVolume.totalVolume}{usedVolume.totalVolumeUnit}</span>
            </div>
            <div className="line"></div>
            {/* <div className="item">
              <span>Events</span>
            </div>
            <div className="line"></div> */}
            <div className="item">
              <a className="can-click" onClick={toPresale}>Presale</a>
            </div>
            <div className="line"></div>
            <div className="item">
              <a className="can-click" onClick={toSetting}>Setting</a>
            </div>
            <div className="item">
              <a href="https://dmailofficial.gitbook.io/helpcenter/v/english/" target="_blank" className="can-click">Help</a>
            </div>
            <div className="logout">
              <div className="logout-btn" onClick={onQuit}>
                <i className="iconfontdmail dmailicon-quit"></i>
                <span>Logout</span>
              </div>
            </div>
          </div>
        </UserInfo>
      </Root>
    </>
  );
};

export default withRouter(inject("store")(observer(Top)));
