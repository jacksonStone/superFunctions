var F = (function(){
  
  curry = Curry && Curry.curry,
  memoize = Memo && Memo.memoize,
  joinpoint = Aspect &&  Aspect.joinpoint,
  benchmark = Benchmark && Benchmark.benchmark;
  
  var F = function(f1, f2, f3) {
    var len, name, long, f, options, settings = {};
    //Initialize arguments
    if(F.utils.isFunction(f1)) {
      len = f1.length;
      name = f1.name;
      f = f1;
      options = f2 || {};
    } else {
      len = f2.length;
      name = f1;
      f = f2;
      options = f3 || {};
    }
    
    utils.extend(settings, F.defaults, options);
    var superFunc = f;
  
    if(settings.memoize && memoize) {
      superFunc = memoize(superFunc)
    }
    
    if(settings.joinpoint && joinpoint) {
      superFunc = joinpoint(name, superFunc, len);
    }
    
    if(settings.benchmark && benchmark) {
      superFunc = benchmark(name, superFunc);
    }
  
    if(settings.curry && curry) {
      superFunc = curry(len, superFunc);
    }
  
    return superFunc;
  };
  
  F.defaults = {
    curry:true,
    memoize:true,
    joinpoint:true,
    benchmark:true,
  };
  
  var utils = F.utils = {
    toList:function(args) { return Array.prototype.slice.call(args); },
    isFunction:function(func) {
      return (typeof func === "function")
    },
    extend:function(){
      var objs = utils.toList(arguments),
        newObj = objs.shift();
      utils.forEach(objs, function(obj){
        utils.forEach(obj, function(v,i) {
          newObj[i] = v;
        })
      });
      return newObj;
    },
    forEach:function(list, func) {
      if(Array.isArray(list)) {
        for(var i = 0; i < list.length; i++) {
          func(list[i],i);
        }
        return;
      }
      //Otherwise is an object
      var props = Object.getOwnPropertyNames(list);
      utils.forEach(props, function(prop){
        func(list[prop], prop);
      });
    },
    repeat:function(times, func) {
      for(var i = 0; i < times; i++) {
        func(i);
      }
    }
  }
  
  return F;
}());



