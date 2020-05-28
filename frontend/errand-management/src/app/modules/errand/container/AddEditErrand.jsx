import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { notification } from "../../../redux/services";

import {
  createErrand,
  updateErrand,
  getErrandsData,
  hideAddErrandDialog,
} from "../../../redux/modules/errand/errandAction";
import { priority } from "../constants";

const style = {
  dangerColor: {
    color: "red",
  },
};

const AddEditErrand = () => {
  const showDialog = useSelector((state) => state.errand.showDialog);
  const errand = useSelector((state) => state.errand.errand);
  const dispatch = useDispatch();

  const { control, register, errors, handleSubmit, reset } = useForm();

  useEffect(() => {
    reset(errand);
  }, [reset, errand]);

  const onSubmit = (data) => {
    if (data.id) {
      updateErrandData(data);
    } else {
      createNewErrand(data);
    }
  };

  function createNewErrand(data) {
    dispatch(createErrand(data)).then((response) => {
      hideDialog();
      notification.success("Errand saved successfully");
      dispatch(getErrandsData());
    });
  }

  function updateErrandData(data) {
    dispatch(updateErrand(data)).then((response) => {
      hideDialog();
      notification.success("Errand updated successfully");
      dispatch(getErrandsData());
    });
  }

  function hideDialog() {
    dispatch(hideAddErrandDialog());
  }

  return (
    <React.Fragment>
      <Modal show={showDialog} onHide={() => hideDialog()}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title> Add Errand </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <input name="id" type="hidden" ref={register} />

              <div className="form-group">
                <label>Title</label>
                <input
                  name="title"
                  className="form-control"
                  placeholder="Enter title"
                  type="text"
                  ref={register({ required: true, maxLength: 100 })}
                />
                {errors.title && (
                  <span style={style.dangerColor}> Title is required</span>
                )}
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  ref={register}
                ></textarea>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label> Due Date </label>
                    <div>
                      <Controller
                        className="single-daterange form-control"
                        as={DatePicker}
                        rules={{ required: true }}
                        name="created_date"
                        valueName="selected"
                        control={control}
                        onChange={([selected]) => selected}
                        defaultValue={new Date()}
                      />
                      {errors.created_date && (
                        <span style={style.dangerColor}> Date is required</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Priority</label>
                    <select
                      ref={register}
                      name="priority"
                      className="form-control"
                    >
                      <option value={priority.High}>High Priority</option>
                      <option value={priority.Normal}>Normal Priority</option>
                      <option value={priority.Low}>Low Priority</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-teal">
              Save changes
            </button>
            <button
              onClick={() => hideDialog()}
              className="btn btn-link"
              data-dismiss="modal"
              type="button"
            >
              Cancel
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default AddEditErrand;
