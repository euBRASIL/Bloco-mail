import React, { useEffect } from 'react';
import { Provider } from 'mobx-react';
import rootStore from '@/stores';
import { BrowserRouter as Router ,useHistory} from 'react-router-dom';
// import { withRouter, useHistory, useParams } from "react-router-dom";

import Routes from '@/router';

import './static/css/index.css';
import './App.css';

function App() {
  useEffect(async () => {
    const principalId = rootStore.common.getPrincipalId()
    if (!principalId && !window.location.href.includes('/login')) {
      window.location.href = '/login';
      return;
    } else if (window.location.href.includes('/login')) {
      return;
    }
    if (!await rootStore.common.initData()) {
      //
    }
  }, [])

  return (
    <Provider store={rootStore}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
