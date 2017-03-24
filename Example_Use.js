//Assuming you have included Curry.js, Aspect.js, Benchmark.js, Memoize.js, and SuperFunction.js

var funcName = 'newFunc';

var normalJ = (a,b,c)=>{
  var str = 'a'+'b'+'c';
  utils.repeat(10, function(){
    str+=str;
  });
  return str+Math.pow(a*b*c, 5);
}

var jMemo = F('M_JB', normalJ, {curry:false});
var jMemoNoJoint = F('M__B', normalJ, {joinpoint:false, curry:false});
var jNormal = F('___B', normalJ, {memoize:false, joinpoint:false, curry:false});
var jNormalJoint = F('__JB', normalJ, {memoize:false, curry:false});

var jMemoCurry = F('MCJB', normalJ);
var jMemoNoJointCurry = F('MC_B', normalJ, {joinpoint:false});
var jNormalCurry = F('_C_B', normalJ, {memoize:false, joinpoint:false});
var jNormalJointCurry = F('_CJB', normalJ, {memoize:false});


var utils = F.utils;
var times = 300000;

utils.forEach([jMemo,jMemoNoJoint,jNormal,jNormalJoint], function(func){
  utils.repeat(times, function(i) {
    func(2,3,4);
  });
});

utils.forEach([jMemoCurry,jMemoNoJointCurry,jNormalCurry,jNormalJointCurry], function(func){
  func0 = func(2,3);
  utils.repeat(times, function(i) {
    func0(4);
  });
});

console.log(benchmark.benchmark);


Aspect.before('MCJB', function(){
  console.log(arguments);
});

Aspect.end('MCJB', function(){
  console.log(arguments);
});

Aspect.after('MCJB', function(){
  console.log(arguments);
});

jMemoCurry(1)()(2)(3);