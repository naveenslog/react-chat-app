
import React from 'react';
import Avatar from './Avatar';

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.getClassName = this.getClassName.bind(this);
    this.renderMessagePart = this.renderMessagePart.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }

  getClassName(msg) {
    return msg.member_type;
  }

  renderOptions(options) {
    return (
      <div>
        <h1>Option</h1>
      </div>
    )
  }

  renderMessagePart(msg) {
      return (
        <div className="chat-msg">
          <span>{this.props.message.msg}</span>
          {this.renderOptions(this.props.message.options)}
        </div>
      );
    }
  

  render() {
    return (
      <div className={`chat-msg-container ${this.getClassName(this.props.message)} ${this.props.addClass}`}>
        <div className="avatar-container">
          <Avatar entity={this.props.agent} />
        </div>
        <div className="chat-msg-wrapper">
          {this.renderMessagePart(this.props.message)}
        </div>
      </div>
    );
  }
}

export default ChatMessage;
