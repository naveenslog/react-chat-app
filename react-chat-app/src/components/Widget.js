import '../styles/Widget.scss';
import React from 'react';
import StatusContainer from './StatusContainer';
import MessageList from './MessageList';
import ChatButton from './ChatButton';
import Input from './Input';
import TypingIndicator from './TypingIndicator';
import axios from 'axios';
import data from '../data/data';
import _ from 'lodash';

class WrappedApp extends React.Component {
  constructor() {
    super();
    this.state = {
      typing: false,
      visible: false,
      offlineForm: false,
      storeInputData: {dataType: "", trigger: false},
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
    this.switchScreen = this.switchScreen.bind(this)
    this.storeInput = this.storeInput.bind(this)
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


  generateReply(inpMessage){
    this.handleTyping(true)
    //Looking for reply in rule based system
    const message = _.find(data, {"intent": inpMessage})
    if (!message){
      axios({
        url: "https://www.naveenslog.ml/chatbot/reply/",
        method: "post",
        data: {"msg": inpMessage}
      }).then(res=>{
        let data = {
          "visitorType": "agent",
          "visitorName": "ChatBot",
          "timestamp": new Date().getTime(),
          "type":"chat.msg",
          "msg": res.data.res
        }
        let newMsg = [
          ...this.state.messages, data
        ]
        this.setState({
          messages: newMsg
        })
        this.handleTyping(false)
      })
    } else {
      let data = {
        "visitorType": "agent",
        "visitorName": "ChatBot",
        "timestamp": new Date().getTime(),
        "type": "chat.msg",
        "msg": message.msg,
        "options": message.options
      }
      let newMsg = [
        ...this.state.messages, data
      ]
      this.setState({
        messages: newMsg
      })
      this.handleTyping(false)
    }
  }

  chatStore(payload){
    switch(payload.type){
      case "msg":
        this.setState({
          messages: [...this.state.messages, payload.data]
        })
        setTimeout(()=>{
          this.generateReply(payload.data.msg) 
        },500)
        break;
      case "option":
        this.setState({
          messages: [...this.state.messages, payload.data]
        })
        setTimeout(()=>{
          this.generateReply(payload.data.option[1]) 
        },500)
        break;
      case "noreply":
        this.setState({
          messages: [...this.state.messages, payload.data]
        })
        break;
      case "trigger":
        switch(true){
          case payload.data.trigger === "Offline_Form":
            this.setState({
              offlineForm: true
            })
            break
          case payload.data.trigger === "Capture_Email":
            this.storeInput("email", true)
            const inputBox = document.getElementsByClassName("input")
            inputBox[0].placeholder = "Please enter email id"
            break
          default:
            console.log("Unhandled Trigger")
        }
        break;
      default:
        console.log('Unhandled default case');
    }
  }

  storeInput(dataType, trigger){
    this.setState({
      storeInputData: {dataType: dataType, trigger: trigger}
    })
  }

  getVisibilityClass() {
    return this.state.visible ? 'visible' : '';
  }

  minimizeOnClick() {
    this.setVisible(false);
  }

  chatButtonOnClick() {
    this.setVisible(true);
    if(this.state.messages.length === 0){
      this.generateReply("Greetings")
    }
  }

  setVisible(visible) {
    this.setState({
      visible
    });
  }

  switchScreen(action){
    console.log(action)
    if (action.type === "msg") {
      if (action.payload.length === 0){
        this.setState({
          offlineForm: false
        })        
      }else{
        const payload = {
          type: 'option',
          data: {
            "visitorType": "visitor",
            "visitorName": "unknownvisitor",
            "timestamp": new Date().getTime(),
            "type":"chat.msg",
            "msg": action.payload,
            "option": ["Ticket Raised", "Ticket Raised"],
            "trigger": undefined
          }
        }
        this.chatStore(payload)
        this.setState({
          offlineForm: false
        })
      }
      let scroll = document.getElementsByClassName("message-list-container")[0]
      scroll.scrollTo(0, scroll.scrollHeight)
    } else if (action.type === "form") {
      this.setState({
        offlineForm: false
      })
    }
  }



  render() {

    return (
      <div className="index">
        <div className={`widget-container normal ${this.getVisibilityClass()}`}>
          <StatusContainer
            minimizeOnClick={this.minimizeOnClick}
            switchScreen={this.switchScreen}
            offlineForm={this.state.offlineForm}
          />
          <MessageList
            visible={this.state.visible}
            messages={this.state.messages}
            newMsg={this.state.newMsg}
            chatStore={this.chatStore}
            switchScreen={this.switchScreen}
            offlineForm={this.state.offlineForm}
          />
          <TypingIndicator addClass={this.state.typing}/>
          <Input
            storeInputClass={this.state.storeInputData}
            storeInput={this.storeInput}
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
