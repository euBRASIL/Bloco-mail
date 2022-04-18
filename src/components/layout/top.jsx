import React, { useEffect, useState, useCallback, useRef } from "react";
import { observer, inject } from "mobx-react";
import styled, { keyframes } from "styled-components";
import { withRouter, useHistory } from "react-router-dom";

import { flex, flexAlign, flexBetween, flexJustBetween } from "../css.common";

import { Info, User } from "./css";
import UserAva from "../../static/images/avatar.png";

const Root = styled.div`
  ${flexBetween}
  margin-bottom: 25px;
`;

const Top = ({ children, store }) => {
  const { bindedNft, principalId, profileInfo } = store.common;
  const history = useHistory();
  const email = "";

  const onBinding = () => {
    history.push("/setting");
  };

  return (
    <>
      <Root className="chunks">
        <Info>
          <p>
            <strong>Principal ID:</strong>
            <span>{principalId}</span>
          </p>
          {email ? (
            <p>
              <strong>NFT Domain Account:</strong>
              <span>{email}</span>
            </p>
          ) : (
            <p>
              <strong>NFT Domain Account:</strong>
              {bindedNft ? (
                `${bindedNft.emailName}@dmail.ai`
              ) : (
                <a onClick={onBinding} className="binding">
                  Binding
                </a>
              )}
            </p>
          )}
        </Info>
        <User>
          <div className="ava">
            <img src={profileInfo || UserAva} alt="" />
          </div>
          <div className="logout">
            <i></i>
            <strong>Quit</strong>
          </div>
        </User>
      </Root>
    </>
  );
};

export default withRouter(inject("store")(observer(Top)));
