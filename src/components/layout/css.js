import styled, { keyframes } from "styled-components";
import {
  LoginLogo,
  flexAlign,
  flexBetween,
  flexJustBetween,
  FlexWrapper,
  FlexAlignWrapper,
  FlexBetweenWrapper,
  FlexJustBetweenWrapper,
} from "../css.common";

import SearchBar from "../../static/images/search.png";
import Quit from "../../static/images/quit.png";

export {
  LoginLogo,
  FlexWrapper,
  FlexAlignWrapper,
  FlexBetweenWrapper,
  FlexJustBetweenWrapper,
};

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 14vh;
  img {
    height: 5vh;
    width: auto;
  }
`;

export const Nav = styled.div`
  margin: 10px 0 0 3vw;

  .li {
    ${flexAlign}
    height: 4vh;
    margin-bottom: 10px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    position: relative;

    .unread {
      display: none;
      position: absolute;
      right: 44px;
      top: 50%;
      transform: translateX(50%) translateY(-50%);
      min-width: 10px;
      padding: 0 6px;
      height: 22px;
      line-height: 22px;
      background: #e9624b;
      border-radius: 22px;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }

    .show {
      display: block;
    }

    i {
      margin-right: 22px;
      background-size: 100%;
    }

    .nav-icon {
      margin-right: 22px;
    }

    &.on,
    &:hover {
      background: linear-gradient(
        -90deg,
        rgba(233, 99, 75, 0.31),
        rgba(39, 37, 36, 0.31)
      );
      color: #fa6e58;

      &:after {
        content: "";
        width: 5px;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        background: #e9624b;
        border-radius: 4px 0px 0px 4px;
      }
    }
  }
`;

export const SplitLine = styled.div`
  width: 164px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 2.8vh 0;
`;

export const Info = styled.div`
  padding-left: 5px;
  line-height: 24px;
  font-size: 16px;
  color: #38302e;

  p {
    margin-bottom: 3px;

    &:last-child {
      margin-bottom: 0;
    }

    .pid {
      cursor: pointer;
    }
  }

  .can-copy {
    cursor: pointer;
  }

  .nft-getting {
    vertical-align: middle;
    margin-right: 3px;

    .MuiCircularProgress-root {
      color: #38302e;
    }
  }

  .binding {
    display: inline-block;
    margin-left: 10px;
    padding: 0 15px;
    background: #e9624b;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;

    line-height: 30px;
  }
  .binding:hover {
    cursor: pointer;
  }

  strong {
    margin-right: 10px;
  }
`;

export const User = styled.div`
  ${flexAlign}

  .ava img {
    display: block;
    width: 45px;
    height: 45px;
    margin-right: 18px;
    border-radius: 10px;
    background-color: #f4f4f4;
  }

  .logout {
    ${flexAlign}
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);

    i {
      width: 16px;
      height: 16px;
      font-size: 16px;
      //background-image: url(${Quit});
      background-size: 100%;
      margin-right: 3px;
    }
  }
  .logout:hover {
    cursor: pointer;
    color: #fa6e58;
    i {
      color: #fa6e58;
    }
  }
`;

export const UserInfo = styled.div`
  position: relative;
  z-index: 100;

  &:hover {
    .user-pop {
      display: block;
    }
  }

  div.address {
    padding: 0 32px;
    line-height: 40px;
    background: #e76350;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
  }

  .user-pop {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 15px;
    width: 215px;
    padding: 30px;
    background: #fff;
    font-size: 14px;
    color: #333333;
    box-shadow: 0px 1px 12px 1px rgba(0, 0, 0, 0.2);
    border-radius: 8px 0px 8px 8px;
    box-sizing: border-box;

    &:before {
      content: "";
      height: 15px;
      position: absolute;
      left: 0;
      right: 0;
      top: -15px;
    }
  }

  .line {
    height: 1px;
    background: #eee;
    line-height: 0;
    overflow: hidden;
  }

  .item {
    ${flexBetween};
    margin: 15px 0;

    .value {
      font-weight: 400;
      font-size: 12px;
    }

    a {
      color: #333333;

      &:hover {
        color: #fa6e58;
      }
    }
  }

  .can-click {
    cursor: pointer;
  }

  .logo {
    margin-top: 0;
    margin-bottom: 20px;

    img {
      border-radius: 5px;
      background: #e6e6e6;
    }

    span {
      font-weight: 600;
      color: #000000;
    }
  }

  .logout {
    margin-top: 26px;
    display: flex;
    justify-content: center;
  }

  .logout-btn {
    // line-height: 35px;
    padding: 5px;
    // border: 1px solid #cccccc;
    // border-radius: 6px;
    color: #919191;
    font-size: 14px;
    cursor: pointer;

    &:hover,
    &:hover .iconfontdmail {
      color: #fa6e58;
    }

    // &:hover {
    //   border-color: #fa6e58;
    // }

    i {
      font-size: 16px;
      margin-right: 5px;
    }
  }
`;

export const SearchChunk = styled.div`
  ${flexAlign}
`;

export const Search = styled.div`
  ${flexAlign}

  height: 36px;
  background: #f4f3f3;
  border-radius: 8px;
  padding: 0 10px;

  input {
    flex: 1;
    line-height: 20px;
    border: none;
    background: transparent;
    font-size: 14px;
    min-width: 0;

    &::placeholder {
      color: rgba(56, 48, 46, 0.3);
    }
  }

  .search-btn {
    width: 16px;
    height: 16px;
    background: url(${SearchBar}) no-repeat;
    margin-left: 20px;
    background-size: 100%;
    flex-shrink: 0;
  }
  .search-btn:hover {
    cursor: pointer;
  }

  // @media (max-width: 1800px) {
  //   width: 14vw;

  //   input {
  //     font-size: 14px;
  //   }
  // }
`;

export const Redirect = styled.div`
  ${flexAlign}
  margin-left: 68px;
  color: #b4b0af;
  font-size: 20px;
  font-weight: 600;
  position: relative;

  strong {
    color: #38302e;
  }

  .to {
    ${flexAlign}
    color: #B4B0AF;
    cursor: pointer;

    span {
      margin: 0 8px;
    }
  }

  @media (max-width: 1800px) {
    margin-left: 45px;
    font-size: 16px;
  }
`;

export const GoPage = styled.div`
  ${flexAlign}
  position: absolute;
  right: 0;
  top: 100%;
  padding: 0 16px;
  height: 60px;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 6px 8px 1px rgba(183, 173, 171, 0.45);
  color: #7c7370;
  font-size: 20px;
  display: none;

  &.on {
    display: flex;
  }

  span {
    white-space: nowrap;
  }

  input {
    width: 60px;
    height: 30px;
    margin: 0 10px;
    padding: 0 10px;
    border: 1px solid #bfb7b6;
    color: #7c7370;
    font-size: 16px;

    &::-webkit-inner-spin-button {
      display: none !important;
    }
  }

  a {
    color: #463f3d;
    cursor: pointer;
  }
`;

export const UseLimit = styled.div`
  position: absolute;
  bottom: 40px;
  left: 20px;
  right: 20px;
  color: #fff;
  font-size: 12px;

  .limit {
    span {
      color: #fa6e58;
    }
  }

  .use-volume {
    height: 8px;
    background: #fff;
    margin: 10px 0;
    border-radius: 2px;
    overflow: hidden;

    i {
      height: 100%;
      display: block;
      // position: absolute;
      background: #e9624b;
    }
  }
`;
