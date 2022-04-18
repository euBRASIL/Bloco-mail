import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import styled, { keyframes } from "styled-components";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Root = styled.div`
  .snackbar {
    position: fixed;
    top: -15%;
    left: 50%;
  }
  .snackalert {
    background: white;
    color: black;
    .MuiSvgIcon-root {
      background: green;
      color: white;
      border-radius: 10px;
    }
  }
`;
export default function CustomizedSnackbars(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Root>
      <Stack spacing={2} sx={{ width: "100%" }}>
        {/* <Button variant="outlined" onClick={handleClick}>
          Open success snackbar
        </Button> */}
        <Snackbar
          open={props.open}
          // open={open}
          autoHideDuration={1000}
          onClose={props.handleClose}
          // onClick={handleClose}
          // style={{ position: "fixed", top: "-15%", left: "50%" }}
          className="snackbar"
        >
          <Alert
            // onClose={props.handleClose}
            onClick={handleClose}
            severity="success"
            // sx={{ width: "100%", color: "black", background: "#fff" }}
            className="snackalert"
          >
            This is a success message!
          </Alert>
        </Snackbar>
        {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
      </Stack>
    </Root>
  );
}
