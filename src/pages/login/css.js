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
import L1 from "../../static/images/login-l1.png";
import L2 from "../../static/images/login-l2.png";
import L3 from "../../static/images/login-l3.png";
import L4 from "../../static/images/login-l4.png";
import Red from "../../static/images/red.png";
import Yellow from "../../static/images/yellow.png";
import Blue from "../../static/images/blue.png";

export {
  FlexWrapper,
  FlexAlignWrapper,
  FlexBetweenWrapper,
  FlexJustBetweenWrapper,
};

export const Root = styled.div`
  background: #fff center;
  background-size: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .bubble {
    width: 280px;
    height: 280px;
    position: fixed;
    background: no-repeat center;
    background-size: 100%;

    &.red {
      right: 0;
      top: 20%;
      transform: translateX(140px);
      background-image: url(${Red});
    }
    &.yellow {
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-330px);
      background-image: url(${Yellow});
    }
    &.blue {
      left: 0;
      bottom: 0;
      transform: translateX(-100px) translateY(100px);
      background-image: url(${Blue});
    }
  }
`;

export const Content = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  margin-top: -60px;

  color: #333333;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;

  .logo {
    text-align: center;

    img {
      width: 238px;
    }

    p {
      margin-top: 15px;
    }
  }

  .login {
    margin-top: 50px;
    padding: 40px 114px;
    width: 312px;
    background: #FFFFFF;
    border-radius: 20px;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
  }

  .split-line {
    ${flexAlign};
    height: 1px;
    margin-top: 48px;
    margin-bottom: 28px;

    &:before,
    &:after {
      flex: 1;
      content: "";
      height: 1px;
      background: #eee;
    }

    span {
      position: relative;
      top: -1px;
      width: 78px;
      line-height: 20px;
      // font-size: 16px;
      // font-weight: 600;
      text-align: center;
    }
  }

  .btns {
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
  }

  .main-btn {
    margin-bottom: 20px;

    a {
      .bnb {
        height: 27px;
      }
    }
  }

  .other-btns {
    ${flexAlign};
    justify-content: space-around;

    a {
      ${flexAlign};
      justify-content: center;
      width: 38px;
      height: 38px;
      padding: 0;
      margin: 0;
      line-height: 38px;
      background: #FFFFFF;
      box-shadow: 0 0 10px 3px rgb(0, 0, 0, .1);
      cursor: pointer;
      border-radius: 8px;
      transition: background 0.5s ease;

      &:hover {
        background: #F5F5F5;
      }
    }

    i {
      margin: 0;
      border-radius: 50%;
    }
  }

  .help {
    position: absolute;
    left: 50%;
    top: 100%;
    margin-top: 40px;
    transform: translateX(-50%);

    a {
      color: #FF563F;
      font-size: 14px;
      line-height: 16px;
      padding-bottom: 5px;
      border-bottom: 1px solid #FF563F;

      &:hover {
        border-color: #333;
        color: #333;
      }
    }
  }
`;

export const Links = styled.div`
  ${flexAlign};
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 40px;

  @media (max-height: 650px) {
    display: none;
  }

  a {
    width: 32px;
    height: 32px;
    margin-right: 30px;
    background: url(${L1}) no-repeat;
    background-size: 100%;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.15);
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .telegram {
    background-image: url(${L2});
  }
  .m {
    background-image: url(${L3});
  }
  .discord {
    background-image: url(${L4});
  }
`
