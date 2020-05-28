import { combineReducers } from "redux";

import errand from "./modules/errand/errandReducer";

const rootReducer = () =>
  combineReducers({
    errand,
  });

export default rootReducer;
