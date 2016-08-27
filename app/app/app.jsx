import React from "react";
import ReactDom from "react-dom";
import { Window, Content, PaneGroup ,Pane } from "react-photonkit";


import Footer from "./footer.jsx";
import Sidebar from "./sidebar.jsx";
import PoliteBarPane from './politebar.jsx'; 
import FriendPane from './friends.jsx';

require('../index.scss');

ReactDom.render(
  <Window>
    <Content>
      <PaneGroup>
        <FriendPane />
        <PoliteBarPane />
      </PaneGroup>
    </Content>
    <Footer />
  </Window>
  , 
document.querySelector("#main"));
