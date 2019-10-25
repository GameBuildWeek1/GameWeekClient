import React from "react";
import ReactDOM from "react-dom"; // for working with the DOM
import TimeAgo from "react-timeago"; // for displaying human-friendly time

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.renderMessages = this.renderMessages.bind(this);
  }
  render() {
    return (
      <div className="messages">
        {this.renderMessages()}
        <div
          ref={el => {
            this.messagesEnd = el;
          }}
        ></div>
      </div>
    );
  }

  renderMessages() {
    return this.props.messages.map((msg, index) => {
      return (
        <div style={{margin: "10px 20px"}}>
          <div className="msg" key={index} style={{"display": "flex", margin: "2px 0px"}}>
            <div className="msg-from"style={{marginRight: "4px"}}>{msg.name}: </div><div className="msg-body">{msg.message}</div>
          </div>
          <div className="msg-time" style={{display: "flex", fontSize:"11px", color: "#AAA"}}>
            <TimeAgo date={msg.time*1000} minPeriod={60} />
          </div>
        </div>
      );
    });
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }
}

export default MessageList;
