const xhr = {};



/**
 * Creates a get request based on passed 
 * url, callBackSuccess, callBackError, data
 * 
 * @param {string} url 
 * @param {function} callBackSuccess 
 * @param {function} callBackError 
 * @param {object} data 
 * @param {boolean} async 
 */
xhr.get = (url, callBackSuccess, callBackError, data = {}, async) => {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    xhr.send(url + (query.length ? '?' + query.join('&') : ''), callBackSuccess, callBackError, 'GET', null, async)
};


/**
 * Send the request to the passed url server and executes t 
 * he passed callback function based on successful respose or error
 * 
 * @param {string} url 
 * @param {function} callBackSuccess 
 * @param {function} callBackError 
 * @param {string} method 
 * @param {Object} data 
 * @param {boolean} async 
 */
xhr.send = (url, callBackSuccess, callBackError, method, data, async = true) => {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open(method, url, async);
    xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState === XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            if (xmlHttpRequest.status == 200) {
                callBackSuccess(xmlHttpRequest.responseText)
            } else {
                callBackError();

                //TODO: if need it needs to be handled in application level
                console.log('Error wille making a xhr request.');
            }
        }
    };
    if (method == 'POST') {
        xmlHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    xmlHttpRequest.send(data)
};


export default xhr;