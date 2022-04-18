import { makeAutoObservable, observable, computed, toJS ,makeObservable} from 'mobx';
// import * as api from '@/requests/common';
import { Storage, Principal_key, Binded_Nft } from "../utils/storage";
import { CanisterIds, http, transformPrincipalId } from "@/api/index";

export default class CommonStore {
  // pageName = 'Home'
  // showSearch = false
  unReadList = {
    // Compose: 22,
    // Inbox: 1,
  }
  principalId = ''

  gettingMyNft = false
  bindedNft = null
  myNftList = []

  profileInfo = null

  constructor () {
    
    makeAutoObservable(this)
    // this.siteName = SiteName
  }

  async initData() {
    // console.log('initData')
    // if (!this.principalId) {
    //   return false
    // }
    console.log('333')
    this.getProfileInfo()
    const bindedNft = this.getBindedNft()
    // if (!bindedNft) {
    await this.getMyNftList(true)
      // if (!this.bindedNft) {
      //   return false
      // }
    // }
    return true
  }

  getPrincipalId() {
    this.principalId = Storage.get(Principal_key) || ''
    const  principalId = this.principalId  
    return principalId
  }

  getBindedNft () {
    this.bindedNft = Storage.get(Binded_Nft) || null
    return this.bindedNft
  }

  setUnReadList (list) {
    this.unReadList = list
  }

  // o: { emailName, id }, emailName exclude '@dmail.ai'
  setBindedNft(o) {
    this.bindedNft = o
    Storage.set(Binded_Nft, o);
  }

  updateMyNftList(nft) {
    this.setBindedNft({
      id: nft.id,
      emailName: nft.emailName,
    })
    this.myNftList = this.myNftList.map(({ id, token_id, emailName }) => (
      {
        id, token_id, emailName, 
        useing: token_id === nft.token_id
      }
    ))
  }

  setProfileInfo(info) {
    this.profileInfo = info.avatar_base64
  }

  async getProfileInfo() {
    const principalId = this.principalId || this.getPrincipalId()
    if (!principalId) {
      console.error('no principalId')
      return;
    }
    const res = await http(
      CanisterIds.profile,
      "query_principal_profile_by_pid",
      [
        transformPrincipalId(principalId),
      ]
    );
    // console.log('getProfileInfo', res);
    if (res.Ok && res.Ok.length) {
      this.setProfileInfo(res.Ok[0])
      // setAva(res.Ok[0]?.avatar_base64)
    }
  }

  async getMyNftList(showLoading) {
    const principalId = this.principalId || this.getPrincipalId()
    if (!principalId) {
      console.error('no principalId')
      return;
    }
    showLoading && (this.gettingMyNft = true)
    try {
      const list = await http(
        CanisterIds.nft,
        "getMetadataForUserDip721",
        [
          transformPrincipalId(principalId),
        ]
      );
      console.log('list',list)

      this.myNftList = Array.isArray(list) ? list.map(({ metadata_desc, token_id }) => {
        if (!Array.isArray(metadata_desc) || !metadata_desc.length) {
            return null
        }
        const [{ key_val_data }] = metadata_desc
        if (!Array.isArray(key_val_data) || key_val_data.length < 2) {
            return null
        }
        const [email, useing] = key_val_data
        if (!('val' in email) || !('val' in useing) || !email.val || !useing.val) {
            return null
        }
        if (useing.val.TextContent === 'true') {
            this.setBindedNft({
                id: Number(window.BigInt(token_id)),
                emailName: email.val.TextContent,
            })
        }
        return {
            token_id,
            id: Number(window.BigInt(token_id)),
            emailName: email.val.TextContent,
            useing: useing.val.TextContent === 'true'
        }
      }).filter((item) => !!item) : []
    } catch (error) {
      //
    }
    showLoading && (this.gettingMyNft = false)
  }
}
