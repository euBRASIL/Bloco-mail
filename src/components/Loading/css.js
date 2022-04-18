import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { flexAlign } from '../css.common'
  
export const SpinRoot = styled.div`
    position: relative;

    .loading, .mask {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .center {
        height: 100%;
        justify-content: center;
    }

    .mask {
        background: rgba(255, 255, 255, 0.45);
    }
`

export const  LoadMoreRoot = styled.div`
    ${flexAlign}
    justify-content: center;
    padding: 20px 0;
    font-size: 16px;
    color: #777;

    span {
        margin-left: 15px;
    }
`

export const  ButtonLoadingRoot = styled.span`
    ${flexAlign}
    margin-right: 8px;

    .MuiCircularProgress-root {
        color: ${({ color }) => color};
    }
`