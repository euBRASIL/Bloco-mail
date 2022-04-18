import React, { useEffect, useState, useCallback, useRef } from "react";
import { observer, inject } from "mobx-react";
import Container from "@/components/container";
import { CanisterIds, http, transformPrincipalId } from "@/api/index";
import UploadImg from "./uploadImg";
import { Root, Title, Account } from "./css";
import EmailAva from "../../static/images/setting-email.png";
import Empty from "../../static/images/empty.png";
import UserAva from "../../static/images/avatar.png";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal/index";
const Index = ({ store }) => {
  const { bindedNft, principalId, profileInfo, myNftList } = store.common;
  const [loading, setLoading] = useState(false);

  console.log("profileInfo~~~~~~", profileInfo, principalId);

  const bindNft = (nft) => async () => {
    if (nft.useing) {
      return;
    }


    Modal({
      type: 'info',
      content: "Are you sure switch the NFT？",
      noOk: true,
      okText: 'yes',
      onCancel: async () => {
        return true
      },
      cancelText: 'no',
      onBinding: async () => {
        const res = await http(CanisterIds.nft, "bind", [
          `${nft.token_id}`,
          transformPrincipalId(principalId),
        ]);
        console.log("bindNft", res);
        if (res.Ok) {
          // console.log(_domainList, domainList);
          store.common.updateMyNftList(nft);
        }
        return true;
      },
    });
  };

  useEffect(async () => {
    setLoading(true);
    // await store.common.getMyNftList();
    setLoading(false);
  }, []);

  return (
    <Container noSearch="false">
      <Root>
        <Title>Setting</Title>
        <Account>
          <ul className="form">
            <li>
              <div className="label">Avatar</div>
              <div className="item ava">
                <img src={ profileInfo || UserAva } alt="" />
                <UploadImg>
                  <a>upload</a>
                  <span className="tips">(max 500K)</span>
                </UploadImg>
              </div>
            </li>
            <br />
            <li>
              <div className="label">Principal ID</div>
              <div className="item">{ principalId }</div>
            </li>
            <li>
              <div className="label">NFT Domain Account</div>
              <div className={ `item ${bindedNft ? "" : "unbound"}` }>
                { bindedNft ? `${bindedNft.emailName}@dmail.ai` : "Unbound" }
              </div>
            </li>
          </ul>
        </Account>
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
                      {/* <span>{ type }</span> */}
                      {/* <span>{ num }</span> */}
                      <a
                        className={ `${useing ? "useing" : ""}` }
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
                    <a href="https://dmail.ai/presale" target="_blank">
                      Get Now
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          ) }
        </Account>
      </Root>
      {/* {loading && <Loading />} */ }
    </Container>
  );
};

export default inject("store")(observer(Index));
