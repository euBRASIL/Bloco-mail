import React, { forwardRef } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import styled, { keyframes } from "styled-components";

import Nav from "./layout/nav";
import Top from "./layout/top";

import { flex, flexAlign, flexBetween, flexJustBetween } from "./css.common";

const Root = styled.div`
  // min-width: 1400px;
  ${flex}
  height: 100%;
  // overflow: auto;
`;

const Main = styled.div`
  padding: 2vw;
  flex: 1;
  // overflow-y: auto;

  &.main-scroll {
    height: calc(100vh - 4vw);
    overflow-y: auto;

    .main-chunk {
      height: auto;
    }
  }

  .main-chunk {
    height: calc(100vh - 187px);
    // overflow-y: auto;
    padding: 0 32px 0 32px;
    .content-chunk{
    // height:100%
    }
  }

  .main-compose {
    padding: 0;
    background-color: transparent;
  }
  
  .main-setting {
    padding: 30px 0;
  }

  .no-search {
    border-top: none;

    .content-chunk {
      height:calc(100% - 159px);
      padding-top: 30px;
    }
  }
`;

const Container = forwardRef(({ location: { pathname }, children, noTop, ...props }, ref) => {
  const isMainScroll = pathname.includes('/setting')

  return (
    <Root ref={ ref }>
      <Nav />
      <Main className={isMainScroll ? 'main-scroll' : ''}>
        { noTop ? null : <Top /> }
        <div className={ `chunks main-chunk main-${pathname.replaceAll('/', '')}` }>
          <div className="content-chunk">{ children }</div>
        </div>
      </Main>
    </Root>
  );
});

export default withRouter(Container);
