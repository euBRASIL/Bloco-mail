import Modal from "@/components/Modal/index";
import Message from "@/components/Message/index";
import {
  Storage,
  Web_key,
  Principal_key,
  Volume_Will_Full,
} from "../utils/storage";

export const getPosToParent = (parent, sub, isTop = false) => {
  const parentClient = parent.getBoundingClientRect();
  const subClient = sub.getBoundingClientRect();
  return parseInt(
    subClient[isTop ? "top" : "left"] - parentClient[isTop ? "top" : "left"]
  );
};

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

export const deduplication = (arr) => Array.from(new Set(arr));

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

export const shortPrincipalId = (principalId) => {
  return principalId.slice(0, 9) + "****" + principalId.slice(-6);
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

export const con = (str) => {
  if (!str) return;
  let n = str.split("");
  return n.slice(0, 5).join("") + "***" + n.slice(-8).join("");
};

export const remainDecimal = (num, digits = 2) => {
  const n = Math.pow(10, 2);
  return Math.round(+num * n) / n;
};

export const getFileSize = (num) => {
  const size = Number(num);
  if (size / 1024 > 1) {
    if (size / (1024 * 1024) > 1) {
      return `${remainDecimal(size / 1024 / 1024)}MB`;
    }
    return `${remainDecimal(size / 1024)}KB`;
  }
  return `${remainDecimal(size, 4)}B`;
};

export const bindNftDialog = (cb) => {
  Modal({
    type: "error",
    title: "Please bind an NFT Domain Account!",
    noCancel: true,
    content:
      "Before sending emails,you should bind an NFT Domain Account with Dmail. <br />Please register or purchase an NFT Domain Account and bind it.",
    okText: "Binding",
    onOk: async () => {
      typeof cb === "function" && cb();
      return true;
    },
  });
};

export const copyFromDomText = (dom) => {};

export const copyTextToClipboard = (text, successText) => {
  if (!navigator.clipboard) {
    const success = fallbackCopyTextToClipboard(text);
    const msg = success ? successText || "Copy success" : "Copy failed";
    Message[success ? "success" : "error"](msg);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      Message.success(successText || "Copy success");
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

export const clearStorage = () => {
  Storage.remove(Principal_key);
  Storage.remove(Volume_Will_Full);
  Storage.remove(Web_key);
};
