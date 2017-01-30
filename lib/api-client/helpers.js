exports.createSimpleGetQueryFunction = function(urlSuffix) {
  return function(params, done) {
    var url = this.path + urlSuffix;

    if (typeof params === 'function') {
      done = params;
      params = {};
    }

    return this.http.get(url, {
      data: params,
      done: done
    });
  };
};
