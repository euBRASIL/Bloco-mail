import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from "@dfinity/principal"
import { idlFactory as profile_did } from "./dids/profile.did";
import { idlFactory as token_did } from "./dids/token.did";
import { idlFactory as body_did } from "./dids/body.did";
import { idlFactory as bucket_did } from "./dids/bucket.did";
import { idlFactory as nft_did } from "./dids/nft.did";
import { idlFactory as draft_did } from "./dids/draft.did"

const IcCanisterIds = {
  header: '42fn2-wyaaa-aaaak-aafwq-cai',
  body: 'evyc3-ziaaa-aaaak-aam5a-cai',
  nft: 'ea7tw-yaaaa-aaaak-aam6q-cai',
  bucket: 'ej4yk-oiaaa-aaaak-aam7a-cai',
  profile: '4nczn-6aaaa-aaaak-aajza-cai',
}

const DevCanisterIds = {
  draft:'qaa6y-5yaaa-aaaaa-aaafa-cai',
  header: 'r7inp-6aaaa-aaaaa-aaabq-cai',
  body: 'renrk-eyaaa-aaaaa-aaada-cai',
  nft: 'qoctq-giaaa-aaaaa-aaaea-cai',
  bucket: 'r7inp-6aaaa-aaaaa-aaabq-cai',
  profile: 'rno2w-sqaaa-aaaaa-aaacq-cai',
}

export const CanisterIds = process.env.NODE_ENV === 'development' ? DevCanisterIds : IcCanisterIds

export async function getBackendActor(canisterId) {
    // const agent = new HttpAgent({ host: `https://${id}.raw.ic0.app`});
    const agent = new HttpAgent({ host: `http://192.168.1.105:8000`})
    // for local development only, this must not be used for production
    if (process.env.NODE_ENV === 'development') {
      await agent.fetchRootKey();
    }
    const idlFactory = {
      [CanisterIds.header]: token_did,
      [CanisterIds.body]: body_did,
      [CanisterIds.bucket]: bucket_did,
      [CanisterIds.profile]: profile_did,
      [CanisterIds.nft]: nft_did,
      [CanisterIds.draft]: draft_did,
    }
    const backend = Actor.createActor(idlFactory[canisterId], { agent, canisterId});
    return backend ;
}

export const transformPrincipalId = (principalId) => {
  return Principal.fromText(principalId)
}

export async function http (canisterId, apiName, params) {
  // console.log('params', params);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~``params', canisterId, apiName, params);
    const actor = await getBackendActor(canisterId);
    // console.log('actor', actor);
    // console.log('start2')
    const res = await actor[apiName](...params)
    return res;
}