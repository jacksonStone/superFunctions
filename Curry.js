
Curry = (function(){
  var isFunction = function(obj){ return obj === "function" },
  toList = function(args) { return Array.prototype.slice.call(args); }  
  c = {	
		/**
		 * Waits for all arguments before executing.
		 * If you do not hand all arguments, will not execute function,
		 * But will return a function that will wait for remaining functions
		 * ex:
		 *
		 * curry(func)('a')('b') == curry(func, 'a')('b') == curry(func, 'a', 'b')
		 *
		 * @param arg1: is either the parity of the function, or just a function for short
     * This is useful for functions that take variable arguments, or in a code base
     * where the number of arguments in a function may be suspect.
		 * @param arg2: is either a function to be passed to the curried function or the function (see arg1)
		 * @returns {*}
		 */
		curry:function(arg1, arg2){
			return (isFunction(arg1) ?
				c.curryBase.call(this, arg1, true, arguments, arg1.length) :
				c.curryBase.call(this, arg2, true, arguments, arg1));
		},
		/**
		 * Waits for all arguments before executing.
		 * But instead of adding arguments left to right, it adds from right to left.
		 * say func = function(a,b){return a - b};
		 * curryR(func)(2)(1) === -1
     * arguments work the same as with the curry function above.
		 */
		curryR:function(arg1, arg2){
			return (isFunction(arg1) ? 
				c.curryBase.call(this, arg1, false, arguments, arg1.length) :
				c.curryBase.call(this, arg2, false, arguments, arg1));
		},
		curryBase:function(func, leftToRight, args, pairity) {
			var self = this,
				params = toList(args).slice(2);
			if(params.length < pairity) {
				params.unshift(pairity, func);
				return function(){
					var args = toList(arguments);
					return c[leftToRight ? 'curry': 'curryR'].apply(self, params.concat(args));
				};
			}
			return func.apply(self, (leftToRight ? params : params.reverse()));
		},
    /**
		 * Same as Curry, but retains a reference to the object passed in to the argument,
		 * And uses it as "this" for the function
		 * @param obj
		 * @param ...
		 * @returns {*}
		 */
		curryThis:function(obj){
			var params = toList(arguments).slice(1);
			return c.curry.apply(obj, params);
		},
		curryRThis:function(obj){
			var params = toList(arguments).slice(1);
			return c.curryR.apply(obj, params);
		},
  }
  return c;
}())