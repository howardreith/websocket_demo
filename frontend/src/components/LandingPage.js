import React, { Component } from 'react';
import withAppContext from '../withAppContext';
import { AppContextPropType } from '../helpers/PropTypeConstants';
import { signInWithUsername } from './backend';
import SignupPage from './SignupPage';
import ChatRoom from './ChatRoom';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
  }

  async handleSubmitUsername(username) {
    const { appContext } = this.props;
    const response = await signInWithUsername(username);
    appContext.setToken(response.token);
  }

  render() {
    const { appContext } = this.props;
    return (
      <>
        {!appContext.token && (<SignupPage onHandleSubmitUsername={this.handleSubmitUsername} />)}
        {appContext.token && (
        <>
          <ChatRoom />
        </>
        )}

      </>

    );
  }
}

export default withAppContext(LandingPage);

LandingPage.propTypes = {
  appContext: AppContextPropType.isRequired,
};
