import styled, { keyframes } from "styled-components";

import Identity from "@/static/images/login-identity.png";
import Plug from "@/static/images/login-plug2.png";
import Metamask from "@/static/images/login-metamask.png";
import Infinityswap from "@/static/images/infinityswap-logo.png";
import Bnb from "@/static/images/bnb.png";
import Bitkeep from "@/static/images/login-bitkeep.svg";

export const flex = `display: flex;`;
export const flexAlign = `${flex}; align-items: center;`;
export const flexAlignCenter = `${flex}; align-items: center; justify-content: center;`;
export const flexAlignRight = `${flex}; align-items: center; justify-content: end;`;
export const flexBetween = `${flexAlign};justify-content: space-between;`;
export const flexJustBetween = `${flex}; justify-content: space-between;`;

export const FlexWrapper = styled.div`
  ${flex}
`;
export const FlexAlignWrapper = styled.div`
  ${flexAlign}
`;

export const FlexAlignRightWrapper = styled.div`
  ${flexAlignRight}
  align-items: flex-end;
`;

export const FlexBetweenWrapper = styled.div`
  ${flexBetween}
`;

export const FlexJustBetweenWrapper = styled.div`
  ${flexJustBetween}
`;

export const Title = styled.div`
  margin-bottom: 30px;
  line-height: 24px;
  font-size: 20px;
  font-weight: bold;
  color: #e76350;
`;

export const Tabs = styled.div`
  ${flexAlign}
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;

  .item {
    margin-right: 90px;
    position: relative;
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
    color: #999999;

    &:hover {
      color :#333333;
    }

    &:after {
      opacity: 0;
      content: "";
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
      margin-top: 13.5px;
      width: 40px;
      height: 4px;
      background: #e76350;
      border-radius: 3px;
      transition: opacity 0.3s ease-out 0s;
    }
  }
  .on {
    color: #333333;

    &:after {
      opacity: 1;
    }
  }
`;

export const LoginLogo = styled.i`
  &.logo-icon {
    width: ${(props) => props.width || 30}px;
    height: ${(props) => props.height || 30}px;
    border-radius: 4px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  &.logo-plug {
    background-image: url(${Plug});
  }

  &.logo-ii {
    background-image: url(${Identity});
  }

  &.logo-infinity {
    background-image: url(${Infinityswap});
  }

  &.logo-metamask {
    background-image: url(${Metamask});
  }

  &.logo-binance {
    background-image: url(${Bnb});
  }

  &.logo-bitkeep {
    background-image: url(${Bitkeep});
  }
`;
