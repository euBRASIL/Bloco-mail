import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory, withRouter } from "react-router-dom";
import { Root, Content } from "./css";
import Logo from "../../static/images/login-logo.png";
import { authClient } from "./authClient";
import Message from "@/components/Message/index";
import { Storage, Web_key, Principal_key } from "@/utils/storage";
import { getToken } from "@/api/web2/index";
import { observer, inject } from "mobx-react";
import Modal from '@/components/Modal/index'
import { cache } from "@/utils/axios";

// import {profileId}
const isPhone = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
  navigator.userAgent
);

const plugAuth = async () => {
  if (window.ic && window.ic.plug) {
    try {
      // Canister Ids
      const nnsCanisterId = "pyr3m-ciaaa-aaaai-qasua-cai";

      // Whitelist
      const whitelist = [nnsCanisterId];
      const res = await window.ic.plug.requestConnect({
        whitelist,
        // host: 'http://localhost:3000',
      });
      console.log('res', res)
      return true;
    } catch (error) {
      // denied
      return {
        code: 1,
        msg: error.toString().replace('Error: ', ''),
      };
    }
  } else {
    Modal({
      type: 'warn',
      title: 'Plug not found',
      content: 'Please install Plug Wallet and reload the webpage.',
      onOk: async () => {
        const install =
          "https://chrome.google.com/webstore/detail/plug/cfbfdhimifdmdehjmkdobpcjfefblkjm";
        window.open(install);
        return true
      },
      noCancel: true,
      okText: 'Install',
      link: 'https://dmailofficial.gitbook.io/how-to-use-dmail-1/v/english-1/how-to-use-dmail/how-to-get-a-principal-id-of-plug-wallet',
      linkTitle: 'How to install Plug?'
    })
  }
};

const Index = ({ store }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [iiLoading, setIILoading] = useState(false);

  const iiConnect = async () => {
    if (loading || iiLoading) {
      return;
    }
    await authClient.create();
    await authClient.login();
    const identity = await authClient.getIdentity();
    if (identity) {
      setIILoading(true)
      const sIdentity = identity.getPrincipal().toString();
      store.common.setPrincipalId(sIdentity);

      const token = await getToken(sIdentity)
      cache.enpid = token
      Storage.set(Web_key, token)
      
      await store.common.initData('login');
      setIILoading(false)
      history.push("/inbox");
    } else {
      setIILoading(false)
      console.error("could not get identity");
    }
  };

  const plugConnect = async () => {
    if (loading || iiLoading) {
      return;
    }
    if (!isPhone) {
      setLoading(true);
      const res = await plugAuth();
      if (res === true) {
        const principalId = await window.ic.plug.agent.getPrincipal();
        const sIdentity = principalId.toString();
        store.common.setPrincipalId(sIdentity);
        
        const token = await getToken(sIdentity)
        cache.enpid = token
        Storage.set(Web_key, token)
        
        await store.common.initData('login');
        setLoading(false);
        history.push("/inbox");
      } else {
        setLoading(false);
        if (res.code === 2) {
          window.confirm(res.msg);
          const install =
            "https://chrome.google.com/webstore/detail/plug/cfbfdhimifdmdehjmkdobpcjfefblkjm";
          window.open(install);
        } else if (res.code === 1) {
          Message.error(res.msg)
        }
      }
    }
  };
  return (
    <Root>
      <Content>
        <div className="logo">
          <img src={ Logo } alt="" />
          <p>Construct DID in Web 3.0, Not Just an Email.</p>
        </div>
        <div className="login">
          <div className="item welcome">
            <span>WELCOME</span>
          </div>
          <div className="btns">
            <div
              className="item"
              onClick={ plugConnect }
            >
              <i className="plug"></i>
              <a rel="noopener noreferrer"  >
                { loading && (
                  <CircularProgress
                    size={ 18 }
                    thickness={ 2 }
                    className="itemLoading"
                  />
                ) }
                Plug Login
              </a>
            </div>
            <div
              className="item"
              onClick={ () => {
                iiConnect();
              } }
            >
              <i className="identity"></i>
              <a rel="noopener noreferrer" >
                { iiLoading && (
                  <CircularProgress
                    size={ 18 }
                    thickness={ 2 }
                    className="itemLoading"
                  />
                ) }
                Internet Identity Login
              </a>
            </div>
          </div>
        </div>
      </Content>
    </Root>
  );
};

export default withRouter(inject("store")(observer(Index)));
