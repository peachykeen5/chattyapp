import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


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
    const newMessage = {id: content.id, username: content.username, content: content};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }
  
  render() {
    return (
      <div>
        <nav className="navbar">
  <a href="/" className="navbar-brand">Chatty</a>
</nav>
  <MessageList messages={ this.state.messages } />
  <ChatBar currentUser={ this.state.currentUser } newMessage={ this.newMessage }/>
</div>
    );
  }
}
export default App;
