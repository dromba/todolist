import React, { Component } from "react";
import axios from "axios";
import constants from "./constants";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeID = this.onChangeID.bind(this);
    this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
    this.onChangeJobDescription = this.onChangeJobDescription.bind(this);
    this.onChangeRecordCreated = this.onChangeRecordCreated.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: "",
      job_title: "",
      job_description: "",
      record_created: ""
    };
  }

  componentDidMount= () => {
    axios
      .get("http://localhost:4000/business/edit/" + this.props.id)
      .then(response => {
        this.setState({
          id: response.data.id,
          job_title: response.data.job_title,
          job_description: response.data.job_description,
          record_created: response.data.record_created
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangeID = e => {
    this.setState({
      id: e.target.value
    });
  }

  onChangeJobTitle = e => {
    this.setState({
      job_title: e.target.value
    });
  }

  onChangeJobDescription = e => {
    this.setState({
      job_description: e.target.value
    });
  }

  onChangeRecordCreated = e => {
    this.setState({
      record_created: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const obj = {
      id: this.state.id,
      job_title: this.state.job_title,
      job_description: this.state.job_description,
      record_created: this.state.record_created
    };
    axios
      .post("http://localhost:4000/business/update/" + this.props.id, obj)
      .then(res => console.log(res.data));
    this.props.refreshState(obj);
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Update Task</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>{constants.ID}{constants.COLON} </label>
            <input
              type="text"
              className="form-control"
              value={this.state.id}
              onChange={this.onChangeID}
            />
          </div>
          <div className="form-group">
            <label>{constants.JOB_TITLE}{constants.COLON} </label>
            <input
              type="text"
              className="form-control"
              value={this.state.job_title}
              onChange={this.onChangeJobTitle}
            />
          </div>
          <div className="form-group">
            <label>{constants.JOB_DESCRIPTION}{constants.COLON} </label>
            <input
              type="text"
              className="form-control"
              value={this.state.job_description}
              onChange={this.onChangeJobDescription}
            />
          </div>
          <div className="form-group">
            <label>{constants.RECORD_CREATED}{constants.COLON} </label>
            <input
              type="text"
              className="form-control"
              value={this.state.record_created}
              onChange={this.onChangeRecordCreated}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              onClick={this.props.hideModal}
              value="Update Task"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
