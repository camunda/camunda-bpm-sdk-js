!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.CamSDK=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var Emitter = _dereq_('emitter');
var reduce = _dereq_('reduce');

/**
 * Root reference for iframes.
 */

var root = 'undefined' == typeof window
  ? this
  : window;

/**
 * Noop.
 */

function noop(){};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Determine XHR.
 */

function getXHR() {
  if (root.XMLHttpRequest
    && ('file:' != root.location.protocol || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
}

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(obj[key]));
    }
  }
  return pairs.join('&');
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  this.text = this.xhr.responseText;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  return parse
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  var type = status / 100 | 0;

  // status / class
  this.status = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status || 1223 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  Emitter.call(this);
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {};
  this._header = {};
  this.on('end', function(){
    var res = new Response(self);
    if ('HEAD' == method) res.text = null;
    self.callback(null, res);
  });
}

/**
 * Mixin `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Allow for extension
 */

Request.prototype.use = function(fn) {
  fn(this);
  return this;
}

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.timeout = function(ms){
  this._timeout = ms;
  return this;
};

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.clearTimeout = function(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set header `field` to `val`, or multiple fields with one object.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Get case-insensitive header `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api private
 */

Request.prototype.getHeader = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass){
  var str = btoa(user + ':' + pass);
  this.set('Authorization', 'Basic ' + str);
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.field = function(name, val){
  if (!this._formData) this._formData = new FormData();
  this._formData.append(name, val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  if (!this._formData) this._formData = new FormData();
  this._formData.append(field, file, filename);
  return this;
};

/**
 * Send `data`, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // querystring
 *       request.get('/search')
 *         .end(callback)
 *
 *       // multiple data "writes"
 *       request.get('/search')
 *         .send({ search: 'query' })
 *         .send({ range: '1..5' })
 *         .send({ order: 'desc' })
 *         .end(callback)
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"})
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this.getHeader('Content-Type');

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this.getHeader('Content-Type');
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  if (2 == fn.length) return fn(err, res);
  if (err) return this.emit('error', err);
  fn(res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
  err.crossDomain = true;
  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;
    if (0 == xhr.status) {
      if (self.aborted) return self.timeoutError();
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  if (xhr.upload) {
    xhr.upload.onprogress = function(e){
      e.percent = e.loaded / e.total * 100;
      self.emit('progress', e);
    };
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  xhr.open(this.method, this.url, true);

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var serialize = request.serialize[this.getHeader('Content-Type')];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  // send stuff
  this.emit('request', this);
  xhr.send(data);
  return this;
};

/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(method, url) {
  // callback
  if ('function' == typeof url) {
    return new Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new Request('GET', method);
  }

  return new Request(method, url);
}

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.del = function(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * Expose `request`.
 */

module.exports = request;

},{"emitter":2,"reduce":3}],2:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],3:[function(_dereq_,module,exports){

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};
},{}],4:[function(_dereq_,module,exports){
'use strict';

/**
 * Events handling utility who can be used on
 * any kind of object to provide `on`, `once`, `off`
 * and `trigger` functions.
 *
 * @exports CamSDK.Events
 *
 * @example
 * var obj = {};
 * Events.attach(obj);
 *
 * obj.on('event:name', function() {});
 * obj.once('event:name', function() {});
 * obj.trigger('event:name', data, moreData, evenMoreData);
 */

var Events = {};


/**
 * Converts an object into array
 * @param  {*} obj  ...
 * @return {Array}  ...
 */
function toArray(obj) {
  var a, arr = [];
  for (a in obj) {
    arr.push(obj[a]);
  }
  return arr;
}

/**
 * Returns a function that will be executed
 * at most one time, no matter how often you call it.
 * @param  {Function} func ...
 * @return {Function}      ...
 */
function once(func) {
  var ran = false, memo;
  return function() {
    if (ran) return memo;
    ran = true;
    memo = func.apply(this, arguments);
    func = null;
    return memo;
  };
}


/**
 * Ensure an object to have the needed _events property
 * @param  {*} obj        ...
 * @param  {String} name  ...
 */
function ensureEvents(obj, name) {
  obj._events = obj._events || {};
  obj._events[name] = obj._events[name] || [];
}


/**
 * Add the relevant Events methods to an object
 * @param  {*} obj  ...
 */
Events.attach = function(obj) {
  obj.on      = this.on;
  obj.once    = this.once;
  obj.off     = this.off;
  obj.trigger = this.trigger;
  obj._events = {};
};


/**
 * Bind a callback to `eventName`
 * @param  {String}   eventName ...
 * @param  {Function} callback  ...
 */
Events.on = function(eventName, callback) {
  ensureEvents(this, eventName);

  this._events[eventName].push(callback);

  return this;
};


/**
 * Bind a callback who will only be called once to `eventName`
 * @param  {String}   eventName ...
 * @param  {Function} callback  ...
 */
Events.once = function(eventName, callback) {
  var self = this;
  var cb = once(function() {
    self.off(eventName, once);
    callback.apply(this, arguments);
  });
  cb._callback = callback;
  return this.on(eventName, cb);
};


/**
 * Unbind one or all callbacks originally bound to `eventName`
 * @param  {String}   eventName ...
 * @param  {Function} [callback]  ...
 */
Events.off = function(eventName, callback) {
  ensureEvents(this, eventName);

  if (!callback) {
    delete this._events[eventName];
    return this;
  }

  var e, ev, arr = [];
  for (e in this._events[eventName]) {
    if (this._events[eventName][e] !== callback) {
      arr.push(this._events[eventName][e]);
    }
  }
  this._events[eventName] = arr;

  return this;
};


/**
 * Call the functions bound to `eventName`
 * @param  {String} eventName ...
 * @param {...*} [params]     ...
 */
Events.trigger = function() {
  var args = toArray(arguments);
  var eventName = args.shift();
  ensureEvents(this, eventName);

  var e, ev;
  for (e in this._events[eventName]) {
    this._events[eventName][e](this, args);
  }

  return this;
};


module.exports = Events;

},{}],5:[function(_dereq_,module,exports){
'use strict';

var HttpClient = _dereq_('./http-client');


/**
 * Abstract class for resources
 * @exports CamSDK.GenericResource
 * @constructor
 *
 * @example
 *
 * // create a resource Model
 * var Model = GenericResource.extend({
 *   appUri: 'path-to-the-endpoint'
 *   doSomethingOnInstance: function() {
 *     // ...
 *   }
 * }, {
 *   somethingStatic: {}
 * });
 *
 * // use the generated Model statically
 * // with events
 * Model.on('eventname', function(results) {
 *   // You probably have something like
 *   var total = results.count;
 *   var instances = results.items;
 * });
 * Model.list({ nameLike: '%call%' });
 *
 * // or alternatively by using a callback
 * Model.list({ nameLike: '%call%' }, function(err, results) {
 *   if (err) {
 *     throw err;
 *   }
 *
 *   var total = results.count;
 *   var instances = results.items;
 * });
 *
 * var instance = new Model();
 * instance.claim(function(err, result) {
 *
 * });
 */
function GenericResource() {
  this.initialize();
}




/**
 * Creates a new Resource Class, very much inspired from Backbone.Model.extend.
 * [Backbone helpers]{@link http://backbonejs.org/docs/backbone.html}
 * @param  {?Object.<String, *>} protoProps   ...
 * @param  {Object.<String, *>} [staticProps] ...
 * @return {CamSDK.GenericResource}           ...
 */
GenericResource.extend = function(protoProps, staticProps) {
  protoProps = protoProps || {};
  staticProps = staticProps || {};

  var parent = this;
  var child, Surrogate, s, i;

  if (protoProps && Object.hasOwnProperty.call(parent, 'constructor')) {
    child = protoProps.constructor;
  }
  else {
    child = function(){ return parent.apply(this, arguments); };
  }

  for (s in parent) {
    child[s] = parent[s];
  }
  for (s in staticProps) {
    child[s] = staticProps[s];
  }

  Surrogate = function(){ this.constructor = child; };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate();

  for (i in protoProps) {
    child.prototype[i] = protoProps[i];
  }

  return child;
};




/**
 * Path used by the resource to perform HTTP queries
 * @abstract
 *
 * @type {String}
 */
GenericResource.path = '';



/**
 * Initializes a GenericResource instance
 *
 * This method is aimed to be overriden by other implementations
 * of the GenericResource.
 * @abstract
 */
GenericResource.prototype.initialize = function() {
  // do something to initialize the instance
  // like copying the Model http property to the "this" (instanciated)
  this.http = this.constructor.http;
};


/**
 * Object hosting the methods for HTTP queries.
 * @abstract
 *
 * @type {HttpClient}
 */
GenericResource.http = {};



/**
 * Create an instance on the backend
 * @abstract
 *
 * @param  {!Object|Object[]}  attributes        ...
 * @param  {requestCallback} [done]              ...
 */
GenericResource.create = function(attributes, done) {};



/**
 * Fetch a list of instances
 * @abstract
 *
 * @param  {?Object.<String, String>}     where ...
 * @param  {requestCallback} [done]  ...
 */
GenericResource.list = function(where, done) {
  where = where || {};
  this.http.get(where, {
    done: done
  });
};



/**
 * Update one or more instances
 * @abstract
 *
 * @param  {!String|String[]}     ids           ...
 * @param  {Object.<String, *>}   attributes    ...
 * @param  {requestCallback} [done]   ...
 */
GenericResource.update = function(ids, attributes, done) {};



/**
 * Delete one or more instances
 * @abstract
 *
 * @param  {!String|String[]}  ids   ...
 * @param  {requestCallback} [done]   ...
 */
GenericResource.delete = function(ids, done) {};



/**
 * Update one or more instances.
 * @abstract
 *
 * @param  {Object}   attributes    ...
 * @param  {requestCallback} [done]  ...
 */
GenericResource.prototype.update = function(attributes, done) {};



/**
 * Delete one or more instances
 * @abstract
 *
 * @param  {requestCallback} [done] ...
 */
GenericResource.prototype.delete = function(done) {};



module.exports = GenericResource;

},{"./http-client":6}],6:[function(_dereq_,module,exports){
'use strict';

var request = _dereq_('superagent');
var Events = _dereq_('./events');


/**
 * HttpClient
 * @exports CamSDK.HttpClient
 * @class
 * @classdesc A HTTP request abstraction layer to be used in node.js / browsers environments.
 */
var HttpClient = function(config) {
  config = config || {};

  if (!config.baseUrl) {
    throw new Error('HttpClient needs a `baseUrl` configuration property.');
  }

  Events.attach(this);

  this.config = config;
};


/**
 * Performs a POST HTTP request
 */
HttpClient.prototype.post = function(data, options) {
  data = data || {};
  options = options || {};

  var url = this.config.baseUrl + (options.path ? '/'+ options.path : '');
  var req = request
    .post(url);
  req.send(data);
  req.end(options.done);
};



/**
 * Performs a GET HTTP request
 */
HttpClient.prototype.get = function(path, options) {
  options = options || {};
  var done = options.done || function() {};

  var url = this.config.baseUrl + (path ? '/'+ path : '');
  var req = request
    .get(url)
    .query(options.data || {});

  req.end(function(err, response) {
    if (err || !response.ok) {
      return done(err || new Error('The request on '+ url +' failed'));
    }

    console.info('response for '+ url, !!err, response);
    // if () {

    // }

    done.apply(this, null, response);
  });
};



/**
 * Performs a PUT HTTP request
 */
HttpClient.prototype.put = function(data, options) {
  data = data || {};
  options = options || {};
};



/**
 * Performs a DELETE HTTP request
 */
HttpClient.prototype.del = function(data, options) {
  var instance = this.instance;
  data = data || {};
  options = options || {};
};

module.exports = HttpClient;

},{"./events":4,"superagent":1}],7:[function(_dereq_,module,exports){
'use strict';

var HttpClient = _dereq_('./http-client');

/**
 * @namespace CamSDK
 */

/**
 * Entry point of the module
 * @exports Cam
 * @constructor
 *
 * @param  {Object} config        used to provide necessary configuration
 * @param  {String} [config.engine=default] ...
 * @param  {String} config.appUri ...
 *
 * @return {Object}               ...
 */
function Cam(config) {
  if (!config) {
    throw new Error('Needs configuration');
  }

  if (!config.appUri) {
    throw new Error('A appUri is required');
  }

  // http://localhost:8080/camunda/api/engine/engine/default/process-definition/statistics?incidents=true
  config.hostname = config.hostname || false;

  config.engine = config.engine || 'default';

  this.baseUrl = '';
  if (config.hostname) {
    this.baseUrl = config.protocol +'://';
    this.baseUrl += config.hostname;

    if ((''+ config.port) !== '80' && config.port) {
      this.baseUrl += ':'+ config.port;
    }
  }

  this.baseUrl += '/'+ config.appUri;
  this.baseUrl += '/'+ config.engine;

  this.config = config;

  this.initialize();
}


// provide an isolated scope
(function(proto){
  /**
   * configuration storage
   * @memberOf Cam.prototype
   * @name  config
   * @type {Object}
   */
  proto.config = {};

  var _resources = {};

  /**
   * Prepare the instance
   * @memberOf Cam.prototype
   * @name  initialize
   */
  proto.initialize = function() {
    var name;

    /* jshint sub: true */
    _resources['process-definition']  = _dereq_('./resources/process-definition');
    _resources['process-instance']    = _dereq_('./resources/process-instance');
    _resources['task']                = _dereq_('./resources/task');
    _resources['variable']            = _dereq_('./resources/variable');
    /* jshint sub: false */

    for (name in _resources) {
      _resources[name].http = new HttpClient({
        baseUrl: this.baseUrl +'/'+ _resources[name].path
      });
    }
  };

  /**
   * Allows to get a resource from SDK by its name
   * @memberOf Cam.prototype
   * @name resource
   *
   * @param  {String} name [description]
   * @return {CamSDK.GenericResource}      [description]
   */
  proto.resource = function(name) {
    return _resources[name];
  };
}(Cam.prototype));


module.exports = Cam;


/**
 * This callback is displayed as part of the Requester class.
 * @callback requestCallback
 * @param {?Object} error
 * @param {CamSDK.GenericResource|CamSDK.GenericResource[]} [results]
 */


/**
 * Function who does not perform anything
 * @callback noopCallback
 */

},{"./http-client":6,"./resources/process-definition":8,"./resources/process-instance":9,"./resources/task":10,"./resources/variable":11}],8:[function(_dereq_,module,exports){
'use strict';

var GenericResource = _dereq_("./../generic-resource");

/**
 * No-Op callback
 */
function noop() {}

/**
 * Process Definition Resource
 * @class
 * @classdesc A process definition resource
 * @augments CamSDK.GenericResource
 * @exports CamSDK.ProcessDefinition
 * @constructor
 */
var ProcessDefinition = GenericResource.extend();


/**
 * API path for the process definition resource
 * @type {String}
 */
ProcessDefinition.path = 'process-definition';

/**
 * Get a list of process definitions
 * @param  {Object} [params]                      Query parameters as follow
 * @param  {String} [params.name]                 Filter by name.
 * @param  {String} [params.nameLike]             Filter by names that the parameter is a substring of.
 * @param  {String} [params.deploymentId]         Filter by the deployment the id belongs to.
 * @param  {String} [params.key]                  Filter by key, i.e. the id in the BPMN 2.0 XML. Exact match.
 * @param  {String} [params.keyLike]              Filter by keys that the parameter is a substring of.
 * @param  {String} [params.category]             Filter by category. Exact match.
 * @param  {String} [params.categoryLike]         Filter by categories that the parameter is a substring of.
 * @param  {String} [params.ver]                  Filter by version.
 * @param  {String} [params.latest]               Only include those process definitions that are latest versions.
 *                                                Values may be "true" or "false".
 * @param  {String} [params.resourceName]         Filter by the name of the process definition resource. Exact match.
 * @param  {String} [params.resourceNameLike]     Filter by names of those process definition resources that the parameter is a substring of.
 * @param  {String} [params.startableBy]          Filter by a user name who is allowed to start the process.
 * @param  {String} [params.active]               Only include active process definitions.
 *                                                Values may be "true" or "false".
 * @param  {String} [params.suspended]            Only include suspended process definitions.
 *                                                Values may be "true" or "false".
 * @param  {String} [params.incidentId]           Filter by the incident id.
 * @param  {String} [params.incidentType]         Filter by the incident type.
 * @param  {String} [params.incidentMessage]      Filter by the incident message. Exact match.
 * @param  {String} [params.incidentMessageLike]  Filter by the incident message that the parameter is a substring of.
 *
 * @param  {String} [params.sortBy]               Sort the results lexicographically by a given criterion.
 *                                                Valid values are category, "key", "id", "name", "version" and "deploymentId".
 *                                                Must be used in conjunction with the "sortOrder" parameter.
 *
 * @param  {String} [params.sortOrder]            Sort the results in a given order.
 *                                                Values may be asc for ascending "order" or "desc" for descending order.
 *                                                Must be used in conjunction with the sortBy parameter.
 *
 * @param  {Integer} [params.firstResult]         Pagination of results. Specifies the index of the first result to return.
 * @param  {Integer} [params.maxResults]          Pagination of results. Specifies the maximum number of results to return.
 *                                                Will return less results, if there are no more results left.

 * @param  {requestCallback} [done]       ...
 *
 * @example
 * CamSDK.resource('process-definition').list({
 *   nameLike: 'Process'
 * }, function(err, results) {
 *   // ...
 * });
 */
ProcessDefinition.list = function(params, done) {
  // allows to pass only a callback
  if (typeof params === 'function') {
    done = params;
    params = {};
  }
  params = params || {};
  done = done || noop;

  var likeExp = /Like$/;
  var self = this;
  var results = {
    count: 0,
    items: []
  };

  var where = {};
  var name, value;
  for (name in params) {
    value = params[name];

    if (likeExp.test(name)) {
      value = '%'+ value +'%';
    }

    where[name] = value;
  }

  console.info('where', where);

  // until a new webservice is made available,
  // we need to perform 2 requests
  return this.http.get(this.path +'/count', {
    data: where,
    done: function(err, countRes) {
      console.info('count response', err, countRes.body);
      if (err) {
        return done(err);
      }

      results.count = countRes.body.count;

      self.http.get(self.path, {
        data: where,
        done: function(err, itemsRes) {
          console.info('items response', err, itemsRes.body);
          if (err) {
            return done(err);
          }

          results.items = itemsRes.body;

          done(err, results);
        }
      });
    }
  });
};



/**
 * Suspends the process definition instance
 * @param  {Object.<String, *>} [params] ...
 * @param  {requestCallback}    [done]   ...
 */
ProcessDefinition.prototype.suspend = function(params, done) {
  // allows to pass only a callback
  if (typeof params === 'function') {
    done = params;
    params = {};
  }
  params = params || {};
  done = done || noop;

  return this.http.post(this.path, {
    done: done
  });
};



/**
 * Suspends one or more process definitions
 * @param  {String|String[]}    ids      ...
 * @param  {Object.<String, *>} [params] ...
 * @param  {requestCallback}    [done]   ...
 */
ProcessDefinition.suspend = function(ids, params, done) {
  // allows to pass only a callback
  if (typeof params === 'function') {
    done = params;
    params = {};
  }
  params = params || {};
  done = done || noop;
  // allows to pass a single ID
  ids = Array.isArray(ids) ? ids : [ids];

  return this.http.post(this.path, {
    done: done
  });
};

/**
 * Retrieves the statistics of a process definition.
 * @param  {Function} [done]  ...
 */
ProcessDefinition.prototype.stats = function(done) {
  return this.http.post(this.path, {
    done: done || noop
  });
};

/**
 * Retrieves the BPMN 2.0 XML document of a process definition.
 * @param  {Function} [done]  ...
 */
ProcessDefinition.prototype.xml = function(done) {
  return this.http.post(this.path, {
    done: done || noop
  });
};

/**
 * Retrieves the form of a process definition.
 * @param  {Function} [done]  ...
 */
ProcessDefinition.prototype.form = function(done) {
  return this.http.post(this.path, {
    done: done || noop
  });
};

/**
 * Submits the form of a process definition.
 * @param  {Object} [data]    ...
 * @param  {Function} [done]  ...
 */
ProcessDefinition.prototype.submit = function(data, done) {
  return this.http.post(this.path, {
    data: {},
    done: done
  });
};

/**
 * Starts a process instance from a process definition.
 * @param  {Object} [varname]  ...
 * @param  {Function} [done]   ...
 */
ProcessDefinition.prototype.start = function(done) {
  return this.http.post(this.path, {
    data: {},
    done: done
  });
};


module.exports = ProcessDefinition;


},{"./../generic-resource":5}],9:[function(_dereq_,module,exports){
'use strict';

var GenericResource = _dereq_("./../generic-resource");




/**
 * Process Instance Resource
 * @class
 * @classdesc A process instance resource
 * @augments CamSDK.GenericResource
 * @exports CamSDK.ProcessInstance
 * @constructor
 */
var ProcessInstance = GenericResource.extend();


/**
 * API path for the process instance resource
 * @type {String}
 */
ProcessInstance.path = 'process-instance';



/**
 * Creates a process instance from a process definition
 * @param  {Object}   params                        [description]
 * @param  {String}   [params.id]                   [description]
 * @param  {String}   [params.key]                  [description]
 * @param  {Object.<String, *>} [params.variables]  [description]
 * @param  {requestCallback} [done]                 [description]
 */
ProcessInstance.create = function(params, done) {
  return this.http.post(params, done);
};



/**
 * Get a list of process instances
 * @param  {Object}   params   [description]
 * @param  {requestCallback} [done] [description]
 */
ProcessInstance.list = function(params, done) {
  return this.http.get("/", params, done);
};


module.exports = ProcessInstance;


},{"./../generic-resource":5}],10:[function(_dereq_,module,exports){
'use strict';

var GenericResource = _dereq_("./../generic-resource");



/**
 * Task Resource
 * @class
 * @classdesc A Task resource
 * @augments CamSDK.GenericResource
 * @exports CamSDK.Task
 * @constructor
 */
var Task = GenericResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
Task.path = 'task';


/**
 * Assign the task instance to a user
 *
 * @param {String} id [description]
 * @param {requestCallback} [done]
 */
Task.prototype.assign = function(id, done) {};


/**
 * Delegate the task instance to a user
 *
 * @param {String} id [description]
 * @param {requestCallback} [done]
 */
Task.prototype.delegate = function(done) {};


/**
 * Allow a user to claim (assign to hisself) a task instance
 *
 * @param {requestCallback} [done]
 */
Task.prototype.claim = function(done) {};


/**
 * Allow a user to unclaim (unassign to hisself) a task instance
 *
 * @param {requestCallback} [done]
 */
Task.prototype.unclaim = function(done) {};


/**
 * Set a task instance as resolved
 *
 * @param {requestCallback} [done]
 */
Task.prototype.resolve = function(done) {};


/**
 * Set a task instance as completed
 *
 * @param {requestCallback} [done]
 */
Task.prototype.complete = function(done) {};



module.exports = Task;


},{"./../generic-resource":5}],11:[function(_dereq_,module,exports){
'use strict';

var GenericResource = _dereq_("./../generic-resource");



/**
 * Variable Resource
 * @class
 * @classdesc A variable resource
 * @augments CamSDK.GenericResource
 * @exports CamSDK.Variable
 * @constructor
 */
var Variable = GenericResource.extend();

module.exports = Variable;


},{"./../generic-resource":5}]},{},[7])
(7)
});