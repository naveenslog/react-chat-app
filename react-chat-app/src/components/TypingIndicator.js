import React from 'react'
import Avatar from './Avatar'

const TypingIndicator = (props) => {
    const {addClass} = props;
    return (
        <div className="chat-msg-container agent" style={{display: addClass === true ? "block" : "none"}}>
            <div className="avatar-container">
                <Avatar entity="agent" />
            </div>
            <div className="chat-msg-wrapper">
                <div className="chat-msg">
                    <div className="typing-indicator">
                        <div className="typing-indicator-part">•</div>
                        <div className="typing-indicator-part">•</div>
                        <div className="typing-indicator-part">•</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TypingIndicator;