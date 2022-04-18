import React, { useEffect, useState, useCallback, useRef } from "react";
import { withRouter, useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { observer, inject } from "mobx-react";
import Modal from "@/components/Modal/index";

import { Logo, Nav, SplitLine } from "./css";
import { NavList, NavLineBeforeItem } from "./utils";
import NavLogo from "../../static/images/nav-logo.png";

const Root = styled.div`
  width: 17vw;
  max-width: 340px;
  min-width: 245px;
  background: #272524;
  height: 100vh;
  //overflow-y: auto;
`;

const Header = ({ location: { pathname }, store }) => {
  const { unReadList, bindedNft, gettingMyNft } = store.common;
  const history = useHistory();
  const toPath = (path) => () => {
    // console.log('path',path)
    if (gettingMyNft) {
      return
    }
    if (!bindedNft) {
      Modal({
        type: "error",
        title: "Please bind an NFT Domain Account!",
        noOk: true,
        noCancel: true,
        content:
          "Before sending emails,you should bind an NFT Domain Account with Dmail. <br />Please register or purchase an NFT Domain Account and bind it.",
        onBinding: async () => {
          console.log("history: ", history);
          history.push("/setting");
          return true;
        },
      });
    } else if (path) {
      history.push(path);
    } else {
     
    }
  };

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
                style={{ cursor: gettingMyNft ? 'wait' : 'pointer' }}
                className={path === pathname ? "on li" : "li"}
                onClick={toPath(path)}
              >
                <i className={key || name}></i>
                <span className="name">{name}</span>
                <span className={unReadList[name] ? "unread show" : "unread"}>
                  {unReadList[name]}
                </span>
              </div>
            </div>
          ))}
        </Nav>
      </Root>
    </>
  );
};

export default withRouter(inject("store")(observer(Header)));
