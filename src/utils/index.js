import Modal from "@/components/Modal/index";
import Message from "@/components/Message/index";

// var bigInt = require("big-integer");
// export const BigInt =
//   window.BigInt ||
//   ((num) => {
//     try {
//       const bi = bigInt(num);
//       return bi.value;
//     } catch (error) {
//       return false;
//     }
//   });

export const Dmail = "Dmail";
export const dmailAi = "@dmail.ai";
export const isPrincipalIdFn = (id) =>
  /^([a-z0-9]{5}\-){10}[a-z0-9]{3}$/g.test(id);
export const isDmailFn = (str) => /^[^@]+@dmail.ai$/.test(str);
export const isEmailFn = (str) =>
  /^[0-9a-zA-Z_.-/+]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(str);
export const scrollIntoViewKey = document.body.scrollIntoViewIfNeeded
  ? "scrollIntoViewIfNeeded"
  : document.body.scrollIntoView
  ? "scrollIntoView"
  : "";
export const isLoginPage = () => window.location.href.includes("/login") || window.location.href.includes("/dlogin") || window.location.href.includes("/alogin")

export const getPosToParent = (parent, sub, isTop = false) => {
  const parentClient = parent.getBoundingClientRect();
  const subClient = sub.getBoundingClientRect();
  return parseInt(
    subClient[isTop ? "top" : "left"] - parentClient[isTop ? "top" : "left"]
  );
};

export const deduplication = (arr) => Array.from(new Set(arr));

export const remainDecimalByString = (num, digits = 2) => {
  if (!/^[0-9]+.?[0-9]*$/.test(num + "")) {
    return num;
  }
  const n = Math.pow(10, digits);
  return Math.round(+num * n) / n;
};

export const throttle = (fn, wait = 300) => {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(context, args);
        timer = null;
      }, wait);
    }
  };
};

export const shortPrincipalId = (principalId, isPid = true) => {
  return principalId.slice(0, isPid ? 9 : 5) + "****" + principalId.slice(isPid ? -6 : -5);
};

export const timeConverter = (UNIX_timestamp) => {
  var a = new Date(Math.floor(UNIX_timestamp / 1000000));
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = ("0" + a.getDate()).substr(-2);
  var hour = ("0" + a.getHours()).substr(-2);
  var min = ("0" + a.getMinutes()).substr(-2);
  var sec = ("0" + a.getSeconds()).substr(-2);
  var time = date + " " + month + " " + hour + ":" + min + ":" + sec;
  return time;
};

export const con = (str, prefix = 5, suffix = 8) => {
  if (!str) return;
  let n = str.split("");
  return n.slice(0, prefix).join("") + "***" + n.slice(-suffix).join("");
};

export const remainDecimal = (num, digits = 2) => {
  const n = Math.pow(10, digits);
  return Math.round(+num * n) / n;
};

export const getFileSize = (num, returnArray) => {
  const size = Number(num);
  let result = 0;
  let unit = "B";
  if (size / (1024 * 1024 * 1024) > 1) {
    result = remainDecimal(size / 1024 / 1024 / 1024);
    unit = "GB";
  } else if (size / (1024 * 1024) > 1) {
    result = remainDecimal(size / 1024 / 1024);
    unit = "MB";
  } else if (size / 1024 > 1) {
    result = remainDecimal(size / 1024);
    unit = "KB";
  } else {
    result = remainDecimal(size, 4);
    unit = "B";
  }
  return returnArray ? [result, unit] : `${result}${unit}`;
};

export const bindNftDialog = (cb, cancelCb) => {
  Modal({
    type: "error",
    title: "Please bind an NFT Domain Account!",
    content:
      "Before sending emails,you should bind an NFT Domain Account with Dmail. <br />Please register or purchase an NFT Domain Account and bind it.",
    okText: "Binding",
    cancelText: "Buy NFT",
    onOk: async () => {
      typeof cb === "function" && cb();
      return true;
    },
    onCancel() {
      typeof cancelCb === "function" && cancelCb();
      return true
    }
  });
};

export const copyFromDomText = (dom) => {};

export const copyTextToClipboard = (text, successText) => {
  if (!navigator.clipboard) {
    const success = fallbackCopyTextToClipboard(text);
    const msg = success ? successText || "Copy successfully" : "Copy failed";
    Message[success ? "success" : "error"](msg);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      Message.success(successText || "Copy successfully");
    },
    function (err) {
      Message.error("Copy failed");
    }
  );
};

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let success = false;
  try {
    var successful = document.execCommand("copy");
    if (successful) {
      success = true;
    }
  } catch (err) {
    success = false;
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
  return success;
}
