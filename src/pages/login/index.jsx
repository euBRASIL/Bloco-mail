import React, { useRef, useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import { useHistory, withRouter } from "react-router-dom";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import CircularProgress from "@mui/material/CircularProgress";

import Message from "@/components/Message/index";
import { clearStorage } from "@/utils/storage";
// import { Storage, userInfoStorage, userInfoKeys } from "@/utils/storage";
// import axios from "axios";
// import { cache, baseURL } from "@/utils/axios";

import { plugAuth, infinityswapAuth, loginTypes } from './utils'
import { bnbAuth, bitkeepAuth } from './metamask/bsc'
import { authClient } from "./authClient";
import MetaMask from './metamask/index'
import { Root, Content, Links } from "./css";
import Logo from "../../static/images/login-logo.svg";

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


  const afterGetIdentity = async (sIdentity, loadingKey, loginAddress, chainId = '') => {
    if (!await store.common.getTokenAndStoreUserInfo(sIdentity, loadingKey, loginAddress, chainId, false)) {
      return
    }
    _setLoading(loadingKey, false)
    history.push("/inbox");
  }

  const detectIsLoading = () => {
    if (Object.values(loading).filter(item => !!item).length) {
      return true;
    }
    return false
  }

  const iiConnect = async () => {
    if (detectIsLoading()) {
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
    if (detectIsLoading()) {
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
    if (detectIsLoading()) {
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

  // https://docs.bnbchain.org/docs/wallet/wallet_api
  const bnbConnect = async () => {
    if (detectIsLoading()) {
      return;
    }
    if (!isPhone) {
      _setLoading('binance', true);
      const [principalId, account, chainId] = await bnbAuth(() => setLoading("binance", false));
      if (typeof principalId === 'string' && principalId) {
        await afterGetIdentity(principalId, 'binance', account, chainId)
      } else {
        _setLoading('binance', false);
      }
    }
  }

  // http://docs.bitkeep.io/guide/connect-wallet-for-dapp.html#evm
  const bitkeepConnect = async () => {
    if (detectIsLoading()) {
      return;
    }
    if (!isPhone) {
      _setLoading('bitkeep', true);
      const [principalId, account, chainId] = await bitkeepAuth(() => setLoading("bitkeep", false));
      if (typeof principalId === 'string' && principalId) {
        await afterGetIdentity(principalId, 'bitkeep', account, chainId)
      } else {
        _setLoading('bitkeep', false);
      }
    }
  }

  useEffect(() => {
    clearStorage();
    store.resetStores();
  }, [])

  const setMetamaskLoading = (status) => _setLoading("metamask", status)
  
  // useEffect(() => {
  //   const data = userInfoStorage.get('all')
  //   if (!data || !Object.keys(data).length) {
  //     return
  //   }
  //   const principalId = data[userInfoKeys[0]]
  //   const loginType = data[userInfoKeys[1]]
  //   const enpid = data[userInfoKeys[5]]
  //   if (!principalId || !loginType || !enpid) {
  //     return;
  //   }
  //   const axiosInstance = axios.create({baseURL})
  //   axiosInstance.interceptors.request.use(
  //     (config) => {
  //       if (config.headers) {
  //         config.headers["dm-encstring"] = enpid;
  //       }
  //       return config;
  //     },
  //     (error) => Promise.reject(error)
  //   );
  //   axiosInstance({
  //     url: `mails/getSize/${principalId}`,
  //     method: "get",
  //   }).then(async (res) => {
  //     const { code, data } = res.data
  //     if (code !== -1 && code !== -2 && data && 'limitSize' in data) { 
  //       _setLoading(loginType, true)
  //       const close = Message.loading('Accessing Dmail Network...')
  //       await store.common.initData()
  //       _setLoading(loginType, false)
  //       close()
  //       history.push("/inbox")
  //     }
  //   }).catch((res) => {
  //     //
  //   });
  // }, [])

  return (
    <Root>
      <div className="bubble red"></div>
      <div className="bubble yellow"></div>
      <div className="bubble blue"></div>
      <Content>
        <div className="logo">
          <img src={ Logo } alt="" />
          <p>Construct DID in Web 3.0, Not Just an Email.</p>
        </div>
        <div className="login">
          <div className="btns">
            <div
              className="main-btn"
            >
              <Web3ReactProvider getLibrary={getLibrary}>
                <MetaMask loading={loading.metamask} setLoading={setMetamaskLoading} afterGetIdentity={afterGetIdentity} detectIsLoading={detectIsLoading}>
                  <i className="metamask"></i>
                  { loading.metamask && <span className="loading">{BtnLoading}</span> }
                  <strong>MetaMask</strong>
                </MetaMask>
              </Web3ReactProvider>
            </div>
            <div
              className="main-btn"
            >
              <a rel="noopener noreferrer" onClick={bnbConnect}  className="login-btn login-btn-main">
                <i className="bnb"></i>
                { loading.binance && <span className="loading">{BtnLoading}</span> }
                <strong>Binance Wallet</strong>
              </a>
            </div>
            <div className="split-line">
              <span>or</span>
            </div>
            <div className="other-btns">
              <a rel="noopener noreferrer" onClick={ plugConnect }  className="login-btn">
                { loading.plug && <span className="loading">{BtnLoading}</span> }
                <i className="plug"></i>
              </a>
              <a rel="noopener noreferrer" onClick={ bitkeepConnect }  className="login-btn">
                { loading.bitkeep && <span className="loading">{BtnLoading}</span> }
                <i className="bitkeep"></i>
              </a>
              <a rel="noopener noreferrer" onClick={ infinityConnect }   className="login-btn">
                { loading.infinity && <span className="loading">{BtnLoading}</span> }
                <i className="infinityswap"></i>
              </a>
              <a rel="noopener noreferrer" onClick={ () => iiConnect() }  className="login-btn">
                { loading.ii && <span className="loading">{BtnLoading}</span> }
                <i className="identity"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="help">
          <a href="https://dmailofficial.gitbook.io/helpcenter/v/english/" target="_blank">Help Center</a>
        </div>
      </Content>
      <Links>
        <a href="https://twitter.com/dmailofficial" className="twitter" target="_blank"></a>
        <a href="https://t.me/dmailofficial" className="telegram" target="_blank"></a>
        <a href="https://medium.com/@dmail_official" className="m" target="_blank"></a>
        <a href="https://discord.gg/QbvaeqwMFg" className="discord" target="_blank"></a>
      </Links>
    </Root>
  );
};

export default withRouter(inject("store")(observer(Index)));
