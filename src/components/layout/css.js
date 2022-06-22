import styled, { keyframes } from 'styled-components';
import {
  flex, flexAlign, flexBetween, flexJustBetween,
  FlexWrapper, FlexAlignWrapper, FlexBetweenWrapper, FlexJustBetweenWrapper
} from '../css.common'

import SearchBar from '../../static/images/search.png';
import Quit from '../../static/images/quit.png'

export { FlexWrapper, FlexAlignWrapper, FlexBetweenWrapper, FlexJustBetweenWrapper }

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 14vh;
  img {
    height: 5vh;
    width:auto;
  }
`

export const Nav = styled.div`
  margin: 10px 0 0 3vw;

  .li {
    ${flexAlign}
    height: 4vh;
    margin-bottom: 10px;
    font-size: 16px;
    //font-weight: bold;
    font-family: PingFangSC-Regular;
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
      background: #E9624B;
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

    &.on, &:hover {
      background: linear-gradient(-90deg, rgba(233, 99, 75, 0.31), rgba(39, 37, 36, 0.31));
      color: #FA6E58;

      &:after {
        content: '';
        width: 5px;
        position: absolute;
        right: 0;
        top:0;
        bottom: 0;
        background: #E9624B;
        border-radius: 4px 0px 0px 4px;
      }
    }
  }
`

export const SplitLine = styled.div`
  width: 164px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 2.8vh 0;
`

export const Info = styled.div`
  padding-left: 5px;
  line-height: 24px;
  font-size: 16px;
  color: #38302E;

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

  .binding {
    display: inline-block;
    margin-left: 10px;
    padding: 0 15px;
    background: #E9624B;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;

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
    width: 45px;
    height: 45px;
    margin-right: 18px;
    border-radius: 10px;
    background-color: #f4f4f4;
  }

  .logout {
    ${flexAlign}
    font-size: 16px;
    color: rgba(0, 0, 0, .5);

    i {
      width: 16px;
      height: 16px;
      font-size: 16px;
      //background-image: url(${Quit});
      background-size: 100%;
      margin-right: 3px;
    }
    
  }
  .logout:hover{
    cursor: pointer;
    color: #FA6E58;
    i {
      color: #FA6E58;
    }
  }
`

export const SearchChunk = styled.div`
  ${flexAlign}
  
`

export const Search = styled.div`
  ${flexAlign}

  height: 36px;
  background: #F4F3F3;
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
    flex-shrink:0;
  }
  .search-btn:hover{
    cursor:pointer
  }

  // @media (max-width: 1800px) {
  //   width: 14vw;

  //   input {
  //     font-size: 14px;
  //   }
  // }
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
    font-size: 16px;
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
    font-size: 16px;

    &::-webkit-inner-spin-button {
      display: none!important;
    }
  }

  a {
    color: #463F3D;
    cursor: pointer;
  }
`

export const UseLimit = styled.div`
  position: absolute;
  bottom: 40px;
  left: 20px;
  right: 20px;
  color: #fff;
  font-size: 12px;

  .limit {
    span {
      color: #FA6E58;
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
      background: #E9624B;
    }
  }
`