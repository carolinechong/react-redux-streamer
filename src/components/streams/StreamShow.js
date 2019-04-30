import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  // Create video element reference to pass into JSX and video player
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  // When component first renders
  componentDidMount() {
    // Deconstructed to avoid repetition
    const { id } = this.props.match.params;

    // Call Action Creator with this.props.match.params.id to fetch stream
    this.props.fetchStream(id);
    // Attempt to build the player
    this.buildPlayer();
  }
  // If component successfully fetches the stream sometime in the future, call build player
  componentDidUpdate() {
    this.buildPlayer();
  }

  // Clean up resources
  componentWillUnmount() {
    // Tell player to stop attempting to stream video and detach itself from video element inside render method.
    this.player.destroy();
  }

  buildPlayer() {
    // If we already built the player OR the stream does not yet exist
    if (this.player || !this.props.stream) {
      // Not going to try to build the player
      return;
    }

    const { id } = this.props.match.params;
    // Otherwise, create video player. Assign to var "this.player"
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });

    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow);
