import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  // Callback for StreamForm
  // formValues = changes to form (title, description)
  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    // 'stream' is a obj with title and desc props
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm // StreamForm is wrapped by Redux Form helper
          onSubmit={this.onSubmit}
          //initialValues is a specific Redux Form prop name
          // "title" and "description" from StreamForm field names
          // Use lodash method to only pick out props we want (instead of userId and id) to pass back to API.
          initialValues={_.pick(this.props.stream, "title", "description")}
        />
      </div>
    );
  }
}

// 1st argument: state within Redux Store to get initial values
// 2nd argument: ownProps is a reference to props object inside the component.
const mapStateToProps = (state, ownProps) => {
  // return stream property (key) that contains the specific stream that user is trying to edit.
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
