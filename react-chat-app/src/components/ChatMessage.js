
import React from 'react';
import Avatar from './Avatar';

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.getClassName = this.getClassName.bind(this);
    this.renderMessagePart = this.renderMessagePart.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }

  getClassName(visitorType) {
    return visitorType;
  }

  renderOptions(options) {
    return (
      <div>
        {options}
      </div>
    )
  }

  renderMessagePart(msg) {
      return (
        <div className="chat-msg">
          <span>{msg}</span>
          {this.renderOptions(this.props.message.options)}
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
          {this.renderMessagePart(this.props.message)}
        </div>
      </div>
    );
  }
}

export default ChatMessage;
