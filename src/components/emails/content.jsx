import React, { useEffect, useState, useCallback, useRef } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, useHistory } from "react-router-dom";
import { timeConverter, con, remainDecimal } from "@/utils/index";
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

const status = {
  0: "sending",
  1: "success",
  2: "fail",
  3: "run out of cycles",
};

const gen = (name, type, byteArray) => {
  const u8Array = Uint8Array.from(byteArray);
  const blob = new Blob([u8Array.buffer], { type });
  let link = document.createElement("a");
  let href = window.URL.createObjectURL(blob);
  link.href = href;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(href);
};

const genAll = (attachmentList) => {
  for (const attachment of attachmentList) {
    gen(attachment.file_name, attachment.type, attachment.blob_content);
  }
};

const Content = ({
  location: { pathname },
  data,
  loading,
  attach,
  setCollected,
  onDelete,
  onSpam,
  Status,
}) => {
  const [[emails], actions] =
    Array.isArray(data) && data.length > 1 ? data : [[null], null];
  console.log("data", data, Status);

  return (
    <>
      {!(emails && actions) ? (
        <ContentEmpty />
      ) : (
        <Spin loading={loading}>
          <Body>
            <FlexBetweenWrapper className="actions">
              {["/trash", "/spam"].includes(pathname) ? (
                <div></div>
              ) : (
                <FlexAlignWrapper>
                  <div className="reply"></div>
                  <div className="share"></div>
                </FlexAlignWrapper>
              )}
              <FlexAlignWrapper>
                <div
                  className={`collect ${
                    actions?.first_recipient_favorites[0] ? "on" : ""
                  }`}
                  onClick={(ev) =>
                    setCollected(!actions?.first_recipient_favorites[0], data, ev)
                  }
                ></div>
                {pathname !== "/spam" && (
                  <div className="warn" onClick={() => onSpam(data)}></div>
                )}
                <div className="delete" onClick={() => onDelete(data)}></div>
              </FlexAlignWrapper>
            </FlexBetweenWrapper>

            <div className="content-wrapper">
              {data[0].map((emails, key) => {
                console.log("emails", emails);
                console.log(
                  "emails.email_header?.attach: ",
                  emails.email_body?.subject
                );
                return (
                  <div key={key}>
                    <div className="title">
                      <h1>{emails.email_header?.subject}</h1>
                    </div>
                    <Info>
                      <div>
                        <FlexWrapper className="item">
                          <div style={{ flex: "1" }}>
                            <div className="label">
                              Sender:
                              <a>{emails.email_header?.sender_alias}</a>
                            </div>
                            {Status === "index" && (
                              <FlexJustBetweenWrapper className="value">
                                <FlexAlignWrapper className="sender">
                                  <span>
                                    {emails.email_header?.sender.toString()}
                                  </span>
                                </FlexAlignWrapper>
                              </FlexJustBetweenWrapper>
                            )}
                          </div>
                        </FlexWrapper>
                        <FlexWrapper className="item">
                          <div style={{ flex: "1" }}>
                            <div className="label">
                              Recipient:{emails.email_header?.recipient_alias}
                            </div>
                            {Status === "sent" && (
                              <FlexJustBetweenWrapper className="value">
                                <FlexAlignWrapper className="recipient">
                                  <span>
                                    {emails.email_header?.recipient.toString()}
                                  </span>
                                </FlexAlignWrapper>
                              </FlexJustBetweenWrapper>
                            )}
                          </div>
                        </FlexWrapper>
                        {Status !== "index" && (
                          <FlexAlignWrapper className="item">
                            <div className="label">Status:</div>
                            <FlexJustBetweenWrapper className="value">
                              <FlexAlignWrapper className="status failed">
                                <span>{status[emails.email_header?.status]}</span>
                              </FlexAlignWrapper>
                            </FlexJustBetweenWrapper>
                          </FlexAlignWrapper>
                        )}
                      </div>
                      <div>
                        {emails.email_body?.attach[0] && (
                          <div className="files"></div>
                        )}
                        <div className="date">
                          {timeConverter(Number(emails.email_header?.created_at))}
                        </div>
                      </div>
                    </Info>
                    <div
                      className="content"
                      dangerouslySetInnerHTML={{
                        __html: emails.email_body?.text_content,
                      }}
                    ></div>
                    <More>
                      <div className="item">
                        {emails.email_body?.attach[0] ? (
                          <FlexBetweenWrapper>
                            <FlexAlignWrapper>
                              <h2>Appendix</h2>
                              <div className="desc">
                                {remainDecimal(
                                  Number(
                                    emails.email_body?.attach[0]?.reduce(
                                      (total, attachment) => {
                                        return (
                                          Number(attachment.file_size) + total
                                        );
                                      },
                                      0
                                    )
                                  ) / 1024
                                )}{" "}
                                KB in total
                              </div>
                            </FlexAlignWrapper>
                            <div
                              className="action"
                              onClick={(e) => {
                                genAll(emails.email_body?.attach[0]);
                              }}
                            >
                              download all
                            </div>
                          </FlexBetweenWrapper>
                        ) : (
                          <div></div>
                        )}

                        <ul className="appendix">
                          {emails.email_body?.attach[0]?.map(
                            (attachment, key) => {
                              return (
                                <div className="appendixAttach" key={key}>
                                  <li>
                                    <FlexAlignWrapper>
                                      <div className="img"></div>
                                      <span>{attachment.file_name}</span>
                                      <span>
                                        {remainDecimal(
                                          Number(attachment.file_size) / 1024
                                        )}{" "}
                                        KB
                                      </span>
                                    </FlexAlignWrapper>
                                    <a
                                      onClick={(e) => {
                                        gen(
                                          attachment.file_name,
                                          attachment.mime_type,
                                          attachment.blob_content
                                        );
                                      }}
                                      className="down"
                                    ></a>
                                  </li>
                                </div>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    </More>
                  </div>
                );
              })}
            </div>
          </Body>
        </Spin>
      )}
    </>
  );
};

export default withRouter(inject("store")(observer(Content)));
