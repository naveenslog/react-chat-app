
import React, { Component } from 'react';
import SendButton from './SendButton';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.msgInput = React.createRef()
  }

  handleOnSubmit = (event)=> {
    event.preventDefault();
    const msg = this.msgInput.current.value;

    // Don't send empty messages
    if (!msg) return;

    const payload = {
      type: 'msg',
      data: {
        "visitorType": "visitor",
        "visitorName": "unknownvisitor",
        "timestamp": new Date().getTime(),
        "type":"chat.msg",
        "msg": msg
      }
    }
    this.props.chatStore(payload)
    this.msgInput.current.value = '';
  }

  render() {
    const class_name = [
        'input-container',
        this.props.addClass,
      ].join(' ');

    return (
      <div className={class_name}>
        <form
          className="input-form"
          onSubmit={this.handleOnSubmit}>
            <input
              className="input"
              ref={this.msgInput}
              placeholder="Enter message here"
              />
            <SendButton onClick={this.handleOnSubmit} />
        </form>
      </div>
    );
  }
}

export default Input;
