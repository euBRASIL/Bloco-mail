import styled, { keyframes } from "styled-components";
import {
  flexAlign,
  flexBetween,
  FlexWrapper,
  FlexAlignWrapper,
  FlexBetweenWrapper,
  FlexJustBetweenWrapper,
} from "../../components/css.common";

import Bg from "../../static/images/login-bg.jpg";
import Star from "../../static/images/star.png";
import Identity from "../../static/images/login-identity.png";
import Plug from "../../static/images/login-plug2.png";
import Metamask from "../../static/images/login-metamask.png";
import Infinityswap from "../../static/images/infinityswap-logo.png";

export {
  FlexWrapper,
  FlexAlignWrapper,
  FlexBetweenWrapper,
  FlexJustBetweenWrapper,
};

export const Root = styled.div`
  background: url(${Bg});
  background-size: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  &:before {
    content: "";
    background: url(${Star});
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
  }
`;

export const Content = styled.div`
  position: absolute;
  width: 640px;
  left: 50%;
  top: 45%;
  transform: translateX(-50%) translateY(-50%);

  .logo {
    text-align: center;
    color: #fff;
    font-size: 18px;

    img {
      width: 300px;
    }

    p {
      margin-left: -100px;
      margin-right: -100px;
      margin-top: 12px;
      line-height: 22px;
    }
  }

  .login {
    margin-top: 60px;
    background: rgba(255, 255, 255, 0.08);
    padding: 20px 55px 32px;
    border-radius: 34px;
  }

  .welcome {
    line-height: 28px;
    font-size: 26px;
    color: #fff;
    text-align: center;
  }

  .help {
    margin-top: 30px;
    text-align: center;

    a {
      color: #999;
      line-height: 18px;
    }
  }

  .split-line {
    ${flexAlign};
    height: 1px;
    margin-top: 38px;
    margin-bottom: 30px;

    &:before,
    &:after {
      flex: 1;
      content: "";
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
    }

    span {
      position: relative;
      top: -2px;
      width: 78px;
      line-height: 20px;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      text-align: center;
    }
  }

  .btns {
    margin-top: 30px;

    a {
      position: relative;
      overflow: hidden;

      .loading {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        ${flexAlign};
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);

        .MuiCircularProgress-svg {
          color: #fff;
        }
      }
    }

    .plug {
      background-image: url(${Plug});
      background-size: 45px 45px;
    }

    .metamask {
      background-image: url(${Metamask});
      background-size: 32px 30px;
    }

    .infinityswap {
      background-image: url(${Infinityswap});
      background-size: 45px 35px;
    }

    .identity {
      background-image: url(${Identity});
      background-size: 36px 20px;
    }
  }

  .main-btn {
    a {
      ${flexBetween};
      position: relative;
      width: 272px;
      margin: 0 auto;
      box-sizing: border-box;
      line-height: 48px;
      padding: 12px 52px;
      border-radius: 36px;
      background: #ff563f;
      font-size: 20px;
      cursor: pointer;
      color: #fff;

      strong {
        font-weight: normal;
      }

      &:hover {
        background: #df4631;
      }
      // .itemLoading {
      //   vertical-align: middle;
      //   margin-right: 10px;
      // }

      i {
        width: 48px;
        height: 48px;
        background: no-repeat center;
      }
    }
  }

  .other-btns {
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      margin-right: 60px;
      cursor: pointer;
      border-radius: 50%;

      &:last-child {
        margin-right: 0;
      }
    }

    i {
      display: block;
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: #fff no-repeat center;
    }

    .plug {
      background-size: 18px 25px;
    }
  }

  @media (max-width: 1790px) {
    // @media (max-width: 100px) {
    width: 470px;
    top: 40%;

    .welcome {
      font-size: 24px;
    }

    .logo {
      img {
        width: 270px;
      }
      p {
        margin-top: 15px;
      }
    }

    .login {
      padding: 18px 40px;
      margin-top: 52px;
    }

    .split-line {
      margin-top: 28px;
      margin-bottom: 25px;

      span {
        width: 55px;
      }
    }

    .main-btn {
      a {
        width: 200px;
        padding: 9px 35px;
        line-height: 35px;
        font-size: 16px;

        i {
          width: 35px;
          height: 35px;
        }
      }
    }

    .btns {
      i {
        width: 45px;
        height: 45px;
      }

      .metamask {
        background-size: 22px 21px;
      }

      .plug {
        background-size: 30px 30px;
      }

      .infinityswap {
        background-size: 30px 23px;
      }

      .identity {
        background-size: 27px 15px;
      }
    }

    .other-btns {
      a {
        margin-right: 34px;
      }
    }

    .help {
      margin-top: 20px;
    }
  }
`;
