import React, { forwardRef } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import styled, { keyframes } from "styled-components";
import { observer, inject } from "mobx-react";

import { Spin } from "@/components/Loading";
import Nav from "./layout/nav";
import Top from "./layout/top";
import { flex, flexAlign, flexBetween, flexJustBetween } from "./css.common";
import { NavList } from './layout/utils'

const Root = styled.div`
  // min-width: 1400px;
  ${flex}
  height: 100%;
  // overflow: auto;
`;

const Main = styled.div`
  padding: 1vw;
  flex: 5;
  // overflow-y: auto;

  &.main-scroll {
    // height: calc(97vh-50px);
    overflow-y: auto;

    .main-chunk {
      height: auto;
    }
  }

  &.nomain-scroll {
    // height: calc(97vh-50px);
    overflow-y: hidden;

    .main-chunk {
      //height: auto;
    }
  }

  .main-chunk {
    //height: calc(100vh - 188px);
    overflow-y: auto;
    padding: 0 6px;
    .content-chunk{
    // height:100%
    }
  }

  .main-compose {
    // height: calc(100vh - 184px);
    padding: 0;
    background-color: transparent;
  }
  
  // .main-setting {
  //   height: calc(100vh - 184px);
  //   overflow-y: hidden;
  //   padding: 30px 40px;

  //   &>div {
  //     height: 100%;
  //     overflow-y: auto;
  //   }
  // }

  .no-search {
    border-top: none;

    .content-chunk {
      height:calc(100% - 159px);
      padding-top: 30px;
    }
  }
`;

const Container = forwardRef(({ location: { pathname }, children, noTop, store, ...props }, ref) => {
  const { initing } = store.common;
  //const isMainScroll = pathname.includes('/setting') || pathname.includes('/compose')
  const fPath = NavList.filter(({ path }) => pathname.includes(path))
  let path = fPath.length ? fPath[0].path : '/common'
  path = path.split('/').length > 1 ? path.split('/')[1] : ''

  return (
    <Root ref={ ref }>
      <Nav />
      {/* <Main className={isMainScroll ? 'main-scroll' : ''}> */}
      <Main className="nomain-scroll">
        { noTop ? null : <Top /> }
        <div className={ `chunks main-chunk main-${path}` }>
          <Spin loading={ initing } text="Canister ID initialization..." maskStyle={ { background: 'rgba(255, 255, 255, 0.85)' } }>
            <div className="content-chunk">{ children }</div>
          </Spin>
        </div>
      </Main>
    </Root>
  );
});

export default withRouter(inject("store")(observer(Container)));
