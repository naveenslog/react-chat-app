
import React, { Component } from 'react';
import SendButton from './SendButton';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.msgInput = React.createRef()
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleOnSubmit(event){
    event.preventDefault();
    const msg = this.msgInput.current.value;

    // Don't send empty messages
    if (!msg) return;
    if(this.props.storeInputClass.trigger){
      let savePayload = this.props.storeInputClass;
      savePayload['value'] = msg;
      console.log(savePayload)
      const inputBox = document.getElementsByClassName("input")
      inputBox[0].placeholder = "Enter message here"
      const payload = {
        type: 'option',
        data: {
          "visitorType": "visitor",
          "visitorName": "unknownvisitor",
          "timestamp": new Date().getTime(),
          "type":"chat.msg",
          "msg": msg,
          "option": ["Need assistance", "Eamil_Captured"],
          "trigger": undefined
        }
      }
      this.props.chatStore(payload)
      this.props.storeInput("", false)
    }else{
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
    }
    this.msgInput.current.value = '';
  }

  render() {
    const class_name = [
        'input-container',
        this.props.addClass,
        this.props.storeInputClass.trigger? "email" : ""
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
