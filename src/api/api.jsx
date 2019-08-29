import axios from 'axios';
// Root api
import { ROOT_API } from "../config/config";

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token') || undefined,
  }
};

const POST = (url, params) => {
  return axios.post(`${ROOT_API}/apis/${url}`, params, config);
};
const PUT = (url, params) => {
  return axios.put(`${ROOT_API}/apis/${url}`, params, config);
};
const GET = (url, params) => {
  return axios.get(`${ROOT_API}/apis/${url}?${dictToURI(params)}`, config);
};

const dictToURI = (dict) => {
  var str = [];
  for(var p in dict){
     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(dict[p]));
  }
  return str.join("&");
};

export default {
  POST,
  GET,
  PUT,
};