import React, { useState, useRef, useEffect } from 'react';
import { CanisterIds, http, transformPrincipalId } from "../../api/index";

const ARRAY_SIZE = 10;
const RESPONSE_TIME_IN_MS = 1000;

const getMenuList = async ({ principalId, ...params }) => {
  const res = await http(CanisterIds.draft, "queryDraftByWrapper", [
      transformPrincipalId(
        principalId
      ),
      params,
  ]);

  return res
}

const addIncreaseKey = (data) => {
  const time = new Date().getTime()
  data.forEach((item, key) => {
    if (item) {
      item.key = `${time}${key}`;
    }
  })
}

const loadNormalItems = async ({ principalId, offset, limit }) => {
    return new Promise(async (resolve, reject) => {
        // const res = await getMenuList(params);
        const res = await getMenuList({
          principalId,
          offset: window["BigInt"](offset),
          limit: window["BigInt"](limit),
        });
        console.log('res: ', res);
        if (res?.Ok?.data && Array.isArray(res.Ok.data)) {
            addIncreaseKey(res.Ok.data);
            resolve(res.Ok)
        } else {
            reject(res);
        }
    })
}

export function useLoadItems(params) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState();

  async function loadMore(_params) {
    const p = _params || params
    setLoading(true);
    try {
      const { data, hasNextPage: newHasNextPage } = await loadNormalItems(p);
      setItems((current) => p.offset === 0 ? data : [...current, ...data]);
      setHasNextPage(newHasNextPage);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { loading, items, setItems, hasNextPage, error, loadMore };
}