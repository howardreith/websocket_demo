import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import withAppContext from '../withAppContext';

export const StyledAuthFormWrapper = styled.div`
  margin: auto;
  text-align: center;
  width: 60%;
`;

export const StyledSignUpFormHeading = styled.h1`
  font-family: "Arvo", serif;
  font-size: 40px;
`;

export const StyledAuthInputWrapper = styled.div`
  margin: 10px auto;
  text-align: center;
`;

export const StyledSignUpFormInputField = styled.input`
  height: 30px;
  width: 80%;
  display: block;
  margin: auto;
  text-align: center;
  font-size: 20px;
`;

export const StyledAuthFormSubmitButton = styled.button`
  transition-duration: 0.4s;
  background-color: white;
  color: black;
  border-color: gray;
  height: 25px;
  cursor: pointer;
  margin: 2px;
  font-family: "Lato", serif;
`;

class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitAsync = this.handleSubmitAsync.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);

    this.state = { username: null };
  }

  handleUsernameChange(event) {
    const { value } = event.target;
    this.setState((state) => ({ ...state, username: value }));
  }

  async handleSubmitAsync(event) {
    const { username } = this.state;
    event.preventDefault();
    const { onHandleSubmitUsername } = this.props;
    onHandleSubmitUsername(username);
  }

  render() {
    return (
      <>
        <StyledAuthFormWrapper>
          <StyledSignUpFormHeading>Choose a Username</StyledSignUpFormHeading>
          <form onSubmit={this.handleSubmitAsync}>
            <StyledAuthInputWrapper>
              <StyledSignUpFormInputField
                type="text"
                name="username"
                id="usernameInput"
                onChange={this.handleUsernameChange}
                placeholder="Username"
              />
            </StyledAuthInputWrapper>
            <StyledAuthFormSubmitButton type="submit" value="submit" id="usernameSubmitButton">
              Submit
            </StyledAuthFormSubmitButton>
          </form>
        </StyledAuthFormWrapper>
      </>
    );
  }
}

export default withAppContext(SignupPage);

SignupPage.propTypes = {
  onHandleSubmitUsername: PropTypes.func.isRequired,
};
