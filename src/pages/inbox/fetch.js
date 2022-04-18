import React, { useState, useRef, useEffect } from 'react';
import { CanisterIds, http, transformPrincipalId } from "@/api/index";
import { isPrincipalIdFn, isDmailFn, isEmailFn } from '@/utils/index'

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

export const setRead = async (read, list) => {
  const res = await http(CanisterIds.body, "batchUpdateRead", [
    read,
    list,
  ]);
  return res
}

export const setFavorites = async (isFavorites, list) => {
  const res = await http(CanisterIds.body, "batchUpdateFavorites", [
    isFavorites,
    list,
  ]);
  // console.log('setFavorites',res)
  return res
}

export const batchDelete = async (list, del = true) => {
  const res = await http(CanisterIds.body, "batchUpdateTrash", [
    // delete is always true, redelete is false
    del,
    list,
  ]);
  return res
}

// undelete
export const batchUnDelete = async (list) => {
  const res = await http(CanisterIds.body, "batchUpdateTrash", [
    // undelete is false, delete is true,
    false,
    list,
  ]);
  return res
}

// real delete
export const batchRealDelete = async (list) => {
  const res = await http(CanisterIds.body, "batchUpdateDelete", [
    list,
  ]);
  return res
}

export const batchSpam = async (list, spam = true) => {
  const res = await http(CanisterIds.body, "batchUpdateSpam", [
    // spam is always true, unspam is false
    spam,
    list,
  ]);
  return res
}

export const getMenuList = async ({ principalId, ...params }) => {
  const res = await http(CanisterIds.body, "queryEmailListByWrapper", [
    transformPrincipalId(
      principalId
    ),
    params,
  ]);

  return res
}

export const createAnEmailFromDraft = async (principalId) => {
  const res = await http(CanisterIds.draft, "createAnEmailFromDraft", [
    transformPrincipalId(
      principalId
    ),
    0
  ])
}

export const queryDraftByWrapper = async (principalId) => {
  const res = await http(CanisterIds.draft, "queryDraftByWrapper", [
    transformPrincipalId(
      principalId
    ),
    {
      offset: window["BigInt"](0),
      limit: window["BigInt"](10),
    },
  ])
}

export const deleteDraftById = async (principalId) => {
  const res = await http(CanisterIds.draft, "deleteDraftById", [
    transformPrincipalId(
      principalId
    ),
    0
  ])
}


export const getAttachList = async ({ alias, file_id, cid }) => {
  let r =  await http(CanisterIds.bucket, "query_attachment_by_id", [
    alias,
    file_id,
    cid
  ]);
  if (r?.Ok) {
    console.log('query_attachment_by_id',r.Ok[0])
    return r.Ok[0]
  } else {
    new Error(r.Err.Other)
  }
};


export const createUpdateAnEmailDraft = async (id, principalId, senderAlias, formData) => {
  const isEmail = isEmailFn(formData.to)
  if (!isEmail && (!formData.id || !isPrincipalIdFn(formData.id))) {
    return {
      Err: 'To account is not a valid email and PrincipalId is not a valid id'
    };
  }
  const res = await http(CanisterIds.draft, "createUpdateAnEmailDraft", [
    id ? [id] : [],
    transformPrincipalId(principalId),
    {
      email_body: {
        'text_content': formData.content,
        'attach': [
          formData.attachs.map(({ cid, id }) => ({
            canister_id: cid,
            file_id: id,
          }))
        ],
      },
      email_header: {
        'id': 0,
        'status': 0,
        "body_desc": '',
        'recipient_alias': formData.to,
        'subject': formData.subject,
        'recipient': isPrincipalIdFn(formData.id) ? [transformPrincipalId(formData.id)] : [],
        'sender': [transformPrincipalId(principalId)],
        'created_at': 0,
        'sender_alias': senderAlias,
      },
    },
  ])

  console.log('uploadAttachment', res)
  return res
}

export const createUpdateAttachment = async (principalId, alias, { name, type, size }, blob_content) => {
  if (!principalId || !isPrincipalIdFn(principalId)) {
    return {
      Err: 'PrincipalId is not a valid id'
    };
  }
  const res = await http(CanisterIds.bucket, "create_update_attachment", [
    {
      id: 0,
      owner_alias: alias,
      cid: [transformPrincipalId(principalId)],
      mime_type: type,
      created_at: 30,
      file_name: name,
      file_size: size,
      blob_content: Array.from(blob_content),
    }
  ])

  console.log('createUpdateAttachment', res)
  return res
}

export const sendEmail = async (principalId, senderAlias, formData) => {
  const isEmail = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(formData.to)
  const isDmail = isDmailFn(formData.to)
  if (!isEmail) {
    return {
      Err: 'To account is not a valid email'
    };
  }
  if (isDmail && (!formData.id || !isPrincipalIdFn(formData.id))) {
    return {
      Err: 'PrincipalId is not a valid id'
    };
  }
  const recipient = isDmail && isPrincipalIdFn(formData.id) ? [transformPrincipalId(formData.id)] : []
  console.log(formData.attachs);
  const res = await http(CanisterIds.body, "createAnEmail", [
    [],
    {
      email_body: {
        'text_content': formData.content,
        'attach': [
          formData.attachs.map(({ cid, id }) => ({
            canister_id: cid,
            file_id: id,
          }))
        ],
      },
      email_header: {
        id: 0,
        status: 0,
        recipient,
        created_at: 0,
        body_desc: '',
        recipient_alias: formData.to.replace('@dmail.ai', ''),
        subject: formData.subject,
        sender: [transformPrincipalId(principalId)],
        sender_alias: senderAlias,
      },
    },
  ]);
  console.log('ressender email', res)
  return res
}

export const queryUserList = async (alias) => {
  const res = await http(CanisterIds.profile, "query_alias_profile_by_key", [
    alias
  ])
  console.log('query_alias_profile_by_key', res)
  return res?.Ok || []
}

const addIncreaseKey = (data) => {
  const time = new Date().getTime()
  data.forEach((item, key) => {
    if (Array.isArray(item) && item.length > 1) {
      item[1].key = `${time}${key}`;
    }
  })
}

const loadNormalItems = async ({ principalId, offset, limit, read }) => {
  return new Promise(async (resolve, reject) => {
    const res = await getMenuList({
      principalId,
      trash: [false],
      favorites: [],
      read: typeof read === 'boolean' ? [read] : [],
      send: [false],
      spam: [false],
      delete: [false],
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