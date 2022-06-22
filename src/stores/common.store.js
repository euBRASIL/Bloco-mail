import { makeAutoObservable, toJS } from "mobx";
import {
  Storage,
  Web_key,
  Principal_key,
  Volume_Will_Full,
} from "../utils/storage";
import { CanisterIds, http, transformPrincipalId, getAlias } from "@/api/index";
import { getCallerToken } from "@/api/getCallerToken";
import { getUsedVolume } from "@/api/web2/index";
import { setCanisterId, getCanisterId } from "@/api/canisterId";
import { bindNftDialog } from "@/utils/index";
import Modal from "@/components/Modal/index";

const defaultUsedVolume = {
  page: 0,
  volume: 0,
  totalPage: 20,
  totalVolume: 200,
  volumeUnit: "MB",
  hasTipVolumeWillFull: false,
};

export default class CommonStore {
  principalId = "";
  tokenGetted = false;

  stopKeyDownSwitchEmail = false;

  unReadList = {
    Inbox: 0,
  };
  usedVolume = {
    ...defaultUsedVolume,
  };

  initing = true;
  bindedNft = null;
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

  async getNftAlias() {
    const alias = await getAlias(this.principalId);
    if (alias) {
      this.setBindedNft({
        emailName: `${alias}`,
      });
    }
    return alias;
  }

  async initData(from = "app") {
    await getCallerToken();
    this.tokenGetted = true;
    return new Promise(async (resolve) => {
      if (!this.principalId) {
        resolve(false);
        return false;
      }
      this.getProfileInfo();
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
          bindNftDialog(() => (window.location.href = "/setting"));
      }
      if (!canisterId && alias) {
        await setCanisterId(this.principalId);
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

  async queryFrequentData() {
    if (window.location.href.includes("/login")) {
      return;
    }
    const principalId = this.principalId || this.getPrincipalId();
    if (!principalId) {
      return false;
    }
    const encstring = Storage.get(Web_key);
    if (!encstring) {
      return false;
    }
    const data = await getUsedVolume(principalId);
    if (data) {
      const { notReadSize, ...newData } = data;
      this.usedVolume = {
        ...this.usedVolume,
        ...newData,
      };
      this.setUnRead(notReadSize);
      this.volumeFullTip();
    }
  }

  volumeFullTip() {
    // hasTipVolumeWillFull is avoid to get localstorage data
    if (
      this.usedVolume.volume >= 180 &&
      !this.usedVolume.hasTipVolumeWillFull &&
      !Storage.get(Volume_Will_Full)
    ) {
      this.usedVolume.hasTipVolumeWillFull = true;
      Storage.set(Volume_Will_Full, true);
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

  setPrincipalId(principalId) {
    Storage.set(Principal_key, principalId);
    this.principalId = principalId;
  }

  getPrincipalId() {
    if (this.principalId) {
      return this.principalId;
    }

    this.principalId = Storage.get(Principal_key) || "";
    return this.principalId;
  }

  getBindedNft() {
    return this.bindedNft;
  }

  // o: { emailName, id }, emailName exclude '@dmail.ai'
  setBindedNft(o) {
    this.bindedNft = o;
    // Storage.set(Binded_Nft, o);
  }

  updateMyNftList(nft) {
    this.setBindedNft({
      id: nft.id,
      emailName: nft.emailName,
    });
    this.myNftList = this.myNftList.map(({ id, token_id, emailName }) => ({
      id,
      token_id,
      emailName,
      useing: token_id === nft.token_id,
    }));
    this.sortMyNftList();
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
      const list = await http(CanisterIds.nft, "getMetadataForUserDip721", [
        transformPrincipalId(principalId),
      ]);

      this.myNftList = Array.isArray(list)
        ? list
            .map(({ metadata_desc, token_id }) => {
              if (!Array.isArray(metadata_desc) || !metadata_desc.length) {
                return null;
              }
              const [{ key_val_data }] = metadata_desc;
              if (!Array.isArray(key_val_data) || key_val_data.length < 2) {
                return null;
              }
              const [email, useing] = key_val_data;
              if (
                !("val" in email) ||
                !("val" in useing) ||
                !email.val ||
                !useing.val
              ) {
                return null;
              }
              if (useing.val.TextContent === "true") {
                this.setBindedNft({
                  id: Number(token_id),
                  emailName: email.val.TextContent,
                });
              }
              return {
                token_id,
                id: Number(token_id),
                emailName: email.val.TextContent,
                useing: useing.val.TextContent === "true",
              };
            })
            .filter((item) => !!item)
        : [];
    } catch (error) {
      //
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
