import React, { Suspense, lazy } from "react";
import { Switch, Router, Route, Redirect, BrowserRouter, useLocation } from "react-router-dom";

import Inbox from "@/pages/inbox/index";
import Compose from "@/pages/inbox/compose";
import Setting from "@/pages/setting/index";
import Login from "@/pages/login/index";
import Starred from "@/pages/starred/index";
import Sent from "@/pages/sent/index";
import Drafts from "@/pages/drafts/index";
import Spam from "@/pages/spam/index";
import Trash from "@/pages/trash/index";
import Assets from "@/pages/assets/index";
import Market from "@/pages/market/index";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Inbox } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/compose/:draftId?" component={ Compose } />
      <Route exact path="/inbox" component={ Inbox } />
      <Route exact path="/starred" component={ Starred } />
      <Route exact path="/sent" component={ Sent } />
      <Route exact path="/drafts" component={ Drafts } />
      <Route exact path="/spam" component={ Spam } />
      <Route exact path="/trash" component={ Trash } />
      <Route exact path="/setting" component={ Setting } />
      <Route exact path="/assets" component={ Assets } />
      <Route exact path="/market" component={ Market } />
      <Redirect from="*" to="/" /> 
    </Switch>
  </BrowserRouter>
);

export default Routes;
