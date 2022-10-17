import styled, { keyframes } from "styled-components";
import {
  Tabs,
  flex,
  LoginLogo,
  flexAlign,
  flexBetween,
  flexJustBetween,
  FlexWrapper,
  FlexAlignWrapper,
  FlexBetweenWrapper,
  FlexJustBetweenWrapper,
} from "../../components/css.common";

export {
  Tabs,
  LoginLogo,
  FlexWrapper,
  FlexAlignWrapper,
  FlexBetweenWrapper,
  FlexJustBetweenWrapper,
};

export const Root = styled.div`
  padding: 30px;

  .chunk {
    padding: 35px 0;
    background: #ffffff;
    border-bottom: 3px solid #eeeeee;
    // box-shadow: 0px 0px 21px 1px rgba(0, 0, 0, 0.2);
    // border-radius: 8px;

    &:last-child {
      border-bottom: none;
    }
  }

  .account {
    .content {
      flex: 3;

      & > div {
        padding: 0 60px;
      }
    }
  }

  .name,
  .content {
    flex: 1;
  }

  .name {
    ${flexAlign};
    justify-content: center;

    & > div {
      width: 220px;
    }
    h2 {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 20px;
    }
    p {
      margin-top: 10px;
      font-size: 14px;
      font-weight: 400;
      color: #999999;
      line-height: 16px;
    }
  }

  .content {
    flex: 2;

    & > div {
      padding: 0 150px;
    }

    .nft-getting {
      vertical-align: middle;
      margin-right: 3px;

      .MuiCircularProgress-root {
        color: #666;
        font-size: 14px;
      }
    }
  }

  .usage {
    .content {
      padding-bottom: 10px;
      flex-direction: column;
      position: relative;

      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: #f0f0f0;
      }
    }

    h3 {
      padding: 5px 0 10px;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      color: #333333;
      line-height: 20px;
    }

    li {
      ${flexBetween};
      margin-top: 20px;
      font-size: 14px;
      line-height: 16px;

      .label {
        color: #666666;
      }

      p {
        color: #333;
      }

      .red {
        color: #e76350;
      }

      .gray {
        color: #999;
      }

      .ride {
        font-size: 16px;
        transform: rotate(45deg);
        display: inline-block;
        margin-right: 2px;
      }
    }

    .more {
      margin-top: 25px;

      a {
        line-height: 32px;
        padding: 0 10px;
        color: #e76350;
        border: 1px solid #e76350;
        border-radius: 5px;
        display: inline-block;
        margin-left: 15px;
        transition: all 0.3s ease 0s;

        &:hover {
          background: #e9624b;
          color: #fff;
        }
      }
    }
  }

  .account {
    .name {
      & > div {
        width: 180px;
      }
      h2 {
        white-space: nowrap;
      }
    }
  }

  .address {
    p {
      margin-bottom: 15px;

      span {
        font-size: 14px;
        color: #666;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
    .label {
      margin-bottom: 10px;
    }
  }

  .login {
    .login-type {
      ${flexAlign};
      margin-bottom: 15px;

      i {
        margin-right: 15px;
      }
    }
  }

  .nfts {
    padding: 35px 0 5px;

    .content {
      min-height: 116px;
    }
  }
`;

export const Title = styled.div`
  margin-bottom: 30px;
  line-height: 24px;
  font-size: 20px;
  font-weight: bold;
  color: #e76350;
`;

export const Upload = styled.div`
  position: relative;
  cursor: pointer;

  input {
    position: absolute;
    width: 100%;
    height: 32px;
    opacity: 0;
    cursor: pointer;
  }

  a {
    text-align: center;
    display: block;
  }
`;
