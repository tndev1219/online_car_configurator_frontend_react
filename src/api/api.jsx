import axios from 'axios';

const config = {
   headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token') || undefined,
   }
};

const POST = (url, params) => {
   return axios.post(`apis/${url}`, params, config);
};
const PUT = (url, params) => {
   return axios.put(`apis/${url}`, params, config);
};
const GET = (url, params) => {
   return axios.get(`apis/${url}?${dictToURI(params)}`, config);
};

const dictToURI = (dict) => {
   var str = [];
   for (var p in dict) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(dict[p]));
   }
   return str.join("&");
};

export default {
   POST,
   GET,
   PUT,
};