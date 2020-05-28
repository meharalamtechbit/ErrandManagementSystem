import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import * as $ from "jquery";

import {
  getErrandsData,
  showAddErrandDialog,
  getNextDaysErrands,
  getPreviousDaysErrands,
  getErrand,
  deleteErrand,
} from "../../../redux/modules/errand/errandAction";
import AddEditErrand from "../container/AddEditErrand";
import { notification } from "../../../redux/services";

class ErrandsComponent extends Component {
  state = {
    show: false,
    pageTitle: "Next Days",
  };

  componentDidMount() {
    this.props.getErrandsData().then((response) => {
      this.initializeAccordian();
    });
  }

  initializeAccordian() {
    $("body").on("click", ".tasks-header-toggler", function () {
      $(this).closest(".tasks-section").find(".tasks-list-w").slideToggle(100);
      return false;
    });
  }

  openDialog() {
    this.props.showAddErrandDialog();
  }

  getNextDaysErrands() {
    this.setState({ pageTitle: "Next Days" });
    this.props.getNextDaysErrands();
  }

  getPreviousDaysErrands() {
    this.setState({ pageTitle: "Previous Days" });
    this.props.getPreviousDaysErrands();
  }

  getErrand(id) {
    this.props.getErrand(id).then(() => {
      this.props.showAddErrandDialog();
    });
  }

  openDeleteErrandConfirmationModal(id) {
    confirmAlert({
      title: "Delete Errand ?",
      message: "Are you sure you want to delete this ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteErrand(id),
        },
        {
          label: "No",
        },
      ],
    });
  }

  deleteErrand(id) {
    this.props.deleteErrand(id).then(() => {
      notification.success("Errand deleted successfully");
      this.props.getErrandsData();
    });
  }

  render() {
    const { errands, showDialog } = this.props;
    const { pageTitle } = this.state;

    return (
      <React.Fragment>
        {showDialog && <AddEditErrand></AddEditErrand>}

        <div className="all-wrapper no-padding-content solid-bg-all">
          <div className="layout-w">
            <div className="content-w">
              <div className="top-bar color-scheme-light">
                <ul>
                  <li className="active">
                    <a href="/#">Errand Management System</a>
                  </li>
                </ul>
              </div>

              <div className="content-i">
                <div className="content-box">
                  <div className="todo-app-w">
                    <div className="todo-sidebar">
                      <div className="todo-sidebar-section">
                        <h4 className="todo-sidebar-section-header">
                          Errands
                          <a className="todo-sidebar-section-toggle" href="/#">
                            <i className="os-icon os-icon-ui-23"></i>
                          </a>
                        </h4>
                        <div className="todo-sidebar-section-contents">
                          <ul className="projects-list">
                            <li>
                              <a
                                href="/#"
                                onClick={this.getNextDaysErrands.bind(this)}
                              >
                                <span> Next Days</span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="/#"
                                onClick={this.getPreviousDaysErrands.bind(this)}
                              >
                                <span> Previous Days</span>
                              </a>
                            </li>

                            <li className="add-new-project">
                              <a href="/#" onClick={this.openDialog.bind(this)}>
                                Add New Errand
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="todo-content">
                      <h4 className="todo-content-header">
                        <i className="os-icon os-icon-ui-83"></i>
                        <span> {pageTitle} </span>
                      </h4>
                      <div className="all-tasks-w">
                        {errands.map((item, index) => (
                          <div key={index} className="tasks-section">
                            <div className="tasks-header-w">
                              <a className="tasks-header-toggler" href="/#">
                                <i className="os-icon os-icon-ui-23"></i>
                              </a>
                              <h5 className="tasks-header">{item.key.day}</h5>
                              <span className="tasks-sub-header">
                                {item.key.date}
                              </span>
                            </div>
                            <div className="tasks-list-w">
                              <ul className="tasks-list">
                                {item.errands.length > 0 &&
                                  item.errands.map((errand, errandIndex) => (
                                    <li
                                      key={errandIndex}
                                      className={`draggable-task ${errand.priorityClass}`}
                                    >
                                      <div className="todo-task">
                                        <span>
                                          {errand.title}
                                          <span
                                            className={`badge badge-${errand.priorityClass} ml-2`}
                                          >
                                            {errand.priorityName}
                                          </span>
                                        </span>
                                        <div className="todo-task-buttons">
                                          <a
                                            className="task-btn-edit"
                                            data-target="#taskModal"
                                            data-toggle="modal"
                                            href="/#"
                                            onClick={this.getErrand.bind(
                                              this,
                                              errand.id
                                            )}
                                          >
                                            <span>Edit</span>
                                            <i className="os-icon os-icon-ui-49"></i>
                                          </a>
                                          <a
                                            className="task-btn-delete"
                                            href="/#"
                                            onClick={this.openDeleteErrandConfirmationModal.bind(
                                              this,
                                              errand.id
                                            )}
                                          >
                                            <span>Delete</span>
                                            <i className="os-icon os-icon-ui-15"></i>
                                          </a>
                                        </div>
                                      </div>
                                    </li>
                                  ))}

                                {item.errands.length <= 0 && (
                                  <li className="draggable-task">
                                    <div className="todo-task">
                                      <h3>{item.key.error}</h3>
                                    </div>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  errands: state.errand.errands,
  showDialog: state.errand.showDialog,
});

const mapDispatchToProps = {
  getErrandsData,
  showAddErrandDialog,
  getNextDaysErrands,
  getPreviousDaysErrands,
  getErrand,
  deleteErrand,
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrandsComponent);
