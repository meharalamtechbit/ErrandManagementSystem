import moment from "moment";
import _ from "lodash";
import actionType from "./actionType";
import { priority } from "../../../modules/errand/constants";

const dateFormat = "DD/MM/YYYY";

function getErrandWithCorrectDateValue(errand) {
  errand.created_date = moment(errand.created_date).toDate();

  return errand;
}

function getErrandsByDay(errandsData) {
  let today = moment().format(dateFormat);
  let tomorrow = moment().add(1, "days").format(dateFormat);

  var errands = _.chain(errandsData)
    .groupBy((errand) => moment(errand.created_date).format("ddd, MMM DD"))
    .map((errands, date) => {
      let createdDateMoment = moment(errands[0].created_date);
      let formattedDate = createdDateMoment.format(dateFormat);
      let day = getDay(formattedDate, today, tomorrow, createdDateMoment);
      let key = getKey(formattedDate, day, createdDateMoment);

      return { key, errands };
    })
    .value();

  extractPriorityInfo(errands);
  let previousDaysErrands = errands.filter((x) => x.key.created_date < today);
  let nextDaysErrands = errands.filter((x) => x.key.created_date >= today);

  let todayErrandsExist = nextDaysErrands.some(
    (x) => x.key.created_date === today
  );
  let tomorrowErrandsExist = nextDaysErrands.some(
    (x) => x.key.created_date === tomorrow
  );

  if (!todayErrandsExist) {
    let key = getKey(today, "Today", moment());
    nextDaysErrands.splice(0, 0, { key, errands: [] });
  }

  if (!tomorrowErrandsExist) {
    let key = getKey(tomorrow, "Tomorrow", moment().add(1, "days"));
    nextDaysErrands.splice(1, 0, { key, errands: [] });
  }

  return { previousDaysErrands, nextDaysErrands };
}

function extractPriorityInfo(errands) {
  for (let errand of errands) {
    for (let item of errand.errands) {
      item.priority = parseInt(item.priority);
      const { name, className } = getPriority(item);
      item.priorityName = name;
      item.priorityClass = className;
    }
  }
}

function getPriority(errand) {
  switch (errand.priority) {
    case priority.High:
      return { name: "High", className: "danger" };
    case priority.Normal:
      return { name: "Normal", className: "warning" };
    default:
      return { name: "Low", className: "success" };
  }
}

function getDay(currentDate, today, tomorrow, createdDateMoment) {
  return currentDate === today
    ? "Today"
    : currentDate === tomorrow
    ? "Tomorrow"
    : createdDateMoment.format("dddd");
}

function getKey(date, day, dateMoment) {
  let formattedDateHeading = dateMoment.format("ddd, MMM DD");
  return {
    date: formattedDateHeading,
    created_date: date,
    day,
    error: `No errands for ${day} ( ${formattedDateHeading} )`,
  };
}

const initialState = {
  allErrands: [],
  errands: [],
  nextDaysErrands: [],
  previousDaysErrands: [],
  errand: {},
  showDialog: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.ERRANDS_DATA:
      let { nextDaysErrands } = getErrandsByDay(action.data);
      return {
        ...state,
        allErrands: action.data,
        errands: nextDaysErrands,
      };
    case actionType.NEXT_DAYS_ERRANDS:
      let errands = getErrandsByDay(state.allErrands);
      return {
        ...state,
        errands: errands.nextDaysErrands,
      };
    case actionType.PREVIOUS_DAYS_ERRANDS:
      let { previousDaysErrands } = getErrandsByDay(state.allErrands);
      return {
        ...state,
        errands: previousDaysErrands,
      };
    case actionType.ERRAND_BY_ID:
      let errand = getErrandWithCorrectDateValue(action.data);
      return {
        ...state,
        errand,
      };
    case actionType.SHOW_DIALOG:
      return {
        ...state,
        showDialog: true,
      };
    case actionType.HIDE_DIALOG:
      return {
        ...state,
        showDialog: false,
        errand: {},
      };
    default:
      return state;
  }
};
