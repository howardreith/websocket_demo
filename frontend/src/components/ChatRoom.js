import React, { Component } from 'react';
import { io } from 'socket.io-client';
import { getLast20Messages } from './backend';
import withAppContext from '../withAppContext';
import { AppContextPropType } from '../helpers/PropTypeConstants';

// const SOCKET_IO_URL = 'http://localhost:3000';
// TODO will need to set an environment variable here perhaps
// https://socket.io/docs/v3/client-initialization/
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const socket = io(backendUrl);

export class ChatRoomWithoutContext extends Component {
  constructor(props) {
    super(props);
    this.handleMessageTextChange = this.handleMessageTextChange.bind(this);
    this.handleSubmitAsync = this.handleSubmitAsync.bind(this);

    this.state = { messageText: '', messages: [] };
  }

  async componentDidMount() {
    const initialMessages = await getLast20Messages();
    this.setState({ messages: initialMessages.messages.reverse() });

    socket.on('receiveMessage', (data) => {
      const { username, message } = data;
      const { messages } = this.state;
      messages.push({ messageSender: username, message });
      this.setState({ messages });
    });
  }

  handleMessageTextChange(event) {
    const { value } = event.target;
    this.setState((state) => ({ ...state, messageText: value }));
  }

  async handleSubmitAsync(event) {
    event.preventDefault();
    const { messageText } = this.state;
    const { appContext } = this.props;
    const data = { username: appContext.username, message: messageText };
    socket.emit('message', data);
  }

  render() {
    const { messageText, messages } = this.state;
    return (
      <div>
        <div>
          {messages.map((message) => (
            <div key={`wrapper${message.message.replace(/\s/, '')}`}>
              <span key={`sender${message.message.replace(/\s/, '')}`}>
                {`${message.messageSender}: `}
              </span>
              <span key={`message${message.message.replace(/\s/, '')}`}>{message.message}</span>
            </div>
          ))}
        </div>
        <form onSubmit={this.handleSubmitAsync}>
          <textarea value={messageText} onChange={this.handleMessageTextChange} />
          <input type="submit" value="send" id="sendMessageButton" />
        </form>
      </div>
    );
  }
}

export default withAppContext(ChatRoomWithoutContext);

ChatRoomWithoutContext.propTypes = {
  appContext: AppContextPropType.isRequired,
};
