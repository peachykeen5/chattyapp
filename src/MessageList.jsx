import React, { Component } from 'react';
import Message from './Message.jsx';

function Notification(props) {
  return (
    <div className="notification">
      <span className="notification-content" type={props.message.type}>{props.message.content}</span>
    </div>
  )
}

export default class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const color = this.props.color
    const messages = this.props.messages.map((message) => {
      switch (message.type) {
        case 'incomingNotification':
          return <Notification message={message} key={message.id} />;
        default:
          return <Message key={message.id} color={color} message={message} />
      }
    });
    return (<main className="messages">
      {messages}
    </main>);
  }
}