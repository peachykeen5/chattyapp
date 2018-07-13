import React, {Component} from 'react';

export default function Message(props) {
    return (    
    <div className="message" id={props.id}>
    <span className="message-username" style={{ color: props.message.color }}>{props.message.username}</span>
    <i className="triangle-left"></i><span className="message-content">{props.message.content}</span>
  </div>);
}