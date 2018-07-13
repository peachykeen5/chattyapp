import React, { Component } from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: this.props.currentUser.name,
      content: ""
    }
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onKeyUpMessage = this.onKeyUpMessage.bind(this);
    this.onKeyUpUser = this.onKeyUpUser.bind(this);

  }

  onChangeMessage(event) {
    event.preventDefault();
    this.setState({
      content: event.target.value,
    })
  }

  onChangeUser(event) {
    event.preventDefault();
    if (event.target.value === this.state.username) {
      return;
    }
    this.setState({
      username: event.target.value
    })
  }

  onKeyUpMessage(event) { //alters state 
    event.preventDefault();
    if (event.keyCode === 13) {
      if (this.state.content.length <= 0) {
        alert("can't find any content 🧐");
        return;
      }
      this.props.newMessage(this.state.content)
      this.setState({
        content: " "
      });
    }
  }

  onKeyUpUser(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      this.props.newUser(this.state.username)
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.state.username} onChange={this.onChangeUser} onKeyUp={this.onKeyUpUser} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.onChangeMessage} onKeyUp={this.onKeyUpMessage} value={this.state.content} />
      </footer>);
  }
}
