import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const shortid = require('shortid');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob"},
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
    const newMessage = JSON.stringify({username: this.state.currentUser.name, content: content});
    this.socket.send(newMessage)
  }
  
  newUser(user) {
    this.setState({
      currentUser: { name: user }
    })
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
    console.log("server open")
  }

    this.socket.onmessage = (event) => {
      let messages = this.state.messages.concat(JSON.parse(event.data))
      this.setState({
        messages: messages
      })
    }
  }
  
  render() {
    return (
      <div>
        <nav className="navbar">
        <img src="./images/chatty-icon.png"/>
  <a href="/" className="navbar-brand">Chatty</a>
</nav>
  <MessageList messages={ this.state.messages } />
  <ChatBar currentUser={ this.state.currentUser } newMessage={ this.newMessage } newUser={this.newUser}/>
</div>
    );
  }
}
export default App;
