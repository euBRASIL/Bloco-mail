import React, { useEffect, useState, useCallback, useRef } from "react";
import { observer, inject } from "mobx-react";
import Container from "@/components/container";
import { CanisterIds, http, transformPrincipalId } from "@/api/index";
import { Root, Title, Account } from "./css";
import EmailAva from "../../static/images/setting-email.png";
import Empty from "../../static/images/empty.png";
import UserAva from "../../static/images/avatar.png";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal/index";
import ComingSoon from "@/components/ComingSoon/index"


const Market = ({ store }) => {
  const { bindedNft, principalId, profileInfo, myNftList } = store.common;
  const [loading, setLoading] = useState(false);


  return (
    <Container noSearch="false">
      <Root>
        <ComingSoon></ComingSoon>
       
      </Root>
    </Container>
  );
};

export default inject("store")(observer(Market));
