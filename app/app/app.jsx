import React from "react";
import { render } from "react-dom";
import WebView from 'react-electron-webview'; 
import { Window, Content, PaneGroup ,Pane } from "react-photonkit";
import parse from 'url-parse'; 

const storage = localStorage; 

import Footer from "./footer.jsx"; 
import Sidebar from "./sidebar.jsx";
import PoliteBarPane from './politebar.jsx'; 
import FriendPane from './friends.jsx';

require('../index.scss');

const baseUrl = "http://localhost:3000/"

const root = document.querySelector("#main"); 

const onFinishLoad = (evt) => {
    const url = parse(evt.srcElement.src, true); 
    if(url.pathname == "/received"){
      const token = url.query.token; 
      storage.setItem('authy', token); 
      render(App(token), root);
    }
}
 
const App = (auth) => (
    <Window>
        <PoliteBarPane  auth={auth} fetchURL={baseUrl + 'api/self'} syncURL={baseUrl + 'api/sync'}    />
        <FriendPane     auth={auth} friendURL={baseUrl + 'api/friends'} />
    </Window>
); 

const Login = () => (
    <Window>
        <div className="window-content text-center">
          <WebView didFinishLoad={onFinishLoad} src={baseUrl + 'login'}/>
        </div>
    </Window>
); 


const auth = storage.getItem('authy'); 

if(auth != null){
  render(App(auth), root);
}else{
  render(Login(), root);
}
