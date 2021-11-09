import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../types';

const HideScrollInMobile = (props) => {
  const sidebarOpen = useSelector((state: AppState) => {
    // /node_modules/ra-core/src/reducer/admin/ui.ts
    return state?.admin.ui.sidebarOpen;
  });

  useEffect(() => {
    document.documentElement.classList[sidebarOpen ? 'add' : 'remove']('oh')
  }, [sidebarOpen])

  return null
}

export default HideScrollInMobile;