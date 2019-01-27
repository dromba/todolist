import React, { Component } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import constants from "./constants";

import Create from "./create.component";
import Modal from "./Modal";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
    this.changeCheckboxValues = this.changeCheckboxValues.bind(this);
    this.deleteChecked = this.deleteChecked.bind(this);
    this.filterItems = this.filterItems.bind(this);
    this.delete = this.delete.bind(this);
    this.goToLeft = this.goToLeft.bind(this);
    this.goToRight = this.goToRight.bind(this);
    this.addBusiness = this.addBusiness.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      business: [],
      checkboxesChecked: [],
      filter: "",
      allBusiness: [],
      pages: undefined,
      currentPage: 1,
      show: false
    };
  }

  componentDidMount = () => {
    axios
      .get("https://fast-temple-84635.herokuapp.com/business")
      .then(response => {
        this.setState({
          business: response.data,
          allBusiness: response.data,
          pages: Math.ceil(response.data.length / 5)
        });
        response.data.map((el, index) => {
          this.state.checkboxesChecked[index] = false;
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  sort = e => {
    let arr = this.state.business.sort((a, b) =>
      a[e.target.value] > b[e.target.value]
        ? 1
        : b[e.target.value] > a[e.target.value]
        ? -1
        : 0
    );
    this.setState({ business: "" }, () => {
      this.setState({ business: arr });
    });
  };

  delete = index => {
    console.log("delete index axios");
    axios
      .get(
        "https://fast-temple-84635.herokuapp.com/business/delete/" +
          this.state.business[index]._id
      )
      .then(res => {
        console.log("deleted");
      })
      .catch(err => console.log(err));
  };

  tabRow = () => {
    return this.state.business
      .map((object, i) => {
        console.log(object);
        return (
          <TableRow
            changeCheckboxValues={this.changeCheckboxValues}
            obj={object}
            key={i}
            indice={i}
            delete={ind => this.deleteItem(ind)}
          />
        );
      })
      .slice((this.state.currentPage - 1) * 5, this.state.currentPage * 5);
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  addBusiness = obj => {
    let business = this.state.business;
    business.push(obj);
    this.setState({
      business: business
    });
  };

  changeCheckboxValues = index => {
    let checkboxes = this.state.checkboxesChecked;
    checkboxes[index] = checkboxes[index] ? false : true;
    this.setState({ checkboxesChecked: checkboxes });
  };

  deleteChecked = () => {
    if (window.confirm(constants.ALERT_MULTIPLE)) {
      let business = this.state.business;
      for (let i = this.state.checkboxesChecked.length - 1; i > -1; i--) {
        if (this.state.checkboxesChecked[i]) {
          this.delete(i);
          business.splice(i, 1);
        }
      }
      this.setState({ business: "" }, () => {
        this.setState({ business: business });
      });
    }
  };

  filterItems = e => {
    let filter = e.target.value.toUpperCase();
    let business = [];
    this.state.allBusiness.forEach(obj => {
      let objValue = Object.values(obj);
      objValue.forEach(el => {
        el = typeof el === "number" ? el.toString() : el;
        if (el.toUpperCase().includes(filter)) {
          business.push(obj);
        }
      });
    });
    let unique = [...new Set(business)];
    this.setState({ business: "", filter: "" }, () => {
      this.setState({
        filter: filter,
        business: unique
      });
    });
  };

  deleteItem = index => {
    let arr = this.state.business.filter((_, i) => i !== index);
    this.setState({ business: "" }, () => {
      this.setState({ business: arr });
    });
  };

  goToLeft = () => {
    const toPage = this.state.currentPage - 1;
    this.setState({ currentPage: "" }, () => {
      this.setState({ currentPage: toPage });
    });
  };

  goToRight = () => {
    const toPage = this.state.currentPage + 1;
    this.setState({ currentPage: "" }, () => {
      this.setState({ currentPage: toPage });
    });
  };

  render() {
    if (this.state.business.length === 0) {
      return (
        <div>
          <div>
            <Modal show={this.state.show} handleClose={this.hideModal}>
              <Create
                hideModal={this.hideModal}
                addBusiness={this.addBusiness}
              />
            </Modal>
            <button
              className="btn btn-primary float-right"
              onClick={this.showModal}
            >
              {constants.CREATE_NEW_TASK}
            </button>
            <select onChange={this.sort} className="custom-select col-sm-2">
              <option selected="">{constants.CHOOSE}</option>
              <option value="id">{constants.ID}</option>
              <option value="job_title">{constants.JOB_TITLE}</option>
              <option value="job_description">{constants.JOB_DESCRIPTION}</option>
              <option value="record_created">{constants.RECORD_CREATED}</option>
            </select>
            <button
              onClick={this.deleteChecked}
              className="col-sm-2 ml-2 btn btn-danger"
            >
              {constants.DELETE_CHECKED}
            </button>
            <input
              onChange={this.filterItems}
              value={this.state.filter}
              className="form-control col-sm-4 float-right input mr-2"
              placeholder="Search..."
            />
          </div>
          <table className="table" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th />
                <th>{constants.ID}</th>
                <th>{constants.JOB_TITLE}</th>
                <th>{constants.JOB_DESCRIPTION}</th>
                <th>{constants.RECORD_CREATED}</th>
                <th colSpan="2">{constants.ACTION}</th>
              </tr>
            </thead>
            <tbody />
          </table>
          {paginationButtons}
        </div>
      );
    }
    if (this.state.business.length > 5) {
      var paginationButtons = [<br />];
      console.log(this.state.pages);
      if (this.state.currentPage === 1) {
        paginationButtons.push(
          <button
            key={10}
            className="float-right btn btn-secondary"
            onClick={this.goToRight}
          >
            &gt;&gt;
          </button>
        );
      } else if (this.state.currentPage === this.state.pages) {
        paginationButtons.push(
          <button
            key={11}
            className="float-left btn btn-secondary"
            onClick={this.goToLeft}
          >
            &lt;&lt;
          </button>
        );
      } else {
        paginationButtons.push(
          <button
            key={11}
            className="float-left btn btn-secondary"
            onClick={this.goToLeft}
          >
            &lt;&lt;
          </button>
        );
        paginationButtons.push(
          <button
            key={10}
            className="float-right btn btn-secondary"
            onClick={this.goToRight}
          >
            &gt;&gt;
          </button>
        );
      }
    }
    return (
      <div>
        <div>
          <Modal show={this.state.show} handleClose={this.hideModal}>
            <Create hideModal={this.hideModal} addBusiness={this.addBusiness} />
          </Modal>
          <button
            className="btn btn-primary float-right"
            onClick={this.showModal}
          >
            {constants.CREATE_NEW_TASK}
          </button>
          <select onChange={this.sort} className="custom-select col-sm-2">
            <option selected="">{constants.CHOOSE}</option>
            <option value="id">{constants.ID}</option>
            <option value="job_title">{constants.JOB_TITLE}</option>
            <option value="job_description">{constants.JOB_DESCRIPTION}</option>
            <option value="record_created">{constants.RECORD_CREATED}</option>
          </select>
          <button
            onClick={this.deleteChecked}
            className="col-sm-2 ml-2 btn btn-danger"
          >
            {constants.DELETE_CHECKED}
          </button>
          <input
            onChange={this.filterItems}
            value={this.state.filter}
            className="form-control col-sm-4 float-right input mr-2"
            placeholder="Search..."
          />
        </div>
        <table className="table" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th />
              <th>{constants.ID}</th>
              <th>{constants.JOB_TITLE}</th>
              <th>{constants.JOB_DESCRIPTION}</th>
              <th>{constants.RECORD_CREATED}</th>
              <th colSpan="2">{constants.ACTION}</th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
        {paginationButtons}
      </div>
    );
  }
}
