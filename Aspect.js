var Aspect = (function(){
  
  var BEFORE = 'before',
  END = 'end',  
  AFTER = 'after',
  TIMES = [BEFORE, AFTER, END];
  
 var aspects = A = {
    joinpoint:function(name, f, length) {
      return function(){
        var result,
        nameAndArgs = name+':'+length,
        self = this,
        args = arguments;
        
        A.callBefore(name, nameAndArgs, self, args);

        result = f.apply(self, args);
        
        A.callEnd(name, nameAndArgs, self, [result, args]);
        
        setTimeout(()=>{A.callAfter(name, nameAndArgs, self, [result, args])},1);
        
        return result;
      }
    }
  };
  
  for(var i in TIMES) {
    var time = TIMES[i];
    (function(time) {
      A[time] = function(match, func) {
        return addListener(time, match, func);
      };
      A['call'+time[0].toUpperCase()+time.substring(1)] = function(short, long, self, args) {
        callLongAndShort(time, short, long, self, args);
      };
    }(time));
  }
  
  var addListener = A.addHook = function(keyword, match, f) {
    var fullMatch = keyword+':'+match;
    var cur = listeners[fullMatch];
    if(cur) cur.push(f);
    else {
      listeners[fullMatch] = [f];
    }
    return listeners[fullMatch].length - 1;
  };
  
  var callLongAndShort = function(keyword, short, long, self, args) {
    var types = ['*',long, short], type, func, fullName;
    for(var i in types) {
      type = types[i];
      fullName = keyword+':'+type;
      funcs = listeners[fullName];
      if(!funcs) continue;
      for (var j in funcs) {
        func = funcs[j];
        func.apply(self, F.utils.toList(args));
      }
    }
  };

  var listeners = A.listeners = {};
  
  return A;

}());