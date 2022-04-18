import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  Children,
} from "react";
import styled, { keyframes } from "styled-components";

import { flex, flexAlign, flexBetween } from "../css.common";

import { Search, Redirect, GoPage, SearchChunk } from "./css";

const Root = styled.div`
  ${flexBetween}
  padding: 18px 5px;
  border-bottom: 3px solid #f4f5f5;
`;

const SearchBar = ({ children }) => {
  const [showRedirect, setShowRedirect] = useState(false);

  const closeRedirect = (ev) => {
    if (
      !ev.target.classList.contains("_redirectPop") &&
      !ev.target.parentElement.classList.contains("_redirectPop")
    ) {
      setShowRedirect(false);
    }
  };
  // const Search = () => {
  //   console.log(111);
  // }

  const SearchList = () => {
   console.log(11111);
  };
  useEffect(() => {
    document.body.addEventListener("click", closeRedirect);

    return () => {
      document.body.removeEventListener("click", closeRedirect);
    };
  }, []);

 
  return (
    <>
      <Root>
        {children}
        <SearchChunk>
          <Search>
            <input type="text" placeholder="Search" />
            <div className="search-btn" onClick={ SearchList }></div>
          </Search>
          {/* <Redirect>
            <div className="page">
              <strong>1</strong>/9
            </div>
            <div
              className="to _redirectPop"
              onClick={() => setShowRedirect(true)}
            >
              <span>&gt;</span> redirect to
            </div>
            <GoPage
              className={`${showRedirect ? "on _redirectPop" : "_redirectPop"}`}
            >
              <span>Redirect to</span>
              <input type="number" />
              <a>Go</a>
            </GoPage> */}
          {/* </Redirect> */}
        </SearchChunk>
      </Root>
    </>
  );
};

export default SearchBar;
