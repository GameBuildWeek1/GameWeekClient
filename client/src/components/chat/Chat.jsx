import React, { Component } from "react";
import Pusher from "pusher-js";
import randomAnimal from "random-animal-name-generator";

import MessageList from "./MessageList";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this); // for updating the message being typed
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      message: "",
      messages: []
    };
    this.user = randomAnimal();
  }

  // heroku endpoint - https://build-week-game-server.herokuapp.com/api/adv/say/

  componentWillMount() {
    this.pusher = new Pusher("7163921e28b59b2fa192", {
      authEndpoint: "http://127.0.0.1:8000/api/adv/pusher_auth/",
      cluster: "us3",
      encrypted: true,
      forceTLS: true,
      auth: {
        headers: {
          "X-CSRFToken": "{{ csrf_token }}"
        }
      }
    });
    // subscribe to the channel for this specific blog post
    var channel = "private-lvl";
    this.post_channel = this.pusher.subscribe(channel);
  }

  componentDidMount() {
    this.post_channel.bind("client-on-message", message => {
      message.time = new Date(message.time); // convert to a date object since its converted to a string when sending the message
      // update the state to include the new message
      this.setState({
        messages: this.state.messages.concat(message)
      });
    });
  }

  render() {
    return (
      <div className="chatbox">
        <div className="post-single">
          <div className="post-single__inner">
            <h1>Chat</h1>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                className="text-input"
                placeholder="Type your message here.."
                value={this.state.message}
                onChange={this.handleChange}
              />
            </form>
            {this.state.messages && <MessageList messages={this.state.messages} />}
          </div>
        </div>
      </div>
    );
  }

  handleChange(e) {
    var message = e.target.value;
    this.setState({
      message: message
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let text = this.state.message;
    let message = {
      by: this.user,
      body: text,
      time: new Date()
    };

    this.post_channel.trigger("client-on-message", message);
    this.setState({
      message: "",
      messages: this.state.messages.concat(message)
    });
  }
}
