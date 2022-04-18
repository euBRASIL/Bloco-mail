import React, { useEffect, useState, useCallback, useRef } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, useHistory } from "react-router-dom";

import { timeConverter, con, isEmailFn } from "@/utils/index";
import { MenusRoot, FlexBetweenWrapper, FlexAlignWrapper } from "./css";

const EmailItem = (pops) => {
  const {
    location: { pathname },
    data,
    index,
    menusLoading,
    detailLoading,
    viewDetail,
    onCheckbox,
    setCollected,
  } = pops

  let sender_alias = data[0]?.[0]?.email_header.sender_alias
  sender_alias = isEmailFn(sender_alias) ? sender_alias : `${sender_alias}@dmail.ai`

  return (
    <MenusRoot
      style={{ cursor: detailLoading ? 'wait' : 'pointer' }}
      className={!data[1]?.first_recipient_read[0] ? "unread" : ""}
      onClick={(e) => {
        viewDetail(index, data, e);
      }}
    >
      <div className="chunk">
        <FlexBetweenWrapper>
          <FlexAlignWrapper>
            <div
              className={`checkbox ${data[1]?.checked ? "checked" : ""}`}
              onClick={onCheckbox(data[1]?.key, !data[1]?.checked)}
            ></div>
            {/* <div className="ava">
                <img
                src={data[1]?.sender_profile[0]?.avatar_base64[0]}
                alt=""
                />
            </div> */}
            <div>
              <div className="ename">
                { !data[1]?.first_recipient_read[0] && <i></i> }
                {data[1]?.first_recipient_read[0] && <span style={{height:"20px",width:"20px",  marginRight: "8px"}}></span>}
                <span>{sender_alias}</span>
              </div>
              <div className="id">
                <span>
                  {con(data[0]?.[0]?.email_header.sender[0]?.toText())}
                </span>
              </div>
            </div>
          </FlexAlignWrapper>
          <div className="actions">
            <FlexAlignWrapper className="icons">
              {/* <div className="coin"></div> */}
              {data[1]?.has_attach && <div className="files"></div>}
              {!["/trash", "/spam"].includes(pathname) && (
                <div
                  className={`collect ${
                    data[1]?.first_recipient_favorites[0] ? "on" : ""
                  }`}
                  onClick={(ev) =>
                    setCollected(
                      !data[1]?.first_recipient_favorites[0],
                      data,
                      ev
                    )
                  }
                ></div>
              )}
            </FlexAlignWrapper>
            <div className="date">
              {timeConverter(Number(data[0]?.[0].email_header?.created_at))}
            </div>
          </div>
        </FlexBetweenWrapper>
        <div className="content">
          <div className="title">{data[0]?.[0]?.email_header.subject}</div>
          {/* <div className="desc">{data[1]?.body_desc}</div> */}
        </div>
      </div>
    </MenusRoot>
  );
};

export default withRouter(inject("store")(observer(EmailItem)));
