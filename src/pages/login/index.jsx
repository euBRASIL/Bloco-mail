import React, { useRef, useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import { useHistory, withRouter } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import CircularProgress from "@mui/material/CircularProgress";

import Message from "@/components/Message/index";
import { Storage, userInfoStorage, userInfoKeys } from "@/utils/storage";
import { getToken } from "@/api/web2/index";
import axios from "axios";
import { cache, baseURL } from "@/utils/axios";

import { plugAuth, infinityswapAuth, loginTypes } from './utils'
import { authClient } from "./authClient";
import MetaMask from './metamask/index'
import { Root, Content } from "./css";
// import Logo from "../../static/images/login-logo.png";
import Logo from "../../static/images/logo.svg";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const isPhone = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
  navigator.userAgent
);

const BtnLoading = (
  <CircularProgress
    size={ 22 }
    thickness={4}
    className="itemLoading"
  />
)

const Index = ({ store }) => {
  const history = useHistory();
  const [loading, setLoading] = useState({
    // plug、ii、metamask、infinity
    ...loginTypes.reduce((res, key) => {
      res[key] = false
      return res
    }, {})
  });
  const loadingRef = useRef(loading)
  const _setLoading = (key, value) => {
    if (!(key in loading)) {
      return
    }
    const newLoading = {
      ...loadingRef.current,
      ...{ [key]: value }
    }
    loadingRef.current = newLoading
    setLoading(newLoading)
  }

  const afterGetIdentity = async (sIdentity, loadingKey, loginAddress) => {
    const token = await getToken(sIdentity)
    cache.enpid = token
    const res = store.common.setUserInfo({
      [userInfoKeys[0]]: sIdentity,
      [userInfoKeys[1]]: loadingKey,
      [userInfoKeys[2]]: loginAddress,
      [userInfoKeys[5]]: token,
    });

    if (!res) {
      Message.error('Login error.');
      return
    }
    
    await store.common.initData();
    _setLoading(loadingKey, false)
    history.push("/inbox");
  }

  const iiConnect = async () => {
    if (Object.values(loading).filter(item => !!item).length) {
      return;
    }
    await authClient.create();
    await authClient.login();
    const identity = await authClient.getIdentity();
    if (identity) {
      _setLoading('ii', true)
      const sIdentity = identity.getPrincipal().toString();
      await afterGetIdentity(sIdentity, 'ii', sIdentity)
    } else {
      _setLoading('ii', false)
      console.error("could not get identity");
    }
  };

  const plugConnect = async () => {
    if (Object.values(loading).filter(item => !!item).length) {
      return;
    }
    if (!isPhone) {
      _setLoading('plug', true);
      const res = await plugAuth();
      if (res === true) {
        const principalId = await window.ic.plug.agent.getPrincipal();
        const sPrincipalId = principalId.toString()
        await afterGetIdentity(sPrincipalId, 'plug', sPrincipalId)
      } else {
        _setLoading('plug', false);
        if (res.msg) {
          Message.error(res.msg)
        }
      }
    }
  };

  // https://infinityswap-docs-wallet.web.app/docs/Infinity-swap-wallet/integration
  const infinityConnect = async () => {
    if (Object.values(loading).filter(item => !!item).length) {
      return;
    }
    if (!isPhone) {
      _setLoading('infinity', true);
      const res = await infinityswapAuth();
      if (typeof res === 'string') {
        await afterGetIdentity(res, 'infinity', res)
      } else {
        _setLoading('infinity', false);
        if (res && res.msg) {
          Message.error(res.msg)
        }
      }
    }
  };

  useEffect(() => {
    const data = userInfoStorage.get('all')
    if (!data || !Object.keys(data).length) {
      return
    }
    const principalId = data[userInfoKeys[0]]
    const loginType = data[userInfoKeys[1]]
    const enpid = data[userInfoKeys[5]]
    if (!principalId || !loginType || !enpid) {
      return;
    }
    const axiosInstance = axios.create({baseURL})
    axiosInstance.interceptors.request.use(
      (config) => {
        if (config.headers) {
          config.headers["dm-encstring"] = enpid;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    axiosInstance({
      url: `mails/getSize/${principalId}`,
      method: "get",
    }).then(async (res) => {
      const { code, data } = res.data
      if (code !== -1 && code !== -2 && data && 'limitSize' in data) { 
        _setLoading(loginType, true)
        const close = Message.loading('Accessing Dmail Network...')
        await store.common.initData()
        _setLoading(loginType, false)
        close()
        history.push("/inbox")
      }
    }).catch((res) => {
      //
    });
  }, [])

  return (
    <Root>
      <Content>
        <div className="logo">
          <img src={ Logo } alt="" />
          <p>Construct DID in Web 3.0, Not Just an Email.</p>
        </div>
        <div className="login">
          <div className="item welcome">
            <span>Login</span>
          </div>
          <div className="btns">
            <div
              className="main-btn"
            >
              <a rel="noopener noreferrer" onClick={ plugConnect }>
                <i className="plug"></i>
                { loading.plug && <span className="loading">{BtnLoading}</span> }
                <strong>Plug Wallet</strong>
              </a>
            </div>
            <div className="split-line">
              <span>or</span>
            </div>
            <div className="other-btns">
              <Web3ReactProvider getLibrary={getLibrary}>
                <MetaMask loadingRef={loadingRef} setLoading={_setLoading} afterGetIdentity={afterGetIdentity}>
                  { loading.metamask && <span className="loading">{BtnLoading}</span> }
                  <i className="metamask"></i>
                </MetaMask>
              </Web3ReactProvider>
              <a rel="noopener noreferrer" onClick={ infinityConnect } >
                { loading.infinity && <span className="loading">{BtnLoading}</span> }
                <i className="infinityswap"></i>
              </a>
              <a rel="noopener noreferrer" onClick={ () => iiConnect() }>
                { loading.ii && <span className="loading">{BtnLoading}</span> }
                <i className="identity"></i>
              </a>
            </div>
            <div className="help">
              <a href="https://dmailofficial.gitbook.io/helpcenter/v/english/" target="_blank">Help Center</a>
            </div>
          </div>
        </div>
      </Content>
    </Root>
  );
};

export default withRouter(inject("store")(observer(Index)));
