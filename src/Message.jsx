import React, {Component} from 'react';

export default function Message(props) {
    return (    
    <div className="message" id={props.message.id}>
    <span className="message-username">{props.message.username}</span>
    <span className="message-content">{props.message.content}</span>
  </div>);
}