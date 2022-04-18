import React, { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { withRouter, useParams } from "react-router-dom";
 
import { dialogTheme, DialogWrapper } from "./css";
const Types = ["info", "success", "error", "warn"];

const BaseDailog = (props) => {

  const {
    type,
    title,
    content,
    okText,
    cancelText,
    onOk,
    onCancel,
    noOk,
    noCancel,
    noBing,
    onBinding,
  } = props;

  const [isOpen, setOpen] = useState(true);
  const [okLoading, setOkLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const defalutCancelFn = () => setOpen(false);
  const onCancelFn = async () => {
    if (typeof onCancel === "function") {
      try {
        setCancelLoading(true);
        const cancelEnd = await onCancel();
        setCancelLoading(false);
        if (cancelEnd) {
          defalutCancelFn();
        }
      } catch (error) {
        //
      }
    } else {
      defalutCancelFn();
    }
  };

  const onOkFn = async () => {
    try {
      setOkLoading(true);
      const okEnd = await onOk();
      setOkLoading(false);
      if (okEnd) {
        defalutCancelFn();
      }
    } catch (error) {
      //
    }
  };

  const onBindingFn = async () => {
    try {
      setOkLoading(true);
      const okEnd = await onBinding();
      console.log('okEnd',okEnd)
      setOkLoading(false);
      if (okEnd) {
        defalutCancelFn();
      }
    } catch (error) {
    }
  };

  if (type && !Types.includes(type)) {
    console.error("type '${type} is invalid");
  }

  return (
    <ThemeProvider theme={dialogTheme}>
      <DialogWrapper
        open={isOpen}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog"
        sx={{ m: 3, p: 3 }}
      >
        {title && (
          <DialogTitle className="title">
            {Types.includes(type) && <i className={`${type}`}></i>}
            {title}
          </DialogTitle>
        )}

        {content && (
          <DialogContent
            className={title ? "" : "no-title"}
            dangerouslySetInnerHTML={{ __html: content }}
          >
            {/* {typeof content !== 'string' ? <content /> : ( */}
            {/* <DialogContentText> */}
            {/* { content } */}
            {/* </DialogContentText> */}
            {/* )} */}
          </DialogContent>
        )}

        <DialogActions>
          {!noOk && (
            <LoadingButton
              size="small"
              onClick={onOkFn}
              loading={okLoading}
              loadingPosition="start"
              variant="contained"
            >
              {okText || "Ok"}
            </LoadingButton>
          )}
          {!noBing && (
            <LoadingButton
              size="small"
              onClick={onBindingFn}
              loading={okLoading}
              loadingPosition="start"
              variant="contained"
            >
              {okText || "Binding"}
            </LoadingButton>
          )}
          {!noCancel && (
            <LoadingButton
              size="small"
              onClick={onCancelFn}
              loading={cancelLoading}
              loadingPosition="start"
              variant="outlined"
            >
              {cancelText || "Cancel"}
            </LoadingButton>
          )}
          {/* {!noCancel && <Button onClick={ onCancelFn } className="cancel" variant="outlined">{cancelText || 'Cancel'}</Button>} */}
        </DialogActions>
      </DialogWrapper>
    </ThemeProvider>
  );
};

export default BaseDailog;
