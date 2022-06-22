import React, { useEffect, useState, useCallback, useRef } from "react";
import { observer, inject } from "mobx-react";

import Container from "@/components/container";
import { Spin, ButtonLoading } from "@/components/Loading";
import Modal from "@/components/Modal/index";
import Message from "@/components/Message/index";
import UploadImg from "./uploadImg";

import { copyTextToClipboard } from '@/utils/index'
import { sendWelcome, dmailPid } from '@/utils/send'
import { setCanisterId, getCanisterId } from "@/api/canisterId";
import { CanisterIds, http, transformPrincipalId } from "@/api/index";

import { Root, Title, Account } from "./css";
import EmailAva from "../../static/images/setting-email.png";
import Empty from "../../static/images/empty.png";
import UserAva from "../../static/images/avatar.svg";

import { bindAlias } from '@/api/web2/index'

const Index = ({ store }) => {
  const { bindedNft, tokenGetted, principalId, profileInfo, myNftList } = store.common;
  const [loading, setLoading] = useState(false);
  const [avaLoading, setAvaLoading] = useState(false);

  const bindNft = (nft) => async () => {
    if (nft.useing) {
      return;
    }

    const emailName = bindedNft?.emailName

    Modal({
      type: 'warn',
      title: 'Binding a new NFT',
      content: `After binding to a new NFT domain account, the original one will be 
      unbonded from the principal ID. When others want to send you an email, 
      they need to verify their domain account as well as principal ID again.
      <br/>
      <br/>
      Do you want to continue?`,
      onCancel: async () => {
        return true
      },
      cancelText: 'Cancel',
      noOk: false,
      okText: 'Confirm',
      
      onOk: async () => {
        const res = await http(CanisterIds.nft, "bind", [
          `${nft.token_id}`,
          transformPrincipalId(principalId),
        ]);
        if (res.Ok) {
          Message.success('Bind succeeded')
          store.common.updateMyNftList(nft);
          bindAlias(nft.emailName, principalId)
          const close = Message.loading('Canister ID initialization...')
          setCanisterId(principalId)
            .then(async (canisterId) => {
              close()
              if (!emailName && canisterId) {
                const dmailCid = await getCanisterId(dmailPid, true)
                dmailCid && sendWelcome(dmailCid, canisterId, principalId, nft.emailName)
              }
            })
            .catch(() => {
              close()
            })
        }
        return true;
      },
    });
  };

  const onCopy = (text) => () => {
    text && copyTextToClipboard(text)
  }

  useEffect(async () => {
    if (tokenGetted) {
      setLoading(true);
      await store.common.getMyNftList();
      setLoading(false);
    }
  }, [tokenGetted]);

  return (
    <Container noSearch="false">
      <Root>
        {/* <Title>Setting</Title> */}
        <Account>
          <ul className="form">
            <li>
              <div className="label">Avatar</div>
              <div className="item ava">
                <img src={ profileInfo || UserAva } alt="" />
                <div className="upload-ava">
                  <UploadImg className="upload-btn" setLoading={setAvaLoading}>
                    <a rel="noopener noreferrer"  >
                      {avaLoading ? <ButtonLoading size={16} /> : null}
                      Upload
                    </a>
                  </UploadImg>
                  <div className="tips">(Maximum 500KB)</div>
                </div>
                
              </div>
            </li>
            <br />
            <li>
              <div className="label">Principal ID</div>
              <div className="item" onClick={onCopy(principalId)}>{ principalId } <i className="copy" title="copy" /></div>
            </li>
            <li>
              <div className="label">NFT Domain Account</div>
              <div className={ `item ${bindedNft ? "" : "unbound"}` } onClick={onCopy(bindedNft ? `${bindedNft.emailName}@dmail.ai` : '')}>
                { bindedNft ? `${bindedNft.emailName}@dmail.ai` : "Unbound" } {bindedNft && <i className="copy" title="copy" />}
              </div>
            </li>
          </ul>
        </Account>
        <Spin loading={ loading } maskStyle={{ background: 'rgba(255, 255, 255, 0.75)' }}>
          <Account>
            { myNftList?.length ? (
              <div className="domain-list">
                <div className="label">My NFT Domain Account</div>
                <ul>
                  { myNftList.map(
                    ({ emailName, id, type, num, token_id, useing }) => (
                      <li key={ id }>
                        <div className="user">
                          <img src={ EmailAva } alt="" />
                          <div>
                            <p>{ emailName }@dmail.ai</p>
                            <p>#{ id }</p>
                          </div>
                        </div>
                        <span>Permanent</span>
                        {/* <span>{ num }</span> */}
                        <a rel="noopener noreferrer"  
                          className={ `${useing ? "useing" : "unuseing"}` }
                          onClick={ bindNft({ id, token_id, useing, emailName }) }
                        >
                          <i></i>
                          <span>{ useing ? "In Use" : "Binding" }</span>
                        </a>
                      </li>
                    )
                  ) }
                </ul>
              </div>
            ) : (
              <ul className="form">
                <li>
                  <div className="label">My NFT Domain Account</div>
                  <div className="item upload-domain">
                    <div className="upload">
                      <img src={ Empty } alt="" />
                      <p>Empty</p>
                    </div>
                    <div className="btn">
                      <a rel="noopener noreferrer"   href="https://dmail.ai/presale" target="_blank">
                        Get Now
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            ) }
          </Account>
        </Spin>
      </Root>
      {/* {loading && <Loading />} */ }
    </Container>
  );
};

export default inject("store")(observer(Index));
