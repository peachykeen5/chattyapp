import React, {Component} from 'react';

export default function Message(props) {
    return (    
    <div className="message" id={props.id}>
    <span className="message-username">{props.username}</span>
    <span className="message-content">{props.content}</span>
  </div>);
}