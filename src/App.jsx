import React, { Component } from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser:
        { name: "Bob", color: "" },
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }
      ]
    }
    this.newMessage = this.newMessage.bind(this)
    this.newUser = this.newUser.bind(this);
    this.socket = new WebSocket("ws://localhost:3001");
  }

  // componentDidMount() {
  //   console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     // Add a new message to the list of messages in the data store
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //   }, 1000);
  // }


  newMessage(content) { //renders new message onto app
    const newMessage = JSON.stringify({
      username: this.state.currentUser.name,
      content: content,
      type: 'postMessage'
    });
    this.socket.send(newMessage)
  }

  newUser(user) {
    let content = this.state.currentUser.name + " has changed their name to " + user + "."
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const newUser = JSON.stringify({
      username: content,
      type: 'postNotification',
    })
    this.setState({ currentUser: { name: user, color: "#" + randomColor } })
    this.socket.send(newUser)
  }


  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log("server open")
    }

    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data)
      if (data.type === "color") {
        this.setState({ currentUser: { name: this.state.currentUser.name, color: data.color } })
      } else {
        if (data.type === "userCount") {
          this.setState({ usercount: data.size })
        } else {
          console.log(event.data)
          let messages = [...this.state.messages, data]
          this.setState({
            messages: messages
          })
        }
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
        <MessageList messages={this.state.messages} color={this.state.currentUser.color} />
        <ChatBar currentUser={this.state.currentUser} newMessage={this.newMessage} newUser={this.newUser} />

      </div>
    );
  }
}
export default App;
