import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";

import Modal from "./Modal";
import Edit from "./edit.component";
import constants from "./constants";

class TaskView extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.refreshState = this.refreshState.bind(this);
    this.state = {
      id: "",
      job_title: "",
      job_description: "",
      record_created: "",
      redirect: false,
      show: false
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  delete = () => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .get(
          "https://fast-temple-84635.herokuapp.com/delete/" + this.props.match.params.id
        )
        .then(res => {
          this.setState({ redirect: true });
        })
        .catch(err => console.log(err));
    }
  };

  componentDidMount = () => {
    axios
      .get(
        "https://fast-temple-84635.herokuapp.com/business/taskview/" + this.props.match.params.id
      )
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
  };

  refreshState = obj => {
    this.setState({
      id: obj.id,
      job_title: obj.job_title,
      job_description: obj.job_description
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <Edit
            hideModal={this.hideModal}
            refreshState={this.refreshState}
            id={this.props.match.params.id}
          />
        </Modal>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>{constants.ID}</th>
              <td>{this.state.id}</td>
            </tr>
            <tr>
              <th>{constants.JOB_TITLE}</th>
              <td>{this.state.job_title}</td>
            </tr>
            <tr>
              <th>{constants.JOB_DESCRIPTION}</th>
              <td>{this.state.job_description}</td>
            </tr>
            <tr>
              <th>{constants.RECORD_CREATED}</th>
              <td>{this.state.record_created}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-success" onClick={this.showModal}>
          {constants.EDIT}
        </button>
        <button onClick={this.delete} className="btn btn-danger ml-2">
          {constants.DELETE}
        </button>
      </div>
    );
  }
}

export default TaskView;
