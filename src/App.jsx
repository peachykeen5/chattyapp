import React, { Component } from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser:
        { name: "", color: "" },
      messages: [
        // {
          // username: "",
          // content: "",
          // id: '',
          // type: '',
          // color: ''
        // }
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
    if (!this.state.currentUser.name) {
      this.state.currentUser.name = "Anonymous"
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
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} newMessage={this.newMessage} newUser={this.newUser} />

      </div>
    );
  }
}
export default App;
