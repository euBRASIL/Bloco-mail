import React, { useEffect, useState, useCallback, useRef } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, useHistory, useParams } from "react-router-dom";
import { fromJS } from "immutable";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled, { keyframes } from "styled-components";
import Container from "@/components/container";
// import Dialog from "@/components/Dialog";
import { Form, FlexWrapper, Side, UserList } from "./css";
import { Search } from "@/components/layout/css.js";
import { isDmailFn, isPrincipalIdFn, isEmailFn } from "@/utils/index";
import { Loading, ButtonLoading } from "@/components/Loading";
// import CircularProgress from "@mui/material/CircularProgress";
// import EmailAva from "../../static/images/setting-email.png";
import Toast from "@/components/toast";

import Modal from "@/components/Modal/index";
// import Toast from "@/components/toast";

import {
  sendEmail,
  queryUserList,
  createUpdateAnEmailDraft,
  createUpdateAttachment,
} from "./fetch";
const richTextOptions = {
  modules: {
    // https://quilljs.com/docs/modules/toolbar/
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
    ],
    history: {
      // History module
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
  },
  theme: "snow",
};

const QuillWrapper = styled.div`
  margin-top: 22px;

  .ql-toolbar.ql-snow {
    border: 1px solid #e1e0e0;
    border-radius: 5px;
    display: inline-block;
  }

  .ql-toolbar.ql-snow .ql-formats {
    &:last-child {
      margin-right: 0;
    }
  }

  .ql-container.ql-snow {
    margin-top: 8px;
    height: 24vh;
    border: none;
    background: #f9f9f9;
    border-radius: 5px;
    font-size: 16px;
  }
`;

const remainDecimal = (num, digits = 2) => {
  const n = Math.pow(10, 2);
  return Math.round(+num * n) / n;
};

