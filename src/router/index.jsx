import React, { Suspense, lazy } from "react";
import { Switch, Router, Route, Redirect, BrowserRouter, useLocation } from "react-router-dom";

import Inbox from "@/pages/inbox/index";
import Compose from "@/pages/compose/index";
import Setting from "@/pages/setting/index";
import Login from "@/pages/login/index";
import Starred from "@/pages/starred/index";
import Sent from "@/pages/sent/index";
import Drafts from "@/pages/drafts/index";
import Spam from "@/pages/spam/index";
import Trash from "@/pages/trash/index";
import Assets from "@/pages/assets/index";
import Market from "@/pages/market/index";
import Presale from "@/pages/presale/index";
import Orders from "@/pages/presale/orders/index";
import Referrals from "@/pages/presale/referrals/index";

import DLogin from "@/pages/dlogin/index";
import AminoLogin from "@/pages/amino/login";


// const Compose = React.lazy(() => import("@/pages/compose/index"));

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {/* <Route exact path="/" component={ Inbox } /> */}
      <Route exact path="/login" component={ Login } />
      <Route exact path="/dlogin" component={ DLogin } />
      <Route exact path="/alogin/:key" component={AminoLogin} />
      
      <Route exact path="/compose/:emailId?" component={ Compose } />
      <Route exact path="/inbox" component={ Inbox } />
      <Route exact path="/starred" component={ Starred } />
      <Route exact path="/sent" component={ Sent } />
      <Route exact path="/drafts" component={ Drafts } />
      <Route exact path="/spam" component={ Spam } />
      <Route exact path="/trash" component={ Trash } />
      <Route exact path="/setting/:tabname?" component={ Setting } />
      <Route exact path="/market/:tabname?" component={ Market } />
      <Route exact path="/presale/:channelId?" component={ Presale } />
      <Route exact path="/orders" component={ Orders } />
      <Route exact path="/referrals" component={ Referrals } />
      <Route exact path="/assets" component={ Assets } />
      <Redirect from="*" to="/inbox" /> 
    </Switch>
  </BrowserRouter>
);

export default Routes;
