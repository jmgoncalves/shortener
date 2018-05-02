const API_PATH='/api'
const JSON_CONTENT_TYPE = 'application/json; charset=utf-8';

/** Class: API
 * API class
 *
 * TODO:
 *  - ?
 *
 * Parameters:
 *   (API) self - itself
 */
const API = {

  /**
   * Function: getBody
   * TODO
   *
   * Parameters:
   *   (Object) response -
   * Returns: TODO
   */
  getBody: function(response) {
    if(response.ok) {
      return response.json();
    }

    var error = new Error('Request to '+response.url+' returned '+response.status+' '+response.statusText);
    error.url = response.url;
    error.code = parseInt(response.status,10);
    error.text = response.statusText;
    throw error;
  },

  /**
   * Function: getLocation
   * TODO
   *
   * Parameters:
   *   (Object) response -
   * Returns: TODO
   */
  getLocation: function(response) {
    if(response.ok) {
      var location = response.headers.get('Location')
      return location;
    }

    var error = new Error('Request to '+response.url+' returned '+response.status+' '+response.statusText);
    error.url = response.url;
    error.code = parseInt(response.status,10);
    error.text = response.statusText;
    throw error;
  },

  /**
   * Function: getStatusCode
   * TODO
   *
   * Parameters:
   *   (Object) response -
   * Returns: TODO
   */
  getStatusCode: function(response) {
    if(response.ok) {
      return response.status;
    }

    if (response.status === 401 && API.authContext !== null)
      API.authContext.login();

    throw new Error('Request to '+response.url+' returned '+response.status+' '+response.statusText);
  },

  /**
   * Function: getAll
   * TODO
   *
   * Parameters:
   *   (Function) callback - success function
   * Returns: the ajax call object (for attaching error handling behaviour)
   */
  getAll: function(callback) {
    return fetch(API_PATH).then(API.getBody).then(callback);
  },

  /**
   * Function: getUrl
   * TODO
   *
   * Parameters:
   *   (Function) callback - success function
   * Returns: the ajax call object (for attaching error handling behaviour)
   */
  getUrl: function(key, callback) {
    return fetch(API_PATH+'/'+key).then(API.getBody).then(callback);
  },

  /**
   * Function: createUrl
   * Create a short url and get key from location header
   *
   * Parameters:
   *   (String) url - the url to shorten
   *   (Function) callback - success function
   * Returns: the ajax call object (for attaching error handling behaviour)
   */
  createUrl: function(url, callback) {
    return fetch(API_PATH, {
      'method': 'POST',
      'headers': {
        'Accept': JSON_CONTENT_TYPE,
        'Content-Type': JSON_CONTENT_TYPE
      },
      'body': JSON.stringify(url)
    }).then(API.getLocation).then(callback);
  }
}

export default API;
