import '../styles/Widget.scss'
import React from 'react';
import StatusContainer from './StatusContainer';
import MessageList from './MessageList';
import ChatButton from './ChatButton';
import Input from './Input';

class WrappedApp extends React.Component {
  constructor() {
    super();
    this.state = {
      typing: false,
      visible: false
    };
    this.timer = null;
    // this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.getVisibilityClass = this.getVisibilityClass.bind(this);
    this.minimizeOnClick = this.minimizeOnClick.bind(this);
    this.chatButtonOnClick = this.chatButtonOnClick.bind(this);
    this.setVisible = this.setVisible.bind(this);
  }

  componentDidMount() {
    this.setState({
      visible: this.state.visible,
    });
  }

  handleOnChange() {
    if (!this.state.typing) {
      this.setState({ typing: true });
    }
  }


  // handleOnSubmit(event) {
  //   event && event.preventDefault();

  //   console.log(event.target)
  //   const msg = this.msgInput;
  //   console.log(msg)
  //   // const msg = "test"
  //   // Don't send empty messages
  //   if (!msg) return;

  //   // this.props.dispatch({
  //   //   type: 'synthetic',
  //   //   detail: {
  //   //     type: 'visitor_send_msg',
  //   //     msg
  //   //   }
  //   // });
  //   this.refs.input.getRawInput().value = '';
  // }

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
            // messages={this.props.data && this.props.data.chats.toArray()}
          />
          {/* <div className={`spinner-container ${this.state.visible }`}>
            <div className="spinner"></div>
          </div> */}
          <Input
            onSubmit={this.handleOnSubmit}
            onChange={this.handleOnChange}
            addClass={this.getVisibilityClass()}
          />
        </div>
        <ChatButton addClass={this.getVisibilityClass()} onClick={this.chatButtonOnClick} />
      </div>
    );
  }
}

export default WrappedApp;
