import React, { useEffect, useState, useCallback, useRef } from "react";
import { observer, inject } from 'mobx-react';
import { withRouter, useHistory } from "react-router-dom";
import { timeConverter, con } from "@/utils/index";

import {
    MenusRoot,
    FlexBetweenWrapper,
    FlexAlignWrapper,
} from "./css";

const EmailItem = ({ data, index, viewDetail, onCheckbox, detailLoading }) => {

    return (
        <MenusRoot
            style={{ cursor: detailLoading ? 'wait' : 'pointer' }}
            onClick={(e) => {
                viewDetail(index, data, e);
            }}
        >
            <div className="chunk">
                <FlexBetweenWrapper>
                    <FlexAlignWrapper>
                    <div
                        className={`checkbox ${data.checked ? "checked" : ""}`}
                        onClick={onCheckbox(data.key, !data.checked)}
                    ></div>
                    <div className="ava">
                        <img
                        src={''}
                        alt=""
                        />
                    </div>
                    <div>
                        <div className="ename">
                        <span>
                            {data.email?.email_header.sender_alias}
                        </span>
                        </div>
                        <div className="id">
                            <span>
                                {con(
                                    data.email?.email_header.sender[0].toText()
                                )}
                            </span>
                        </div>
                    </div>
                    </FlexAlignWrapper>
                    <div className="actions">
                        <FlexAlignWrapper className="icons">
                            {/* <div className="coin"></div> */}
                            <div className="files"></div>
                        </FlexAlignWrapper>
                        <div className="date">
                            {timeConverter(
                                Number(data.email.email_header?.created_at)
                            )}
                        </div>
                    </div>
                </FlexBetweenWrapper>
                <div className="content">
                    <div className="title">
                        {data.email?.email_header.subject}
                    </div>
                    <div className="desc">
                        {data.email?.email_header.body_desc}
                    </div>
                </div>
            </div>
        </MenusRoot>
    )
}

export default inject('store')(observer(withRouter(EmailItem)));
