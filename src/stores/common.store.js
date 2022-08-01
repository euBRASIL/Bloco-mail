import { makeAutoObservable, toJS } from "mobx";
import {
  Storage,
  userInfoStorage,
  userInfoKeys,
} from "@/utils/storage";
import { CanisterIds, http, transformPrincipalId, getAlias } from "@/api/index";
import { getCallerToken } from "@/api/getCallerToken";
import { getUsedVolume } from "@/api/web2/index";
import { setBodyCid, setCanisterId, getCanisterId } from "@/api/canisterId";
import { bindNftDialog } from "@/utils/index";
import Modal from "@/components/Modal/index";

const defaultUsedVolume = {
  level: 0,
  points: 0,
  levelName: "Basic",
  decentralizedStorage: true,
  emailEncryption: true,
  rewardFactor: 1.2,

  page: 0,
  volume: 0,
  bVolume: 0,
  totalPage: 20,
  volumeUnit: "MB",
  totalVolume: 200,
  bTotalVolume: 200 * 1024 * 1024,
  totalVolumeUnit: "MB",
  // usedVolumePercent%
  usedVolumePercent: 0,
  hasTipVolumeWillFull: false,
};

export default class CommonStore {
  userInfo = userInfoKeys.reduce((res, key) => {
    res[key] = "";
    return res;
  }, {});
  principalId = "";
  // tokenGetted = false;
  tokenGetted = true;

  stopKeyDownSwitchEmail = false;

  unReadList = {
    Inbox: 0,
  };
  usedVolume = {
    ...defaultUsedVolume,
  };

  // initing = true;
  initing = false;
  gettingBindedNft = false;
  // exclude '@dmail.ai'
  bindedNft = '';
  myNftList = [];

  profileInfo = null;

  // ask to save or not when leave compose page
  routerBlockFn = null;

  inboxRefresh = 0;

  constructor() {
    makeAutoObservable(this);
  }

  triggerInboxRefresh() {
    this.inboxRefresh += 1;
  }

  setStopKeyDownSwitchEmail(status) {
    this.stopKeyDownSwitchEmail = status;
  }

