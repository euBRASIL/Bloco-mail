import React, { useEffect, useState, useCallback, useRef } from "react";
import { observer, inject } from 'mobx-react';
import { timeConverter, con } from "@/utils/index";
import { Spin } from "@/components/Loading";

import {
    MenusRoot,
    Body,
    Info,
    More,
    ContentEmpty,
    FlexWrapper,
    FlexBetweenWrapper,
    FlexAlignWrapper,
    FlexJustBetweenWrapper,
} from "./css";

// const status = {
//     0: "sending",
//     1: "success",
//     2: "fail",
//     3: "run out of cycles",
// };

const Content = ({ data, loading, attach }) => {
  return (
      <>
      {!data ? 
        <ContentEmpty className="hhaha" /> : 
        (
          <Spin loading={loading}>
            <Body>
              <FlexBetweenWrapper className="actions">
                <FlexAlignWrapper>
                  {/* <div className="reply"></div> */}
                  {/* <div className="share"></div> */}
                </FlexAlignWrapper>
                <FlexAlignWrapper>
                  {/* <div className="collection"></div> */}
                  {/* <div className="warn"></div> */}
                  <div className="delete"></div>
                </FlexAlignWrapper>
              </FlexBetweenWrapper>
              <div>
                <div>
                  <div className="title">
                    <h1>{data.email?.email_header?.subject}</h1>
                  </div>
                  <Info>
                    <FlexAlignWrapper className="item">
                      <div className="label">Sender:</div>
                      <FlexJustBetweenWrapper className="value">
                        <FlexAlignWrapper className="sender">
                          <a>{data.email?.email_header?.sender_alias}</a>
                          <i></i>
                        </FlexAlignWrapper>
                        <FlexAlignWrapper className="icons">
                          {/* <div className="coin"></div> */}
                          <div className="files"></div>
                          {/* <div className="collection"></div> */}
                        </FlexAlignWrapper>
                      </FlexJustBetweenWrapper>
                    </FlexAlignWrapper>
                    <FlexWrapper className="item">
                      <div className="label">Recipient:</div>
                      <div style={{ flex: "1" }}>
                        <FlexJustBetweenWrapper className="value">
                          <FlexAlignWrapper className="recipient">
                            <span>{data.email?.email_header?.first_recipient_alias}</span>
                          </FlexAlignWrapper>
                          <div className="date">
                            {timeConverter(
                              Number(data.email?.email_header?.created_at)
                            )}
                          </div>
                        </FlexJustBetweenWrapper>
                        <div className="id">
                          {/* {con(data.email.header_cid?.recipient?.toText()) || ""} */}
                        </div>
                      </div>
                    </FlexWrapper>
                    {/* <FlexAlignWrapper className="item">
                      <div className="label">Status:</div>
                      <FlexJustBetweenWrapper className="value">
                        <FlexAlignWrapper className="status failed">
                          <span>{data.email?.email_header?.status[status]}</span>
                          <i></i>
                        </FlexAlignWrapper>
                      </FlexJustBetweenWrapper>
                    </FlexAlignWrapper> */}
                  </Info>
                  <div className="content" dangerouslySetInnerHTML={{ __html: data.email.email_body?.text_content }}>
                  </div>
                  <More>
                    <div className="item">
                      <FlexBetweenWrapper>
                        <FlexAlignWrapper>
                          <h2>Appendix</h2>
                          <div className="desc">136KB in total</div>
                        </FlexAlignWrapper>
                        <div className="action">download all</div>
                      </FlexBetweenWrapper>
                      <ul className="appendix">
                        {data.email.email_body?.attach[0].map((item) => {
                          return (
                            <div className="appendixAttach">
                              {attach.map((item, index) => {
                                // console.log("item1111: ", item);
                                return (
                                  <li key={index}>
                                    <FlexAlignWrapper>
                                      <div className="img"></div>
                                      <span>{item?.file_name}</span>
                                      <span>
                                        {/* ({attachment_detail?.file_info?.file_size}) */}
                                      </span>
                                    </FlexAlignWrapper>
                                    <a href="" className="down"></a>
                                  </li>
                                );
                              })}
                            </div>
                          );
                        })}
                      </ul>
                    </div>
                  </More>
                </div>
              </div>
            </Body>
          </Spin>
        )
      }
      </>
  )
}

export default Content
