import React, { useEffect, useState, useCallback, useRef } from "react";
import { fromJS } from "immutable";
import { getPosToParent } from "@/utils/index";

export const MenuTabs = [
  {
    name: "Multi",
    // value: [],
    value: "",
  },
  {
    name: "Unread",
    value: false,
  },
  {
    name: "Read",
    value: true,
  },
];

const getParams = (current, menuList, emailName) => {
  const list = current && typeof current === 'object' ? [current] : menuList;
  const filterList = list
    .map((item) => {
      if (item[1]?.checked || (current && item[1]?.key === current[1]?.key)) {
        return {
          key: item[1].key,
          sender_alias: item[0]?.[0]?.email_header.sender_alias,
          recipient_alias: item[0]?.[0]?.email_header.recipient_alias,
          subject: item[0]?.[0]?.email_header.subject,
          is_sender: typeof emailName === 'boolean' ? emailName : (emailName ? emailName === item[1]?.first_sender_alias : false),
        };
      } else {
        return null;
      }
    })
    .filter((item) => !!item);
  if (!filterList.length) {
    console.error("nothing selected");
  }
  return filterList
}

const checkMultiSelected = (current, menuList) => {
  if (!current && !menuList.filter((item) => !!item[1]?.checked).length) {
    console.error("nothing selected");
    return false;
  }
  return true
}

export const getDelList = (params, menuList) => {
  const actionsKeys = params.map(({ key }) => key);
  const list = fromJS(menuList).toJS();
  const filterList = list.filter(
    (item) => !actionsKeys.includes(item[1]?.key)
  );
  return filterList
}

export const getUpdateList = (value, updateKey) => (params, menuList) => {
  const actionsKeys = params.map(({ key }) => key);
  const list = fromJS(menuList).toJS();
  list.forEach((item) => {
    if (actionsKeys.includes(item[1]?.key)) {
      item[1][updateKey][0] = value;
    }
  });
  return list
}

export const batchAction = async (menuList, setMenuList, current, emailName, fetchFn, getDealedData, ev = null) => {
  ev && ev.stopPropagation && ev.stopPropagation();
  if (!checkMultiSelected(current, menuList)) {
    return;
  }
  const params = getParams(current, menuList, emailName)
  if (!params.length) {
    return;
  }
  const res = await fetchFn(params);
  if (res?.Ok) {
    setMenuList(getDealedData(params, menuList));
  }
};

export const useMenuChecked = (menuList, setMenuList, getCheckedList) => {
  const [collected, _setCollected] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  const checkListChecked = useCallback(
    (key, checked) => {
      if (!Array.isArray(menuList)) {
        return false;
      }
      // @TODO: need fix
      _setCollected(false);
      const list = fromJS(menuList).toJS();
      list.forEach((item) => {
        if (key === "multi" || key === item[1]?.key) {
          key === "multi" && (item.checked = checked);
          item[1].checked = checked;
        }
      });
      setMenuList(list);
      const selected = list
        .map((item) => {
          if (item[1].checked) {
            return item[1]?.first_recipient_favorites[0];
          }
          return null;
        })
        .filter((item) => typeof item === "boolean");
      return [selected.length === selected.filter((item) => !!item).length, selected];
    },
    [menuList]
  );

  const onCheckbox = useCallback(
    (key, checked) => (ev) => {
      ev.stopPropagation();
      if (key === "multi") {
        const [, selected] = checkListChecked("multi", checked);
        setAllChecked(selected.length ? checked : false);
      } else {
        const [isAllChecked] = checkListChecked(key, checked);
        _setCollected(isAllChecked);
      }
    },
    [checkListChecked]
  );

  useEffect(() => {
    if (!Array.isArray(menuList)) {
      return;
    }
    const checkedList = typeof getCheckedList === 'function' ? getCheckedList(menuList) : menuList.filter(([, { checked }]) => {
      return !!checked;
    });
    if (checkedList.length === menuList.length && checkedList.length !== 0) {
      setAllChecked(true);
    } else if (!checkedList.length) {
      setAllChecked(false);
    }
  }, [menuList]);

  return {
    collected,
    allChecked, 
    setAllChecked,
    onCheckbox,
    _setCollected,
  }
}

export const useFetchData = (_setCollected, setAllChecked, setResetData, loadMore, principalId) => {
  const [currentMenu, setCurrentMenu] = useState(MenuTabs[0]?.value);
  const currentMenuChange = (read) => {
    setAllChecked(false);
    setCurrentMenu(read);
    const params = {
      principalId,
      offset: 0,
      limit: 10,
      read,
    };
    setResetData(params);
    loadMore(params);
  };

  useEffect(async () => {
    if (!principalId) {
      return
    }
    
    const params = {
      principalId,
      offset: 0,
      limit: 10,
      read: "",
    };
    setResetData(params);
    //loadMore(params);
  }, [principalId]);

  return {
    currentMenu, 
    currentMenuChange
  }
}

export const useSetFocusLineStyle = (currentMenu) => {
  const menusRef = useRef(null);
  const focusLineRef = useRef(null);
 
  useEffect(() => {
    if (!focusLineRef.current || !menusRef.current) {
      return;
    }
    const index = MenuTabs.findIndex(({ value }) => value === currentMenu);
    const currentLi = menusRef.current.querySelectorAll("li")[index];
    const left = getPosToParent(menusRef.current, currentLi);
    const width = currentLi.clientWidth;
    focusLineRef.current.style = `left: ${left}px; width: ${width}px;`;
  }, [currentMenu]);

  return {
    menusRef,
    focusLineRef
  }
}