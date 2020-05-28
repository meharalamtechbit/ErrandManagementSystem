import axios from "axios";

let baseUrl = "http://127.0.0.1:8000/api";

class errandService {
  static getErrands() {
    return axios.get(`${baseUrl}/errands/`).then((response) => response);
  }

  static getErrand(id) {
    return axios
      .get(`${baseUrl}/errands-details/${id}`)
      .then((response) => response);
  }

  static deleteErrand(id) {
    return axios
      .delete(`${baseUrl}/errands-details/${id}`)
      .then((response) => response);
  }

  static createErrand(errand) {
    return axios
      .post(`${baseUrl}/errands/`, errand)
      .then((response) => response);
  }

  static updateErrand(errand) {
    return axios
      .put(`${baseUrl}/errands-details/${errand.id}`, errand)
      .then((response) => response);
  }
}

// class errandService {
//   static getErrands() {
//     return axios
//       .get("http://127.0.0.1:8000/api/errands/")
//       .then((response) => response);
//   }

//   static getErrand(id) {
//     return axios
//       .get("http://127.0.0.1:8000/api/errands-details/" + id)
//       .then((response) => response);
//   }

//   static deleteErrand(id) {
//     return axios
//       .delete("http://127.0.0.1:8000/api/errands-details/" + id)
//       .then((response) => response);
//   }

//   static createErrand(errand) {
//     return axios
//       .post("http://127.0.0.1:8000/api/errands/", errand)
//       .then((response) => response);
//   }

//   static updateErrand(errand) {
//     return axios
//       .put("http://127.0.0.1:8000/api/errands-details/" + errand.id, errand)
//       .then((response) => response);
//   }
// }

export default errandService;
