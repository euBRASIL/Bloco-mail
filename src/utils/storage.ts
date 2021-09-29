
export const Email_Name = 'email_name';

export const Storage = {
  getAll() {
    const storages = {}
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i) as string;
      storages[key] = Storage.get(key)
    }
    return storages
  },
  get(name: string) {
    const data = Storage._get(name)
    return data ? data.value : null
  },
  set(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify({
      value
    }))
  },
  setWidthTime(name: string, value: any) {
    const time = new Date().getTime()
    localStorage.setItem(name, JSON.stringify({
      time,
      value
    }))
  },
  _get(name: string) {
    const data = localStorage.getItem(name)
    if (data) {
      return JSON.parse(data)
    } else {
      return null
    }
  },
}