const Compose = ({ store }) => {
  const { bindedNft, principalId, getMyNftList } = store.common;
  const [open, setOpen] = useState(false);
  const [idHide, setIdHide] = useState(true);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState({
    save: false,
    send: false,
  })
  const history = useHistory();
  const { draftId } = useParams();
  const [formData, setFormData] = useState({
    to: "",
    id: "",
    subject: "",
    attachs: [],
    assets: "",
    content: "",
  });
  const [errorTips, setErrorTips] = useState({
    to: '',
    id: '',
    subject: '',
  })
  const errorTipsRef = useRef(errorTips)
  useEffect(() => {
    errorTipsRef.current = errorTips
  }, [errorTips])

  const [idRequired, setIdRequired] = useState(false)
  const idRequiredRef = useRef(idRequired)
  useEffect(() => {
    idRequiredRef.current = idRequired
  }, [idRequired])

  const [searchValue, setSearchValue] = useState("");
  const [userList, setUserList] = useState([]);
  const userListRef = useRef([]);

  useEffect(() => {
    if (!searchValue) {
      setUserList(userListRef.current);
      return;
    }
    const filterList = userListRef.current.filter(({ alias, nickname }) => {
      if (alias && alias.includes(searchValue)) {
        return true;
      }
      if (nickname && nickname.includes(searchValue)) {
        return true;
      }
      return false;
    });
    setUserList(filterList);
  }, [searchValue]);

  const changeFormData = (key, value) => {
    if (key == "to" && idHide && isDmailFn(value)) {
      setIdHide(false)
    }
    const data = {
      ...formData,
      ...{ [key]: value },
    }
    setFormData(data);
    return data
  };

  const detectCurrentError = (key, value) => {
    let currentError = {}
    if (!value.trim().length) {
      if (key !== 'id' || idRequiredRef.current) {
        currentError[key] = `${key} can not be empty`
      }
    } else if (key === 'to') {
      !isEmailFn(value) && (currentError[key] = `${key} is not a valid email`)
    } else if (key === 'id' && idRequiredRef.current) {
      !isPrincipalIdFn(value) && (currentError[key] = 'Principal ID is not a valid email')
    }
    return Object.keys(currentError).length ? currentError : null
  }

  const detectAllErrors = (keys, data) => {
    const errors = Object.keys(errorTipsRef.current).reduce((res, key) => {
      if (!keys.includes(key)) {
        return res
      }
      const currentError = detectCurrentError(key, data[key]) || { [key]: '' };
      return {  ...res, ...currentError }
    }, {})
    
    Object.keys(errors).length && setErrorTips({
      ...errorTipsRef.current,
      ...errors,
    })
    return errors
  }

  const chooseUser = ({ princiapl_id, alias }) => () => {
    setIdHide(false);
    const data = {
      ...formData,
      ...{
        to: alias,
        id: princiapl_id,
      },
    }
    setFormData(data);

    detectAllErrors(['to', 'id'], data)
  };

  const onChange = (key) => (ev) => {
    const value = typeof ev === "string" ? ev : ev.target.value;
    const data = changeFormData(key, value);

    detectAllErrors([key], data)
  };

  const onBlur = (key) => (ev) => {
    if (!(key in errorTips)) {
      return 
    }
    const value = typeof ev === "string" ? ev : ev.target.value;
    const currentError = detectCurrentError(key, value) || { [key]: '' };
    setErrorTips({
      ...errorTips,
      ...currentError,
    })
  };

  const onClose = async () => {
    history.push("/inbox");
    console.log("history: ", history);
  };

  const handleOk = async () => {
    setOpen(false);
    setSending(true);
    const res = await sendEmail(principalId, bindedNft?.emailName, formData);
    if (res?.Ok) {
      setSending(false);
      alert("发送成功");
      history.push("/sent");
    } else {
      alert(res?.Err || "Send faild");
      setSending(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const onSend = async () => {
    const errors = detectAllErrors(Object.keys(errorTipsRef.current), formData)
    
    if (Object.keys(errors).length) {
      return
    }

    Modal({
      noBing: true,
      content: "Are you sure you want to sent this mail？",
      onOk: async () => {
        setLoading({
          ...loading,
          ...{
            send: true
          }
        })
        const res = await sendEmail(
          principalId,
          bindedNft?.emailName,
          formData
        );
        setLoading({
          ...loading,
          ...{
            send: false
          }
        })
        if (res?.Ok) {
          console.log("res: ", res);
          setOpen(true);
          // setSending(false);
          // alert("发送成功");
          history.push("/sent");
        } else {
          alert(res?.Err || "Send faild");
          // setSending(false);
        }
        return true;
      },
      onCancel: async () => {
        return true;
      },
    });
  };

  const onSave = async () => {
    setLoading({
      ...loading,
      ...{
        save: true
      }
    })
    const res = await createUpdateAnEmailDraft(
      draftId,
      principalId,
      bindedNft?.emailName,
      formData
    );
    setLoading({
      ...loading,
      ...{
        save: false
      }
    })
    if (res?.Ok) {
      alert("保存为草稿成功");
      history.push("/drafts");
    } else {
      alert(res?.Err || "Save faild");
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      if (reader.result === null) {
        throw new Error("file empty...");
      }
      const byteArray = new Uint8Array(reader.result);
      console.log(byteArray, reader.result);
      const res = await createUpdateAttachment(
        principalId,
        bindedNft?.emailName,
        file,
        byteArray
      );
      console.log("ressss", res);
      if (res?.Ok) {
        const { cid, id } = res.Ok;
        const newFormData = fromJS(formData).toJS();
        newFormData.attachs.push({
          name: file.name,
          size: file.size,
          type: file.type,
          cid,
          id,
        });
        console.log(file, newFormData.attachs);
        setFormData(newFormData);
      } else {
        //
      }
    };
  };

  const onDelete = (index) => () => {
    const newFormData = fromJS(formData).toJS();
    newFormData.attachs.splice(index, 1);
    setFormData(newFormData);

    // TODO needs delete api
  };

  // const DomContent = () => {
  //   return (
  //     <div style="font-size: 18px; color: red;">content</div>
  //   )
  // }

  // useEffect(() => {
  //   // setOpen(true);
  //   Modal({
  //     type: "error",
  //     title: "this is title",
  //     content:
  //       "Before sending emails,you should bind an NFT Domain Account with Dmail. <br />Please register or purchase an NFT Domain Account and bind it.",
  //     onOk: () => {
  //       return true;
  //     },
  //     //<DomContent />
  //   });
  //   Modal({
  //     content: "Are you sure you want to delete it completely？",
  //     onOk: async () => {
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //       return true;
  //     },
  //     onCancel: async () => {
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //       return true;
  //     },
  //   });
  // }, []);

  useEffect(() => {
    const isDmail = !isDmailFn(formData.to)
    setIdHide(isDmail);
    setIdRequired(!isDmail)
  }, [formData]);

  useEffect(async () => {
    if (!bindedNft || !bindedNft.emailName) {
      return;
    }
    const data = await queryUserList(bindedNft.emailName);
    const list = data[0].contact_list
      .map((o) => {
        if (!o) {
          return null;
        }
        const { recipient_alias, nickname, princiapl_id } = o;
        return {
          ...data.profile,
          nickname:
            Array.isArray(nickname) && nickname.length ? nickname[0] : "",
          princiapl_id: princiapl_id.length ? princiapl_id[0].toText() : "",
          alias:
            recipient_alias && !recipient_alias.includes("@")
              ? `${recipient_alias}@dmail.ai`
              : recipient_alias,
        };
      })
      .filter((item) => !!item);
    setUserList(list);

    userListRef.current = list;
  }, [bindedNft]);

  return (
    <Container noSearch={ true }>
      <FlexWrapper>
        <Form>
          <div className="container">
            <div className="item">
              <div className="label"><span>*</span>To</div>
              <div className="chunk">
                <input
                  type="text"
                  value={ formData.to }
                  onInput={ onChange("to") }
                  onBlur={ onBlur('to') }
                  placeholder="Enter NFT Domain Account or Web2.0 email address"
                />
                {errorTips.to && <div className="error">{errorTips.to}</div>}
              </div>
              <div
                className={ `toggle ${idHide ? "" : "un"}` }
                onClick={ () => setIdHide(!idHide) }
              ></div>
            </div>
            <div className={ `item ${idHide ? "hide" : ""}` }>
              <div className="label">
                {idRequired && (<span>*</span>)}
                Principal ID
              </div>
              <div className="chunk">
                <input
                  type="text"
                  value={ formData.id }
                  onInput={ onChange("id") }
                  onBlur={ onBlur('id') }
                  placeholder="The email initial contact,or the NFT Domain Account of the email above has changed,please input the ptincipal ID."
                />
                {errorTips.id && <div className="error">{errorTips.id}</div>}
              </div>
            </div>
            <div className="item">
              <div className="label"><span>*</span>Subject</div>
              <div className="chunk">
                <input
                  type="text"
                  value={ formData.subject }
                  onInput={ onChange("subject") }
                  onBlur={ onBlur('subject') }
                  placeholder="Enter the subject"
                />
                {errorTips.subject && <div className="error">{errorTips.subject}</div>}
              </div>
            </div>
            <br />
            <div className="item">
              <div className="label"></div>
              <div className="chunk">
                <FlexWrapper className="static">
                  <div className="attach">
                    <dl>
                      <dt>
                        <input type="file" onChange={ onFileChange } />
                        <i></i>
                        <strong>Attach</strong>
                        <span>(maximum 3M)</span>
                      </dt>
                      { formData.attachs.map((file, index) => (
                        <dd key={ file.id }>
                          <p>
                            <strong>{ remainDecimal(file.size / 1024) }KB</strong>
                            <i></i>
                            <span>1 attachments</span>
                          </p>
                          <span className="delete" onClick={ onDelete(index) }>
                            Delete
                          </span>
                        </dd>
                      )) }
                    </dl>
                  </div>
                  {/* <div className="assets">
                      <dl>
                        <dt>
                          <i></i><strong>Assets</strong><span>(Dfinity assets only)</span>
                        </dt>
                        <dd>
                          <p>
                            <img src={EmailAva} alt="" />
                            <strong>68.4 ICP</strong>
                          </p>
                          <span className='delete'>Delete</span>
                        </dd>
                      </dl>
                    </div> */}
                </FlexWrapper>
                <QuillWrapper>
                  <ReactQuill
                    { ...richTextOptions }
                    value={ formData.content }
                    onChange={ onChange("content") }
                  // placeholder="Enter the word"
                  />
                </QuillWrapper>
              </div>
            </div>
            <div className="actions">
              <a className="close" onClick={ onClose }>
                <span>Close</span>
              </a>
              <a className="save" onClick={ onSave }>
                {loading.save && <ButtonLoading />}
                <span>Save</span>
              </a>
              <a className="send" onClick={ onSend }>
                {loading.send && <ButtonLoading />}
                <span>Send</span>
              </a>
            </div>
          </div>
        </Form>
        <Side>
          <Search>
            <input
              value={ searchValue }
              onInput={ (ev) => setSearchValue(ev.target.value) }
              type="text"
              placeholder="Search"
            />
            <div className="search-btn"></div>
          </Search>
          <UserList>
            { userList.map((item, key) => (
              <li key={ key } onClick={ chooseUser(item) }>
                <img src={ item } alt="" />
                <div className="info">
                  <div className="name">{ item.nickname }</div>
                  <div className="email">{ item.alias }</div>
                  <div className="id">{ item.princiapl_id }</div>
                </div>
              </li>
            )) }
          </UserList>
        </Side>
      </FlexWrapper>
      {/* <Dialog
        open={open}
        handleClose={handleClose}
        handleOk={handleOk}
      ></Dialog> */}
      { sending && <Loading /> }
      <Toast open={ open } handleClose={ handleClose } />
    </Container>
  );
};

export default withRouter(inject("store")(observer(Compose)));
