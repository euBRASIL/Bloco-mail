
export const getPosToParent = (parent, sub, isTop = false) => {
  const parentClient = parent.getBoundingClientRect()
  const subClient = sub.getBoundingClientRect()
  return parseInt(subClient[isTop ? 'top' : 'left'] - parentClient[isTop ? 'top' : 'left'])
}

export const isPrincipalIdFn = (id) => /^([a-z0-9]{5}\-){10}[a-z0-9]{3}$/g.test(id)
export const isDmailFn = (str) => /^[^@]+@dmail.ai$/.test(str)
export const isEmailFn = (str) => /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(str)

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
  var time =
    date + " " + month + " " + hour + ":" + min + ":" + sec;
  return time;
}

export const con = (str) => {
  if (!str) return;
  let n = str.split("");
  return n.slice(0, 5).join("") + "***" + n.slice(-8).join("");
}

export const remainDecimal = (num, digits = 2) => {
  const n = Math.pow(10, 2);
  return Math.round(+num * n) / n;
};
