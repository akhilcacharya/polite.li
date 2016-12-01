/* @flow */

import React from "react";
import ReactDOM from "react-dom";
import WebView from 'react-electron-webview';
import { Window, PaneGroup } from "react-photonkit";
import parse from 'url-parse';

import PoliteBarPane from './politebar.jsx';
import FriendPane from './friends.jsx';
import PreferencePane from './prefs.jsx'; 
import Switcher from './switcher.jsx'; 

require('../index.scss');

const baseUrl = "http://localhost:3000/";
const appRoot = document.querySelector("#main");
const tokenKey = "authi";

const onFinishLoad = (evt) => {
    const url = parse(evt.srcElement.src, true);
    if(url.pathname == "/received" && url.query.token){
      const token = url.query.token;
      localStorage.setItem(tokenKey, token);
      ReactDOM.render(<App auth={token} />, appRoot);
    }
}

        

const App = (props) => (
    <Window>
        <header className="toolbar toolbar-header" style={{zIndex: 2}}>
                <h1 className="title">Polite.li</h1>
        </header>
        <PaneGroup>
                <FriendPane
                    auth={props.auth}
                    friendURL={baseUrl + 'api/friends'} />
                <PoliteBarPane
                    auth={props.auth}
                    fetchURL={baseUrl + 'api/self'}
                    syncURL={baseUrl + 'api/sync'}/>
        </PaneGroup>

        {/* 
            <Switcher>    
            <PreferencePane 
                    auth={props.auth}
                    syncURL={baseUrl + 'api/prefs'} />
            </Switcher> 
        */}
    </Window>
);

const Login = (props) => (
    <Window>
        <div className="window-content text-center">
          <WebView
            didFinishLoad={onFinishLoad}
            src={baseUrl + 'login'}/>
        </div>
    </Window>
);

const auth = localStorage.getItem(tokenKey);

if(auth != null){
  ReactDOM.render(<App auth={auth}/>, appRoot);
}else{
  ReactDOM.render(<Login />, appRoot);
}
