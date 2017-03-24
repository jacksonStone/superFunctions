var Benchmark = (function(){
  var benchmark = {
    benchmark: function(name, func) {
      return function(){
        var t = timer(name);
        var result = func.apply(this, arguments);
        t.stop();
        return result;
      }
    }
  };
  var results = benchmark.results = {};
  var timer = function(name) {
    var start = new Date();
    return {
        stop: function() {
            var end  = new Date();
            var time = end.getTime() - start.getTime();
            if(results[name]) results[name] = results[name] + time;
            else {
              results[name] = time;
            }
        }
    }
  };
  
  
  return benchmark;

}());