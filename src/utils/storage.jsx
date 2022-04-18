// @TODO: need to remove, just use requestEmail
export const Principal_key = "principal_key";
export const Email_Name = "email_name";
export const Username = "username";
export const Create_Mail_Cached = "create_mail_cached";
export const Binded_Nft = "binded_Nft";

export const Storage = {
  getAll() {
    const storages = {};
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      storages[key] = Storage.get(key);
    }
    return storages;
  },
  get(name) {
    const data = Storage._get(name);
    return data ? data.value : null;
  },
  set(name, value) {
    localStorage.setItem(
      name,
      JSON.stringify({
        value: value || "",
      })
    );
  },
  remove(name) {
    localStorage.removeItem(name);
  },
  setWidthTime(name, value) {
    const time = new Date().getTime();
    localStorage.setItem(
      name,
      JSON.stringify({
        time,
        value,
      })
    );
  },
  _get(name) {
    const data = localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  },
};
