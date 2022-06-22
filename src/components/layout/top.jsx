import React, { useEffect, useState, useCallback, useRef } from "react";
import { observer, inject } from "mobx-react";
import styled, { keyframes } from "styled-components";
import { withRouter, useHistory } from "react-router-dom";

import Modal from "@/components/Modal/index";
import rootStore from '@/stores';
import { copyTextToClipboard, clearStorage } from '@/utils/index'
import { flex, flexAlign, flexBetween, flexJustBetween } from "../css.common";

import { Info, User } from "./css";
import UserAva from "../../static/images/avatar.svg";

const Root = styled.div`
  ${flexBetween}
  margin-bottom: 1vw;
`;

const Top = ({ location: { pathname }, store }) => {
  const { bindedNft, principalId, profileInfo, gettingMyNft, routerBlockFn } = store.common;
  const history = useHistory();

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
            {bindedNft ? (
              <span onClick={onCopy(`${bindedNft.emailName}@dmail.ai`)}>{`${bindedNft.emailName}@dmail.ai`} <i className="copy" title="copy" /></span>
            ) : (
              <span style={{color: 'gray'}}>Unbound</span>
              // <a rel="noopener noreferrer"   onClick={onBinding} className="binding">
              //   Binding
              // </a>
            )}
          </p>
        </Info>
        <User>
          <div className="ava">
            <img src={profileInfo || UserAva} alt="" />
          </div>
          <div className="logout" onClick={onQuit}>
            <i className="iconfontdmail dmailicon-quit"></i>
            <span>Logout</span>
          </div>
        </User>
      </Root>
    </>
  );
};

export default withRouter(inject("store")(observer(Top)));
