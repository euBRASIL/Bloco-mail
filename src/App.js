import React, { useEffect } from "react";
import { Provider } from "mobx-react";
import rootStore from "@/stores";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import Routes from "@/router";

import { preLoadApp } from "@/utils/preload";
import "./static/css/index.css";
import "./App.css";

function App() {
  useEffect(async () => {
    const principalId = rootStore.common.getPrincipalId();
    if (!principalId && !window.location.href.includes("/login")) {
      window.location.href = "/login";
      return;
    }
    if (window.location.href.includes("/login")) {
      return;
    }
    await rootStore.common.initData();
  }, []);

  const getFrequentData = (immediately) => {
    setTimeout(
      async () => {
        // rootStore.common.queryUnReadList()
        rootStore.common.queryFrequentData();
        getFrequentData();
      },
      immediately ? 0 : 1000 * 15
    );
  };
  useEffect(() => {
    getFrequentData(true);
    preLoadApp();
  }, []);

  return (
    <Provider store={rootStore}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
