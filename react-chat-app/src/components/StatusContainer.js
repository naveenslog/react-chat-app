
import React, { Component } from 'react';

class StatusContainer extends Component {

  render() {
    return (
      <div className="status-container">
        <div className="minimize-button" onClick={this.props.minimizeOnClick}>
          <div className="minimize-button-bar" />
        </div>
      </div>
    );
  }
}

export default StatusContainer;
