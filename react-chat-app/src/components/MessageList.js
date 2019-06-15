import React, { Component } from 'react';
import ChatMessage from './ChatMessage';
import OfflineForm from './OfflineForm';


class MessageList extends Component {

  constructor(props){
    super(props)
    this.renderAll = this.renderAll.bind(this)
  }

  componentDidUpdate(){
    let scroll = document.getElementsByClassName("message-list-container")[0]
    scroll.scrollTo(0, scroll.scrollHeight)
  }

  renderByType(msg, addClass) {
      switch (msg.type) {
        case 'chat.msg':
          return (
            <ChatMessage
              key={msg.type + msg.timestamp}
              message={msg}
              addClass={addClass}
              agent={msg.visitorType}
              chatStore={this.props.chatStore}
            />
          );
        default:
          return <div key={+new Date()}>Unhandled message: {JSON.stringify(msg)}</div>
      }  
  }

  renderAll(messages){
    const msgItems = messages.map(msg=>{
      return this.renderByType(msg)
    })
    return msgItems
  }

  render() {
    const { messages } = this.props;
    return (
      <div className="message-list-container">
        <div id="leave-msg" style={{ display: this.props.offlineForm ? 'block': 'none' }}>
          <OfflineForm addClass={this.props.offlineForm} switchScreen={this.props.switchScreen} />
        </div>
        <div style={{ display: this.props.offlineForm ? 'none': 'block' }} >{this.renderAll(messages)}</div>
      </div>
    );
  }
}


export default MessageList;