  async detectGettingBindedNftEnded() {
    if (this.gettingBindedNft) {
      return this.bindedNft;
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
    return await this.detectGettingBindedNftEnded();
  }

  async getNftAlias() {
    const alias = await getAlias(this.principalId);
    this.gettingBindedNft = true;
    if (alias) {
      this.setBindedNft(`${alias}`);
    }
    return alias;
  }

  async initData() {
    // await getCallerToken();
    // this.tokenGetted = true;
    const bodyCid = userInfoStorage.get(userInfoKeys[3])
    if (bodyCid) {
      setBodyCid(bodyCid);
    }
    return new Promise(async (resolve) => {
      if (!this.principalId) {
        resolve(false);
        return false;
      }
      this.getProfileInfo();
      if (bodyCid) {
        this.getNftAlias();
        resolve(true);
        return true;
      }
      this.initing = true;
      const [canisterId, alias] = await Promise.all([
        (async () => await getCanisterId(this.principalId))(),
        (async () => {
          const alias = await this.getNftAlias();
          resolve(!!alias);
          return !!alias;
        })(),
      ]);
      if (!alias) {
        !window.location.href.includes("/setting") &&
          bindNftDialog(() => (window.location.href = "/setting/account"));
      }
      let _canisterId = canisterId;
      if (!canisterId && alias) {
        _canisterId = await setCanisterId(this.principalId);
      }
      if (_canisterId) {
        this.setUserInfo({[userInfoKeys[3]]: _canisterId })
      }
      this.initing = false;
    });
  }

  setRouterBlockFn(fn) {
    this.routerBlockFn = fn;
  }

  setUnRead(num, name = "Inbox") {
    this.unReadList = {
      [name]: parseInt(num),
    };
  }

  setUsedVolume(newData) {
    this.usedVolume = {
      ...this.usedVolume,
      ...newData,
    };
  }

  async queryFrequentData() {
    if (window.location.href.includes("/login")) {
      return;
    }
    const principalId = this.principalId || this.getPrincipalId();
    if (!principalId) {
      return false;
    }
    const encstring = this.userInfo[userInfoKeys[5]] || userInfoStorage.get(userInfoKeys[5])
    if (!encstring) {
      return false;
    }
    const data = await getUsedVolume(principalId);
    if (data) {
      const { notReadSize, ...newData } = data;
      this.setUsedVolume(newData);
      this.setUnRead(notReadSize);
      this.volumeFullTip();
    }
  }

  volumeFullTip() {
    // hasTipVolumeWillFull is avoid to get localstorage data
    const hasExceedLimit =
      this.usedVolume.bVolume >=
      this.usedVolume.bTotalVolume - 20 * 1024 * 1024;
    if (
      hasExceedLimit &&
      !this.usedVolume.hasTipVolumeWillFull &&
      userInfoStorage.get(userInfoKeys[6])
    ) {
      this.usedVolume.hasTipVolumeWillFull = true;
      this.setUserInfo({
        [userInfoKeys[6]]: true
      })
      Modal({
        type: "warn",
        title: "Insufficient space",
        content:
          "There's not sufficient mailbox space and Beta version does not support expansion. You can free up canister space by permanently deleting emails in Trash.",
        okText: "Ok",
        noCancel: true,
        async onOk() {
          return true;
        },
      });
    }
  }

  setUserInfo(data) {
    const res = userInfoStorage.set(data, this.userInfo);
    if (res) {
      this.userInfo = res
      if (!this.principalId && res[userInfoKeys[0]]) {
        this.principalId = res[userInfoKeys[0]];
      }
    }
    return res;
  }

  getUserInfo() {
    const userInfo = userInfoStorage.get("all");
    if (typeof userInfo === "object") {
      this.userInfo = { ...this.userInfo, ...userInfo };
    }
  }

  getPrincipalId() {
    if (this.principalId) {
      return this.principalId;
    }

    this.getUserInfo();
    this.principalId = this.userInfo[userInfoKeys[0]] || "";
    this.bindedNft = this.userInfo[userInfoKeys[4]] || "";
    return this.principalId;
  }

  setBindedNft(emailName) {
    if (emailName) {
      this.setUserInfo({ [userInfoKeys[4]]: emailName })
      this.bindedNft = emailName;
    }
  }

  updateMyNftList(nft) {
    this.setBindedNft(nft.emailName);
    this.myNftList = this.myNftList.map(({ id, token_id, emailName }) => ({
      id,
      token_id,
      emailName,
      useing: token_id === nft.token_id,
    }));
    // this.sortMyNftList();
  }

  setProfileInfo(avatar_base64) {
    this.profileInfo = avatar_base64;
  }

  async getProfileInfo() {
    const principalId = this.principalId || this.getPrincipalId();
    if (!principalId) {
      console.error("no principalId");
      return;
    }
    const res = await http(CanisterIds.profile, "queryAvatarByPid", [
      transformPrincipalId(principalId),
    ]);
    if (res.Ok) {
      this.setProfileInfo(res.Ok[0]);
      // setAva(res.Ok[0]?.avatar_base64)
    }
  }

  async getMyNftList() {
    const principalId = this.principalId || this.getPrincipalId();
    if (!principalId) {
      console.error("no principalId");
      return;
    }
    if (this.myNftList.length) {
      return;
    }
    try {
      const list = await http(CanisterIds.nft_market, "query", [
        transformPrincipalId(principalId),
      ]);

      this.myNftList = Array.isArray(list)
        ? list
            .map(({ nft_content, index, bind }) => { 
              let sContent = ''
              if (typeof nft_content === 'string') {
                sContent = nft_content.replaceAll('\n', '').replaceAll(' ', '').replace(/,\}/g, "}")
              }
              const data = JSON.parse(sContent)
              if (!data || !data.alias) {
                return null
              }
              if (bind) {
                this.setBindedNft(data.alias);
              }
              return {
                token_id: index,
                id: Number(index),
                emailName: data.alias,
                useing: !!bind,
              }; 
            })
            .filter((item) => !!item)
        : [];
    } catch (error) {
      //
      console.log(error)
    }
    this.sortMyNftList();
  }

  sortMyNftList() {
    const jsList = toJS(this.myNftList);
    jsList.sort(function (a, b) {
      return b.useing - a.useing;
    });
    this.myNftList = jsList;
  }
}
