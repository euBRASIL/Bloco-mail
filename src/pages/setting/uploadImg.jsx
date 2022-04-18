import React, { useEffect, useState, useCallback, useRef } from "react";
import { observer, inject } from 'mobx-react';
import { CanisterIds, http, transformPrincipalId } from "../../api/index";
import { Upload } from "./css";

const MAX_CHUNK_SIZE = 1024 * 500;
const getFileExtension = (type) => {
  switch (type) {
    case "image/jpeg":
      return { jpeg: null };
    case "image/gif":
      return { gif: null };
    case "image/jpg":
      return { jpg: null };
    case "image/png":
      return { png: null };
    case "image/svg":
      return { svg: null };
    case "video/avi":
      return { avi: null };
    case "video/aac":
      return { aac: null };
    case "video/mp4":
      return { mp4: null };
    case "audio/wav":
      return { wav: null };
    case "audio/mp3":
      return { mp3: null };
    case "text/plain":
      return { text: null };
    default:
      return null;
  }
};

const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

const UploadImg = ({ children, store }) => {
  const { principalId, profileInfo } = store.common
  const [file, setFile] = useState(null);
  const onFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      if (reader.result === null) {
        throw new Error("file empty...");
      }
      const base64Url = reader.result.toString()
      let encoded = base64Url.replace(/^data:(.*,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      const blob = b64toBlob(encoded, file.type);

      const fileInfo = {
        name: file.name,
        type: file.type,
        size: file.size,
        width: file.width,
        height: file.height,
        blob,
        file,
        base64Url,
      };

      setFile(fileInfo);
      await uploadAva(url, fileInfo);
    };
  };

  const uploadAva = async (url, file) => {
    if (!principalId) {
      return;
    }
    const fileExtension = getFileExtension(file.type);
    if (file === null || file === undefined || fileExtension === null) {
      alert("File not valid!");
      return;
    }
    if (file.size > MAX_CHUNK_SIZE) {
      alert(`File size shouldn't be bigger than ${MAX_CHUNK_SIZE / 1024}k`);
      return;
    }

    const res = await http(
      CanisterIds.profile,
      "create_update_principal_profile",
      [
        transformPrincipalId(principalId),
        {
          desc: [],
          avatar_url: [],
          avatar_base64: [file.base64Url],
        },
      ]
    );
    if (res.Ok) {
      store.common.setProfileInfo({
        avatar_base64: file.base64Url
      })
    } else {

    }
  };

  return (
    <Upload>
      <input type="file" onChange={ onFileChange } />
      { children }
    </Upload>
  );
};

export default inject('store')(observer(UploadImg));
