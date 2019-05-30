import '../styles/Widget.scss'
import React from 'react';
import StatusContainer from './StatusContainer';
import MessageList from './MessageList';
import ChatButton from './ChatButton';
import Input from './Input';
import TypingIndicator from './TypingIndicator';
import axios from 'axios'

class WrappedApp extends React.Component {
  constructor() {
    super();
    this.state = {
      typing: false,
      visible: false,
      messages:[],
    };
    this.timer = null;
    this.getVisibilityClass = this.getVisibilityClass.bind(this);
    this.minimizeOnClick = this.minimizeOnClick.bind(this);
    this.chatButtonOnClick = this.chatButtonOnClick.bind(this);
    this.setVisible = this.setVisible.bind(this);
    this.handleTyping = this.handleTyping.bind(this)
    this.generateReply = this.generateReply.bind(this)
    this.chatStore = this.chatStore.bind(this)
  }

  componentDidMount() {
    this.setState({
      visible: this.state.visible,
    });
  }

  handleTyping(event){
    this.setState({
      typing: event
    })
  }

  generateReply(payload){
    this.handleTyping(true)
    axios({
      url: "https://www.naveenslog.ml/chatbot/reply/",
      method: "post",
      data: {"msg": payload.data.msg}
    }).then(res=>{
      let data = {
        "visitorType": "agent",
        "visitorName": "ChatBot",
        "timestamp": new Date().getTime(),
        "type":"chat.msg",
        "msg": res.data.res
      }
      let newMsg = [...this.state.messages, data]
      this.setState({
        messages: newMsg
      })
      this.handleTyping(false)
    })
  }

  chatStore(payload){
    switch(payload.type){
      case 'msg':
        let newMsg = [...this.state.messages, payload.data]
        this.setState({
          messages: newMsg
        })
        this.generateReply(payload)
        break;
      default:
        console.log('Unhandled default case');
    }
  }

  getVisibilityClass() {
    return this.state.visible ? 'visible' : '';
  }

  minimizeOnClick() {
    this.setVisible(false);
  }

  chatButtonOnClick() {
    this.setVisible(true);
  }

  setVisible(visible) {
    this.setState({
      visible
    });
  }


  render() {

    return (
      <div className="index">
        <div className={`widget-container normal ${this.getVisibilityClass()}`}>
          <StatusContainer
            minimizeOnClick={this.minimizeOnClick}
          />
          <MessageList
            visible={this.state.visible}
            messages={this.state.messages}
            newMsg={this.state.newMsg}
          />
          {/* <div className={`spinner-container ${this.state.visible }`}>
            <div className="spinner"></div>
          </div> */}
          <TypingIndicator addClass={this.state.typing}/>
          <Input
            onSubmit={this.handleOnSubmit}
            onChange={this.handleOnChange}
            addClass={this.getVisibilityClass()}
            chatStore={this.chatStore}
          />
        </div>
        <ChatButton addClass={this.getVisibilityClass()} onClick={this.chatButtonOnClick} />
      </div>
    );
  }
}

export default WrappedApp;
