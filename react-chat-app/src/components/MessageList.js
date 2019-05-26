import React, { Component } from 'react';
import ChatMessage from './ChatMessage';

class MessageList extends Component {
  renderByType(msg, addClass) {
    try{
      switch (msg.type) {
        case 'chat.msg':
          return (
            <ChatMessage
              key={msg.type + msg.timestamp}
              message={msg}
              addClass={addClass}
              agent={this.props.agents[msg.nick]}
            />
          );
        default:
          return <div key={+new Date()}>Unhandled message: {JSON.stringify(msg)}</div>
      }  
    }catch(err){
      console.log("Error ",err)
    }
  }

  render() {
    const { messages } = this.props;
    return (
      <div className="message-list-container">
        <div>{this.renderByType(messages)}</div>
      </div>
    );
  }
}


export default MessageList;
