import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory, withRouter } from "react-router-dom";
import { Root, Content } from "./css";
import Logo from "../../static/images/login-logo.png";
import { authClient } from "./authClient";
import {
  Storage,
  Email_Name,
  Username,
  Principal_key,
} from "../../utils/storage";
import { fetch, emailHost } from "./utils";
import { observer, inject } from "mobx-react";
import {
  getBackendActor,
  transformPrincipalId,
  http,
  CanisterIds,
} from "../../api";

import Modal from '@/components/Modal/index'



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
      return true;
    } catch (error) {
      // denied
      console.log("plugAuth", error);
      // return {
      //   code: 1,
      //   msg: error,
      // };
    }
  } else {
    Modal({
      type: 'error',
      title: 'Not Found Plug!',
      content: 'Please install Plug Wallet and reload the webpage.',
      onOk: async () => {
        const install =
          "https://chrome.google.com/webstore/detail/plug/cfbfdhimifdmdehjmkdobpcjfefblkjm";
        window.open(install);
        return true
      },
      noCancel: true,
      okText: 'Install',
    })
    // CallPortalModal({isOpen:true,title:"你好"})
  }
};
const Index = ({ store }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  //   const classes = useStyles();
  //   const notify = useNotify();
  //   const dispatch = useDispatch();
  const handleSubmit = (auth) => {
    setLoading(true);
  };

  // useEffect(async () => {
  //   // http();
  //   let profileActor = await getBackendActor(CanisterIds.profile);
  //   const identity = Storage.get(Principal_key);
  //   let PrincipalId = transformPrincipalId(identity);
  //   let res = await http(
  //     CanisterIds.profile,
  //     "query_principal_profile_by_pid",
  //     PrincipalId
  //   );
  //   console.log("res: ", res);
  // }, []);
  //   const redirect = useRedirect();

  const getEmail = (identity) => {
    try {
      fetch("users", "getOne", identity)
        .then((res) => {
          const { data, success } = res;
          if (success && data) {
            // dispatch(changeEmail(data));
            Storage.set(Email_Name, data);
            Storage.set(Username, data.replace(emailHost, ""));
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log("error", error);
    }
  };
  const iiConnect = async () => {
    //setLoading(true);
    await authClient.create();
    await authClient.login();
    const identity = await authClient.getIdentity();
    // if (identity) {
    //   const sIdentity = identity.getPrincipal().toString();
    //   getEmail(sIdentity);
    //   // setIsAuthenticated(true);
    //   // @TODO: need to put the identity in to the cookie soon
    //   Storage.set(Principal_key, sIdentity);
    //   //setLoading(false)
    //   redirect("./mails");
    // } else {
    //   console.error("could not get identity");
    // }
  };

  const plugConnect = async () => {
    if (!isPhone) {
      setLoading(true);
      const res = await plugAuth();
      if (res === true) {
        const principalId = await window.ic.plug.agent.getPrincipal();
        const sIdentity = principalId.toString();

        getEmail(sIdentity);
        console.log("sIdentity: ", sIdentity);

        // setIsAuthenticated(true);
        Storage.set(Principal_key, sIdentity);
        console.log("history.push: ", sIdentity);
        store.common.getPrincipalId();
        await store.common.initData();
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
          window.alert(res.msg);
        }
      }
    }
  };
  return (
    <Root>
      <Content>
        <div className="logo">
          <img src={ Logo } alt="" />
          <p>Connecting the parallel world and the real world</p>
        </div>
        <div className="login">
          <div className="item welcome">
            <i></i>
            <span>WELCOME</span>
          </div>
          <div className="btns">
            <div
              className="item"
              onClick={ () => {
                plugConnect();
              } }
            >
              <i className="plug"></i>
              <a>
                { loading && (
                  <CircularProgress
                    size={ 18 }
                    thickness={ 2 }
                    className="itemLoading"
                  />
                ) }
                PLUG LOGIN
              </a>
            </div>
            <div
              className="item"
              onClick={ () => {
                iiConnect();
              } }
            >
              <i className="identity"></i>
              <a>INTERNET IDENTITY LOGIN</a>
            </div>
          </div>
        </div>
      </Content>
    </Root>
  );
};

export default withRouter(inject("store")(observer(Index)));
