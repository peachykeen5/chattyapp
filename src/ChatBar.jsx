import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: this.props.currentUser.name,
      content: ""
    }
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.onChangeUser = this.onChangeUser.bind(this)
  }

  onChangeMessage(event) {
    event.preventDefault();
    this.setState ({
      content: event.target.value,
    })
  }

  onChangeUser(event) {
    event.preventDefault();
    this.setState ({
      username: event.target.value,
    })

  }
   onKeyUp(event) { //alters state 
    let username = '';
      event.preventDefault();
      if (event.keyCode === 13) {
        if (this.state.username.length <= 0){
          username = "Anonymous";
        } else {
          username = this.state.username;
        }
      this.props.newMessage({content: this.state.content, username: username})
      this.setState({
        content: ""
      });
      }
    }

  render () {
    return (
      <footer className="chatbar">
    <input className="chatbar-username" defaultValue={ this.props.currentUser.name } onChange={this.onChangeUser}  onKeyUp={this.onKeyUp} placeholder="Your Name (Optional)" />
    <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.onChangeMessage} onKeyUp={this.onKeyUp} value={ this.state.content }/>
  </footer>);
  }
}
