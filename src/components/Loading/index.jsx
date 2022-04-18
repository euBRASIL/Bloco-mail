import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SpinRoot, LoadMoreRoot, ButtonLoadingRoot } from './css'

import {  
  FlexAlignWrapper
} from '@/components/css.common'

export const ButtonLoading = ({ size = 20, color = '#fff', rootStyle = {} }) => {

  return (
    <ButtonLoadingRoot color={color} style={rootStyle}>
      <CircularProgress size={size} />
    </ButtonLoadingRoot>
  )
}

const loadingTheme = createTheme({
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        colorPrimary: {
          color: '#999',
        },
      },
    }
  }
})

export const Loading = ({ size = 18, text = 'loading...', rootStyle = {} }) => {
  return (
    <ThemeProvider theme={loadingTheme}>
      <LoadMoreRoot style={rootStyle}>
        <CircularProgress size={size} />
        <span>{text}</span>
      </LoadMoreRoot>
    </ThemeProvider>
  )
}

export const Spin = ({ loading, children, maskStyle = {} }) => {

  return (
    <SpinRoot>
      {children}
      {loading && (
        <div className="loading">
          <div className="mask" style={{ ...maskStyle }} />
          <FlexAlignWrapper className="center">
            <CircularProgress />
          </FlexAlignWrapper>
        </div>
      )}
    </SpinRoot>
  )
}

// export default function CircularIndeterminate() {
//   return (
//     <div
//       style={{
//         position: "fixed",
//         width: "100%",
//         height: "100%",
//         zIndex: "100",
//         top: "0",
//         left: "0",
//         background: "#eee",
//         opacity: "0.3",
//       }}
//     >
//       <div style={{ position: "fixed", top: "50%", left: "50%" }}>
//         <CircularProgress />
//       </div>
//     </div>
//   );
// }
