import React, { Component } from 'react';
import { sendMessage } from './backend';
import withAppContext from '../withAppContext';
import { AppContextPropType } from '../helpers/PropTypeConstants';

export class ChatRoomWithoutContext extends Component {
  constructor(props) {
    super(props);
    this.handleMessageTextChange = this.handleMessageTextChange.bind(this);
    this.handleSubmitAsync = this.handleSubmitAsync.bind(this);

    this.state = { messageText: '' };
  }

  handleMessageTextChange(event) {
    const { value } = event.target;
    this.setState((state) => ({ ...state, messageText: value }));
  }

  async handleSubmitAsync(event) {
    event.preventDefault();
    const { messageText } = this.state;
    const { appContext } = this.props;
    await sendMessage(appContext.username, messageText);
  }

  render() {
    const { messageText } = this.state;
    return (
      <div>
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
