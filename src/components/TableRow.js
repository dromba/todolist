import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import constants from "./constants";

import Modal from "./Modal";
import Edit from "./edit.component";

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.refreshState = this.refreshState.bind(this);

    this.state = {
      show: false,
      id: this.props.obj.id,
      job_title: this.props.obj.job_title,
      job_description: this.props.obj.job_description,
      record_created: this.props.obj.record_created
    };
  }

  delete = () => {
    console.log("delete tablerow");
    console.log(this);
    if (window.confirm("Are you sure you want to delete this record?")) {
      console.log(this.props.obj._id);
      axios
        .get("https://fast-temple-84635.herokuapp.com/business/delete/" + this.props.obj._id)
        .then(res => {
          console.log("deleted");
          this.props.delete(this.props.indice);
        })
        .catch(err => console.log(err));
    }
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  refreshState = obj => {
    this.setState({
      id: obj.id,
      job_title: obj.job_title,
      job_description: obj.job_description
    });
  };

  render() {
    return (
      <tr>
        <td>
          <input
            type="checkbox"
            name={this.props.indice}
            onClick={() => this.props.changeCheckboxValues(this.props.indice)}
          />
        </td>
        <td>
          <Link to={"/taskview/" + this.props.obj._id}>{this.state.id}</Link>
        </td>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <Edit
            hideModal={this.hideModal}
            refreshState={this.refreshState}
            id={this.props.obj._id}
          />
        </Modal>
        <td>{this.state.job_title}</td>
        <td>{this.state.job_description}</td>
        <td>{this.state.record_created}</td>
        <td>
          <button className="btn btn-success" onClick={this.showModal}>
            {constants.EDIT}
          </button>
          <button onClick={this.delete} className="btn btn-danger ml-1">
            {constants.DELETE}
          </button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
