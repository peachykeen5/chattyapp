import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: "",
      content: ""
    }
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    event.preventDefault();
    this.setState ({
      username: 'Lexi',
      id: '4',
      content: event.target.value,
    })
  }

   onKeyUp(event) { //alters state 
      event.preventDefault();
      if (event.keyCode === 13) {
      return this.props.newMessage({content: this.state.content, username: this.state.username, id: this.state.id});
      }
    }
  render () {
    return (
      <footer className="chatbar">
    <input className="chatbar-username" defaultValue={ this.props.currentUser.name }  placeholder="Your Name (Optional)" />
    <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.onChange} onKeyUp={this.onKeyUp} />
  </footer>);
  }
}
