import xmlNative from './xmlNative'
import apiManager from './apiManager'

const ajax = (url, method, data, successCB, errorCB) => {
    let dataJson = {
        "clientType": "web",
        "data": data
    };
    return xmlNative({
        method: method,
        url: url,
        data: dataJson,
        success: (data, status) => {
            if (data.code === 0) {
                successCB && successCB(data, status)
            } else {
                errorCB ? errorCB(data, status) : window.Toast.show(data.message)
            }
        },
        error: (data, status) => console.log(status, status)
    });
};
const apiRequest = {
    get: (apiName, data, successCB, errorCB) => ajax(apiManager[apiName], "get", data,
        data => successCB && successCB(data.data, data.systemDate),
        errorCB),
    post: (apiName, data, successCB, errorCB) => ajax(apiManager[apiName], "post", data,
        data => successCB && successCB(data.data, data.systemDate),
        errorCB)
};
export default apiRequest;