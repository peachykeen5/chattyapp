import React, { Component } from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser:
        { name: ""},
      messages: [
      ]
    }
    this.newMessage = this.newMessage.bind(this)
    this.newUser = this.newUser.bind(this);
    this.socket = new WebSocket("ws://localhost:3001");
  }

  newMessage(content) { 
    const newMessage = JSON.stringify({
      username: this.state.currentUser.name,
      content: content,
      type: 'postMessage'
    });
    this.socket.send(newMessage)
  }

  newUser(user) {
    if (!this.state.currentUser.name) {
      this.state.currentUser.name = "Anonymous"
    }
    if (user === this.state.currentUser.name) {
      return;
    }
    const newUser = JSON.stringify({
      username: user,
      content: this.state.currentUser.name + " has changed their name to " + user + ".",
      type: 'postNotification',
    })
    this.setState({ currentUser: { name: user} })
    this.socket.send(newUser)
  }


  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log("server open")
    }

    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data)
      if (data.type === "incomingNotification") {
        this.setState({
          currentUser: {name: this.state.currentUser.name, id: data.id}, 
          messages: [
            ...this.state.messages, 
            {
              username: data.username, 
              content: data.content, 
              id: data.id, 
              type: data.type, 
            } 
          ]
        })
      } else if (data.type === "userCount") {
        this.setState({ usercount: data.size })
      } else {
        this.setState({
          messages: [...this.state.messages, data]
        })
      }
    }
  } 

  render() {
    return (
      <div>
        <nav className="navbar">
          <img src="./images/chatty-icon.png" />
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="usercount">{this.state.usercount} users online.</span>

        </nav>
        <main className="container">
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} newMessage={this.newMessage} newUser={this.newUser} />
        </main>

      </div>
    );
  }
}
export default App;
