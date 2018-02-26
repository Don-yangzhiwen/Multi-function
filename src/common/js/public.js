import axios from 'axios';

const request = (bh, obj, success, error) => {
  const url = 'http://route.showapi.com/' + bh;
  const params = {
    showapi_appid: 36610,
    showapi_sign: 'f05f78810a8443fb8e007a267523e30c'
  };
  axios.post(url, Object.assign(params, obj), {
    transformRequest: data => {
      let req = [];
      for (var o in data) {
        req.push(o + '=' + data[o]);
      }
      return req.join('&');
    }
  }).then((successCB) => {
    var data = successCB.data;
    if (data.showapi_res_code === 0 && data.showapi_res_body !== ' ') {
      return success ? success(data.showapi_res_body) : ''
    } else {
      return error ? error({
        code: data.showapi_res_code,
        error: data.showapi_res_error
      }) : ''
    }
  }).catch(function (response) {
    return error ? error(response) : ''
  })
}
export default {
  request
};
