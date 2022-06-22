import styled, { keyframes } from "styled-components";
import {
  flex,
  flexAlign,
  flexBetween,
  flexJustBetween,
  FlexWrapper,
  FlexAlignWrapper,
  FlexAlignRightWrapper,
  FlexBetweenWrapper,
  FlexJustBetweenWrapper,
} from "@/components/css.common";

import { Checked, collect } from "@/components/emails/css";

import File from "@/static/images/icon-file.png";
import Unread from "@/static/images/email.png";
import Read from "@/static/images/email2.png";
import Delete from "@/static/images/delete.png";
import RealDelete from "@/static/images/real-delete.png";
import Undelete from "@/static/images/undelete.png";
import Report from "@/static/images/report.png";
import Attach from "@/static/images/inbox/attach.png";
import Assets from "@/static/images/inbox/assets.png";

export {
  FlexWrapper,
  FlexAlignWrapper,
  FlexAlignRightWrapper,
  FlexBetweenWrapper,
  FlexJustBetweenWrapper,
};

export const Root = styled.div`
  ${flex}
  height: calc(100vh - 166px);
  overflow: hidden;

  .right {
    width: calc(100vw - 896px);
  }
`;

export const Left = styled.div`
  // padding-top: 30px;
  width: 400px;
  border-right: 2px solid #f4f5f5;

  // @media (max-width: 1800px) {
  //     width: 400px;
  // }

  // @media (max-width: 1600px) {
  //     width: 300px;
  // }
`;

export const SearchActions = styled.div`
  ${flexAlign}

  .chunk {
    ${flexAlign}
    border-right: 2px solid #F4F5F5;
    margin-right: 35px;

    &:last-child {
      border-right: none;
      margin-right: 0;
    }

    div {
      margin-right: 35px;
      //cursor: pointer;
    }
  }

  .checkbox {
    width: 16px;
    height: 16px;
    margin-right: 18px;
    border: 2px solid #a59d9d;
    border-radius: 5px;
    cursor: pointer;
  }

  .checked {
    ${Checked}
  }

  .unread {
    width: 27px;
    height: 20px;
    background: url(${Unread}) no-repeat;
    background-size: 100%;
  }

  .read {
    width: 25px;
    height: 25px;
    background: url(${Read}) no-repeat;
    background-size: 100%;
  }

  .collect {
    ${collect}
  }

  .realdelete {
    width: 24px;
    height: 24px;
    background: url(${RealDelete}) no-repeat;
    background-size: 100%;
  }

  .undelete {
    width: 20px;
    height: 23px;
    background: url(${Undelete}) no-repeat;
    background-size: 100%;
  }

  .delete {
    width: 22px;
    height: 25px;
    background: url(${Delete}) no-repeat;
    background-size: 100%;
  }

  .report {
    width: 27px;
    height: 24px;
    background: url(${Report}) no-repeat;
    background-size: 100%;
  }

  @media (max-width: 1800px) {
    .chunk {
      margin-right: 25px;

      div {
        margin-right: 25px;
      }
    }
  }
`;

export const Menus = styled.div`
  ${flexBetween}
  height: 40px;
  line-height: 40px;
  padding-bottom: 20px;
  padding-right: 24px;
  border-bottom: 3px solid #f4f5f5;
  position: relative;
  font-size: 20px;

  ul {
    ${flexAlign}
  }

  li {
    padding: 0 8px;
    font-size: 16px;
    color: #b8b2b2;
    // font-weight: bold;
    margin-right: 25px;
    font-size: 20px;
    cursor: pointer;

    &.on {
      color: #e9624b;
    }
  }

  .orders {
    ${flexAlign}
    color: #BCBCBC;
    font-weight: 500;
    cursor: pointer;

    i {
      width: 18px;
      height: 18px;
      margin-left: 8px;
      background: #ddd;
    }
  }

  .focusLine {
    position: absolute;
    top: 100%;
    left: 0;
    height: 3px;
    background: #e9624b;
    transition: all 0.3s ease-out;
  }

  // @media (max-width: 1800px) {

  // }
`;

export const List = styled.div`
  overflow-y: auto;
  // height: calc(100vh - 409px);
  height: 100%;
  margin-left: -30px;

  li {
    &::after {
      content: "";
      display: block;
      margin-left: 33px;
      height: 1px;
      background: #f4f5f5;
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
  }

  .actions {
    .icons {
      height: 18px;
      text-align: end;
      .coin {
        width: 18px;
        height: 18px;
        background-color: #ddd;
        margin-right: 15px;
        background: url(${Assets}) no-repeat;
        background-size: 100%;
      }
      .files {
        width: 18px;
        height: 18px;
        margin-right: 15px;
        background: url(${Attach}) no-repeat;
        background-size: 100%;
      }
      .collect {
        ${collect}
        width: 22px;
        height: 22px;
        margin-right: 15px;
      }
    }
    .date {
      margin-top: 0px;
      color: #a59d9d;
      font-size: 12px;
    }
  }

  .unread {
    .ename {
      i {
        display: inline-block;
      }
    }
    .content {
      .title {
        color: #38302e;
      }
      .desc {
        color: #696260;
      }
    }
    .id {
      color: #a59d9d;
    }
    .actions {
      .date {
        color: #38302e;
      }
    }
  }
`;
