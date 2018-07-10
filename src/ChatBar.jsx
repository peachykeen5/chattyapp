import React, {Component} from 'react';

export default function ChatBar(props){
    return (<footer className="chatbar">
    <input className="chatbar-username" defaultValue={ props.currentUser.name } placeholder="Your Name (Optional)" />
    <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
  </footer>);
  }
