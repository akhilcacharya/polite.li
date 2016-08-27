import React from "react";
import ReactDom from "react-dom";
import { Window, Content, PaneGroup ,Pane } from "react-photonkit";


import Footer from "./footer.jsx";
import Sidebar from "./sidebar.jsx";
import PoliteBarPane from './politebar.jsx'; 
import FriendPane from './friends.jsx';

require('../index.scss');

const endpoint = "http://localhost:4000/api/sync"; 
const auth = "testToken"; 

//Fetch data from server, then render

ReactDom.render(
  <Window>
      <PoliteBarPane auth={auth} url={endpoint} state={{}} />
      <FriendPane />
  </Window>
  , 
document.querySelector("#main"));
