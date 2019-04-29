import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

// Initialize the Google API library
class GoogleAuth extends React.Component {
  componentDidMount() {
    // Load the library
    window.gapi.load("client:auth2", () => {
      // Initialize it. Callback function init returns a promise after library has been successfully initialized.
      window.gapi.client
        .init({
          clientId:
            "559482443864-ilotalch9e8vs4gu8tpbsqu91hdi3p5t.apps.googleusercontent.com",
          scope: "email"
        })
        // Arrow function will be automatically invoked after the library has successfully initialized itself.
        .then(() => {
          // Get a reference to the 'auth' object after it's initalized.
          // Assign auth instance to this.auth
          this.auth = window.gapi.auth2.getAuthInstance();

          // Update auth state inside Redux store
          this.onAuthChange(this.auth.isSignedIn.get());

          // Listener - wait for auth status to change in future
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // Since this is a callback function, set up as arrow function so its context is bound to my component.
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  // Event handlers
  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  // Helper method
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
