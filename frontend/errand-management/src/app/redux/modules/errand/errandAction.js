import { errandService } from "../../services";
import actionType from "./actionType";

function getErrandsData() {
  return (dispatch) =>
    errandService
      .getErrands()
      .then((response) => {
        dispatch({ type: actionType.ERRANDS_DATA, data: response.data });
        return response;
      })
      .catch((err) => err);
}

function createErrand(errand) {
  return (dispatch) =>
    errandService
      .createErrand(errand)
      .then((response) => {
        dispatch({ type: actionType.ERRANDS_DATA, data: response.data });
        return response;
      })
      .catch((err) => err);
}

function updateErrand(errand) {
  return (dispatch) =>
    errandService
      .updateErrand(errand)
      .then((response) => {
        dispatch({ type: actionType.ERRANDS_DATA, data: response.data });
        return response;
      })
      .catch((err) => err);
}

function getErrand(id) {
  return (dispatch) =>
    errandService
      .getErrand(id)
      .then((response) => {
        dispatch({ type: actionType.ERRAND_BY_ID, data: response.data });
        return response;
      })
      .catch((err) => err);
}

function deleteErrand(id) {
  return (dispatch) =>
    errandService
      .deleteErrand(id)
      .then((response) => {
        dispatch({ type: actionType.ERRANDS_DATA, data: response.data });
        return response;
      })
      .catch((err) => err);
}

function showAddErrandDialog() {
  return (dispatch) => {
    dispatch({ type: actionType.SHOW_DIALOG });
  };
}

function hideAddErrandDialog() {
  return (dispatch) => {
    dispatch({ type: actionType.HIDE_DIALOG });
  };
}

function getNextDaysErrands() {
  return (dispatch) =>
    new Promise((resolve) => {
      dispatch({ type: actionType.NEXT_DAYS_ERRANDS });
      resolve(true);
    });
}

function getPreviousDaysErrands() {
  return (dispatch) =>
    new Promise((resolve) => {
      dispatch({ type: actionType.PREVIOUS_DAYS_ERRANDS });
      resolve(true);
    });
}

export {
  getErrandsData,
  createErrand,
  updateErrand,
  showAddErrandDialog,
  hideAddErrandDialog,
  getNextDaysErrands,
  getPreviousDaysErrands,
  getErrand,
  deleteErrand,
};
