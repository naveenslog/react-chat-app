
import React from 'react';
import Avatar from './Avatar';

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogues: []
    }
    this.getClassName = this.getClassName.bind(this);
    this.renderMessagePart = this.renderMessagePart.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }

  getClassName(visitorType) {
    return visitorType;
  }

  dispatchUserChoice(option){
    let visitorMsg;
    let type;
    let trigger;

    switch (true){
      case option[1] == "Offline_Form":
        visitorMsg = option[0]
        type = "trigger"
        trigger = "Offline_Form"
        break;
      case option[1] == "Capture_Email":
        visitorMsg = option[0]
        type = "trigger"
        trigger = "Capture_Email"
        break;
      default:
        visitorMsg = option[0]
        type = "option"
        break;
      }

      const payload = {
        type: type,
        data: {
          "visitorType": "visitor",
          "visitorName": "unknownvisitor",
          "timestamp": new Date().getTime(),
          "type":"chat.msg",
          "msg": visitorMsg,
          "option": option,
          "trigger": trigger
        }
      }
      this.props.chatStore(payload)
    }

  renderOptions(options) {
    if (!options){
      return false
    }else{
      const buttons = options.map(option=>{
        return (
          <button
            key={option[0]}
            onClick={()=>{this.dispatchUserChoice(option)}}
            className="display-option-button"
          >
            {option[0]}
          </button>
        );
      })
      return (
          <div className="chatbot-options">
            {buttons}
          </div>
      )         
    }
  }

  renderMessagePart(msg, options) {
    return (
      <div className="chat-msg">
      <span dangerouslySetInnerHTML={{ __html: msg }}/>
        {this.renderOptions(options)}
      </div>
    );
  }
  

  render() {
    return (
      <div className={`chat-msg-container ${this.getClassName(this.props.agent)} ${this.props.addClass}`}>
        <div className="avatar-container">
          <Avatar entity={this.props.agent} />
        </div>
        <div className="chat-msg-wrapper">
          {this.renderMessagePart(this.props.message.msg, this.props.message.options)}
        </div>
      </div>
    );
  }
}

export default ChatMessage;
