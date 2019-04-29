// Form for StreamCreate and StreamEdit

import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  // Deconstructed out 'meta' property
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  // Deconstructed out 'formProps' property
  // Going to take input properties (value, onChange) from formProps and add them as props to the input element.
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  // Helper method
  // After the form inputs are valid, Parent component to pass down callback onSubmit() with whatever values inside the form (formValues).
  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      // handleSubmit() is a Redux Form function
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// Validate form values
const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "Please enter a title.";
  }
  if (!formValues.description) {
    errors.description = "Please enter a description.";
  }
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate
})(StreamForm);
