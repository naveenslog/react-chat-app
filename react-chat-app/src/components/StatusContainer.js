
import React, { Component } from 'react';

class StatusContainer extends Component {

  render() {
    const {offlineForm} = this.props
    if (offlineForm === true){
      return (
        <div className="churnbot-status-container churnbot-status-containerNew">
          <div className="chatBoatHeaderA" onClick={()=>{this.props.switchScreen({type: "msg", payload: ""}); }}>
            <img id="churnbot-back-arrow" src="https://angularml.pbodev.info/mlprojects/ZopimChatBot/pendo-chat-app/src/components/arrow.svg" className="chatBoatAppypieLogo" />
          <div className="chatBoatHeaderA-full-introduction">
            <span className="chatBoatHeaderA-full-introductionSpan1" > Go Back </span>
          </div>
          </div>
        </div>
      );
    }else{
      return (
        <div className="status-container">
          <div className="minimize-button" onClick={this.props.minimizeOnClick}>
            <div className="minimize-button-bar" />
          </div>
        </div>
      );
  	}
  }
}

export default StatusContainer;
