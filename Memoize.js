var Memo = (function(){
  var memoize = {
    memoize: function(func, self) {
      var memoFunc = function(){
        var memoKey = JSON.stringify(arguments);
        if(memoFunc.hasOwnProperty(memoKey)) {
          return memoFunc[memoKey];
        } else {
          var result = func.apply(self, arguments);
          memoFunc[memoKey] = result;
          return result;
        }
      };
      return memoFunc;
  }};
  return memoize;
}());