'use strict';

import React from 'react';

class OfflineForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false
    };
    this.send = this.send.bind(this);
    this.renderChild = this.renderChild.bind(this);
    this.nameInput = React.createRef()
    this.emailInput = React.createRef()
    this.msgInput = React.createRef()

  }

  send(event) {
    event.preventDefault();
    const name = this.nameInput.current.value
    const email = this.emailInput.current.value
    const msg = this.msgInput.current.value
    this.props.switchScreen({type: "msg", payload: msg})
  }

  renderChild() {
    return (
      <form ref="form" key="not-sent" className="offline-form">
        <div className="content">
          <div className="section">
            <label className="label">Name</label>
            <input ref={this.nameInput} maxLength="255" />
          </div>
          <div className="section">
            <label className="label">Email</label>
            <input ref={this.emailInput} />
          </div>
          <div className="section">
            <label className="label">Message</label>
            <textarea required ref={this.msgInput} />
          </div>
        </div>
        <div className="button-container">
        	<button onClick={this.send}>
        		Send
        	</button>
        </div>
      </form>
    );
  }

  render() {
    return (
	    <div style={{display: this.props.addClass ? 'block': 'none'}}>
	      {this.renderChild()}
	    </div>
    );
  }
}

export default OfflineForm;
