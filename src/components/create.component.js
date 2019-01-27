import React, { Component } from "react";
import axios from "axios";
import constants from "./constants";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeID = this.onChangeID.bind(this);
    this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
    this.onChangeJobDescription = this.onChangeJobDescription.bind(this);
    this.setCreationDate = this.setCreationDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: "",
      job_title: "",
      job_description: ""
    };
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

  setCreationDate = () => {
    let date = new Date();
    return date.toGMTString();
  }

  onSubmit = e => {
    this.setCreationDate();
    e.preventDefault();
    const obj = {
      id: this.state.id,
      job_title: this.state.job_title,
      job_description: this.state.job_description,
      record_created: this.setCreationDate()
        .split(",")[1]
        .substr(1)
    };
    console.log(obj);
    axios
      .post("https://fast-temple-84635.herokuapp.com/business/add", obj)
      .then(res => console.log(res.data));
    this.props.addBusiness(obj);
    this.setState({
      id: "",
      job_name: "",
      job_description: ""
    });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>{constants.ADD_NEW_TASK}</h3>
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
            <input
              type="submit"
              onClick={this.props.hideModal}
              value="Create Task"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
