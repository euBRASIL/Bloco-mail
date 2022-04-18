import styled, { keyframes } from 'styled-components';
import {
  flex, flexAlign, flexBetween, flexJustBetween,
  FlexWrapper, FlexAlignWrapper, FlexBetweenWrapper, FlexJustBetweenWrapper
} from '../css.common'

import Assets from '../../static/images/nav/assets.png'
import AssetsHover from '../../static/images/nav/assets-hover.png'
import Compose from '../../static/images/nav/compose.png'
import ComposeHover from '../../static/images/nav/compose-hover.png'
import Drafts from '../../static/images/nav/drafts.png'
import DraftsHover from '../../static/images/nav/drafts-hover.png'
import Inbox from '../../static/images/nav/inbox.png'
import InboxHover from '../../static/images/nav/inbox-hover.png'
import Nft from '../../static/images/nav/nft.png'
import NftHover from '../../static/images/nav/nft-hover.png'
import Sent from '../../static/images/nav/sent.png'
import SentHover from '../../static/images/nav/sent-hover.png'
import Setting from '../../static/images/nav/setting.png'
import SettingHover from '../../static/images/nav/setting-hover.png'
import Spam from '../../static/images/nav/spam.png'
import SpamHover from '../../static/images/nav/spam-hover.png'
import Star from '../../static/images/nav/star.png'
import StarHover from '../../static/images/nav/star-hover.png'
import Trash from '../../static/images/nav/trash.png'
import TrashHover from '../../static/images/nav/trash-hover.png'
import SearchBar from '../../static/images/search.png';
import Quit from '../../static/images/quit.png'

export { FlexWrapper, FlexAlignWrapper, FlexBetweenWrapper, FlexJustBetweenWrapper }

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 13vh;
  img {
    height: 5.5vh;
    width:auto;
  }
`

export const Nav = styled.div`
  margin: 0 0 0 3.7vw;

  .li {
    ${flexAlign}
    margin-bottom: 2px;
    height: 6vh;
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    position: relative;

    .unread {
      display: none;
      position: absolute;
      right: 50px;
      top: 50%;
      transform: translateX(50%) translateY(-50%);
      min-width: 10px;
      padding: 0 9px;
      height: 28px;
      line-height: 28px;
      background: #E9624B;
      border-radius: 28px;
      text-align: center;
      color: #fff;
      font-size: 18px;
      font-weight: 600;
    }

    .show {
      display: block;
    }

    i {
      margin-right: 30px;
      background-size: 100%;
    }

    .Inbox {
      width: 30px;
      height: 23px;
      background-image: url(${Inbox});
    }
    .Compose {
      width: 30px;
      height: 21px;
      background-image: url(${Compose});
    }
    .Starred {
      width: 30px;
      height: 28px;
      background-image: url(${Star});
    }
    .Sent {
      width: 27px;
      height: 27px;
      background-image: url(${Sent});
    }
    .Drafts {
      width: 24px;
      height: 27px;
      background-image: url(${Drafts});
    }
    .Spam {
      width: 29px;
      height: 23px;
      background-image: url(${Spam});
    }
    .Trash {
      width: 26px;
      height: 28px;
      background-image: url(${Trash});
    }
    .Setting {
      width: 27px;
      height: 28px;
      background-image: url(${Setting});
    }
    .Assets {
      width: 24px;
      height: 26px;
      background-image: url(${Assets});
    }
    .Nft {
      width: 26px;
      height: 27px;
      background-image: url(${Nft});
    }

    &.on, &:hover {
      background: linear-gradient(-90deg, rgba(233, 99, 75, 0.31), rgba(39, 37, 36, 0.31));
      color: #FA6E58;

      &:after {
        content: '';
        width: 6px;
        position: absolute;
        right: 0;
        top:0;
        bottom: 0;
        background: #FF5640;
        border-radius: 5px 0px 0px 5px;
      }

      .Inbox {
        background-image: url(${InboxHover});
      }
      .Compose {
        background-image: url(${ComposeHover});
      }
      .Starred {
        background-image: url(${StarHover});
      }
      .Sent {
        background-image: url(${SentHover});
      }
      .Drafts {
        background-image: url(${DraftsHover});
      }
      .Spam {
        background-image: url(${SpamHover});
      }
      .Trash {
        background-image: url(${TrashHover});
      }
      .Setting {
        background-image: url(${SettingHover});
      }
      .Assets {
        background-image: url(${AssetsHover});
      }
      .Nft {
        background-image: url(${NftHover});
      }
    }
  }
`

export const SplitLine = styled.div`
  width: 164px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 2vh 0;
`

export const Info = styled.div`
  padding-left: 5px;
  line-height: 24px;
  font-size: 20px;
  color: #38302E;

  p {
    margin-bottom: 3px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .binding {
    display: inline-block;
    margin-left: 10px;
    padding: 0 15px;
    background: #E9624B;
    border-radius: 5px;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    line-height: 30px;
  }
  .binding:hover{
    cursor:pointer
  }

  strong {
    margin-right: 10px;
  }
`

export const User = styled.div`
  ${flexAlign}

  .ava img {
    display: block;
    width: 50px;
    height: 50px;
    margin-right: 25px;
    border-radius: 10px;
    background-color: #f4f4f4;
  }

  .logout {
    ${flexAlign}
    font-size: 20px;
    color: rgba(0, 0, 0, .3);

    i {
      width: 20px;
      height: 20px;
      background-image: url(${Quit});
      background-size: 100%;
      margin-right: 6px;
    }
    
  }
  .logout:hover{
      cursor:pointer
    }
`

export const SearchChunk = styled.div`
  ${flexAlign}
  
`

export const Search = styled.div`
  ${flexAlign}

  //width: 485px;
  height: 48px;
  background: #F4F3F3;
  border-radius: 10px;
  padding: 0 18px;

  input {
    flex: 1;
    line-height: 24px;
    border: none;
    background: transparent;
    font-size: 22px;

    &::placeholder {
      color: rgba(56, 48, 46, 0.3);
    }
  }

  .search-btn {
    width: 23px;
    height: 23px;
    background: url(${SearchBar}) no-repeat;
    margin-left: 20px;
    background-size: 100%;
  }
  .search-btn:hover{
    cursor:pointer
  }

  @media (max-width: 1800px) {
    width: 320px;

    input {
      font-size: 18px;
    }
  }
`

export const Redirect = styled.div`
  ${flexAlign}
  margin-left: 68px;
  color: #B4B0AF;
  font-size: 20px;
  font-weight: 600;
  position: relative;

  strong {
    color: #38302E;
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
    font-size: 18px;
  }
`

export const GoPage = styled.div`
  ${flexAlign}
  position: absolute;
  right: 0;
  top: 100%;
  padding: 0 16px;
  height: 60px;
  background: #FFFFFF;
  border: 1px solid #F0F0F0;
  box-shadow: 0px 6px 8px 1px rgba(183, 173, 171, 0.45);
  color: #7C7370;
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
    border: 1px solid #BFB7B6;
    color: #7C7370;
    font-size: 18px;

    &::-webkit-inner-spin-button {
      display: none!important;
    }
  }

  a {
    color: #463F3D;
    cursor: pointer;
  }
`
