var debug = 1;
/* jQuery v1.10.2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery.min.map
*/

/*!
 * jQuery JavaScript Library v2.1.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android < 4.0, iOS < 6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	// Support: Windows Web Apps (WWA)
	// `name` and `type` need .setAttribute for WWA
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE9-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') in IE9, see #12537
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {
				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {
				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));




var retVal = '';
(function(e,t){var n,r,i=typeof t,o=e.location,a=e.document,s=a.documentElement,l=e.jQuery,u=e.$,c={},p=[],f="1.10.2",d=p.concat,h=p.push,g=p.slice,m=p.indexOf,y=c.toString,v=c.hasOwnProperty,b=f.trim,x=function(e,t){return new x.fn.init(e,t,r)},w=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=/\S+/g,C=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,k=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,E=/^[\],:{}\s]*$/,S=/(?:^|:|,)(?:\s*\[)+/g,A=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,j=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,D=/^-ms-/,L=/-([\da-z])/gi,H=function(e,t){return t.toUpperCase()},q=function(e){(a.addEventListener||"load"===e.type||"complete"===a.readyState)&&(_(),x.ready())},_=function(){a.addEventListener?(a.removeEventListener("DOMContentLoaded",q,!1),e.removeEventListener("load",q,!1)):(a.detachEvent("onreadystatechange",q),e.detachEvent("onload",q))};x.fn=x.prototype={jquery:f,constructor:x,init:function(e,n,r){var i,o;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof x?n[0]:n,x.merge(this,x.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:a,!0)),k.test(i[1])&&x.isPlainObject(n))for(i in n)x.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(o=a.getElementById(i[2]),o&&o.parentNode){if(o.id!==i[2])return r.find(e);this.length=1,this[0]=o}return this.context=a,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return g.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(g.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},l=2),"object"==typeof s||x.isFunction(s)||(s={}),u===l&&(s=this,--l);u>l;l++)if(null!=(o=arguments[l]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(x.isPlainObject(r)||(n=x.isArray(r)))?(n?(n=!1,a=e&&x.isArray(e)?e:[]):a=e&&x.isPlainObject(e)?e:{},s[i]=x.extend(c,a,r)):r!==t&&(s[i]=r));return s},x.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=l),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){if(e===!0?!--x.readyWait:!x.isReady){if(!a.body)return setTimeout(x.ready);x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(a,[x]),x.fn.trigger&&x(a).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray||function(e){return"array"===x.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?c[y.call(e)]||"object":typeof e},isPlainObject:function(e){var n;if(!e||"object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!v.call(e,"constructor")&&!v.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}if(x.support.ownLast)for(n in e)return v.call(e,n);for(n in e);return n===t||v.call(e,n)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||a;var r=k.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=x.trim(n),n&&E.test(n.replace(A,"@").replace(j,"]").replace(S,"")))?Function("return "+n)():(x.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||x.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&x.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(D,"ms-").replace(L,H)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:b&&!b.call("\ufeff\u00a0")?function(e){return null==e?"":b.call(e)}:function(e){return null==e?"":(e+"").replace(C,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(m)return m.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return d.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),x.isFunction(e)?(r=g.call(arguments,2),i=function(){return e.apply(n||this,r.concat(g.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):t},access:function(e,n,r,i,o,a,s){var l=0,u=e.length,c=null==r;if("object"===x.type(r)){o=!0;for(l in r)x.access(e,n,l,r[l],!0,a,s)}else if(i!==t&&(o=!0,x.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(x(e),n)})),n))for(;u>l;l++)n(e[l],r,s?i:i.call(e[l],l,n(e[l],r)));return o?e:c?n.call(e):u?n(e[0],r):a},now:function(){return(new Date).getTime()},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),x.ready.promise=function(t){if(!n)if(n=x.Deferred(),"complete"===a.readyState)setTimeout(x.ready);else if(a.addEventListener)a.addEventListener("DOMContentLoaded",q,!1),e.addEventListener("load",q,!1);else{a.attachEvent("onreadystatechange",q),e.attachEvent("onload",q);var r=!1;try{r=null==e.frameElement&&a.documentElement}catch(i){}r&&r.doScroll&&function o(){if(!x.isReady){try{r.doScroll("left")}catch(e){return setTimeout(o,50)}_(),x.ready()}}()}return n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){c["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=x(a),function(e,t){var n,r,i,o,a,s,l,u,c,p,f,d,h,g,m,y,v,b="sizzle"+-new Date,w=e.document,T=0,C=0,N=st(),k=st(),E=st(),S=!1,A=function(e,t){return e===t?(S=!0,0):0},j=typeof t,D=1<<31,L={}.hasOwnProperty,H=[],q=H.pop,_=H.push,M=H.push,O=H.slice,F=H.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},B="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",P="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",W=R.replace("w","w#"),$="\\["+P+"*("+R+")"+P+"*(?:([*^$|!~]?=)"+P+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+W+")|)|)"+P+"*\\]",I=":("+R+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+$.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+P+"+|((?:^|[^\\\\])(?:\\\\.)*)"+P+"+$","g"),X=RegExp("^"+P+"*,"+P+"*"),U=RegExp("^"+P+"*([>+~]|"+P+")"+P+"*"),V=RegExp(P+"*[+~]"),Y=RegExp("="+P+"*([^\\]'\"]*)"+P+"*\\]","g"),J=RegExp(I),G=RegExp("^"+W+"$"),Q={ID:RegExp("^#("+R+")"),CLASS:RegExp("^\\.("+R+")"),TAG:RegExp("^("+R.replace("w","w*")+")"),ATTR:RegExp("^"+$),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+P+"*(even|odd|(([+-]|)(\\d*)n|)"+P+"*(?:([+-]|)"+P+"*(\\d+)|))"+P+"*\\)|)","i"),bool:RegExp("^(?:"+B+")$","i"),needsContext:RegExp("^"+P+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+P+"*((?:-\\d)?\\d*)"+P+"*\\)|)(?=[^-]|$)","i")},K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,et=/^(?:input|select|textarea|button)$/i,tt=/^h\d$/i,nt=/'|\\/g,rt=RegExp("\\\\([\\da-f]{1,6}"+P+"?|("+P+")|.)","ig"),it=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{M.apply(H=O.call(w.childNodes),w.childNodes),H[w.childNodes.length].nodeType}catch(ot){M={apply:H.length?function(e,t){_.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function at(e,t,n,i){var o,a,s,l,u,c,d,m,y,x;if((t?t.ownerDocument||t:w)!==f&&p(t),t=t||f,n=n||[],!e||"string"!=typeof e)return n;if(1!==(l=t.nodeType)&&9!==l)return[];if(h&&!i){if(o=Z.exec(e))if(s=o[1]){if(9===l){if(a=t.getElementById(s),!a||!a.parentNode)return n;if(a.id===s)return n.push(a),n}else if(t.ownerDocument&&(a=t.ownerDocument.getElementById(s))&&v(t,a)&&a.id===s)return n.push(a),n}else{if(o[2])return M.apply(n,t.getElementsByTagName(e)),n;if((s=o[3])&&r.getElementsByClassName&&t.getElementsByClassName)return M.apply(n,t.getElementsByClassName(s)),n}if(r.qsa&&(!g||!g.test(e))){if(m=d=b,y=t,x=9===l&&e,1===l&&"object"!==t.nodeName.toLowerCase()){c=mt(e),(d=t.getAttribute("id"))?m=d.replace(nt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",u=c.length;while(u--)c[u]=m+yt(c[u]);y=V.test(e)&&t.parentNode||t,x=c.join(",")}if(x)try{return M.apply(n,y.querySelectorAll(x)),n}catch(T){}finally{d||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,n,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>o.cacheLength&&delete t[e.shift()],t[n]=r}return t}function lt(e){return e[b]=!0,e}function ut(e){var t=f.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function ct(e,t){var n=e.split("|"),r=e.length;while(r--)o.attrHandle[n[r]]=t}function pt(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function dt(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return lt(function(t){return t=+t,lt(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}s=at.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},r=at.support={},p=at.setDocument=function(e){var n=e?e.ownerDocument||e:w,i=n.defaultView;return n!==f&&9===n.nodeType&&n.documentElement?(f=n,d=n.documentElement,h=!s(n),i&&i.attachEvent&&i!==i.top&&i.attachEvent("onbeforeunload",function(){p()}),r.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),r.getElementsByTagName=ut(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),r.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),r.getById=ut(function(e){return d.appendChild(e).id=b,!n.getElementsByName||!n.getElementsByName(b).length}),r.getById?(o.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){return e.getAttribute("id")===t}}):(delete o.find.ID,o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),o.find.TAG=r.getElementsByTagName?function(e,n){return typeof n.getElementsByTagName!==j?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},o.find.CLASS=r.getElementsByClassName&&function(e,n){return typeof n.getElementsByClassName!==j&&h?n.getElementsByClassName(e):t},m=[],g=[],(r.qsa=K.test(n.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||g.push("\\["+P+"*(?:value|"+B+")"),e.querySelectorAll(":checked").length||g.push(":checked")}),ut(function(e){var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&g.push("[*^$]="+P+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||g.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),g.push(",.*:")})),(r.matchesSelector=K.test(y=d.webkitMatchesSelector||d.mozMatchesSelector||d.oMatchesSelector||d.msMatchesSelector))&&ut(function(e){r.disconnectedMatch=y.call(e,"div"),y.call(e,"[s!='']:x"),m.push("!=",I)}),g=g.length&&RegExp(g.join("|")),m=m.length&&RegExp(m.join("|")),v=K.test(d.contains)||d.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},A=d.compareDocumentPosition?function(e,t){if(e===t)return S=!0,0;var i=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t);return i?1&i||!r.sortDetached&&t.compareDocumentPosition(e)===i?e===n||v(w,e)?-1:t===n||v(w,t)?1:c?F.call(c,e)-F.call(c,t):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return S=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:c?F.call(c,e)-F.call(c,t):0;if(o===a)return pt(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?pt(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},n):f},at.matches=function(e,t){return at(e,null,null,t)},at.matchesSelector=function(e,t){if((e.ownerDocument||e)!==f&&p(e),t=t.replace(Y,"='$1']"),!(!r.matchesSelector||!h||m&&m.test(t)||g&&g.test(t)))try{var n=y.call(e,t);if(n||r.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(i){}return at(t,f,null,[e]).length>0},at.contains=function(e,t){return(e.ownerDocument||e)!==f&&p(e),v(e,t)},at.attr=function(e,n){(e.ownerDocument||e)!==f&&p(e);var i=o.attrHandle[n.toLowerCase()],a=i&&L.call(o.attrHandle,n.toLowerCase())?i(e,n,!h):t;return a===t?r.attributes||!h?e.getAttribute(n):(a=e.getAttributeNode(n))&&a.specified?a.value:null:a},at.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},at.uniqueSort=function(e){var t,n=[],i=0,o=0;if(S=!r.detectDuplicates,c=!r.sortStable&&e.slice(0),e.sort(A),S){while(t=e[o++])t===e[o]&&(i=n.push(o));while(i--)e.splice(n[i],1)}return e},a=at.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=a(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=a(t);return n},o=at.selectors={cacheLength:50,createPseudo:lt,match:Q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(rt,it),e[3]=(e[4]||e[5]||"").replace(rt,it),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||at.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&at.error(e[0]),e},PSEUDO:function(e){var n,r=!e[5]&&e[2];return Q.CHILD.test(e[0])?null:(e[3]&&e[4]!==t?e[2]=e[4]:r&&J.test(r)&&(n=mt(r,!0))&&(n=r.indexOf(")",r.length-n)-r.length)&&(e[0]=e[0].slice(0,n),e[2]=r.slice(0,n)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(rt,it).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=N[e+" "];return t||(t=RegExp("(^|"+P+")"+e+"("+P+"|$)"))&&N(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=at.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var u,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!l&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[b]||(m[b]={}),u=c[e]||[],d=u[0]===T&&u[1],f=u[0]===T&&u[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[T,d,f];break}}else if(v&&(u=(t[b]||(t[b]={}))[e])&&u[0]===T)f=u[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[b]||(p[b]={}))[e]=[T,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=o.pseudos[e]||o.setFilters[e.toLowerCase()]||at.error("unsupported pseudo: "+e);return r[b]?r(t):r.length>1?(n=[e,e,"",t],o.setFilters.hasOwnProperty(e.toLowerCase())?lt(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=F.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:lt(function(e){var t=[],n=[],r=l(e.replace(z,"$1"));return r[b]?lt(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:lt(function(e){return function(t){return at(e,t).length>0}}),contains:lt(function(e){return function(t){return(t.textContent||t.innerText||a(t)).indexOf(e)>-1}}),lang:lt(function(e){return G.test(e||"")||at.error("unsupported lang: "+e),e=e.replace(rt,it).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===d},focus:function(e){return e===f.activeElement&&(!f.hasFocus||f.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!o.pseudos.empty(e)},header:function(e){return tt.test(e.nodeName)},input:function(e){return et.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},o.pseudos.nth=o.pseudos.eq;for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})o.pseudos[n]=ft(n);for(n in{submit:!0,reset:!0})o.pseudos[n]=dt(n);function gt(){}gt.prototype=o.filters=o.pseudos,o.setFilters=new gt;function mt(e,t){var n,r,i,a,s,l,u,c=k[e+" "];if(c)return t?0:c.slice(0);s=e,l=[],u=o.preFilter;while(s){(!n||(r=X.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),l.push(i=[])),n=!1,(r=U.exec(s))&&(n=r.shift(),i.push({value:n,type:r[0].replace(z," ")}),s=s.slice(n.length));for(a in o.filter)!(r=Q[a].exec(s))||u[a]&&!(r=u[a](r))||(n=r.shift(),i.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?at.error(e):k(e,l).slice(0)}function yt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function vt(e,t,n){var r=t.dir,o=n&&"parentNode"===r,a=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||o)return e(t,n,i)}:function(t,n,s){var l,u,c,p=T+" "+a;if(s){while(t=t[r])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[r])if(1===t.nodeType||o)if(c=t[b]||(t[b]={}),(u=c[r])&&u[0]===p){if((l=u[1])===!0||l===i)return l===!0}else if(u=c[r]=[p],u[1]=e(t,n,s)||i,u[1]===!0)return!0}}function bt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,a=[],s=0,l=e.length,u=null!=t;for(;l>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),u&&t.push(s));return a}function wt(e,t,n,r,i,o){return r&&!r[b]&&(r=wt(r)),i&&!i[b]&&(i=wt(i,o)),lt(function(o,a,s,l){var u,c,p,f=[],d=[],h=a.length,g=o||Nt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:xt(g,f,e,s,l),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,l),r){u=xt(y,d),r(u,[],s,l),c=u.length;while(c--)(p=u[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){u=[],c=y.length;while(c--)(p=y[c])&&u.push(m[c]=p);i(null,y=[],u,l)}c=y.length;while(c--)(p=y[c])&&(u=i?F.call(o,p):f[c])>-1&&(o[u]=!(a[u]=p))}}else y=xt(y===a?y.splice(h,y.length):y),i?i(null,a,y,l):M.apply(a,y)})}function Tt(e){var t,n,r,i=e.length,a=o.relative[e[0].type],s=a||o.relative[" "],l=a?1:0,c=vt(function(e){return e===t},s,!0),p=vt(function(e){return F.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;i>l;l++)if(n=o.relative[e[l].type])f=[vt(bt(f),n)];else{if(n=o.filter[e[l].type].apply(null,e[l].matches),n[b]){for(r=++l;i>r;r++)if(o.relative[e[r].type])break;return wt(l>1&&bt(f),l>1&&yt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&Tt(e.slice(l,r)),i>r&&Tt(e=e.slice(r)),i>r&&yt(e))}f.push(n)}return bt(f)}function Ct(e,t){var n=0,r=t.length>0,a=e.length>0,s=function(s,l,c,p,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,C=u,N=s||a&&o.find.TAG("*",d&&l.parentNode||l),k=T+=null==C?1:Math.random()||.1;for(w&&(u=l!==f&&l,i=n);null!=(h=N[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,l,c)){p.push(h);break}w&&(T=k,i=++n)}r&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,r&&b!==v){g=0;while(m=t[g++])m(x,y,l,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=q.call(p));y=xt(y)}M.apply(p,y),w&&!s&&y.length>0&&v+t.length>1&&at.uniqueSort(p)}return w&&(T=k,u=C),x};return r?lt(s):s}l=at.compile=function(e,t){var n,r=[],i=[],o=E[e+" "];if(!o){t||(t=mt(e)),n=t.length;while(n--)o=Tt(t[n]),o[b]?r.push(o):i.push(o);o=E(e,Ct(i,r))}return o};function Nt(e,t,n){var r=0,i=t.length;for(;i>r;r++)at(e,t[r],n);return n}function kt(e,t,n,i){var a,s,u,c,p,f=mt(e);if(!i&&1===f.length){if(s=f[0]=f[0].slice(0),s.length>2&&"ID"===(u=s[0]).type&&r.getById&&9===t.nodeType&&h&&o.relative[s[1].type]){if(t=(o.find.ID(u.matches[0].replace(rt,it),t)||[])[0],!t)return n;e=e.slice(s.shift().value.length)}a=Q.needsContext.test(e)?0:s.length;while(a--){if(u=s[a],o.relative[c=u.type])break;if((p=o.find[c])&&(i=p(u.matches[0].replace(rt,it),V.test(s[0].type)&&t.parentNode||t))){if(s.splice(a,1),e=i.length&&yt(s),!e)return M.apply(n,i),n;break}}}return l(e,f)(i,t,!h,n,V.test(e)),n}r.sortStable=b.split("").sort(A).join("")===b,r.detectDuplicates=S,p(),r.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(f.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||ct("type|href|height|width",function(e,n,r){return r?t:e.getAttribute(n,"type"===n.toLowerCase()?1:2)}),r.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||ct("value",function(e,n,r){return r||"input"!==e.nodeName.toLowerCase()?t:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||ct(B,function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&i.specified?i.value:e[n]===!0?n.toLowerCase():null}),x.find=at,x.expr=at.selectors,x.expr[":"]=x.expr.pseudos,x.unique=at.uniqueSort,x.text=at.getText,x.isXMLDoc=at.isXML,x.contains=at.contains}(e);var O={};function F(e){var t=O[e]={};return x.each(e.match(T)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?O[e]||F(e):x.extend({},e);var n,r,i,o,a,s,l=[],u=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=l.length,n=!0;l&&o>a;a++)if(l[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,l&&(u?u.length&&c(u.shift()):r?l=[]:p.disable())},p={add:function(){if(l){var t=l.length;(function i(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&p.has(n)||l.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=l.length:r&&(s=t,c(r))}return this},remove:function(){return l&&x.each(arguments,function(e,t){var r;while((r=x.inArray(t,l,r))>-1)l.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?x.inArray(e,l)>-1:!(!l||!l.length)},empty:function(){return l=[],o=0,this},disable:function(){return l=u=r=t,this},disabled:function(){return!l},lock:function(){return u=t,r||p.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!l||i&&!u||(t=t||[],t=[e,t.slice?t.slice():t],n?u.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var a=o[0],s=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=g.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?g.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,l,u;if(r>1)for(s=Array(r),l=Array(r),u=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(a(t,u,n)).fail(o.reject).progress(a(t,l,s)):--i;return i||o.resolveWith(u,n),o.promise()}}),x.support=function(t){var n,r,o,s,l,u,c,p,f,d=a.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*")||[],r=d.getElementsByTagName("a")[0],!r||!r.style||!n.length)return t;s=a.createElement("select"),u=s.appendChild(a.createElement("option")),o=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t.getSetAttribute="t"!==d.className,t.leadingWhitespace=3===d.firstChild.nodeType,t.tbody=!d.getElementsByTagName("tbody").length,t.htmlSerialize=!!d.getElementsByTagName("link").length,t.style=/top/.test(r.getAttribute("style")),t.hrefNormalized="/a"===r.getAttribute("href"),t.opacity=/^0.5/.test(r.style.opacity),t.cssFloat=!!r.style.cssFloat,t.checkOn=!!o.value,t.optSelected=u.selected,t.enctype=!!a.createElement("form").enctype,t.html5Clone="<:nav></:nav>"!==a.createElement("nav").cloneNode(!0).outerHTML,t.inlineBlockNeedsLayout=!1,t.shrinkWrapBlocks=!1,t.pixelPosition=!1,t.deleteExpando=!0,t.noCloneEvent=!0,t.reliableMarginRight=!0,t.boxSizingReliable=!0,o.checked=!0,t.noCloneChecked=o.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!u.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}o=a.createElement("input"),o.setAttribute("value",""),t.input=""===o.getAttribute("value"),o.value="t",o.setAttribute("type","radio"),t.radioValue="t"===o.value,o.setAttribute("checked","t"),o.setAttribute("name","t"),l=a.createDocumentFragment(),l.appendChild(o),t.appendChecked=o.checked,t.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip;for(f in x(t))break;return t.ownLast="0"!==f,x(function(){var n,r,o,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",l=a.getElementsByTagName("body")[0];l&&(n=a.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",l.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=d.getElementsByTagName("td"),o[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===o[0].offsetHeight,o[0].style.display="",o[1].style.display="none",t.reliableHiddenOffsets=p&&0===o[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",x.swap(l,null!=l.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===d.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(a.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(l.style.zoom=1)),l.removeChild(n),n=d=o=r=null)}),n=s=l=u=r=o=null,t}({});var B=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;function R(e,n,r,i){if(x.acceptData(e)){var o,a,s=x.expando,l=e.nodeType,u=l?x.cache:e,c=l?e[s]:e[s]&&s;if(c&&u[c]&&(i||u[c].data)||r!==t||"string"!=typeof n)return c||(c=l?e[s]=p.pop()||x.guid++:s),u[c]||(u[c]=l?{}:{toJSON:x.noop}),("object"==typeof n||"function"==typeof n)&&(i?u[c]=x.extend(u[c],n):u[c].data=x.extend(u[c].data,n)),a=u[c],i||(a.data||(a.data={}),a=a.data),r!==t&&(a[x.camelCase(n)]=r),"string"==typeof n?(o=a[n],null==o&&(o=a[x.camelCase(n)])):o=a,o}}function W(e,t,n){if(x.acceptData(e)){var r,i,o=e.nodeType,a=o?x.cache:e,s=o?e[x.expando]:x.expando;if(a[s]){if(t&&(r=n?a[s]:a[s].data)){x.isArray(t)?t=t.concat(x.map(t,x.camelCase)):t in r?t=[t]:(t=x.camelCase(t),t=t in r?[t]:t.split(" ")),i=t.length;while(i--)delete r[t[i]];if(n?!I(r):!x.isEmptyObject(r))return}(n||(delete a[s].data,I(a[s])))&&(o?x.cleanData([e],!0):x.support.deleteExpando||a!=a.window?delete a[s]:a[s]=null)}}}x.extend({cache:{},noData:{applet:!0,embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?x.cache[e[x.expando]]:e[x.expando],!!e&&!I(e)},data:function(e,t,n){return R(e,t,n)},removeData:function(e,t){return W(e,t)},_data:function(e,t,n){return R(e,t,n,!0)},_removeData:function(e,t){return W(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&x.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),x.fn.extend({data:function(e,n){var r,i,o=null,a=0,s=this[0];if(e===t){if(this.length&&(o=x.data(s),1===s.nodeType&&!x._data(s,"parsedAttrs"))){for(r=s.attributes;r.length>a;a++)i=r[a].name,0===i.indexOf("data-")&&(i=x.camelCase(i.slice(5)),$(s,i,o[i]));x._data(s,"parsedAttrs",!0)}return o}return"object"==typeof e?this.each(function(){x.data(this,e)}):arguments.length>1?this.each(function(){x.data(this,e,n)}):s?$(s,e,x.data(s,e)):null},removeData:function(e){return this.each(function(){x.removeData(this,e)})}});function $(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(P,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:B.test(r)?x.parseJSON(r):r}catch(o){}x.data(e,n,r)}else r=t}return r}function I(e){var t;for(t in e)if(("data"!==t||!x.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}x.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=x._data(e,n),r&&(!i||x.isArray(r)?i=x._data(e,n,x.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),a=function(){x.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return x._data(e,n)||x._data(e,n,{empty:x.Callbacks("once memory").add(function(){x._removeData(e,t+"queue"),x._removeData(e,n)})})}}),x.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?x.queue(this[0],e):n===t?this:this.each(function(){var t=x.queue(this,e,n);x._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=x.Deferred(),a=this,s=this.length,l=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=x._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(l));return l(),o.promise(n)}});var z,X,U=/[\t\r\n\f]/g,V=/\r/g,Y=/^(?:input|select|textarea|button|object)$/i,J=/^(?:a|area)$/i,G=/^(?:checked|selected)$/i,Q=x.support.getSetAttribute,K=x.support.input;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return e=x.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,l="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,l=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,r=0,o=x(this),a=e.match(T)||[];while(t=a[r++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===i||"boolean"===n)&&(this.className&&x._data(this,"__className__",this.className),this.className=this.className||e===!1?"":x._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(U," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=x.isFunction(e),this.each(function(n){var o;1===this.nodeType&&(o=i?e.call(this,n,x(this).val()):e,null==o?o="":"number"==typeof o?o+="":x.isArray(o)&&(o=x.map(o,function(e){return null==e?"":e+""})),r=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=x.valHooks[o.type]||x.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(V,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=x.find.attr(e,"value");return null!=t?t:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,l=0>i?s:o?i:0;for(;s>l;l++)if(n=r[l],!(!n.selected&&l!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),a=i.length;while(a--)r=i[a],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,n,r){var o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===i?x.prop(e,n,r):(1===s&&x.isXMLDoc(e)||(n=n.toLowerCase(),o=x.attrHooks[n]||(x.expr.match.bool.test(n)?X:z)),r===t?o&&"get"in o&&null!==(a=o.get(e,n))?a:(a=x.find.attr(e,n),null==a?t:a):null!==r?o&&"set"in o&&(a=o.set(e,r,n))!==t?a:(e.setAttribute(n,r+""),r):(x.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(T);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)?K&&Q||!G.test(n)?e[r]=!1:e[x.camelCase("default-"+n)]=e[r]=!1:x.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!x.isXMLDoc(e),a&&(n=x.propFix[n]||n,o=x.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var t=x.find.attr(e,"tabindex");return t?parseInt(t,10):Y.test(e.nodeName)||J.test(e.nodeName)&&e.href?0:-1}}}}),X={set:function(e,t,n){return t===!1?x.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&x.propFix[n]||n,n):e[x.camelCase("default-"+n)]=e[n]=!0,n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,n){var r=x.expr.attrHandle[n]||x.find.attr;x.expr.attrHandle[n]=K&&Q||!G.test(n)?function(e,n,i){var o=x.expr.attrHandle[n],a=i?t:(x.expr.attrHandle[n]=t)!=r(e,n,i)?n.toLowerCase():null;return x.expr.attrHandle[n]=o,a}:function(e,n,r){return r?t:e[x.camelCase("default-"+n)]?n.toLowerCase():null}}),K&&Q||(x.attrHooks.value={set:function(e,n,r){return x.nodeName(e,"input")?(e.defaultValue=n,t):z&&z.set(e,n,r)}}),Q||(z={set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},x.expr.attrHandle.id=x.expr.attrHandle.name=x.expr.attrHandle.coords=function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&""!==i.value?i.value:null},x.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&r.specified?r.value:t},set:z.set},x.attrHooks.contenteditable={set:function(e,t,n){z.set(e,""===t?!1:t,n)}},x.each(["width","height"],function(e,n){x.attrHooks[n]={set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}}})),x.support.hrefNormalized||x.each(["href","src"],function(e,t){x.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}}),x.support.style||(x.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.support.enctype||(x.propFix.enctype="encoding"),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,n){return x.isArray(n)?e.checked=x.inArray(x(e).val(),n)>=0:t}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}function at(){try{return a.activeElement}catch(e){}}x.event={global:{},add:function(e,n,r,o,a){var s,l,u,c,p,f,d,h,g,m,y,v=x._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=x.guid++),(l=v.events)||(l=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof x===i||e&&x.event.triggered===e.type?t:x.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(T)||[""],u=n.length;while(u--)s=rt.exec(n[u])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),g&&(p=x.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=x.event.special[g]||{},d=x.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&x.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=l[g])||(h=l[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),x.event.global[g]=!0);e=null}},remove:function(e,t,n,r,i){var o,a,s,l,u,c,p,f,d,h,g,m=x.hasData(e)&&x._data(e);if(m&&(c=m.events)){t=(t||"").match(T)||[""],u=t.length;while(u--)if(s=rt.exec(t[u])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=x.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));l&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||x.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)x.event.remove(e,d+t[u],n,r,!0);x.isEmptyObject(c)&&(delete m.handle,x._removeData(e,"events"))}},trigger:function(n,r,i,o){var s,l,u,c,p,f,d,h=[i||a],g=v.call(n,"type")?n.type:n,m=v.call(n,"namespace")?n.namespace.split("."):[];if(u=f=i=i||a,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+x.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),l=0>g.indexOf(":")&&"on"+g,n=n[x.expando]?n:new x.Event(g,"object"==typeof n&&n),n.isTrigger=o?2:3,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:x.makeArray(r,[n]),p=x.event.special[g]||{},o||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!o&&!p.noBubble&&!x.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(u=u.parentNode);u;u=u.parentNode)h.push(u),f=u;f===(i.ownerDocument||a)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((u=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(x._data(u,"events")||{})[n.type]&&x._data(u,"handle"),s&&s.apply(u,r),s=l&&u[l],s&&x.acceptData(u)&&s.apply&&s.apply(u,r)===!1&&n.preventDefault();if(n.type=g,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(h.pop(),r)===!1)&&x.acceptData(i)&&l&&i[g]&&!x.isWindow(i)){f=i[l],f&&(i[l]=null),x.event.triggered=g;try{i[g]()}catch(y){}x.event.triggered=t,f&&(i[l]=f)}return n.result}},dispatch:function(e){e=x.event.fix(e);var n,r,i,o,a,s=[],l=g.call(arguments),u=(x._data(this,"events")||{})[e.type]||[],c=x.event.special[e.type]||{};if(l[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((x.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,l),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],l=n.delegateCount,u=e.target;if(l&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!=this;u=u.parentNode||this)if(1===u.nodeType&&(u.disabled!==!0||"click"!==e.type)){for(o=[],a=0;l>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?x(r,this).index(u)>=0:x.find(r,this,null,[u]).length),o[r]&&o.push(i);o.length&&s.push({elem:u,handlers:o})}return n.length>l&&s.push({elem:this,handlers:n.slice(l)}),s},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,o=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new x.Event(o),t=r.length;while(t--)n=r[t],e[n]=o[n];return e.target||(e.target=o.srcElement||a),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,o):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,o,s=n.button,l=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||a,o=i.documentElement,r=i.body,e.pageX=n.clientX+(o&&o.scrollLeft||r&&r.scrollLeft||0)-(o&&o.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(o&&o.scrollTop||r&&r.scrollTop||0)-(o&&o.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&l&&(e.relatedTarget=l===e.target?n.toElement:l),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==at()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===at()&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},click:{trigger:function(){return x.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=a.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},x.Event=function(e,n){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&x.extend(this,n),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,t):new x.Event(e,n)},x.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.submitBubbles||(x.event.special.submit={setup:function(){return x.nodeName(this,"form")?!1:(x.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=x.nodeName(n,"input")||x.nodeName(n,"button")?n.form:t;r&&!x._data(r,"submitBubbles")&&(x.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),x._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&x.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return x.nodeName(this,"form")?!1:(x.event.remove(this,"._submit"),t)}}),x.support.changeBubbles||(x.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(x.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),x.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),x.event.simulate("change",this,e,!0)})),!1):(x.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!x._data(t,"changeBubbles")&&(x.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||x.event.simulate("change",this.parentNode,e,!0)}),x._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return x.event.remove(this,"._change"),!Z.test(this.nodeName)}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&a.addEventListener(e,r,!0)},teardown:function(){0===--n&&a.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return x().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=x.guid++)),this.each(function(){x.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,x(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){x.event.remove(this,e,r,n)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?x.event.trigger(e,n,r,!0):t}});var st=/^.[^:#\[\.,]*$/,lt=/^(?:parents|prev(?:Until|All))/,ut=x.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t,n=x(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(x.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e||[],!0))},filter:function(e){return this.pushStack(ft(this,e||[],!1))},is:function(e){return!!ft(this,"string"==typeof e&&ut.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],a=ut.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(a?a.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?x.inArray(this[0],x(e)):x.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return x.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(ct[e]||(i=x.unique(i)),lt.test(e)&&(i=i.reverse())),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!x(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(st.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return x.inArray(e,t)>=0!==n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Ct=/^(?:checkbox|radio)$/i,Nt=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:x.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(a),Dt=jt.appendChild(a.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===t?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||a).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(Ft(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&_t(Ft(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&x.cleanData(Ft(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&x.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!x.support.htmlSerialize&&mt.test(e)||!x.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(x.cleanData(Ft(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=d.apply([],e);var r,i,o,a,s,l,u=0,c=this.length,p=this,f=c-1,h=e[0],g=x.isFunction(h);if(g||!(1>=c||"string"!=typeof h||x.support.checkClone)&&Nt.test(h))return this.each(function(r){var i=p.eq(r);g&&(e[0]=h.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(l=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),r=l.firstChild,1===l.childNodes.length&&(l=r),r)){for(a=x.map(Ft(l,"script"),Ht),o=a.length;c>u;u++)i=l,u!==f&&(i=x.clone(i,!0,!0),o&&x.merge(a,Ft(i,"script"))),t.call(this[u],i,u);if(o)for(s=a[a.length-1].ownerDocument,x.map(a,qt),u=0;o>u;u++)i=a[u],kt.test(i.type||"")&&!x._data(i,"globalEval")&&x.contains(s,i)&&(i.src?x._evalUrl(i.src):x.globalEval((i.text||i.textContent||i.innerHTML||"").replace(St,"")));l=r=null}return this}});function Lt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function Ht(e){return e.type=(null!==x.find.attr(e,"type"))+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function _t(e,t){var n,r=0;for(;null!=(n=e[r]);r++)x._data(n,"globalEval",!t||x._data(t[r],"globalEval"))}function Mt(e,t){if(1===t.nodeType&&x.hasData(e)){var n,r,i,o=x._data(e),a=x._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)x.event.add(t,n,s[n][r])}a.data&&(a.data=x.extend({},a.data))}}function Ot(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!x.support.noCloneEvent&&t[x.expando]){i=x._data(t);for(r in i.events)x.removeEvent(t,r,i.handle);t.removeAttribute(x.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),x.support.html5Clone&&e.innerHTML&&!x.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Ct.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=0,i=[],o=x(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),x(o[r])[t](n),h.apply(i,n.get());return this.pushStack(i)}});function Ft(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||x.nodeName(o,n)?s.push(o):x.merge(s,Ft(o,n));return n===t||n&&x.nodeName(e,n)?x.merge([e],s):s}function Bt(e){Ct.test(e.type)&&(e.defaultChecked=e.checked)}x.extend({clone:function(e,t,n){var r,i,o,a,s,l=x.contains(e.ownerDocument,e);if(x.support.html5Clone||x.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(x.support.noCloneEvent&&x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(r=Ft(o),s=Ft(e),a=0;null!=(i=s[a]);++a)r[a]&&Ot(i,r[a]);if(t)if(n)for(s=s||Ft(e),r=r||Ft(o),a=0;null!=(i=s[a]);a++)Mt(i,r[a]);else Mt(e,o);return r=Ft(o,"script"),r.length>0&&_t(r,!l&&Ft(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,l,u,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===x.type(o))x.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),l=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[l]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!x.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!x.support.tbody){o="table"!==l||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)x.nodeName(u=o.childNodes[i],"tbody")&&!u.childNodes.length&&o.removeChild(u)}x.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),x.support.appendChecked||x.grep(Ft(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===x.inArray(o,r))&&(a=x.contains(o.ownerDocument,o),s=Ft(f.appendChild(o),"script"),a&&_t(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,l=x.expando,u=x.cache,c=x.support.deleteExpando,f=x.event.special;for(;null!=(n=e[s]);s++)if((t||x.acceptData(n))&&(o=n[l],a=o&&u[o])){if(a.events)for(r in a.events)f[r]?x.event.remove(n,r):x.removeEvent(n,r,a.handle);u[o]&&(delete u[o],c?delete n[l]:typeof n.removeAttribute!==i?n.removeAttribute(l):n[l]=null,p.push(o))}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}}),x.fn.extend({wrapAll:function(e){if(x.isFunction(e))return this.each(function(t){x(this).wrapAll(e.call(this,t))});if(this[0]){var t=x(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+w+")(.*)$","i"),Yt=RegExp("^("+w+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+w+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=x._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=x._data(r,"olddisplay",ln(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&x._data(r,"olddisplay",i?n:x.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}x.fn.extend({css:function(e,n){return x.access(this,function(e,n,r){var i,o,a={},s=0;if(x.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=x.css(e,n[s],!1,o);return a}return r!==t?x.style(e,n,r):x.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){nn(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":x.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,l=x.camelCase(n),u=e.style;if(n=x.cssProps[l]||(x.cssProps[l]=tn(u,l)),s=x.cssHooks[n]||x.cssHooks[l],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:u[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(x.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||x.cssNumber[l]||(r+="px"),x.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(u[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{u[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,l=x.camelCase(n);return n=x.cssProps[l]||(x.cssProps[l]=tn(e.style,l)),s=x.cssHooks[n]||x.cssHooks[l],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||x.isNumeric(o)?o||0:a):a}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s.getPropertyValue(n)||s[n]:t,u=e.style;return s&&(""!==l||x.contains(e.ownerDocument,e)||(l=x.style(e,n)),Yt.test(l)&&Ut.test(n)&&(i=u.width,o=u.minWidth,a=u.maxWidth,u.minWidth=u.maxWidth=u.width=l,l=s.width,u.width=i,u.minWidth=o,u.maxWidth=a)),l}):a.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s[n]:t,u=e.style;return null==l&&u&&u[n]&&(l=u[n]),Yt.test(l)&&!zt.test(n)&&(i=u.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),u.left="fontSize"===n?"1em":l,l=u.pixelLeft+"px",u.left=i,a&&(o.left=a)),""===l?"auto":l});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=x.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=x.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=x.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=x.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=x.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function ln(e){var t=a,n=Gt[e];return n||(n=un(e,t),"none"!==n&&n||(Pt=(Pt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=un(e,t),Pt.detach()),Gt[e]=n),n}function un(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,n){x.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(x.css(e,"display"))?x.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x.support.opacity||(x.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=x.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===x.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,n){return n?x.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,n){x.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?x(e).position()[n]+"px":r):t}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!x.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||x.css(e,"display"))},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(x.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Ct.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),x.param=function(e,n){var r,i=[],o=function(e,t){t=x.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var mn,yn,vn=x.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Cn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Nn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=x.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=o.href}catch(Ln){yn=a.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(T)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(l){var u;return o[l]=!0,x.each(e[l]||[],function(e,l){var c=l(n,r,i);return"string"!=typeof c||a||o[c]?a?!(u=c):t:(n.dataTypes.unshift(c),s(c),!1)}),u}return s(n.dataTypes[0])||!o["*"]&&s("*")}function _n(e,n){var r,i,o=x.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,l=e.indexOf(" ");return l>=0&&(i=e.slice(l,e.length),e=e.slice(0,l)),x.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&x.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?x("<div>").append(x.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Cn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?_n(_n(e,x.ajaxSettings),t):_n(x.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,l,u,c,p=x.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?x(f):x.event,h=x.Deferred(),g=x.Callbacks("once memory"),m=p.statusCode||{},y={},v={},b=0,w="canceled",C={readyState:0,getResponseHeader:function(e){var t;if(2===b){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===b?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return b||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return b||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>b)for(t in e)m[t]=[m[t],e[t]];else C.always(e[C.status]);return this},abort:function(e){var t=e||w;return u&&u.abort(t),k(0,t),this}};if(h.promise(C).complete=g.add,C.success=C.done,C.error=C.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=x.trim(p.dataType||"*").toLowerCase().match(T)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?"80":"443"))===(mn[3]||("http:"===mn[1]?"80":"443")))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=x.param(p.data,p.traditional)),qn(An,p,n,C),2===b)return C;l=p.global,l&&0===x.active++&&x.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Nn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(x.lastModified[o]&&C.setRequestHeader("If-Modified-Since",x.lastModified[o]),x.etag[o]&&C.setRequestHeader("If-None-Match",x.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&C.setRequestHeader("Content-Type",p.contentType),C.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)C.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,C,p)===!1||2===b))return C.abort();w="abort";for(i in{success:1,error:1,complete:1})C[i](p[i]);if(u=qn(jn,p,n,C)){C.readyState=1,l&&d.trigger("ajaxSend",[C,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){C.abort("timeout")},p.timeout));try{b=1,u.send(y,k)}catch(N){if(!(2>b))throw N;k(-1,N)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,N=n;2!==b&&(b=2,s&&clearTimeout(s),u=t,a=i||"",C.readyState=e>0?4:0,c=e>=200&&300>e||304===e,r&&(w=Mn(p,C,r)),w=On(p,w,C,c),c?(p.ifModified&&(T=C.getResponseHeader("Last-Modified"),T&&(x.lastModified[o]=T),T=C.getResponseHeader("etag"),T&&(x.etag[o]=T)),204===e||"HEAD"===p.type?N="nocontent":304===e?N="notmodified":(N=w.state,y=w.data,v=w.error,c=!v)):(v=N,(e||!N)&&(N="error",0>e&&(e=0))),C.status=e,C.statusText=(n||N)+"",c?h.resolveWith(f,[y,N,C]):h.rejectWith(f,[C,N,v]),C.statusCode(m),m=t,l&&d.trigger(c?"ajaxSuccess":"ajaxError",[C,p,c?y:v]),g.fireWith(f,[C,N]),l&&(d.trigger("ajaxComplete",[C,p]),--x.active||x.event.trigger("ajaxStop")))}return C},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,n){return x.get(e,t,n,"script")}}),x.each(["get","post"],function(e,n){x[n]=function(e,r,i,o){return x.isFunction(r)&&(o=o||i,i=r,r=t),x.ajax({url:e,type:n,dataType:o,data:r,success:i})}});function Mn(e,n,r){var i,o,a,s,l=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in l)if(l[s]&&l[s].test(o)){u.unshift(s);break}if(u[0]in r)a=u[0];else{for(s in r){if(!u[0]||e.converters[s+" "+u[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==u[0]&&u.unshift(a),r[a]):t}function On(e,t,n,r){var i,o,a,s,l,u={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)u[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=c.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(a=u[l+" "+o]||u["* "+o],!a)for(i in u)if(s=i.split(" "),s[1]===o&&(a=u[l+" "+s[0]]||u["* "+s[0]])){a===!0?a=u[i]:u[i]!==!0&&(o=s[0],c.unshift(s[1]));break}if(a!==!0)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(p){return{state:"parsererror",error:a?p:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),x.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=a.head||x("head")[0]||a.documentElement;return{send:function(t,i){n=a.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var Fn=[],Bn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Fn.pop()||x.expando+"_"+vn++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,l=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return l||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=x.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,l?n[l]=n[l].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||x.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,Fn.push(o)),s&&x.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}x.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=x.ajaxSettings.xhr(),x.support.cors=!!Rn&&"withCredentials"in Rn,Rn=x.support.ajax=!!Rn,Rn&&x.ajaxTransport(function(n){if(!n.crossDomain||x.support.cors){var r;return{send:function(i,o){var a,s,l=n.xhr();if(n.username?l.open(n.type,n.url,n.async,n.username,n.password):l.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)l[s]=n.xhrFields[s];n.mimeType&&l.overrideMimeType&&l.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)l.setRequestHeader(s,i[s])}catch(u){}l.send(n.hasContent&&n.data||null),r=function(e,i){var s,u,c,p;try{if(r&&(i||4===l.readyState))if(r=t,a&&(l.onreadystatechange=x.noop,$n&&delete Pn[a]),i)4!==l.readyState&&l.abort();else{p={},s=l.status,u=l.getAllResponseHeaders(),"string"==typeof l.responseText&&(p.text=l.responseText);try{c=l.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,u)},n.async?4===l.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},x(e).unload($n)),Pn[a]=r),l.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+w+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Yn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),a=(x.cssNumber[e]||"px"!==o&&+r)&&Yn.exec(x.css(n.elem,e)),s=1,l=20;if(a&&a[3]!==o){o=o||a[3],i=i||[],a=+r||1;do s=s||".5",a/=s,x.style(n.elem,e,a+o);while(s!==(s=n.cur()/r)&&1!==s&&--l)}return i&&(a=n.start=+a||+r||0,n.unit=o,n.end=i[1]?a+(i[1]+1)*i[2]:+i[2]),n}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=x.now()}function Zn(e,t,n){var r,i=(Qn[t]||[]).concat(Qn["*"]),o=0,a=i.length;for(;a>o;o++)if(r=i[o].call(n,t,e))return r}function er(e,t,n){var r,i,o=0,a=Gn.length,s=x.Deferred().always(function(){delete l.elem}),l=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,u.startTime+u.duration-t),r=n/u.duration||0,o=1-r,a=0,l=u.tweens.length;for(;l>a;a++)u.tweens[a].run(o);return s.notifyWith(e,[u,o,n]),1>o&&l?n:(s.resolveWith(e,[u]),!1)},u=s.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,u.opts,t,n,u.opts.specialEasing[t]||u.opts.easing);return u.tweens.push(r),r},stop:function(t){var n=0,r=t?u.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)u.tweens[n].run(1);return t?s.resolveWith(e,[u,t]):s.rejectWith(e,[u,t]),this}}),c=u.props;for(tr(c,u.opts.specialEasing);a>o;o++)if(r=Gn[o].call(u,e,c,u.opts))return r;return x.map(c,Zn,u),x.isFunction(u.opts.start)&&u.opts.start.call(e,u),x.fx.timer(x.extend(l,{elem:e,anim:u,queue:u.opts.queue})),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)}function tr(e,t){var n,r,i,o,a;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=x.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(er,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,l,u=this,c={},p=e.style,f=e.nodeType&&nn(e),d=x._data(e,"fxshow");n.queue||(s=x._queueHooks(e,"fx"),null==s.unqueued&&(s.unqueued=0,l=s.empty.fire,s.empty.fire=function(){s.unqueued||l()}),s.unqueued++,u.always(function(){u.always(function(){s.unqueued--,x.queue(e,"fx").length||s.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(x.support.inlineBlockNeedsLayout&&"inline"!==ln(e.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",x.support.shrinkWrapBlocks||u.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],Vn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show"))continue;c[r]=d&&d[r]||x.style(e,r)}if(!x.isEmptyObject(c)){d?"hidden"in d&&(f=d.hidden):d=x._data(e,"fxshow",{}),o&&(d.hidden=!f),f?x(e).show():u.done(function(){x(e).hide()}),u.done(function(){var t;x._removeData(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)a=Zn(f?d[r]:0,r,u),r in d||(d[r]=a.start,f&&(a.end=a.start,a.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}x.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),a=function(){var t=er(this,x.extend({},e),o);(i||x._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=x.timers,a=x._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=x._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,a=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=rr.prototype.init,x.fx.tick=function(){var e,n=x.timers,r=0;for(Xn=x.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||x.fx.stop(),Xn=t},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){Un||(Un=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(Un),Un=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){x.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,x.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},x.offset={setOffset:function(e,t,n){var r=x.css(e,"position");"static"===r&&(e.style.position="relative");var i=x(e),o=i.offset(),a=x.css(e,"top"),s=x.css(e,"left"),l=("absolute"===r||"fixed"===r)&&x.inArray("auto",[a,s])>-1,u={},c={},p,f;l?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),x.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(u.top=t.top-o.top+p),null!=t.left&&(u.left=t.left-o.left+f),"using"in t?t.using.call(e,u):i.css(u)}},x.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===x.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(n=e.offset()),n.top+=x.css(e[0],"borderTopWidth",!0),n.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-x.css(r,"marginTop",!0),left:t.left-n.left-x.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);x.fn[e]=function(i){return x.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?x(a).scrollLeft():o,r?o:x(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return x.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}x.each({Height:"height",Width:"width"},function(e,n){x.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){x.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return x.access(this,function(n,r,i){var o;return x.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?x.css(n,r,s):x.style(n,r,i,s)},n,a?i:t,a,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:(e.jQuery=e.$=x,"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}))})(window);
;var Module={noInitialRun:true,'print':function(text){if(text.startsWith('v ')){retVal = text.substring(2).split("This")[0];}else{retVal='';}}};var Module;if(!Module)Module=eval('(function() { try { return Module || {} } catch(e) { return {} } })()');var moduleOverrides={};for(var key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key];}}
var ENVIRONMENT_IS_NODE=typeof process==='object'&&typeof require==='function';var ENVIRONMENT_IS_WEB=typeof window==='object';var ENVIRONMENT_IS_WORKER=typeof importScripts==='function';var ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;if(ENVIRONMENT_IS_NODE){Module['print']=function(x){process['stdout'].write(x+'\n');};Module['printErr']=function(x){process['stderr'].write(x+'\n');};var nodeFS=require('fs');var nodePath=require('path');Module['read']=function(filename,binary){filename=nodePath['normalize'](filename);var ret=nodeFS['readFileSync'](filename);if(!ret&&filename!=nodePath['resolve'](filename)){filename=path.join(__dirname,'..','src',filename);ret=nodeFS['readFileSync'](filename);}
if(ret&&!binary)ret=ret.toString();return ret;};Module['readBinary']=function(filename){return Module['read'](filename,true)};Module['load']=function(f){globalEval(read(f));};Module['arguments']=process['argv'].slice(2);module.exports=Module;}
else if(ENVIRONMENT_IS_SHELL){Module['print']=print;if(typeof printErr!='undefined')Module['printErr']=printErr;if(typeof read!='undefined'){Module['read']=read;}else{Module['read']=function(){throw'no read() available (jsc?)'};}
Module['readBinary']=function(f){return read(f,'binary');};if(typeof scriptArgs!='undefined'){Module['arguments']=scriptArgs;}else if(typeof arguments!='undefined'){Module['arguments']=arguments;}
this['Module']=Module;}
else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){Module['read']=function(url){var xhr=new XMLHttpRequest();xhr.open('GET',url,false);xhr.send(null);return xhr.responseText;};if(typeof arguments!='undefined'){Module['arguments']=arguments;}
if(typeof console!=='undefined'){Module['print']=function(x){console.log(x);};Module['printErr']=function(x){if(debug) console.log(x);};}else{var TRY_USE_DUMP=false;Module['print']=(TRY_USE_DUMP&&(typeof(dump)!=="undefined")?(function(x){dump(x);}):(function(x){}));}
if(ENVIRONMENT_IS_WEB){this['Module']=Module;}else{Module['load']=importScripts;}}
else{throw'Unknown runtime environment. Where are we?';}
function globalEval(x){eval.call(null,x);}
if(!Module['load']=='undefined'&&Module['read']){Module['load']=function(f){globalEval(Module['read'](f));};}
if(!Module['print']){Module['print']=function(){};}
if(!Module['printErr']){Module['printErr']=Module['print'];}
if(!Module['arguments']){Module['arguments']=[];}
Module.print=Module['print'];Module.printErr=Module['printErr'];Module['preRun']=[];Module['postRun']=[];for(var key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key];}}
var Runtime={stackSave:function(){return STACKTOP;},stackRestore:function(stackTop){STACKTOP=stackTop;},forceAlign:function(target,quantum){quantum=quantum||4;if(quantum==1)return target;if(isNumber(target)&&isNumber(quantum)){return Math.ceil(target/quantum)*quantum;}else if(isNumber(quantum)&&isPowerOfTwo(quantum)){var logg=log2(quantum);return'(((('+target+')+'+(quantum-1)+')>>'+logg+')<<'+logg+')';}
return'Math.ceil(('+target+')/'+quantum+')*'+quantum;},isNumberType:function(type){return type in Runtime.INT_TYPES||type in Runtime.FLOAT_TYPES;},isPointerType:function isPointerType(type){return type[type.length-1]=='*';},isStructType:function isStructType(type){if(isPointerType(type))return false;if(isArrayType(type))return true;if(/<?{ ?[^}]* ?}>?/.test(type))return true;return type[0]=='%';},INT_TYPES:{"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},FLOAT_TYPES:{"float":0,"double":0},or64:function(x,y){var l=(x|0)|(y|0);var h=(Math.round(x/4294967296)|Math.round(y/4294967296))*4294967296;return l+h;},and64:function(x,y){var l=(x|0)&(y|0);var h=(Math.round(x/4294967296)&Math.round(y/4294967296))*4294967296;return l+h;},xor64:function(x,y){var l=(x|0)^(y|0);var h=(Math.round(x/4294967296)^Math.round(y/4294967296))*4294967296;return l+h;},getNativeTypeSize:function(type){switch(type){case'i1':case'i8':return 1;case'i16':return 2;case'i32':return 4;case'i64':return 8;case'float':return 4;case'double':return 8;default:{if(type[type.length-1]==='*'){return Runtime.QUANTUM_SIZE;}else if(type[0]==='i'){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8;}}}},getNativeFieldSize:function(type){return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE);},dedup:function dedup(items,ident){var seen={};if(ident){return items.filter(function(item){if(seen[item[ident]])return false;seen[item[ident]]=true;return true;});}else{return items.filter(function(item){if(seen[item])return false;seen[item]=true;return true;});}},set:function set(){var args=typeof arguments[0]==='object'?arguments[0]:arguments;var ret={};for(var i=0;i<args.length;i++){ret[args[i]]=0;}
return ret;},STACK_ALIGN:8,getAlignSize:function(type,size,vararg){if(type=='i64'||type=='double'||vararg)return 8;if(!type)return Math.min(size,8);return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE);},calculateStructAlignment:function calculateStructAlignment(type){type.flatSize=0;type.alignSize=0;var diffs=[];var prev=-1;var index=0;type.flatIndexes=type.fields.map(function(field){index++;var size,alignSize;if(Runtime.isNumberType(field)||Runtime.isPointerType(field)){size=Runtime.getNativeTypeSize(field);alignSize=Runtime.getAlignSize(field,size);}else if(Runtime.isStructType(field)){if(field[1]==='0'){size=0;if(Types.types[field]){alignSize=Runtime.getAlignSize(null,Types.types[field].alignSize);}else{alignSize=type.alignSize||QUANTUM_SIZE;}}else{size=Types.types[field].flatSize;alignSize=Runtime.getAlignSize(null,Types.types[field].alignSize);}}else if(field[0]=='b'){size=field.substr(1)|0;alignSize=1;}else{throw'Unclear type in struct: '+field+', in '+type.name_+' :: '+dump(Types.types[type.name_]);}
if(type.packed)alignSize=1;type.alignSize=Math.max(type.alignSize,alignSize);var curr=Runtime.alignMemory(type.flatSize,alignSize);type.flatSize=curr+size;if(prev>=0){diffs.push(curr-prev);}
prev=curr;return curr;});type.flatSize=Runtime.alignMemory(type.flatSize,type.alignSize);if(diffs.length==0){type.flatFactor=type.flatSize;}else if(Runtime.dedup(diffs).length==1){type.flatFactor=diffs[0];}
type.needsFlattening=(type.flatFactor!=1);return type.flatIndexes;},generateStructInfo:function(struct,typeName,offset){var type,alignment;if(typeName){offset=offset||0;type=(typeof Types==='undefined'?Runtime.typeInfo:Types.types)[typeName];if(!type)return null;if(type.fields.length!=struct.length){printErr('Number of named fields must match the type for '+typeName+': possibly duplicate struct names. Cannot return structInfo');return null;}
alignment=type.flatIndexes;}else{var type={fields:struct.map(function(item){return item[0]})};alignment=Runtime.calculateStructAlignment(type);}
var ret={__size__:type.flatSize};if(typeName){struct.forEach(function(item,i){if(typeof item==='string'){ret[item]=alignment[i]+offset;}else{var key;for(var k in item)key=k;ret[key]=Runtime.generateStructInfo(item[key],type.fields[i],alignment[i]);}});}else{struct.forEach(function(item,i){ret[item[1]]=alignment[i];});}
return ret;},dynCall:function(sig,ptr,args){if(args&&args.length){assert(args.length==sig.length-1);return FUNCTION_TABLE[ptr].apply(null,args);}else{assert(sig.length==1);return FUNCTION_TABLE[ptr]();}},addFunction:function(func){var table=FUNCTION_TABLE;var ret=table.length;table.push(func);table.push(0);return ret;},removeFunction:function(index){var table=FUNCTION_TABLE;table[index]=null;},warnOnce:function(text){if(!Runtime.warnOnce.shown)Runtime.warnOnce.shown={};if(!Runtime.warnOnce.shown[text]){Runtime.warnOnce.shown[text]=1;Module.printErr(text);}},funcWrappers:{},getFuncWrapper:function(func,sig){assert(sig);if(!Runtime.funcWrappers[func]){Runtime.funcWrappers[func]=function(){return Runtime.dynCall(sig,func,arguments);};}
return Runtime.funcWrappers[func];},UTF8Processor:function(){var buffer=[];var needed=0;this.processCChar=function(code){code=code&0xFF;if(buffer.length==0){if((code&0x80)==0x00){return String.fromCharCode(code);}
buffer.push(code);if((code&0xE0)==0xC0){needed=1;}else if((code&0xF0)==0xE0){needed=2;}else{needed=3;}
return'';}
if(needed){buffer.push(code);needed--;if(needed>0)return'';}
var c1=buffer[0];var c2=buffer[1];var c3=buffer[2];var c4=buffer[3];var ret;if(buffer.length==2){ret=String.fromCharCode(((c1&0x1F)<<6)|(c2&0x3F));}else if(buffer.length==3){ret=String.fromCharCode(((c1&0x0F)<<12)|((c2&0x3F)<<6)|(c3&0x3F));}else{var codePoint=((c1&0x07)<<18)|((c2&0x3F)<<12)|((c3&0x3F)<<6)|(c4&0x3F);ret=String.fromCharCode(Math.floor((codePoint-0x10000)/0x400)+0xD800,(codePoint-0x10000)%0x400+0xDC00);}
buffer.length=0;return ret;}
this.processJSString=function(string){string=unescape(encodeURIComponent(string));var ret=[];for(var i=0;i<string.length;i++){ret.push(string.charCodeAt(i));}
return ret;}},stackAlloc:function(size){var ret=STACKTOP;STACKTOP=(STACKTOP+size)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);return ret;},staticAlloc:function(size){var ret=STATICTOP;STATICTOP=(STATICTOP+(assert(!staticSealed),size))|0;STATICTOP=((((STATICTOP)+7)>>3)<<3);return ret;},dynamicAlloc:function(size){var ret=DYNAMICTOP;DYNAMICTOP=(DYNAMICTOP+(assert(DYNAMICTOP>0),size))|0;DYNAMICTOP=((((DYNAMICTOP)+7)>>3)<<3);if(DYNAMICTOP>=TOTAL_MEMORY)enlargeMemory();;return ret;},alignMemory:function(size,quantum){var ret=size=Math.ceil((size)/(quantum?quantum:8))*(quantum?quantum:8);return ret;},makeBigInt:function(low,high,unsigned){var ret=(unsigned?(((low)>>>(0))+(((high)>>>(0))*4294967296)):(((low)>>>(0))+(((high)|(0))*4294967296)));return ret;},GLOBAL_BASE:8,QUANTUM_SIZE:4,__dummy__:0}
var __THREW__=0;var setjmpId=1;var setjmpLabels={};var ABORT=false;var EXITSTATUS=0;var undef=0;var tempValue,tempInt,tempBigInt,tempInt2,tempBigInt2,tempPair,tempBigIntI,tempBigIntR,tempBigIntS,tempBigIntP,tempBigIntD;var tempI64,tempI64b;var tempRet0,tempRet1,tempRet2,tempRet3,tempRet4,tempRet5,tempRet6,tempRet7,tempRet8,tempRet9;function assert(condition,text){if(!condition){abort('Assertion failed: '+text);}}
var globalScope=this;function ccall(ident,returnType,argTypes,args){return ccallFunc(getCFunc(ident),returnType,argTypes,args);}
Module["ccall"]=ccall;function getCFunc(ident){try{var func=Module['_'+ident];if(!func)func=eval('_'+ident);}catch(e){}
assert(func,'Cannot call unknown function '+ident+' (perhaps LLVM optimizations or closure removed it?)');return func;}
function ccallFunc(func,returnType,argTypes,args){var stack=0;function toC(value,type){if(type=='string'){if(value===null||value===undefined||value===0)return 0;if(!stack)stack=Runtime.stackSave();var ret=Runtime.stackAlloc(value.length+1);writeStringToMemory(value,ret);return ret;}else if(type=='array'){if(!stack)stack=Runtime.stackSave();var ret=Runtime.stackAlloc(value.length);writeArrayToMemory(value,ret);return ret;}
return value;}
function fromC(value,type){if(type=='string'){return Pointer_stringify(value);}
assert(type!='array');return value;}
var i=0;var cArgs=args?args.map(function(arg){return toC(arg,argTypes[i++]);}):[];var ret=fromC(func.apply(null,cArgs),returnType);if(stack)Runtime.stackRestore(stack);return ret;}
function cwrap(ident,returnType,argTypes){var func=getCFunc(ident); return function(){ ccallFunc(func,returnType,argTypes,Array.prototype.slice.call(arguments)); return retVal;}}
Module["cwrap"]=cwrap;function setValue(ptr,value,type,noSafe){type=type||'i8';if(type.charAt(type.length-1)==='*')type='i32';switch(type){case'i1':HEAP8[(ptr)]=value;break;case'i8':HEAP8[(ptr)]=value;break;case'i16':HEAP16[((ptr)>>1)]=value;break;case'i32':HEAP32[((ptr)>>2)]=value;break;case'i64':(tempI64=[value>>>0,(tempDouble=value,Math.abs(tempDouble)>=1?(tempDouble>0?Math.min(Math.floor((tempDouble)/4294967296),4294967295)>>>0:(~~(Math.ceil((tempDouble-+(((~~(tempDouble)))>>>0))/4294967296)))>>>0):0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]);break;case'float':HEAPF32[((ptr)>>2)]=value;break;case'double':HEAPF64[((ptr)>>3)]=value;break;default:abort('invalid type for setValue: '+type);}}
Module['setValue']=setValue;function getValue(ptr,type,noSafe){type=type||'i8';if(type.charAt(type.length-1)==='*')type='i32';switch(type){case'i1':return HEAP8[(ptr)];case'i8':return HEAP8[(ptr)];case'i16':return HEAP16[((ptr)>>1)];case'i32':return HEAP32[((ptr)>>2)];case'i64':return HEAP32[((ptr)>>2)];case'float':return HEAPF32[((ptr)>>2)];case'double':return HEAPF64[((ptr)>>3)];default:abort('invalid type for setValue: '+type);}
return null;}
Module['getValue']=getValue;var ALLOC_NORMAL=0;var ALLOC_STACK=1;var ALLOC_STATIC=2;var ALLOC_DYNAMIC=3;var ALLOC_NONE=4;Module['ALLOC_NORMAL']=ALLOC_NORMAL;Module['ALLOC_STACK']=ALLOC_STACK;Module['ALLOC_STATIC']=ALLOC_STATIC;Module['ALLOC_DYNAMIC']=ALLOC_DYNAMIC;Module['ALLOC_NONE']=ALLOC_NONE;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==='number'){zeroinit=true;size=slab;}else{zeroinit=false;size=slab.length;}
var singleType=typeof types==='string'?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr;}else{ret=[_malloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length));}
if(zeroinit){var ptr=ret,stop;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[((ptr)>>2)]=0;}
stop=ret+size;while(ptr<stop){HEAP8[((ptr++)|0)]=0;}
return ret;}
if(singleType==='i8'){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret);}else{HEAPU8.set(new Uint8Array(slab),ret);}
return ret;}
var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];if(typeof curr==='function'){curr=Runtime.getFunctionIndex(curr);}
type=singleType||types[i];if(type===0){i++;continue;}
assert(type,'Must know what type to store in allocate!');if(type=='i64')type='i32';setValue(ret+i,curr,type);if(previousType!==type){typeSize=Runtime.getNativeTypeSize(type);previousType=type;}
i+=typeSize;}
return ret;}
Module['allocate']=allocate;function Pointer_stringify(ptr,length){var hasUtf=false;var t;var i=0;while(1){assert(ptr+i<TOTAL_MEMORY);t=HEAPU8[(((ptr)+(i))|0)];if(t>=128)hasUtf=true;else if(t==0&&!length)break;i++;if(length&&i==length)break;}
if(!length)length=i;var ret='';if(!hasUtf){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK;}
return ret;}
var utf8=new Runtime.UTF8Processor();for(i=0;i<length;i++){assert(ptr+i<TOTAL_MEMORY);t=HEAPU8[(((ptr)+(i))|0)];ret+=utf8.processCChar(t);}
return ret;}
Module['Pointer_stringify']=Pointer_stringify;function UTF16ToString(ptr){var i=0;var str='';while(1){var codeUnit=HEAP16[(((ptr)+(i*2))>>1)];if(codeUnit==0)
return str;++i;str+=String.fromCharCode(codeUnit);}}
Module['UTF16ToString']=UTF16ToString;function stringToUTF16(str,outPtr){for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);HEAP16[(((outPtr)+(i*2))>>1)]=codeUnit}
HEAP16[(((outPtr)+(str.length*2))>>1)]=0}
Module['stringToUTF16']=stringToUTF16;function UTF32ToString(ptr){var i=0;var str='';while(1){var utf32=HEAP32[(((ptr)+(i*4))>>2)];if(utf32==0)
return str;++i;if(utf32>=0x10000){var ch=utf32-0x10000;str+=String.fromCharCode(0xD800|(ch>>10),0xDC00|(ch&0x3FF));}else{str+=String.fromCharCode(utf32);}}}
Module['UTF32ToString']=UTF32ToString;function stringToUTF32(str,outPtr){var iChar=0;for(var iCodeUnit=0;iCodeUnit<str.length;++iCodeUnit){var codeUnit=str.charCodeAt(iCodeUnit);if(codeUnit>=0xD800&&codeUnit<=0xDFFF){var trailSurrogate=str.charCodeAt(++iCodeUnit);codeUnit=0x10000+((codeUnit&0x3FF)<<10)|(trailSurrogate&0x3FF);}
HEAP32[(((outPtr)+(iChar*4))>>2)]=codeUnit
++iChar;}
HEAP32[(((outPtr)+(iChar*4))>>2)]=0}
Module['stringToUTF32']=stringToUTF32;var PAGE_SIZE=4096;function alignMemoryPage(x){return((x+4095)>>12)<<12;}
var HEAP;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;var STATIC_BASE=0,STATICTOP=0,staticSealed=false;var STACK_BASE=0,STACKTOP=0,STACK_MAX=0;var DYNAMIC_BASE=0,DYNAMICTOP=0;function enlargeMemory(){abort('Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value '+TOTAL_MEMORY+', (2) compile with ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.');}
var TOTAL_STACK=Module['TOTAL_STACK']||5242880;var TOTAL_MEMORY=Module['TOTAL_MEMORY']||16777216;var FAST_MEMORY=Module['FAST_MEMORY']||2097152;assert(!!Int32Array&&!!Float64Array&&!!(new Int32Array(1)['subarray'])&&!!(new Int32Array(1)['set']),'Cannot fallback to non-typed array case: Code is too specialized');var buffer=new ArrayBuffer(TOTAL_MEMORY);HEAP8=new Int8Array(buffer);HEAP16=new Int16Array(buffer);HEAP32=new Int32Array(buffer);HEAPU8=new Uint8Array(buffer);HEAPU16=new Uint16Array(buffer);HEAPU32=new Uint32Array(buffer);HEAPF32=new Float32Array(buffer);HEAPF64=new Float64Array(buffer);HEAP32[0]=255;assert(HEAPU8[0]===255&&HEAPU8[3]===0,'Typed arrays 2 must be run on a little-endian system');Module['HEAP']=HEAP;Module['HEAP8']=HEAP8;Module['HEAP16']=HEAP16;Module['HEAP32']=HEAP32;Module['HEAPU8']=HEAPU8;Module['HEAPU16']=HEAPU16;Module['HEAPU32']=HEAPU32;Module['HEAPF32']=HEAPF32;Module['HEAPF64']=HEAPF64;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=='function'){callback();continue;}
var func=callback.func;if(typeof func==='number'){if(callback.arg===undefined){Runtime.dynCall('v',func);}else{Runtime.dynCall('vi',func,[callback.arg]);}}else{func(callback.arg===undefined?null:callback.arg);}}}
var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module['preRun']){if(typeof Module['preRun']=='function')Module['preRun']=[Module['preRun']];while(Module['preRun'].length){addOnPreRun(Module['preRun'].shift());}}
callRuntimeCallbacks(__ATPRERUN__);}
function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__);}
function preMain(){callRuntimeCallbacks(__ATMAIN__);}
function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);}
function postRun(){if(Module['postRun']){if(typeof Module['postRun']=='function')Module['postRun']=[Module['postRun']];while(Module['postRun'].length){addOnPostRun(Module['postRun'].shift());}}
callRuntimeCallbacks(__ATPOSTRUN__);}
function addOnPreRun(cb){__ATPRERUN__.unshift(cb);}
Module['addOnPreRun']=Module.addOnPreRun=addOnPreRun;function addOnInit(cb){__ATINIT__.unshift(cb);}
Module['addOnInit']=Module.addOnInit=addOnInit;function addOnPreMain(cb){__ATMAIN__.unshift(cb);}
Module['addOnPreMain']=Module.addOnPreMain=addOnPreMain;function addOnExit(cb){__ATEXIT__.unshift(cb);}
Module['addOnExit']=Module.addOnExit=addOnExit;function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb);}
Module['addOnPostRun']=Module.addOnPostRun=addOnPostRun;function intArrayFromString(stringy,dontAddNull,length){var ret=(new Runtime.UTF8Processor()).processJSString(stringy);if(length){ret.length=length;}
if(!dontAddNull){ret.push(0);}
return ret;}
Module['intArrayFromString']=intArrayFromString;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>0xFF){assert(false,'Character code '+chr+' ('+String.fromCharCode(chr)+')  at offset '+i+' not in 0x00-0xFF.');chr&=0xFF;}
ret.push(String.fromCharCode(chr));}
return ret.join('');}
Module['intArrayToString']=intArrayToString;function writeStringToMemory(string,buffer,dontAddNull){var array=intArrayFromString(string,dontAddNull);var i=0;while(i<array.length){var chr=array[i];HEAP8[(((buffer)+(i))|0)]=chr
i=i+1;}}
Module['writeStringToMemory']=writeStringToMemory;function writeArrayToMemory(array,buffer){for(var i=0;i<array.length;i++){HEAP8[(((buffer)+(i))|0)]=array[i];}}
Module['writeArrayToMemory']=writeArrayToMemory;function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;i++){assert(str.charCodeAt(i)===str.charCodeAt(i)&0xff);HEAP8[(((buffer)+(i))|0)]=str.charCodeAt(i)}
if(!dontAddNull)HEAP8[(((buffer)+(str.length))|0)]=0}
Module['writeAsciiToMemory']=writeAsciiToMemory;function unSign(value,bits,ignore,sig){if(value>=0){return value;}
return bits<=32?2*Math.abs(1<<(bits-1))+value:Math.pow(2,bits)+value;}
function reSign(value,bits,ignore,sig){if(value<=0){return value;}
var half=bits<=32?Math.abs(1<<(bits-1)):Math.pow(2,bits-1);if(value>=half&&(bits<=32||value>half)){value=-2*half+value;}
return value;}
if(!Math['imul'])Math['imul']=function(a,b){var ah=a>>>16;var al=a&0xffff;var bh=b>>>16;var bl=b&0xffff;return(al*bl+((ah*bl+al*bh)<<16))|0;};Math.imul=Math['imul'];var runDependencies=0;var runDependencyTracking={};var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module['monitorRunDependencies']){Module['monitorRunDependencies'](runDependencies);}
if(id){assert(!runDependencyTracking[id]);runDependencyTracking[id]=1;if(runDependencyWatcher===null&&typeof setInterval!=='undefined'){runDependencyWatcher=setInterval(function(){var shown=false;for(var dep in runDependencyTracking){if(!shown){shown=true;Module.printErr('still waiting on run dependencies:');}
Module.printErr('dependency: '+dep);}
if(shown){Module.printErr('(end of list)');}},10000);}}else{Module.printErr('warning: run dependency added without ID');}}
Module['addRunDependency']=addRunDependency;function removeRunDependency(id){runDependencies--;if(Module['monitorRunDependencies']){Module['monitorRunDependencies'](runDependencies);}
if(id){assert(runDependencyTracking[id]);delete runDependencyTracking[id];}else{Module.printErr('warning: run dependency removed without ID');}
if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null;}
if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback();}}}
Module['removeRunDependency']=removeRunDependency;Module["preloadedImages"]={};Module["preloadedAudios"]={};var memoryInitializer=null;STATIC_BASE=8;STATICTOP=STATIC_BASE+2840;var _stdout;var _stdout=_stdout=allocate([0,0,0,0,0,0,0,0],"i8",ALLOC_STATIC);__ATINIT__.push({func:function(){runPostSets()}},{func:function(){__GLOBAL__I_a()}},{func:function(){__GLOBAL__I_a85()}});var __ZN6SolverC1Ev;var __ZN6SolverD1Ev;allocate([102,105,110,100,40,119,97,116,99,104,101,115,91,116,111,73,110,116,40,126,99,91,49,93,41,93,44,32,38,99,41,0,77,101,109,111,114,121,32,117,115,101,100,32,32,32,32,32,32,32,32,32,32,32,58,32,37,46,50,102,32,77,66,10,0,0,0,0,0,0,0,0,102,105,110,100,40,119,97,116,99,104,101,115,91,116,111,73,110,116,40,126,99,91,48,93,41,93,44,32,38,99,41,0,99,111,110,102,108,105,99,116,32,108,105,116,101,114,97,108,115,32,32,32,32,32,58,32,37,45,49,50,108,108,100,32,32,32,40,37,52,46,50,102,32,37,37,32,100,101,108,101,116,101,100,41,10,0,0,0,99,46,115,105,122,101,40,41,32,62,32,49,0,0,0,0,112,114,111,112,97,103,97,116,105,111,110,115,32,32,32,32,32,32,32,32,32,32,58,32,37,45,49,50,108,108,100,32,32,32,40,37,46,48,102,32,47,115,101,99,41,10,0,0,118,97,108,117,101,40,112,115,91,48,93,41,32,61,61,32,108,95,85,110,100,101,102,0,100,101,99,105,115,105,111,110,115,32,32,32,32,32,32,32,32,32,32,32,32,32,58,32,37,45,49,50,108,108,100,32,32,32,40,37,52,46,50,102,32,37,37,32,114,97,110,100,111,109,41,32,40,37,46,48,102,32,47,115,101,99,41,10,0,0,0,0,0,0,0,0,83,111,108,118,101,114,46,99,112,112,0,0,0,0,0,0,99,111,110,102,108,105,99,116,115,32,32,32,32,32,32,32,32,32,32,32,32,32,58,32,37,45,49,50,108,108,100,32,32,32,40,37,46,48,102,32,47,115,101,99,41,10,0,0,33,105,110,72,101,97,112,40,110,41,0,0,0,0,0,0,105,110,72,101,97,112,40,110,41,0,0,0,0,0,0,0,46,47,65,108,103,46,104,0,106,32,60,32,116,115,46,115,105,122,101,40,41,0,0,0,105,110,100,101,120,32,60,32,104,101,97,112,46,115,105,122,101,40,41,0,0,0,0,0,46,47,86,101,99,46,104,0,110,101,108,101,109,115,32,60,61,32,115,122,0,0,0,0,46,47,72,101,97,112,46,104,0,0,0,0,0,0,0,0,100,101,99,105,115,105,111,110,76,101,118,101,108,40,41,32,61,61,32,48,0,0,0,0,104,101,97,112,80,114,111,112,101,114,116,121,40,41,0,0,80,65,82,83,69,32,69,82,82,79,82,33,32,85,110,101,120,112,101,99,116,101,100,32,99,104,97,114,58,32,37,99,10,0,0,0,0,0,0,0,124,32,32,78,117,109,98,101,114,32,111,102,32,99,108,97,117,115,101,115,58,32,32,32,32,37,45,49,50,100,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,124,10,0,0,0,0,0,0,0,45,0,0,0,0,0,0,0,124,32,32,78,117,109,98,101,114,32,111,102,32,118,97,114,105,97,98,108,101,115,58,32,32,37,45,49,50,100,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,124,10,0,0,0,0,0,0,0,37,115,37,100,58,37,99,0,112,32,99,110,102,0,0,0,32,0,0,0,0,0,0,0,85,78,83,65,84,10,0,0,32,48,10,0,0,0,0,0,86,101,114,105,102,105,101,100,32,37,100,32,111,114,105,103,105,110,97,108,32,99,108,97,117,115,101,115,46,10,0,0,45,0,0,0,0,0,0,0,33,102,97,105,108,101,100,0,32,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,117,110,115,97,116,105,115,102,105,101,100,32,99,108,97,117,115,101,58,32,0,0,0,0,37,115,37,115,37,100,0,0,99,108,97,117,115,101,115,91,105,93,45,62,109,97,114,107,40,41,32,61,61,32,48,0,118,32,0,0,0,0,0,0,115,116,97,116,117,115,32,61,61,32,108,95,70,97,108,115,101,0,0,0,0,0,0,0,83,65,84,73,83,70,73,65,66,76,69,10,0,0,0,0,124,32,37,57,100,32,124,32,37,55,100,32,37,56,100,32,37,56,100,32,124,32,37,56,100,32,37,56,100,32,37,54,46,48,102,32,124,32,37,54,46,51,102,32,37,37,32,124,10,0,0,0,0,0,0,0,85,78,83,65,84,73,83,70,73,65,66,76,69,10,0,0,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,10,0,0,0,0,0,0,0,0,83,111,108,118,101,100,32,98,121,32,117,110,105,116,32,112,114,111,112,97,103,97,116,105,111,110,10,0,0,0,0,0,124,32,32,32,32,32,32,32,32,32,32,32,124,32,32,32,32,86,97,114,115,32,32,67,108,97,117,115,101,115,32,76,105,116,101,114,97,108,115,32,124,32,32,32,32,76,105,109,105,116,32,32,67,108,97,117,115,101,115,32,76,105,116,47,67,108,32,124,32,32,32,32,32,32,32,32,32,32,124,10,0,0,0,0,0,0,0,0,124,32,32,80,97,114,115,105,110,103,32,116,105,109,101,58,32,32,32,32,32,32,32,32,32,37,45,49,50,46,50,102,32,115,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,124,10,0,0,0,0,0,124,32,67,111,110,102,108,105,99,116,115,32,124,32,32,32,32,32,32,32,32,32,32,79,82,73,71,73,78,65,76,32,32,32,32,32,32,32,32,32,124,32,32,32,32,32,32,32,32,32,32,76,69,65,82,78,84,32,32,32,32,32,32,32,32,32,32,124,32,80,114,111,103,114,101,115,115,32,124,10,0,0,0,0,0,0,0,0,124,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,124,10,0,0,0,0,0,0,0,0,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,91,32,83,101,97,114,99,104,32,83,116,97,116,105,115,116,105,99,115,32,93,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,10,0,0,0,0,0,0,0,0,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,91,32,80,114,111,98,108,101,109,32,83,116,97,116,105,115,116,105,99,115,32,93,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,10,0,0,0,0,0,0,0,0,118,97,108,117,101,40,110,101,120,116,41,32,61,61,32,108,95,85,110,100,101,102,0,0,84,104,105,115,32,105,115,32,77,105,110,105,83,97,116,32,50,46,48,32,98,101,116,97,10,0,0,0,0,0,0,0,118,97,108,117,101,40,108,101,97,114,110,116,95,99,108,97,117,115,101,91,48,93,41,32,61,61,32,108,95,85,110,100,101,102,0,0,0,0,0,0,10,0,0,0,0,0,0,0,111,107,0,0,0,0,0,0,99,91,49,93,32,61,61,32,102,97,108,115,101,95,108,105,116,0,0,0,0,0,0,0,118,97,108,117,101,40,112,41,32,61,61,32,108,95,85,110,100,101,102,0,0,0,0,0,108,101,118,101,108,91,120,93,32,62,32,48,0,0,0,0,114,101,97,115,111,110,91,118,97,114,40,97,110,97,108,121,122,101,95,115,116,97,99,107,46,108,97,115,116,40,41,41,93,32,33,61,32,78,85,76,76,0,0,0,0,0,0,0,99,111,110,102,108,32,33,61,32,78,85,76,76,0,0,0,102,97,108,115,101,0,0,0,67,80,85,32,116,105,109,101,32,32,32,32,32,32,32,32,32,32,32,32,32,32,58,32,37,103,32,115,10,0,0,0,114,101,115,116,97,114,116,115,32,32,32,32,32,32,32,32,32,32,32,32,32,32,58,32,37,108,108,100,10,0,0,0,111,112,101,114,97,116,111,114,91,93,0,0,0,0,0,0,112,114,111,112,97,103,97,116,101,0,0,0,0,0,0,0,97,100,100,67,108,97,117,115,101,0,0,0,0,0,0,0,115,105,109,112,108,105,102,121,0,0,0,0,0,0,0,0,97,110,97,108,121,122,101,0,115,101,97,114,99,104,0,0,115,111,108,118,101,0,0,0,117,110,99,104,101,99,107,101,100,69,110,113,117,101,117,101,0,0,0,0,0,0,0,0,112,105,99,107,66,114,97,110,99,104,76,105,116,0,0,0,108,105,116,82,101,100,117,110,100,97,110,116,0,0,0,0,100,101,116,97,99,104,67,108,97,117,115,101,0,0,0,0,97,116,116,97,99,104,67,108,97,117,115,101,0,0,0,0,97,110,97,108,121,122,101,70,105,110,97,108,0,0,0,0,118,101,114,105,102,121,77,111,100,101,108,0,0,0,0,0,100,101,99,114,101,97,115,101,0,0,0,0,0,0,0,0,105,110,115,101,114,116,0,0,102,105,108,116,101,114,0,0,115,104,114,105,110,107,0,0,114,101,109,111,118,101,0,0],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE)
function runPostSets(){}
var tempDoublePtr=Runtime.alignMemory(allocate(12,"i8",ALLOC_STATIC),8);assert(tempDoublePtr%8==0);function copyTempFloat(ptr){HEAP8[tempDoublePtr]=HEAP8[ptr];HEAP8[tempDoublePtr+1]=HEAP8[ptr+1];HEAP8[tempDoublePtr+2]=HEAP8[ptr+2];HEAP8[tempDoublePtr+3]=HEAP8[ptr+3];}
function copyTempDouble(ptr){HEAP8[tempDoublePtr]=HEAP8[ptr];HEAP8[tempDoublePtr+1]=HEAP8[ptr+1];HEAP8[tempDoublePtr+2]=HEAP8[ptr+2];HEAP8[tempDoublePtr+3]=HEAP8[ptr+3];HEAP8[tempDoublePtr+4]=HEAP8[ptr+4];HEAP8[tempDoublePtr+5]=HEAP8[ptr+5];HEAP8[tempDoublePtr+6]=HEAP8[ptr+6];HEAP8[tempDoublePtr+7]=HEAP8[ptr+7];}
var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};var ___errno_state=0;function ___setErrNo(value){HEAP32[((___errno_state)>>2)]=value
return value;}
var VFS=undefined;var PATH={splitPath:function(filename){var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;return splitPathRe.exec(filename).slice(1);},normalizeArray:function(parts,allowAboveRoot){var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==='.'){parts.splice(i,1);}else if(last==='..'){parts.splice(i,1);up++;}else if(up){parts.splice(i,1);up--;}}
if(allowAboveRoot){for(;up--;up){parts.unshift('..');}}
return parts;},normalize:function(path){var isAbsolute=path.charAt(0)==='/',trailingSlash=path.substr(-1)==='/';path=PATH.normalizeArray(path.split('/').filter(function(p){return!!p;}),!isAbsolute).join('/');if(!path&&!isAbsolute){path='.';}
if(path&&trailingSlash){path+='/';}
return(isAbsolute?'/':'')+path;},dirname:function(path){var result=PATH.splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){return'.';}
if(dir){dir=dir.substr(0,dir.length-1);}
return root+dir;},basename:function(path,ext){if(path==='/')return'/';var f=PATH.splitPath(path)[2];if(ext&&f.substr(-1*ext.length)===ext){f=f.substr(0,f.length-ext.length);}
return f;},extname:function(path){return PATH.splitPath(path)[3];},join:function(){var paths=Array.prototype.slice.call(arguments,0);return PATH.normalize(paths.filter(function(p,index){if(typeof p!=='string'){throw new TypeError('Arguments to path.join must be strings');}
return p;}).join('/'));},resolve:function(){var resolvedPath='',resolvedAbsolute=false;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path=(i>=0)?arguments[i]:FS.cwd();if(typeof path!=='string'){throw new TypeError('Arguments to path.resolve must be strings');}else if(!path){continue;}
resolvedPath=path+'/'+resolvedPath;resolvedAbsolute=path.charAt(0)==='/';}
resolvedPath=PATH.normalizeArray(resolvedPath.split('/').filter(function(p){return!!p;}),!resolvedAbsolute).join('/');return((resolvedAbsolute?'/':'')+resolvedPath)||'.';},relative:function(from,to){from=PATH.resolve(from).substr(1);to=PATH.resolve(to).substr(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!=='')break;}
var end=arr.length-1;for(;end>=0;end--){if(arr[end]!=='')break;}
if(start>end)return[];return arr.slice(start,end-start+1);}
var fromParts=trim(from.split('/'));var toParts=trim(to.split('/'));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break;}}
var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push('..');}
outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join('/');}};var TTY={ttys:[],init:function(){},shutdown:function(){},register:function(dev,ops){TTY.ttys[dev]={input:[],output:[],ops:ops};FS.registerDevice(dev,TTY.stream_ops);},stream_ops:{open:function(stream){var tty=TTY.ttys[stream.node.rdev];if(!tty){throw new FS.ErrnoError(ERRNO_CODES.ENODEV);}
stream.tty=tty;stream.seekable=false;},close:function(stream){if(stream.tty.output.length){stream.tty.ops.put_char(stream.tty,10);}},read:function(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.get_char){throw new FS.ErrnoError(ERRNO_CODES.ENXIO);}
var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=stream.tty.ops.get_char(stream.tty);}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EIO);}
if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);}
if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result;}
if(bytesRead){stream.node.timestamp=Date.now();}
return bytesRead;},write:function(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.put_char){throw new FS.ErrnoError(ERRNO_CODES.ENXIO);}
for(var i=0;i<length;i++){try{stream.tty.ops.put_char(stream.tty,buffer[offset+i]);}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EIO);}}
if(length){stream.node.timestamp=Date.now();}
return i;}},default_tty_ops:{get_char:function(tty){if(!tty.input.length){var result=null;if(ENVIRONMENT_IS_NODE){result=process['stdin']['read']();if(!result){if(process['stdin']['_readableState']&&process['stdin']['_readableState']['ended']){return null;}
return undefined;}}else if(typeof window!='undefined'&&typeof window.prompt=='function'){result=window.prompt('Input: ');if(result!==null){result+='\n';}}else if(typeof readline=='function'){result=readline();if(result!==null){result+='\n';}}
if(!result){return null;}
tty.input=intArrayFromString(result,true);}
return tty.input.shift();},put_char:function(tty,val){if(val===null||val===10){Module['print'](tty.output.join(''));tty.output=[];}else{tty.output.push(TTY.utf8.processCChar(val));}}},default_tty1_ops:{put_char:function(tty,val){if(val===null||val===10){Module['printErr'](tty.output.join(''));tty.output=[];}else{tty.output.push(TTY.utf8.processCChar(val));}}}};var MEMFS={CONTENT_OWNING:1,CONTENT_FLEXIBLE:2,CONTENT_FIXED:3,ensureFlexible:function(node){if(node.contentMode!==MEMFS.CONTENT_FLEXIBLE){var contents=node.contents;node.contents=Array.prototype.slice.call(contents);node.contentMode=MEMFS.CONTENT_FLEXIBLE;}},mount:function(mount){return MEMFS.create_node(null,'/',16384|0777,0);},create_node:function(parent,name,mode,dev){if(FS.isBlkdev(mode)||FS.isFIFO(mode)){throw new FS.ErrnoError(ERRNO_CODES.EPERM);}
var node=FS.createNode(parent,name,mode,dev);if(FS.isDir(node.mode)){node.node_ops={getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,lookup:MEMFS.node_ops.lookup,mknod:MEMFS.node_ops.mknod,mknod:MEMFS.node_ops.mknod,rename:MEMFS.node_ops.rename,unlink:MEMFS.node_ops.unlink,rmdir:MEMFS.node_ops.rmdir,readdir:MEMFS.node_ops.readdir,symlink:MEMFS.node_ops.symlink};node.stream_ops={llseek:MEMFS.stream_ops.llseek};node.contents={};}else if(FS.isFile(node.mode)){node.node_ops={getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr};node.stream_ops={llseek:MEMFS.stream_ops.llseek,read:MEMFS.stream_ops.read,write:MEMFS.stream_ops.write,allocate:MEMFS.stream_ops.allocate,mmap:MEMFS.stream_ops.mmap};node.contents=[];node.contentMode=MEMFS.CONTENT_FLEXIBLE;}else if(FS.isLink(node.mode)){node.node_ops={getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,readlink:MEMFS.node_ops.readlink};node.stream_ops={};}else if(FS.isChrdev(node.mode)){node.node_ops={getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr};node.stream_ops=FS.chrdev_stream_ops;}
node.timestamp=Date.now();if(parent){parent.contents[name]=node;}
return node;},node_ops:{getattr:function(node){var attr={};attr.dev=FS.isChrdev(node.mode)?node.id:1;attr.ino=node.id;attr.mode=node.mode;attr.nlink=1;attr.uid=0;attr.gid=0;attr.rdev=node.rdev;if(FS.isDir(node.mode)){attr.size=4096;}else if(FS.isFile(node.mode)){attr.size=node.contents.length;}else if(FS.isLink(node.mode)){attr.size=node.link.length;}else{attr.size=0;}
attr.atime=new Date(node.timestamp);attr.mtime=new Date(node.timestamp);attr.ctime=new Date(node.timestamp);attr.blksize=4096;attr.blocks=Math.ceil(attr.size/attr.blksize);return attr;},setattr:function(node,attr){if(attr.mode!==undefined){node.mode=attr.mode;}
if(attr.timestamp!==undefined){node.timestamp=attr.timestamp;}
if(attr.size!==undefined){MEMFS.ensureFlexible(node);var contents=node.contents;if(attr.size<contents.length)contents.length=attr.size;else while(attr.size>contents.length)contents.push(0);}},lookup:function(parent,name){throw new FS.ErrnoError(ERRNO_CODES.ENOENT);},mknod:function(parent,name,mode,dev){return MEMFS.create_node(parent,name,mode,dev);},rename:function(old_node,new_dir,new_name){if(FS.isDir(old_node.mode)){var new_node;try{new_node=FS.lookupNode(new_dir,new_name);}catch(e){}
if(new_node){for(var i in new_node.contents){throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);}}}
delete old_node.parent.contents[old_node.name];old_node.name=new_name;new_dir.contents[new_name]=old_node;},unlink:function(parent,name){delete parent.contents[name];},rmdir:function(parent,name){var node=FS.lookupNode(parent,name);for(var i in node.contents){throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);}
delete parent.contents[name];},readdir:function(node){var entries=['.','..']
for(var key in node.contents){if(!node.contents.hasOwnProperty(key)){continue;}
entries.push(key);}
return entries;},symlink:function(parent,newname,oldpath){var node=MEMFS.create_node(parent,newname,0777|40960,0);node.link=oldpath;return node;},readlink:function(node){if(!FS.isLink(node.mode)){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}
return node.link;}},stream_ops:{read:function(stream,buffer,offset,length,position){var contents=stream.node.contents;if(position>=contents.length)
return 0;var size=Math.min(contents.length-position,length);assert(size>=0);if(size>8&&contents.subarray){buffer.set(contents.subarray(position,position+size),offset);}else
{for(var i=0;i<size;i++){buffer[offset+i]=contents[position+i];}}
return size;},write:function(stream,buffer,offset,length,position,canOwn){var node=stream.node;node.timestamp=Date.now();var contents=node.contents;if(length&&contents.length===0&&position===0&&buffer.subarray){assert(buffer.length);if(canOwn&&buffer.buffer===HEAP8.buffer&&offset===0){node.contents=buffer;node.contentMode=MEMFS.CONTENT_OWNING;}else{node.contents=new Uint8Array(buffer.subarray(offset,offset+length));node.contentMode=MEMFS.CONTENT_FIXED;}
return length;}
MEMFS.ensureFlexible(node);var contents=node.contents;while(contents.length<position)contents.push(0);for(var i=0;i<length;i++){contents[position+i]=buffer[offset+i];}
return length;},llseek:function(stream,offset,whence){var position=offset;if(whence===1){position+=stream.position;}else if(whence===2){if(FS.isFile(stream.node.mode)){position+=stream.node.contents.length;}}
if(position<0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}
stream.ungotten=[];stream.position=position;return position;},allocate:function(stream,offset,length){MEMFS.ensureFlexible(stream.node);var contents=stream.node.contents;var limit=offset+length;while(limit>contents.length)contents.push(0);},mmap:function(stream,buffer,offset,length,position,prot,flags){if(!FS.isFile(stream.node.mode)){throw new FS.ErrnoError(ERRNO_CODES.ENODEV);}
var ptr;var allocated;var contents=stream.node.contents;if(!(flags&2)&&(contents.buffer===buffer||contents.buffer===buffer.buffer)){allocated=false;ptr=contents.byteOffset;}else{if(position>0||position+length<contents.length){if(contents.subarray){contents=contents.subarray(position,position+length);}else{contents=Array.prototype.slice.call(contents,position,position+length);}}
allocated=true;ptr=_malloc(length);if(!ptr){throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);}
buffer.set(contents,ptr);}
return{ptr:ptr,allocated:allocated};}}};var _stdin=allocate(1,"i32*",ALLOC_STATIC);var _stdout=allocate(1,"i32*",ALLOC_STATIC);var _stderr=allocate(1,"i32*",ALLOC_STATIC);function _fflush(stream){}var FS={root:null,devices:[null],streams:[null],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:function ErrnoError(errno){this.errno=errno;for(var key in ERRNO_CODES){if(ERRNO_CODES[key]===errno){this.code=key;break;}}
this.message=ERRNO_MESSAGES[errno];},handleFSError:function(e){if(!(e instanceof FS.ErrnoError))throw e+' : '+new Error().stack;return ___setErrNo(e.errno);},cwd:function(){return FS.currentPath;},lookupPath:function(path,opts){path=PATH.resolve(FS.currentPath,path);opts=opts||{recurse_count:0};if(opts.recurse_count>8){throw new FS.ErrnoError(ERRNO_CODES.ELOOP);}
var parts=PATH.normalizeArray(path.split('/').filter(function(p){return!!p;}),false);var current=FS.root;var current_path='/';for(var i=0;i<parts.length;i++){var islast=(i===parts.length-1);if(islast&&opts.parent){break;}
current=FS.lookupNode(current,parts[i]);current_path=PATH.join(current_path,parts[i]);if(FS.isMountpoint(current)){current=current.mount.root;}
if(!islast||opts.follow){var count=0;while(FS.isLink(current.mode)){var link=FS.readlink(current_path);current_path=PATH.resolve(PATH.dirname(current_path),link);var lookup=FS.lookupPath(current_path,{recurse_count:opts.recurse_count});current=lookup.node;if(count++>40){throw new FS.ErrnoError(ERRNO_CODES.ELOOP);}}}}
return{path:current_path,node:current};},getPath:function(node){var path;while(true){if(FS.isRoot(node)){return path?PATH.join(node.mount.mountpoint,path):node.mount.mountpoint;}
path=path?PATH.join(node.name,path):node.name;node=node.parent;}},hashName:function(parentid,name){var hash=0;for(var i=0;i<name.length;i++){hash=((hash<<5)-hash+name.charCodeAt(i))|0;}
return((parentid+hash)>>>0)%FS.nameTable.length;},hashAddNode:function(node){var hash=FS.hashName(node.parent.id,node.name);node.name_next=FS.nameTable[hash];FS.nameTable[hash]=node;},hashRemoveNode:function(node){var hash=FS.hashName(node.parent.id,node.name);if(FS.nameTable[hash]===node){FS.nameTable[hash]=node.name_next;}else{var current=FS.nameTable[hash];while(current){if(current.name_next===node){current.name_next=node.name_next;break;}
current=current.name_next;}}},lookupNode:function(parent,name){var err=FS.mayLookup(parent);if(err){throw new FS.ErrnoError(err);}
var hash=FS.hashName(parent.id,name);for(var node=FS.nameTable[hash];node;node=node.name_next){if(node.parent.id===parent.id&&node.name===name){return node;}}
return FS.lookup(parent,name);},createNode:function(parent,name,mode,rdev){var node={id:FS.nextInode++,name:name,mode:mode,node_ops:{},stream_ops:{},rdev:rdev,parent:null,mount:null};if(!parent){parent=node;}
node.parent=parent;node.mount=parent.mount;var readMode=292|73;var writeMode=146;Object.defineProperties(node,{read:{get:function(){return(node.mode&readMode)===readMode;},set:function(val){val?node.mode|=readMode:node.mode&=~readMode;}},write:{get:function(){return(node.mode&writeMode)===writeMode;},set:function(val){val?node.mode|=writeMode:node.mode&=~writeMode;}},isFolder:{get:function(){return FS.isDir(node.mode);},},isDevice:{get:function(){return FS.isChrdev(node.mode);},},});FS.hashAddNode(node);return node;},destroyNode:function(node){FS.hashRemoveNode(node);},isRoot:function(node){return node===node.parent;},isMountpoint:function(node){return node.mounted;},isFile:function(mode){return(mode&61440)===32768;},isDir:function(mode){return(mode&61440)===16384;},isLink:function(mode){return(mode&61440)===40960;},isChrdev:function(mode){return(mode&61440)===8192;},isBlkdev:function(mode){return(mode&61440)===24576;},isFIFO:function(mode){return(mode&61440)===4096;},isSocket:function(mode){return(mode&49152)===49152;},flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function(str){var flags=FS.flagModes[str];if(typeof flags==='undefined'){throw new Error('Unknown file open mode: '+str);}
return flags;},flagsToPermissionString:function(flag){var accmode=flag&2097155;var perms=['r','w','rw'][accmode];if((flag&512)){perms+='w';}
return perms;},nodePermissions:function(node,perms){if(FS.ignorePermissions){return 0;}
if(perms.indexOf('r')!==-1&&!(node.mode&292)){return ERRNO_CODES.EACCES;}else if(perms.indexOf('w')!==-1&&!(node.mode&146)){return ERRNO_CODES.EACCES;}else if(perms.indexOf('x')!==-1&&!(node.mode&73)){return ERRNO_CODES.EACCES;}
return 0;},mayLookup:function(dir){return FS.nodePermissions(dir,'x');},mayCreate:function(dir,name){try{var node=FS.lookupNode(dir,name);return ERRNO_CODES.EEXIST;}catch(e){}
return FS.nodePermissions(dir,'wx');},mayDelete:function(dir,name,isdir){var node;try{node=FS.lookupNode(dir,name);}catch(e){return e.errno;}
var err=FS.nodePermissions(dir,'wx');if(err){return err;}
if(isdir){if(!FS.isDir(node.mode)){return ERRNO_CODES.ENOTDIR;}
if(FS.isRoot(node)||FS.getPath(node)===FS.currentPath){return ERRNO_CODES.EBUSY;}}else{if(FS.isDir(node.mode)){return ERRNO_CODES.EISDIR;}}
return 0;},mayOpen:function(node,flags){if(!node){return ERRNO_CODES.ENOENT;}
if(FS.isLink(node.mode)){return ERRNO_CODES.ELOOP;}else if(FS.isDir(node.mode)){if((flags&2097155)!==0||(flags&512)){return ERRNO_CODES.EISDIR;}}
return FS.nodePermissions(node,FS.flagsToPermissionString(flags));},MAX_OPEN_FDS:4096,nextfd:function(fd_start,fd_end){fd_start=fd_start||1;fd_end=fd_end||FS.MAX_OPEN_FDS;for(var fd=fd_start;fd<=fd_end;fd++){if(!FS.streams[fd]){return fd;}}
throw new FS.ErrnoError(ERRNO_CODES.EMFILE);},getStream:function(fd){return FS.streams[fd];},createStream:function(stream,fd_start,fd_end){var fd=FS.nextfd(fd_start,fd_end);stream.fd=fd;Object.defineProperties(stream,{object:{get:function(){return stream.node;},set:function(val){stream.node=val;}},isRead:{get:function(){return(stream.flags&2097155)!==1;}},isWrite:{get:function(){return(stream.flags&2097155)!==0;}},isAppend:{get:function(){return(stream.flags&1024);}}});FS.streams[fd]=stream;return stream;},closeStream:function(fd){FS.streams[fd]=null;},chrdev_stream_ops:{open:function(stream){var device=FS.getDevice(stream.node.rdev);stream.stream_ops=device.stream_ops;if(stream.stream_ops.open){stream.stream_ops.open(stream);}},llseek:function(){throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);}},major:function(dev){return((dev)>>8);},minor:function(dev){return((dev)&0xff);},makedev:function(ma,mi){return((ma)<<8|(mi));},registerDevice:function(dev,ops){FS.devices[dev]={stream_ops:ops};},getDevice:function(dev){return FS.devices[dev];},mount:function(type,opts,mountpoint){var mount={type:type,opts:opts,mountpoint:mountpoint,root:null};var lookup;if(mountpoint){lookup=FS.lookupPath(mountpoint,{follow:false});}
var root=type.mount(mount);root.mount=mount;mount.root=root;if(lookup){lookup.node.mount=mount;lookup.node.mounted=true;if(mountpoint==='/'){FS.root=mount.root;}}
return root;},lookup:function(parent,name){return parent.node_ops.lookup(parent,name);},mknod:function(path,mode,dev){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);var err=FS.mayCreate(parent,name);if(err){throw new FS.ErrnoError(err);}
if(!parent.node_ops.mknod){throw new FS.ErrnoError(ERRNO_CODES.EPERM);}
return parent.node_ops.mknod(parent,name,mode,dev);},create:function(path,mode){mode=mode!==undefined?mode:0666;mode&=4095;mode|=32768;return FS.mknod(path,mode,0);},mkdir:function(path,mode){mode=mode!==undefined?mode:0777;mode&=511|512;mode|=16384;return FS.mknod(path,mode,0);},mkdev:function(path,mode,dev){if(typeof(dev)==='undefined'){dev=mode;mode=0666;}
mode|=8192;return FS.mknod(path,mode,dev);},symlink:function(oldpath,newpath){var lookup=FS.lookupPath(newpath,{parent:true});var parent=lookup.node;var newname=PATH.basename(newpath);var err=FS.mayCreate(parent,newname);if(err){throw new FS.ErrnoError(err);}
if(!parent.node_ops.symlink){throw new FS.ErrnoError(ERRNO_CODES.EPERM);}
return parent.node_ops.symlink(parent,newname,oldpath);},rename:function(old_path,new_path){var old_dirname=PATH.dirname(old_path);var new_dirname=PATH.dirname(new_path);var old_name=PATH.basename(old_path);var new_name=PATH.basename(new_path);var lookup,old_dir,new_dir;try{lookup=FS.lookupPath(old_path,{parent:true});old_dir=lookup.node;lookup=FS.lookupPath(new_path,{parent:true});new_dir=lookup.node;}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EBUSY);}
if(old_dir.mount!==new_dir.mount){throw new FS.ErrnoError(ERRNO_CODES.EXDEV);}
var old_node=FS.lookupNode(old_dir,old_name);var relative=PATH.relative(old_path,new_dirname);if(relative.charAt(0)!=='.'){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}
relative=PATH.relative(new_path,old_dirname);if(relative.charAt(0)!=='.'){throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);}
var new_node;try{new_node=FS.lookupNode(new_dir,new_name);}catch(e){}
if(old_node===new_node){return;}
var isdir=FS.isDir(old_node.mode);var err=FS.mayDelete(old_dir,old_name,isdir);if(err){throw new FS.ErrnoError(err);}
err=new_node?FS.mayDelete(new_dir,new_name,isdir):FS.mayCreate(new_dir,new_name);if(err){throw new FS.ErrnoError(err);}
if(!old_dir.node_ops.rename){throw new FS.ErrnoError(ERRNO_CODES.EPERM);}
if(FS.isMountpoint(old_node)||(new_node&&FS.isMountpoint(new_node))){throw new FS.ErrnoError(ERRNO_CODES.EBUSY);}
if(new_dir!==old_dir){err=FS.nodePermissions(old_dir,'w');if(err){throw new FS.ErrnoError(err);}}
FS.hashRemoveNode(old_node);try{old_dir.node_ops.rename(old_node,new_dir,new_name);}catch(e){throw e;}finally{FS.hashAddNode(old_node);}},rmdir:function(path){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var err=FS.mayDelete(parent,name,true);if(err){throw new FS.ErrnoError(err);}
if(!parent.node_ops.rmdir){throw new FS.ErrnoError(ERRNO_CODES.EPERM);}
if(FS.isMountpoint(node)){throw new FS.ErrnoError(ERRNO_CODES.EBUSY);}
parent.node_ops.rmdir(parent,name);FS.destroyNode(node);},readdir:function(path){var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;if(!node.node_ops.readdir){throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);}
return node.node_ops.readdir(node);},unlink:function(path){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var err=FS.mayDelete(parent,name,false);if(err){if(err===ERRNO_CODES.EISDIR)err=ERRNO_CODES.EPERM;throw new FS.ErrnoError(err);}
if(!parent.node_ops.unlink){throw new FS.ErrnoError(ERRNO_CODES.EPERM);}
if(FS.isMountpoint(node)){throw new FS.ErrnoError(ERRNO_CODES.EBUSY);}
parent.node_ops.unlink(parent,name);FS.destroyNode(node);},readlink:function(path){var lookup=FS.lookupPath(path,{follow:false});var link=lookup.node;if(!link.node_ops.readlink){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}
return link.node_ops.readlink(link);},stat:function(path,dontFollow){var lookup=FS.lookupPath(path,{follow:!dontFollow});var node=lookup.node;if(!node.node_ops.getattr){throw new FS.ErrnoError(ERRNO_CODES.EPERM);}
return node.node_ops.getattr(node);},lstat:function(path){return FS.stat(path,true);},chmod:function(path,mode,dontFollow){var node;if(typeof path==='string'){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node;}else{node=path;}
if(!node.node_ops.setattr){throw new FS.ErrnoError(ERRNO_CODES.EPERM);}
node.node_ops.setattr(node,{mode:(mode&4095)|(node.mode&~4095),timestamp:Date.now()});},lchmod:function(path,mode){FS.chmod(path,mode,true);},fchmod:function(fd,mode){var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(ERRNO_CODES.EBADF);}
FS.chmod(stream.node,mode);},chown:function(path,uid,gid,dontFollow){var node;if(typeof path==='string'){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node;}else{node=path;}
if(!node.node_ops.setattr){throw new FS.ErrnoError(ERRNO_CODES.EPERM);}
node.node_ops.setattr(node,{timestamp:Date.now()});},lchown:function(path,uid,gid){FS.chown(path,uid,gid,true);},fchown:function(fd,uid,gid){var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(ERRNO_CODES.EBADF);}
FS.chown(stream.node,uid,gid);},truncate:function(path,len){if(len<0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}
var node;if(typeof path==='string'){var lookup=FS.lookupPath(path,{follow:true});node=lookup.node;}else{node=path;}
if(!node.node_ops.setattr){throw new FS.ErrnoError(ERRNO_CODES.EPERM);}
if(FS.isDir(node.mode)){throw new FS.ErrnoError(ERRNO_CODES.EISDIR);}
if(!FS.isFile(node.mode)){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}
var err=FS.nodePermissions(node,'w');if(err){throw new FS.ErrnoError(err);}
node.node_ops.setattr(node,{size:len,timestamp:Date.now()});},ftruncate:function(fd,len){var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(ERRNO_CODES.EBADF);}
if((stream.flags&2097155)===0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}
FS.truncate(stream.node,len);},utime:function(path,atime,mtime){var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;node.node_ops.setattr(node,{timestamp:Math.max(atime,mtime)});},open:function(path,flags,mode,fd_start,fd_end){path=PATH.normalize(path);flags=typeof flags==='string'?FS.modeStringToFlags(flags):flags;mode=typeof mode==='undefined'?0666:mode;if((flags&64)){mode=(mode&4095)|32768;}else{mode=0;}
var node;try{var lookup=FS.lookupPath(path,{follow:!(flags&131072)});node=lookup.node;path=lookup.path;}catch(e){}
if((flags&64)){if(node){if((flags&128)){throw new FS.ErrnoError(ERRNO_CODES.EEXIST);}}else{node=FS.mknod(path,mode,0);}}
if(!node){throw new FS.ErrnoError(ERRNO_CODES.ENOENT);}
if(FS.isChrdev(node.mode)){flags&=~512;}
var err=FS.mayOpen(node,flags);if(err){throw new FS.ErrnoError(err);}
if((flags&512)){FS.truncate(node,0);}
var stream=FS.createStream({path:path,node:node,flags:flags,seekable:true,position:0,stream_ops:node.stream_ops,ungotten:[],error:false},fd_start,fd_end);if(stream.stream_ops.open){stream.stream_ops.open(stream);}
if(Module['logReadFiles']&&!(flags&1)){if(!FS.readFiles)FS.readFiles={};if(!(path in FS.readFiles)){FS.readFiles[path]=1;Module['printErr']('read file: '+path);}}
return stream;},close:function(stream){try{if(stream.stream_ops.close){stream.stream_ops.close(stream);}}catch(e){throw e;}finally{FS.closeStream(stream.fd);}},llseek:function(stream,offset,whence){if(!stream.seekable||!stream.stream_ops.llseek){throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);}
return stream.stream_ops.llseek(stream,offset,whence);},read:function(stream,buffer,offset,length,position){if(length<0||position<0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}
if((stream.flags&2097155)===1){throw new FS.ErrnoError(ERRNO_CODES.EBADF);}
if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(ERRNO_CODES.EISDIR);}
if(!stream.stream_ops.read){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}
var seeking=true;if(typeof position==='undefined'){position=stream.position;seeking=false;}else if(!stream.seekable){throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);}
var bytesRead=stream.stream_ops.read(stream,buffer,offset,length,position);if(!seeking)stream.position+=bytesRead;return bytesRead;},write:function(stream,buffer,offset,length,position,canOwn){if(length<0||position<0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}
if((stream.flags&2097155)===0){throw new FS.ErrnoError(ERRNO_CODES.EBADF);}
if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(ERRNO_CODES.EISDIR);}
if(!stream.stream_ops.write){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}
var seeking=true;if(typeof position==='undefined'){position=stream.position;seeking=false;}else if(!stream.seekable){throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);}
if(stream.flags&1024){FS.llseek(stream,0,2);}
var bytesWritten=stream.stream_ops.write(stream,buffer,offset,length,position,canOwn);if(!seeking)stream.position+=bytesWritten;return bytesWritten;},allocate:function(stream,offset,length){if(offset<0||length<=0){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}
if((stream.flags&2097155)===0){throw new FS.ErrnoError(ERRNO_CODES.EBADF);}
if(!FS.isFile(stream.node.mode)&&!FS.isDir(node.mode)){throw new FS.ErrnoError(ERRNO_CODES.ENODEV);}
if(!stream.stream_ops.allocate){throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);}
stream.stream_ops.allocate(stream,offset,length);},mmap:function(stream,buffer,offset,length,position,prot,flags){if((stream.flags&2097155)===1){throw new FS.ErrnoError(ERRNO_CODES.EACCES);}
if(!stream.stream_ops.mmap){throw new FS.errnoError(ERRNO_CODES.ENODEV);}
return stream.stream_ops.mmap(stream,buffer,offset,length,position,prot,flags);},ioctl:function(stream,cmd,arg){if(!stream.stream_ops.ioctl){throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);}
return stream.stream_ops.ioctl(stream,cmd,arg);},readFile:function(path,opts){opts=opts||{};opts.flags=opts.flags||'r';opts.encoding=opts.encoding||'binary';var ret;var stream=FS.open(path,opts.flags);var stat=FS.stat(path);var length=stat.size;var buf=new Uint8Array(length);FS.read(stream,buf,0,length,0);if(opts.encoding==='utf8'){ret='';var utf8=new Runtime.UTF8Processor();for(var i=0;i<length;i++){ret+=utf8.processCChar(buf[i]);}}else if(opts.encoding==='binary'){ret=buf;}else{throw new Error('Invalid encoding type "'+opts.encoding+'"');}
FS.close(stream);return ret;},writeFile:function(path,data,opts){opts=opts||{};opts.flags=opts.flags||'w';opts.encoding=opts.encoding||'utf8';var stream=FS.open(path,opts.flags,opts.mode);if(opts.encoding==='utf8'){var utf8=new Runtime.UTF8Processor();var buf=new Uint8Array(utf8.processJSString(data));FS.write(stream,buf,0,buf.length,0);}else if(opts.encoding==='binary'){FS.write(stream,data,0,data.length,0);}else{throw new Error('Invalid encoding type "'+opts.encoding+'"');}
FS.close(stream);},createDefaultDirectories:function(){FS.mkdir('/tmp');},createDefaultDevices:function(){FS.mkdir('/dev');FS.registerDevice(FS.makedev(1,3),{read:function(){return 0;},write:function(){return 0;}});FS.mkdev('/dev/null',FS.makedev(1,3));TTY.register(FS.makedev(5,0),TTY.default_tty_ops);TTY.register(FS.makedev(6,0),TTY.default_tty1_ops);FS.mkdev('/dev/tty',FS.makedev(5,0));FS.mkdev('/dev/tty1',FS.makedev(6,0));FS.mkdir('/dev/shm');FS.mkdir('/dev/shm/tmp');},createStandardStreams:function(){if(Module['stdin']){FS.createDevice('/dev','stdin',Module['stdin']);}else{FS.symlink('/dev/tty','/dev/stdin');}
if(Module['stdout']){FS.createDevice('/dev','stdout',null,Module['stdout']);}else{FS.symlink('/dev/tty','/dev/stdout');}
if(Module['stderr']){FS.createDevice('/dev','stderr',null,Module['stderr']);}else{FS.symlink('/dev/tty1','/dev/stderr');}
var stdin=FS.open('/dev/stdin','r');HEAP32[((_stdin)>>2)]=stdin.fd;assert(stdin.fd===1,'invalid handle for stdin ('+stdin.fd+')');var stdout=FS.open('/dev/stdout','w');HEAP32[((_stdout)>>2)]=stdout.fd;assert(stdout.fd===2,'invalid handle for stdout ('+stdout.fd+')');var stderr=FS.open('/dev/stderr','w');HEAP32[((_stderr)>>2)]=stderr.fd;assert(stderr.fd===3,'invalid handle for stderr ('+stderr.fd+')');},staticInit:function(){FS.nameTable=new Array(4096);FS.root=FS.createNode(null,'/',16384|0777,0);FS.mount(MEMFS,{},'/');FS.createDefaultDirectories();FS.createDefaultDevices();},init:function(input,output,error){assert(!FS.init.initialized,'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');FS.init.initialized=true;Module['stdin']=input||Module['stdin'];Module['stdout']=output||Module['stdout'];Module['stderr']=error||Module['stderr'];FS.createStandardStreams();},quit:function(){FS.init.initialized=false;for(var i=0;i<FS.streams.length;i++){var stream=FS.streams[i];if(!stream){continue;}
FS.close(stream);}},getMode:function(canRead,canWrite){var mode=0;if(canRead)mode|=292|73;if(canWrite)mode|=146;return mode;},joinPath:function(parts,forceRelative){var path=PATH.join.apply(null,parts);if(forceRelative&&path[0]=='/')path=path.substr(1);return path;},absolutePath:function(relative,base){return PATH.resolve(base,relative);},standardizePath:function(path){return PATH.normalize(path);},findObject:function(path,dontResolveLastLink){var ret=FS.analyzePath(path,dontResolveLastLink);if(ret.exists){return ret.object;}else{___setErrNo(ret.error);return null;}},analyzePath:function(path,dontResolveLastLink){try{var lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});path=lookup.path;}catch(e){}
var ret={isRoot:false,exists:false,error:0,name:null,path:null,object:null,parentExists:false,parentPath:null,parentObject:null};try{var lookup=FS.lookupPath(path,{parent:true});ret.parentExists=true;ret.parentPath=lookup.path;ret.parentObject=lookup.node;ret.name=PATH.basename(path);lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});ret.exists=true;ret.path=lookup.path;ret.object=lookup.node;ret.name=lookup.node.name;ret.isRoot=lookup.path==='/';}catch(e){ret.error=e.errno;};return ret;},createFolder:function(parent,name,canRead,canWrite){var path=PATH.join(typeof parent==='string'?parent:FS.getPath(parent),name);var mode=FS.getMode(canRead,canWrite);return FS.mkdir(path,mode);},createPath:function(parent,path,canRead,canWrite){parent=typeof parent==='string'?parent:FS.getPath(parent);var parts=path.split('/').reverse();while(parts.length){var part=parts.pop();if(!part)continue;var current=PATH.join(parent,part);try{FS.mkdir(current);}catch(e){}
parent=current;}
return current;},createFile:function(parent,name,properties,canRead,canWrite){var path=PATH.join(typeof parent==='string'?parent:FS.getPath(parent),name);var mode=FS.getMode(canRead,canWrite);return FS.create(path,mode);},createDataFile:function(parent,name,data,canRead,canWrite,canOwn){var path=name?PATH.join(typeof parent==='string'?parent:FS.getPath(parent),name):parent;var mode=FS.getMode(canRead,canWrite);var node=FS.create(path,mode);if(data){if(typeof data==='string'){var arr=new Array(data.length);for(var i=0,len=data.length;i<len;++i)arr[i]=data.charCodeAt(i);data=arr;}
FS.chmod(path,mode|146);var stream=FS.open(path,'w');FS.write(stream,data,0,data.length,0,canOwn);FS.close(stream);FS.chmod(path,mode);}
return node;},createDevice:function(parent,name,input,output){var path=PATH.join(typeof parent==='string'?parent:FS.getPath(parent),name);var mode=FS.getMode(!!input,!!output);if(!FS.createDevice.major)FS.createDevice.major=64;var dev=FS.makedev(FS.createDevice.major++,0);FS.registerDevice(dev,{open:function(stream){stream.seekable=false;},close:function(stream){if(output&&output.buffer&&output.buffer.length){output(10);}},read:function(stream,buffer,offset,length,pos){var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=input();}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EIO);}
if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);}
if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result;}
if(bytesRead){stream.node.timestamp=Date.now();}
return bytesRead;},write:function(stream,buffer,offset,length,pos){for(var i=0;i<length;i++){try{output(buffer[offset+i]);}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EIO);}}
if(length){stream.node.timestamp=Date.now();}
return i;}});return FS.mkdev(path,mode,dev);},createLink:function(parent,name,target,canRead,canWrite){var path=PATH.join(typeof parent==='string'?parent:FS.getPath(parent),name);return FS.symlink(target,path);},forceLoadFile:function(obj){if(obj.isDevice||obj.isFolder||obj.link||obj.contents)return true;var success=true;if(typeof XMLHttpRequest!=='undefined'){throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");}else if(Module['read']){try{obj.contents=intArrayFromString(Module['read'](obj.url),true);}catch(e){success=false;}}else{throw new Error('Cannot load without read() or XMLHttpRequest.');}
if(!success)___setErrNo(ERRNO_CODES.EIO);return success;},createLazyFile:function(parent,name,url,canRead,canWrite){if(typeof XMLHttpRequest!=='undefined'){if(!ENVIRONMENT_IS_WORKER)throw'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';var LazyUint8Array=function(){this.lengthKnown=false;this.chunks=[];}
LazyUint8Array.prototype.get=function(idx){if(idx>this.length-1||idx<0){return undefined;}
var chunkOffset=idx%this.chunkSize;var chunkNum=Math.floor(idx/this.chunkSize);return this.getter(chunkNum)[chunkOffset];}
LazyUint8Array.prototype.setDataGetter=function(getter){this.getter=getter;}
LazyUint8Array.prototype.cacheLength=function(){var xhr=new XMLHttpRequest();xhr.open('HEAD',url,false);xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error("Couldn't load "+url+". Status: "+xhr.status);var datalength=Number(xhr.getResponseHeader("Content-length"));var header;var hasByteServing=(header=xhr.getResponseHeader("Accept-Ranges"))&&header==="bytes";var chunkSize=1024*1024;if(!hasByteServing)chunkSize=datalength;var doXHR=(function(from,to){if(from>to)throw new Error("invalid range ("+from+", "+to+") or no bytes requested!");if(to>datalength-1)throw new Error("only "+datalength+" bytes available! programmer error!");var xhr=new XMLHttpRequest();xhr.open('GET',url,false);if(datalength!==chunkSize)xhr.setRequestHeader("Range","bytes="+from+"-"+to);if(typeof Uint8Array!='undefined')xhr.responseType='arraybuffer';if(xhr.overrideMimeType){xhr.overrideMimeType('text/plain; charset=x-user-defined');}
xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error("Couldn't load "+url+". Status: "+xhr.status);if(xhr.response!==undefined){return new Uint8Array(xhr.response||[]);}else{return intArrayFromString(xhr.responseText||'',true);}});var lazyArray=this;lazyArray.setDataGetter(function(chunkNum){var start=chunkNum*chunkSize;var end=(chunkNum+1)*chunkSize-1;end=Math.min(end,datalength-1);if(typeof(lazyArray.chunks[chunkNum])==="undefined"){lazyArray.chunks[chunkNum]=doXHR(start,end);}
if(typeof(lazyArray.chunks[chunkNum])==="undefined")throw new Error("doXHR failed!");return lazyArray.chunks[chunkNum];});this._length=datalength;this._chunkSize=chunkSize;this.lengthKnown=true;}
var lazyArray=new LazyUint8Array();Object.defineProperty(lazyArray,"length",{get:function(){if(!this.lengthKnown){this.cacheLength();}
return this._length;}});Object.defineProperty(lazyArray,"chunkSize",{get:function(){if(!this.lengthKnown){this.cacheLength();}
return this._chunkSize;}});var properties={isDevice:false,contents:lazyArray};}else{var properties={isDevice:false,url:url};}
var node=FS.createFile(parent,name,properties,canRead,canWrite);if(properties.contents){node.contents=properties.contents;}else if(properties.url){node.contents=null;node.url=properties.url;}
var stream_ops={};var keys=Object.keys(node.stream_ops);keys.forEach(function(key){var fn=node.stream_ops[key];stream_ops[key]=function(){if(!FS.forceLoadFile(node)){throw new FS.ErrnoError(ERRNO_CODES.EIO);}
return fn.apply(null,arguments);};});stream_ops.read=function(stream,buffer,offset,length,position){if(!FS.forceLoadFile(node)){throw new FS.ErrnoError(ERRNO_CODES.EIO);}
var contents=stream.node.contents;if(position>=contents.length)
return 0;var size=Math.min(contents.length-position,length);assert(size>=0);if(contents.slice){for(var i=0;i<size;i++){buffer[offset+i]=contents[position+i];}}else{for(var i=0;i<size;i++){buffer[offset+i]=contents.get(position+i);}}
return size;};node.stream_ops=stream_ops;return node;},createPreloadedFile:function(parent,name,url,canRead,canWrite,onload,onerror,dontCreateFile,canOwn){Browser.init();var fullname=name?PATH.resolve(PATH.join(parent,name)):parent;function processData(byteArray){function finish(byteArray){if(!dontCreateFile){FS.createDataFile(parent,name,byteArray,canRead,canWrite,canOwn);}
if(onload)onload();removeRunDependency('cp '+fullname);}
var handled=false;Module['preloadPlugins'].forEach(function(plugin){if(handled)return;if(plugin['canHandle'](fullname)){plugin['handle'](byteArray,fullname,finish,function(){if(onerror)onerror();removeRunDependency('cp '+fullname);});handled=true;}});if(!handled)finish(byteArray);}
addRunDependency('cp '+fullname);if(typeof url=='string'){Browser.asyncLoad(url,function(byteArray){processData(byteArray);},onerror);}else{processData(url);}},indexedDB:function(){return window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;},DB_NAME:function(){return'EM_FS_'+window.location.pathname;},DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function(paths,onload,onerror){onload=onload||function(){};onerror=onerror||function(){};var indexedDB=FS.indexedDB();try{var openRequest=indexedDB.open(FS.DB_NAME(),FS.DB_VERSION);}catch(e){return onerror(e);}
openRequest.onupgradeneeded=function(){console.log('creating db');var db=openRequest.result;db.createObjectStore(FS.DB_STORE_NAME);};openRequest.onsuccess=function(){var db=openRequest.result;var transaction=db.transaction([FS.DB_STORE_NAME],'readwrite');var files=transaction.objectStore(FS.DB_STORE_NAME);var ok=0,fail=0,total=paths.length;function finish(){if(fail==0)onload();else onerror();}
paths.forEach(function(path){var putRequest=files.put(FS.analyzePath(path).object.contents,path);putRequest.onsuccess=function(){ok++;if(ok+fail==total)finish()};putRequest.onerror=function(){fail++;if(ok+fail==total)finish()};});transaction.onerror=onerror;};openRequest.onerror=onerror;},loadFilesFromDB:function(paths,onload,onerror){onload=onload||function(){};onerror=onerror||function(){};var indexedDB=FS.indexedDB();try{var openRequest=indexedDB.open(FS.DB_NAME(),FS.DB_VERSION);}catch(e){return onerror(e);}
openRequest.onupgradeneeded=onerror;openRequest.onsuccess=function(){var db=openRequest.result;try{var transaction=db.transaction([FS.DB_STORE_NAME],'readonly');}catch(e){onerror(e);return;}
var files=transaction.objectStore(FS.DB_STORE_NAME);var ok=0,fail=0,total=paths.length;function finish(){if(fail==0)onload();else onerror();}
paths.forEach(function(path){var getRequest=files.get(path);getRequest.onsuccess=function(){if(FS.analyzePath(path).exists){FS.unlink(path);}
FS.createDataFile(PATH.dirname(path),PATH.basename(path),getRequest.result,true,true,true);ok++;if(ok+fail==total)finish();};getRequest.onerror=function(){fail++;if(ok+fail==total)finish()};});transaction.onerror=onerror;};openRequest.onerror=onerror;}};var SOCKFS={mount:function(mount){return FS.createNode(null,'/',16384|0777,0);},nextname:function(){if(!SOCKFS.nextname.current){SOCKFS.nextname.current=0;}
return'socket['+(SOCKFS.nextname.current++)+']';},createSocket:function(family,type,protocol){var streaming=type==1;if(protocol){assert(streaming==(protocol==6));}
var sock={family:family,type:type,protocol:protocol,server:null,peers:{},pending:[],recv_queue:[],sock_ops:SOCKFS.websocket_sock_ops};var name=SOCKFS.nextname();var node=FS.createNode(SOCKFS.root,name,49152,0);node.sock=sock;var stream=FS.createStream({path:name,node:node,flags:FS.modeStringToFlags('r+'),seekable:false,stream_ops:SOCKFS.stream_ops});sock.stream=stream;return sock;},getSocket:function(fd){var stream=FS.getStream(fd);if(!stream||!FS.isSocket(stream.node.mode)){return null;}
return stream.node.sock;},stream_ops:{poll:function(stream){var sock=stream.node.sock;return sock.sock_ops.poll(sock);},ioctl:function(stream,request,varargs){var sock=stream.node.sock;return sock.sock_ops.ioctl(sock,request,varargs);},read:function(stream,buffer,offset,length,position){var sock=stream.node.sock;var msg=sock.sock_ops.recvmsg(sock,length);if(!msg){return 0;}
buffer.set(msg.buffer,offset);return msg.buffer.length;},write:function(stream,buffer,offset,length,position){var sock=stream.node.sock;return sock.sock_ops.sendmsg(sock,buffer,offset,length);},close:function(stream){var sock=stream.node.sock;sock.sock_ops.close(sock);}},websocket_sock_ops:{createPeer:function(sock,addr,port){var ws;if(typeof addr==='object'){ws=addr;addr=null;port=null;}
if(ws){if(ws._socket){addr=ws._socket.remoteAddress;port=ws._socket.remotePort;}
else{var result=/ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);if(!result){throw new Error('WebSocket URL must be in the format ws(s)://address:port');}
addr=result[1];port=parseInt(result[2],10);}}else{try{var url='ws://'+addr+':'+port;var opts=ENVIRONMENT_IS_NODE?{}:['binary'];ws=new WebSocket(url,opts);ws.binaryType='arraybuffer';}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH);}}
var peer={addr:addr,port:port,socket:ws,dgram_send_queue:[]};SOCKFS.websocket_sock_ops.addPeer(sock,peer);SOCKFS.websocket_sock_ops.handlePeerEvents(sock,peer);if(sock.type===2&&typeof sock.sport!=='undefined'){peer.dgram_send_queue.push(new Uint8Array([255,255,255,255,'p'.charCodeAt(0),'o'.charCodeAt(0),'r'.charCodeAt(0),'t'.charCodeAt(0),((sock.sport&0xff00)>>8),(sock.sport&0xff)]));}
return peer;},getPeer:function(sock,addr,port){return sock.peers[addr+':'+port];},addPeer:function(sock,peer){sock.peers[peer.addr+':'+peer.port]=peer;},removePeer:function(sock,peer){delete sock.peers[peer.addr+':'+peer.port];},handlePeerEvents:function(sock,peer){var first=true;var handleOpen=function(){try{var queued=peer.dgram_send_queue.shift();while(queued){peer.socket.send(queued);queued=peer.dgram_send_queue.shift();}}catch(e){peer.socket.close();}};var handleMessage=function(data){assert(typeof data!=='string'&&data.byteLength!==undefined);data=new Uint8Array(data);var wasfirst=first;first=false;if(wasfirst&&data.length===10&&data[0]===255&&data[1]===255&&data[2]===255&&data[3]===255&&data[4]==='p'.charCodeAt(0)&&data[5]==='o'.charCodeAt(0)&&data[6]==='r'.charCodeAt(0)&&data[7]==='t'.charCodeAt(0)){var newport=((data[8]<<8)|data[9]);SOCKFS.websocket_sock_ops.removePeer(sock,peer);peer.port=newport;SOCKFS.websocket_sock_ops.addPeer(sock,peer);return;}
sock.recv_queue.push({addr:peer.addr,port:peer.port,data:data});};if(ENVIRONMENT_IS_NODE){peer.socket.on('open',handleOpen);peer.socket.on('message',function(data,flags){if(!flags.binary){return;}
handleMessage((new Uint8Array(data)).buffer);});peer.socket.on('error',function(){});}else{peer.socket.onopen=handleOpen;peer.socket.onmessage=function(event){handleMessage(event.data);};}},poll:function(sock){if(sock.type===1&&sock.server){return sock.pending.length?(64|1):0;}
var mask=0;var dest=sock.type===1?SOCKFS.websocket_sock_ops.getPeer(sock,sock.daddr,sock.dport):null;if(sock.recv_queue.length||!dest||(dest&&dest.socket.readyState===dest.socket.CLOSING)||(dest&&dest.socket.readyState===dest.socket.CLOSED)){mask|=(64|1);}
if(!dest||(dest&&dest.socket.readyState===dest.socket.OPEN)){mask|=4;}
if((dest&&dest.socket.readyState===dest.socket.CLOSING)||(dest&&dest.socket.readyState===dest.socket.CLOSED)){mask|=16;}
return mask;},ioctl:function(sock,request,arg){switch(request){case 21531:var bytes=0;if(sock.recv_queue.length){bytes=sock.recv_queue[0].data.length;}
HEAP32[((arg)>>2)]=bytes;return 0;default:return ERRNO_CODES.EINVAL;}},close:function(sock){if(sock.server){try{sock.server.close();}catch(e){}
sock.server=null;}
var peers=Object.keys(sock.peers);for(var i=0;i<peers.length;i++){var peer=sock.peers[peers[i]];try{peer.socket.close();}catch(e){}
SOCKFS.websocket_sock_ops.removePeer(sock,peer);}
return 0;},bind:function(sock,addr,port){if(typeof sock.saddr!=='undefined'||typeof sock.sport!=='undefined'){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}
sock.saddr=addr;sock.sport=port||_mkport();if(sock.type===2){if(sock.server){sock.server.close();sock.server=null;}
try{sock.sock_ops.listen(sock,0);}catch(e){if(!(e instanceof FS.ErrnoError))throw e;if(e.errno!==ERRNO_CODES.EOPNOTSUPP)throw e;}}},connect:function(sock,addr,port){if(sock.server){throw new FS.ErrnoError(ERRNO_CODS.EOPNOTSUPP);}
if(typeof sock.daddr!=='undefined'&&typeof sock.dport!=='undefined'){var dest=SOCKFS.websocket_sock_ops.getPeer(sock,sock.daddr,sock.dport);if(dest){if(dest.socket.readyState===dest.socket.CONNECTING){throw new FS.ErrnoError(ERRNO_CODES.EALREADY);}else{throw new FS.ErrnoError(ERRNO_CODES.EISCONN);}}}
var peer=SOCKFS.websocket_sock_ops.createPeer(sock,addr,port);sock.daddr=peer.addr;sock.dport=peer.port;throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS);},listen:function(sock,backlog){if(!ENVIRONMENT_IS_NODE){throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);}
if(sock.server){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}
var WebSocketServer=require('ws').Server;var host=sock.saddr;sock.server=new WebSocketServer({host:host,port:sock.sport});sock.server.on('connection',function(ws){if(sock.type===1){var newsock=SOCKFS.createSocket(sock.family,sock.type,sock.protocol);var peer=SOCKFS.websocket_sock_ops.createPeer(newsock,ws);newsock.daddr=peer.addr;newsock.dport=peer.port;sock.pending.push(newsock);}else{SOCKFS.websocket_sock_ops.createPeer(sock,ws);}});sock.server.on('closed',function(){sock.server=null;});sock.server.on('error',function(){});},accept:function(listensock){if(!listensock.server){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}
var newsock=listensock.pending.shift();newsock.stream.flags=listensock.stream.flags;return newsock;},getname:function(sock,peer){var addr,port;if(peer){if(sock.daddr===undefined||sock.dport===undefined){throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);}
addr=sock.daddr;port=sock.dport;}else{addr=sock.saddr||0;port=sock.sport||0;}
return{addr:addr,port:port};},sendmsg:function(sock,buffer,offset,length,addr,port){if(sock.type===2){if(addr===undefined||port===undefined){addr=sock.daddr;port=sock.dport;}
if(addr===undefined||port===undefined){throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ);}}else{addr=sock.daddr;port=sock.dport;}
var dest=SOCKFS.websocket_sock_ops.getPeer(sock,addr,port);if(sock.type===1){if(!dest||dest.socket.readyState===dest.socket.CLOSING||dest.socket.readyState===dest.socket.CLOSED){throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);}else if(dest.socket.readyState===dest.socket.CONNECTING){throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);}}
var data;if(buffer instanceof Array||buffer instanceof ArrayBuffer){data=buffer.slice(offset,offset+length);}else{data=buffer.buffer.slice(buffer.byteOffset+offset,buffer.byteOffset+offset+length);}
if(sock.type===2){if(!dest||dest.socket.readyState!==dest.socket.OPEN){if(!dest||dest.socket.readyState===dest.socket.CLOSING||dest.socket.readyState===dest.socket.CLOSED){dest=SOCKFS.websocket_sock_ops.createPeer(sock,addr,port);}
dest.dgram_send_queue.push(data);return length;}}
try{dest.socket.send(data);return length;}catch(e){throw new FS.ErrnoError(ERRNO_CODES.EINVAL);}},recvmsg:function(sock,length){if(sock.type===1&&sock.server){throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);}
var queued=sock.recv_queue.shift();if(!queued){if(sock.type===1){var dest=SOCKFS.websocket_sock_ops.getPeer(sock,sock.daddr,sock.dport);if(!dest){throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);}
else if(dest.socket.readyState===dest.socket.CLOSING||dest.socket.readyState===dest.socket.CLOSED){return null;}
else{throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);}}else{throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);}}
var queuedLength=queued.data.byteLength||queued.data.length;var queuedOffset=queued.data.byteOffset||0;var queuedBuffer=queued.data.buffer||queued.data;var bytesRead=Math.min(length,queuedLength);var res={buffer:new Uint8Array(queuedBuffer,queuedOffset,bytesRead),addr:queued.addr,port:queued.port};if(sock.type===1&&bytesRead<queuedLength){var bytesRemaining=queuedLength-bytesRead;queued.data=new Uint8Array(queuedBuffer,queuedOffset+bytesRead,bytesRemaining);sock.recv_queue.unshift(queued);}
return res;}}};function _send(fd,buf,len,flags){var sock=SOCKFS.getSocket(fd);if(!sock){___setErrNo(ERRNO_CODES.EBADF);return-1;}
return _write(fd,buf,len);}
function _pwrite(fildes,buf,nbyte,offset){var stream=FS.getStream(fildes);if(!stream){___setErrNo(ERRNO_CODES.EBADF);return-1;}
try{var slab=HEAP8;return FS.write(stream,slab,buf,nbyte,offset);}catch(e){FS.handleFSError(e);return-1;}}function _write(fildes,buf,nbyte){var stream=FS.getStream(fildes);if(!stream){___setErrNo(ERRNO_CODES.EBADF);return-1;}
try{var slab=HEAP8;return FS.write(stream,slab,buf,nbyte);}catch(e){FS.handleFSError(e);return-1;}}function _fwrite(ptr,size,nitems,stream){var bytesToWrite=nitems*size;if(bytesToWrite==0)return 0;var bytesWritten=_write(stream,ptr,bytesToWrite);if(bytesWritten==-1){var streamObj=FS.getStream(stream);if(streamObj)streamObj.error=true;return 0;}else{return Math.floor(bytesWritten/size);}}
function _strlen(ptr){ptr=ptr|0;var curr=0;curr=ptr;while(HEAP8[(curr)]){curr=(curr+1)|0;}
return(curr-ptr)|0;}
function __reallyNegative(x){return x<0||(x===0&&(1/x)===-Infinity);}function __formatString(format,varargs){var textIndex=format;var argIndex=0;function getNextArg(type){var ret;if(type==='double'){ret=HEAPF64[(((varargs)+(argIndex))>>3)];}else if(type=='i64'){ret=[HEAP32[(((varargs)+(argIndex))>>2)],HEAP32[(((varargs)+(argIndex+8))>>2)]];argIndex+=8;}else{type='i32';ret=HEAP32[(((varargs)+(argIndex))>>2)];}
argIndex+=Math.max(Runtime.getNativeFieldSize(type),Runtime.getAlignSize(type,null,true));return ret;}
var ret=[];var curr,next,currArg;while(1){var startTextIndex=textIndex;curr=HEAP8[(textIndex)];if(curr===0)break;next=HEAP8[((textIndex+1)|0)];if(curr==37){var flagAlwaysSigned=false;var flagLeftAlign=false;var flagAlternative=false;var flagZeroPad=false;flagsLoop:while(1){switch(next){case 43:flagAlwaysSigned=true;break;case 45:flagLeftAlign=true;break;case 35:flagAlternative=true;break;case 48:if(flagZeroPad){break flagsLoop;}else{flagZeroPad=true;break;}
default:break flagsLoop;}
textIndex++;next=HEAP8[((textIndex+1)|0)];}
var width=0;if(next==42){width=getNextArg('i32');textIndex++;next=HEAP8[((textIndex+1)|0)];}else{while(next>=48&&next<=57){width=width*10+(next-48);textIndex++;next=HEAP8[((textIndex+1)|0)];}}
var precisionSet=false;if(next==46){var precision=0;precisionSet=true;textIndex++;next=HEAP8[((textIndex+1)|0)];if(next==42){precision=getNextArg('i32');textIndex++;}else{while(1){var precisionChr=HEAP8[((textIndex+1)|0)];if(precisionChr<48||precisionChr>57)break;precision=precision*10+(precisionChr-48);textIndex++;}}
next=HEAP8[((textIndex+1)|0)];}else{var precision=6;}
var argSize;switch(String.fromCharCode(next)){case'h':var nextNext=HEAP8[((textIndex+2)|0)];if(nextNext==104){textIndex++;argSize=1;}else{argSize=2;}
break;case'l':var nextNext=HEAP8[((textIndex+2)|0)];if(nextNext==108){textIndex++;argSize=8;}else{argSize=4;}
break;case'L':case'q':case'j':argSize=8;break;case'z':case't':case'I':argSize=4;break;default:argSize=null;}
if(argSize)textIndex++;next=HEAP8[((textIndex+1)|0)];switch(String.fromCharCode(next)){case'd':case'i':case'u':case'o':case'x':case'X':case'p':{var signed=next==100||next==105;argSize=argSize||4;var currArg=getNextArg('i'+(argSize*8));var origArg=currArg;var argText;if(argSize==8){currArg=Runtime.makeBigInt(currArg[0],currArg[1],next==117);}
if(argSize<=4){var limit=Math.pow(256,argSize)-1;currArg=(signed?reSign:unSign)(currArg&limit,argSize*8);}
var currAbsArg=Math.abs(currArg);var prefix='';if(next==100||next==105){if(argSize==8&&i64Math)argText=i64Math.stringify(origArg[0],origArg[1],null);else
argText=reSign(currArg,8*argSize,1).toString(10);}else if(next==117){if(argSize==8&&i64Math)argText=i64Math.stringify(origArg[0],origArg[1],true);else
argText=unSign(currArg,8*argSize,1).toString(10);currArg=Math.abs(currArg);}else if(next==111){argText=(flagAlternative?'0':'')+currAbsArg.toString(8);}else if(next==120||next==88){prefix=(flagAlternative&&currArg!=0)?'0x':'';if(argSize==8&&i64Math){if(origArg[1]){argText=(origArg[1]>>>0).toString(16);var lower=(origArg[0]>>>0).toString(16);while(lower.length<8)lower='0'+lower;argText+=lower;}else{argText=(origArg[0]>>>0).toString(16);}}else
if(currArg<0){currArg=-currArg;argText=(currAbsArg-1).toString(16);var buffer=[];for(var i=0;i<argText.length;i++){buffer.push((0xF-parseInt(argText[i],16)).toString(16));}
argText=buffer.join('');while(argText.length<argSize*2)argText='f'+argText;}else{argText=currAbsArg.toString(16);}
if(next==88){prefix=prefix.toUpperCase();argText=argText.toUpperCase();}}else if(next==112){if(currAbsArg===0){argText='(nil)';}else{prefix='0x';argText=currAbsArg.toString(16);}}
if(precisionSet){while(argText.length<precision){argText='0'+argText;}}
if(flagAlwaysSigned){if(currArg<0){prefix='-'+prefix;}else{prefix='+'+prefix;}}
while(prefix.length+argText.length<width){if(flagLeftAlign){argText+=' ';}else{if(flagZeroPad){argText='0'+argText;}else{prefix=' '+prefix;}}}
argText=prefix+argText;argText.split('').forEach(function(chr){ret.push(chr.charCodeAt(0));});break;}
case'f':case'F':case'e':case'E':case'g':case'G':{var currArg=getNextArg('double');var argText;if(isNaN(currArg)){argText='nan';flagZeroPad=false;}else if(!isFinite(currArg)){argText=(currArg<0?'-':'')+'inf';flagZeroPad=false;}else{var isGeneral=false;var effectivePrecision=Math.min(precision,20);if(next==103||next==71){isGeneral=true;precision=precision||1;var exponent=parseInt(currArg.toExponential(effectivePrecision).split('e')[1],10);if(precision>exponent&&exponent>=-4){next=((next==103)?'f':'F').charCodeAt(0);precision-=exponent+1;}else{next=((next==103)?'e':'E').charCodeAt(0);precision--;}
effectivePrecision=Math.min(precision,20);}
if(next==101||next==69){argText=currArg.toExponential(effectivePrecision);if(/[eE][-+]\d$/.test(argText)){argText=argText.slice(0,-1)+'0'+argText.slice(-1);}}else if(next==102||next==70){argText=currArg.toFixed(effectivePrecision);if(currArg===0&&__reallyNegative(currArg)){argText='-'+argText;}}
var parts=argText.split('e');if(isGeneral&&!flagAlternative){while(parts[0].length>1&&parts[0].indexOf('.')!=-1&&(parts[0].slice(-1)=='0'||parts[0].slice(-1)=='.')){parts[0]=parts[0].slice(0,-1);}}else{if(flagAlternative&&argText.indexOf('.')==-1)parts[0]+='.';while(precision>effectivePrecision++)parts[0]+='0';}
argText=parts[0]+(parts.length>1?'e'+parts[1]:'');if(next==69)argText=argText.toUpperCase();if(flagAlwaysSigned&&currArg>=0){argText='+'+argText;}}
while(argText.length<width){if(flagLeftAlign){argText+=' ';}else{if(flagZeroPad&&(argText[0]=='-'||argText[0]=='+')){argText=argText[0]+'0'+argText.slice(1);}else{argText=(flagZeroPad?'0':' ')+argText;}}}
if(next<97)argText=argText.toUpperCase();argText.split('').forEach(function(chr){ret.push(chr.charCodeAt(0));});break;}
case's':{var arg=getNextArg('i8*');var argLength=arg?_strlen(arg):'(null)'.length;if(precisionSet)argLength=Math.min(argLength,precision);if(!flagLeftAlign){while(argLength<width--){ret.push(32);}}
if(arg){for(var i=0;i<argLength;i++){ret.push(HEAPU8[((arg++)|0)]);}}else{ret=ret.concat(intArrayFromString('(null)'.substr(0,argLength),true));}
if(flagLeftAlign){while(argLength<width--){ret.push(32);}}
break;}
case'c':{if(flagLeftAlign)ret.push(getNextArg('i8'));while(--width>0){ret.push(32);}
if(!flagLeftAlign)ret.push(getNextArg('i8'));break;}
case'n':{var ptr=getNextArg('i32*');HEAP32[((ptr)>>2)]=ret.length
break;}
case'%':{ret.push(curr);break;}
default:{for(var i=startTextIndex;i<textIndex+2;i++){ret.push(HEAP8[(i)]);}}}
textIndex+=2;}else{ret.push(curr);textIndex+=1;}}
return ret;}function _fprintf(stream,format,varargs){var result=__formatString(format,varargs);var stack=Runtime.stackSave();var ret=_fwrite(allocate(result,'i8',ALLOC_STACK),1,result.length,stream);Runtime.stackRestore(stack);return ret;}
function ___gxx_personality_v0(){}
function _printf(format,varargs){var stdout=HEAP32[((_stdout)>>2)];return _fprintf(stdout,format,varargs);}
function _memcpy(dest,src,num){dest=dest|0;src=src|0;num=num|0;var ret=0;ret=dest|0;if((dest&3)==(src&3)){while(dest&3){if((num|0)==0)return ret|0;HEAP8[(dest)]=HEAP8[(src)];dest=(dest+1)|0;src=(src+1)|0;num=(num-1)|0;}
while((num|0)>=4){HEAP32[((dest)>>2)]=HEAP32[((src)>>2)];dest=(dest+4)|0;src=(src+4)|0;num=(num-4)|0;}}
while((num|0)>0){HEAP8[(dest)]=HEAP8[(src)];dest=(dest+1)|0;src=(src+1)|0;num=(num-1)|0;}
return ret|0;}var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;function __exit(status){Module.print('exit('+status+') called');Module['exit'](status);}function _exit(status){__exit(status);}function __ZSt9terminatev(){_exit(-1234);}
var _abs=Math.abs;var ___rusage_struct_layout={__size__:72,ru_utime:0,ru_stime:8,ru_maxrss:16,ru_ixrss:20,ru_idrss:24,ru_isrss:28,ru_minflt:32,ru_majflt:36,ru_nswap:40,ru_inblock:44,ru_oublock:48,ru_msgsnd:52,ru_msgrcv:56,ru_nsignals:60,ru_nvcsw:64,ru_nivcsw:68};function _getrusage(resource,rlp){var timeval=Runtime.calculateStructAlignment({fields:['i32','i32']});HEAP32[(((rlp)+(___rusage_struct_layout.ru_utime+timeval[0]))>>2)]=1
HEAP32[(((rlp)+(___rusage_struct_layout.ru_utime+timeval[1]))>>2)]=2
HEAP32[(((rlp)+(___rusage_struct_layout.ru_stime+timeval[0]))>>2)]=3
HEAP32[(((rlp)+(___rusage_struct_layout.ru_stime+timeval[1]))>>2)]=4
return 0;}
function ___assert_fail(condition,filename,line,func){ABORT=true;throw'Assertion failed: '+Pointer_stringify(condition)+', at: '+[filename?Pointer_stringify(filename):'unknown filename',line,func?Pointer_stringify(func):'unknown function']+' at '+new Error().stack;}
var _llvm_pow_f64=Math.pow;function _abort(){Module['abort']();}
function ___errno_location(){return ___errno_state;}
function _sbrk(bytes){var self=_sbrk;if(!self.called){DYNAMICTOP=alignMemoryPage(DYNAMICTOP);self.called=true;assert(Runtime.dynamicAlloc);self.alloc=Runtime.dynamicAlloc;Runtime.dynamicAlloc=function(){abort('cannot dynamically allocate, sbrk now has control')};}
var ret=DYNAMICTOP;if(bytes!=0)self.alloc(bytes);return ret;}
function _sysconf(name){switch(name){case 30:return PAGE_SIZE;case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 79:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:return 200809;case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;case 74:case 60:case 69:case 70:case 4:return 1024;case 31:case 42:case 72:return 32;case 87:case 26:case 33:return 2147483647;case 34:case 1:return 47839;case 38:case 36:return 99;case 43:case 37:return 2048;case 0:return 2097152;case 3:return 65536;case 28:return 32768;case 44:return 32767;case 75:return 16384;case 39:return 1000;case 89:return 700;case 71:return 256;case 40:return 255;case 2:return 100;case 180:return 64;case 25:return 20;case 5:return 16;case 6:return 6;case 73:return 4;case 84:return 1;}
___setErrNo(ERRNO_CODES.EINVAL);return-1;}
function _time(ptr){var ret=Math.floor(Date.now()/1000);if(ptr){HEAP32[((ptr)>>2)]=ret}
return ret;}
function _memset(ptr,value,num){ptr=ptr|0;value=value|0;num=num|0;var stop=0,value4=0,stop4=0,unaligned=0;stop=(ptr+num)|0;if((num|0)>=20){value=value&0xff;unaligned=ptr&3;value4=value|(value<<8)|(value<<16)|(value<<24);stop4=stop&~3;if(unaligned){unaligned=(ptr+4-unaligned)|0;while((ptr|0)<(unaligned|0)){HEAP8[(ptr)]=value;ptr=(ptr+1)|0;}}
while((ptr|0)<(stop4|0)){HEAP32[((ptr)>>2)]=value4;ptr=(ptr+4)|0;}}
while((ptr|0)<(stop|0)){HEAP8[(ptr)]=value;ptr=(ptr+1)|0;}}
var Browser={mainLoop:{scheduler:null,shouldPause:false,paused:false,queue:[],pause:function(){Browser.mainLoop.shouldPause=true;},resume:function(){if(Browser.mainLoop.paused){Browser.mainLoop.paused=false;Browser.mainLoop.scheduler();}
Browser.mainLoop.shouldPause=false;},updateStatus:function(){if(Module['setStatus']){var message=Module['statusMessage']||'Please wait...';var remaining=Browser.mainLoop.remainingBlockers;var expected=Browser.mainLoop.expectedBlockers;if(remaining){if(remaining<expected){Module['setStatus'](message+' ('+(expected-remaining)+'/'+expected+')');}else{Module['setStatus'](message);}}else{Module['setStatus']('');}}}},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function(){if(!Module["preloadPlugins"])Module["preloadPlugins"]=[];if(Browser.initted||ENVIRONMENT_IS_WORKER)return;Browser.initted=true;try{new Blob();Browser.hasBlobConstructor=true;}catch(e){Browser.hasBlobConstructor=false;console.log("warning: no blob constructor, cannot create blobs with mimetypes");}
Browser.BlobBuilder=typeof MozBlobBuilder!="undefined"?MozBlobBuilder:(typeof WebKitBlobBuilder!="undefined"?WebKitBlobBuilder:(!Browser.hasBlobConstructor?console.log("warning: no BlobBuilder"):null));Browser.URLObject=typeof window!="undefined"?(window.URL?window.URL:window.webkitURL):undefined;if(!Module.noImageDecoding&&typeof Browser.URLObject==='undefined'){console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");Module.noImageDecoding=true;}
var imagePlugin={};imagePlugin['canHandle']=function(name){return!Module.noImageDecoding&&/\.(jpg|jpeg|png|bmp)$/i.test(name);};imagePlugin['handle']=function(byteArray,name,onload,onerror){var b=null;if(Browser.hasBlobConstructor){try{b=new Blob([byteArray],{type:Browser.getMimetype(name)});if(b.size!==byteArray.length){b=new Blob([(new Uint8Array(byteArray)).buffer],{type:Browser.getMimetype(name)});}}catch(e){Runtime.warnOnce('Blob constructor present but fails: '+e+'; falling back to blob builder');}}
if(!b){var bb=new Browser.BlobBuilder();bb.append((new Uint8Array(byteArray)).buffer);b=bb.getBlob();}
var url=Browser.URLObject.createObjectURL(b);assert(typeof url=='string','createObjectURL must return a url as a string');var img=new Image();img.onload=function(){assert(img.complete,'Image '+name+' could not be decoded');var canvas=document.createElement('canvas');canvas.width=img.width;canvas.height=img.height;var ctx=canvas.getContext('2d');ctx.drawImage(img,0,0);Module["preloadedImages"][name]=canvas;Browser.URLObject.revokeObjectURL(url);if(onload)onload(byteArray);};img.onerror=function(event){console.log('Image '+url+' could not be decoded');if(onerror)onerror();};img.src=url;};Module['preloadPlugins'].push(imagePlugin);var audioPlugin={};audioPlugin['canHandle']=function(name){return!Module.noAudioDecoding&&name.substr(-4)in{'.ogg':1,'.wav':1,'.mp3':1};};audioPlugin['handle']=function(byteArray,name,onload,onerror){var done=false;function finish(audio){if(done)return;done=true;Module["preloadedAudios"][name]=audio;if(onload)onload(byteArray);}
function fail(){if(done)return;done=true;Module["preloadedAudios"][name]=new Audio();if(onerror)onerror();}
if(Browser.hasBlobConstructor){try{var b=new Blob([byteArray],{type:Browser.getMimetype(name)});}catch(e){return fail();}
var url=Browser.URLObject.createObjectURL(b);assert(typeof url=='string','createObjectURL must return a url as a string');var audio=new Audio();audio.addEventListener('canplaythrough',function(){finish(audio)},false);audio.onerror=function(event){if(done)return;console.log('warning: browser could not fully decode audio '+name+', trying slower base64 approach');function encode64(data){var BASE='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';var PAD='=';var ret='';var leftchar=0;var leftbits=0;for(var i=0;i<data.length;i++){leftchar=(leftchar<<8)|data[i];leftbits+=8;while(leftbits>=6){var curr=(leftchar>>(leftbits-6))&0x3f;leftbits-=6;ret+=BASE[curr];}}
if(leftbits==2){ret+=BASE[(leftchar&3)<<4];ret+=PAD+PAD;}else if(leftbits==4){ret+=BASE[(leftchar&0xf)<<2];ret+=PAD;}
return ret;}
audio.src='data:audio/x-'+name.substr(-3)+';base64,'+encode64(byteArray);finish(audio);};audio.src=url;Browser.safeSetTimeout(function(){finish(audio);},10000);}else{return fail();}};Module['preloadPlugins'].push(audioPlugin);var canvas=Module['canvas'];canvas.requestPointerLock=canvas['requestPointerLock']||canvas['mozRequestPointerLock']||canvas['webkitRequestPointerLock'];canvas.exitPointerLock=document['exitPointerLock']||document['mozExitPointerLock']||document['webkitExitPointerLock']||function(){};canvas.exitPointerLock=canvas.exitPointerLock.bind(document);function pointerLockChange(){Browser.pointerLock=document['pointerLockElement']===canvas||document['mozPointerLockElement']===canvas||document['webkitPointerLockElement']===canvas;}
document.addEventListener('pointerlockchange',pointerLockChange,false);document.addEventListener('mozpointerlockchange',pointerLockChange,false);document.addEventListener('webkitpointerlockchange',pointerLockChange,false);if(Module['elementPointerLock']){canvas.addEventListener("click",function(ev){if(!Browser.pointerLock&&canvas.requestPointerLock){canvas.requestPointerLock();ev.preventDefault();}},false);}},createContext:function(canvas,useWebGL,setInModule){var ctx;try{if(useWebGL){ctx=canvas.getContext('experimental-webgl',{alpha:false});}else{ctx=canvas.getContext('2d');}
if(!ctx)throw':(';}catch(e){Module.print('Could not create canvas - '+e);return null;}
if(useWebGL){canvas.style.backgroundColor="black";canvas.addEventListener('webglcontextlost',function(event){alert('WebGL context lost. You will need to reload the page.');},false);}
if(setInModule){Module.ctx=ctx;Module.useWebGL=useWebGL;Browser.moduleContextCreatedCallbacks.forEach(function(callback){callback()});Browser.init();}
return ctx;},destroyContext:function(canvas,useWebGL,setInModule){},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function(lockPointer,resizeCanvas){Browser.lockPointer=lockPointer;Browser.resizeCanvas=resizeCanvas;if(typeof Browser.lockPointer==='undefined')Browser.lockPointer=true;if(typeof Browser.resizeCanvas==='undefined')Browser.resizeCanvas=false;var canvas=Module['canvas'];function fullScreenChange(){Browser.isFullScreen=false;if((document['webkitFullScreenElement']||document['webkitFullscreenElement']||document['mozFullScreenElement']||document['mozFullscreenElement']||document['fullScreenElement']||document['fullscreenElement'])===canvas){canvas.cancelFullScreen=document['cancelFullScreen']||document['mozCancelFullScreen']||document['webkitCancelFullScreen'];canvas.cancelFullScreen=canvas.cancelFullScreen.bind(document);if(Browser.lockPointer)canvas.requestPointerLock();Browser.isFullScreen=true;if(Browser.resizeCanvas)Browser.setFullScreenCanvasSize();}else if(Browser.resizeCanvas){Browser.setWindowedCanvasSize();}
if(Module['onFullScreen'])Module['onFullScreen'](Browser.isFullScreen);}
if(!Browser.fullScreenHandlersInstalled){Browser.fullScreenHandlersInstalled=true;document.addEventListener('fullscreenchange',fullScreenChange,false);document.addEventListener('mozfullscreenchange',fullScreenChange,false);document.addEventListener('webkitfullscreenchange',fullScreenChange,false);}
canvas.requestFullScreen=canvas['requestFullScreen']||canvas['mozRequestFullScreen']||(canvas['webkitRequestFullScreen']?function(){canvas['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT'])}:null);canvas.requestFullScreen();},requestAnimationFrame:function(func){if(!window.requestAnimationFrame){window.requestAnimationFrame=window['requestAnimationFrame']||window['mozRequestAnimationFrame']||window['webkitRequestAnimationFrame']||window['msRequestAnimationFrame']||window['oRequestAnimationFrame']||window['setTimeout'];}
window.requestAnimationFrame(func);},safeCallback:function(func){return function(){if(!ABORT)return func.apply(null,arguments);};},safeRequestAnimationFrame:function(func){return Browser.requestAnimationFrame(function(){if(!ABORT)func();});},safeSetTimeout:function(func,timeout){return setTimeout(function(){if(!ABORT)func();},timeout);},safeSetInterval:function(func,timeout){return setInterval(function(){if(!ABORT)func();},timeout);},getMimetype:function(name){return{'jpg':'image/jpeg','jpeg':'image/jpeg','png':'image/png','bmp':'image/bmp','ogg':'audio/ogg','wav':'audio/wav','mp3':'audio/mpeg'}[name.substr(name.lastIndexOf('.')+1)];},getUserMedia:function(func){if(!window.getUserMedia){window.getUserMedia=navigator['getUserMedia']||navigator['mozGetUserMedia'];}
window.getUserMedia(func);},getMovementX:function(event){return event['movementX']||event['mozMovementX']||event['webkitMovementX']||0;},getMovementY:function(event){return event['movementY']||event['mozMovementY']||event['webkitMovementY']||0;},mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,calculateMouseEvent:function(event){if(Browser.pointerLock){if(event.type!='mousemove'&&('mozMovementX'in event)){Browser.mouseMovementX=Browser.mouseMovementY=0;}else{Browser.mouseMovementX=Browser.getMovementX(event);Browser.mouseMovementY=Browser.getMovementY(event);}
if(typeof SDL!="undefined"){Browser.mouseX=SDL.mouseX+Browser.mouseMovementX;Browser.mouseY=SDL.mouseY+Browser.mouseMovementY;}else{Browser.mouseX+=Browser.mouseMovementX;Browser.mouseY+=Browser.mouseMovementY;}}else{var rect=Module["canvas"].getBoundingClientRect();var x,y;if(event.type=='touchstart'||event.type=='touchend'||event.type=='touchmove'){var t=event.touches.item(0);if(t){x=t.pageX-(window.scrollX+rect.left);y=t.pageY-(window.scrollY+rect.top);}else{return;}}else{x=event.pageX-(window.scrollX+rect.left);y=event.pageY-(window.scrollY+rect.top);}
var cw=Module["canvas"].width;var ch=Module["canvas"].height;x=x*(cw/rect.width);y=y*(ch/rect.height);Browser.mouseMovementX=x-Browser.mouseX;Browser.mouseMovementY=y-Browser.mouseY;Browser.mouseX=x;Browser.mouseY=y;}},xhrLoad:function(url,onload,onerror){var xhr=new XMLHttpRequest();xhr.open('GET',url,true);xhr.responseType='arraybuffer';xhr.onload=function(){if(xhr.status==200||(xhr.status==0&&xhr.response)){onload(xhr.response);}else{onerror();}};xhr.onerror=onerror;xhr.send(null);},asyncLoad:function(url,onload,onerror,noRunDep){Browser.xhrLoad(url,function(arrayBuffer){assert(arrayBuffer,'Loading data file "'+url+'" failed (no arrayBuffer).');onload(new Uint8Array(arrayBuffer));if(!noRunDep)removeRunDependency('al '+url);},function(event){if(onerror){onerror();}else{throw'Loading data file "'+url+'" failed.';}});if(!noRunDep)addRunDependency('al '+url);},resizeListeners:[],updateResizeListeners:function(){var canvas=Module['canvas'];Browser.resizeListeners.forEach(function(listener){listener(canvas.width,canvas.height);});},setCanvasSize:function(width,height,noUpdates){var canvas=Module['canvas'];canvas.width=width;canvas.height=height;if(!noUpdates)Browser.updateResizeListeners();},windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function(){var canvas=Module['canvas'];this.windowedWidth=canvas.width;this.windowedHeight=canvas.height;canvas.width=screen.width;canvas.height=screen.height;if(typeof SDL!="undefined"){var flags=HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];flags=flags|0x00800000;HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags}
Browser.updateResizeListeners();},setWindowedCanvasSize:function(){var canvas=Module['canvas'];canvas.width=this.windowedWidth;canvas.height=this.windowedHeight;if(typeof SDL!="undefined"){var flags=HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];flags=flags&~0x00800000;HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags}
Browser.updateResizeListeners();}};FS.staticInit();__ATINIT__.unshift({func:function(){if(!Module["noFSInit"]&&!FS.init.initialized)FS.init()}});__ATMAIN__.push({func:function(){FS.ignorePermissions=false}});__ATEXIT__.push({func:function(){FS.quit()}});Module["FS_createFolder"]=FS.createFolder;Module["FS_createPath"]=FS.createPath;Module["FS_createDataFile"]=FS.createDataFile;Module["FS_createPreloadedFile"]=FS.createPreloadedFile;Module["FS_createLazyFile"]=FS.createLazyFile;Module["FS_createLink"]=FS.createLink;Module["FS_createDevice"]=FS.createDevice;___errno_state=Runtime.staticAlloc(4);HEAP32[((___errno_state)>>2)]=0;__ATINIT__.unshift({func:function(){TTY.init()}});__ATEXIT__.push({func:function(){TTY.shutdown()}});TTY.utf8=new Runtime.UTF8Processor();__ATINIT__.push({func:function(){SOCKFS.root=FS.mount(SOCKFS,{},null);}});Module["requestFullScreen"]=function(lockPointer,resizeCanvas){Browser.requestFullScreen(lockPointer,resizeCanvas)};Module["requestAnimationFrame"]=function(func){Browser.requestAnimationFrame(func)};Module["setCanvasSize"]=function(width,height,noUpdates){Browser.setCanvasSize(width,height,noUpdates)};Module["pauseMainLoop"]=function(){Browser.mainLoop.pause()};Module["resumeMainLoop"]=function(){Browser.mainLoop.resume()};Module["getUserMedia"]=function(){Browser.getUserMedia()}
STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);staticSealed=true;STACK_MAX=STACK_BASE+5242880;DYNAMIC_BASE=DYNAMICTOP=Runtime.alignMemory(STACK_MAX);assert(DYNAMIC_BASE<TOTAL_MEMORY);var FUNCTION_TABLE=[0,0,__ZN6SolverC2Ev,0,__ZN6SolverD2Ev];function ___cxx_global_var_init(){var label=0;__ZN3LitC1Eib(2776,-1,0);return;}
function __ZN3LitC1Eib($this,$var,$sign){var label=0;var $1;var $2;var $3;$1=$this;$2=$var;var $4=(($sign)&(1));$3=$4;var $5=$1;var $6=$2;var $7=$3;var $8=(($7)&1);__ZN3LitC2Eib($5,$6,$8);return;}
function ___cxx_global_var_init1(){var label=0;__ZN3LitC1Eib(2792,-1,1);return;}
function ___cxx_global_var_init2(){var label=0;__Z7toLbooli(2840,1);return;}
function __Z7toLbooli($agg_result,$v){var label=0;var $1;$1=$v;var $2=$1;__ZN5lboolC1Ei($agg_result,$2);return;}
function ___cxx_global_var_init3(){var label=0;__Z7toLbooli(2824,-1);return;}
function ___cxx_global_var_init4(){var label=0;__Z7toLbooli(2808,0);return;}
function __Z10printStatsR6Solver($solver){var label=0;var tempVarArgs=0;var sp=STACKTOP;STACKTOP=(STACKTOP+8)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $cpu_time;var $mem_used=sp;$1=$solver;var $2=__ZL7cpuTimev();$cpu_time=$2;var $3$0=__ZL7memUsedv();var $3$1=tempRet0;var $st$0$0=(($mem_used)|0);HEAP32[(($st$0$0)>>2)]=$3$0;var $st$1$1=(($mem_used+4)|0);HEAP32[(($st$1$1)>>2)]=$3$1;var $4=HEAP32[((_stdout)>>2)];var $5=$1;var $6=(($5+96)|0);var $ld$2$0=(($6)|0);var $7$0=HEAP32[(($ld$2$0)>>2)];var $ld$3$1=(($6+4)|0);var $7$1=HEAP32[(($ld$3$1)>>2)];var $$etemp$4=((1960)|0);var $8=_fprintf($4,$$etemp$4,(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+16)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$7$0,HEAP32[(((tempVarArgs)+(8))>>2)]=$7$1,tempVarArgs));STACKTOP=tempVarArgs;var $9=HEAP32[((_stdout)>>2)];var $10=$1;var $11=(($10+128)|0);var $ld$5$0=(($11)|0);var $12$0=HEAP32[(($ld$5$0)>>2)];var $ld$6$1=(($11+4)|0);var $12$1=HEAP32[(($ld$6$1)>>2)];var $13=$1;var $14=(($13+128)|0);var $ld$7$0=(($14)|0);var $15$0=HEAP32[(($ld$7$0)>>2)];var $ld$8$1=(($14+4)|0);var $15$1=HEAP32[(($ld$8$1)>>2)];var $16=((($15$0)>>>(0))+((($15$1)>>>(0))*4294967296));var $17=$cpu_time;var $18=($16)/($17);var $$etemp$9=((344)|0);var $19=_fprintf($9,$$etemp$9,(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+24)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$12$0,HEAP32[(((tempVarArgs)+(8))>>2)]=$12$1,HEAPF64[(((tempVarArgs)+(16))>>3)]=$18,tempVarArgs));STACKTOP=tempVarArgs;var $20=HEAP32[((_stdout)>>2)];var $21=$1;var $22=(($21+104)|0);var $ld$10$0=(($22)|0);var $23$0=HEAP32[(($ld$10$0)>>2)];var $ld$11$1=(($22+4)|0);var $23$1=HEAP32[(($ld$11$1)>>2)];var $24=$1;var $25=(($24+112)|0);var $ld$12$0=(($25)|0);var $26$0=HEAP32[(($ld$12$0)>>2)];var $ld$13$1=(($25+4)|0);var $26$1=HEAP32[(($ld$13$1)>>2)];var $27=((($26$0)>>>(0))+((($26$1)>>>(0))*4294967296));var $28=($27)*(100);var $29=$1;var $30=(($29+104)|0);var $ld$14$0=(($30)|0);var $31$0=HEAP32[(($ld$14$0)>>2)];var $ld$15$1=(($30+4)|0);var $31$1=HEAP32[(($ld$15$1)>>2)];var $32=((($31$0)>>>(0))+((($31$1)>>>(0))*4294967296));var $33=($28)/($32);var $34=$33;var $35=$1;var $36=(($35+104)|0);var $ld$16$0=(($36)|0);var $37$0=HEAP32[(($ld$16$0)>>2)];var $ld$17$1=(($36+4)|0);var $37$1=HEAP32[(($ld$17$1)>>2)];var $38=((($37$0)>>>(0))+((($37$1)>>>(0))*4294967296));var $39=$cpu_time;var $40=($38)/($39);var $$etemp$18=((256)|0);var $41=_fprintf($20,$$etemp$18,(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+32)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$23$0,HEAP32[(((tempVarArgs)+(8))>>2)]=$23$1,HEAPF64[(((tempVarArgs)+(16))>>3)]=$34,HEAPF64[(((tempVarArgs)+(24))>>3)]=$40,tempVarArgs));STACKTOP=tempVarArgs;var $42=HEAP32[((_stdout)>>2)];var $43=$1;var $44=(($43+120)|0);var $ld$19$0=(($44)|0);var $45$0=HEAP32[(($ld$19$0)>>2)];var $ld$20$1=(($44+4)|0);var $45$1=HEAP32[(($ld$20$1)>>2)];var $46=$1;var $47=(($46+120)|0);var $ld$21$0=(($47)|0);var $48$0=HEAP32[(($ld$21$0)>>2)];var $ld$22$1=(($47+4)|0);var $48$1=HEAP32[(($ld$22$1)>>2)];var $49=((($48$0)>>>(0))+((($48$1)>>>(0))*4294967296));var $50=$cpu_time;var $51=($49)/($50);var $$etemp$23=((184)|0);var $52=_fprintf($42,$$etemp$23,(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+24)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$45$0,HEAP32[(((tempVarArgs)+(8))>>2)]=$45$1,HEAPF64[(((tempVarArgs)+(16))>>3)]=$51,tempVarArgs));STACKTOP=tempVarArgs;var $53=HEAP32[((_stdout)>>2)];var $54=$1;var $55=(($54+160)|0);var $ld$24$0=(($55)|0);var $56$0=HEAP32[(($ld$24$0)>>2)];var $ld$25$1=(($55+4)|0);var $56$1=HEAP32[(($ld$25$1)>>2)];var $57=$1;var $58=(($57+152)|0);var $ld$26$0=(($58)|0);var $59$0=HEAP32[(($ld$26$0)>>2)];var $ld$27$1=(($58+4)|0);var $59$1=HEAP32[(($ld$27$1)>>2)];var $60=$1;var $61=(($60+160)|0);var $ld$28$0=(($61)|0);var $62$0=HEAP32[(($ld$28$0)>>2)];var $ld$29$1=(($61+4)|0);var $62$1=HEAP32[(($ld$29$1)>>2)];var $63$0=_i64Subtract($59$0,$59$1,$62$0,$62$1);var $63$1=tempRet0;var $$etemp$30$0=100;var $$etemp$30$1=0;var $64$0=___muldi3($63$0,$63$1,$$etemp$30$0,$$etemp$30$1);var $64$1=tempRet0;var $65=((($64$0)>>>(0))+((($64$1)>>>(0))*4294967296));var $66=$1;var $67=(($66+152)|0);var $ld$31$0=(($67)|0);var $68$0=HEAP32[(($ld$31$0)>>2)];var $ld$32$1=(($67+4)|0);var $68$1=HEAP32[(($ld$32$1)>>2)];var $69=((($68$0)>>>(0))+((($68$1)>>>(0))*4294967296));var $70=($65)/($69);var $$etemp$33=((112)|0);var $71=_fprintf($53,$$etemp$33,(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+24)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$56$0,HEAP32[(((tempVarArgs)+(8))>>2)]=$56$1,HEAPF64[(((tempVarArgs)+(16))>>3)]=$70,tempVarArgs));STACKTOP=tempVarArgs;var $ld$34$0=(($mem_used)|0);var $72$0=HEAP32[(($ld$34$0)>>2)];var $ld$35$1=(($mem_used+4)|0);var $72$1=HEAP32[(($ld$35$1)>>2)];var $$etemp$36$0=0;var $$etemp$36$1=0;var $73=(($72$0|0)!=($$etemp$36$0|0))|(($72$1|0)!=($$etemp$36$1|0));if($73){label=2;break;}else{label=3;break;}
case 2:var $75=HEAP32[((_stdout)>>2)];var $ld$37$0=(($mem_used)|0);var $76$0=HEAP32[(($ld$37$0)>>2)];var $ld$38$1=(($mem_used+4)|0);var $76$1=HEAP32[(($ld$38$1)>>2)];var $77=((($76$0)>>>(0))+((($76$1)>>>(0))*4294967296));var $78=($77)/(1048576);var $79=_fprintf($75,((40)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+8)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAPF64[((tempVarArgs)>>3)]=$78,tempVarArgs));STACKTOP=tempVarArgs;label=3;break;case 3:var $81=HEAP32[((_stdout)>>2)];var $82=$cpu_time;var $83=_fprintf($81,((1928)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+8)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAPF64[((tempVarArgs)>>3)]=$82,tempVarArgs));STACKTOP=tempVarArgs;STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZL7cpuTimev(){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+136)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var $ru=sp;var $1=_getrusage(0,$ru);var $2=(($ru)|0);var $3=(($2)|0);var $4=HEAP32[(($3)>>2)];var $5=(($4)|(0));var $6=(($ru)|0);var $7=(($6+4)|0);var $8=HEAP32[(($7)>>2)];var $9=(($8)|(0));var $10=($9)/(1000000);var $11=($5)+($10);STACKTOP=sp;return $11;}
function __ZL7memUsedv(){var label=0;var $$etemp$0$0=0;var $$etemp$0$1=0;return(tempRet0=$$etemp$0$1,$$etemp$0$0);}
function __Z9htmlstuffPKc($cnfdata){var label=0;var tempVarArgs=0;var sp=STACKTOP;STACKTOP=(STACKTOP+472)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $S=sp;var $3;var $4;var $cpu_time;var $parse_time;var $5;var $ret;var $i;var $6=(sp)+(456);var $7=(sp)+(464);$2=$cnfdata;__ZN6SolverC2Ev($S);var $8=(($S+88)|0);HEAP32[(($8)>>2)]=1;var $9=HEAP32[((_stdout)>>2)];var $10=(function(){try{__THREW__=0;return _fprintf($9,((1704)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();STACKTOP=tempVarArgs;if(!__THREW__){label=2;break;}else{label=13;break;}
case 2:var $12=(function(){try{__THREW__=0;return __ZL7cpuTimev()}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=3;break;}else{label=13;break;}
case 3:$cpu_time=$12;HEAP32[((2248)>>2)]=$S;var $14=HEAP32[((_stdout)>>2)];var $15=(function(){try{__THREW__=0;return _fprintf($14,((1592)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();STACKTOP=tempVarArgs;if(!__THREW__){label=4;break;}else{label=13;break;}
case 4:var $17=HEAP32[((_stdout)>>2)];var $18=(function(){try{__THREW__=0;return _fprintf($17,((1416)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();STACKTOP=tempVarArgs;if(!__THREW__){label=5;break;}else{label=13;break;}
case 5:var $20=$2;(function(){try{__THREW__=0;return __ZL12parse_DIMACSPKcR6Solver($20,$S)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=6;break;}else{label=13;break;}
case 6:var $22=(function(){try{__THREW__=0;return __ZL7cpuTimev()}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=7;break;}else{label=13;break;}
case 7:var $24=$cpu_time;var $25=($22)-($24);$parse_time=$25;var $26=HEAP32[((_stdout)>>2)];var $27=$parse_time;var $28=(function(){try{__THREW__=0;return _fprintf($26,((1248)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+8)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAPF64[((tempVarArgs)>>3)]=$27,tempVarArgs))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();STACKTOP=tempVarArgs;if(!__THREW__){label=8;break;}else{label=13;break;}
case 8:var $30=(function(){try{__THREW__=0;return __ZN6Solver8simplifyEv($S)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=9;break;}else{label=13;break;}
case 9:if($30){label=14;break;}else{label=10;break;}
case 10:var $33=HEAP32[((_stdout)>>2)];var $34=(function(){try{__THREW__=0;return _fprintf($33,((1128)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();STACKTOP=tempVarArgs;if(!__THREW__){label=11;break;}else{label=13;break;}
case 11:var $36=(function(){try{__THREW__=0;return _printf(((1024)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();STACKTOP=tempVarArgs;if(!__THREW__){label=12;break;}else{label=13;break;}
case 12:$1=20;$5=1;label=37;break;case 13:var $39$0=___cxa_find_matching_catch(-1,-1);$39$1=tempRet0;var $40=$39$0;$3=$40;var $41=$39$1;$4=$41;(function(){try{__THREW__=0;return __ZN6SolverD2Ev($S)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=38;break;}else{label=40;break;}
case 14:var $43=(function(){try{__THREW__=0;return __ZN6Solver5solveEv($S)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=15;break;}else{label=13;break;}
case 15:var $45=(($43)&(1));$ret=$45;(function(){try{__THREW__=0;return __Z10printStatsR6Solver($S)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=16;break;}else{label=13;break;}
case 16:var $47=HEAP32[((_stdout)>>2)];var $48=(function(){try{__THREW__=0;return _fprintf($47,((1776)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();STACKTOP=tempVarArgs;if(!__THREW__){label=17;break;}else{label=13;break;}
case 17:var $50=$ret;var $51=(($50)&1);var $52=$51?(((952)|0)):(((1024)|0));var $53=(function(){try{__THREW__=0;return _printf($52,(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();STACKTOP=tempVarArgs;if(!__THREW__){label=18;break;}else{label=13;break;}
case 18:var $55=$ret;var $56=(($55)&1);if($56){label=19;break;}else{label=34;break;}
case 19:var $58=(function(){try{__THREW__=0;return _printf(((920)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();STACKTOP=tempVarArgs;if(!__THREW__){label=20;break;}else{label=13;break;}
case 20:$i=0;label=21;break;case 21:var $61=$i;var $62=(function(){try{__THREW__=0;return __ZNK6Solver5nVarsEv($S)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=22;break;}else{label=13;break;}
case 22:var $64=(($61)|(0))<(($62)|(0));if($64){label=23;break;}else{label=32;break;}
case 23:var $66=(($S)|0);var $67=$i;var $68=(function(){try{__THREW__=0;return __ZN3vecI5lboolEixEi($66,$67)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=24;break;}else{label=13;break;}
case 24:var $70=$6;assert(1%1===0);HEAP8[($70)]=HEAP8[((((2808)|0))|0)];var $71=(function(){try{__THREW__=0;return __ZNK5lboolneES_($68,$6)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=25;break;}else{label=13;break;}
case 25:if($71){label=26;break;}else{label=30;break;}
case 26:var $74=$i;var $75=(($74)|(0))==0;var $76=$75?(((2288)|0)):(((848)|0));var $77=(($S)|0);var $78=$i;var $79=(function(){try{__THREW__=0;return __ZN3vecI5lboolEixEi($77,$78)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=27;break;}else{label=13;break;}
case 27:var $81=$7;assert(1%1===0);HEAP8[($81)]=HEAP8[((((2840)|0))|0)];var $82=(function(){try{__THREW__=0;return __ZNK5lbooleqES_($79,$7)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=28;break;}else{label=13;break;}
case 28:var $84=$82?(((2288)|0)):(((832)|0));var $85=$i;var $86=((($85)+(1))|0);var $87=(function(){try{__THREW__=0;return _printf(((888)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+24)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$76,HEAP32[(((tempVarArgs)+(8))>>2)]=$84,HEAP32[(((tempVarArgs)+(16))>>2)]=$86,tempVarArgs))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();STACKTOP=tempVarArgs;if(!__THREW__){label=29;break;}else{label=13;break;}
case 29:label=30;break;case 30:label=31;break;case 31:var $91=$i;var $92=((($91)+(1))|0);$i=$92;label=21;break;case 32:var $94=(function(){try{__THREW__=0;return _printf(((792)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();STACKTOP=tempVarArgs;if(!__THREW__){label=33;break;}else{label=13;break;}
case 33:label=36;break;case 34:var $97=(function(){try{__THREW__=0;return _printf(((784)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();STACKTOP=tempVarArgs;if(!__THREW__){label=35;break;}else{label=13;break;}
case 35:label=36;break;case 36:var $100=$ret;var $101=(($100)&1);var $102=$101?10:20;$1=$102;$5=1;label=37;break;case 37:__ZN6SolverD2Ev($S);var $104=$1;STACKTOP=sp;return $104;case 38:label=39;break;case 39:var $107=$3;var $108=$4;var $109$0=$107;var $109$1=0;var $110$0=$109$0;var $110$1=$108;___resumeException($110$0)
case 40:var $112$0=___cxa_find_matching_catch(-1,-1,0);$112$1=tempRet0;__ZSt9terminatev();throw"Reached an unreachable!";default:assert(0,"bad label: "+label);}}
function __ZL12parse_DIMACSPKcR6Solver($cnfdata,$S){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+8)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var $1=sp;var $2;HEAP32[(($1)>>2)]=$cnfdata;$2=$S;var $3=$2;__ZL17parse_DIMACS_mainIPKcEvRT_R6Solver($1,$3);STACKTOP=sp;return;}
function __ZN6Solver5solveEv($this){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+16)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $tmp=sp;var $2;var $3;var $4;$1=$this;var $5=$1;__ZN3vecI3LitEC1Ev($tmp);var $6=(function(){try{__THREW__=0;return __ZN6Solver5solveERK3vecI3LitE($5,$tmp)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=2;break;}else{label=3;break;}
case 2:$4=1;__ZN3vecI3LitED1Ev($tmp);STACKTOP=sp;return $6;case 3:var $9$0=___cxa_find_matching_catch(-1,-1);$9$1=tempRet0;var $10=$9$0;$2=$10;var $11=$9$1;$3=$11;(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($tmp)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=4;break;}else{label=6;break;}
case 4:label=5;break;case 5:var $14=$2;var $15=$3;var $16$0=$14;var $16$1=0;var $17$0=$16$0;var $17$1=$15;___resumeException($17$0)
case 6:var $19$0=___cxa_find_matching_catch(-1,-1,0);$19$1=tempRet0;__ZSt9terminatev();throw"Reached an unreachable!";default:assert(0,"bad label: "+label);}}
function __ZNK6Solver5nVarsEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+244)|0);var $4=__ZNK3vecIcE4sizeEv($3);return $4;}
function __ZN3vecI5lboolEixEi($this,$index){var label=0;var $1;var $2;$1=$this;$2=$index;var $3=$1;var $4=$2;var $5=(($3)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6+$4)|0);return $7;}
function __ZNK5lboolneES_($this,$b){var label=0;var sp=STACKTOP;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$b;$b=STACKTOP;STACKTOP=(STACKTOP+1)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);;;HEAP8[($b)]=HEAP8[(tempParam)];var $1;$1=$this;var $2=$1;var $3=(($2)|0);var $4=HEAP8[($3)];var $5=(($4<<24)>>24);var $6=(($b)|0);var $7=HEAP8[($6)];var $8=(($7<<24)>>24);var $9=(($5)|(0))!=(($8)|(0));STACKTOP=sp;return $9;}
function __ZNK5lbooleqES_($this,$b){var label=0;var sp=STACKTOP;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$b;$b=STACKTOP;STACKTOP=(STACKTOP+1)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);;;HEAP8[($b)]=HEAP8[(tempParam)];var $1;$1=$this;var $2=$1;var $3=(($2)|0);var $4=HEAP8[($3)];var $5=(($4<<24)>>24);var $6=(($b)|0);var $7=HEAP8[($6)];var $8=(($7<<24)>>24);var $9=(($5)|(0))==(($8)|(0));STACKTOP=sp;return $9;}
function _htmlstuff_c($cnfdata){var label=0;var $1;$1=$cnfdata;var $2=$1;var $3=__Z9htmlstuffPKc($2);return $3;}
Module["_htmlstuff_c"]=_htmlstuff_c;function __ZNK3vecIcE4sizeEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+4)|0);var $4=HEAP32[(($3)>>2)];return $4;}
function __ZN3vecI3LitEC1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecI3LitEC2Ev($2);return;}
function __ZN3vecI3LitED1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecI3LitED2Ev($2);return;}
function __ZN3vecI3LitED2Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecI3LitE5clearEb($2,1);return;}
function __ZN3vecI3LitE5clearEb($this,$dealloc){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;$1=$this;var $3=(($dealloc)&(1));$2=$3;var $4=$1;var $5=(($4)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6)|(0))!=0;if($7){label=2;break;}else{label=9;break;}
case 2:$i=0;label=3;break;case 3:var $10=$i;var $11=(($4+4)|0);var $12=HEAP32[(($11)>>2)];var $13=(($10)|(0))<(($12)|(0));if($13){label=4;break;}else{label=6;break;}
case 4:var $15=$i;var $16=(($4)|0);var $17=HEAP32[(($16)>>2)];var $18=(($17+($15<<2))|0);label=5;break;case 5:var $20=$i;var $21=((($20)+(1))|0);$i=$21;label=3;break;case 6:var $23=(($4+4)|0);HEAP32[(($23)>>2)]=0;var $24=$2;var $25=(($24)&1);if($25){label=7;break;}else{label=8;break;}
case 7:var $27=(($4)|0);var $28=HEAP32[(($27)>>2)];var $29=$28;_free($29);var $30=(($4)|0);HEAP32[(($30)>>2)]=0;var $31=(($4+8)|0);HEAP32[(($31)>>2)]=0;label=8;break;case 8:label=9;break;case 9:return;default:assert(0,"bad label: "+label);}}
function __ZN3vecI3LitEC2Ev($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2)|0);HEAP32[(($3)>>2)]=0;var $4=(($2+4)|0);HEAP32[(($4)>>2)]=0;var $5=(($2+8)|0);HEAP32[(($5)>>2)]=0;return;}
function __ZL17parse_DIMACS_mainIPKcEvRT_R6Solver($in,$S){var label=0;var tempVarArgs=0;var sp=STACKTOP;STACKTOP=(STACKTOP+16)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $lits=sp;var $3;var $4;var $vars;var $clauses;$1=$in;$2=$S;__ZN3vecI3LitEC1Ev($lits);label=2;break;case 2:var $6=$1;(function(){try{__THREW__=0;return __ZL14skipWhitespaceIPKcEvRT_($6)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=3;break;}else{label=6;break;}
case 3:var $8=$1;var $9=HEAP32[(($8)>>2)];var $10=HEAP8[($9)];var $11=(($10<<24)>>24);var $12=(($11)|(0))==-1;if($12){label=5;break;}else{label=4;break;}
case 4:var $14=$1;var $15=HEAP32[(($14)>>2)];var $16=HEAP8[($15)];var $17=(($16<<24)>>24);var $18=(($17)|(0))==0;if($18){label=5;break;}else{label=7;break;}
case 5:label=29;break;case 6:var $21$0=___cxa_find_matching_catch(-1,-1);$21$1=tempRet0;var $22=$21$0;$3=$22;var $23=$21$1;$4=$23;(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($lits)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=30;break;}else{label=32;break;}
case 7:var $25=$1;var $26=HEAP32[(($25)>>2)];var $27=HEAP8[($26)];var $28=(($27<<24)>>24);var $29=(($28)|(0))==112;if($29){label=8;break;}else{label=19;break;}
case 8:var $31=$1;var $32=(function(){try{__THREW__=0;return __ZL5matchIPKcEbRT_Pc($31,((768)|0))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=9;break;}else{label=6;break;}
case 9:if($32){label=10;break;}else{label=15;break;}
case 10:var $35=$1;var $36=(function(){try{__THREW__=0;return __ZL8parseIntIPKcEiRT_($35)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=11;break;}else{label=6;break;}
case 11:$vars=$36;var $38=$1;var $39=(function(){try{__THREW__=0;return __ZL8parseIntIPKcEiRT_($38)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=12;break;}else{label=6;break;}
case 12:$clauses=$39;var $41=HEAP32[((_stdout)>>2)];var $42=$vars;var $43=(function(){try{__THREW__=0;return _fprintf($41,((680)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+8)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$42,tempVarArgs))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();STACKTOP=tempVarArgs;if(!__THREW__){label=13;break;}else{label=6;break;}
case 13:var $45=HEAP32[((_stdout)>>2)];var $46=$clauses;var $47=(function(){try{__THREW__=0;return _fprintf($45,((592)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+8)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$46,tempVarArgs))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();STACKTOP=tempVarArgs;if(!__THREW__){label=14;break;}else{label=6;break;}
case 14:label=18;break;case 15:var $50=HEAP32[((_stdout)>>2)];var $51=$1;var $52=HEAP32[(($51)>>2)];var $53=HEAP8[($52)];var $54=(($53<<24)>>24);var $55=(function(){try{__THREW__=0;return _fprintf($50,((552)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+8)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$54,tempVarArgs))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();STACKTOP=tempVarArgs;if(!__THREW__){label=16;break;}else{label=6;break;}
case 16:(function(){try{__THREW__=0;return _exit(3)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=17;break;}else{label=6;break;}
case 17:throw"Reached an unreachable!";case 18:label=27;break;case 19:var $60=$1;var $61=HEAP32[(($60)>>2)];var $62=HEAP8[($61)];var $63=(($62<<24)>>24);var $64=(($63)|(0))==99;if($64){label=21;break;}else{label=20;break;}
case 20:var $66=$1;var $67=HEAP32[(($66)>>2)];var $68=HEAP8[($67)];var $69=(($68<<24)>>24);var $70=(($69)|(0))==112;if($70){label=21;break;}else{label=23;break;}
case 21:var $72=$1;(function(){try{__THREW__=0;return __ZL8skipLineIPKcEvRT_($72)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=22;break;}else{label=6;break;}
case 22:label=26;break;case 23:var $75=$1;var $76=$2;(function(){try{__THREW__=0;return __ZL10readClauseIPKcEvRT_R6SolverR3vecI3LitE($75,$76,$lits)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=24;break;}else{label=6;break;}
case 24:var $78=$2;var $79=(function(){try{__THREW__=0;return __ZN6Solver9addClauseER3vecI3LitE($78,$lits)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=25;break;}else{label=6;break;}
case 25:label=26;break;case 26:label=27;break;case 27:label=28;break;case 28:label=2;break;case 29:__ZN3vecI3LitED1Ev($lits);STACKTOP=sp;return;case 30:label=31;break;case 31:var $87=$3;var $88=$4;var $89$0=$87;var $89$1=0;var $90$0=$89$0;var $90$1=$88;___resumeException($90$0)
case 32:var $92$0=___cxa_find_matching_catch(-1,-1,0);$92$1=tempRet0;__ZSt9terminatev();throw"Reached an unreachable!";default:assert(0,"bad label: "+label);}}
function __ZL14skipWhitespaceIPKcEvRT_($in){var label=0;label=1;while(1)switch(label){case 1:var $1;$1=$in;label=2;break;case 2:var $3=$1;var $4=HEAP32[(($3)>>2)];var $5=HEAP8[($4)];var $6=(($5<<24)>>24);var $7=(($6)|(0))>=9;if($7){label=3;break;}else{label=4;break;}
case 3:var $9=$1;var $10=HEAP32[(($9)>>2)];var $11=HEAP8[($10)];var $12=(($11<<24)>>24);var $13=(($12)|(0))<=13;if($13){var $21=1;label=5;break;}else{label=4;break;}
case 4:var $15=$1;var $16=HEAP32[(($15)>>2)];var $17=HEAP8[($16)];var $18=(($17<<24)>>24);var $19=(($18)|(0))==32;var $21=$19;label=5;break;case 5:var $21;if($21){label=6;break;}else{label=7;break;}
case 6:var $23=$1;var $24=HEAP32[(($23)>>2)];var $25=(($24+1)|0);HEAP32[(($23)>>2)]=$25;label=2;break;case 7:return;default:assert(0,"bad label: "+label);}}
function __ZL5matchIPKcEbRT_Pc($in,$str){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $3;$2=$in;$3=$str;label=2;break;case 2:var $5=$3;var $6=HEAP8[($5)];var $7=(($6<<24)>>24);var $8=(($7)|(0))!=0;if($8){label=3;break;}else{label=7;break;}
case 3:var $10=$3;var $11=HEAP8[($10)];var $12=(($11<<24)>>24);var $13=$2;var $14=HEAP32[(($13)>>2)];var $15=HEAP8[($14)];var $16=(($15<<24)>>24);var $17=(($12)|(0))!=(($16)|(0));if($17){label=4;break;}else{label=5;break;}
case 4:$1=0;label=8;break;case 5:label=6;break;case 6:var $21=$3;var $22=(($21+1)|0);$3=$22;var $23=$2;var $24=HEAP32[(($23)>>2)];var $25=(($24+1)|0);HEAP32[(($23)>>2)]=$25;label=2;break;case 7:$1=1;label=8;break;case 8:var $28=$1;return $28;default:assert(0,"bad label: "+label);}}
function __ZL8parseIntIPKcEiRT_($in){var label=0;var tempVarArgs=0;var sp=STACKTOP;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $val;var $neg;$1=$in;$val=0;$neg=0;var $2=$1;__ZL14skipWhitespaceIPKcEvRT_($2);var $3=$1;var $4=HEAP32[(($3)>>2)];var $5=HEAP8[($4)];var $6=(($5<<24)>>24);var $7=(($6)|(0))==45;if($7){label=2;break;}else{label=3;break;}
case 2:$neg=1;var $9=$1;var $10=HEAP32[(($9)>>2)];var $11=(($10+1)|0);HEAP32[(($9)>>2)]=$11;label=6;break;case 3:var $13=$1;var $14=HEAP32[(($13)>>2)];var $15=HEAP8[($14)];var $16=(($15<<24)>>24);var $17=(($16)|(0))==43;if($17){label=4;break;}else{label=5;break;}
case 4:var $19=$1;var $20=HEAP32[(($19)>>2)];var $21=(($20+1)|0);HEAP32[(($19)>>2)]=$21;label=5;break;case 5:label=6;break;case 6:var $24=$1;var $25=HEAP32[(($24)>>2)];var $26=HEAP8[($25)];var $27=(($26<<24)>>24);var $28=(($27)|(0))<48;if($28){label=8;break;}else{label=7;break;}
case 7:var $30=$1;var $31=HEAP32[(($30)>>2)];var $32=HEAP8[($31)];var $33=(($32<<24)>>24);var $34=(($33)|(0))>57;if($34){label=8;break;}else{label=9;break;}
case 8:var $36=HEAP32[((_stdout)>>2)];var $37=$1;var $38=HEAP32[(($37)>>2)];var $39=HEAP8[($38)];var $40=(($39<<24)>>24);var $41=_fprintf($36,((552)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+8)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$40,tempVarArgs));STACKTOP=tempVarArgs;_exit(3);throw"Reached an unreachable!";case 9:label=10;break;case 10:var $44=$1;var $45=HEAP32[(($44)>>2)];var $46=HEAP8[($45)];var $47=(($46<<24)>>24);var $48=(($47)|(0))>=48;if($48){label=11;break;}else{var $56=0;label=12;break;}
case 11:var $50=$1;var $51=HEAP32[(($50)>>2)];var $52=HEAP8[($51)];var $53=(($52<<24)>>24);var $54=(($53)|(0))<=57;var $56=$54;label=12;break;case 12:var $56;if($56){label=13;break;}else{label=14;break;}
case 13:var $58=$val;var $59=((($58)*(10))&-1);var $60=$1;var $61=HEAP32[(($60)>>2)];var $62=HEAP8[($61)];var $63=(($62<<24)>>24);var $64=((($63)-(48))|0);var $65=((($59)+($64))|0);$val=$65;var $66=$1;var $67=HEAP32[(($66)>>2)];var $68=(($67+1)|0);HEAP32[(($66)>>2)]=$68;label=10;break;case 14:var $70=$neg;var $71=(($70)&1);if($71){label=15;break;}else{label=16;break;}
case 15:var $73=$val;var $74=(((-$73))|0);var $78=$74;label=17;break;case 16:var $76=$val;var $78=$76;label=17;break;case 17:var $78;STACKTOP=sp;return $78;default:assert(0,"bad label: "+label);}}
function __ZL8skipLineIPKcEvRT_($in){var label=0;label=1;while(1)switch(label){case 1:var $1;$1=$in;label=2;break;case 2:var $3=$1;var $4=HEAP32[(($3)>>2)];var $5=HEAP8[($4)];var $6=(($5<<24)>>24);var $7=(($6)|(0))==-1;if($7){label=4;break;}else{label=3;break;}
case 3:var $9=$1;var $10=HEAP32[(($9)>>2)];var $11=HEAP8[($10)];var $12=(($11<<24)>>24);var $13=(($12)|(0))==0;if($13){label=4;break;}else{label=5;break;}
case 4:label=8;break;case 5:var $16=$1;var $17=HEAP32[(($16)>>2)];var $18=HEAP8[($17)];var $19=(($18<<24)>>24);var $20=(($19)|(0))==10;if($20){label=6;break;}else{label=7;break;}
case 6:var $22=$1;var $23=HEAP32[(($22)>>2)];var $24=(($23+1)|0);HEAP32[(($22)>>2)]=$24;label=8;break;case 7:var $26=$1;var $27=HEAP32[(($26)>>2)];var $28=(($27+1)|0);HEAP32[(($26)>>2)]=$28;label=2;break;case 8:return;default:assert(0,"bad label: "+label);}}
function __ZL10readClauseIPKcEvRT_R6SolverR3vecI3LitE($in,$S,$lits){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+16)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $3;var $parsed_lit;var $var;var $4=sp;var $5=(sp)+(8);$1=$in;$2=$S;$3=$lits;var $6=$3;__ZN3vecI3LitE5clearEb($6,0);label=2;break;case 2:var $8=$1;var $9=__ZL8parseIntIPKcEiRT_($8);$parsed_lit=$9;var $10=$parsed_lit;var $11=(($10)|(0))==0;if($11){label=3;break;}else{label=4;break;}
case 3:label=11;break;case 4:var $14=$parsed_lit;var $15=Math.abs($14);var $16=((($15)-(1))|0);$var=$16;label=5;break;case 5:var $18=$var;var $19=$2;var $20=__ZNK6Solver5nVarsEv($19);var $21=(($18)|(0))>=(($20)|(0));if($21){label=6;break;}else{label=7;break;}
case 6:var $23=$2;var $24=__ZN6Solver6newVarEbb($23,1,1);label=5;break;case 7:var $26=$3;var $27=$parsed_lit;var $28=(($27)|(0))>0;if($28){label=8;break;}else{label=9;break;}
case 8:var $30=$var;__ZN3LitC1Eib($4,$30,0);label=10;break;case 9:var $32=$var;__ZN3LitC1Eib($5,$32,0);__Zco3Lit($4,$5);label=10;break;case 10:__ZN3vecI3LitE4pushERKS0_($26,$4);label=2;break;case 11:STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZN3vecI3LitE4pushERKS0_($this,$elem){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;$1=$this;$2=$elem;var $3=$1;var $4=(($3+4)|0);var $5=HEAP32[(($4)>>2)];var $6=(($3+8)|0);var $7=HEAP32[(($6)>>2)];var $8=(($5)|(0))==(($7)|(0));if($8){label=2;break;}else{label=3;break;}
case 2:var $10=(($3+8)|0);var $11=HEAP32[(($10)>>2)];var $12=((($11)*(3))&-1);var $13=((($12)+(1))|0);var $14=$13>>1;var $15=__ZN3vecI3LitE4imaxEii(2,$14);var $16=(($3+8)|0);HEAP32[(($16)>>2)]=$15;var $17=(($3)|0);var $18=HEAP32[(($17)>>2)];var $19=$18;var $20=(($3+8)|0);var $21=HEAP32[(($20)>>2)];var $22=($21<<2);var $23=_realloc($19,$22);var $24=$23;var $25=(($3)|0);HEAP32[(($25)>>2)]=$24;label=3;break;case 3:var $27=(($3+4)|0);var $28=HEAP32[(($27)>>2)];var $29=((($28)+(1))|0);HEAP32[(($27)>>2)]=$29;var $30=(($3)|0);var $31=HEAP32[(($30)>>2)];var $32=(($31+($28<<2))|0);var $33=$2;var $34=$32;var $35=$33;assert(4%1===0);HEAP32[(($34)>>2)]=HEAP32[(($35)>>2)];return;default:assert(0,"bad label: "+label);}}
function __Zco3Lit($agg_result,$p){var label=0;var sp=STACKTOP;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$p;$p=STACKTOP;STACKTOP=(STACKTOP+4)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);HEAP32[(($p)>>2)]=HEAP32[((tempParam)>>2)];__ZN3LitC1Ev($agg_result);var $1=(($p)|0);var $2=HEAP32[(($1)>>2)];var $3=$2^1;var $4=(($agg_result)|0);HEAP32[(($4)>>2)]=$3;STACKTOP=sp;return;}
function __ZN3LitC1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3LitC2Ev($2);return;}
function __ZN3LitC2Ev($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2)|0);HEAP32[(($3)>>2)]=-2;return;}
function __ZN3vecI3LitE4imaxEii($x,$y){var label=0;var $1;var $2;var $mask;$1=$x;$2=$y;var $3=$2;var $4=$1;var $5=((($3)-($4))|0);var $6=$5>>31;$mask=$6;var $7=$1;var $8=$mask;var $9=$7&$8;var $10=$2;var $11=$mask;var $12=$11^-1;var $13=$10&$12;var $14=((($9)+($13))|0);return $14;}
function __ZN5lboolC1Ei($this,$v){var label=0;var $1;var $2;$1=$this;$2=$v;var $3=$1;var $4=$2;__ZN5lboolC2Ei($3,$4);return;}
function __ZN5lboolC2Ei($this,$v){var label=0;var $1;var $2;$1=$this;$2=$v;var $3=$1;var $4=(($3)|0);var $5=$2;var $6=(($5)&255);HEAP8[($4)]=$6;return;}
function __ZN3LitC2Eib($this,$var,$sign){var label=0;var $1;var $2;var $3;$1=$this;$2=$var;var $4=(($sign)&(1));$3=$4;var $5=$1;var $6=(($5)|0);var $7=$2;var $8=$2;var $9=((($7)+($8))|0);var $10=$3;var $11=(($10)&1);var $12=(($11)&(1));var $13=((($9)+($12))|0);HEAP32[(($6)>>2)]=$13;return;}
function __GLOBAL__I_a(){var label=0;___cxx_global_var_init();___cxx_global_var_init1();___cxx_global_var_init2();___cxx_global_var_init3();___cxx_global_var_init4();return;}
function ___cxx_global_var_init72(){var label=0;__ZN3LitC1Eib(2768,-1,0);return;}
function ___cxx_global_var_init173(){var label=0;__ZN3LitC1Eib(2784,-1,1);return;}
function ___cxx_global_var_init274(){var label=0;__Z7toLbooli(2832,1);return;}
function ___cxx_global_var_init375(){var label=0;__Z7toLbooli(2816,-1);return;}
function ___cxx_global_var_init476(){var label=0;__Z7toLbooli(2800,0);return;}
function __ZN6SolverC2Ev($this){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+8)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $3;var $4=sp;$1=$this;var $5=$1;var $6=(($5)|0);__ZN3vecI5lboolEC1Ev($6);var $7=(($5+12)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitEC1Ev($7)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=2;break;}else{label=21;break;}
case 2:var $9=(($5+24)|0);HEAPF64[(($9)>>3)]=1.0526315789473684;var $10=(($5+32)|0);HEAPF64[(($10)>>3)]=1.001001001001001;var $11=(($5+40)|0);HEAPF64[(($11)>>3)]=0.02;var $12=(($5+48)|0);HEAP32[(($12)>>2)]=100;var $13=(($5+56)|0);HEAPF64[(($13)>>3)]=1.5;var $14=(($5+64)|0);HEAPF64[(($14)>>3)]=0.3333333333333333;var $15=(($5+72)|0);HEAPF64[(($15)>>3)]=1.1;var $16=(($5+80)|0);HEAP8[($16)]=1;var $17=(($5+84)|0);HEAP32[(($17)>>2)]=1;var $18=(($5+88)|0);HEAP32[(($18)>>2)]=0;var $19=(($5+96)|0);var $$etemp$0$0=0;var $$etemp$0$1=0;var $st$1$0=(($19)|0);HEAP32[(($st$1$0)>>2)]=$$etemp$0$0;var $st$2$1=(($19+4)|0);HEAP32[(($st$2$1)>>2)]=$$etemp$0$1;var $20=(($5+104)|0);var $$etemp$3$0=0;var $$etemp$3$1=0;var $st$4$0=(($20)|0);HEAP32[(($st$4$0)>>2)]=$$etemp$3$0;var $st$5$1=(($20+4)|0);HEAP32[(($st$5$1)>>2)]=$$etemp$3$1;var $21=(($5+112)|0);var $$etemp$6$0=0;var $$etemp$6$1=0;var $st$7$0=(($21)|0);HEAP32[(($st$7$0)>>2)]=$$etemp$6$0;var $st$8$1=(($21+4)|0);HEAP32[(($st$8$1)>>2)]=$$etemp$6$1;var $22=(($5+120)|0);var $$etemp$9$0=0;var $$etemp$9$1=0;var $st$10$0=(($22)|0);HEAP32[(($st$10$0)>>2)]=$$etemp$9$0;var $st$11$1=(($22+4)|0);HEAP32[(($st$11$1)>>2)]=$$etemp$9$1;var $23=(($5+128)|0);var $$etemp$12$0=0;var $$etemp$12$1=0;var $st$13$0=(($23)|0);HEAP32[(($st$13$0)>>2)]=$$etemp$12$0;var $st$14$1=(($23+4)|0);HEAP32[(($st$14$1)>>2)]=$$etemp$12$1;var $24=(($5+136)|0);var $$etemp$15$0=0;var $$etemp$15$1=0;var $st$16$0=(($24)|0);HEAP32[(($st$16$0)>>2)]=$$etemp$15$0;var $st$17$1=(($24+4)|0);HEAP32[(($st$17$1)>>2)]=$$etemp$15$1;var $25=(($5+144)|0);var $$etemp$18$0=0;var $$etemp$18$1=0;var $st$19$0=(($25)|0);HEAP32[(($st$19$0)>>2)]=$$etemp$18$0;var $st$20$1=(($25+4)|0);HEAP32[(($st$20$1)>>2)]=$$etemp$18$1;var $26=(($5+152)|0);var $$etemp$21$0=0;var $$etemp$21$1=0;var $st$22$0=(($26)|0);HEAP32[(($st$22$0)>>2)]=$$etemp$21$0;var $st$23$1=(($26+4)|0);HEAP32[(($st$23$1)>>2)]=$$etemp$21$1;var $27=(($5+160)|0);var $$etemp$24$0=0;var $$etemp$24$1=0;var $st$25$0=(($27)|0);HEAP32[(($st$25$0)>>2)]=$$etemp$24$0;var $st$26$1=(($27+4)|0);HEAP32[(($st$26$1)>>2)]=$$etemp$24$1;var $28=(($5+168)|0);HEAP8[($28)]=1;var $29=(($5+172)|0);(function(){try{__THREW__=0;return __ZN3vecIP6ClauseEC1Ev($29)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=3;break;}else{label=22;break;}
case 3:var $31=(($5+184)|0);(function(){try{__THREW__=0;return __ZN3vecIP6ClauseEC1Ev($31)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=4;break;}else{label=23;break;}
case 4:var $33=(($5+200)|0);HEAPF64[(($33)>>3)]=1;var $34=(($5+208)|0);(function(){try{__THREW__=0;return __ZN3vecIdEC1Ev($34)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=5;break;}else{label=24;break;}
case 5:var $36=(($5+224)|0);HEAPF64[(($36)>>3)]=1;var $37=(($5+232)|0);(function(){try{__THREW__=0;return __ZN3vecIS_IP6ClauseEEC1Ev($37)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=6;break;}else{label=25;break;}
case 6:var $39=(($5+244)|0);(function(){try{__THREW__=0;return __ZN3vecIcEC1Ev($39)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=7;break;}else{label=26;break;}
case 7:var $41=(($5+256)|0);(function(){try{__THREW__=0;return __ZN3vecIcEC1Ev($41)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=8;break;}else{label=27;break;}
case 8:var $43=(($5+268)|0);(function(){try{__THREW__=0;return __ZN3vecIcEC1Ev($43)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=9;break;}else{label=28;break;}
case 9:var $45=(($5+280)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitEC1Ev($45)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=10;break;}else{label=29;break;}
case 10:var $47=(($5+292)|0);(function(){try{__THREW__=0;return __ZN3vecIiEC1Ev($47)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=11;break;}else{label=30;break;}
case 11:var $49=(($5+304)|0);(function(){try{__THREW__=0;return __ZN3vecIP6ClauseEC1Ev($49)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=12;break;}else{label=31;break;}
case 12:var $51=(($5+316)|0);(function(){try{__THREW__=0;return __ZN3vecIiEC1Ev($51)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=13;break;}else{label=32;break;}
case 13:var $53=(($5+328)|0);HEAP32[(($53)>>2)]=0;var $54=(($5+332)|0);HEAP32[(($54)>>2)]=-1;var $55=(($5+336)|0);var $$etemp$27$0=0;var $$etemp$27$1=0;var $st$28$0=(($55)|0);HEAP32[(($st$28$0)>>2)]=$$etemp$27$0;var $st$29$1=(($55+4)|0);HEAP32[(($st$29$1)>>2)]=$$etemp$27$1;var $56=(($5+344)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitEC1Ev($56)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=14;break;}else{label=33;break;}
case 14:var $58=(($5+356)|0);var $59=(($5+208)|0);(function(){try{__THREW__=0;return __ZN6Solver10VarOrderLtC1ERK3vecIdE($4,$59)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=15;break;}else{label=34;break;}
case 15:(function(){try{__THREW__=0;return __ZN4HeapIN6Solver10VarOrderLtEEC1ERKS1_($58,$4)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=16;break;}else{label=34;break;}
case 16:var $62=(($5+384)|0);HEAPF64[(($62)>>3)]=91648253;var $63=(($5+392)|0);HEAPF64[(($63)>>3)]=0;var $64=(($5+400)|0);HEAP8[($64)]=1;var $65=(($5+404)|0);(function(){try{__THREW__=0;return __ZN3vecIcEC1Ev($65)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=17;break;}else{label=35;break;}
case 17:var $67=(($5+416)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitEC1Ev($67)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=18;break;}else{label=36;break;}
case 18:var $69=(($5+428)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitEC1Ev($69)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=19;break;}else{label=37;break;}
case 19:var $71=(($5+440)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitEC1Ev($71)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=20;break;}else{label=38;break;}
case 20:STACKTOP=sp;return;case 21:var $74$0=___cxa_find_matching_catch(-1,-1);$74$1=tempRet0;var $75=$74$0;$2=$75;var $76=$74$1;$3=$76;label=72;break;case 22:var $78$0=___cxa_find_matching_catch(-1,-1);$78$1=tempRet0;var $79=$78$0;$2=$79;var $80=$78$1;$3=$80;label=70;break;case 23:var $82$0=___cxa_find_matching_catch(-1,-1);$82$1=tempRet0;var $83=$82$0;$2=$83;var $84=$82$1;$3=$84;label=68;break;case 24:var $86$0=___cxa_find_matching_catch(-1,-1);$86$1=tempRet0;var $87=$86$0;$2=$87;var $88=$86$1;$3=$88;label=66;break;case 25:var $90$0=___cxa_find_matching_catch(-1,-1);$90$1=tempRet0;var $91=$90$0;$2=$91;var $92=$90$1;$3=$92;label=64;break;case 26:var $94$0=___cxa_find_matching_catch(-1,-1);$94$1=tempRet0;var $95=$94$0;$2=$95;var $96=$94$1;$3=$96;label=62;break;case 27:var $98$0=___cxa_find_matching_catch(-1,-1);$98$1=tempRet0;var $99=$98$0;$2=$99;var $100=$98$1;$3=$100;label=60;break;case 28:var $102$0=___cxa_find_matching_catch(-1,-1);$102$1=tempRet0;var $103=$102$0;$2=$103;var $104=$102$1;$3=$104;label=58;break;case 29:var $106$0=___cxa_find_matching_catch(-1,-1);$106$1=tempRet0;var $107=$106$0;$2=$107;var $108=$106$1;$3=$108;label=56;break;case 30:var $110$0=___cxa_find_matching_catch(-1,-1);$110$1=tempRet0;var $111=$110$0;$2=$111;var $112=$110$1;$3=$112;label=54;break;case 31:var $114$0=___cxa_find_matching_catch(-1,-1);$114$1=tempRet0;var $115=$114$0;$2=$115;var $116=$114$1;$3=$116;label=52;break;case 32:var $118$0=___cxa_find_matching_catch(-1,-1);$118$1=tempRet0;var $119=$118$0;$2=$119;var $120=$118$1;$3=$120;label=50;break;case 33:var $122$0=___cxa_find_matching_catch(-1,-1);$122$1=tempRet0;var $123=$122$0;$2=$123;var $124=$122$1;$3=$124;label=48;break;case 34:var $126$0=___cxa_find_matching_catch(-1,-1);$126$1=tempRet0;var $127=$126$0;$2=$127;var $128=$126$1;$3=$128;label=46;break;case 35:var $130$0=___cxa_find_matching_catch(-1,-1);$130$1=tempRet0;var $131=$130$0;$2=$131;var $132=$130$1;$3=$132;label=44;break;case 36:var $134$0=___cxa_find_matching_catch(-1,-1);$134$1=tempRet0;var $135=$134$0;$2=$135;var $136=$134$1;$3=$136;label=42;break;case 37:var $138$0=___cxa_find_matching_catch(-1,-1);$138$1=tempRet0;var $139=$138$0;$2=$139;var $140=$138$1;$3=$140;label=40;break;case 38:var $142$0=___cxa_find_matching_catch(-1,-1);$142$1=tempRet0;var $143=$142$0;$2=$143;var $144=$142$1;$3=$144;(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($69)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=39;break;}else{label=75;break;}
case 39:label=40;break;case 40:(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($67)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=41;break;}else{label=75;break;}
case 41:label=42;break;case 42:(function(){try{__THREW__=0;return __ZN3vecIcED1Ev($65)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=43;break;}else{label=75;break;}
case 43:label=44;break;case 44:(function(){try{__THREW__=0;return __ZN4HeapIN6Solver10VarOrderLtEED1Ev($58)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=45;break;}else{label=75;break;}
case 45:label=46;break;case 46:(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($56)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=47;break;}else{label=75;break;}
case 47:label=48;break;case 48:(function(){try{__THREW__=0;return __ZN3vecIiED1Ev($51)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=49;break;}else{label=75;break;}
case 49:label=50;break;case 50:(function(){try{__THREW__=0;return __ZN3vecIP6ClauseED1Ev($49)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=51;break;}else{label=75;break;}
case 51:label=52;break;case 52:(function(){try{__THREW__=0;return __ZN3vecIiED1Ev($47)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=53;break;}else{label=75;break;}
case 53:label=54;break;case 54:(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($45)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=55;break;}else{label=75;break;}
case 55:label=56;break;case 56:(function(){try{__THREW__=0;return __ZN3vecIcED1Ev($43)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=57;break;}else{label=75;break;}
case 57:label=58;break;case 58:(function(){try{__THREW__=0;return __ZN3vecIcED1Ev($41)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=59;break;}else{label=75;break;}
case 59:label=60;break;case 60:(function(){try{__THREW__=0;return __ZN3vecIcED1Ev($39)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=61;break;}else{label=75;break;}
case 61:label=62;break;case 62:(function(){try{__THREW__=0;return __ZN3vecIS_IP6ClauseEED1Ev($37)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=63;break;}else{label=75;break;}
case 63:label=64;break;case 64:(function(){try{__THREW__=0;return __ZN3vecIdED1Ev($34)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=65;break;}else{label=75;break;}
case 65:label=66;break;case 66:(function(){try{__THREW__=0;return __ZN3vecIP6ClauseED1Ev($31)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=67;break;}else{label=75;break;}
case 67:label=68;break;case 68:(function(){try{__THREW__=0;return __ZN3vecIP6ClauseED1Ev($29)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=69;break;}else{label=75;break;}
case 69:label=70;break;case 70:(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($7)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=71;break;}else{label=75;break;}
case 71:label=72;break;case 72:(function(){try{__THREW__=0;return __ZN3vecI5lboolED1Ev($6)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=73;break;}else{label=75;break;}
case 73:label=74;break;case 74:var $181=$2;var $182=$3;var $183$0=$181;var $183$1=0;var $184$0=$183$0;var $184$1=$182;___resumeException($184$0)
case 75:var $186$0=___cxa_find_matching_catch(-1,-1,0);$186$1=tempRet0;__ZSt9terminatev();throw"Reached an unreachable!";default:assert(0,"bad label: "+label);}}
function __ZN3vecI5lboolEC1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecI5lboolEC2Ev($2);return;}
function __ZN3vecIP6ClauseEC1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecIP6ClauseEC2Ev($2);return;}
function __ZN3vecIdEC1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecIdEC2Ev($2);return;}
function __ZN3vecIS_IP6ClauseEEC1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecIS_IP6ClauseEEC2Ev($2);return;}
function __ZN3vecIcEC1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecIcEC2Ev($2);return;}
function __ZN3vecIiEC1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecIiEC2Ev($2);return;}
function __ZN4HeapIN6Solver10VarOrderLtEEC1ERKS1_($this,$c){var label=0;var $1;var $2;$1=$this;$2=$c;var $3=$1;var $4=$2;__ZN4HeapIN6Solver10VarOrderLtEEC2ERKS1_($3,$4);return;}
function __ZN6Solver10VarOrderLtC1ERK3vecIdE($this,$act){var label=0;var $1;var $2;$1=$this;$2=$act;var $3=$1;var $4=$2;__ZN6Solver10VarOrderLtC2ERK3vecIdE($3,$4);return;}
function __ZN3vecIcED1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecIcED2Ev($2);return;}
function __ZN4HeapIN6Solver10VarOrderLtEED1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN4HeapIN6Solver10VarOrderLtEED2Ev($2);return;}
function __ZN3vecIiED1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecIiED2Ev($2);return;}
function __ZN3vecIP6ClauseED1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecIP6ClauseED2Ev($2);return;}
function __ZN3vecIS_IP6ClauseEED1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecIS_IP6ClauseEED2Ev($2);return;}
function __ZN3vecIdED1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecIdED2Ev($2);return;}
function __ZN3vecI5lboolED1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecI5lboolED2Ev($2);return;}
function __ZN6SolverD2Ev($this){var label=0;label=1;while(1)switch(label){case 1:var $1;var $i;var $2;var $3;var $i1;$1=$this;var $4=$1;$i=0;label=2;break;case 2:var $6=$i;var $7=(($4+184)|0);var $8=(function(){try{__THREW__=0;return __ZNK3vecIP6ClauseE4sizeEv($7)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=3;break;}else{label=8;break;}
case 3:var $10=(($6)|(0))<(($8)|(0));if($10){label=4;break;}else{label=9;break;}
case 4:var $12=(($4+184)|0);var $13=$i;var $14=(function(){try{__THREW__=0;return __ZN3vecIP6ClauseEixEi($12,$13)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=5;break;}else{label=8;break;}
case 5:var $16=HEAP32[(($14)>>2)];var $17=$16;(function(){try{__THREW__=0;return _free($17)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=6;break;}else{label=8;break;}
case 6:label=7;break;case 7:var $20=$i;var $21=((($20)+(1))|0);$i=$21;label=2;break;case 8:var $23$0=___cxa_find_matching_catch(-1,-1);$23$1=tempRet0;var $24=$23$0;$2=$24;var $25=$23$1;$3=$25;var $26=(($4+440)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($26)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=36;break;}else{label=91;break;}
case 9:$i1=0;label=10;break;case 10:var $29=$i1;var $30=(($4+172)|0);var $31=(function(){try{__THREW__=0;return __ZNK3vecIP6ClauseE4sizeEv($30)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=11;break;}else{label=8;break;}
case 11:var $33=(($29)|(0))<(($31)|(0));if($33){label=12;break;}else{label=16;break;}
case 12:var $35=(($4+172)|0);var $36=$i1;var $37=(function(){try{__THREW__=0;return __ZN3vecIP6ClauseEixEi($35,$36)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=13;break;}else{label=8;break;}
case 13:var $39=HEAP32[(($37)>>2)];var $40=$39;(function(){try{__THREW__=0;return _free($40)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=14;break;}else{label=8;break;}
case 14:label=15;break;case 15:var $43=$i1;var $44=((($43)+(1))|0);$i1=$44;label=10;break;case 16:var $46=(($4+440)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($46)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=17;break;}else{label=35;break;}
case 17:var $48=(($4+428)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($48)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=18;break;}else{label=37;break;}
case 18:var $50=(($4+416)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($50)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=19;break;}else{label=40;break;}
case 19:var $52=(($4+404)|0);(function(){try{__THREW__=0;return __ZN3vecIcED1Ev($52)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=20;break;}else{label=43;break;}
case 20:var $54=(($4+356)|0);(function(){try{__THREW__=0;return __ZN4HeapIN6Solver10VarOrderLtEED1Ev($54)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=21;break;}else{label=46;break;}
case 21:var $56=(($4+344)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($56)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=22;break;}else{label=49;break;}
case 22:var $58=(($4+316)|0);(function(){try{__THREW__=0;return __ZN3vecIiED1Ev($58)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=23;break;}else{label=52;break;}
case 23:var $60=(($4+304)|0);(function(){try{__THREW__=0;return __ZN3vecIP6ClauseED1Ev($60)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=24;break;}else{label=55;break;}
case 24:var $62=(($4+292)|0);(function(){try{__THREW__=0;return __ZN3vecIiED1Ev($62)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=25;break;}else{label=58;break;}
case 25:var $64=(($4+280)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($64)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=26;break;}else{label=61;break;}
case 26:var $66=(($4+268)|0);(function(){try{__THREW__=0;return __ZN3vecIcED1Ev($66)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=27;break;}else{label=64;break;}
case 27:var $68=(($4+256)|0);(function(){try{__THREW__=0;return __ZN3vecIcED1Ev($68)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=28;break;}else{label=67;break;}
case 28:var $70=(($4+244)|0);(function(){try{__THREW__=0;return __ZN3vecIcED1Ev($70)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=29;break;}else{label=70;break;}
case 29:var $72=(($4+232)|0);(function(){try{__THREW__=0;return __ZN3vecIS_IP6ClauseEED1Ev($72)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=30;break;}else{label=73;break;}
case 30:var $74=(($4+208)|0);(function(){try{__THREW__=0;return __ZN3vecIdED1Ev($74)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=31;break;}else{label=76;break;}
case 31:var $76=(($4+184)|0);(function(){try{__THREW__=0;return __ZN3vecIP6ClauseED1Ev($76)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=32;break;}else{label=79;break;}
case 32:var $78=(($4+172)|0);(function(){try{__THREW__=0;return __ZN3vecIP6ClauseED1Ev($78)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=33;break;}else{label=82;break;}
case 33:var $80=(($4+12)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($80)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=34;break;}else{label=85;break;}
case 34:var $82=(($4)|0);__ZN3vecI5lboolED1Ev($82);return;case 35:var $84$0=___cxa_find_matching_catch(-1,-1);$84$1=tempRet0;var $85=$84$0;$2=$85;var $86=$84$1;$3=$86;label=38;break;case 36:label=38;break;case 37:var $89$0=___cxa_find_matching_catch(-1,-1);$89$1=tempRet0;var $90=$89$0;$2=$90;var $91=$89$1;$3=$91;label=41;break;case 38:var $93=(($4+428)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($93)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=39;break;}else{label=91;break;}
case 39:label=41;break;case 40:var $96$0=___cxa_find_matching_catch(-1,-1);$96$1=tempRet0;var $97=$96$0;$2=$97;var $98=$96$1;$3=$98;label=44;break;case 41:var $100=(($4+416)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($100)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=42;break;}else{label=91;break;}
case 42:label=44;break;case 43:var $103$0=___cxa_find_matching_catch(-1,-1);$103$1=tempRet0;var $104=$103$0;$2=$104;var $105=$103$1;$3=$105;label=47;break;case 44:var $107=(($4+404)|0);(function(){try{__THREW__=0;return __ZN3vecIcED1Ev($107)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=45;break;}else{label=91;break;}
case 45:label=47;break;case 46:var $110$0=___cxa_find_matching_catch(-1,-1);$110$1=tempRet0;var $111=$110$0;$2=$111;var $112=$110$1;$3=$112;label=50;break;case 47:var $114=(($4+356)|0);(function(){try{__THREW__=0;return __ZN4HeapIN6Solver10VarOrderLtEED1Ev($114)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=48;break;}else{label=91;break;}
case 48:label=50;break;case 49:var $117$0=___cxa_find_matching_catch(-1,-1);$117$1=tempRet0;var $118=$117$0;$2=$118;var $119=$117$1;$3=$119;label=53;break;case 50:var $121=(($4+344)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($121)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=51;break;}else{label=91;break;}
case 51:label=53;break;case 52:var $124$0=___cxa_find_matching_catch(-1,-1);$124$1=tempRet0;var $125=$124$0;$2=$125;var $126=$124$1;$3=$126;label=56;break;case 53:var $128=(($4+316)|0);(function(){try{__THREW__=0;return __ZN3vecIiED1Ev($128)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=54;break;}else{label=91;break;}
case 54:label=56;break;case 55:var $131$0=___cxa_find_matching_catch(-1,-1);$131$1=tempRet0;var $132=$131$0;$2=$132;var $133=$131$1;$3=$133;label=59;break;case 56:var $135=(($4+304)|0);(function(){try{__THREW__=0;return __ZN3vecIP6ClauseED1Ev($135)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=57;break;}else{label=91;break;}
case 57:label=59;break;case 58:var $138$0=___cxa_find_matching_catch(-1,-1);$138$1=tempRet0;var $139=$138$0;$2=$139;var $140=$138$1;$3=$140;label=62;break;case 59:var $142=(($4+292)|0);(function(){try{__THREW__=0;return __ZN3vecIiED1Ev($142)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=60;break;}else{label=91;break;}
case 60:label=62;break;case 61:var $145$0=___cxa_find_matching_catch(-1,-1);$145$1=tempRet0;var $146=$145$0;$2=$146;var $147=$145$1;$3=$147;label=65;break;case 62:var $149=(($4+280)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($149)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=63;break;}else{label=91;break;}
case 63:label=65;break;case 64:var $152$0=___cxa_find_matching_catch(-1,-1);$152$1=tempRet0;var $153=$152$0;$2=$153;var $154=$152$1;$3=$154;label=68;break;case 65:var $156=(($4+268)|0);(function(){try{__THREW__=0;return __ZN3vecIcED1Ev($156)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=66;break;}else{label=91;break;}
case 66:label=68;break;case 67:var $159$0=___cxa_find_matching_catch(-1,-1);$159$1=tempRet0;var $160=$159$0;$2=$160;var $161=$159$1;$3=$161;label=71;break;case 68:var $163=(($4+256)|0);(function(){try{__THREW__=0;return __ZN3vecIcED1Ev($163)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=69;break;}else{label=91;break;}
case 69:label=71;break;case 70:var $166$0=___cxa_find_matching_catch(-1,-1);$166$1=tempRet0;var $167=$166$0;$2=$167;var $168=$166$1;$3=$168;label=74;break;case 71:var $170=(($4+244)|0);(function(){try{__THREW__=0;return __ZN3vecIcED1Ev($170)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=72;break;}else{label=91;break;}
case 72:label=74;break;case 73:var $173$0=___cxa_find_matching_catch(-1,-1);$173$1=tempRet0;var $174=$173$0;$2=$174;var $175=$173$1;$3=$175;label=77;break;case 74:var $177=(($4+232)|0);(function(){try{__THREW__=0;return __ZN3vecIS_IP6ClauseEED1Ev($177)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=75;break;}else{label=91;break;}
case 75:label=77;break;case 76:var $180$0=___cxa_find_matching_catch(-1,-1);$180$1=tempRet0;var $181=$180$0;$2=$181;var $182=$180$1;$3=$182;label=80;break;case 77:var $184=(($4+208)|0);(function(){try{__THREW__=0;return __ZN3vecIdED1Ev($184)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=78;break;}else{label=91;break;}
case 78:label=80;break;case 79:var $187$0=___cxa_find_matching_catch(-1,-1);$187$1=tempRet0;var $188=$187$0;$2=$188;var $189=$187$1;$3=$189;label=83;break;case 80:var $191=(($4+184)|0);(function(){try{__THREW__=0;return __ZN3vecIP6ClauseED1Ev($191)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=81;break;}else{label=91;break;}
case 81:label=83;break;case 82:var $194$0=___cxa_find_matching_catch(-1,-1);$194$1=tempRet0;var $195=$194$0;$2=$195;var $196=$194$1;$3=$196;label=86;break;case 83:var $198=(($4+172)|0);(function(){try{__THREW__=0;return __ZN3vecIP6ClauseED1Ev($198)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=84;break;}else{label=91;break;}
case 84:label=86;break;case 85:var $201$0=___cxa_find_matching_catch(-1,-1);$201$1=tempRet0;var $202=$201$0;$2=$202;var $203=$201$1;$3=$203;label=88;break;case 86:var $205=(($4+12)|0);(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($205)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=87;break;}else{label=91;break;}
case 87:label=88;break;case 88:var $208=(($4)|0);(function(){try{__THREW__=0;return __ZN3vecI5lboolED1Ev($208)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=89;break;}else{label=91;break;}
case 89:label=90;break;case 90:var $211=$2;var $212=$3;var $213$0=$211;var $213$1=0;var $214$0=$213$0;var $214$1=$212;___resumeException($214$0)
case 91:var $216$0=___cxa_find_matching_catch(-1,-1,0);$216$1=tempRet0;__ZSt9terminatev();throw"Reached an unreachable!";default:assert(0,"bad label: "+label);}}
function __ZNK3vecIP6ClauseE4sizeEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+4)|0);var $4=HEAP32[(($3)>>2)];return $4;}
function __ZN3vecIP6ClauseEixEi($this,$index){var label=0;var $1;var $2;$1=$this;$2=$index;var $3=$1;var $4=$2;var $5=(($3)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6+($4<<2))|0);return $7;}
function __ZN6Solver6newVarEbb($this,$sign,$dvar){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+64)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var $1;var $2;var $3;var $v;var $4=sp;var $5=(sp)+(8);var $6=(sp)+(16);var $7=(sp)+(24);var $8=(sp)+(32);var $9=(sp)+(40);var $10=(sp)+(48);var $11=(sp)+(56);$1=$this;var $12=(($sign)&(1));$2=$12;var $13=(($dvar)&(1));$3=$13;var $14=$1;var $15=__ZNK6Solver5nVarsEv($14);$v=$15;var $16=(($14+232)|0);__ZN3vecIS_IP6ClauseEE4pushEv($16);var $17=(($14+232)|0);__ZN3vecIS_IP6ClauseEE4pushEv($17);var $18=(($14+304)|0);HEAP32[(($4)>>2)]=0;__ZN3vecIP6ClauseE4pushERKS1_($18,$4);var $19=(($14+244)|0);var $20=$5;assert(1%1===0);HEAP8[($20)]=HEAP8[((((2800)|0))|0)];var $21=__Z5toInt5lbool($5);var $22=(($21)&255);HEAP8[($6)]=$22;__ZN3vecIcE4pushERKc($19,$6);var $23=(($14+316)|0);HEAP32[(($7)>>2)]=-1;__ZN3vecIiE4pushERKi($23,$7);var $24=(($14+208)|0);HEAPF64[(($8)>>3)]=0;__ZN3vecIdE4pushERKd($24,$8);var $25=(($14+404)|0);HEAP8[($9)]=0;__ZN3vecIcE4pushERKc($25,$9);var $26=(($14+256)|0);var $27=$2;var $28=(($27)&1);var $29=(($28)&(1));HEAP8[($10)]=$29;__ZN3vecIcE4pushERKc($26,$10);var $30=(($14+268)|0);var $31=$3;var $32=(($31)&1);var $33=(($32)&(1));HEAP8[($11)]=$33;__ZN3vecIcE4pushERKc($30,$11);var $34=$v;__ZN6Solver14insertVarOrderEi($14,$34);var $35=$v;STACKTOP=sp;return $35;}
function __ZN3vecIS_IP6ClauseEE4pushEv($this){var label=0;label=1;while(1)switch(label){case 1:var $1;$1=$this;var $2=$1;var $3=(($2+4)|0);var $4=HEAP32[(($3)>>2)];var $5=(($2+8)|0);var $6=HEAP32[(($5)>>2)];var $7=(($4)|(0))==(($6)|(0));if($7){label=2;break;}else{label=3;break;}
case 2:var $9=(($2+8)|0);var $10=HEAP32[(($9)>>2)];var $11=((($10)*(3))&-1);var $12=((($11)+(1))|0);var $13=$12>>1;var $14=__ZN3vecIS_IP6ClauseEE4imaxEii(2,$13);var $15=(($2+8)|0);HEAP32[(($15)>>2)]=$14;var $16=(($2)|0);var $17=HEAP32[(($16)>>2)];var $18=$17;var $19=(($2+8)|0);var $20=HEAP32[(($19)>>2)];var $21=((($20)*(12))&-1);var $22=_realloc($18,$21);var $23=$22;var $24=(($2)|0);HEAP32[(($24)>>2)]=$23;label=3;break;case 3:var $26=(($2+4)|0);var $27=HEAP32[(($26)>>2)];var $28=(($2)|0);var $29=HEAP32[(($28)>>2)];var $30=(($29+((($27)*(12))&-1))|0);var $31=$30;var $32=(($31)|(0))==0;if($32){var $36=0;label=5;break;}else{label=4;break;}
case 4:var $34=$31;__ZN3vecIP6ClauseEC1Ev($34);var $36=$34;label=5;break;case 5:var $36;var $37=(($2+4)|0);var $38=HEAP32[(($37)>>2)];var $39=((($38)+(1))|0);HEAP32[(($37)>>2)]=$39;return;default:assert(0,"bad label: "+label);}}
function __ZN3vecIP6ClauseE4pushERKS1_($this,$elem){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;$1=$this;$2=$elem;var $3=$1;var $4=(($3+4)|0);var $5=HEAP32[(($4)>>2)];var $6=(($3+8)|0);var $7=HEAP32[(($6)>>2)];var $8=(($5)|(0))==(($7)|(0));if($8){label=2;break;}else{label=3;break;}
case 2:var $10=(($3+8)|0);var $11=HEAP32[(($10)>>2)];var $12=((($11)*(3))&-1);var $13=((($12)+(1))|0);var $14=$13>>1;var $15=__ZN3vecIP6ClauseE4imaxEii(2,$14);var $16=(($3+8)|0);HEAP32[(($16)>>2)]=$15;var $17=(($3)|0);var $18=HEAP32[(($17)>>2)];var $19=$18;var $20=(($3+8)|0);var $21=HEAP32[(($20)>>2)];var $22=($21<<2);var $23=_realloc($19,$22);var $24=$23;var $25=(($3)|0);HEAP32[(($25)>>2)]=$24;label=3;break;case 3:var $27=$2;var $28=HEAP32[(($27)>>2)];var $29=(($3+4)|0);var $30=HEAP32[(($29)>>2)];var $31=((($30)+(1))|0);HEAP32[(($29)>>2)]=$31;var $32=(($3)|0);var $33=HEAP32[(($32)>>2)];var $34=(($33+($30<<2))|0);HEAP32[(($34)>>2)]=$28;return;default:assert(0,"bad label: "+label);}}
function __ZN3vecIcE4pushERKc($this,$elem){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;$1=$this;$2=$elem;var $3=$1;var $4=(($3+4)|0);var $5=HEAP32[(($4)>>2)];var $6=(($3+8)|0);var $7=HEAP32[(($6)>>2)];var $8=(($5)|(0))==(($7)|(0));if($8){label=2;break;}else{label=3;break;}
case 2:var $10=(($3+8)|0);var $11=HEAP32[(($10)>>2)];var $12=((($11)*(3))&-1);var $13=((($12)+(1))|0);var $14=$13>>1;var $15=__ZN3vecIcE4imaxEii(2,$14);var $16=(($3+8)|0);HEAP32[(($16)>>2)]=$15;var $17=(($3)|0);var $18=HEAP32[(($17)>>2)];var $19=(($3+8)|0);var $20=HEAP32[(($19)>>2)];var $21=$20;var $22=_realloc($18,$21);var $23=(($3)|0);HEAP32[(($23)>>2)]=$22;label=3;break;case 3:var $25=$2;var $26=HEAP8[($25)];var $27=(($3+4)|0);var $28=HEAP32[(($27)>>2)];var $29=((($28)+(1))|0);HEAP32[(($27)>>2)]=$29;var $30=(($3)|0);var $31=HEAP32[(($30)>>2)];var $32=(($31+$28)|0);HEAP8[($32)]=$26;return;default:assert(0,"bad label: "+label);}}
function __Z5toInt5lbool($l){var label=0;var sp=STACKTOP;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$l;$l=STACKTOP;STACKTOP=(STACKTOP+1)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);;;HEAP8[($l)]=HEAP8[(tempParam)];var $1=__ZNK5lbool5toIntEv($l);STACKTOP=sp;return $1;}
function __ZN3vecIiE4pushERKi($this,$elem){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;$1=$this;$2=$elem;var $3=$1;var $4=(($3+4)|0);var $5=HEAP32[(($4)>>2)];var $6=(($3+8)|0);var $7=HEAP32[(($6)>>2)];var $8=(($5)|(0))==(($7)|(0));if($8){label=2;break;}else{label=3;break;}
case 2:var $10=(($3+8)|0);var $11=HEAP32[(($10)>>2)];var $12=((($11)*(3))&-1);var $13=((($12)+(1))|0);var $14=$13>>1;var $15=__ZN3vecIiE4imaxEii(2,$14);var $16=(($3+8)|0);HEAP32[(($16)>>2)]=$15;var $17=(($3)|0);var $18=HEAP32[(($17)>>2)];var $19=$18;var $20=(($3+8)|0);var $21=HEAP32[(($20)>>2)];var $22=($21<<2);var $23=_realloc($19,$22);var $24=$23;var $25=(($3)|0);HEAP32[(($25)>>2)]=$24;label=3;break;case 3:var $27=$2;var $28=HEAP32[(($27)>>2)];var $29=(($3+4)|0);var $30=HEAP32[(($29)>>2)];var $31=((($30)+(1))|0);HEAP32[(($29)>>2)]=$31;var $32=(($3)|0);var $33=HEAP32[(($32)>>2)];var $34=(($33+($30<<2))|0);HEAP32[(($34)>>2)]=$28;return;default:assert(0,"bad label: "+label);}}
function __ZN3vecIdE4pushERKd($this,$elem){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;$1=$this;$2=$elem;var $3=$1;var $4=(($3+4)|0);var $5=HEAP32[(($4)>>2)];var $6=(($3+8)|0);var $7=HEAP32[(($6)>>2)];var $8=(($5)|(0))==(($7)|(0));if($8){label=2;break;}else{label=3;break;}
case 2:var $10=(($3+8)|0);var $11=HEAP32[(($10)>>2)];var $12=((($11)*(3))&-1);var $13=((($12)+(1))|0);var $14=$13>>1;var $15=__ZN3vecIdE4imaxEii(2,$14);var $16=(($3+8)|0);HEAP32[(($16)>>2)]=$15;var $17=(($3)|0);var $18=HEAP32[(($17)>>2)];var $19=$18;var $20=(($3+8)|0);var $21=HEAP32[(($20)>>2)];var $22=($21<<3);var $23=_realloc($19,$22);var $24=$23;var $25=(($3)|0);HEAP32[(($25)>>2)]=$24;label=3;break;case 3:var $27=$2;var $28=HEAPF64[(($27)>>3)];var $29=(($3+4)|0);var $30=HEAP32[(($29)>>2)];var $31=((($30)+(1))|0);HEAP32[(($29)>>2)]=$31;var $32=(($3)|0);var $33=HEAP32[(($32)>>2)];var $34=(($33+($30<<3))|0);HEAPF64[(($34)>>3)]=$28;return;default:assert(0,"bad label: "+label);}}
function __ZN6Solver14insertVarOrderEi($this,$x){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;$1=$this;$2=$x;var $3=$1;var $4=(($3+356)|0);var $5=$2;var $6=__ZNK4HeapIN6Solver10VarOrderLtEE6inHeapEi($4,$5);if($6){label=4;break;}else{label=2;break;}
case 2:var $8=(($3+268)|0);var $9=$2;var $10=__ZN3vecIcEixEi($8,$9);var $11=HEAP8[($10)];var $12=(($11<<24)>>24)!=0;if($12){label=3;break;}else{label=4;break;}
case 3:var $14=(($3+356)|0);var $15=$2;__ZN4HeapIN6Solver10VarOrderLtEE6insertEi($14,$15);label=4;break;case 4:return;default:assert(0,"bad label: "+label);}}
function __ZN6Solver9addClauseER3vecI3LitE($this,$ps){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+120)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $3;var $p=sp;var $i;var $j;var $4=(sp)+(8);var $5=(sp)+(16);var $6=(sp)+(24);var $7=(sp)+(32);var $8=(sp)+(40);var $9=(sp)+(48);var $10=(sp)+(56);var $11=(sp)+(64);var $12=(sp)+(72);var $13=(sp)+(80);var $14=(sp)+(88);var $15=(sp)+(96);var $16=(sp)+(104);var $c=(sp)+(112);$2=$this;$3=$ps;var $17=$2;var $18=__ZNK6Solver13decisionLevelEv($17);var $19=(($18)|(0))==0;if($19){var $23=0;label=3;break;}else{label=2;break;}
case 2:___assert_fail(((512)|0),((328)|0),94,((2024)|0));throw"Reached an unreachable!";label=3;break;case 3:var $23;var $24=(($17+168)|0);var $25=HEAP8[($24)];var $26=(($25)&1);if($26){label=5;break;}else{label=4;break;}
case 4:$1=0;label=26;break;case 5:var $29=$3;__Z4sortI3LitEvR3vecIT_E($29);__ZN3LitC1Ev($p);$j=0;$i=0;var $30=$p;assert(4%1===0);HEAP32[(($30)>>2)]=HEAP32[((2768)>>2)];label=6;break;case 6:var $32=$i;var $33=$3;var $34=__ZNK3vecI3LitE4sizeEv($33);var $35=(($32)|(0))<(($34)|(0));if($35){label=7;break;}else{label=16;break;}
case 7:var $37=$3;var $38=$i;var $39=__ZN3vecI3LitEixEi($37,$38);var $40=$4;var $41=$39;assert(4%1===0);HEAP32[(($40)>>2)]=HEAP32[(($41)>>2)];__ZNK6Solver5valueE3Lit($5,$17,$4);var $42=$6;assert(1%1===0);HEAP8[($42)]=HEAP8[((((2832)|0))|0)];var $43=__ZNK5lbooleqES_($5,$6);if($43){label=9;break;}else{label=8;break;}
case 8:var $45=$3;var $46=$i;var $47=__ZN3vecI3LitEixEi($45,$46);var $48=$8;var $49=$p;assert(4%1===0);HEAP32[(($48)>>2)]=HEAP32[(($49)>>2)];__Zco3Lit($7,$8);var $50=__ZNK3LiteqES_($47,$7);if($50){label=9;break;}else{label=10;break;}
case 9:$1=1;label=26;break;case 10:var $53=$3;var $54=$i;var $55=__ZN3vecI3LitEixEi($53,$54);var $56=$9;var $57=$55;assert(4%1===0);HEAP32[(($56)>>2)]=HEAP32[(($57)>>2)];__ZNK6Solver5valueE3Lit($10,$17,$9);var $58=$11;assert(1%1===0);HEAP8[($58)]=HEAP8[((((2816)|0))|0)];var $59=__ZNK5lboolneES_($10,$11);if($59){label=11;break;}else{label=13;break;}
case 11:var $61=$3;var $62=$i;var $63=__ZN3vecI3LitEixEi($61,$62);var $64=$12;var $65=$p;assert(4%1===0);HEAP32[(($64)>>2)]=HEAP32[(($65)>>2)];var $66=__ZNK3LitneES_($63,$12);if($66){label=12;break;}else{label=13;break;}
case 12:var $68=$3;var $69=$j;var $70=((($69)+(1))|0);$j=$70;var $71=__ZN3vecI3LitEixEi($68,$69);var $72=$3;var $73=$i;var $74=__ZN3vecI3LitEixEi($72,$73);var $75=$p;var $76=$74;assert(4%1===0);HEAP32[(($75)>>2)]=HEAP32[(($76)>>2)];var $77=$71;var $78=$p;assert(4%1===0);HEAP32[(($77)>>2)]=HEAP32[(($78)>>2)];label=13;break;case 13:label=14;break;case 14:label=15;break;case 15:var $82=$i;var $83=((($82)+(1))|0);$i=$83;label=6;break;case 16:var $85=$3;var $86=$i;var $87=$j;var $88=((($86)-($87))|0);__ZN3vecI3LitE6shrinkEi($85,$88);label=17;break;case 17:var $90=$3;var $91=__ZNK3vecI3LitE4sizeEv($90);var $92=(($91)|(0))==0;if($92){label=18;break;}else{label=19;break;}
case 18:var $94=(($17+168)|0);HEAP8[($94)]=0;$1=0;label=26;break;case 19:var $96=$3;var $97=__ZNK3vecI3LitE4sizeEv($96);var $98=(($97)|(0))==1;if($98){label=20;break;}else{label=23;break;}
case 20:var $100=$3;var $101=__ZN3vecI3LitEixEi($100,0);var $102=$13;var $103=$101;assert(4%1===0);HEAP32[(($102)>>2)]=HEAP32[(($103)>>2)];__ZNK6Solver5valueE3Lit($14,$17,$13);var $104=$15;assert(1%1===0);HEAP8[($104)]=HEAP8[((((2800)|0))|0)];var $105=__ZNK5lbooleqES_($14,$15);if($105){var $109=1;label=22;break;}else{label=21;break;}
case 21:___assert_fail(((232)|0),((328)|0),113,((2024)|0));throw"Reached an unreachable!";label=22;break;case 22:var $109;var $110=$3;var $111=__ZN3vecI3LitEixEi($110,0);var $112=$16;var $113=$111;assert(4%1===0);HEAP32[(($112)>>2)]=HEAP32[(($113)>>2)];__ZN6Solver16uncheckedEnqueueE3LitP6Clause($17,$16,0);var $114=__ZN6Solver9propagateEv($17);var $115=(($114)|(0))==0;var $116=(($17+168)|0);var $117=(($115)&(1));HEAP8[($116)]=$117;$1=$115;label=26;break;case 23:var $119=$3;var $120=__Z10Clause_newI3vecI3LitEEP6ClauseRKT_b($119,0);HEAP32[(($c)>>2)]=$120;var $121=(($17+172)|0);__ZN3vecIP6ClauseE4pushERKS1_($121,$c);var $122=HEAP32[(($c)>>2)];__ZN6Solver12attachClauseER6Clause($17,$122);label=24;break;case 24:label=25;break;case 25:$1=1;label=26;break;case 26:var $126=$1;STACKTOP=sp;return $126;default:assert(0,"bad label: "+label);}}
function __ZNK6Solver13decisionLevelEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+292)|0);var $4=__ZNK3vecIiE4sizeEv($3);return $4;}
function __Z4sortI3LitEvR3vecIT_E($v){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+8)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var $1;var $2=sp;$1=$v;var $3=$1;__Z4sortI3Lit16LessThan_defaultIS0_EEvR3vecIT_ET0_($3,$2);STACKTOP=sp;return;}
function __ZNK3vecI3LitE4sizeEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+4)|0);var $4=HEAP32[(($3)>>2)];return $4;}
function __ZNK6Solver5valueE3Lit($agg_result,$this,$p){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+24)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$p;$p=STACKTOP;STACKTOP=(STACKTOP+4)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);HEAP32[(($p)>>2)]=HEAP32[((tempParam)>>2)];var $1;var $2=sp;var $3=(sp)+(8);var $4=(sp)+(16);$1=$this;var $5=$1;var $6=(($5+244)|0);var $7=$2;var $8=$p;assert(4%1===0);HEAP32[(($7)>>2)]=HEAP32[(($8)>>2)];var $9=__Z3var3Lit($2);var $10=__ZNK3vecIcEixEi($6,$9);var $11=HEAP8[($10)];var $12=(($11<<24)>>24);__Z7toLbooli($3,$12);var $13=$4;var $14=$p;assert(4%1===0);HEAP32[(($13)>>2)]=HEAP32[(($14)>>2)];var $15=__Z4sign3Lit($4);__ZNK5lbooleoEb($agg_result,$3,$15);STACKTOP=sp;return;}
function __ZN3vecI3LitEixEi($this,$index){var label=0;var $1;var $2;$1=$this;$2=$index;var $3=$1;var $4=$2;var $5=(($3)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6+($4<<2))|0);return $7;}
function __ZNK3LiteqES_($this,$p){var label=0;var sp=STACKTOP;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$p;$p=STACKTOP;STACKTOP=(STACKTOP+4)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);HEAP32[(($p)>>2)]=HEAP32[((tempParam)>>2)];var $1;$1=$this;var $2=$1;var $3=(($2)|0);var $4=HEAP32[(($3)>>2)];var $5=(($p)|0);var $6=HEAP32[(($5)>>2)];var $7=(($4)|(0))==(($6)|(0));STACKTOP=sp;return $7;}
function __ZNK3LitneES_($this,$p){var label=0;var sp=STACKTOP;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$p;$p=STACKTOP;STACKTOP=(STACKTOP+4)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);HEAP32[(($p)>>2)]=HEAP32[((tempParam)>>2)];var $1;$1=$this;var $2=$1;var $3=(($2)|0);var $4=HEAP32[(($3)>>2)];var $5=(($p)|0);var $6=HEAP32[(($5)>>2)];var $7=(($4)|(0))!=(($6)|(0));STACKTOP=sp;return $7;}
function __ZN3vecI3LitE6shrinkEi($this,$nelems){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;$1=$this;$2=$nelems;var $3=$1;var $4=$2;var $5=(($3+4)|0);var $6=HEAP32[(($5)>>2)];var $7=(($4)|(0))<=(($6)|(0));if($7){var $11=0;label=3;break;}else{label=2;break;}
case 2:___assert_fail(((480)|0),((472)|0),72,((2232)|0));throw"Reached an unreachable!";label=3;break;case 3:var $11;$i=0;label=4;break;case 4:var $13=$i;var $14=$2;var $15=(($13)|(0))<(($14)|(0));if($15){label=5;break;}else{label=7;break;}
case 5:var $17=(($3+4)|0);var $18=HEAP32[(($17)>>2)];var $19=((($18)-(1))|0);HEAP32[(($17)>>2)]=$19;var $20=(($3+4)|0);var $21=HEAP32[(($20)>>2)];var $22=(($3)|0);var $23=HEAP32[(($22)>>2)];var $24=(($23+($21<<2))|0);label=6;break;case 6:var $26=$i;var $27=((($26)+(1))|0);$i=$27;label=4;break;case 7:return;default:assert(0,"bad label: "+label);}}
function __ZN6Solver16uncheckedEnqueueE3LitP6Clause($this,$p,$from){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+64)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$p;$p=STACKTOP;STACKTOP=(STACKTOP+4)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);HEAP32[(($p)>>2)]=HEAP32[((tempParam)>>2)];label=1;while(1)switch(label){case 1:var $1;var $2;var $3=sp;var $4=(sp)+(8);var $5=(sp)+(16);var $6=(sp)+(24);var $7=(sp)+(32);var $8=(sp)+(40);var $9=(sp)+(48);var $10=(sp)+(56);$1=$this;$2=$from;var $11=$1;var $12=$3;var $13=$p;assert(4%1===0);HEAP32[(($12)>>2)]=HEAP32[(($13)>>2)];__ZNK6Solver5valueE3Lit($4,$11,$3);var $14=$5;assert(1%1===0);HEAP8[($14)]=HEAP8[((((2800)|0))|0)];var $15=__ZNK5lbooleqES_($4,$5);if($15){var $19=0;label=3;break;}else{label=2;break;}
case 2:___assert_fail(((1816)|0),((328)|0),382,((2080)|0));throw"Reached an unreachable!";label=3;break;case 3:var $19;var $20=$7;var $21=$p;assert(4%1===0);HEAP32[(($20)>>2)]=HEAP32[(($21)>>2)];var $22=__Z4sign3Lit($7);var $23=$22^1;__ZN5lboolC1Eb($6,$23);var $24=__Z5toInt5lbool($6);var $25=(($24)&255);var $26=(($11+244)|0);var $27=$8;var $28=$p;assert(4%1===0);HEAP32[(($27)>>2)]=HEAP32[(($28)>>2)];var $29=__Z3var3Lit($8);var $30=__ZN3vecIcEixEi($26,$29);HEAP8[($30)]=$25;var $31=__ZNK6Solver13decisionLevelEv($11);var $32=(($11+316)|0);var $33=$9;var $34=$p;assert(4%1===0);HEAP32[(($33)>>2)]=HEAP32[(($34)>>2)];var $35=__Z3var3Lit($9);var $36=__ZN3vecIiEixEi($32,$35);HEAP32[(($36)>>2)]=$31;var $37=$2;var $38=(($11+304)|0);var $39=$10;var $40=$p;assert(4%1===0);HEAP32[(($39)>>2)]=HEAP32[(($40)>>2)];var $41=__Z3var3Lit($10);var $42=__ZN3vecIP6ClauseEixEi($38,$41);HEAP32[(($42)>>2)]=$37;var $43=(($11+280)|0);__ZN3vecI3LitE4pushERKS0_($43,$p);STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZN6Solver9propagateEv($this){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+160)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $confl;var $num_props;var $p=sp;var $ws;var $2=(sp)+(8);var $i;var $j;var $end;var $c;var $false_lit=(sp)+(16);var $3=(sp)+(24);var $4=(sp)+(32);var $5=(sp)+(40);var $first=(sp)+(48);var $6=(sp)+(56);var $7=(sp)+(64);var $8=(sp)+(72);var $k;var $9=(sp)+(80);var $10=(sp)+(88);var $11=(sp)+(96);var $12=(sp)+(104);var $13=(sp)+(112);var $14=(sp)+(120);var $15=(sp)+(128);var $16=(sp)+(136);var $17=(sp)+(144);var $18=(sp)+(152);$1=$this;var $19=$1;$confl=0;$num_props=0;label=2;break;case 2:var $21=(($19+328)|0);var $22=HEAP32[(($21)>>2)];var $23=(($19+280)|0);var $24=__ZNK3vecI3LitE4sizeEv($23);var $25=(($22)|(0))<(($24)|(0));if($25){label=3;break;}else{label=27;break;}
case 3:var $27=(($19+280)|0);var $28=(($19+328)|0);var $29=HEAP32[(($28)>>2)];var $30=((($29)+(1))|0);HEAP32[(($28)>>2)]=$30;var $31=__ZN3vecI3LitEixEi($27,$29);var $32=$p;var $33=$31;assert(4%1===0);HEAP32[(($32)>>2)]=HEAP32[(($33)>>2)];var $34=(($19+232)|0);var $35=$2;var $36=$p;assert(4%1===0);HEAP32[(($35)>>2)]=HEAP32[(($36)>>2)];var $37=__Z5toInt3Lit($2);var $38=__ZN3vecIS_IP6ClauseEEixEi($34,$37);$ws=$38;var $39=$num_props;var $40=((($39)+(1))|0);$num_props=$40;var $41=$ws;var $42=__ZN3vecIP6ClauseEcvPS1_Ev($41);$j=$42;$i=$42;var $43=$i;var $44=$ws;var $45=__ZNK3vecIP6ClauseE4sizeEv($44);var $46=(($43+($45<<2))|0);$end=$46;label=4;break;case 4:var $48=$i;var $49=$end;var $50=(($48)|(0))!=(($49)|(0));if($50){label=5;break;}else{label=26;break;}
case 5:var $52=$i;var $53=(($52+4)|0);$i=$53;var $54=HEAP32[(($52)>>2)];$c=$54;var $55=$3;var $56=$p;assert(4%1===0);HEAP32[(($55)>>2)]=HEAP32[(($56)>>2)];__Zco3Lit($false_lit,$3);var $57=$c;var $58=__ZN6ClauseixEi($57,0);var $59=$4;var $60=$false_lit;assert(4%1===0);HEAP32[(($59)>>2)]=HEAP32[(($60)>>2)];var $61=__ZNK3LiteqES_($58,$4);if($61){label=6;break;}else{label=7;break;}
case 6:var $63=$c;var $64=__ZN6ClauseixEi($63,0);var $65=$c;var $66=__ZN6ClauseixEi($65,1);var $67=$64;var $68=$66;assert(4%1===0);HEAP32[(($67)>>2)]=HEAP32[(($68)>>2)];var $69=$c;var $70=__ZN6ClauseixEi($69,1);var $71=$70;var $72=$false_lit;assert(4%1===0);HEAP32[(($71)>>2)]=HEAP32[(($72)>>2)];label=7;break;case 7:var $74=$c;var $75=__ZN6ClauseixEi($74,1);var $76=$5;var $77=$false_lit;assert(4%1===0);HEAP32[(($76)>>2)]=HEAP32[(($77)>>2)];var $78=__ZNK3LiteqES_($75,$5);if($78){var $82=1;label=9;break;}else{label=8;break;}
case 8:___assert_fail(((1792)|0),((328)|0),420,((2008)|0));throw"Reached an unreachable!";label=9;break;case 9:var $82;var $83=$c;var $84=__ZN6ClauseixEi($83,0);var $85=$first;var $86=$84;assert(4%1===0);HEAP32[(($85)>>2)]=HEAP32[(($86)>>2)];var $87=$6;var $88=$first;assert(4%1===0);HEAP32[(($87)>>2)]=HEAP32[(($88)>>2)];__ZNK6Solver5valueE3Lit($7,$19,$6);var $89=$8;assert(1%1===0);HEAP8[($89)]=HEAP8[((((2832)|0))|0)];var $90=__ZNK5lbooleqES_($7,$8);if($90){label=10;break;}else{label=11;break;}
case 10:var $92=$c;var $93=$j;var $94=(($93+4)|0);$j=$94;HEAP32[(($93)>>2)]=$92;label=24;break;case 11:$k=2;label=12;break;case 12:var $97=$k;var $98=$c;var $99=__ZNK6Clause4sizeEv($98);var $100=(($97)|(0))<(($99)|(0));if($100){label=13;break;}else{label=17;break;}
case 13:var $102=$c;var $103=$k;var $104=__ZN6ClauseixEi($102,$103);var $105=$9;var $106=$104;assert(4%1===0);HEAP32[(($105)>>2)]=HEAP32[(($106)>>2)];__ZNK6Solver5valueE3Lit($10,$19,$9);var $107=$11;assert(1%1===0);HEAP8[($107)]=HEAP8[((((2816)|0))|0)];var $108=__ZNK5lboolneES_($10,$11);if($108){label=14;break;}else{label=15;break;}
case 14:var $110=$c;var $111=__ZN6ClauseixEi($110,1);var $112=$c;var $113=$k;var $114=__ZN6ClauseixEi($112,$113);var $115=$111;var $116=$114;assert(4%1===0);HEAP32[(($115)>>2)]=HEAP32[(($116)>>2)];var $117=$c;var $118=$k;var $119=__ZN6ClauseixEi($117,$118);var $120=$119;var $121=$false_lit;assert(4%1===0);HEAP32[(($120)>>2)]=HEAP32[(($121)>>2)];var $122=(($19+232)|0);var $123=$c;var $124=__ZN6ClauseixEi($123,1);var $125=$13;var $126=$124;assert(4%1===0);HEAP32[(($125)>>2)]=HEAP32[(($126)>>2)];__Zco3Lit($12,$13);var $127=__Z5toInt3Lit($12);var $128=__ZN3vecIS_IP6ClauseEEixEi($122,$127);var $129=$c;HEAP32[(($14)>>2)]=$129;__ZN3vecIP6ClauseE4pushERKS1_($128,$14);label=25;break;case 15:label=16;break;case 16:var $132=$k;var $133=((($132)+(1))|0);$k=$133;label=12;break;case 17:var $135=$c;var $136=$j;var $137=(($136+4)|0);$j=$137;HEAP32[(($136)>>2)]=$135;var $138=$15;var $139=$first;assert(4%1===0);HEAP32[(($138)>>2)]=HEAP32[(($139)>>2)];__ZNK6Solver5valueE3Lit($16,$19,$15);var $140=$17;assert(1%1===0);HEAP8[($140)]=HEAP8[((((2816)|0))|0)];var $141=__ZNK5lbooleqES_($16,$17);if($141){label=18;break;}else{label=22;break;}
case 18:var $143=$c;$confl=$143;var $144=(($19+280)|0);var $145=__ZNK3vecI3LitE4sizeEv($144);var $146=(($19+328)|0);HEAP32[(($146)>>2)]=$145;label=19;break;case 19:var $148=$i;var $149=$end;var $150=(($148)>>>(0))<(($149)>>>(0));if($150){label=20;break;}else{label=21;break;}
case 20:var $152=$i;var $153=(($152+4)|0);$i=$153;var $154=HEAP32[(($152)>>2)];var $155=$j;var $156=(($155+4)|0);$j=$156;HEAP32[(($155)>>2)]=$154;label=19;break;case 21:label=23;break;case 22:var $159=$18;var $160=$first;assert(4%1===0);HEAP32[(($159)>>2)]=HEAP32[(($160)>>2)];var $161=$c;__ZN6Solver16uncheckedEnqueueE3LitP6Clause($19,$18,$161);label=23;break;case 23:label=24;break;case 24:label=25;break;case 25:label=4;break;case 26:var $166=$ws;var $167=$i;var $168=$j;var $169=$167;var $170=$168;var $171=((($169)-($170))|0);var $172=((((($171)|(0)))/(4))&-1);__ZN3vecIP6ClauseE6shrinkEi($166,$172);label=2;break;case 27:var $174=$num_props;var $175$0=$174;var $175$1=((($174)|(0))<0?-1:0);var $176=(($19+120)|0);var $ld$0$0=(($176)|0);var $177$0=HEAP32[(($ld$0$0)>>2)];var $ld$1$1=(($176+4)|0);var $177$1=HEAP32[(($ld$1$1)>>2)];var $178$0=_i64Add($177$0,$177$1,$175$0,$175$1);var $178$1=tempRet0;var $st$2$0=(($176)|0);HEAP32[(($st$2$0)>>2)]=$178$0;var $st$3$1=(($176+4)|0);HEAP32[(($st$3$1)>>2)]=$178$1;var $179=$num_props;var $180$0=$179;var $180$1=((($179)|(0))<0?-1:0);var $181=(($19+336)|0);var $ld$4$0=(($181)|0);var $182$0=HEAP32[(($ld$4$0)>>2)];var $ld$5$1=(($181+4)|0);var $182$1=HEAP32[(($ld$5$1)>>2)];var $183$0=_i64Subtract($182$0,$182$1,$180$0,$180$1);var $183$1=tempRet0;var $st$6$0=(($181)|0);HEAP32[(($st$6$0)>>2)]=$183$0;var $st$7$1=(($181+4)|0);HEAP32[(($st$7$1)>>2)]=$183$1;var $184=$confl;STACKTOP=sp;return $184;default:assert(0,"bad label: "+label);}}
function __Z10Clause_newI3vecI3LitEEP6ClauseRKT_b($ps,$learnt){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $mem;$1=$ps;var $3=(($learnt)&(1));$2=$3;var $4=$1;var $5=__ZNK3vecI3LitE4sizeEv($4);var $6=($5<<2);var $7=((($6)+(8))|0);var $8=_malloc($7);$mem=$8;var $9=$mem;var $10=(($9)|(0))==0;if($10){var $17=0;label=3;break;}else{label=2;break;}
case 2:var $12=$9;var $13=$1;var $14=$2;var $15=(($14)&1);__ZN6ClauseC1I3vecI3LitEEERKT_b($12,$13,$15);var $17=$12;label=3;break;case 3:var $17;return $17;default:assert(0,"bad label: "+label);}}
function __ZN6Solver12attachClauseER6Clause($this,$c){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+48)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $3=sp;var $4=(sp)+(8);var $5=(sp)+(16);var $6=(sp)+(24);var $7=(sp)+(32);var $8=(sp)+(40);$1=$this;$2=$c;var $9=$1;var $10=$2;var $11=__ZNK6Clause4sizeEv($10);var $12=(($11)|(0))>1;if($12){var $16=0;label=3;break;}else{label=2;break;}
case 2:___assert_fail(((168)|0),((328)|0),127,((2152)|0));throw"Reached an unreachable!";label=3;break;case 3:var $16;var $17=(($9+232)|0);var $18=$2;var $19=__ZN6ClauseixEi($18,0);var $20=$4;var $21=$19;assert(4%1===0);HEAP32[(($20)>>2)]=HEAP32[(($21)>>2)];__Zco3Lit($3,$4);var $22=__Z5toInt3Lit($3);var $23=__ZN3vecIS_IP6ClauseEEixEi($17,$22);var $24=$2;HEAP32[(($5)>>2)]=$24;__ZN3vecIP6ClauseE4pushERKS1_($23,$5);var $25=(($9+232)|0);var $26=$2;var $27=__ZN6ClauseixEi($26,1);var $28=$7;var $29=$27;assert(4%1===0);HEAP32[(($28)>>2)]=HEAP32[(($29)>>2)];__Zco3Lit($6,$7);var $30=__Z5toInt3Lit($6);var $31=__ZN3vecIS_IP6ClauseEEixEi($25,$30);var $32=$2;HEAP32[(($8)>>2)]=$32;__ZN3vecIP6ClauseE4pushERKS1_($31,$8);var $33=$2;var $34=__ZNK6Clause6learntEv($33);if($34){label=4;break;}else{label=5;break;}
case 4:var $36=$2;var $37=__ZNK6Clause4sizeEv($36);var $38$0=$37;var $38$1=((($37)|(0))<0?-1:0);var $39=(($9+144)|0);var $ld$0$0=(($39)|0);var $40$0=HEAP32[(($ld$0$0)>>2)];var $ld$1$1=(($39+4)|0);var $40$1=HEAP32[(($ld$1$1)>>2)];var $41$0=_i64Add($40$0,$40$1,$38$0,$38$1);var $41$1=tempRet0;var $st$2$0=(($39)|0);HEAP32[(($st$2$0)>>2)]=$41$0;var $st$3$1=(($39+4)|0);HEAP32[(($st$3$1)>>2)]=$41$1;label=6;break;case 5:var $43=$2;var $44=__ZNK6Clause4sizeEv($43);var $45$0=$44;var $45$1=((($44)|(0))<0?-1:0);var $46=(($9+136)|0);var $ld$4$0=(($46)|0);var $47$0=HEAP32[(($ld$4$0)>>2)];var $ld$5$1=(($46+4)|0);var $47$1=HEAP32[(($ld$5$1)>>2)];var $48$0=_i64Add($47$0,$47$1,$45$0,$45$1);var $48$1=tempRet0;var $st$6$0=(($46)|0);HEAP32[(($st$6$0)>>2)]=$48$0;var $st$7$1=(($46+4)|0);HEAP32[(($st$7$1)>>2)]=$48$1;label=6;break;case 6:STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZNK6Clause4sizeEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2)|0);var $4=HEAP32[(($3)>>2)];var $5=$4>>>3;return $5;}
function __ZN3vecIS_IP6ClauseEEixEi($this,$index){var label=0;var $1;var $2;$1=$this;$2=$index;var $3=$1;var $4=$2;var $5=(($3)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6+((($4)*(12))&-1))|0);return $7;}
function __Z5toInt3Lit($p){var label=0;var sp=STACKTOP;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$p;$p=STACKTOP;STACKTOP=(STACKTOP+4)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);HEAP32[(($p)>>2)]=HEAP32[((tempParam)>>2)];var $1=(($p)|0);var $2=HEAP32[(($1)>>2)];STACKTOP=sp;return $2;}
function __ZN6ClauseixEi($this,$i){var label=0;var $1;var $2;$1=$this;$2=$i;var $3=$1;var $4=$2;var $5=(($3+8)|0);var $6=(($5+($4<<2))|0);return $6;}
function __ZNK6Clause6learntEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2)|0);var $4=HEAP32[(($3)>>2)];var $5=$4&1;var $6=(($5)|(0))!=0;return $6;}
function __ZN6Solver12detachClauseER6Clause($this,$c){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+96)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $3=sp;var $4=(sp)+(8);var $5=(sp)+(16);var $6=(sp)+(24);var $7=(sp)+(32);var $8=(sp)+(40);var $9=(sp)+(48);var $10=(sp)+(56);var $11=(sp)+(64);var $12=(sp)+(72);var $13=(sp)+(80);var $14=(sp)+(88);$1=$this;$2=$c;var $15=$1;var $16=$2;var $17=__ZNK6Clause4sizeEv($16);var $18=(($17)|(0))>1;if($18){var $22=0;label=3;break;}else{label=2;break;}
case 2:___assert_fail(((168)|0),((328)|0),135,((2136)|0));throw"Reached an unreachable!";label=3;break;case 3:var $22;var $23=(($15+232)|0);var $24=$2;var $25=__ZN6ClauseixEi($24,0);var $26=$4;var $27=$25;assert(4%1===0);HEAP32[(($26)>>2)]=HEAP32[(($27)>>2)];__Zco3Lit($3,$4);var $28=__Z5toInt3Lit($3);var $29=__ZN3vecIS_IP6ClauseEEixEi($23,$28);var $30=$2;HEAP32[(($5)>>2)]=$30;var $31=__ZL4findI3vecIP6ClauseES2_EbRT_RKT0_($29,$5);if($31){var $35=1;label=5;break;}else{label=4;break;}
case 4:___assert_fail(((80)|0),((328)|0),136,((2136)|0));throw"Reached an unreachable!";label=5;break;case 5:var $35;var $36=(($15+232)|0);var $37=$2;var $38=__ZN6ClauseixEi($37,1);var $39=$7;var $40=$38;assert(4%1===0);HEAP32[(($39)>>2)]=HEAP32[(($40)>>2)];__Zco3Lit($6,$7);var $41=__Z5toInt3Lit($6);var $42=__ZN3vecIS_IP6ClauseEEixEi($36,$41);var $43=$2;HEAP32[(($8)>>2)]=$43;var $44=__ZL4findI3vecIP6ClauseES2_EbRT_RKT0_($42,$8);if($44){var $48=1;label=7;break;}else{label=6;break;}
case 6:___assert_fail(((8)|0),((328)|0),137,((2136)|0));throw"Reached an unreachable!";label=7;break;case 7:var $48;var $49=(($15+232)|0);var $50=$2;var $51=__ZN6ClauseixEi($50,0);var $52=$10;var $53=$51;assert(4%1===0);HEAP32[(($52)>>2)]=HEAP32[(($53)>>2)];__Zco3Lit($9,$10);var $54=__Z5toInt3Lit($9);var $55=__ZN3vecIS_IP6ClauseEEixEi($49,$54);var $56=$2;HEAP32[(($11)>>2)]=$56;__ZL6removeI3vecIP6ClauseES2_EvRT_RKT0_($55,$11);var $57=(($15+232)|0);var $58=$2;var $59=__ZN6ClauseixEi($58,1);var $60=$13;var $61=$59;assert(4%1===0);HEAP32[(($60)>>2)]=HEAP32[(($61)>>2)];__Zco3Lit($12,$13);var $62=__Z5toInt3Lit($12);var $63=__ZN3vecIS_IP6ClauseEEixEi($57,$62);var $64=$2;HEAP32[(($14)>>2)]=$64;__ZL6removeI3vecIP6ClauseES2_EvRT_RKT0_($63,$14);var $65=$2;var $66=__ZNK6Clause6learntEv($65);if($66){label=8;break;}else{label=9;break;}
case 8:var $68=$2;var $69=__ZNK6Clause4sizeEv($68);var $70$0=$69;var $70$1=((($69)|(0))<0?-1:0);var $71=(($15+144)|0);var $ld$0$0=(($71)|0);var $72$0=HEAP32[(($ld$0$0)>>2)];var $ld$1$1=(($71+4)|0);var $72$1=HEAP32[(($ld$1$1)>>2)];var $73$0=_i64Subtract($72$0,$72$1,$70$0,$70$1);var $73$1=tempRet0;var $st$2$0=(($71)|0);HEAP32[(($st$2$0)>>2)]=$73$0;var $st$3$1=(($71+4)|0);HEAP32[(($st$3$1)>>2)]=$73$1;label=10;break;case 9:var $75=$2;var $76=__ZNK6Clause4sizeEv($75);var $77$0=$76;var $77$1=((($76)|(0))<0?-1:0);var $78=(($15+136)|0);var $ld$4$0=(($78)|0);var $79$0=HEAP32[(($ld$4$0)>>2)];var $ld$5$1=(($78+4)|0);var $79$1=HEAP32[(($ld$5$1)>>2)];var $80$0=_i64Subtract($79$0,$79$1,$77$0,$77$1);var $80$1=tempRet0;var $st$6$0=(($78)|0);HEAP32[(($st$6$0)>>2)]=$80$0;var $st$7$1=(($78+4)|0);HEAP32[(($st$7$1)>>2)]=$80$1;label=10;break;case 10:STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZL4findI3vecIP6ClauseES2_EbRT_RKT0_($ts,$t){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $j;$1=$ts;$2=$t;$j=0;label=2;break;case 2:var $4=$j;var $5=$1;var $6=__ZNK3vecIP6ClauseE4sizeEv($5);var $7=(($4)|(0))<(($6)|(0));if($7){label=3;break;}else{var $17=0;label=4;break;}
case 3:var $9=$1;var $10=$j;var $11=__ZN3vecIP6ClauseEixEi($9,$10);var $12=HEAP32[(($11)>>2)];var $13=$2;var $14=HEAP32[(($13)>>2)];var $15=(($12)|(0))!=(($14)|(0));var $17=$15;label=4;break;case 4:var $17;if($17){label=5;break;}else{label=7;break;}
case 5:label=6;break;case 6:var $20=$j;var $21=((($20)+(1))|0);$j=$21;label=2;break;case 7:var $23=$j;var $24=$1;var $25=__ZNK3vecIP6ClauseE4sizeEv($24);var $26=(($23)|(0))<(($25)|(0));return $26;default:assert(0,"bad label: "+label);}}
function __ZL6removeI3vecIP6ClauseES2_EvRT_RKT0_($ts,$t){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $j;$1=$ts;$2=$t;$j=0;label=2;break;case 2:var $4=$j;var $5=$1;var $6=__ZNK3vecIP6ClauseE4sizeEv($5);var $7=(($4)|(0))<(($6)|(0));if($7){label=3;break;}else{var $17=0;label=4;break;}
case 3:var $9=$1;var $10=$j;var $11=__ZN3vecIP6ClauseEixEi($9,$10);var $12=HEAP32[(($11)>>2)];var $13=$2;var $14=HEAP32[(($13)>>2)];var $15=(($12)|(0))!=(($14)|(0));var $17=$15;label=4;break;case 4:var $17;if($17){label=5;break;}else{label=7;break;}
case 5:label=6;break;case 6:var $20=$j;var $21=((($20)+(1))|0);$j=$21;label=2;break;case 7:var $23=$j;var $24=$1;var $25=__ZNK3vecIP6ClauseE4sizeEv($24);var $26=(($23)|(0))<(($25)|(0));if($26){var $30=1;label=9;break;}else{label=8;break;}
case 8:___assert_fail(((432)|0),((424)|0),33,((2240)|0));throw"Reached an unreachable!";label=9;break;case 9:var $30;label=10;break;case 10:var $32=$j;var $33=$1;var $34=__ZNK3vecIP6ClauseE4sizeEv($33);var $35=((($34)-(1))|0);var $36=(($32)|(0))<(($35)|(0));if($36){label=11;break;}else{label=13;break;}
case 11:var $38=$1;var $39=$j;var $40=((($39)+(1))|0);var $41=__ZN3vecIP6ClauseEixEi($38,$40);var $42=HEAP32[(($41)>>2)];var $43=$1;var $44=$j;var $45=__ZN3vecIP6ClauseEixEi($43,$44);HEAP32[(($45)>>2)]=$42;label=12;break;case 12:var $47=$j;var $48=((($47)+(1))|0);$j=$48;label=10;break;case 13:var $50=$1;__ZN3vecIP6ClauseE3popEv($50);return;default:assert(0,"bad label: "+label);}}
function __ZN6Solver12removeClauseER6Clause($this,$c){var label=0;var $1;var $2;$1=$this;$2=$c;var $3=$1;var $4=$2;__ZN6Solver12detachClauseER6Clause($3,$4);var $5=$2;var $6=$5;_free($6);return;}
function __ZNK6Solver9satisfiedERK6Clause($this,$c){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+24)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $3;var $i;var $4=sp;var $5=(sp)+(8);var $6=(sp)+(16);$2=$this;$3=$c;var $7=$2;$i=0;label=2;break;case 2:var $9=$i;var $10=$3;var $11=__ZNK6Clause4sizeEv($10);var $12=(($9)|(0))<(($11)|(0));if($12){label=3;break;}else{label=7;break;}
case 3:var $14=$3;var $15=$i;__ZNK6ClauseixEi($4,$14,$15);__ZNK6Solver5valueE3Lit($5,$7,$4);var $16=$6;assert(1%1===0);HEAP8[($16)]=HEAP8[((((2832)|0))|0)];var $17=__ZNK5lbooleqES_($5,$6);if($17){label=4;break;}else{label=5;break;}
case 4:$1=1;label=8;break;case 5:label=6;break;case 6:var $21=$i;var $22=((($21)+(1))|0);$i=$22;label=2;break;case 7:$1=0;label=8;break;case 8:var $25=$1;STACKTOP=sp;return $25;default:assert(0,"bad label: "+label);}}
function __ZNK6ClauseixEi($agg_result,$this,$i){var label=0;var $1;var $2;$1=$this;$2=$i;var $3=$1;var $4=$2;var $5=(($3+8)|0);var $6=(($5+($4<<2))|0);var $7=$agg_result;var $8=$6;assert(4%1===0);HEAP32[(($7)>>2)]=HEAP32[(($8)>>2)];return;}
function __ZN6Solver11cancelUntilEi($this,$level){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+16)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $c;var $x;var $3=sp;var $4=(sp)+(8);$1=$this;$2=$level;var $5=$1;var $6=__ZNK6Solver13decisionLevelEv($5);var $7=$2;var $8=(($6)|(0))>(($7)|(0));if($8){label=2;break;}else{label=7;break;}
case 2:var $10=(($5+280)|0);var $11=__ZNK3vecI3LitE4sizeEv($10);var $12=((($11)-(1))|0);$c=$12;label=3;break;case 3:var $14=$c;var $15=(($5+292)|0);var $16=$2;var $17=__ZN3vecIiEixEi($15,$16);var $18=HEAP32[(($17)>>2)];var $19=(($14)|(0))>=(($18)|(0));if($19){label=4;break;}else{label=6;break;}
case 4:var $21=(($5+280)|0);var $22=$c;var $23=__ZN3vecI3LitEixEi($21,$22);var $24=$3;var $25=$23;assert(4%1===0);HEAP32[(($24)>>2)]=HEAP32[(($25)>>2)];var $26=__Z3var3Lit($3);$x=$26;var $27=$4;assert(1%1===0);HEAP8[($27)]=HEAP8[((((2800)|0))|0)];var $28=__Z5toInt5lbool($4);var $29=(($28)&255);var $30=(($5+244)|0);var $31=$x;var $32=__ZN3vecIcEixEi($30,$31);HEAP8[($32)]=$29;var $33=$x;__ZN6Solver14insertVarOrderEi($5,$33);label=5;break;case 5:var $35=$c;var $36=((($35)-(1))|0);$c=$36;label=3;break;case 6:var $38=(($5+292)|0);var $39=$2;var $40=__ZN3vecIiEixEi($38,$39);var $41=HEAP32[(($40)>>2)];var $42=(($5+328)|0);HEAP32[(($42)>>2)]=$41;var $43=(($5+280)|0);var $44=(($5+280)|0);var $45=__ZNK3vecI3LitE4sizeEv($44);var $46=(($5+292)|0);var $47=$2;var $48=__ZN3vecIiEixEi($46,$47);var $49=HEAP32[(($48)>>2)];var $50=((($45)-($49))|0);__ZN3vecI3LitE6shrinkEi($43,$50);var $51=(($5+292)|0);var $52=(($5+292)|0);var $53=__ZNK3vecIiE4sizeEv($52);var $54=$2;var $55=((($53)-($54))|0);__ZN3vecIiE6shrinkEi($51,$55);label=7;break;case 7:STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZN3vecIiEixEi($this,$index){var label=0;var $1;var $2;$1=$this;$2=$index;var $3=$1;var $4=$2;var $5=(($3)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6+($4<<2))|0);return $7;}
function __Z3var3Lit($p){var label=0;var sp=STACKTOP;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$p;$p=STACKTOP;STACKTOP=(STACKTOP+4)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);HEAP32[(($p)>>2)]=HEAP32[((tempParam)>>2)];var $1=(($p)|0);var $2=HEAP32[(($1)>>2)];var $3=$2>>1;STACKTOP=sp;return $3;}
function __ZN3vecIcEixEi($this,$index){var label=0;var $1;var $2;$1=$this;$2=$index;var $3=$1;var $4=$2;var $5=(($3)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6+$4)|0);return $7;}
function __ZN3vecIiE6shrinkEi($this,$nelems){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;$1=$this;$2=$nelems;var $3=$1;var $4=$2;var $5=(($3+4)|0);var $6=HEAP32[(($5)>>2)];var $7=(($4)|(0))<=(($6)|(0));if($7){var $11=0;label=3;break;}else{label=2;break;}
case 2:___assert_fail(((480)|0),((472)|0),72,((2232)|0));throw"Reached an unreachable!";label=3;break;case 3:var $11;$i=0;label=4;break;case 4:var $13=$i;var $14=$2;var $15=(($13)|(0))<(($14)|(0));if($15){label=5;break;}else{label=7;break;}
case 5:var $17=(($3+4)|0);var $18=HEAP32[(($17)>>2)];var $19=((($18)-(1))|0);HEAP32[(($17)>>2)]=$19;var $20=(($3+4)|0);var $21=HEAP32[(($20)>>2)];var $22=(($3)|0);var $23=HEAP32[(($22)>>2)];var $24=(($23+($21<<2))|0);var $25=HEAP32[(($24)>>2)];label=6;break;case 6:var $27=$i;var $28=((($27)+(1))|0);$i=$28;label=4;break;case 7:return;default:assert(0,"bad label: "+label);}}
function __ZNK3vecIiE4sizeEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+4)|0);var $4=HEAP32[(($3)>>2)];return $4;}
function __ZN6Solver13pickBranchLitEid($agg_result,$this,$polarity_mode,$random_var_freq){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+32)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $3;var $next;var $4=sp;var $5=(sp)+(8);var $6=(sp)+(16);var $7=(sp)+(24);var $sign;$1=$this;$2=$polarity_mode;$3=$random_var_freq;var $8=$1;$next=-1;var $9=(($8+384)|0);var $10=__ZN6Solver5drandERd($9);var $11=$3;var $12=$10<$11;if($12){label=2;break;}else{label=7;break;}
case 2:var $14=(($8+356)|0);var $15=__ZNK4HeapIN6Solver10VarOrderLtEE5emptyEv($14);if($15){label=7;break;}else{label=3;break;}
case 3:var $17=(($8+356)|0);var $18=(($8+384)|0);var $19=(($8+356)|0);var $20=__ZNK4HeapIN6Solver10VarOrderLtEE4sizeEv($19);var $21=__ZN6Solver5irandERdi($18,$20);var $22=__ZNK4HeapIN6Solver10VarOrderLtEEixEi($17,$21);$next=$22;var $23=(($8+244)|0);var $24=$next;var $25=__ZN3vecIcEixEi($23,$24);var $26=HEAP8[($25)];var $27=(($26<<24)>>24);__Z7toLbooli($4,$27);var $28=$5;assert(1%1===0);HEAP8[($28)]=HEAP8[((((2800)|0))|0)];var $29=__ZNK5lbooleqES_($4,$5);if($29){label=4;break;}else{label=6;break;}
case 4:var $31=(($8+268)|0);var $32=$next;var $33=__ZN3vecIcEixEi($31,$32);var $34=HEAP8[($33)];var $35=(($34<<24)>>24)!=0;if($35){label=5;break;}else{label=6;break;}
case 5:var $37=(($8+112)|0);var $ld$0$0=(($37)|0);var $38$0=HEAP32[(($ld$0$0)>>2)];var $ld$1$1=(($37+4)|0);var $38$1=HEAP32[(($ld$1$1)>>2)];var $$etemp$2$0=1;var $$etemp$2$1=0;var $39$0=_i64Add($38$0,$38$1,$$etemp$2$0,$$etemp$2$1);var $39$1=tempRet0;var $st$3$0=(($37)|0);HEAP32[(($st$3$0)>>2)]=$39$0;var $st$4$1=(($37+4)|0);HEAP32[(($st$4$1)>>2)]=$39$1;label=6;break;case 6:label=7;break;case 7:label=8;break;case 8:var $43=$next;var $44=(($43)|(0))==-1;if($44){var $61=1;label=11;break;}else{label=9;break;}
case 9:var $46=(($8+244)|0);var $47=$next;var $48=__ZN3vecIcEixEi($46,$47);var $49=HEAP8[($48)];var $50=(($49<<24)>>24);__Z7toLbooli($6,$50);var $51=$7;assert(1%1===0);HEAP8[($51)]=HEAP8[((((2800)|0))|0)];var $52=__ZNK5lboolneES_($6,$7);if($52){var $61=1;label=11;break;}else{label=10;break;}
case 10:var $54=(($8+268)|0);var $55=$next;var $56=__ZN3vecIcEixEi($54,$55);var $57=HEAP8[($56)];var $58=(($57<<24)>>24)!=0;var $59=$58^1;var $61=$59;label=11;break;case 11:var $61;if($61){label=12;break;}else{label=16;break;}
case 12:var $63=(($8+356)|0);var $64=__ZNK4HeapIN6Solver10VarOrderLtEE5emptyEv($63);if($64){label=13;break;}else{label=14;break;}
case 13:$next=-1;label=16;break;case 14:var $67=(($8+356)|0);var $68=__ZN4HeapIN6Solver10VarOrderLtEE9removeMinEv($67);$next=$68;label=15;break;case 15:label=8;break;case 16:$sign=0;var $71=$2;if((($71)|(0))==0){label=17;break;}
else if((($71)|(0))==1){label=18;break;}
else if((($71)|(0))==2){label=19;break;}
else if((($71)|(0))==3){label=20;break;}
else{label=21;break;}
case 17:$sign=0;label=22;break;case 18:$sign=1;label=22;break;case 19:var $75=(($8+256)|0);var $76=$next;var $77=__ZN3vecIcEixEi($75,$76);var $78=HEAP8[($77)];var $79=(($78<<24)>>24)!=0;var $80=(($79)&(1));$sign=$80;label=22;break;case 20:var $82=(($8+384)|0);var $83=__ZN6Solver5irandERdi($82,2);var $84=(($83)|(0))!=0;var $85=(($84)&(1));$sign=$85;label=22;break;case 21:___assert_fail(((1920)|0),((328)|0),198,((2104)|0));throw"Reached an unreachable!";case 22:var $88=$next;var $89=(($88)|(0))==-1;if($89){label=23;break;}else{label=24;break;}
case 23:var $91=$agg_result;assert(4%1===0);HEAP32[(($91)>>2)]=HEAP32[((2768)>>2)];label=25;break;case 24:var $93=$next;var $94=$sign;var $95=(($94)&1);__ZN3LitC1Eib($agg_result,$93,$95);label=25;break;case 25:STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZN6Solver5drandERd($seed){var label=0;var $1;var $q;$1=$seed;var $2=$1;var $3=HEAPF64[(($2)>>3)];var $4=($3)*(1389796);HEAPF64[(($2)>>3)]=$4;var $5=$1;var $6=HEAPF64[(($5)>>3)];var $7=($6)/(2147483647);var $8=(($7)&-1);$q=$8;var $9=$q;var $10=(($9)|(0));var $11=($10)*(2147483647);var $12=$1;var $13=HEAPF64[(($12)>>3)];var $14=($13)-($11);HEAPF64[(($12)>>3)]=$14;var $15=$1;var $16=HEAPF64[(($15)>>3)];var $17=($16)/(2147483647);return $17;}
function __ZNK4HeapIN6Solver10VarOrderLtEE5emptyEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+4)|0);var $4=__ZNK3vecIiE4sizeEv($3);var $5=(($4)|(0))==0;return $5;}
function __ZNK4HeapIN6Solver10VarOrderLtEEixEi($this,$index){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;$1=$this;$2=$index;var $3=$1;var $4=$2;var $5=(($3+4)|0);var $6=__ZNK3vecIiE4sizeEv($5);var $7=(($4)|(0))<(($6)|(0));if($7){var $11=0;label=3;break;}else{label=2;break;}
case 2:___assert_fail(((448)|0),((496)|0),80,((1992)|0));throw"Reached an unreachable!";label=3;break;case 3:var $11;var $12=(($3+4)|0);var $13=$2;var $14=__ZNK3vecIiEixEi($12,$13);var $15=HEAP32[(($14)>>2)];return $15;default:assert(0,"bad label: "+label);}}
function __ZN6Solver5irandERdi($seed,$size){var label=0;var $1;var $2;$1=$seed;$2=$size;var $3=$1;var $4=__ZN6Solver5drandERd($3);var $5=$2;var $6=(($5)|(0));var $7=($4)*($6);var $8=(($7)&-1);return $8;}
function __ZNK4HeapIN6Solver10VarOrderLtEE4sizeEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+4)|0);var $4=__ZNK3vecIiE4sizeEv($3);return $4;}
function __ZN4HeapIN6Solver10VarOrderLtEE9removeMinEv($this){var label=0;label=1;while(1)switch(label){case 1:var $1;var $x;$1=$this;var $2=$1;var $3=(($2+4)|0);var $4=__ZN3vecIiEixEi($3,0);var $5=HEAP32[(($4)>>2)];$x=$5;var $6=(($2+4)|0);var $7=__ZN3vecIiE4lastEv($6);var $8=HEAP32[(($7)>>2)];var $9=(($2+4)|0);var $10=__ZN3vecIiEixEi($9,0);HEAP32[(($10)>>2)]=$8;var $11=(($2+16)|0);var $12=(($2+4)|0);var $13=__ZN3vecIiEixEi($12,0);var $14=HEAP32[(($13)>>2)];var $15=__ZN3vecIiEixEi($11,$14);HEAP32[(($15)>>2)]=0;var $16=(($2+16)|0);var $17=$x;var $18=__ZN3vecIiEixEi($16,$17);HEAP32[(($18)>>2)]=-1;var $19=(($2+4)|0);__ZN3vecIiE3popEv($19);var $20=(($2+4)|0);var $21=__ZNK3vecIiE4sizeEv($20);var $22=(($21)|(0))>1;if($22){label=2;break;}else{label=3;break;}
case 2:__ZN4HeapIN6Solver10VarOrderLtEE13percolateDownEi($2,0);label=3;break;case 3:var $25=$x;return $25;default:assert(0,"bad label: "+label);}}
function __ZN6Solver7analyzeEP6ClauseR3vecI3LitERi($this,$confl,$out_learnt,$out_btlevel){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+208)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $3;var $4;var $pathC;var $p=sp;var $index;var $c;var $j;var $5=(sp)+(8);var $q=(sp)+(16);var $6=(sp)+(24);var $7=(sp)+(32);var $8=(sp)+(40);var $9=(sp)+(48);var $10=(sp)+(56);var $11=(sp)+(64);var $12=(sp)+(72);var $13=(sp)+(80);var $14=(sp)+(88);var $15=(sp)+(96);var $16=(sp)+(104);var $17=(sp)+(112);var $i;var $j1;var $abstract_level;var $18=(sp)+(120);var $19=(sp)+(128);var $20=(sp)+(136);var $c2;var $21=(sp)+(144);var $k;var $22=(sp)+(152);var $23=(sp)+(160);var $max_i;var $i3;var $24=(sp)+(168);var $25=(sp)+(176);var $p4=(sp)+(184);var $26=(sp)+(192);var $j5;var $27=(sp)+(200);$1=$this;$2=$confl;$3=$out_learnt;$4=$out_btlevel;var $28=$1;$pathC=0;var $29=$p;assert(4%1===0);HEAP32[(($29)>>2)]=HEAP32[((2768)>>2)];var $30=$3;__ZN3vecI3LitE4pushEv($30);var $31=(($28+280)|0);var $32=__ZNK3vecI3LitE4sizeEv($31);var $33=((($32)-(1))|0);$index=$33;var $34=$4;HEAP32[(($34)>>2)]=0;label=2;break;case 2:var $36=$2;var $37=(($36)|(0))!=0;if($37){var $41=1;label=4;break;}else{label=3;break;}
case 3:___assert_fail(((1904)|0),((328)|0),232,((2056)|0));throw"Reached an unreachable!";label=4;break;case 4:var $41;var $42=$2;$c=$42;var $43=$c;var $44=__ZNK6Clause6learntEv($43);if($44){label=5;break;}else{label=6;break;}
case 5:var $46=$c;__ZN6Solver15claBumpActivityER6Clause($28,$46);label=6;break;case 6:var $48=$5;assert(4%1===0);HEAP32[(($48)>>2)]=HEAP32[((2768)>>2)];var $49=__ZNK3LiteqES_($p,$5);var $50=$49?0:1;$j=$50;label=7;break;case 7:var $52=$j;var $53=$c;var $54=__ZNK6Clause4sizeEv($53);var $55=(($52)|(0))<(($54)|(0));if($55){label=8;break;}else{label=18;break;}
case 8:var $57=$c;var $58=$j;var $59=__ZN6ClauseixEi($57,$58);var $60=$q;var $61=$59;assert(4%1===0);HEAP32[(($60)>>2)]=HEAP32[(($61)>>2)];var $62=(($28+404)|0);var $63=$6;var $64=$q;assert(4%1===0);HEAP32[(($63)>>2)]=HEAP32[(($64)>>2)];var $65=__Z3var3Lit($6);var $66=__ZN3vecIcEixEi($62,$65);var $67=HEAP8[($66)];var $68=(($67<<24)>>24)!=0;if($68){label=16;break;}else{label=9;break;}
case 9:var $70=(($28+316)|0);var $71=$7;var $72=$q;assert(4%1===0);HEAP32[(($71)>>2)]=HEAP32[(($72)>>2)];var $73=__Z3var3Lit($7);var $74=__ZN3vecIiEixEi($70,$73);var $75=HEAP32[(($74)>>2)];var $76=(($75)|(0))>0;if($76){label=10;break;}else{label=16;break;}
case 10:var $78=$8;var $79=$q;assert(4%1===0);HEAP32[(($78)>>2)]=HEAP32[(($79)>>2)];var $80=__Z3var3Lit($8);__ZN6Solver15varBumpActivityEi($28,$80);var $81=(($28+404)|0);var $82=$9;var $83=$q;assert(4%1===0);HEAP32[(($82)>>2)]=HEAP32[(($83)>>2)];var $84=__Z3var3Lit($9);var $85=__ZN3vecIcEixEi($81,$84);HEAP8[($85)]=1;var $86=(($28+316)|0);var $87=$10;var $88=$q;assert(4%1===0);HEAP32[(($87)>>2)]=HEAP32[(($88)>>2)];var $89=__Z3var3Lit($10);var $90=__ZN3vecIiEixEi($86,$89);var $91=HEAP32[(($90)>>2)];var $92=__ZNK6Solver13decisionLevelEv($28);var $93=(($91)|(0))>=(($92)|(0));if($93){label=11;break;}else{label=12;break;}
case 11:var $95=$pathC;var $96=((($95)+(1))|0);$pathC=$96;label=15;break;case 12:var $98=$3;__ZN3vecI3LitE4pushERKS0_($98,$q);var $99=(($28+316)|0);var $100=$11;var $101=$q;assert(4%1===0);HEAP32[(($100)>>2)]=HEAP32[(($101)>>2)];var $102=__Z3var3Lit($11);var $103=__ZN3vecIiEixEi($99,$102);var $104=HEAP32[(($103)>>2)];var $105=$4;var $106=HEAP32[(($105)>>2)];var $107=(($104)|(0))>(($106)|(0));if($107){label=13;break;}else{label=14;break;}
case 13:var $109=(($28+316)|0);var $110=$12;var $111=$q;assert(4%1===0);HEAP32[(($110)>>2)]=HEAP32[(($111)>>2)];var $112=__Z3var3Lit($12);var $113=__ZN3vecIiEixEi($109,$112);var $114=HEAP32[(($113)>>2)];var $115=$4;HEAP32[(($115)>>2)]=$114;label=14;break;case 14:label=15;break;case 15:label=16;break;case 16:label=17;break;case 17:var $120=$j;var $121=((($120)+(1))|0);$j=$121;label=7;break;case 18:label=19;break;case 19:var $124=(($28+404)|0);var $125=(($28+280)|0);var $126=$index;var $127=((($126)-(1))|0);$index=$127;var $128=__ZN3vecI3LitEixEi($125,$126);var $129=$13;var $130=$128;assert(4%1===0);HEAP32[(($129)>>2)]=HEAP32[(($130)>>2)];var $131=__Z3var3Lit($13);var $132=__ZN3vecIcEixEi($124,$131);var $133=HEAP8[($132)];var $134=(($133<<24)>>24)!=0;var $135=$134^1;if($135){label=20;break;}else{label=21;break;}
case 20:label=19;break;case 21:var $138=(($28+280)|0);var $139=$index;var $140=((($139)+(1))|0);var $141=__ZN3vecI3LitEixEi($138,$140);var $142=$p;var $143=$141;assert(4%1===0);HEAP32[(($142)>>2)]=HEAP32[(($143)>>2)];var $144=(($28+304)|0);var $145=$14;var $146=$p;assert(4%1===0);HEAP32[(($145)>>2)]=HEAP32[(($146)>>2)];var $147=__Z3var3Lit($14);var $148=__ZN3vecIP6ClauseEixEi($144,$147);var $149=HEAP32[(($148)>>2)];$2=$149;var $150=(($28+404)|0);var $151=$15;var $152=$p;assert(4%1===0);HEAP32[(($151)>>2)]=HEAP32[(($152)>>2)];var $153=__Z3var3Lit($15);var $154=__ZN3vecIcEixEi($150,$153);HEAP8[($154)]=0;var $155=$pathC;var $156=((($155)-(1))|0);$pathC=$156;label=22;break;case 22:var $158=$pathC;var $159=(($158)|(0))>0;if($159){label=2;break;}else{label=23;break;}
case 23:var $161=$3;var $162=__ZN3vecI3LitEixEi($161,0);var $163=$17;var $164=$p;assert(4%1===0);HEAP32[(($163)>>2)]=HEAP32[(($164)>>2)];__Zco3Lit($16,$17);var $165=$162;var $166=$16;assert(4%1===0);HEAP32[(($165)>>2)]=HEAP32[(($166)>>2)];var $167=(($28+80)|0);var $168=HEAP8[($167)];var $169=(($168)&1);if($169){label=24;break;}else{label=36;break;}
case 24:$abstract_level=0;$i=1;label=25;break;case 25:var $172=$i;var $173=$3;var $174=__ZNK3vecI3LitE4sizeEv($173);var $175=(($172)|(0))<(($174)|(0));if($175){label=26;break;}else{label=28;break;}
case 26:var $177=$3;var $178=$i;var $179=__ZN3vecI3LitEixEi($177,$178);var $180=$18;var $181=$179;assert(4%1===0);HEAP32[(($180)>>2)]=HEAP32[(($181)>>2)];var $182=__Z3var3Lit($18);var $183=__ZNK6Solver13abstractLevelEi($28,$182);var $184=$abstract_level;var $185=$184|$183;$abstract_level=$185;label=27;break;case 27:var $187=$i;var $188=((($187)+(1))|0);$i=$188;label=25;break;case 28:var $190=$3;var $191=(($28+428)|0);__ZNK3vecI3LitE6copyToERS1_($190,$191);$j1=1;$i=1;label=29;break;case 29:var $193=$i;var $194=$3;var $195=__ZNK3vecI3LitE4sizeEv($194);var $196=(($193)|(0))<(($195)|(0));if($196){label=30;break;}else{label=35;break;}
case 30:var $198=(($28+304)|0);var $199=$3;var $200=$i;var $201=__ZN3vecI3LitEixEi($199,$200);var $202=$19;var $203=$201;assert(4%1===0);HEAP32[(($202)>>2)]=HEAP32[(($203)>>2)];var $204=__Z3var3Lit($19);var $205=__ZN3vecIP6ClauseEixEi($198,$204);var $206=HEAP32[(($205)>>2)];var $207=(($206)|(0))==0;if($207){label=32;break;}else{label=31;break;}
case 31:var $209=$3;var $210=$i;var $211=__ZN3vecI3LitEixEi($209,$210);var $212=$20;var $213=$211;assert(4%1===0);HEAP32[(($212)>>2)]=HEAP32[(($213)>>2)];var $214=$abstract_level;var $215=__ZN6Solver12litRedundantE3Litj($28,$20,$214);if($215){label=33;break;}else{label=32;break;}
case 32:var $217=$3;var $218=$j1;var $219=((($218)+(1))|0);$j1=$219;var $220=__ZN3vecI3LitEixEi($217,$218);var $221=$3;var $222=$i;var $223=__ZN3vecI3LitEixEi($221,$222);var $224=$220;var $225=$223;assert(4%1===0);HEAP32[(($224)>>2)]=HEAP32[(($225)>>2)];label=33;break;case 33:label=34;break;case 34:var $228=$i;var $229=((($228)+(1))|0);$i=$229;label=29;break;case 35:label=48;break;case 36:var $232=$3;var $233=(($28+428)|0);__ZNK3vecI3LitE6copyToERS1_($232,$233);$j1=1;$i=1;label=37;break;case 37:var $235=$i;var $236=$3;var $237=__ZNK3vecI3LitE4sizeEv($236);var $238=(($235)|(0))<(($237)|(0));if($238){label=38;break;}else{label=47;break;}
case 38:var $240=(($28+304)|0);var $241=$3;var $242=$i;var $243=__ZN3vecI3LitEixEi($241,$242);var $244=$21;var $245=$243;assert(4%1===0);HEAP32[(($244)>>2)]=HEAP32[(($245)>>2)];var $246=__Z3var3Lit($21);var $247=__ZN3vecIP6ClauseEixEi($240,$246);var $248=HEAP32[(($247)>>2)];$c2=$248;$k=1;label=39;break;case 39:var $250=$k;var $251=$c2;var $252=__ZNK6Clause4sizeEv($251);var $253=(($250)|(0))<(($252)|(0));if($253){label=40;break;}else{label=45;break;}
case 40:var $255=(($28+404)|0);var $256=$c2;var $257=$k;var $258=__ZN6ClauseixEi($256,$257);var $259=$22;var $260=$258;assert(4%1===0);HEAP32[(($259)>>2)]=HEAP32[(($260)>>2)];var $261=__Z3var3Lit($22);var $262=__ZN3vecIcEixEi($255,$261);var $263=HEAP8[($262)];var $264=(($263<<24)>>24)!=0;if($264){label=43;break;}else{label=41;break;}
case 41:var $266=(($28+316)|0);var $267=$c2;var $268=$k;var $269=__ZN6ClauseixEi($267,$268);var $270=$23;var $271=$269;assert(4%1===0);HEAP32[(($270)>>2)]=HEAP32[(($271)>>2)];var $272=__Z3var3Lit($23);var $273=__ZN3vecIiEixEi($266,$272);var $274=HEAP32[(($273)>>2)];var $275=(($274)|(0))>0;if($275){label=42;break;}else{label=43;break;}
case 42:var $277=$3;var $278=$j1;var $279=((($278)+(1))|0);$j1=$279;var $280=__ZN3vecI3LitEixEi($277,$278);var $281=$3;var $282=$i;var $283=__ZN3vecI3LitEixEi($281,$282);var $284=$280;var $285=$283;assert(4%1===0);HEAP32[(($284)>>2)]=HEAP32[(($285)>>2)];label=45;break;case 43:label=44;break;case 44:var $288=$k;var $289=((($288)+(1))|0);$k=$289;label=39;break;case 45:label=46;break;case 46:var $292=$i;var $293=((($292)+(1))|0);$i=$293;label=37;break;case 47:label=48;break;case 48:var $296=$3;var $297=__ZNK3vecI3LitE4sizeEv($296);var $298$0=$297;var $298$1=((($297)|(0))<0?-1:0);var $299=(($28+152)|0);var $ld$0$0=(($299)|0);var $300$0=HEAP32[(($ld$0$0)>>2)];var $ld$1$1=(($299+4)|0);var $300$1=HEAP32[(($ld$1$1)>>2)];var $301$0=_i64Add($300$0,$300$1,$298$0,$298$1);var $301$1=tempRet0;var $st$2$0=(($299)|0);HEAP32[(($st$2$0)>>2)]=$301$0;var $st$3$1=(($299+4)|0);HEAP32[(($st$3$1)>>2)]=$301$1;var $302=$3;var $303=$i;var $304=$j1;var $305=((($303)-($304))|0);__ZN3vecI3LitE6shrinkEi($302,$305);var $306=$3;var $307=__ZNK3vecI3LitE4sizeEv($306);var $308$0=$307;var $308$1=((($307)|(0))<0?-1:0);var $309=(($28+160)|0);var $ld$4$0=(($309)|0);var $310$0=HEAP32[(($ld$4$0)>>2)];var $ld$5$1=(($309+4)|0);var $310$1=HEAP32[(($ld$5$1)>>2)];var $311$0=_i64Add($310$0,$310$1,$308$0,$308$1);var $311$1=tempRet0;var $st$6$0=(($309)|0);HEAP32[(($st$6$0)>>2)]=$311$0;var $st$7$1=(($309+4)|0);HEAP32[(($st$7$1)>>2)]=$311$1;var $312=$3;var $313=__ZNK3vecI3LitE4sizeEv($312);var $314=(($313)|(0))==1;if($314){label=49;break;}else{label=50;break;}
case 49:var $316=$4;HEAP32[(($316)>>2)]=0;label=57;break;case 50:$max_i=1;$i3=2;label=51;break;case 51:var $319=$i3;var $320=$3;var $321=__ZNK3vecI3LitE4sizeEv($320);var $322=(($319)|(0))<(($321)|(0));if($322){label=52;break;}else{label=56;break;}
case 52:var $324=(($28+316)|0);var $325=$3;var $326=$i3;var $327=__ZN3vecI3LitEixEi($325,$326);var $328=$24;var $329=$327;assert(4%1===0);HEAP32[(($328)>>2)]=HEAP32[(($329)>>2)];var $330=__Z3var3Lit($24);var $331=__ZN3vecIiEixEi($324,$330);var $332=HEAP32[(($331)>>2)];var $333=(($28+316)|0);var $334=$3;var $335=$max_i;var $336=__ZN3vecI3LitEixEi($334,$335);var $337=$25;var $338=$336;assert(4%1===0);HEAP32[(($337)>>2)]=HEAP32[(($338)>>2)];var $339=__Z3var3Lit($25);var $340=__ZN3vecIiEixEi($333,$339);var $341=HEAP32[(($340)>>2)];var $342=(($332)|(0))>(($341)|(0));if($342){label=53;break;}else{label=54;break;}
case 53:var $344=$i3;$max_i=$344;label=54;break;case 54:label=55;break;case 55:var $347=$i3;var $348=((($347)+(1))|0);$i3=$348;label=51;break;case 56:var $350=$3;var $351=$max_i;var $352=__ZN3vecI3LitEixEi($350,$351);var $353=$p4;var $354=$352;assert(4%1===0);HEAP32[(($353)>>2)]=HEAP32[(($354)>>2)];var $355=$3;var $356=$max_i;var $357=__ZN3vecI3LitEixEi($355,$356);var $358=$3;var $359=__ZN3vecI3LitEixEi($358,1);var $360=$357;var $361=$359;assert(4%1===0);HEAP32[(($360)>>2)]=HEAP32[(($361)>>2)];var $362=$3;var $363=__ZN3vecI3LitEixEi($362,1);var $364=$363;var $365=$p4;assert(4%1===0);HEAP32[(($364)>>2)]=HEAP32[(($365)>>2)];var $366=(($28+316)|0);var $367=$26;var $368=$p4;assert(4%1===0);HEAP32[(($367)>>2)]=HEAP32[(($368)>>2)];var $369=__Z3var3Lit($26);var $370=__ZN3vecIiEixEi($366,$369);var $371=HEAP32[(($370)>>2)];var $372=$4;HEAP32[(($372)>>2)]=$371;label=57;break;case 57:$j5=0;label=58;break;case 58:var $375=$j5;var $376=(($28+428)|0);var $377=__ZNK3vecI3LitE4sizeEv($376);var $378=(($375)|(0))<(($377)|(0));if($378){label=59;break;}else{label=61;break;}
case 59:var $380=(($28+404)|0);var $381=(($28+428)|0);var $382=$j5;var $383=__ZN3vecI3LitEixEi($381,$382);var $384=$27;var $385=$383;assert(4%1===0);HEAP32[(($384)>>2)]=HEAP32[(($385)>>2)];var $386=__Z3var3Lit($27);var $387=__ZN3vecIcEixEi($380,$386);HEAP8[($387)]=0;label=60;break;case 60:var $389=$j5;var $390=((($389)+(1))|0);$j5=$390;label=58;break;case 61:STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZN3vecI3LitE4pushEv($this){var label=0;label=1;while(1)switch(label){case 1:var $1;$1=$this;var $2=$1;var $3=(($2+4)|0);var $4=HEAP32[(($3)>>2)];var $5=(($2+8)|0);var $6=HEAP32[(($5)>>2)];var $7=(($4)|(0))==(($6)|(0));if($7){label=2;break;}else{label=3;break;}
case 2:var $9=(($2+8)|0);var $10=HEAP32[(($9)>>2)];var $11=((($10)*(3))&-1);var $12=((($11)+(1))|0);var $13=$12>>1;var $14=__ZN3vecI3LitE4imaxEii(2,$13);var $15=(($2+8)|0);HEAP32[(($15)>>2)]=$14;var $16=(($2)|0);var $17=HEAP32[(($16)>>2)];var $18=$17;var $19=(($2+8)|0);var $20=HEAP32[(($19)>>2)];var $21=($20<<2);var $22=_realloc($18,$21);var $23=$22;var $24=(($2)|0);HEAP32[(($24)>>2)]=$23;label=3;break;case 3:var $26=(($2+4)|0);var $27=HEAP32[(($26)>>2)];var $28=(($2)|0);var $29=HEAP32[(($28)>>2)];var $30=(($29+($27<<2))|0);var $31=$30;var $32=(($31)|(0))==0;if($32){var $36=0;label=5;break;}else{label=4;break;}
case 4:var $34=$31;__ZN3LitC1Ev($34);var $36=$34;label=5;break;case 5:var $36;var $37=(($2+4)|0);var $38=HEAP32[(($37)>>2)];var $39=((($38)+(1))|0);HEAP32[(($37)>>2)]=$39;return;default:assert(0,"bad label: "+label);}}
function __ZN6Solver15claBumpActivityER6Clause($this,$c){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;$1=$this;$2=$c;var $3=$1;var $4=(($3+200)|0);var $5=HEAPF64[(($4)>>3)];var $6=$2;var $7=__ZN6Clause8activityEv($6);var $8=HEAPF32[(($7)>>2)];var $9=$8;var $10=($9)+($5);var $11=$10;HEAPF32[(($7)>>2)]=$11;var $12=$11;var $13=$12>100000000000000000000;if($13){label=2;break;}else{label=7;break;}
case 2:$i=0;label=3;break;case 3:var $16=$i;var $17=(($3+184)|0);var $18=__ZNK3vecIP6ClauseE4sizeEv($17);var $19=(($16)|(0))<(($18)|(0));if($19){label=4;break;}else{label=6;break;}
case 4:var $21=(($3+184)|0);var $22=$i;var $23=__ZN3vecIP6ClauseEixEi($21,$22);var $24=HEAP32[(($23)>>2)];var $25=__ZN6Clause8activityEv($24);var $26=HEAPF32[(($25)>>2)];var $27=$26;var $28=($27)*(1e-20);var $29=$28;HEAPF32[(($25)>>2)]=$29;label=5;break;case 5:var $31=$i;var $32=((($31)+(1))|0);$i=$32;label=3;break;case 6:var $34=(($3+200)|0);var $35=HEAPF64[(($34)>>3)];var $36=($35)*(1e-20);HEAPF64[(($34)>>3)]=$36;label=7;break;case 7:return;default:assert(0,"bad label: "+label);}}
function __ZN6Solver15varBumpActivityEi($this,$v){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;$1=$this;$2=$v;var $3=$1;var $4=(($3+224)|0);var $5=HEAPF64[(($4)>>3)];var $6=(($3+208)|0);var $7=$2;var $8=__ZN3vecIdEixEi($6,$7);var $9=(HEAP32[((tempDoublePtr)>>2)]=HEAP32[(($8)>>2)],HEAP32[(((tempDoublePtr)+(4))>>2)]=HEAP32[((($8)+(4))>>2)],HEAPF64[(tempDoublePtr)>>3]);var $10=($9)+($5);(HEAPF64[(tempDoublePtr)>>3]=$10,HEAP32[(($8)>>2)]=HEAP32[((tempDoublePtr)>>2)],HEAP32[((($8)+(4))>>2)]=HEAP32[(((tempDoublePtr)+(4))>>2)]);var $11=$10>1e+100;if($11){label=2;break;}else{label=7;break;}
case 2:$i=0;label=3;break;case 3:var $14=$i;var $15=__ZNK6Solver5nVarsEv($3);var $16=(($14)|(0))<(($15)|(0));if($16){label=4;break;}else{label=6;break;}
case 4:var $18=(($3+208)|0);var $19=$i;var $20=__ZN3vecIdEixEi($18,$19);var $21=(HEAP32[((tempDoublePtr)>>2)]=HEAP32[(($20)>>2)],HEAP32[(((tempDoublePtr)+(4))>>2)]=HEAP32[((($20)+(4))>>2)],HEAPF64[(tempDoublePtr)>>3]);var $22=($21)*(1e-100);(HEAPF64[(tempDoublePtr)>>3]=$22,HEAP32[(($20)>>2)]=HEAP32[((tempDoublePtr)>>2)],HEAP32[((($20)+(4))>>2)]=HEAP32[(((tempDoublePtr)+(4))>>2)]);label=5;break;case 5:var $24=$i;var $25=((($24)+(1))|0);$i=$25;label=3;break;case 6:var $27=(($3+224)|0);var $28=HEAPF64[(($27)>>3)];var $29=($28)*(1e-100);HEAPF64[(($27)>>3)]=$29;label=7;break;case 7:var $31=(($3+356)|0);var $32=$2;var $33=__ZNK4HeapIN6Solver10VarOrderLtEE6inHeapEi($31,$32);if($33){label=8;break;}else{label=9;break;}
case 8:var $35=(($3+356)|0);var $36=$2;__ZN4HeapIN6Solver10VarOrderLtEE8decreaseEi($35,$36);label=9;break;case 9:return;default:assert(0,"bad label: "+label);}}
function __ZNK6Solver13abstractLevelEi($this,$x){var label=0;var $1;var $2;$1=$this;$2=$x;var $3=$1;var $4=(($3+316)|0);var $5=$2;var $6=__ZNK3vecIiEixEi($4,$5);var $7=HEAP32[(($6)>>2)];var $8=$7&31;var $9=1<<$8;return $9;}
function __ZNK3vecI3LitE6copyToERS1_($this,$copy){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;$1=$this;$2=$copy;var $3=$1;var $4=$2;__ZN3vecI3LitE5clearEb($4,0);var $5=$2;var $6=(($3+4)|0);var $7=HEAP32[(($6)>>2)];__ZN3vecI3LitE6growToEi($5,$7);$i=0;label=2;break;case 2:var $9=$i;var $10=(($3+4)|0);var $11=HEAP32[(($10)>>2)];var $12=(($9)|(0))<(($11)|(0));if($12){label=3;break;}else{label=7;break;}
case 3:var $14=$2;var $15=$i;var $16=__ZN3vecI3LitEixEi($14,$15);var $17=$16;var $18=(($17)|(0))==0;if($18){var $28=0;label=5;break;}else{label=4;break;}
case 4:var $20=$17;var $21=$i;var $22=(($3)|0);var $23=HEAP32[(($22)>>2)];var $24=(($23+($21<<2))|0);var $25=$20;var $26=$24;assert(4%1===0);HEAP32[(($25)>>2)]=HEAP32[(($26)>>2)];var $28=$20;label=5;break;case 5:var $28;label=6;break;case 6:var $30=$i;var $31=((($30)+(1))|0);$i=$31;label=2;break;case 7:return;default:assert(0,"bad label: "+label);}}
function __ZN6Solver12litRedundantE3Litj($this,$p,$abstract_levels){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+72)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$p;$p=STACKTOP;STACKTOP=(STACKTOP+4)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);HEAP32[(($p)>>2)]=HEAP32[((tempParam)>>2)];label=1;while(1)switch(label){case 1:var $1;var $2;var $3;var $top;var $4=sp;var $c;var $5=(sp)+(8);var $i;var $p1=(sp)+(16);var $6=(sp)+(24);var $7=(sp)+(32);var $8=(sp)+(40);var $9=(sp)+(48);var $10=(sp)+(56);var $j;var $11=(sp)+(64);$2=$this;$3=$abstract_levels;var $12=$2;var $13=(($12+416)|0);__ZN3vecI3LitE5clearEb($13,0);var $14=(($12+416)|0);__ZN3vecI3LitE4pushERKS0_($14,$p);var $15=(($12+428)|0);var $16=__ZNK3vecI3LitE4sizeEv($15);$top=$16;label=2;break;case 2:var $18=(($12+416)|0);var $19=__ZNK3vecI3LitE4sizeEv($18);var $20=(($19)|(0))>0;if($20){label=3;break;}else{label=21;break;}
case 3:var $22=(($12+304)|0);var $23=(($12+416)|0);var $24=__ZN3vecI3LitE4lastEv($23);var $25=$4;var $26=$24;assert(4%1===0);HEAP32[(($25)>>2)]=HEAP32[(($26)>>2)];var $27=__Z3var3Lit($4);var $28=__ZN3vecIP6ClauseEixEi($22,$27);var $29=HEAP32[(($28)>>2)];var $30=(($29)|(0))!=0;if($30){var $34=1;label=5;break;}else{label=4;break;}
case 4:___assert_fail(((1856)|0),((328)|0),317,((2120)|0));throw"Reached an unreachable!";label=5;break;case 5:var $34;var $35=(($12+304)|0);var $36=(($12+416)|0);var $37=__ZN3vecI3LitE4lastEv($36);var $38=$5;var $39=$37;assert(4%1===0);HEAP32[(($38)>>2)]=HEAP32[(($39)>>2)];var $40=__Z3var3Lit($5);var $41=__ZN3vecIP6ClauseEixEi($35,$40);var $42=HEAP32[(($41)>>2)];$c=$42;var $43=(($12+416)|0);__ZN3vecI3LitE3popEv($43);$i=1;label=6;break;case 6:var $45=$i;var $46=$c;var $47=__ZNK6Clause4sizeEv($46);var $48=(($45)|(0))<(($47)|(0));if($48){label=7;break;}else{label=20;break;}
case 7:var $50=$c;var $51=$i;var $52=__ZN6ClauseixEi($50,$51);var $53=$p1;var $54=$52;assert(4%1===0);HEAP32[(($53)>>2)]=HEAP32[(($54)>>2)];var $55=(($12+404)|0);var $56=$6;var $57=$p1;assert(4%1===0);HEAP32[(($56)>>2)]=HEAP32[(($57)>>2)];var $58=__Z3var3Lit($6);var $59=__ZN3vecIcEixEi($55,$58);var $60=HEAP8[($59)];var $61=(($60<<24)>>24)!=0;if($61){label=18;break;}else{label=8;break;}
case 8:var $63=(($12+316)|0);var $64=$7;var $65=$p1;assert(4%1===0);HEAP32[(($64)>>2)]=HEAP32[(($65)>>2)];var $66=__Z3var3Lit($7);var $67=__ZN3vecIiEixEi($63,$66);var $68=HEAP32[(($67)>>2)];var $69=(($68)|(0))>0;if($69){label=9;break;}else{label=18;break;}
case 9:var $71=(($12+304)|0);var $72=$8;var $73=$p1;assert(4%1===0);HEAP32[(($72)>>2)]=HEAP32[(($73)>>2)];var $74=__Z3var3Lit($8);var $75=__ZN3vecIP6ClauseEixEi($71,$74);var $76=HEAP32[(($75)>>2)];var $77=(($76)|(0))!=0;if($77){label=10;break;}else{label=12;break;}
case 10:var $79=$9;var $80=$p1;assert(4%1===0);HEAP32[(($79)>>2)]=HEAP32[(($80)>>2)];var $81=__Z3var3Lit($9);var $82=__ZNK6Solver13abstractLevelEi($12,$81);var $83=$3;var $84=$82&$83;var $85=(($84)|(0))!=0;if($85){label=11;break;}else{label=12;break;}
case 11:var $87=(($12+404)|0);var $88=$10;var $89=$p1;assert(4%1===0);HEAP32[(($88)>>2)]=HEAP32[(($89)>>2)];var $90=__Z3var3Lit($10);var $91=__ZN3vecIcEixEi($87,$90);HEAP8[($91)]=1;var $92=(($12+416)|0);__ZN3vecI3LitE4pushERKS0_($92,$p1);var $93=(($12+428)|0);__ZN3vecI3LitE4pushERKS0_($93,$p1);label=17;break;case 12:var $95=$top;$j=$95;label=13;break;case 13:var $97=$j;var $98=(($12+428)|0);var $99=__ZNK3vecI3LitE4sizeEv($98);var $100=(($97)|(0))<(($99)|(0));if($100){label=14;break;}else{label=16;break;}
case 14:var $102=(($12+404)|0);var $103=(($12+428)|0);var $104=$j;var $105=__ZN3vecI3LitEixEi($103,$104);var $106=$11;var $107=$105;assert(4%1===0);HEAP32[(($106)>>2)]=HEAP32[(($107)>>2)];var $108=__Z3var3Lit($11);var $109=__ZN3vecIcEixEi($102,$108);HEAP8[($109)]=0;label=15;break;case 15:var $111=$j;var $112=((($111)+(1))|0);$j=$112;label=13;break;case 16:var $114=(($12+428)|0);var $115=(($12+428)|0);var $116=__ZNK3vecI3LitE4sizeEv($115);var $117=$top;var $118=((($116)-($117))|0);__ZN3vecI3LitE6shrinkEi($114,$118);$1=0;label=22;break;case 17:label=18;break;case 18:label=19;break;case 19:var $122=$i;var $123=((($122)+(1))|0);$i=$123;label=6;break;case 20:label=2;break;case 21:$1=1;label=22;break;case 22:var $127=$1;STACKTOP=sp;return $127;default:assert(0,"bad label: "+label);}}
function __ZN3vecI3LitE4lastEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+4)|0);var $4=HEAP32[(($3)>>2)];var $5=((($4)-(1))|0);var $6=(($2)|0);var $7=HEAP32[(($6)>>2)];var $8=(($7+($5<<2))|0);return $8;}
function __ZN3vecI3LitE3popEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+4)|0);var $4=HEAP32[(($3)>>2)];var $5=((($4)-(1))|0);HEAP32[(($3)>>2)]=$5;var $6=(($2+4)|0);var $7=HEAP32[(($6)>>2)];var $8=(($2)|0);var $9=HEAP32[(($8)>>2)];var $10=(($9+($7<<2))|0);return;}
function __ZN6Solver12analyzeFinalE3LitR3vecIS0_E($this,$p,$out_conflict){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+56)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$p;$p=STACKTOP;STACKTOP=(STACKTOP+4)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);HEAP32[(($p)>>2)]=HEAP32[((tempParam)>>2)];label=1;while(1)switch(label){case 1:var $1;var $2;var $3=sp;var $i;var $x;var $4=(sp)+(8);var $5=(sp)+(16);var $6=(sp)+(24);var $c;var $j;var $7=(sp)+(32);var $8=(sp)+(40);var $9=(sp)+(48);$1=$this;$2=$out_conflict;var $10=$1;var $11=$2;__ZN3vecI3LitE5clearEb($11,0);var $12=$2;__ZN3vecI3LitE4pushERKS0_($12,$p);var $13=__ZNK6Solver13decisionLevelEv($10);var $14=(($13)|(0))==0;if($14){label=2;break;}else{label=3;break;}
case 2:label=21;break;case 3:var $17=(($10+404)|0);var $18=$3;var $19=$p;assert(4%1===0);HEAP32[(($18)>>2)]=HEAP32[(($19)>>2)];var $20=__Z3var3Lit($3);var $21=__ZN3vecIcEixEi($17,$20);HEAP8[($21)]=1;var $22=(($10+280)|0);var $23=__ZNK3vecI3LitE4sizeEv($22);var $24=((($23)-(1))|0);$i=$24;label=4;break;case 4:var $26=$i;var $27=(($10+292)|0);var $28=__ZN3vecIiEixEi($27,0);var $29=HEAP32[(($28)>>2)];var $30=(($26)|(0))>=(($29)|(0));if($30){label=5;break;}else{label=20;break;}
case 5:var $32=(($10+280)|0);var $33=$i;var $34=__ZN3vecI3LitEixEi($32,$33);var $35=$4;var $36=$34;assert(4%1===0);HEAP32[(($35)>>2)]=HEAP32[(($36)>>2)];var $37=__Z3var3Lit($4);$x=$37;var $38=(($10+404)|0);var $39=$x;var $40=__ZN3vecIcEixEi($38,$39);var $41=HEAP8[($40)];var $42=(($41<<24)>>24)!=0;if($42){label=6;break;}else{label=18;break;}
case 6:var $44=(($10+304)|0);var $45=$x;var $46=__ZN3vecIP6ClauseEixEi($44,$45);var $47=HEAP32[(($46)>>2)];var $48=(($47)|(0))==0;if($48){label=7;break;}else{label=10;break;}
case 7:var $50=(($10+316)|0);var $51=$x;var $52=__ZN3vecIiEixEi($50,$51);var $53=HEAP32[(($52)>>2)];var $54=(($53)|(0))>0;if($54){var $58=1;label=9;break;}else{label=8;break;}
case 8:___assert_fail(((1840)|0),((328)|0),364,((2168)|0));throw"Reached an unreachable!";label=9;break;case 9:var $58;var $59=$2;var $60=(($10+280)|0);var $61=$i;var $62=__ZN3vecI3LitEixEi($60,$61);var $63=$6;var $64=$62;assert(4%1===0);HEAP32[(($63)>>2)]=HEAP32[(($64)>>2)];__Zco3Lit($5,$6);__ZN3vecI3LitE4pushERKS0_($59,$5);label=17;break;case 10:var $66=(($10+304)|0);var $67=$x;var $68=__ZN3vecIP6ClauseEixEi($66,$67);var $69=HEAP32[(($68)>>2)];$c=$69;$j=1;label=11;break;case 11:var $71=$j;var $72=$c;var $73=__ZNK6Clause4sizeEv($72);var $74=(($71)|(0))<(($73)|(0));if($74){label=12;break;}else{label=16;break;}
case 12:var $76=(($10+316)|0);var $77=$c;var $78=$j;var $79=__ZN6ClauseixEi($77,$78);var $80=$7;var $81=$79;assert(4%1===0);HEAP32[(($80)>>2)]=HEAP32[(($81)>>2)];var $82=__Z3var3Lit($7);var $83=__ZN3vecIiEixEi($76,$82);var $84=HEAP32[(($83)>>2)];var $85=(($84)|(0))>0;if($85){label=13;break;}else{label=14;break;}
case 13:var $87=(($10+404)|0);var $88=$c;var $89=$j;var $90=__ZN6ClauseixEi($88,$89);var $91=$8;var $92=$90;assert(4%1===0);HEAP32[(($91)>>2)]=HEAP32[(($92)>>2)];var $93=__Z3var3Lit($8);var $94=__ZN3vecIcEixEi($87,$93);HEAP8[($94)]=1;label=14;break;case 14:label=15;break;case 15:var $97=$j;var $98=((($97)+(1))|0);$j=$98;label=11;break;case 16:label=17;break;case 17:var $101=(($10+404)|0);var $102=$x;var $103=__ZN3vecIcEixEi($101,$102);HEAP8[($103)]=0;label=18;break;case 18:label=19;break;case 19:var $106=$i;var $107=((($106)-(1))|0);$i=$107;label=4;break;case 20:var $109=(($10+404)|0);var $110=$9;var $111=$p;assert(4%1===0);HEAP32[(($110)>>2)]=HEAP32[(($111)>>2)];var $112=__Z3var3Lit($9);var $113=__ZN3vecIcEixEi($109,$112);HEAP8[($113)]=0;label=21;break;case 21:STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZN5lboolC1Eb($this,$x){var label=0;var $1;var $2;$1=$this;var $3=(($x)&(1));$2=$3;var $4=$1;var $5=$2;var $6=(($5)&1);__ZN5lboolC2Eb($4,$6);return;}
function __Z4sign3Lit($p){var label=0;var sp=STACKTOP;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$p;$p=STACKTOP;STACKTOP=(STACKTOP+4)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);HEAP32[(($p)>>2)]=HEAP32[((tempParam)>>2)];var $1=(($p)|0);var $2=HEAP32[(($1)>>2)];var $3=$2&1;var $4=(($3)|(0))!=0;STACKTOP=sp;return $4;}
function __ZN3vecIP6ClauseEcvPS1_Ev($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2)|0);var $4=HEAP32[(($3)>>2)];return $4;}
function __ZN3vecIP6ClauseE6shrinkEi($this,$nelems){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;$1=$this;$2=$nelems;var $3=$1;var $4=$2;var $5=(($3+4)|0);var $6=HEAP32[(($5)>>2)];var $7=(($4)|(0))<=(($6)|(0));if($7){var $11=0;label=3;break;}else{label=2;break;}
case 2:___assert_fail(((480)|0),((472)|0),72,((2232)|0));throw"Reached an unreachable!";label=3;break;case 3:var $11;$i=0;label=4;break;case 4:var $13=$i;var $14=$2;var $15=(($13)|(0))<(($14)|(0));if($15){label=5;break;}else{label=7;break;}
case 5:var $17=(($3+4)|0);var $18=HEAP32[(($17)>>2)];var $19=((($18)-(1))|0);HEAP32[(($17)>>2)]=$19;var $20=(($3+4)|0);var $21=HEAP32[(($20)>>2)];var $22=(($3)|0);var $23=HEAP32[(($22)>>2)];var $24=(($23+($21<<2))|0);var $25=HEAP32[(($24)>>2)];label=6;break;case 6:var $27=$i;var $28=((($27)+(1))|0);$i=$28;label=4;break;case 7:return;default:assert(0,"bad label: "+label);}}
function __ZN6Solver8reduceDBEv($this){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+8)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $i;var $j;var $extra_lim;var $2=sp;$1=$this;var $3=$1;var $4=(($3+200)|0);var $5=HEAPF64[(($4)>>3)];var $6=(($3+184)|0);var $7=__ZNK3vecIP6ClauseE4sizeEv($6);var $8=(($7)|(0));var $9=($5)/($8);$extra_lim=$9;var $10=(($3+184)|0);__Z4sortIP6Clause11reduceDB_ltEvR3vecIT_ET0_($10,$2);$j=0;$i=0;label=2;break;case 2:var $12=$i;var $13=(($3+184)|0);var $14=__ZNK3vecIP6ClauseE4sizeEv($13);var $15=((((($14)|(0)))/(2))&-1);var $16=(($12)|(0))<(($15)|(0));if($16){label=3;break;}else{label=9;break;}
case 3:var $18=(($3+184)|0);var $19=$i;var $20=__ZN3vecIP6ClauseEixEi($18,$19);var $21=HEAP32[(($20)>>2)];var $22=__ZNK6Clause4sizeEv($21);var $23=(($22)|(0))>2;if($23){label=4;break;}else{label=6;break;}
case 4:var $25=(($3+184)|0);var $26=$i;var $27=__ZN3vecIP6ClauseEixEi($25,$26);var $28=HEAP32[(($27)>>2)];var $29=__ZNK6Solver6lockedERK6Clause($3,$28);if($29){label=6;break;}else{label=5;break;}
case 5:var $31=(($3+184)|0);var $32=$i;var $33=__ZN3vecIP6ClauseEixEi($31,$32);var $34=HEAP32[(($33)>>2)];__ZN6Solver12removeClauseER6Clause($3,$34);label=7;break;case 6:var $36=(($3+184)|0);var $37=$i;var $38=__ZN3vecIP6ClauseEixEi($36,$37);var $39=HEAP32[(($38)>>2)];var $40=(($3+184)|0);var $41=$j;var $42=((($41)+(1))|0);$j=$42;var $43=__ZN3vecIP6ClauseEixEi($40,$41);HEAP32[(($43)>>2)]=$39;label=7;break;case 7:label=8;break;case 8:var $46=$i;var $47=((($46)+(1))|0);$i=$47;label=2;break;case 9:label=10;break;case 10:var $50=$i;var $51=(($3+184)|0);var $52=__ZNK3vecIP6ClauseE4sizeEv($51);var $53=(($50)|(0))<(($52)|(0));if($53){label=11;break;}else{label=18;break;}
case 11:var $55=(($3+184)|0);var $56=$i;var $57=__ZN3vecIP6ClauseEixEi($55,$56);var $58=HEAP32[(($57)>>2)];var $59=__ZNK6Clause4sizeEv($58);var $60=(($59)|(0))>2;if($60){label=12;break;}else{label=15;break;}
case 12:var $62=(($3+184)|0);var $63=$i;var $64=__ZN3vecIP6ClauseEixEi($62,$63);var $65=HEAP32[(($64)>>2)];var $66=__ZNK6Solver6lockedERK6Clause($3,$65);if($66){label=15;break;}else{label=13;break;}
case 13:var $68=(($3+184)|0);var $69=$i;var $70=__ZN3vecIP6ClauseEixEi($68,$69);var $71=HEAP32[(($70)>>2)];var $72=__ZN6Clause8activityEv($71);var $73=HEAPF32[(($72)>>2)];var $74=$73;var $75=$extra_lim;var $76=$74<$75;if($76){label=14;break;}else{label=15;break;}
case 14:var $78=(($3+184)|0);var $79=$i;var $80=__ZN3vecIP6ClauseEixEi($78,$79);var $81=HEAP32[(($80)>>2)];__ZN6Solver12removeClauseER6Clause($3,$81);label=16;break;case 15:var $83=(($3+184)|0);var $84=$i;var $85=__ZN3vecIP6ClauseEixEi($83,$84);var $86=HEAP32[(($85)>>2)];var $87=(($3+184)|0);var $88=$j;var $89=((($88)+(1))|0);$j=$89;var $90=__ZN3vecIP6ClauseEixEi($87,$88);HEAP32[(($90)>>2)]=$86;label=16;break;case 16:label=17;break;case 17:var $93=$i;var $94=((($93)+(1))|0);$i=$94;label=10;break;case 18:var $96=(($3+184)|0);var $97=$i;var $98=$j;var $99=((($97)-($98))|0);__ZN3vecIP6ClauseE6shrinkEi($96,$99);STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __Z4sortIP6Clause11reduceDB_ltEvR3vecIT_ET0_($v,$lt){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+8)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$lt;$lt=STACKTOP;STACKTOP=(STACKTOP+1)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);;;HEAP8[($lt)]=HEAP8[(tempParam)];var $1;var $2=sp;$1=$v;var $3=$1;var $4=__ZN3vecIP6ClauseEcvPS1_Ev($3);var $5=$1;var $6=__ZNK3vecIP6ClauseE4sizeEv($5);__Z4sortIP6Clause11reduceDB_ltEvPT_iT0_($4,$6,$2);STACKTOP=sp;return;}
function __ZNK6Solver6lockedERK6Clause($this,$c){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+32)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $3=sp;var $4=(sp)+(8);var $5=(sp)+(16);var $6=(sp)+(24);$1=$this;$2=$c;var $7=$1;var $8=(($7+304)|0);var $9=$2;__ZNK6ClauseixEi($3,$9,0);var $10=__Z3var3Lit($3);var $11=__ZNK3vecIP6ClauseEixEi($8,$10);var $12=HEAP32[(($11)>>2)];var $13=$2;var $14=(($12)|(0))==(($13)|(0));if($14){label=2;break;}else{var $20=0;label=3;break;}
case 2:var $16=$2;__ZNK6ClauseixEi($4,$16,0);__ZNK6Solver5valueE3Lit($5,$7,$4);var $17=$6;assert(1%1===0);HEAP8[($17)]=HEAP8[((((2832)|0))|0)];var $18=__ZNK5lbooleqES_($5,$6);var $20=$18;label=3;break;case 3:var $20;STACKTOP=sp;return $20;default:assert(0,"bad label: "+label);}}
function __ZN6Clause8activityEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+4)|0);var $4=$3;return $4;}
function __ZN6Solver15removeSatisfiedER3vecIP6ClauseE($this,$cs){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;var $j;$1=$this;$2=$cs;var $3=$1;$j=0;$i=0;label=2;break;case 2:var $5=$i;var $6=$2;var $7=__ZNK3vecIP6ClauseE4sizeEv($6);var $8=(($5)|(0))<(($7)|(0));if($8){label=3;break;}else{label=8;break;}
case 3:var $10=$2;var $11=$i;var $12=__ZN3vecIP6ClauseEixEi($10,$11);var $13=HEAP32[(($12)>>2)];var $14=__ZNK6Solver9satisfiedERK6Clause($3,$13);if($14){label=4;break;}else{label=5;break;}
case 4:var $16=$2;var $17=$i;var $18=__ZN3vecIP6ClauseEixEi($16,$17);var $19=HEAP32[(($18)>>2)];__ZN6Solver12removeClauseER6Clause($3,$19);label=6;break;case 5:var $21=$2;var $22=$i;var $23=__ZN3vecIP6ClauseEixEi($21,$22);var $24=HEAP32[(($23)>>2)];var $25=$2;var $26=$j;var $27=((($26)+(1))|0);$j=$27;var $28=__ZN3vecIP6ClauseEixEi($25,$26);HEAP32[(($28)>>2)]=$24;label=6;break;case 6:label=7;break;case 7:var $31=$i;var $32=((($31)+(1))|0);$i=$32;label=2;break;case 8:var $34=$2;var $35=$i;var $36=$j;var $37=((($35)-($36))|0);__ZN3vecIP6ClauseE6shrinkEi($34,$37);return;default:assert(0,"bad label: "+label);}}
function __ZN6Solver8simplifyEv($this){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+8)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $3=sp;$2=$this;var $4=$2;var $5=__ZNK6Solver13decisionLevelEv($4);var $6=(($5)|(0))==0;if($6){var $10=0;label=3;break;}else{label=2;break;}
case 2:___assert_fail(((512)|0),((328)|0),509,((2040)|0));throw"Reached an unreachable!";label=3;break;case 3:var $10;var $11=(($4+168)|0);var $12=HEAP8[($11)];var $13=(($12)&1);if($13){label=4;break;}else{label=5;break;}
case 4:var $15=__ZN6Solver9propagateEv($4);var $16=(($15)|(0))!=0;if($16){label=5;break;}else{label=6;break;}
case 5:var $18=(($4+168)|0);HEAP8[($18)]=0;$1=0;label=12;break;case 6:var $20=__ZNK6Solver8nAssignsEv($4);var $21=(($4+332)|0);var $22=HEAP32[(($21)>>2)];var $23=(($20)|(0))==(($22)|(0));if($23){label=8;break;}else{label=7;break;}
case 7:var $25=(($4+336)|0);var $ld$0$0=(($25)|0);var $26$0=HEAP32[(($ld$0$0)>>2)];var $ld$1$1=(($25+4)|0);var $26$1=HEAP32[(($ld$1$1)>>2)];var $$etemp$2$0=0;var $$etemp$2$1=0;var $27=(($26$1|0)>($$etemp$2$1|0))|(((($26$1|0)==($$etemp$2$1|0)&($26$0>>>0)>($$etemp$2$0>>>0))));if($27){label=8;break;}else{label=9;break;}
case 8:$1=1;label=12;break;case 9:var $30=(($4+184)|0);__ZN6Solver15removeSatisfiedER3vecIP6ClauseE($4,$30);var $31=(($4+400)|0);var $32=HEAP8[($31)];var $33=(($32)&1);if($33){label=10;break;}else{label=11;break;}
case 10:var $35=(($4+172)|0);__ZN6Solver15removeSatisfiedER3vecIP6ClauseE($4,$35);label=11;break;case 11:var $37=(($4+356)|0);__ZN6Solver9VarFilterC1ERKS_($3,$4);__ZN4HeapIN6Solver10VarOrderLtEE6filterINS0_9VarFilterEEEvRKT_($37,$3);var $38=__ZNK6Solver8nAssignsEv($4);var $39=(($4+332)|0);HEAP32[(($39)>>2)]=$38;var $40=(($4+136)|0);var $ld$3$0=(($40)|0);var $41$0=HEAP32[(($ld$3$0)>>2)];var $ld$4$1=(($40+4)|0);var $41$1=HEAP32[(($ld$4$1)>>2)];var $42=(($4+144)|0);var $ld$5$0=(($42)|0);var $43$0=HEAP32[(($ld$5$0)>>2)];var $ld$6$1=(($42+4)|0);var $43$1=HEAP32[(($ld$6$1)>>2)];var $44$0=_i64Add($41$0,$41$1,$43$0,$43$1);var $44$1=tempRet0;var $45=(($4+336)|0);var $st$7$0=(($45)|0);HEAP32[(($st$7$0)>>2)]=$44$0;var $st$8$1=(($45+4)|0);HEAP32[(($st$8$1)>>2)]=$44$1;$1=1;label=12;break;case 12:var $47=$1;STACKTOP=sp;return $47;default:assert(0,"bad label: "+label);}}
function __ZNK6Solver8nAssignsEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+280)|0);var $4=__ZNK3vecI3LitE4sizeEv($3);return $4;}
function __ZN4HeapIN6Solver10VarOrderLtEE6filterINS0_9VarFilterEEEvRKT_($this,$filt){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;var $j;var $i1;$1=$this;$2=$filt;var $3=$1;$j=0;$i=0;label=2;break;case 2:var $5=$i;var $6=(($3+4)|0);var $7=__ZNK3vecIiE4sizeEv($6);var $8=(($5)|(0))<(($7)|(0));if($8){label=3;break;}else{label=8;break;}
case 3:var $10=$2;var $11=(($3+4)|0);var $12=$i;var $13=__ZN3vecIiEixEi($11,$12);var $14=HEAP32[(($13)>>2)];var $15=__ZNK6Solver9VarFilterclEi($10,$14);if($15){label=4;break;}else{label=5;break;}
case 4:var $17=(($3+4)|0);var $18=$i;var $19=__ZN3vecIiEixEi($17,$18);var $20=HEAP32[(($19)>>2)];var $21=(($3+4)|0);var $22=$j;var $23=__ZN3vecIiEixEi($21,$22);HEAP32[(($23)>>2)]=$20;var $24=$j;var $25=((($24)+(1))|0);$j=$25;var $26=(($3+16)|0);var $27=(($3+4)|0);var $28=$i;var $29=__ZN3vecIiEixEi($27,$28);var $30=HEAP32[(($29)>>2)];var $31=__ZN3vecIiEixEi($26,$30);HEAP32[(($31)>>2)]=$24;label=6;break;case 5:var $33=(($3+16)|0);var $34=(($3+4)|0);var $35=$i;var $36=__ZN3vecIiEixEi($34,$35);var $37=HEAP32[(($36)>>2)];var $38=__ZN3vecIiEixEi($33,$37);HEAP32[(($38)>>2)]=-1;label=6;break;case 6:label=7;break;case 7:var $41=$i;var $42=((($41)+(1))|0);$i=$42;label=2;break;case 8:var $44=(($3+4)|0);var $45=$i;var $46=$j;var $47=((($45)-($46))|0);__ZN3vecIiE6shrinkEi($44,$47);var $48=(($3+4)|0);var $49=__ZNK3vecIiE4sizeEv($48);var $50=((((($49)|(0)))/(2))&-1);var $51=((($50)-(1))|0);$i1=$51;label=9;break;case 9:var $53=$i1;var $54=(($53)|(0))>=0;if($54){label=10;break;}else{label=12;break;}
case 10:var $56=$i1;__ZN4HeapIN6Solver10VarOrderLtEE13percolateDownEi($3,$56);label=11;break;case 11:var $58=$i1;var $59=((($58)-(1))|0);$i1=$59;label=9;break;case 12:var $61=__ZNK4HeapIN6Solver10VarOrderLtEE12heapPropertyEv($3);if($61){var $65=1;label=14;break;}else{label=13;break;}
case 13:___assert_fail(((536)|0),((496)|0),151,((2224)|0));throw"Reached an unreachable!";label=14;break;case 14:var $65;return;default:assert(0,"bad label: "+label);}}
function __ZN6Solver9VarFilterC1ERKS_($this,$_s){var label=0;var $1;var $2;$1=$this;$2=$_s;var $3=$1;var $4=$2;__ZN6Solver9VarFilterC2ERKS_($3,$4);return;}
function __ZN6Solver6searchEii($agg_result,$this,$nof_conflicts,$nof_learnts){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+208)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $3;var $backtrack_level=sp;var $conflictC;var $learnt_clause=(sp)+(8);var $first;var $confl;var $4;var $5;var $6;var $7=(sp)+(24);var $8=(sp)+(32);var $9=(sp)+(40);var $10=(sp)+(48);var $c=(sp)+(56);var $11=(sp)+(64);var $next=(sp)+(72);var $p=(sp)+(80);var $12=(sp)+(88);var $13=(sp)+(96);var $14=(sp)+(104);var $15=(sp)+(112);var $16=(sp)+(120);var $17=(sp)+(128);var $18=(sp)+(136);var $19=(sp)+(144);var $20=(sp)+(152);var $21=(sp)+(160);var $22=(sp)+(168);var $23=(sp)+(176);var $24=(sp)+(184);var $25=(sp)+(192);var $26=(sp)+(200);$1=$this;$2=$nof_conflicts;$3=$nof_learnts;var $27=$1;var $28=(($27+168)|0);var $29=HEAP8[($28)];var $30=(($29)&1);if($30){var $34=0;label=3;break;}else{label=2;break;}
case 2:___assert_fail(((1784)|0),((328)|0),548,((2064)|0));throw"Reached an unreachable!";label=3;break;case 3:var $34;$conflictC=0;__ZN3vecI3LitEC1Ev($learnt_clause);var $35=(($27+96)|0);var $ld$0$0=(($35)|0);var $36$0=HEAP32[(($ld$0$0)>>2)];var $ld$1$1=(($35+4)|0);var $36$1=HEAP32[(($ld$1$1)>>2)];var $$etemp$2$0=1;var $$etemp$2$1=0;var $37$0=_i64Add($36$0,$36$1,$$etemp$2$0,$$etemp$2$1);var $37$1=tempRet0;var $st$3$0=(($35)|0);HEAP32[(($st$3$0)>>2)]=$37$0;var $st$4$1=(($35+4)|0);HEAP32[(($st$4$1)>>2)]=$37$1;$first=1;label=4;break;case 4:var $39=(function(){try{__THREW__=0;return __ZN6Solver9propagateEv($27)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=5;break;}else{label=9;break;}
case 5:$confl=$39;var $41=$confl;var $42=(($41)|(0))!=0;if($42){label=6;break;}else{label=34;break;}
case 6:var $44=(($27+128)|0);var $ld$5$0=(($44)|0);var $45$0=HEAP32[(($ld$5$0)>>2)];var $ld$6$1=(($44+4)|0);var $45$1=HEAP32[(($ld$6$1)>>2)];var $$etemp$7$0=1;var $$etemp$7$1=0;var $46$0=_i64Add($45$0,$45$1,$$etemp$7$0,$$etemp$7$1);var $46$1=tempRet0;var $st$8$0=(($44)|0);HEAP32[(($st$8$0)>>2)]=$46$0;var $st$9$1=(($44+4)|0);HEAP32[(($st$9$1)>>2)]=$46$1;var $47=$conflictC;var $48=((($47)+(1))|0);$conflictC=$48;var $49=(function(){try{__THREW__=0;return __ZNK6Solver13decisionLevelEv($27)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=7;break;}else{label=9;break;}
case 7:var $51=(($49)|(0))==0;if($51){label=8;break;}else{label=10;break;}
case 8:var $53=$agg_result;assert(1%1===0);HEAP8[($53)]=HEAP8[((((2816)|0))|0)];$6=1;label=85;break;case 9:var $55$0=___cxa_find_matching_catch(-1,-1);$55$1=tempRet0;var $56=$55$0;$4=$56;var $57=$55$1;$5=$57;(function(){try{__THREW__=0;return __ZN3vecI3LitED1Ev($learnt_clause)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=86;break;}else{label=88;break;}
case 10:$first=0;(function(){try{__THREW__=0;return __ZN3vecI3LitE5clearEb($learnt_clause,0)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=11;break;}else{label=9;break;}
case 11:var $60=$confl;(function(){try{__THREW__=0;return __ZN6Solver7analyzeEP6ClauseR3vecI3LitERi($27,$60,$learnt_clause,$backtrack_level)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=12;break;}else{label=9;break;}
case 12:var $62=HEAP32[(($backtrack_level)>>2)];(function(){try{__THREW__=0;return __ZN6Solver11cancelUntilEi($27,$62)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=13;break;}else{label=9;break;}
case 13:var $64=(function(){try{__THREW__=0;return __ZN3vecI3LitEixEi($learnt_clause,0)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=14;break;}else{label=9;break;}
case 14:var $66=$7;var $67=$64;assert(4%1===0);HEAP32[(($66)>>2)]=HEAP32[(($67)>>2)];(function(){try{__THREW__=0;return __ZNK6Solver5valueE3Lit($8,$27,$7)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=15;break;}else{label=9;break;}
case 15:var $69=$9;assert(1%1===0);HEAP8[($69)]=HEAP8[((((2800)|0))|0)];var $70=(function(){try{__THREW__=0;return __ZNK5lbooleqES_($8,$9)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=16;break;}else{label=9;break;}
case 16:if($70){var $76=1;label=19;break;}else{label=17;break;}
case 17:(function(){try{__THREW__=0;return ___assert_fail(((1736)|0),((328)|0),569,((2064)|0))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=18;break;}else{label=9;break;}
case 18:throw"Reached an unreachable!";label=19;break;case 19:var $76;var $77=(function(){try{__THREW__=0;return __ZNK3vecI3LitE4sizeEv($learnt_clause)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=20;break;}else{label=9;break;}
case 20:var $79=(($77)|(0))==1;if($79){label=21;break;}else{label=24;break;}
case 21:var $81=(function(){try{__THREW__=0;return __ZN3vecI3LitEixEi($learnt_clause,0)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=22;break;}else{label=9;break;}
case 22:var $83=$10;var $84=$81;assert(4%1===0);HEAP32[(($83)>>2)]=HEAP32[(($84)>>2)];(function(){try{__THREW__=0;return __ZN6Solver16uncheckedEnqueueE3LitP6Clause($27,$10,0)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=23;break;}else{label=9;break;}
case 23:label=31;break;case 24:var $87=(function(){try{__THREW__=0;return __Z10Clause_newI3vecI3LitEEP6ClauseRKT_b($learnt_clause,1)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=25;break;}else{label=9;break;}
case 25:HEAP32[(($c)>>2)]=$87;var $89=(($27+184)|0);(function(){try{__THREW__=0;return __ZN3vecIP6ClauseE4pushERKS1_($89,$c)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=26;break;}else{label=9;break;}
case 26:var $91=HEAP32[(($c)>>2)];(function(){try{__THREW__=0;return __ZN6Solver12attachClauseER6Clause($27,$91)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=27;break;}else{label=9;break;}
case 27:var $93=HEAP32[(($c)>>2)];(function(){try{__THREW__=0;return __ZN6Solver15claBumpActivityER6Clause($27,$93)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=28;break;}else{label=9;break;}
case 28:var $95=(function(){try{__THREW__=0;return __ZN3vecI3LitEixEi($learnt_clause,0)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=29;break;}else{label=9;break;}
case 29:var $97=$11;var $98=$95;assert(4%1===0);HEAP32[(($97)>>2)]=HEAP32[(($98)>>2)];var $99=HEAP32[(($c)>>2)];(function(){try{__THREW__=0;return __ZN6Solver16uncheckedEnqueueE3LitP6Clause($27,$11,$99)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=30;break;}else{label=9;break;}
case 30:label=31;break;case 31:(function(){try{__THREW__=0;return __ZN6Solver16varDecayActivityEv($27)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=32;break;}else{label=9;break;}
case 32:(function(){try{__THREW__=0;return __ZN6Solver16claDecayActivityEv($27)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=33;break;}else{label=9;break;}
case 33:label=84;break;case 34:var $105=$2;var $106=(($105)|(0))>=0;if($106){label=35;break;}else{label=39;break;}
case 35:var $108=$conflictC;var $109=$2;var $110=(($108)|(0))>=(($109)|(0));if($110){label=36;break;}else{label=39;break;}
case 36:var $112=(function(){try{__THREW__=0;return __ZNK6Solver16progressEstimateEv($27)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=37;break;}else{label=9;break;}
case 37:var $114=(($27+392)|0);HEAPF64[(($114)>>3)]=$112;(function(){try{__THREW__=0;return __ZN6Solver11cancelUntilEi($27,0)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=38;break;}else{label=9;break;}
case 38:var $116=$agg_result;assert(1%1===0);HEAP8[($116)]=HEAP8[((((2800)|0))|0)];$6=1;label=85;break;case 39:var $118=(function(){try{__THREW__=0;return __ZNK6Solver13decisionLevelEv($27)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=40;break;}else{label=9;break;}
case 40:var $120=(($118)|(0))==0;if($120){label=41;break;}else{label=44;break;}
case 41:var $122=(function(){try{__THREW__=0;return __ZN6Solver8simplifyEv($27)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=42;break;}else{label=9;break;}
case 42:if($122){label=44;break;}else{label=43;break;}
case 43:var $125=$agg_result;assert(1%1===0);HEAP8[($125)]=HEAP8[((((2816)|0))|0)];$6=1;label=85;break;case 44:var $127=$3;var $128=(($127)|(0))>=0;if($128){label=45;break;}else{label=50;break;}
case 45:var $130=(($27+184)|0);var $131=(function(){try{__THREW__=0;return __ZNK3vecIP6ClauseE4sizeEv($130)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=46;break;}else{label=9;break;}
case 46:var $133=(function(){try{__THREW__=0;return __ZNK6Solver8nAssignsEv($27)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=47;break;}else{label=9;break;}
case 47:var $135=((($131)-($133))|0);var $136=$3;var $137=(($135)|(0))>=(($136)|(0));if($137){label=48;break;}else{label=50;break;}
case 48:(function(){try{__THREW__=0;return __ZN6Solver8reduceDBEv($27)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=49;break;}else{label=9;break;}
case 49:label=50;break;case 50:var $141=$next;assert(4%1===0);HEAP32[(($141)>>2)]=HEAP32[((2768)>>2)];label=51;break;case 51:var $143=(function(){try{__THREW__=0;return __ZNK6Solver13decisionLevelEv($27)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=52;break;}else{label=9;break;}
case 52:var $145=(($27+344)|0);var $146=(function(){try{__THREW__=0;return __ZNK3vecI3LitE4sizeEv($145)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=53;break;}else{label=9;break;}
case 53:var $148=(($143)|(0))<(($146)|(0));if($148){label=54;break;}else{label=69;break;}
case 54:var $150=(($27+344)|0);var $151=(function(){try{__THREW__=0;return __ZNK6Solver13decisionLevelEv($27)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=55;break;}else{label=9;break;}
case 55:var $153=(function(){try{__THREW__=0;return __ZN3vecI3LitEixEi($150,$151)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=56;break;}else{label=9;break;}
case 56:var $155=$p;var $156=$153;assert(4%1===0);HEAP32[(($155)>>2)]=HEAP32[(($156)>>2)];var $157=$12;var $158=$p;assert(4%1===0);HEAP32[(($157)>>2)]=HEAP32[(($158)>>2)];(function(){try{__THREW__=0;return __ZNK6Solver5valueE3Lit($13,$27,$12)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=57;break;}else{label=9;break;}
case 57:var $160=$14;assert(1%1===0);HEAP8[($160)]=HEAP8[((((2832)|0))|0)];var $161=(function(){try{__THREW__=0;return __ZNK5lbooleqES_($13,$14)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=58;break;}else{label=9;break;}
case 58:if($161){label=59;break;}else{label=61;break;}
case 59:(function(){try{__THREW__=0;return __ZN6Solver16newDecisionLevelEv($27)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=60;break;}else{label=9;break;}
case 60:label=68;break;case 61:var $166=$15;var $167=$p;assert(4%1===0);HEAP32[(($166)>>2)]=HEAP32[(($167)>>2)];(function(){try{__THREW__=0;return __ZNK6Solver5valueE3Lit($16,$27,$15)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=62;break;}else{label=9;break;}
case 62:var $169=$17;assert(1%1===0);HEAP8[($169)]=HEAP8[((((2816)|0))|0)];var $170=(function(){try{__THREW__=0;return __ZNK5lbooleqES_($16,$17)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=63;break;}else{label=9;break;}
case 63:if($170){label=64;break;}else{label=67;break;}
case 64:var $173=$19;var $174=$p;assert(4%1===0);HEAP32[(($173)>>2)]=HEAP32[(($174)>>2)];(function(){try{__THREW__=0;return __Zco3Lit($18,$19)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=65;break;}else{label=9;break;}
case 65:var $176=(($27+12)|0);(function(){try{__THREW__=0;return __ZN6Solver12analyzeFinalE3LitR3vecIS0_E($27,$18,$176)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=66;break;}else{label=9;break;}
case 66:var $178=$agg_result;assert(1%1===0);HEAP8[($178)]=HEAP8[((((2816)|0))|0)];$6=1;label=85;break;case 67:var $180=$next;var $181=$p;assert(4%1===0);HEAP32[(($180)>>2)]=HEAP32[(($181)>>2)];label=69;break;case 68:label=51;break;case 69:var $184=$20;assert(4%1===0);HEAP32[(($184)>>2)]=HEAP32[((2768)>>2)];var $185=(function(){try{__THREW__=0;return __ZNK3LiteqES_($next,$20)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=70;break;}else{label=9;break;}
case 70:if($185){label=71;break;}else{label=76;break;}
case 71:var $188=(($27+104)|0);var $ld$10$0=(($188)|0);var $189$0=HEAP32[(($ld$10$0)>>2)];var $ld$11$1=(($188+4)|0);var $189$1=HEAP32[(($ld$11$1)>>2)];var $$etemp$12$0=1;var $$etemp$12$1=0;var $190$0=_i64Add($189$0,$189$1,$$etemp$12$0,$$etemp$12$1);var $190$1=tempRet0;var $st$13$0=(($188)|0);HEAP32[(($st$13$0)>>2)]=$190$0;var $st$14$1=(($188+4)|0);HEAP32[(($st$14$1)>>2)]=$190$1;var $191=(($27+84)|0);var $192=HEAP32[(($191)>>2)];var $193=(($27+40)|0);var $194=HEAPF64[(($193)>>3)];(function(){try{__THREW__=0;return __ZN6Solver13pickBranchLitEid($21,$27,$192,$194)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=72;break;}else{label=9;break;}
case 72:var $196=$next;var $197=$21;assert(4%1===0);HEAP32[(($196)>>2)]=HEAP32[(($197)>>2)];var $198=$22;assert(4%1===0);HEAP32[(($198)>>2)]=HEAP32[((2768)>>2)];var $199=(function(){try{__THREW__=0;return __ZNK3LiteqES_($next,$22)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=73;break;}else{label=9;break;}
case 73:if($199){label=74;break;}else{label=75;break;}
case 74:var $202=$agg_result;assert(1%1===0);HEAP8[($202)]=HEAP8[((((2832)|0))|0)];$6=1;label=85;break;case 75:label=76;break;case 76:var $205=$23;var $206=$next;assert(4%1===0);HEAP32[(($205)>>2)]=HEAP32[(($206)>>2)];(function(){try{__THREW__=0;return __ZNK6Solver5valueE3Lit($24,$27,$23)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=77;break;}else{label=9;break;}
case 77:var $208=$25;assert(1%1===0);HEAP8[($208)]=HEAP8[((((2800)|0))|0)];var $209=(function(){try{__THREW__=0;return __ZNK5lbooleqES_($24,$25)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=78;break;}else{label=9;break;}
case 78:if($209){var $215=1;label=81;break;}else{label=79;break;}
case 79:(function(){try{__THREW__=0;return ___assert_fail(((1680)|0),((328)|0),628,((2064)|0))}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=80;break;}else{label=9;break;}
case 80:throw"Reached an unreachable!";label=81;break;case 81:var $215;(function(){try{__THREW__=0;return __ZN6Solver16newDecisionLevelEv($27)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=82;break;}else{label=9;break;}
case 82:var $217=$26;var $218=$next;assert(4%1===0);HEAP32[(($217)>>2)]=HEAP32[(($218)>>2)];(function(){try{__THREW__=0;return __ZN6Solver16uncheckedEnqueueE3LitP6Clause($27,$26,0)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=83;break;}else{label=9;break;}
case 83:label=84;break;case 84:label=4;break;case 85:__ZN3vecI3LitED1Ev($learnt_clause);STACKTOP=sp;return;case 86:label=87;break;case 87:var $224=$4;var $225=$5;var $226$0=$224;var $226$1=0;var $227$0=$226$0;var $227$1=$225;___resumeException($227$0)
case 88:var $229$0=___cxa_find_matching_catch(-1,-1,0);$229$1=tempRet0;__ZSt9terminatev();throw"Reached an unreachable!";default:assert(0,"bad label: "+label);}}
function __ZN6Solver16varDecayActivityEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+24)|0);var $4=HEAPF64[(($3)>>3)];var $5=(($2+224)|0);var $6=HEAPF64[(($5)>>3)];var $7=($6)*($4);HEAPF64[(($5)>>3)]=$7;return;}
function __ZN6Solver16claDecayActivityEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+32)|0);var $4=HEAPF64[(($3)>>3)];var $5=(($2+200)|0);var $6=HEAPF64[(($5)>>3)];var $7=($6)*($4);HEAPF64[(($5)>>3)]=$7;return;}
function __ZNK6Solver16progressEstimateEv($this){var label=0;label=1;while(1)switch(label){case 1:var $1;var $progress;var $F;var $i;var $beg;var $end;$1=$this;var $2=$1;$progress=0;var $3=__ZNK6Solver5nVarsEv($2);var $4=(($3)|(0));var $5=(1)/($4);$F=$5;$i=0;label=2;break;case 2:var $7=$i;var $8=__ZNK6Solver13decisionLevelEv($2);var $9=(($7)|(0))<=(($8)|(0));if($9){label=3;break;}else{label=11;break;}
case 3:var $11=$i;var $12=(($11)|(0))==0;if($12){label=4;break;}else{label=5;break;}
case 4:var $21=0;label=6;break;case 5:var $15=(($2+292)|0);var $16=$i;var $17=((($16)-(1))|0);var $18=__ZNK3vecIiEixEi($15,$17);var $19=HEAP32[(($18)>>2)];var $21=$19;label=6;break;case 6:var $21;$beg=$21;var $22=$i;var $23=__ZNK6Solver13decisionLevelEv($2);var $24=(($22)|(0))==(($23)|(0));if($24){label=7;break;}else{label=8;break;}
case 7:var $26=(($2+280)|0);var $27=__ZNK3vecI3LitE4sizeEv($26);var $34=$27;label=9;break;case 8:var $29=(($2+292)|0);var $30=$i;var $31=__ZNK3vecIiEixEi($29,$30);var $32=HEAP32[(($31)>>2)];var $34=$32;label=9;break;case 9:var $34;$end=$34;var $35=$F;var $36=$i;var $37=(($36)|(0));var $38=Math.pow($35,$37);var $39=$end;var $40=$beg;var $41=((($39)-($40))|0);var $42=(($41)|(0));var $43=($38)*($42);var $44=$progress;var $45=($44)+($43);$progress=$45;label=10;break;case 10:var $47=$i;var $48=((($47)+(1))|0);$i=$48;label=2;break;case 11:var $50=$progress;var $51=__ZNK6Solver5nVarsEv($2);var $52=(($51)|(0));var $53=($50)/($52);return $53;default:assert(0,"bad label: "+label);}}
function __ZN6Solver16newDecisionLevelEv($this){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+8)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var $1;var $2=sp;$1=$this;var $3=$1;var $4=(($3+292)|0);var $5=(($3+280)|0);var $6=__ZNK3vecI3LitE4sizeEv($5);HEAP32[(($2)>>2)]=$6;__ZN3vecIiE4pushERKi($4,$2);STACKTOP=sp;return;}
function __ZNK3vecIiEixEi($this,$index){var label=0;var $1;var $2;$1=$this;$2=$index;var $3=$1;var $4=$2;var $5=(($3)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6+($4<<2))|0);return $7;}
function __ZN6Solver5solveERK3vecI3LitE($this,$assumps){var label=0;var tempVarArgs=0;var sp=STACKTOP;STACKTOP=(STACKTOP+56)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $3;var $nof_conflicts;var $nof_learnts;var $status=sp;var $4=(sp)+(8);var $5=(sp)+(16);var $6=(sp)+(24);var $i;var $7=(sp)+(32);var $8=(sp)+(40);var $9=(sp)+(48);$2=$this;$3=$assumps;var $10=$2;var $11=(($10)|0);__ZN3vecI5lboolE5clearEb($11,0);var $12=(($10+12)|0);__ZN3vecI3LitE5clearEb($12,0);var $13=(($10+168)|0);var $14=HEAP8[($13)];var $15=(($14)&1);if($15){label=3;break;}else{label=2;break;}
case 2:$1=0;label=24;break;case 3:var $18=$3;var $19=(($10+344)|0);__ZNK3vecI3LitE6copyToERS1_($18,$19);var $20=(($10+48)|0);var $21=HEAP32[(($20)>>2)];var $22=(($21)|(0));$nof_conflicts=$22;var $23=__ZNK6Solver8nClausesEv($10);var $24=(($23)|(0));var $25=(($10+64)|0);var $26=HEAPF64[(($25)>>3)];var $27=($24)*($26);$nof_learnts=$27;var $28=$status;assert(1%1===0);HEAP8[($28)]=HEAP8[((((2800)|0))|0)];var $29=(($10+88)|0);var $30=HEAP32[(($29)>>2)];var $31=(($30)|(0))>=1;if($31){label=4;break;}else{label=5;break;}
case 4:var $33=HEAP32[((_stdout)>>2)];var $34=_fprintf($33,((1504)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs));STACKTOP=tempVarArgs;var $35=HEAP32[((_stdout)>>2)];var $36=_fprintf($35,((1328)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs));STACKTOP=tempVarArgs;var $37=HEAP32[((_stdout)>>2)];var $38=_fprintf($37,((1160)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs));STACKTOP=tempVarArgs;var $39=HEAP32[((_stdout)>>2)];var $40=_fprintf($39,((1040)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs));STACKTOP=tempVarArgs;label=5;break;case 5:label=6;break;case 6:var $43=$4;assert(1%1===0);HEAP8[($43)]=HEAP8[((((2800)|0))|0)];var $44=__ZNK5lbooleqES_($status,$4);if($44){label=7;break;}else{label=10;break;}
case 7:var $46=(($10+88)|0);var $47=HEAP32[(($46)>>2)];var $48=(($47)|(0))>=1;if($48){label=8;break;}else{label=9;break;}
case 8:var $50=HEAP32[((_stdout)>>2)];var $51=(($10+128)|0);var $ld$0$0=(($51)|0);var $52$0=HEAP32[(($ld$0$0)>>2)];var $ld$1$1=(($51+4)|0);var $52$1=HEAP32[(($ld$1$1)>>2)];var $53$0=$52$0;var $53=$53$0;var $54=(($10+356)|0);var $55=__ZNK4HeapIN6Solver10VarOrderLtEE4sizeEv($54);var $56=__ZNK6Solver8nClausesEv($10);var $57=(($10+136)|0);var $ld$2$0=(($57)|0);var $58$0=HEAP32[(($ld$2$0)>>2)];var $ld$3$1=(($57+4)|0);var $58$1=HEAP32[(($ld$3$1)>>2)];var $59$0=$58$0;var $59=$59$0;var $60=$nof_learnts;var $61=(($60)&-1);var $62=__ZNK6Solver8nLearntsEv($10);var $63=(($10+144)|0);var $ld$4$0=(($63)|0);var $64$0=HEAP32[(($ld$4$0)>>2)];var $ld$5$1=(($63+4)|0);var $64$1=HEAP32[(($ld$5$1)>>2)];var $65=((($64$0)>>>(0))+((($64$1)>>>(0))*4294967296));var $66=__ZNK6Solver8nLearntsEv($10);var $67=(($66)|(0));var $68=($65)/($67);var $69=(($10+392)|0);var $70=HEAPF64[(($69)>>3)];var $71=($70)*(100);var $72=_fprintf($50,((968)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+64)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$53,HEAP32[(((tempVarArgs)+(8))>>2)]=$55,HEAP32[(((tempVarArgs)+(16))>>2)]=$56,HEAP32[(((tempVarArgs)+(24))>>2)]=$59,HEAP32[(((tempVarArgs)+(32))>>2)]=$61,HEAP32[(((tempVarArgs)+(40))>>2)]=$62,HEAPF64[(((tempVarArgs)+(48))>>3)]=$68,HEAPF64[(((tempVarArgs)+(56))>>3)]=$71,tempVarArgs));STACKTOP=tempVarArgs;var $73=HEAP32[((_stdout)>>2)];var $74=_fflush($73);label=9;break;case 9:var $76=$nof_conflicts;var $77=(($76)&-1);var $78=$nof_learnts;var $79=(($78)&-1);__ZN6Solver6searchEii($5,$10,$77,$79);var $80=$status;var $81=$5;assert(1%1===0);HEAP8[($80)]=HEAP8[($81)];var $82=(($10+56)|0);var $83=HEAPF64[(($82)>>3)];var $84=$nof_conflicts;var $85=($84)*($83);$nof_conflicts=$85;var $86=(($10+72)|0);var $87=HEAPF64[(($86)>>3)];var $88=$nof_learnts;var $89=($88)*($87);$nof_learnts=$89;label=6;break;case 10:var $91=(($10+88)|0);var $92=HEAP32[(($91)>>2)];var $93=(($92)|(0))>=1;if($93){label=11;break;}else{label=12;break;}
case 11:var $95=HEAP32[((_stdout)>>2)];var $96=_fprintf($95,((1040)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs));STACKTOP=tempVarArgs;label=12;break;case 12:var $98=$6;assert(1%1===0);HEAP8[($98)]=HEAP8[((((2832)|0))|0)];var $99=__ZNK5lbooleqES_($status,$6);if($99){label=13;break;}else{label=18;break;}
case 13:var $101=(($10)|0);var $102=__ZNK6Solver5nVarsEv($10);__ZN3vecI5lboolE6growToEi($101,$102);$i=0;label=14;break;case 14:var $104=$i;var $105=__ZNK6Solver5nVarsEv($10);var $106=(($104)|(0))<(($105)|(0));if($106){label=15;break;}else{label=17;break;}
case 15:var $108=(($10)|0);var $109=$i;var $110=__ZN3vecI5lboolEixEi($108,$109);var $111=$i;__ZNK6Solver5valueEi($7,$10,$111);var $112=$110;var $113=$7;assert(1%1===0);HEAP8[($112)]=HEAP8[($113)];label=16;break;case 16:var $115=$i;var $116=((($115)+(1))|0);$i=$116;label=14;break;case 17:__ZN6Solver11verifyModelEv($10);label=23;break;case 18:var $119=$8;assert(1%1===0);HEAP8[($119)]=HEAP8[((((2816)|0))|0)];var $120=__ZNK5lbooleqES_($status,$8);if($120){var $124=1;label=20;break;}else{label=19;break;}
case 19:___assert_fail(((928)|0),((328)|0),692,((2072)|0));throw"Reached an unreachable!";label=20;break;case 20:var $124;var $125=(($10+12)|0);var $126=__ZNK3vecI3LitE4sizeEv($125);var $127=(($126)|(0))==0;if($127){label=21;break;}else{label=22;break;}
case 21:var $129=(($10+168)|0);HEAP8[($129)]=0;label=22;break;case 22:label=23;break;case 23:__ZN6Solver11cancelUntilEi($10,0);var $132=$9;assert(1%1===0);HEAP8[($132)]=HEAP8[((((2832)|0))|0)];var $133=__ZNK5lbooleqES_($status,$9);$1=$133;label=24;break;case 24:var $135=$1;STACKTOP=sp;return $135;default:assert(0,"bad label: "+label);}}
function __ZN3vecI5lboolE5clearEb($this,$dealloc){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;$1=$this;var $3=(($dealloc)&(1));$2=$3;var $4=$1;var $5=(($4)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6)|(0))!=0;if($7){label=2;break;}else{label=9;break;}
case 2:$i=0;label=3;break;case 3:var $10=$i;var $11=(($4+4)|0);var $12=HEAP32[(($11)>>2)];var $13=(($10)|(0))<(($12)|(0));if($13){label=4;break;}else{label=6;break;}
case 4:var $15=$i;var $16=(($4)|0);var $17=HEAP32[(($16)>>2)];var $18=(($17+$15)|0);label=5;break;case 5:var $20=$i;var $21=((($20)+(1))|0);$i=$21;label=3;break;case 6:var $23=(($4+4)|0);HEAP32[(($23)>>2)]=0;var $24=$2;var $25=(($24)&1);if($25){label=7;break;}else{label=8;break;}
case 7:var $27=(($4)|0);var $28=HEAP32[(($27)>>2)];var $29=$28;_free($29);var $30=(($4)|0);HEAP32[(($30)>>2)]=0;var $31=(($4+8)|0);HEAP32[(($31)>>2)]=0;label=8;break;case 8:label=9;break;case 9:return;default:assert(0,"bad label: "+label);}}
function __ZNK6Solver8nClausesEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+172)|0);var $4=__ZNK3vecIP6ClauseE4sizeEv($3);return $4;}
function __ZNK6Solver8nLearntsEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+184)|0);var $4=__ZNK3vecIP6ClauseE4sizeEv($3);return $4;}
function __ZN3vecI5lboolE6growToEi($this,$size){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;$1=$this;$2=$size;var $3=$1;var $4=(($3+4)|0);var $5=HEAP32[(($4)>>2)];var $6=$2;var $7=(($5)|(0))>=(($6)|(0));if($7){label=2;break;}else{label=3;break;}
case 2:label=10;break;case 3:var $10=$2;__ZN3vecI5lboolE4growEi($3,$10);var $11=(($3+4)|0);var $12=HEAP32[(($11)>>2)];$i=$12;label=4;break;case 4:var $14=$i;var $15=$2;var $16=(($14)|(0))<(($15)|(0));if($16){label=5;break;}else{label=9;break;}
case 5:var $18=$i;var $19=(($3)|0);var $20=HEAP32[(($19)>>2)];var $21=(($20+$18)|0);var $22=$21;var $23=(($22)|(0))==0;if($23){var $27=0;label=7;break;}else{label=6;break;}
case 6:var $25=$22;__ZN5lboolC1Ev($25);var $27=$25;label=7;break;case 7:var $27;label=8;break;case 8:var $29=$i;var $30=((($29)+(1))|0);$i=$30;label=4;break;case 9:var $32=$2;var $33=(($3+4)|0);HEAP32[(($33)>>2)]=$32;label=10;break;case 10:return;default:assert(0,"bad label: "+label);}}
function __ZNK6Solver5valueEi($agg_result,$this,$x){var label=0;var $1;var $2;$1=$this;$2=$x;var $3=$1;var $4=(($3+244)|0);var $5=$2;var $6=__ZNK3vecIcEixEi($4,$5);var $7=HEAP8[($6)];var $8=(($7<<24)>>24);__Z7toLbooli($agg_result,$8);return;}
function __ZN6Solver11verifyModelEv($this){var label=0;var tempVarArgs=0;var sp=STACKTOP;STACKTOP=(STACKTOP+24)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $failed;var $i;var $c;var $j;var $2=sp;var $3=(sp)+(8);var $4=(sp)+(16);$1=$this;var $5=$1;$failed=0;$i=0;label=2;break;case 2:var $7=$i;var $8=(($5+172)|0);var $9=__ZNK3vecIP6ClauseE4sizeEv($8);var $10=(($7)|(0))<(($9)|(0));if($10){label=3;break;}else{label=14;break;}
case 3:var $12=(($5+172)|0);var $13=$i;var $14=__ZN3vecIP6ClauseEixEi($12,$13);var $15=HEAP32[(($14)>>2)];var $16=__ZNK6Clause4markEv($15);var $17=(($16)|(0))==0;if($17){var $21=1;label=5;break;}else{label=4;break;}
case 4:___assert_fail(((896)|0),((328)|0),709,((2184)|0));throw"Reached an unreachable!";label=5;break;case 5:var $21;var $22=(($5+172)|0);var $23=$i;var $24=__ZN3vecIP6ClauseEixEi($22,$23);var $25=HEAP32[(($24)>>2)];$c=$25;$j=0;label=6;break;case 6:var $27=$j;var $28=$c;var $29=__ZNK6Clause4sizeEv($28);var $30=(($27)|(0))<(($29)|(0));if($30){label=7;break;}else{label=11;break;}
case 7:var $32=$c;var $33=$j;var $34=__ZN6ClauseixEi($32,$33);var $35=$2;var $36=$34;assert(4%1===0);HEAP32[(($35)>>2)]=HEAP32[(($36)>>2)];__ZNK6Solver10modelValueE3Lit($3,$5,$2);var $37=$4;assert(1%1===0);HEAP8[($37)]=HEAP8[((((2832)|0))|0)];var $38=__ZNK5lbooleqES_($3,$4);if($38){label=8;break;}else{label=9;break;}
case 8:label=12;break;case 9:label=10;break;case 10:var $42=$j;var $43=((($42)+(1))|0);$j=$43;label=6;break;case 11:var $45=HEAP32[((_stdout)>>2)];var $46=_fprintf($45,((864)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs));STACKTOP=tempVarArgs;var $47=(($5+172)|0);var $48=$i;var $49=__ZN3vecIP6ClauseEixEi($47,$48);var $50=HEAP32[(($49)>>2)];__ZN6Solver11printClauseI6ClauseEEvRKT_($5,$50);var $51=HEAP32[((_stdout)>>2)];var $52=_fprintf($51,((856)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs));STACKTOP=tempVarArgs;$failed=1;label=12;break;case 12:label=13;break;case 13:var $55=$i;var $56=((($55)+(1))|0);$i=$56;label=2;break;case 14:var $58=$failed;var $59=(($58)&1);if($59){label=15;break;}else{var $63=1;label=16;break;}
case 15:___assert_fail(((840)|0),((328)|0),722,((2184)|0));throw"Reached an unreachable!";label=16;break;case 16:var $63;var $64=HEAP32[((_stdout)>>2)];var $65=(($5+172)|0);var $66=__ZNK3vecIP6ClauseE4sizeEv($65);var $67=_fprintf($64,((800)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+8)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$66,tempVarArgs));STACKTOP=tempVarArgs;STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZNK6Clause4markEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2)|0);var $4=HEAP32[(($3)>>2)];var $5=$4>>>1;var $6=$5&3;return $6;}
function __ZNK6Solver10modelValueE3Lit($agg_result,$this,$p){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+16)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$p;$p=STACKTOP;STACKTOP=(STACKTOP+4)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);HEAP32[(($p)>>2)]=HEAP32[((tempParam)>>2)];var $1;var $2=sp;var $3=(sp)+(8);$1=$this;var $4=$1;var $5=(($4)|0);var $6=$2;var $7=$p;assert(4%1===0);HEAP32[(($6)>>2)]=HEAP32[(($7)>>2)];var $8=__Z3var3Lit($2);var $9=__ZNK3vecI5lboolEixEi($5,$8);var $10=$3;var $11=$p;assert(4%1===0);HEAP32[(($10)>>2)]=HEAP32[(($11)>>2)];var $12=__Z4sign3Lit($3);__ZNK5lbooleoEb($agg_result,$9,$12);STACKTOP=sp;return;}
function __ZN6Solver11printClauseI6ClauseEEvRKT_($this,$c){var label=0;var tempVarArgs=0;var sp=STACKTOP;STACKTOP=(STACKTOP+8)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $i;var $3=sp;$1=$this;$2=$c;var $4=$1;$i=0;label=2;break;case 2:var $6=$i;var $7=$2;var $8=__ZNK6Clause4sizeEv($7);var $9=(($6)|(0))<(($8)|(0));if($9){label=3;break;}else{label=5;break;}
case 3:var $11=$2;var $12=$i;__ZNK6ClauseixEi($3,$11,$12);__ZN6Solver8printLitE3Lit($4,$3);var $13=HEAP32[((_stdout)>>2)];var $14=_fprintf($13,((776)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+1)|0,STACKTOP=((((STACKTOP)+7)>>3)<<3),(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=0,tempVarArgs));STACKTOP=tempVarArgs;label=4;break;case 4:var $16=$i;var $17=((($16)+(1))|0);$i=$17;label=2;break;case 5:STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZN6Solver8printLitE3Lit($this,$l){var label=0;var tempVarArgs=0;var sp=STACKTOP;STACKTOP=(STACKTOP+64)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$l;$l=STACKTOP;STACKTOP=(STACKTOP+4)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);HEAP32[(($l)>>2)]=HEAP32[((tempParam)>>2)];label=1;while(1)switch(label){case 1:var $1;var $2=sp;var $3=(sp)+(8);var $4=(sp)+(16);var $5=(sp)+(24);var $6=(sp)+(32);var $7=(sp)+(40);var $8=(sp)+(48);var $9=(sp)+(56);$1=$this;var $10=$1;var $11=HEAP32[((_stdout)>>2)];var $12=$2;var $13=$l;assert(4%1===0);HEAP32[(($12)>>2)]=HEAP32[(($13)>>2)];var $14=__Z4sign3Lit($2);var $15=$14?(((672)|0)):(((2280)|0));var $16=$3;var $17=$l;assert(4%1===0);HEAP32[(($16)>>2)]=HEAP32[(($17)>>2)];var $18=__Z3var3Lit($3);var $19=((($18)+(1))|0);var $20=$4;var $21=$l;assert(4%1===0);HEAP32[(($20)>>2)]=HEAP32[(($21)>>2)];__ZNK6Solver5valueE3Lit($5,$10,$4);var $22=$6;assert(1%1===0);HEAP8[($22)]=HEAP8[((((2832)|0))|0)];var $23=__ZNK5lbooleqES_($5,$6);if($23){label=2;break;}else{label=3;break;}
case 2:var $32=49;label=4;break;case 3:var $26=$7;var $27=$l;assert(4%1===0);HEAP32[(($26)>>2)]=HEAP32[(($27)>>2)];__ZNK6Solver5valueE3Lit($8,$10,$7);var $28=$9;assert(1%1===0);HEAP8[($28)]=HEAP8[((((2816)|0))|0)];var $29=__ZNK5lbooleqES_($8,$9);var $30=$29?48:88;var $32=$30;label=4;break;case 4:var $32;var $33=(($32<<24)>>24);var $34=_fprintf($11,((760)|0),(tempVarArgs=STACKTOP,STACKTOP=(STACKTOP+24)|0,(assert((STACKTOP|0)<(STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$15,HEAP32[(((tempVarArgs)+(8))>>2)]=$19,HEAP32[(((tempVarArgs)+(16))>>2)]=$33,tempVarArgs));STACKTOP=tempVarArgs;STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZN3vecI5lboolE4growEi($this,$min_cap){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;$1=$this;$2=$min_cap;var $3=$1;var $4=$2;var $5=(($3+8)|0);var $6=HEAP32[(($5)>>2)];var $7=(($4)|(0))<=(($6)|(0));if($7){label=2;break;}else{label=3;break;}
case 2:label=13;break;case 3:var $10=(($3+8)|0);var $11=HEAP32[(($10)>>2)];var $12=(($11)|(0))==0;if($12){label=4;break;}else{label=8;break;}
case 4:var $14=$2;var $15=(($14)|(0))>=2;if($15){label=5;break;}else{label=6;break;}
case 5:var $17=$2;var $20=$17;label=7;break;case 6:var $20=2;label=7;break;case 7:var $20;var $21=(($3+8)|0);HEAP32[(($21)>>2)]=$20;label=12;break;case 8:label=9;break;case 9:var $24=(($3+8)|0);var $25=HEAP32[(($24)>>2)];var $26=((($25)*(3))&-1);var $27=((($26)+(1))|0);var $28=$27>>1;var $29=(($3+8)|0);HEAP32[(($29)>>2)]=$28;label=10;break;case 10:var $31=(($3+8)|0);var $32=HEAP32[(($31)>>2)];var $33=$2;var $34=(($32)|(0))<(($33)|(0));if($34){label=9;break;}else{label=11;break;}
case 11:label=12;break;case 12:var $37=(($3)|0);var $38=HEAP32[(($37)>>2)];var $39=$38;var $40=(($3+8)|0);var $41=HEAP32[(($40)>>2)];var $42=$41;var $43=_realloc($39,$42);var $44=$43;var $45=(($3)|0);HEAP32[(($45)>>2)]=$44;label=13;break;case 13:return;default:assert(0,"bad label: "+label);}}
function __ZN5lboolC1Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN5lboolC2Ev($2);return;}
function __ZN5lboolC2Ev($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2)|0);HEAP8[($3)]=0;return;}
function __ZNK6Solver9VarFilterclEi($this,$v){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+16)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2;var $3=sp;var $4=(sp)+(8);$1=$this;$2=$v;var $5=$1;var $6=(($5)|0);var $7=HEAP32[(($6)>>2)];var $8=(($7+244)|0);var $9=$2;var $10=__ZNK3vecIcEixEi($8,$9);var $11=HEAP8[($10)];var $12=(($11<<24)>>24);__Z7toLbooli($3,$12);var $13=$4;assert(1%1===0);HEAP8[($13)]=HEAP8[((((2800)|0))|0)];var $14=__ZNK5lbooleqES_($3,$4);if($14){label=2;break;}else{var $24=0;label=3;break;}
case 2:var $16=(($5)|0);var $17=HEAP32[(($16)>>2)];var $18=(($17+268)|0);var $19=$2;var $20=__ZNK3vecIcEixEi($18,$19);var $21=HEAP8[($20)];var $22=(($21<<24)>>24)!=0;var $24=$22;label=3;break;case 3:var $24;STACKTOP=sp;return $24;default:assert(0,"bad label: "+label);}}
function __ZN4HeapIN6Solver10VarOrderLtEE13percolateDownEi($this,$i){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $x;var $child;$1=$this;$2=$i;var $3=$1;var $4=(($3+4)|0);var $5=$2;var $6=__ZN3vecIiEixEi($4,$5);var $7=HEAP32[(($6)>>2)];$x=$7;label=2;break;case 2:var $9=$2;var $10=__ZN4HeapIN6Solver10VarOrderLtEE4leftEi($9);var $11=(($3+4)|0);var $12=__ZNK3vecIiE4sizeEv($11);var $13=(($10)|(0))<(($12)|(0));if($13){label=3;break;}else{label=10;break;}
case 3:var $15=$2;var $16=__ZN4HeapIN6Solver10VarOrderLtEE5rightEi($15);var $17=(($3+4)|0);var $18=__ZNK3vecIiE4sizeEv($17);var $19=(($16)|(0))<(($18)|(0));if($19){label=4;break;}else{label=6;break;}
case 4:var $21=(($3)|0);var $22=(($3+4)|0);var $23=$2;var $24=__ZN4HeapIN6Solver10VarOrderLtEE5rightEi($23);var $25=__ZN3vecIiEixEi($22,$24);var $26=HEAP32[(($25)>>2)];var $27=(($3+4)|0);var $28=$2;var $29=__ZN4HeapIN6Solver10VarOrderLtEE4leftEi($28);var $30=__ZN3vecIiEixEi($27,$29);var $31=HEAP32[(($30)>>2)];var $32=__ZNK6Solver10VarOrderLtclEii($21,$26,$31);if($32){label=5;break;}else{label=6;break;}
case 5:var $34=$2;var $35=__ZN4HeapIN6Solver10VarOrderLtEE5rightEi($34);var $40=$35;label=7;break;case 6:var $37=$2;var $38=__ZN4HeapIN6Solver10VarOrderLtEE4leftEi($37);var $40=$38;label=7;break;case 7:var $40;$child=$40;var $41=(($3)|0);var $42=(($3+4)|0);var $43=$child;var $44=__ZN3vecIiEixEi($42,$43);var $45=HEAP32[(($44)>>2)];var $46=$x;var $47=__ZNK6Solver10VarOrderLtclEii($41,$45,$46);if($47){label=9;break;}else{label=8;break;}
case 8:label=10;break;case 9:var $50=(($3+4)|0);var $51=$child;var $52=__ZN3vecIiEixEi($50,$51);var $53=HEAP32[(($52)>>2)];var $54=(($3+4)|0);var $55=$2;var $56=__ZN3vecIiEixEi($54,$55);HEAP32[(($56)>>2)]=$53;var $57=$2;var $58=(($3+16)|0);var $59=(($3+4)|0);var $60=$2;var $61=__ZN3vecIiEixEi($59,$60);var $62=HEAP32[(($61)>>2)];var $63=__ZN3vecIiEixEi($58,$62);HEAP32[(($63)>>2)]=$57;var $64=$child;$2=$64;label=2;break;case 10:var $66=$x;var $67=(($3+4)|0);var $68=$2;var $69=__ZN3vecIiEixEi($67,$68);HEAP32[(($69)>>2)]=$66;var $70=$2;var $71=(($3+16)|0);var $72=$x;var $73=__ZN3vecIiEixEi($71,$72);HEAP32[(($73)>>2)]=$70;return;default:assert(0,"bad label: "+label);}}
function __ZNK4HeapIN6Solver10VarOrderLtEE12heapPropertyEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=__ZNK4HeapIN6Solver10VarOrderLtEE12heapPropertyEi($2,1);return $3;}
function __ZNK4HeapIN6Solver10VarOrderLtEE12heapPropertyEi($this,$i){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;$1=$this;$2=$i;var $3=$1;var $4=$2;var $5=(($3+4)|0);var $6=__ZNK3vecIiE4sizeEv($5);var $7=(($4)|(0))>=(($6)|(0));if($7){var $34=1;label=7;break;}else{label=2;break;}
case 2:var $9=$2;var $10=(($9)|(0))==0;if($10){label=4;break;}else{label=3;break;}
case 3:var $12=(($3)|0);var $13=(($3+4)|0);var $14=$2;var $15=__ZNK3vecIiEixEi($13,$14);var $16=HEAP32[(($15)>>2)];var $17=(($3+4)|0);var $18=$2;var $19=__ZN4HeapIN6Solver10VarOrderLtEE6parentEi($18);var $20=__ZNK3vecIiEixEi($17,$19);var $21=HEAP32[(($20)>>2)];var $22=__ZNK6Solver10VarOrderLtclEii($12,$16,$21);if($22){var $32=0;label=6;break;}else{label=4;break;}
case 4:var $24=$2;var $25=__ZN4HeapIN6Solver10VarOrderLtEE4leftEi($24);var $26=__ZNK4HeapIN6Solver10VarOrderLtEE12heapPropertyEi($3,$25);if($26){label=5;break;}else{var $32=0;label=6;break;}
case 5:var $28=$2;var $29=__ZN4HeapIN6Solver10VarOrderLtEE5rightEi($28);var $30=__ZNK4HeapIN6Solver10VarOrderLtEE12heapPropertyEi($3,$29);var $32=$30;label=6;break;case 6:var $32;var $34=$32;label=7;break;case 7:var $34;return $34;default:assert(0,"bad label: "+label);}}
function __ZNK6Solver10VarOrderLtclEii($this,$x,$y){var label=0;var $1;var $2;var $3;$1=$this;$2=$x;$3=$y;var $4=$1;var $5=(($4)|0);var $6=HEAP32[(($5)>>2)];var $7=$2;var $8=__ZNK3vecIdEixEi($6,$7);var $9=(HEAP32[((tempDoublePtr)>>2)]=HEAP32[(($8)>>2)],HEAP32[(((tempDoublePtr)+(4))>>2)]=HEAP32[((($8)+(4))>>2)],HEAPF64[(tempDoublePtr)>>3]);var $10=(($4)|0);var $11=HEAP32[(($10)>>2)];var $12=$3;var $13=__ZNK3vecIdEixEi($11,$12);var $14=(HEAP32[((tempDoublePtr)>>2)]=HEAP32[(($13)>>2)],HEAP32[(((tempDoublePtr)+(4))>>2)]=HEAP32[((($13)+(4))>>2)],HEAPF64[(tempDoublePtr)>>3]);var $15=$9>$14;return $15;}
function __ZN4HeapIN6Solver10VarOrderLtEE6parentEi($i){var label=0;var $1;$1=$i;var $2=$1;var $3=((($2)-(1))|0);var $4=$3>>1;return $4;}
function __ZN4HeapIN6Solver10VarOrderLtEE4leftEi($i){var label=0;var $1;$1=$i;var $2=$1;var $3=($2<<1);var $4=((($3)+(1))|0);return $4;}
function __ZN4HeapIN6Solver10VarOrderLtEE5rightEi($i){var label=0;var $1;$1=$i;var $2=$1;var $3=((($2)+(1))|0);var $4=($3<<1);return $4;}
function __ZNK3vecIdEixEi($this,$index){var label=0;var $1;var $2;$1=$this;$2=$index;var $3=$1;var $4=$2;var $5=(($3)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6+($4<<3))|0);return $7;}
function __ZNK3vecIcEixEi($this,$index){var label=0;var $1;var $2;$1=$this;$2=$index;var $3=$1;var $4=$2;var $5=(($3)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6+$4)|0);return $7;}
function __Z4sortIP6Clause11reduceDB_ltEvPT_iT0_($array,$size,$lt){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+24)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$lt;$lt=STACKTOP;STACKTOP=(STACKTOP+1)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);;;HEAP8[($lt)]=HEAP8[(tempParam)];label=1;while(1)switch(label){case 1:var $1;var $2;var $3=sp;var $pivot;var $tmp;var $i;var $j;var $4=(sp)+(8);var $5=(sp)+(16);$1=$array;$2=$size;var $6=$2;var $7=(($6)|(0))<=15;if($7){label=2;break;}else{label=3;break;}
case 2:var $9=$1;var $10=$2;__Z13selectionSortIP6Clause11reduceDB_ltEvPT_iT0_($9,$10,$3);label=14;break;case 3:var $12=$2;var $13=((((($12)|(0)))/(2))&-1);var $14=$1;var $15=(($14+($13<<2))|0);var $16=HEAP32[(($15)>>2)];$pivot=$16;$i=-1;var $17=$2;$j=$17;label=4;break;case 4:label=5;break;case 5:var $20=$i;var $21=((($20)+(1))|0);$i=$21;label=6;break;case 6:var $23=$i;var $24=$1;var $25=(($24+($23<<2))|0);var $26=HEAP32[(($25)>>2)];var $27=$pivot;var $28=__ZN11reduceDB_ltclEP6ClauseS1_($lt,$26,$27);if($28){label=5;break;}else{label=7;break;}
case 7:label=8;break;case 8:var $31=$j;var $32=((($31)-(1))|0);$j=$32;label=9;break;case 9:var $34=$pivot;var $35=$j;var $36=$1;var $37=(($36+($35<<2))|0);var $38=HEAP32[(($37)>>2)];var $39=__ZN11reduceDB_ltclEP6ClauseS1_($lt,$34,$38);if($39){label=8;break;}else{label=10;break;}
case 10:var $41=$i;var $42=$j;var $43=(($41)|(0))>=(($42)|(0));if($43){label=11;break;}else{label=12;break;}
case 11:label=13;break;case 12:var $46=$i;var $47=$1;var $48=(($47+($46<<2))|0);var $49=HEAP32[(($48)>>2)];$tmp=$49;var $50=$j;var $51=$1;var $52=(($51+($50<<2))|0);var $53=HEAP32[(($52)>>2)];var $54=$i;var $55=$1;var $56=(($55+($54<<2))|0);HEAP32[(($56)>>2)]=$53;var $57=$tmp;var $58=$j;var $59=$1;var $60=(($59+($58<<2))|0);HEAP32[(($60)>>2)]=$57;label=4;break;case 13:var $62=$1;var $63=$i;__Z4sortIP6Clause11reduceDB_ltEvPT_iT0_($62,$63,$4);var $64=$i;var $65=$1;var $66=(($65+($64<<2))|0);var $67=$2;var $68=$i;var $69=((($67)-($68))|0);__Z4sortIP6Clause11reduceDB_ltEvPT_iT0_($66,$69,$5);label=14;break;case 14:STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __Z13selectionSortIP6Clause11reduceDB_ltEvPT_iT0_($array,$size,$lt){var label=0;var sp=STACKTOP;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$lt;$lt=STACKTOP;STACKTOP=(STACKTOP+1)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);;;HEAP8[($lt)]=HEAP8[(tempParam)];label=1;while(1)switch(label){case 1:var $1;var $2;var $i;var $j;var $best_i;var $tmp;$1=$array;$2=$size;$i=0;label=2;break;case 2:var $4=$i;var $5=$2;var $6=((($5)-(1))|0);var $7=(($4)|(0))<(($6)|(0));if($7){label=3;break;}else{label=11;break;}
case 3:var $9=$i;$best_i=$9;var $10=$i;var $11=((($10)+(1))|0);$j=$11;label=4;break;case 4:var $13=$j;var $14=$2;var $15=(($13)|(0))<(($14)|(0));if($15){label=5;break;}else{label=9;break;}
case 5:var $17=$j;var $18=$1;var $19=(($18+($17<<2))|0);var $20=HEAP32[(($19)>>2)];var $21=$best_i;var $22=$1;var $23=(($22+($21<<2))|0);var $24=HEAP32[(($23)>>2)];var $25=__ZN11reduceDB_ltclEP6ClauseS1_($lt,$20,$24);if($25){label=6;break;}else{label=7;break;}
case 6:var $27=$j;$best_i=$27;label=7;break;case 7:label=8;break;case 8:var $30=$j;var $31=((($30)+(1))|0);$j=$31;label=4;break;case 9:var $33=$i;var $34=$1;var $35=(($34+($33<<2))|0);var $36=HEAP32[(($35)>>2)];$tmp=$36;var $37=$best_i;var $38=$1;var $39=(($38+($37<<2))|0);var $40=HEAP32[(($39)>>2)];var $41=$i;var $42=$1;var $43=(($42+($41<<2))|0);HEAP32[(($43)>>2)]=$40;var $44=$tmp;var $45=$best_i;var $46=$1;var $47=(($46+($45<<2))|0);HEAP32[(($47)>>2)]=$44;label=10;break;case 10:var $49=$i;var $50=((($49)+(1))|0);$i=$50;label=2;break;case 11:STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZN11reduceDB_ltclEP6ClauseS1_($this,$x,$y){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $3;$1=$this;$2=$x;$3=$y;var $4=$1;var $5=$2;var $6=__ZNK6Clause4sizeEv($5);var $7=(($6)|(0))>2;if($7){label=2;break;}else{var $23=0;label=5;break;}
case 2:var $9=$3;var $10=__ZNK6Clause4sizeEv($9);var $11=(($10)|(0))==2;if($11){var $21=1;label=4;break;}else{label=3;break;}
case 3:var $13=$2;var $14=__ZN6Clause8activityEv($13);var $15=HEAPF32[(($14)>>2)];var $16=$3;var $17=__ZN6Clause8activityEv($16);var $18=HEAPF32[(($17)>>2)];var $19=$15<$18;var $21=$19;label=4;break;case 4:var $21;var $23=$21;label=5;break;case 5:var $23;return $23;default:assert(0,"bad label: "+label);}}
function __ZN3vecI3LitE6growToEi($this,$size){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;$1=$this;$2=$size;var $3=$1;var $4=(($3+4)|0);var $5=HEAP32[(($4)>>2)];var $6=$2;var $7=(($5)|(0))>=(($6)|(0));if($7){label=2;break;}else{label=3;break;}
case 2:label=10;break;case 3:var $10=$2;__ZN3vecI3LitE4growEi($3,$10);var $11=(($3+4)|0);var $12=HEAP32[(($11)>>2)];$i=$12;label=4;break;case 4:var $14=$i;var $15=$2;var $16=(($14)|(0))<(($15)|(0));if($16){label=5;break;}else{label=9;break;}
case 5:var $18=$i;var $19=(($3)|0);var $20=HEAP32[(($19)>>2)];var $21=(($20+($18<<2))|0);var $22=$21;var $23=(($22)|(0))==0;if($23){var $27=0;label=7;break;}else{label=6;break;}
case 6:var $25=$22;__ZN3LitC1Ev($25);var $27=$25;label=7;break;case 7:var $27;label=8;break;case 8:var $29=$i;var $30=((($29)+(1))|0);$i=$30;label=4;break;case 9:var $32=$2;var $33=(($3+4)|0);HEAP32[(($33)>>2)]=$32;label=10;break;case 10:return;default:assert(0,"bad label: "+label);}}
function __ZN3vecI3LitE4growEi($this,$min_cap){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;$1=$this;$2=$min_cap;var $3=$1;var $4=$2;var $5=(($3+8)|0);var $6=HEAP32[(($5)>>2)];var $7=(($4)|(0))<=(($6)|(0));if($7){label=2;break;}else{label=3;break;}
case 2:label=13;break;case 3:var $10=(($3+8)|0);var $11=HEAP32[(($10)>>2)];var $12=(($11)|(0))==0;if($12){label=4;break;}else{label=8;break;}
case 4:var $14=$2;var $15=(($14)|(0))>=2;if($15){label=5;break;}else{label=6;break;}
case 5:var $17=$2;var $20=$17;label=7;break;case 6:var $20=2;label=7;break;case 7:var $20;var $21=(($3+8)|0);HEAP32[(($21)>>2)]=$20;label=12;break;case 8:label=9;break;case 9:var $24=(($3+8)|0);var $25=HEAP32[(($24)>>2)];var $26=((($25)*(3))&-1);var $27=((($26)+(1))|0);var $28=$27>>1;var $29=(($3+8)|0);HEAP32[(($29)>>2)]=$28;label=10;break;case 10:var $31=(($3+8)|0);var $32=HEAP32[(($31)>>2)];var $33=$2;var $34=(($32)|(0))<(($33)|(0));if($34){label=9;break;}else{label=11;break;}
case 11:label=12;break;case 12:var $37=(($3)|0);var $38=HEAP32[(($37)>>2)];var $39=$38;var $40=(($3+8)|0);var $41=HEAP32[(($40)>>2)];var $42=($41<<2);var $43=_realloc($39,$42);var $44=$43;var $45=(($3)|0);HEAP32[(($45)>>2)]=$44;label=13;break;case 13:return;default:assert(0,"bad label: "+label);}}
function __ZN3vecIiE4lastEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+4)|0);var $4=HEAP32[(($3)>>2)];var $5=((($4)-(1))|0);var $6=(($2)|0);var $7=HEAP32[(($6)>>2)];var $8=(($7+($5<<2))|0);return $8;}
function __ZN3vecIiE3popEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+4)|0);var $4=HEAP32[(($3)>>2)];var $5=((($4)-(1))|0);HEAP32[(($3)>>2)]=$5;var $6=(($2+4)|0);var $7=HEAP32[(($6)>>2)];var $8=(($2)|0);var $9=HEAP32[(($8)>>2)];var $10=(($9+($7<<2))|0);var $11=HEAP32[(($10)>>2)];return;}
function __ZN3vecIP6ClauseE3popEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2+4)|0);var $4=HEAP32[(($3)>>2)];var $5=((($4)-(1))|0);HEAP32[(($3)>>2)]=$5;var $6=(($2+4)|0);var $7=HEAP32[(($6)>>2)];var $8=(($2)|0);var $9=HEAP32[(($8)>>2)];var $10=(($9+($7<<2))|0);var $11=HEAP32[(($10)>>2)];return;}
function __ZN6ClauseC1I3vecI3LitEEERKT_b($this,$ps,$learnt){var label=0;var $1;var $2;var $3;$1=$this;$2=$ps;var $4=(($learnt)&(1));$3=$4;var $5=$1;var $6=$3;var $7=(($6)&1);var $8=$2;__ZN6ClauseC2I3vecI3LitEEERKT_b($5,$8,$7);return;}
function __ZN6ClauseC2I3vecI3LitEEERKT_b($this,$ps,$learnt){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $3;var $i;$1=$this;$2=$ps;var $4=(($learnt)&(1));$3=$4;var $5=$1;var $6=(($5+4)|0);var $7=$2;var $8=__ZNK3vecI3LitE4sizeEv($7);var $9=$8<<3;var $10=$3;var $11=(($10)&1);var $12=(($11)&(1));var $13=$9|$12;var $14=(($5)|0);HEAP32[(($14)>>2)]=$13;$i=0;label=2;break;case 2:var $16=$i;var $17=$2;var $18=__ZNK3vecI3LitE4sizeEv($17);var $19=(($16)|(0))<(($18)|(0));if($19){label=3;break;}else{label=5;break;}
case 3:var $21=$i;var $22=(($5+8)|0);var $23=(($22+($21<<2))|0);var $24=$2;var $25=$i;var $26=__ZNK3vecI3LitEixEi($24,$25);var $27=$23;var $28=$26;assert(4%1===0);HEAP32[(($27)>>2)]=HEAP32[(($28)>>2)];label=4;break;case 4:var $30=$i;var $31=((($30)+(1))|0);$i=$31;label=2;break;case 5:var $33=$3;var $34=(($33)&1);if($34){label=6;break;}else{label=7;break;}
case 6:var $36=(($5+4)|0);var $37=$36;HEAPF32[(($37)>>2)]=0;label=8;break;case 7:__ZN6Clause15calcAbstractionEv($5);label=8;break;case 8:return;default:assert(0,"bad label: "+label);}}
function __ZNK3vecI3LitEixEi($this,$index){var label=0;var $1;var $2;$1=$this;$2=$index;var $3=$1;var $4=$2;var $5=(($3)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6+($4<<2))|0);return $7;}
function __ZN6Clause15calcAbstractionEv($this){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+8)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $abstraction;var $i;var $2=sp;$1=$this;var $3=$1;$abstraction=0;$i=0;label=2;break;case 2:var $5=$i;var $6=__ZNK6Clause4sizeEv($3);var $7=(($5)|(0))<(($6)|(0));if($7){label=3;break;}else{label=5;break;}
case 3:var $9=$i;var $10=(($3+8)|0);var $11=(($10+($9<<2))|0);var $12=$2;var $13=$11;assert(4%1===0);HEAP32[(($12)>>2)]=HEAP32[(($13)>>2)];var $14=__Z3var3Lit($2);var $15=$14&31;var $16=1<<$15;var $17=$abstraction;var $18=$17|$16;$abstraction=$18;label=4;break;case 4:var $20=$i;var $21=((($20)+(1))|0);$i=$21;label=2;break;case 5:var $23=$abstraction;var $24=(($3+4)|0);var $25=$24;HEAP32[(($25)>>2)]=$23;STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __Z4sortI3Lit16LessThan_defaultIS0_EEvR3vecIT_ET0_($v,$lt){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+8)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$lt;$lt=STACKTOP;STACKTOP=(STACKTOP+1)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);;;HEAP8[($lt)]=HEAP8[(tempParam)];var $1;var $2=sp;$1=$v;var $3=$1;var $4=__ZN3vecI3LitEcvPS0_Ev($3);var $5=$1;var $6=__ZNK3vecI3LitE4sizeEv($5);__Z4sortI3Lit16LessThan_defaultIS0_EEvPT_iT0_($4,$6,$2);STACKTOP=sp;return;}
function __Z4sortI3Lit16LessThan_defaultIS0_EEvPT_iT0_($array,$size,$lt){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+72)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$lt;$lt=STACKTOP;STACKTOP=(STACKTOP+1)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);;;HEAP8[($lt)]=HEAP8[(tempParam)];label=1;while(1)switch(label){case 1:var $1;var $2;var $3=sp;var $pivot=(sp)+(8);var $tmp=(sp)+(16);var $i;var $j;var $4=(sp)+(24);var $5=(sp)+(32);var $6=(sp)+(40);var $7=(sp)+(48);var $8=(sp)+(56);var $9=(sp)+(64);$1=$array;$2=$size;var $10=$2;var $11=(($10)|(0))<=15;if($11){label=2;break;}else{label=3;break;}
case 2:var $13=$1;var $14=$2;__Z13selectionSortI3Lit16LessThan_defaultIS0_EEvPT_iT0_($13,$14,$3);label=14;break;case 3:var $16=$2;var $17=((((($16)|(0)))/(2))&-1);var $18=$1;var $19=(($18+($17<<2))|0);var $20=$pivot;var $21=$19;assert(4%1===0);HEAP32[(($20)>>2)]=HEAP32[(($21)>>2)];__ZN3LitC1Ev($tmp);$i=-1;var $22=$2;$j=$22;label=4;break;case 4:label=5;break;case 5:var $25=$i;var $26=((($25)+(1))|0);$i=$26;label=6;break;case 6:var $28=$i;var $29=$1;var $30=(($29+($28<<2))|0);var $31=$4;var $32=$30;assert(4%1===0);HEAP32[(($31)>>2)]=HEAP32[(($32)>>2)];var $33=$5;var $34=$pivot;assert(4%1===0);HEAP32[(($33)>>2)]=HEAP32[(($34)>>2)];var $35=__ZN16LessThan_defaultI3LitEclES0_S0_($lt,$4,$5);if($35){label=5;break;}else{label=7;break;}
case 7:label=8;break;case 8:var $38=$j;var $39=((($38)-(1))|0);$j=$39;label=9;break;case 9:var $41=$6;var $42=$pivot;assert(4%1===0);HEAP32[(($41)>>2)]=HEAP32[(($42)>>2)];var $43=$j;var $44=$1;var $45=(($44+($43<<2))|0);var $46=$7;var $47=$45;assert(4%1===0);HEAP32[(($46)>>2)]=HEAP32[(($47)>>2)];var $48=__ZN16LessThan_defaultI3LitEclES0_S0_($lt,$6,$7);if($48){label=8;break;}else{label=10;break;}
case 10:var $50=$i;var $51=$j;var $52=(($50)|(0))>=(($51)|(0));if($52){label=11;break;}else{label=12;break;}
case 11:label=13;break;case 12:var $55=$i;var $56=$1;var $57=(($56+($55<<2))|0);var $58=$tmp;var $59=$57;assert(4%1===0);HEAP32[(($58)>>2)]=HEAP32[(($59)>>2)];var $60=$i;var $61=$1;var $62=(($61+($60<<2))|0);var $63=$j;var $64=$1;var $65=(($64+($63<<2))|0);var $66=$62;var $67=$65;assert(4%1===0);HEAP32[(($66)>>2)]=HEAP32[(($67)>>2)];var $68=$j;var $69=$1;var $70=(($69+($68<<2))|0);var $71=$70;var $72=$tmp;assert(4%1===0);HEAP32[(($71)>>2)]=HEAP32[(($72)>>2)];label=4;break;case 13:var $74=$1;var $75=$i;__Z4sortI3Lit16LessThan_defaultIS0_EEvPT_iT0_($74,$75,$8);var $76=$i;var $77=$1;var $78=(($77+($76<<2))|0);var $79=$2;var $80=$i;var $81=((($79)-($80))|0);__Z4sortI3Lit16LessThan_defaultIS0_EEvPT_iT0_($78,$81,$9);label=14;break;case 14:STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZN3vecI3LitEcvPS0_Ev($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2)|0);var $4=HEAP32[(($3)>>2)];return $4;}
function __Z13selectionSortI3Lit16LessThan_defaultIS0_EEvPT_iT0_($array,$size,$lt){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+24)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$lt;$lt=STACKTOP;STACKTOP=(STACKTOP+1)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);;;HEAP8[($lt)]=HEAP8[(tempParam)];label=1;while(1)switch(label){case 1:var $1;var $2;var $i;var $j;var $best_i;var $tmp=sp;var $3=(sp)+(8);var $4=(sp)+(16);$1=$array;$2=$size;__ZN3LitC1Ev($tmp);$i=0;label=2;break;case 2:var $6=$i;var $7=$2;var $8=((($7)-(1))|0);var $9=(($6)|(0))<(($8)|(0));if($9){label=3;break;}else{label=11;break;}
case 3:var $11=$i;$best_i=$11;var $12=$i;var $13=((($12)+(1))|0);$j=$13;label=4;break;case 4:var $15=$j;var $16=$2;var $17=(($15)|(0))<(($16)|(0));if($17){label=5;break;}else{label=9;break;}
case 5:var $19=$j;var $20=$1;var $21=(($20+($19<<2))|0);var $22=$3;var $23=$21;assert(4%1===0);HEAP32[(($22)>>2)]=HEAP32[(($23)>>2)];var $24=$best_i;var $25=$1;var $26=(($25+($24<<2))|0);var $27=$4;var $28=$26;assert(4%1===0);HEAP32[(($27)>>2)]=HEAP32[(($28)>>2)];var $29=__ZN16LessThan_defaultI3LitEclES0_S0_($lt,$3,$4);if($29){label=6;break;}else{label=7;break;}
case 6:var $31=$j;$best_i=$31;label=7;break;case 7:label=8;break;case 8:var $34=$j;var $35=((($34)+(1))|0);$j=$35;label=4;break;case 9:var $37=$i;var $38=$1;var $39=(($38+($37<<2))|0);var $40=$tmp;var $41=$39;assert(4%1===0);HEAP32[(($40)>>2)]=HEAP32[(($41)>>2)];var $42=$i;var $43=$1;var $44=(($43+($42<<2))|0);var $45=$best_i;var $46=$1;var $47=(($46+($45<<2))|0);var $48=$44;var $49=$47;assert(4%1===0);HEAP32[(($48)>>2)]=HEAP32[(($49)>>2)];var $50=$best_i;var $51=$1;var $52=(($51+($50<<2))|0);var $53=$52;var $54=$tmp;assert(4%1===0);HEAP32[(($53)>>2)]=HEAP32[(($54)>>2)];label=10;break;case 10:var $56=$i;var $57=((($56)+(1))|0);$i=$57;label=2;break;case 11:STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZN16LessThan_defaultI3LitEclES0_S0_($this,$x,$y){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+8)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$x;$x=STACKTOP;STACKTOP=(STACKTOP+4)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);HEAP32[(($x)>>2)]=HEAP32[((tempParam)>>2)];var tempParam=$y;$y=STACKTOP;STACKTOP=(STACKTOP+4)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);HEAP32[(($y)>>2)]=HEAP32[((tempParam)>>2)];var $1;var $2=sp;$1=$this;var $3=$1;var $4=$2;var $5=$y;assert(4%1===0);HEAP32[(($4)>>2)]=HEAP32[(($5)>>2)];var $6=__ZNK3LitltES_($x,$2);STACKTOP=sp;return $6;}
function __ZNK3LitltES_($this,$p){var label=0;var sp=STACKTOP;(assert((STACKTOP|0)<(STACK_MAX|0))|0);var tempParam=$p;$p=STACKTOP;STACKTOP=(STACKTOP+4)|0;STACKTOP=((((STACKTOP)+7)>>3)<<3);(assert((STACKTOP|0)<(STACK_MAX|0))|0);HEAP32[(($p)>>2)]=HEAP32[((tempParam)>>2)];var $1;$1=$this;var $2=$1;var $3=(($2)|0);var $4=HEAP32[(($3)>>2)];var $5=(($p)|0);var $6=HEAP32[(($5)>>2)];var $7=(($4)|(0))<(($6)|(0));STACKTOP=sp;return $7;}
function __ZN3vecIdE4imaxEii($x,$y){var label=0;var $1;var $2;var $mask;$1=$x;$2=$y;var $3=$2;var $4=$1;var $5=((($3)-($4))|0);var $6=$5>>31;$mask=$6;var $7=$1;var $8=$mask;var $9=$7&$8;var $10=$2;var $11=$mask;var $12=$11^-1;var $13=$10&$12;var $14=((($9)+($13))|0);return $14;}
function __ZN3vecIcE4imaxEii($x,$y){var label=0;var $1;var $2;var $mask;$1=$x;$2=$y;var $3=$2;var $4=$1;var $5=((($3)-($4))|0);var $6=$5>>31;$mask=$6;var $7=$1;var $8=$mask;var $9=$7&$8;var $10=$2;var $11=$mask;var $12=$11^-1;var $13=$10&$12;var $14=((($9)+($13))|0);return $14;}
function __ZN3vecIP6ClauseE4imaxEii($x,$y){var label=0;var $1;var $2;var $mask;$1=$x;$2=$y;var $3=$2;var $4=$1;var $5=((($3)-($4))|0);var $6=$5>>31;$mask=$6;var $7=$1;var $8=$mask;var $9=$7&$8;var $10=$2;var $11=$mask;var $12=$11^-1;var $13=$10&$12;var $14=((($9)+($13))|0);return $14;}
function __ZN3vecIS_IP6ClauseEE4imaxEii($x,$y){var label=0;var $1;var $2;var $mask;$1=$x;$2=$y;var $3=$2;var $4=$1;var $5=((($3)-($4))|0);var $6=$5>>31;$mask=$6;var $7=$1;var $8=$mask;var $9=$7&$8;var $10=$2;var $11=$mask;var $12=$11^-1;var $13=$10&$12;var $14=((($9)+($13))|0);return $14;}
function __ZN3vecIiED2Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecIiE5clearEb($2,1);return;}
function __ZN3vecIiE5clearEb($this,$dealloc){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;$1=$this;var $3=(($dealloc)&(1));$2=$3;var $4=$1;var $5=(($4)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6)|(0))!=0;if($7){label=2;break;}else{label=9;break;}
case 2:$i=0;label=3;break;case 3:var $10=$i;var $11=(($4+4)|0);var $12=HEAP32[(($11)>>2)];var $13=(($10)|(0))<(($12)|(0));if($13){label=4;break;}else{label=6;break;}
case 4:var $15=$i;var $16=(($4)|0);var $17=HEAP32[(($16)>>2)];var $18=(($17+($15<<2))|0);var $19=HEAP32[(($18)>>2)];label=5;break;case 5:var $21=$i;var $22=((($21)+(1))|0);$i=$22;label=3;break;case 6:var $24=(($4+4)|0);HEAP32[(($24)>>2)]=0;var $25=$2;var $26=(($25)&1);if($26){label=7;break;}else{label=8;break;}
case 7:var $28=(($4)|0);var $29=HEAP32[(($28)>>2)];var $30=$29;_free($30);var $31=(($4)|0);HEAP32[(($31)>>2)]=0;var $32=(($4+8)|0);HEAP32[(($32)>>2)]=0;label=8;break;case 8:label=9;break;case 9:return;default:assert(0,"bad label: "+label);}}
function __ZN3vecIcED2Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecIcE5clearEb($2,1);return;}
function __ZN3vecIcE5clearEb($this,$dealloc){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;$1=$this;var $3=(($dealloc)&(1));$2=$3;var $4=$1;var $5=(($4)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6)|(0))!=0;if($7){label=2;break;}else{label=9;break;}
case 2:$i=0;label=3;break;case 3:var $10=$i;var $11=(($4+4)|0);var $12=HEAP32[(($11)>>2)];var $13=(($10)|(0))<(($12)|(0));if($13){label=4;break;}else{label=6;break;}
case 4:var $15=$i;var $16=(($4)|0);var $17=HEAP32[(($16)>>2)];var $18=(($17+$15)|0);var $19=HEAP8[($18)];label=5;break;case 5:var $21=$i;var $22=((($21)+(1))|0);$i=$22;label=3;break;case 6:var $24=(($4+4)|0);HEAP32[(($24)>>2)]=0;var $25=$2;var $26=(($25)&1);if($26){label=7;break;}else{label=8;break;}
case 7:var $28=(($4)|0);var $29=HEAP32[(($28)>>2)];_free($29);var $30=(($4)|0);HEAP32[(($30)>>2)]=0;var $31=(($4+8)|0);HEAP32[(($31)>>2)]=0;label=8;break;case 8:label=9;break;case 9:return;default:assert(0,"bad label: "+label);}}
function __ZN3vecIS_IP6ClauseEED2Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecIS_IP6ClauseEE5clearEb($2,1);return;}
function __ZN3vecIS_IP6ClauseEE5clearEb($this,$dealloc){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;$1=$this;var $3=(($dealloc)&(1));$2=$3;var $4=$1;var $5=(($4)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6)|(0))!=0;if($7){label=2;break;}else{label=9;break;}
case 2:$i=0;label=3;break;case 3:var $10=$i;var $11=(($4+4)|0);var $12=HEAP32[(($11)>>2)];var $13=(($10)|(0))<(($12)|(0));if($13){label=4;break;}else{label=6;break;}
case 4:var $15=$i;var $16=(($4)|0);var $17=HEAP32[(($16)>>2)];var $18=(($17+((($15)*(12))&-1))|0);__ZN3vecIP6ClauseED1Ev($18);label=5;break;case 5:var $20=$i;var $21=((($20)+(1))|0);$i=$21;label=3;break;case 6:var $23=(($4+4)|0);HEAP32[(($23)>>2)]=0;var $24=$2;var $25=(($24)&1);if($25){label=7;break;}else{label=8;break;}
case 7:var $27=(($4)|0);var $28=HEAP32[(($27)>>2)];var $29=$28;_free($29);var $30=(($4)|0);HEAP32[(($30)>>2)]=0;var $31=(($4+8)|0);HEAP32[(($31)>>2)]=0;label=8;break;case 8:label=9;break;case 9:return;default:assert(0,"bad label: "+label);}}
function __ZN3vecIdED2Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecIdE5clearEb($2,1);return;}
function __ZN3vecIdE5clearEb($this,$dealloc){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;$1=$this;var $3=(($dealloc)&(1));$2=$3;var $4=$1;var $5=(($4)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6)|(0))!=0;if($7){label=2;break;}else{label=9;break;}
case 2:$i=0;label=3;break;case 3:var $10=$i;var $11=(($4+4)|0);var $12=HEAP32[(($11)>>2)];var $13=(($10)|(0))<(($12)|(0));if($13){label=4;break;}else{label=6;break;}
case 4:var $15=$i;var $16=(($4)|0);var $17=HEAP32[(($16)>>2)];var $18=(($17+($15<<3))|0);var $19=HEAPF64[(($18)>>3)];label=5;break;case 5:var $21=$i;var $22=((($21)+(1))|0);$i=$22;label=3;break;case 6:var $24=(($4+4)|0);HEAP32[(($24)>>2)]=0;var $25=$2;var $26=(($25)&1);if($26){label=7;break;}else{label=8;break;}
case 7:var $28=(($4)|0);var $29=HEAP32[(($28)>>2)];var $30=$29;_free($30);var $31=(($4)|0);HEAP32[(($31)>>2)]=0;var $32=(($4+8)|0);HEAP32[(($32)>>2)]=0;label=8;break;case 8:label=9;break;case 9:return;default:assert(0,"bad label: "+label);}}
function __ZN3vecIP6ClauseED2Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecIP6ClauseE5clearEb($2,1);return;}
function __ZN3vecIP6ClauseE5clearEb($this,$dealloc){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $i;$1=$this;var $3=(($dealloc)&(1));$2=$3;var $4=$1;var $5=(($4)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6)|(0))!=0;if($7){label=2;break;}else{label=9;break;}
case 2:$i=0;label=3;break;case 3:var $10=$i;var $11=(($4+4)|0);var $12=HEAP32[(($11)>>2)];var $13=(($10)|(0))<(($12)|(0));if($13){label=4;break;}else{label=6;break;}
case 4:var $15=$i;var $16=(($4)|0);var $17=HEAP32[(($16)>>2)];var $18=(($17+($15<<2))|0);var $19=HEAP32[(($18)>>2)];label=5;break;case 5:var $21=$i;var $22=((($21)+(1))|0);$i=$22;label=3;break;case 6:var $24=(($4+4)|0);HEAP32[(($24)>>2)]=0;var $25=$2;var $26=(($25)&1);if($26){label=7;break;}else{label=8;break;}
case 7:var $28=(($4)|0);var $29=HEAP32[(($28)>>2)];var $30=$29;_free($30);var $31=(($4)|0);HEAP32[(($31)>>2)]=0;var $32=(($4+8)|0);HEAP32[(($32)>>2)]=0;label=8;break;case 8:label=9;break;case 9:return;default:assert(0,"bad label: "+label);}}
function __ZN3vecI5lboolED2Ev($this){var label=0;var $1;$1=$this;var $2=$1;__ZN3vecI5lboolE5clearEb($2,1);return;}
function __ZN3vecIiEC2Ev($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2)|0);HEAP32[(($3)>>2)]=0;var $4=(($2+4)|0);HEAP32[(($4)>>2)]=0;var $5=(($2+8)|0);HEAP32[(($5)>>2)]=0;return;}
function __ZN3vecIcEC2Ev($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2)|0);HEAP32[(($3)>>2)]=0;var $4=(($2+4)|0);HEAP32[(($4)>>2)]=0;var $5=(($2+8)|0);HEAP32[(($5)>>2)]=0;return;}
function __ZN3vecIS_IP6ClauseEEC2Ev($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2)|0);HEAP32[(($3)>>2)]=0;var $4=(($2+4)|0);HEAP32[(($4)>>2)]=0;var $5=(($2+8)|0);HEAP32[(($5)>>2)]=0;return;}
function __ZN3vecIdEC2Ev($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2)|0);HEAP32[(($3)>>2)]=0;var $4=(($2+4)|0);HEAP32[(($4)>>2)]=0;var $5=(($2+8)|0);HEAP32[(($5)>>2)]=0;return;}
function __ZN3vecIP6ClauseEC2Ev($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2)|0);HEAP32[(($3)>>2)]=0;var $4=(($2+4)|0);HEAP32[(($4)>>2)]=0;var $5=(($2+8)|0);HEAP32[(($5)>>2)]=0;return;}
function __ZN3vecI5lboolEC2Ev($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2)|0);HEAP32[(($3)>>2)]=0;var $4=(($2+4)|0);HEAP32[(($4)>>2)]=0;var $5=(($2+8)|0);HEAP32[(($5)>>2)]=0;return;}
function __ZN4HeapIN6Solver10VarOrderLtEEC2ERKS1_($this,$c){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $3;var $4;$1=$this;$2=$c;var $5=$1;var $6=(($5)|0);var $7=$2;var $8=$6;var $9=$7;assert(4%1===0);HEAP32[(($8)>>2)]=HEAP32[(($9)>>2)];var $10=(($5+4)|0);__ZN3vecIiEC1Ev($10);var $11=(($5+16)|0);(function(){try{__THREW__=0;return __ZN3vecIiEC1Ev($11)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=2;break;}else{label=3;break;}
case 2:return;case 3:var $14$0=___cxa_find_matching_catch(-1,-1);$14$1=tempRet0;var $15=$14$0;$3=$15;var $16=$14$1;$4=$16;(function(){try{__THREW__=0;return __ZN3vecIiED1Ev($10)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=4;break;}else{label=6;break;}
case 4:label=5;break;case 5:var $19=$3;var $20=$4;var $21$0=$19;var $21$1=0;var $22$0=$21$0;var $22$1=$20;___resumeException($22$0)
case 6:var $24$0=___cxa_find_matching_catch(-1,-1,0);$24$1=tempRet0;__ZSt9terminatev();throw"Reached an unreachable!";default:assert(0,"bad label: "+label);}}
function __ZN3vecIiE4imaxEii($x,$y){var label=0;var $1;var $2;var $mask;$1=$x;$2=$y;var $3=$2;var $4=$1;var $5=((($3)-($4))|0);var $6=$5>>31;$mask=$6;var $7=$1;var $8=$mask;var $9=$7&$8;var $10=$2;var $11=$mask;var $12=$11^-1;var $13=$10&$12;var $14=((($9)+($13))|0);return $14;}
function __ZNK3vecI5lboolEixEi($this,$index){var label=0;var $1;var $2;$1=$this;$2=$index;var $3=$1;var $4=$2;var $5=(($3)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6+$4)|0);return $7;}
function __ZNK5lbooleoEb($agg_result,$this,$b){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;$1=$this;var $3=(($b)&(1));$2=$3;var $4=$1;var $5=$2;var $6=(($5)&1);if($6){label=2;break;}else{label=3;break;}
case 2:var $8=(($4)|0);var $9=HEAP8[($8)];var $10=(($9<<24)>>24);var $11=(((-$10))|0);__ZN5lboolC1Ei($agg_result,$11);label=4;break;case 3:var $13=(($4)|0);var $14=HEAP8[($13)];var $15=(($14<<24)>>24);__ZN5lboolC1Ei($agg_result,$15);label=4;break;case 4:return;default:assert(0,"bad label: "+label);}}
function __ZN6Solver9VarFilterC2ERKS_($this,$_s){var label=0;var $1;var $2;$1=$this;$2=$_s;var $3=$1;var $4=(($3)|0);var $5=$2;HEAP32[(($4)>>2)]=$5;return;}
function __ZNK3vecIP6ClauseEixEi($this,$index){var label=0;var $1;var $2;$1=$this;$2=$index;var $3=$1;var $4=$2;var $5=(($3)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6+($4<<2))|0);return $7;}
function __ZN5lboolC2Eb($this,$x){var label=0;var $1;var $2;$1=$this;var $3=(($x)&(1));$2=$3;var $4=$1;var $5=(($4)|0);var $6=$2;var $7=(($6)&1);var $8=(($7)&(1));var $9=($8<<1);var $10=((($9)-(1))|0);var $11=(($10)&255);HEAP8[($5)]=$11;return;}
function __ZN3vecIdEixEi($this,$index){var label=0;var $1;var $2;$1=$this;$2=$index;var $3=$1;var $4=$2;var $5=(($3)|0);var $6=HEAP32[(($5)>>2)];var $7=(($6+($4<<3))|0);return $7;}
function __ZNK4HeapIN6Solver10VarOrderLtEE6inHeapEi($this,$n){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;$1=$this;$2=$n;var $3=$1;var $4=$2;var $5=(($3+16)|0);var $6=__ZNK3vecIiE4sizeEv($5);var $7=(($4)|(0))<(($6)|(0));if($7){label=2;break;}else{var $15=0;label=3;break;}
case 2:var $9=(($3+16)|0);var $10=$2;var $11=__ZNK3vecIiEixEi($9,$10);var $12=HEAP32[(($11)>>2)];var $13=(($12)|(0))>=0;var $15=$13;label=3;break;case 3:var $15;return $15;default:assert(0,"bad label: "+label);}}
function __ZN4HeapIN6Solver10VarOrderLtEE8decreaseEi($this,$n){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;$1=$this;$2=$n;var $3=$1;var $4=$2;var $5=__ZNK4HeapIN6Solver10VarOrderLtEE6inHeapEi($3,$4);if($5){var $9=0;label=3;break;}else{label=2;break;}
case 2:___assert_fail(((408)|0),((496)|0),82,((2200)|0));throw"Reached an unreachable!";label=3;break;case 3:var $9;var $10=(($3+16)|0);var $11=$2;var $12=__ZN3vecIiEixEi($10,$11);var $13=HEAP32[(($12)>>2)];__ZN4HeapIN6Solver10VarOrderLtEE11percolateUpEi($3,$13);return;default:assert(0,"bad label: "+label);}}
function __ZN4HeapIN6Solver10VarOrderLtEE11percolateUpEi($this,$i){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $x;$1=$this;$2=$i;var $3=$1;var $4=(($3+4)|0);var $5=$2;var $6=__ZN3vecIiEixEi($4,$5);var $7=HEAP32[(($6)>>2)];$x=$7;label=2;break;case 2:var $9=$2;var $10=(($9)|(0))!=0;if($10){label=3;break;}else{var $21=0;label=4;break;}
case 3:var $12=(($3)|0);var $13=$x;var $14=(($3+4)|0);var $15=$2;var $16=__ZN4HeapIN6Solver10VarOrderLtEE6parentEi($15);var $17=__ZN3vecIiEixEi($14,$16);var $18=HEAP32[(($17)>>2)];var $19=__ZNK6Solver10VarOrderLtclEii($12,$13,$18);var $21=$19;label=4;break;case 4:var $21;if($21){label=5;break;}else{label=6;break;}
case 5:var $23=(($3+4)|0);var $24=$2;var $25=__ZN4HeapIN6Solver10VarOrderLtEE6parentEi($24);var $26=__ZN3vecIiEixEi($23,$25);var $27=HEAP32[(($26)>>2)];var $28=(($3+4)|0);var $29=$2;var $30=__ZN3vecIiEixEi($28,$29);HEAP32[(($30)>>2)]=$27;var $31=$2;var $32=(($3+16)|0);var $33=(($3+4)|0);var $34=$2;var $35=__ZN3vecIiEixEi($33,$34);var $36=HEAP32[(($35)>>2)];var $37=__ZN3vecIiEixEi($32,$36);HEAP32[(($37)>>2)]=$31;var $38=$2;var $39=__ZN4HeapIN6Solver10VarOrderLtEE6parentEi($38);$2=$39;label=2;break;case 6:var $41=$x;var $42=(($3+4)|0);var $43=$2;var $44=__ZN3vecIiEixEi($42,$43);HEAP32[(($44)>>2)]=$41;var $45=$2;var $46=(($3+16)|0);var $47=$x;var $48=__ZN3vecIiEixEi($46,$47);HEAP32[(($48)>>2)]=$45;return;default:assert(0,"bad label: "+label);}}
function __ZN4HeapIN6Solver10VarOrderLtEE6insertEi($this,$n){var label=0;var sp=STACKTOP;STACKTOP=(STACKTOP+16)|0;(assert((STACKTOP|0)<(STACK_MAX|0))|0);label=1;while(1)switch(label){case 1:var $1;var $2=sp;var $3=(sp)+(8);$1=$this;HEAP32[(($2)>>2)]=$n;var $4=$1;var $5=(($4+16)|0);var $6=HEAP32[(($2)>>2)];var $7=((($6)+(1))|0);HEAP32[(($3)>>2)]=-1;__ZN3vecIiE6growToEiRKi($5,$7,$3);var $8=HEAP32[(($2)>>2)];var $9=__ZNK4HeapIN6Solver10VarOrderLtEE6inHeapEi($4,$8);if($9){label=2;break;}else{var $13=0;label=3;break;}
case 2:___assert_fail(((392)|0),((496)|0),91,((2216)|0));throw"Reached an unreachable!";label=3;break;case 3:var $13;var $14=(($4+4)|0);var $15=__ZNK3vecIiE4sizeEv($14);var $16=(($4+16)|0);var $17=HEAP32[(($2)>>2)];var $18=__ZN3vecIiEixEi($16,$17);HEAP32[(($18)>>2)]=$15;var $19=(($4+4)|0);__ZN3vecIiE4pushERKi($19,$2);var $20=(($4+16)|0);var $21=HEAP32[(($2)>>2)];var $22=__ZN3vecIiEixEi($20,$21);var $23=HEAP32[(($22)>>2)];__ZN4HeapIN6Solver10VarOrderLtEE11percolateUpEi($4,$23);STACKTOP=sp;return;default:assert(0,"bad label: "+label);}}
function __ZN3vecIiE6growToEiRKi($this,$size,$pad){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $3;var $i;$1=$this;$2=$size;$3=$pad;var $4=$1;var $5=(($4+4)|0);var $6=HEAP32[(($5)>>2)];var $7=$2;var $8=(($6)|(0))>=(($7)|(0));if($8){label=2;break;}else{label=3;break;}
case 2:label=10;break;case 3:var $11=$2;__ZN3vecIiE4growEi($4,$11);var $12=(($4+4)|0);var $13=HEAP32[(($12)>>2)];$i=$13;label=4;break;case 4:var $15=$i;var $16=$2;var $17=(($15)|(0))<(($16)|(0));if($17){label=5;break;}else{label=9;break;}
case 5:var $19=$i;var $20=(($4)|0);var $21=HEAP32[(($20)>>2)];var $22=(($21+($19<<2))|0);var $23=$22;var $24=(($23)|(0))==0;if($24){var $30=0;label=7;break;}else{label=6;break;}
case 6:var $26=$23;var $27=$3;var $28=HEAP32[(($27)>>2)];HEAP32[(($26)>>2)]=$28;var $30=$26;label=7;break;case 7:var $30;label=8;break;case 8:var $32=$i;var $33=((($32)+(1))|0);$i=$33;label=4;break;case 9:var $35=$2;var $36=(($4+4)|0);HEAP32[(($36)>>2)]=$35;label=10;break;case 10:return;default:assert(0,"bad label: "+label);}}
function __ZN3vecIiE4growEi($this,$min_cap){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;$1=$this;$2=$min_cap;var $3=$1;var $4=$2;var $5=(($3+8)|0);var $6=HEAP32[(($5)>>2)];var $7=(($4)|(0))<=(($6)|(0));if($7){label=2;break;}else{label=3;break;}
case 2:label=13;break;case 3:var $10=(($3+8)|0);var $11=HEAP32[(($10)>>2)];var $12=(($11)|(0))==0;if($12){label=4;break;}else{label=8;break;}
case 4:var $14=$2;var $15=(($14)|(0))>=2;if($15){label=5;break;}else{label=6;break;}
case 5:var $17=$2;var $20=$17;label=7;break;case 6:var $20=2;label=7;break;case 7:var $20;var $21=(($3+8)|0);HEAP32[(($21)>>2)]=$20;label=12;break;case 8:label=9;break;case 9:var $24=(($3+8)|0);var $25=HEAP32[(($24)>>2)];var $26=((($25)*(3))&-1);var $27=((($26)+(1))|0);var $28=$27>>1;var $29=(($3+8)|0);HEAP32[(($29)>>2)]=$28;label=10;break;case 10:var $31=(($3+8)|0);var $32=HEAP32[(($31)>>2)];var $33=$2;var $34=(($32)|(0))<(($33)|(0));if($34){label=9;break;}else{label=11;break;}
case 11:label=12;break;case 12:var $37=(($3)|0);var $38=HEAP32[(($37)>>2)];var $39=$38;var $40=(($3+8)|0);var $41=HEAP32[(($40)>>2)];var $42=($41<<2);var $43=_realloc($39,$42);var $44=$43;var $45=(($3)|0);HEAP32[(($45)>>2)]=$44;label=13;break;case 13:return;default:assert(0,"bad label: "+label);}}
function __ZNK5lbool5toIntEv($this){var label=0;var $1;$1=$this;var $2=$1;var $3=(($2)|0);var $4=HEAP8[($3)];var $5=(($4<<24)>>24);return $5;}
function __ZN4HeapIN6Solver10VarOrderLtEED2Ev($this){var label=0;label=1;while(1)switch(label){case 1:var $1;var $2;var $3;$1=$this;var $4=$1;var $5=(($4+16)|0);(function(){try{__THREW__=0;return __ZN3vecIiED1Ev($5)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=2;break;}else{label=3;break;}
case 2:var $7=(($4+4)|0);__ZN3vecIiED1Ev($7);return;case 3:var $9$0=___cxa_find_matching_catch(-1,-1);$9$1=tempRet0;var $10=$9$0;$2=$10;var $11=$9$1;$3=$11;var $12=(($4+4)|0);(function(){try{__THREW__=0;return __ZN3vecIiED1Ev($12)}catch(e){if(typeof e!="number")throw e;if(ABORT)throw e;__THREW__=1;return null}})();if(!__THREW__){label=4;break;}else{label=6;break;}
case 4:label=5;break;case 5:var $15=$2;var $16=$3;var $17$0=$15;var $17$1=0;var $18$0=$17$0;var $18$1=$16;___resumeException($18$0)
case 6:var $20$0=___cxa_find_matching_catch(-1,-1,0);$20$1=tempRet0;__ZSt9terminatev();throw"Reached an unreachable!";default:assert(0,"bad label: "+label);}}
function __ZN6Solver10VarOrderLtC2ERK3vecIdE($this,$act){var label=0;var $1;var $2;$1=$this;$2=$act;var $3=$1;var $4=(($3)|0);var $5=$2;HEAP32[(($4)>>2)]=$5;return;}
function __GLOBAL__I_a85(){var label=0;___cxx_global_var_init72();___cxx_global_var_init173();___cxx_global_var_init274();___cxx_global_var_init375();___cxx_global_var_init476();return;}
function _malloc($bytes){var label=0;label=1;while(1)switch(label){case 1:var $1=(($bytes)>>>(0))<245;if($1){label=2;break;}else{label=78;break;}
case 2:var $3=(($bytes)>>>(0))<11;if($3){var $8=16;label=4;break;}else{label=3;break;}
case 3:var $5=((($bytes)+(11))|0);var $6=$5&-8;var $8=$6;label=4;break;case 4:var $8;var $9=$8>>>3;var $10=HEAP32[((((2296)|0))>>2)];var $11=$10>>>(($9)>>>(0));var $12=$11&3;var $13=(($12)|(0))==0;if($13){label=12;break;}else{label=5;break;}
case 5:var $15=$11&1;var $16=$15^1;var $17=((($16)+($9))|0);var $18=$17<<1;var $19=((2336+($18<<2))|0);var $20=$19;var $_sum111=((($18)+(2))|0);var $21=((2336+($_sum111<<2))|0);var $22=HEAP32[(($21)>>2)];var $23=(($22+8)|0);var $24=HEAP32[(($23)>>2)];var $25=(($20)|(0))==(($24)|(0));if($25){label=6;break;}else{label=7;break;}
case 6:var $27=1<<$17;var $28=$27^-1;var $29=$10&$28;HEAP32[((((2296)|0))>>2)]=$29;label=11;break;case 7:var $31=$24;var $32=HEAP32[((((2312)|0))>>2)];var $33=(($31)>>>(0))<(($32)>>>(0));if($33){label=10;break;}else{label=8;break;}
case 8:var $35=(($24+12)|0);var $36=HEAP32[(($35)>>2)];var $37=(($36)|(0))==(($22)|(0));if($37){label=9;break;}else{label=10;break;}
case 9:HEAP32[(($35)>>2)]=$20;HEAP32[(($21)>>2)]=$24;label=11;break;case 10:_abort();throw"Reached an unreachable!";case 11:var $40=$17<<3;var $41=$40|3;var $42=(($22+4)|0);HEAP32[(($42)>>2)]=$41;var $43=$22;var $_sum113114=$40|4;var $44=(($43+$_sum113114)|0);var $45=$44;var $46=HEAP32[(($45)>>2)];var $47=$46|1;HEAP32[(($45)>>2)]=$47;var $48=$23;var $mem_0=$48;label=341;break;case 12:var $50=HEAP32[((((2304)|0))>>2)];var $51=(($8)>>>(0))>(($50)>>>(0));if($51){label=13;break;}else{var $nb_0=$8;label=160;break;}
case 13:var $53=(($11)|(0))==0;if($53){label=27;break;}else{label=14;break;}
case 14:var $55=$11<<$9;var $56=2<<$9;var $57=(((-$56))|0);var $58=$56|$57;var $59=$55&$58;var $60=(((-$59))|0);var $61=$59&$60;var $62=((($61)-(1))|0);var $63=$62>>>12;var $64=$63&16;var $65=$62>>>(($64)>>>(0));var $66=$65>>>5;var $67=$66&8;var $68=$67|$64;var $69=$65>>>(($67)>>>(0));var $70=$69>>>2;var $71=$70&4;var $72=$68|$71;var $73=$69>>>(($71)>>>(0));var $74=$73>>>1;var $75=$74&2;var $76=$72|$75;var $77=$73>>>(($75)>>>(0));var $78=$77>>>1;var $79=$78&1;var $80=$76|$79;var $81=$77>>>(($79)>>>(0));var $82=((($80)+($81))|0);var $83=$82<<1;var $84=((2336+($83<<2))|0);var $85=$84;var $_sum104=((($83)+(2))|0);var $86=((2336+($_sum104<<2))|0);var $87=HEAP32[(($86)>>2)];var $88=(($87+8)|0);var $89=HEAP32[(($88)>>2)];var $90=(($85)|(0))==(($89)|(0));if($90){label=15;break;}else{label=16;break;}
case 15:var $92=1<<$82;var $93=$92^-1;var $94=$10&$93;HEAP32[((((2296)|0))>>2)]=$94;label=20;break;case 16:var $96=$89;var $97=HEAP32[((((2312)|0))>>2)];var $98=(($96)>>>(0))<(($97)>>>(0));if($98){label=19;break;}else{label=17;break;}
case 17:var $100=(($89+12)|0);var $101=HEAP32[(($100)>>2)];var $102=(($101)|(0))==(($87)|(0));if($102){label=18;break;}else{label=19;break;}
case 18:HEAP32[(($100)>>2)]=$85;HEAP32[(($86)>>2)]=$89;label=20;break;case 19:_abort();throw"Reached an unreachable!";case 20:var $105=$82<<3;var $106=((($105)-($8))|0);var $107=$8|3;var $108=(($87+4)|0);HEAP32[(($108)>>2)]=$107;var $109=$87;var $110=(($109+$8)|0);var $111=$110;var $112=$106|1;var $_sum106107=$8|4;var $113=(($109+$_sum106107)|0);var $114=$113;HEAP32[(($114)>>2)]=$112;var $115=(($109+$105)|0);var $116=$115;HEAP32[(($116)>>2)]=$106;var $117=HEAP32[((((2304)|0))>>2)];var $118=(($117)|(0))==0;if($118){label=26;break;}else{label=21;break;}
case 21:var $120=HEAP32[((((2316)|0))>>2)];var $121=$117>>>3;var $122=$121<<1;var $123=((2336+($122<<2))|0);var $124=$123;var $125=HEAP32[((((2296)|0))>>2)];var $126=1<<$121;var $127=$125&$126;var $128=(($127)|(0))==0;if($128){label=22;break;}else{label=23;break;}
case 22:var $130=$125|$126;HEAP32[((((2296)|0))>>2)]=$130;var $_sum109_pre=((($122)+(2))|0);var $_pre=((2336+($_sum109_pre<<2))|0);var $F4_0=$124;var $_pre_phi=$_pre;label=25;break;case 23:var $_sum110=((($122)+(2))|0);var $132=((2336+($_sum110<<2))|0);var $133=HEAP32[(($132)>>2)];var $134=$133;var $135=HEAP32[((((2312)|0))>>2)];var $136=(($134)>>>(0))<(($135)>>>(0));if($136){label=24;break;}else{var $F4_0=$133;var $_pre_phi=$132;label=25;break;}
case 24:_abort();throw"Reached an unreachable!";case 25:var $_pre_phi;var $F4_0;HEAP32[(($_pre_phi)>>2)]=$120;var $139=(($F4_0+12)|0);HEAP32[(($139)>>2)]=$120;var $140=(($120+8)|0);HEAP32[(($140)>>2)]=$F4_0;var $141=(($120+12)|0);HEAP32[(($141)>>2)]=$124;label=26;break;case 26:HEAP32[((((2304)|0))>>2)]=$106;HEAP32[((((2316)|0))>>2)]=$111;var $143=$88;var $mem_0=$143;label=341;break;case 27:var $145=HEAP32[((((2300)|0))>>2)];var $146=(($145)|(0))==0;if($146){var $nb_0=$8;label=160;break;}else{label=28;break;}
case 28:var $148=(((-$145))|0);var $149=$145&$148;var $150=((($149)-(1))|0);var $151=$150>>>12;var $152=$151&16;var $153=$150>>>(($152)>>>(0));var $154=$153>>>5;var $155=$154&8;var $156=$155|$152;var $157=$153>>>(($155)>>>(0));var $158=$157>>>2;var $159=$158&4;var $160=$156|$159;var $161=$157>>>(($159)>>>(0));var $162=$161>>>1;var $163=$162&2;var $164=$160|$163;var $165=$161>>>(($163)>>>(0));var $166=$165>>>1;var $167=$166&1;var $168=$164|$167;var $169=$165>>>(($167)>>>(0));var $170=((($168)+($169))|0);var $171=((2600+($170<<2))|0);var $172=HEAP32[(($171)>>2)];var $173=(($172+4)|0);var $174=HEAP32[(($173)>>2)];var $175=$174&-8;var $176=((($175)-($8))|0);var $t_0_i=$172;var $v_0_i=$172;var $rsize_0_i=$176;label=29;break;case 29:var $rsize_0_i;var $v_0_i;var $t_0_i;var $178=(($t_0_i+16)|0);var $179=HEAP32[(($178)>>2)];var $180=(($179)|(0))==0;if($180){label=30;break;}else{var $185=$179;label=31;break;}
case 30:var $182=(($t_0_i+20)|0);var $183=HEAP32[(($182)>>2)];var $184=(($183)|(0))==0;if($184){label=32;break;}else{var $185=$183;label=31;break;}
case 31:var $185;var $186=(($185+4)|0);var $187=HEAP32[(($186)>>2)];var $188=$187&-8;var $189=((($188)-($8))|0);var $190=(($189)>>>(0))<(($rsize_0_i)>>>(0));var $_rsize_0_i=$190?$189:$rsize_0_i;var $_v_0_i=$190?$185:$v_0_i;var $t_0_i=$185;var $v_0_i=$_v_0_i;var $rsize_0_i=$_rsize_0_i;label=29;break;case 32:var $192=$v_0_i;var $193=HEAP32[((((2312)|0))>>2)];var $194=(($192)>>>(0))<(($193)>>>(0));if($194){label=76;break;}else{label=33;break;}
case 33:var $196=(($192+$8)|0);var $197=$196;var $198=(($192)>>>(0))<(($196)>>>(0));if($198){label=34;break;}else{label=76;break;}
case 34:var $200=(($v_0_i+24)|0);var $201=HEAP32[(($200)>>2)];var $202=(($v_0_i+12)|0);var $203=HEAP32[(($202)>>2)];var $204=(($203)|(0))==(($v_0_i)|(0));if($204){label=40;break;}else{label=35;break;}
case 35:var $206=(($v_0_i+8)|0);var $207=HEAP32[(($206)>>2)];var $208=$207;var $209=(($208)>>>(0))<(($193)>>>(0));if($209){label=39;break;}else{label=36;break;}
case 36:var $211=(($207+12)|0);var $212=HEAP32[(($211)>>2)];var $213=(($212)|(0))==(($v_0_i)|(0));if($213){label=37;break;}else{label=39;break;}
case 37:var $215=(($203+8)|0);var $216=HEAP32[(($215)>>2)];var $217=(($216)|(0))==(($v_0_i)|(0));if($217){label=38;break;}else{label=39;break;}
case 38:HEAP32[(($211)>>2)]=$203;HEAP32[(($215)>>2)]=$207;var $R_1_i=$203;label=47;break;case 39:_abort();throw"Reached an unreachable!";case 40:var $220=(($v_0_i+20)|0);var $221=HEAP32[(($220)>>2)];var $222=(($221)|(0))==0;if($222){label=41;break;}else{var $R_0_i=$221;var $RP_0_i=$220;label=42;break;}
case 41:var $224=(($v_0_i+16)|0);var $225=HEAP32[(($224)>>2)];var $226=(($225)|(0))==0;if($226){var $R_1_i=0;label=47;break;}else{var $R_0_i=$225;var $RP_0_i=$224;label=42;break;}
case 42:var $RP_0_i;var $R_0_i;var $227=(($R_0_i+20)|0);var $228=HEAP32[(($227)>>2)];var $229=(($228)|(0))==0;if($229){label=43;break;}else{var $R_0_i=$228;var $RP_0_i=$227;label=42;break;}
case 43:var $231=(($R_0_i+16)|0);var $232=HEAP32[(($231)>>2)];var $233=(($232)|(0))==0;if($233){label=44;break;}else{var $R_0_i=$232;var $RP_0_i=$231;label=42;break;}
case 44:var $235=$RP_0_i;var $236=(($235)>>>(0))<(($193)>>>(0));if($236){label=46;break;}else{label=45;break;}
case 45:HEAP32[(($RP_0_i)>>2)]=0;var $R_1_i=$R_0_i;label=47;break;case 46:_abort();throw"Reached an unreachable!";case 47:var $R_1_i;var $240=(($201)|(0))==0;if($240){label=67;break;}else{label=48;break;}
case 48:var $242=(($v_0_i+28)|0);var $243=HEAP32[(($242)>>2)];var $244=((2600+($243<<2))|0);var $245=HEAP32[(($244)>>2)];var $246=(($v_0_i)|(0))==(($245)|(0));if($246){label=49;break;}else{label=51;break;}
case 49:HEAP32[(($244)>>2)]=$R_1_i;var $cond_i=(($R_1_i)|(0))==0;if($cond_i){label=50;break;}else{label=57;break;}
case 50:var $248=HEAP32[(($242)>>2)];var $249=1<<$248;var $250=$249^-1;var $251=HEAP32[((((2300)|0))>>2)];var $252=$251&$250;HEAP32[((((2300)|0))>>2)]=$252;label=67;break;case 51:var $254=$201;var $255=HEAP32[((((2312)|0))>>2)];var $256=(($254)>>>(0))<(($255)>>>(0));if($256){label=55;break;}else{label=52;break;}
case 52:var $258=(($201+16)|0);var $259=HEAP32[(($258)>>2)];var $260=(($259)|(0))==(($v_0_i)|(0));if($260){label=53;break;}else{label=54;break;}
case 53:HEAP32[(($258)>>2)]=$R_1_i;label=56;break;case 54:var $263=(($201+20)|0);HEAP32[(($263)>>2)]=$R_1_i;label=56;break;case 55:_abort();throw"Reached an unreachable!";case 56:var $266=(($R_1_i)|(0))==0;if($266){label=67;break;}else{label=57;break;}
case 57:var $268=$R_1_i;var $269=HEAP32[((((2312)|0))>>2)];var $270=(($268)>>>(0))<(($269)>>>(0));if($270){label=66;break;}else{label=58;break;}
case 58:var $272=(($R_1_i+24)|0);HEAP32[(($272)>>2)]=$201;var $273=(($v_0_i+16)|0);var $274=HEAP32[(($273)>>2)];var $275=(($274)|(0))==0;if($275){label=62;break;}else{label=59;break;}
case 59:var $277=$274;var $278=HEAP32[((((2312)|0))>>2)];var $279=(($277)>>>(0))<(($278)>>>(0));if($279){label=61;break;}else{label=60;break;}
case 60:var $281=(($R_1_i+16)|0);HEAP32[(($281)>>2)]=$274;var $282=(($274+24)|0);HEAP32[(($282)>>2)]=$R_1_i;label=62;break;case 61:_abort();throw"Reached an unreachable!";case 62:var $285=(($v_0_i+20)|0);var $286=HEAP32[(($285)>>2)];var $287=(($286)|(0))==0;if($287){label=67;break;}else{label=63;break;}
case 63:var $289=$286;var $290=HEAP32[((((2312)|0))>>2)];var $291=(($289)>>>(0))<(($290)>>>(0));if($291){label=65;break;}else{label=64;break;}
case 64:var $293=(($R_1_i+20)|0);HEAP32[(($293)>>2)]=$286;var $294=(($286+24)|0);HEAP32[(($294)>>2)]=$R_1_i;label=67;break;case 65:_abort();throw"Reached an unreachable!";case 66:_abort();throw"Reached an unreachable!";case 67:var $298=(($rsize_0_i)>>>(0))<16;if($298){label=68;break;}else{label=69;break;}
case 68:var $300=((($rsize_0_i)+($8))|0);var $301=$300|3;var $302=(($v_0_i+4)|0);HEAP32[(($302)>>2)]=$301;var $_sum4_i=((($300)+(4))|0);var $303=(($192+$_sum4_i)|0);var $304=$303;var $305=HEAP32[(($304)>>2)];var $306=$305|1;HEAP32[(($304)>>2)]=$306;label=77;break;case 69:var $308=$8|3;var $309=(($v_0_i+4)|0);HEAP32[(($309)>>2)]=$308;var $310=$rsize_0_i|1;var $_sum_i137=$8|4;var $311=(($192+$_sum_i137)|0);var $312=$311;HEAP32[(($312)>>2)]=$310;var $_sum1_i=((($rsize_0_i)+($8))|0);var $313=(($192+$_sum1_i)|0);var $314=$313;HEAP32[(($314)>>2)]=$rsize_0_i;var $315=HEAP32[((((2304)|0))>>2)];var $316=(($315)|(0))==0;if($316){label=75;break;}else{label=70;break;}
case 70:var $318=HEAP32[((((2316)|0))>>2)];var $319=$315>>>3;var $320=$319<<1;var $321=((2336+($320<<2))|0);var $322=$321;var $323=HEAP32[((((2296)|0))>>2)];var $324=1<<$319;var $325=$323&$324;var $326=(($325)|(0))==0;if($326){label=71;break;}else{label=72;break;}
case 71:var $328=$323|$324;HEAP32[((((2296)|0))>>2)]=$328;var $_sum2_pre_i=((($320)+(2))|0);var $_pre_i=((2336+($_sum2_pre_i<<2))|0);var $F1_0_i=$322;var $_pre_phi_i=$_pre_i;label=74;break;case 72:var $_sum3_i=((($320)+(2))|0);var $330=((2336+($_sum3_i<<2))|0);var $331=HEAP32[(($330)>>2)];var $332=$331;var $333=HEAP32[((((2312)|0))>>2)];var $334=(($332)>>>(0))<(($333)>>>(0));if($334){label=73;break;}else{var $F1_0_i=$331;var $_pre_phi_i=$330;label=74;break;}
case 73:_abort();throw"Reached an unreachable!";case 74:var $_pre_phi_i;var $F1_0_i;HEAP32[(($_pre_phi_i)>>2)]=$318;var $337=(($F1_0_i+12)|0);HEAP32[(($337)>>2)]=$318;var $338=(($318+8)|0);HEAP32[(($338)>>2)]=$F1_0_i;var $339=(($318+12)|0);HEAP32[(($339)>>2)]=$322;label=75;break;case 75:HEAP32[((((2304)|0))>>2)]=$rsize_0_i;HEAP32[((((2316)|0))>>2)]=$197;label=77;break;case 76:_abort();throw"Reached an unreachable!";case 77:var $342=(($v_0_i+8)|0);var $343=$342;var $344=(($342)|(0))==0;if($344){var $nb_0=$8;label=160;break;}else{var $mem_0=$343;label=341;break;}
case 78:var $346=(($bytes)>>>(0))>4294967231;if($346){var $nb_0=-1;label=160;break;}else{label=79;break;}
case 79:var $348=((($bytes)+(11))|0);var $349=$348&-8;var $350=HEAP32[((((2300)|0))>>2)];var $351=(($350)|(0))==0;if($351){var $nb_0=$349;label=160;break;}else{label=80;break;}
case 80:var $353=(((-$349))|0);var $354=$348>>>8;var $355=(($354)|(0))==0;if($355){var $idx_0_i=0;label=83;break;}else{label=81;break;}
case 81:var $357=(($349)>>>(0))>16777215;if($357){var $idx_0_i=31;label=83;break;}else{label=82;break;}
case 82:var $359=((($354)+(1048320))|0);var $360=$359>>>16;var $361=$360&8;var $362=$354<<$361;var $363=((($362)+(520192))|0);var $364=$363>>>16;var $365=$364&4;var $366=$365|$361;var $367=$362<<$365;var $368=((($367)+(245760))|0);var $369=$368>>>16;var $370=$369&2;var $371=$366|$370;var $372=(((14)-($371))|0);var $373=$367<<$370;var $374=$373>>>15;var $375=((($372)+($374))|0);var $376=$375<<1;var $377=((($375)+(7))|0);var $378=$349>>>(($377)>>>(0));var $379=$378&1;var $380=$379|$376;var $idx_0_i=$380;label=83;break;case 83:var $idx_0_i;var $382=((2600+($idx_0_i<<2))|0);var $383=HEAP32[(($382)>>2)];var $384=(($383)|(0))==0;if($384){var $v_2_i=0;var $rsize_2_i=$353;var $t_1_i=0;label=90;break;}else{label=84;break;}
case 84:var $386=(($idx_0_i)|(0))==31;if($386){var $391=0;label=86;break;}else{label=85;break;}
case 85:var $388=$idx_0_i>>>1;var $389=(((25)-($388))|0);var $391=$389;label=86;break;case 86:var $391;var $392=$349<<$391;var $v_0_i118=0;var $rsize_0_i117=$353;var $t_0_i116=$383;var $sizebits_0_i=$392;var $rst_0_i=0;label=87;break;case 87:var $rst_0_i;var $sizebits_0_i;var $t_0_i116;var $rsize_0_i117;var $v_0_i118;var $394=(($t_0_i116+4)|0);var $395=HEAP32[(($394)>>2)];var $396=$395&-8;var $397=((($396)-($349))|0);var $398=(($397)>>>(0))<(($rsize_0_i117)>>>(0));if($398){label=88;break;}else{var $v_1_i=$v_0_i118;var $rsize_1_i=$rsize_0_i117;label=89;break;}
case 88:var $400=(($396)|(0))==(($349)|(0));if($400){var $v_2_i=$t_0_i116;var $rsize_2_i=$397;var $t_1_i=$t_0_i116;label=90;break;}else{var $v_1_i=$t_0_i116;var $rsize_1_i=$397;label=89;break;}
case 89:var $rsize_1_i;var $v_1_i;var $402=(($t_0_i116+20)|0);var $403=HEAP32[(($402)>>2)];var $404=$sizebits_0_i>>>31;var $405=(($t_0_i116+16+($404<<2))|0);var $406=HEAP32[(($405)>>2)];var $407=(($403)|(0))==0;var $408=(($403)|(0))==(($406)|(0));var $or_cond_i=$407|$408;var $rst_1_i=$or_cond_i?$rst_0_i:$403;var $409=(($406)|(0))==0;var $410=$sizebits_0_i<<1;if($409){var $v_2_i=$v_1_i;var $rsize_2_i=$rsize_1_i;var $t_1_i=$rst_1_i;label=90;break;}else{var $v_0_i118=$v_1_i;var $rsize_0_i117=$rsize_1_i;var $t_0_i116=$406;var $sizebits_0_i=$410;var $rst_0_i=$rst_1_i;label=87;break;}
case 90:var $t_1_i;var $rsize_2_i;var $v_2_i;var $411=(($t_1_i)|(0))==0;var $412=(($v_2_i)|(0))==0;var $or_cond21_i=$411&$412;if($or_cond21_i){label=91;break;}else{var $t_2_ph_i=$t_1_i;label=93;break;}
case 91:var $414=2<<$idx_0_i;var $415=(((-$414))|0);var $416=$414|$415;var $417=$350&$416;var $418=(($417)|(0))==0;if($418){var $nb_0=$349;label=160;break;}else{label=92;break;}
case 92:var $420=(((-$417))|0);var $421=$417&$420;var $422=((($421)-(1))|0);var $423=$422>>>12;var $424=$423&16;var $425=$422>>>(($424)>>>(0));var $426=$425>>>5;var $427=$426&8;var $428=$427|$424;var $429=$425>>>(($427)>>>(0));var $430=$429>>>2;var $431=$430&4;var $432=$428|$431;var $433=$429>>>(($431)>>>(0));var $434=$433>>>1;var $435=$434&2;var $436=$432|$435;var $437=$433>>>(($435)>>>(0));var $438=$437>>>1;var $439=$438&1;var $440=$436|$439;var $441=$437>>>(($439)>>>(0));var $442=((($440)+($441))|0);var $443=((2600+($442<<2))|0);var $444=HEAP32[(($443)>>2)];var $t_2_ph_i=$444;label=93;break;case 93:var $t_2_ph_i;var $445=(($t_2_ph_i)|(0))==0;if($445){var $rsize_3_lcssa_i=$rsize_2_i;var $v_3_lcssa_i=$v_2_i;label=96;break;}else{var $t_228_i=$t_2_ph_i;var $rsize_329_i=$rsize_2_i;var $v_330_i=$v_2_i;label=94;break;}
case 94:var $v_330_i;var $rsize_329_i;var $t_228_i;var $446=(($t_228_i+4)|0);var $447=HEAP32[(($446)>>2)];var $448=$447&-8;var $449=((($448)-($349))|0);var $450=(($449)>>>(0))<(($rsize_329_i)>>>(0));var $_rsize_3_i=$450?$449:$rsize_329_i;var $t_2_v_3_i=$450?$t_228_i:$v_330_i;var $451=(($t_228_i+16)|0);var $452=HEAP32[(($451)>>2)];var $453=(($452)|(0))==0;if($453){label=95;break;}else{var $t_228_i=$452;var $rsize_329_i=$_rsize_3_i;var $v_330_i=$t_2_v_3_i;label=94;break;}
case 95:var $454=(($t_228_i+20)|0);var $455=HEAP32[(($454)>>2)];var $456=(($455)|(0))==0;if($456){var $rsize_3_lcssa_i=$_rsize_3_i;var $v_3_lcssa_i=$t_2_v_3_i;label=96;break;}else{var $t_228_i=$455;var $rsize_329_i=$_rsize_3_i;var $v_330_i=$t_2_v_3_i;label=94;break;}
case 96:var $v_3_lcssa_i;var $rsize_3_lcssa_i;var $457=(($v_3_lcssa_i)|(0))==0;if($457){var $nb_0=$349;label=160;break;}else{label=97;break;}
case 97:var $459=HEAP32[((((2304)|0))>>2)];var $460=((($459)-($349))|0);var $461=(($rsize_3_lcssa_i)>>>(0))<(($460)>>>(0));if($461){label=98;break;}else{var $nb_0=$349;label=160;break;}
case 98:var $463=$v_3_lcssa_i;var $464=HEAP32[((((2312)|0))>>2)];var $465=(($463)>>>(0))<(($464)>>>(0));if($465){label=158;break;}else{label=99;break;}
case 99:var $467=(($463+$349)|0);var $468=$467;var $469=(($463)>>>(0))<(($467)>>>(0));if($469){label=100;break;}else{label=158;break;}
case 100:var $471=(($v_3_lcssa_i+24)|0);var $472=HEAP32[(($471)>>2)];var $473=(($v_3_lcssa_i+12)|0);var $474=HEAP32[(($473)>>2)];var $475=(($474)|(0))==(($v_3_lcssa_i)|(0));if($475){label=106;break;}else{label=101;break;}
case 101:var $477=(($v_3_lcssa_i+8)|0);var $478=HEAP32[(($477)>>2)];var $479=$478;var $480=(($479)>>>(0))<(($464)>>>(0));if($480){label=105;break;}else{label=102;break;}
case 102:var $482=(($478+12)|0);var $483=HEAP32[(($482)>>2)];var $484=(($483)|(0))==(($v_3_lcssa_i)|(0));if($484){label=103;break;}else{label=105;break;}
case 103:var $486=(($474+8)|0);var $487=HEAP32[(($486)>>2)];var $488=(($487)|(0))==(($v_3_lcssa_i)|(0));if($488){label=104;break;}else{label=105;break;}
case 104:HEAP32[(($482)>>2)]=$474;HEAP32[(($486)>>2)]=$478;var $R_1_i122=$474;label=113;break;case 105:_abort();throw"Reached an unreachable!";case 106:var $491=(($v_3_lcssa_i+20)|0);var $492=HEAP32[(($491)>>2)];var $493=(($492)|(0))==0;if($493){label=107;break;}else{var $R_0_i120=$492;var $RP_0_i119=$491;label=108;break;}
case 107:var $495=(($v_3_lcssa_i+16)|0);var $496=HEAP32[(($495)>>2)];var $497=(($496)|(0))==0;if($497){var $R_1_i122=0;label=113;break;}else{var $R_0_i120=$496;var $RP_0_i119=$495;label=108;break;}
case 108:var $RP_0_i119;var $R_0_i120;var $498=(($R_0_i120+20)|0);var $499=HEAP32[(($498)>>2)];var $500=(($499)|(0))==0;if($500){label=109;break;}else{var $R_0_i120=$499;var $RP_0_i119=$498;label=108;break;}
case 109:var $502=(($R_0_i120+16)|0);var $503=HEAP32[(($502)>>2)];var $504=(($503)|(0))==0;if($504){label=110;break;}else{var $R_0_i120=$503;var $RP_0_i119=$502;label=108;break;}
case 110:var $506=$RP_0_i119;var $507=(($506)>>>(0))<(($464)>>>(0));if($507){label=112;break;}else{label=111;break;}
case 111:HEAP32[(($RP_0_i119)>>2)]=0;var $R_1_i122=$R_0_i120;label=113;break;case 112:_abort();throw"Reached an unreachable!";case 113:var $R_1_i122;var $511=(($472)|(0))==0;if($511){label=133;break;}else{label=114;break;}
case 114:var $513=(($v_3_lcssa_i+28)|0);var $514=HEAP32[(($513)>>2)];var $515=((2600+($514<<2))|0);var $516=HEAP32[(($515)>>2)];var $517=(($v_3_lcssa_i)|(0))==(($516)|(0));if($517){label=115;break;}else{label=117;break;}
case 115:HEAP32[(($515)>>2)]=$R_1_i122;var $cond_i123=(($R_1_i122)|(0))==0;if($cond_i123){label=116;break;}else{label=123;break;}
case 116:var $519=HEAP32[(($513)>>2)];var $520=1<<$519;var $521=$520^-1;var $522=HEAP32[((((2300)|0))>>2)];var $523=$522&$521;HEAP32[((((2300)|0))>>2)]=$523;label=133;break;case 117:var $525=$472;var $526=HEAP32[((((2312)|0))>>2)];var $527=(($525)>>>(0))<(($526)>>>(0));if($527){label=121;break;}else{label=118;break;}
case 118:var $529=(($472+16)|0);var $530=HEAP32[(($529)>>2)];var $531=(($530)|(0))==(($v_3_lcssa_i)|(0));if($531){label=119;break;}else{label=120;break;}
case 119:HEAP32[(($529)>>2)]=$R_1_i122;label=122;break;case 120:var $534=(($472+20)|0);HEAP32[(($534)>>2)]=$R_1_i122;label=122;break;case 121:_abort();throw"Reached an unreachable!";case 122:var $537=(($R_1_i122)|(0))==0;if($537){label=133;break;}else{label=123;break;}
case 123:var $539=$R_1_i122;var $540=HEAP32[((((2312)|0))>>2)];var $541=(($539)>>>(0))<(($540)>>>(0));if($541){label=132;break;}else{label=124;break;}
case 124:var $543=(($R_1_i122+24)|0);HEAP32[(($543)>>2)]=$472;var $544=(($v_3_lcssa_i+16)|0);var $545=HEAP32[(($544)>>2)];var $546=(($545)|(0))==0;if($546){label=128;break;}else{label=125;break;}
case 125:var $548=$545;var $549=HEAP32[((((2312)|0))>>2)];var $550=(($548)>>>(0))<(($549)>>>(0));if($550){label=127;break;}else{label=126;break;}
case 126:var $552=(($R_1_i122+16)|0);HEAP32[(($552)>>2)]=$545;var $553=(($545+24)|0);HEAP32[(($553)>>2)]=$R_1_i122;label=128;break;case 127:_abort();throw"Reached an unreachable!";case 128:var $556=(($v_3_lcssa_i+20)|0);var $557=HEAP32[(($556)>>2)];var $558=(($557)|(0))==0;if($558){label=133;break;}else{label=129;break;}
case 129:var $560=$557;var $561=HEAP32[((((2312)|0))>>2)];var $562=(($560)>>>(0))<(($561)>>>(0));if($562){label=131;break;}else{label=130;break;}
case 130:var $564=(($R_1_i122+20)|0);HEAP32[(($564)>>2)]=$557;var $565=(($557+24)|0);HEAP32[(($565)>>2)]=$R_1_i122;label=133;break;case 131:_abort();throw"Reached an unreachable!";case 132:_abort();throw"Reached an unreachable!";case 133:var $569=(($rsize_3_lcssa_i)>>>(0))<16;if($569){label=134;break;}else{label=135;break;}
case 134:var $571=((($rsize_3_lcssa_i)+($349))|0);var $572=$571|3;var $573=(($v_3_lcssa_i+4)|0);HEAP32[(($573)>>2)]=$572;var $_sum19_i=((($571)+(4))|0);var $574=(($463+$_sum19_i)|0);var $575=$574;var $576=HEAP32[(($575)>>2)];var $577=$576|1;HEAP32[(($575)>>2)]=$577;label=159;break;case 135:var $579=$349|3;var $580=(($v_3_lcssa_i+4)|0);HEAP32[(($580)>>2)]=$579;var $581=$rsize_3_lcssa_i|1;var $_sum_i125136=$349|4;var $582=(($463+$_sum_i125136)|0);var $583=$582;HEAP32[(($583)>>2)]=$581;var $_sum1_i126=((($rsize_3_lcssa_i)+($349))|0);var $584=(($463+$_sum1_i126)|0);var $585=$584;HEAP32[(($585)>>2)]=$rsize_3_lcssa_i;var $586=$rsize_3_lcssa_i>>>3;var $587=(($rsize_3_lcssa_i)>>>(0))<256;if($587){label=136;break;}else{label=141;break;}
case 136:var $589=$586<<1;var $590=((2336+($589<<2))|0);var $591=$590;var $592=HEAP32[((((2296)|0))>>2)];var $593=1<<$586;var $594=$592&$593;var $595=(($594)|(0))==0;if($595){label=137;break;}else{label=138;break;}
case 137:var $597=$592|$593;HEAP32[((((2296)|0))>>2)]=$597;var $_sum15_pre_i=((($589)+(2))|0);var $_pre_i127=((2336+($_sum15_pre_i<<2))|0);var $F5_0_i=$591;var $_pre_phi_i128=$_pre_i127;label=140;break;case 138:var $_sum18_i=((($589)+(2))|0);var $599=((2336+($_sum18_i<<2))|0);var $600=HEAP32[(($599)>>2)];var $601=$600;var $602=HEAP32[((((2312)|0))>>2)];var $603=(($601)>>>(0))<(($602)>>>(0));if($603){label=139;break;}else{var $F5_0_i=$600;var $_pre_phi_i128=$599;label=140;break;}
case 139:_abort();throw"Reached an unreachable!";case 140:var $_pre_phi_i128;var $F5_0_i;HEAP32[(($_pre_phi_i128)>>2)]=$468;var $606=(($F5_0_i+12)|0);HEAP32[(($606)>>2)]=$468;var $_sum16_i=((($349)+(8))|0);var $607=(($463+$_sum16_i)|0);var $608=$607;HEAP32[(($608)>>2)]=$F5_0_i;var $_sum17_i=((($349)+(12))|0);var $609=(($463+$_sum17_i)|0);var $610=$609;HEAP32[(($610)>>2)]=$591;label=159;break;case 141:var $612=$467;var $613=$rsize_3_lcssa_i>>>8;var $614=(($613)|(0))==0;if($614){var $I7_0_i=0;label=144;break;}else{label=142;break;}
case 142:var $616=(($rsize_3_lcssa_i)>>>(0))>16777215;if($616){var $I7_0_i=31;label=144;break;}else{label=143;break;}
case 143:var $618=((($613)+(1048320))|0);var $619=$618>>>16;var $620=$619&8;var $621=$613<<$620;var $622=((($621)+(520192))|0);var $623=$622>>>16;var $624=$623&4;var $625=$624|$620;var $626=$621<<$624;var $627=((($626)+(245760))|0);var $628=$627>>>16;var $629=$628&2;var $630=$625|$629;var $631=(((14)-($630))|0);var $632=$626<<$629;var $633=$632>>>15;var $634=((($631)+($633))|0);var $635=$634<<1;var $636=((($634)+(7))|0);var $637=$rsize_3_lcssa_i>>>(($636)>>>(0));var $638=$637&1;var $639=$638|$635;var $I7_0_i=$639;label=144;break;case 144:var $I7_0_i;var $641=((2600+($I7_0_i<<2))|0);var $_sum2_i=((($349)+(28))|0);var $642=(($463+$_sum2_i)|0);var $643=$642;HEAP32[(($643)>>2)]=$I7_0_i;var $_sum3_i129=((($349)+(16))|0);var $644=(($463+$_sum3_i129)|0);var $_sum4_i130=((($349)+(20))|0);var $645=(($463+$_sum4_i130)|0);var $646=$645;HEAP32[(($646)>>2)]=0;var $647=$644;HEAP32[(($647)>>2)]=0;var $648=HEAP32[((((2300)|0))>>2)];var $649=1<<$I7_0_i;var $650=$648&$649;var $651=(($650)|(0))==0;if($651){label=145;break;}else{label=146;break;}
case 145:var $653=$648|$649;HEAP32[((((2300)|0))>>2)]=$653;HEAP32[(($641)>>2)]=$612;var $654=$641;var $_sum5_i=((($349)+(24))|0);var $655=(($463+$_sum5_i)|0);var $656=$655;HEAP32[(($656)>>2)]=$654;var $_sum6_i=((($349)+(12))|0);var $657=(($463+$_sum6_i)|0);var $658=$657;HEAP32[(($658)>>2)]=$612;var $_sum7_i=((($349)+(8))|0);var $659=(($463+$_sum7_i)|0);var $660=$659;HEAP32[(($660)>>2)]=$612;label=159;break;case 146:var $662=HEAP32[(($641)>>2)];var $663=(($I7_0_i)|(0))==31;if($663){var $668=0;label=148;break;}else{label=147;break;}
case 147:var $665=$I7_0_i>>>1;var $666=(((25)-($665))|0);var $668=$666;label=148;break;case 148:var $668;var $669=$rsize_3_lcssa_i<<$668;var $K12_0_i=$669;var $T_0_i=$662;label=149;break;case 149:var $T_0_i;var $K12_0_i;var $671=(($T_0_i+4)|0);var $672=HEAP32[(($671)>>2)];var $673=$672&-8;var $674=(($673)|(0))==(($rsize_3_lcssa_i)|(0));if($674){label=154;break;}else{label=150;break;}
case 150:var $676=$K12_0_i>>>31;var $677=(($T_0_i+16+($676<<2))|0);var $678=HEAP32[(($677)>>2)];var $679=(($678)|(0))==0;var $680=$K12_0_i<<1;if($679){label=151;break;}else{var $K12_0_i=$680;var $T_0_i=$678;label=149;break;}
case 151:var $682=$677;var $683=HEAP32[((((2312)|0))>>2)];var $684=(($682)>>>(0))<(($683)>>>(0));if($684){label=153;break;}else{label=152;break;}
case 152:HEAP32[(($677)>>2)]=$612;var $_sum12_i=((($349)+(24))|0);var $686=(($463+$_sum12_i)|0);var $687=$686;HEAP32[(($687)>>2)]=$T_0_i;var $_sum13_i=((($349)+(12))|0);var $688=(($463+$_sum13_i)|0);var $689=$688;HEAP32[(($689)>>2)]=$612;var $_sum14_i=((($349)+(8))|0);var $690=(($463+$_sum14_i)|0);var $691=$690;HEAP32[(($691)>>2)]=$612;label=159;break;case 153:_abort();throw"Reached an unreachable!";case 154:var $694=(($T_0_i+8)|0);var $695=HEAP32[(($694)>>2)];var $696=$T_0_i;var $697=HEAP32[((((2312)|0))>>2)];var $698=(($696)>>>(0))<(($697)>>>(0));if($698){label=157;break;}else{label=155;break;}
case 155:var $700=$695;var $701=(($700)>>>(0))<(($697)>>>(0));if($701){label=157;break;}else{label=156;break;}
case 156:var $703=(($695+12)|0);HEAP32[(($703)>>2)]=$612;HEAP32[(($694)>>2)]=$612;var $_sum9_i=((($349)+(8))|0);var $704=(($463+$_sum9_i)|0);var $705=$704;HEAP32[(($705)>>2)]=$695;var $_sum10_i=((($349)+(12))|0);var $706=(($463+$_sum10_i)|0);var $707=$706;HEAP32[(($707)>>2)]=$T_0_i;var $_sum11_i=((($349)+(24))|0);var $708=(($463+$_sum11_i)|0);var $709=$708;HEAP32[(($709)>>2)]=0;label=159;break;case 157:_abort();throw"Reached an unreachable!";case 158:_abort();throw"Reached an unreachable!";case 159:var $711=(($v_3_lcssa_i+8)|0);var $712=$711;var $713=(($711)|(0))==0;if($713){var $nb_0=$349;label=160;break;}else{var $mem_0=$712;label=341;break;}
case 160:var $nb_0;var $714=HEAP32[((((2304)|0))>>2)];var $715=(($nb_0)>>>(0))>(($714)>>>(0));if($715){label=165;break;}else{label=161;break;}
case 161:var $717=((($714)-($nb_0))|0);var $718=HEAP32[((((2316)|0))>>2)];var $719=(($717)>>>(0))>15;if($719){label=162;break;}else{label=163;break;}
case 162:var $721=$718;var $722=(($721+$nb_0)|0);var $723=$722;HEAP32[((((2316)|0))>>2)]=$723;HEAP32[((((2304)|0))>>2)]=$717;var $724=$717|1;var $_sum102=((($nb_0)+(4))|0);var $725=(($721+$_sum102)|0);var $726=$725;HEAP32[(($726)>>2)]=$724;var $727=(($721+$714)|0);var $728=$727;HEAP32[(($728)>>2)]=$717;var $729=$nb_0|3;var $730=(($718+4)|0);HEAP32[(($730)>>2)]=$729;label=164;break;case 163:HEAP32[((((2304)|0))>>2)]=0;HEAP32[((((2316)|0))>>2)]=0;var $732=$714|3;var $733=(($718+4)|0);HEAP32[(($733)>>2)]=$732;var $734=$718;var $_sum101=((($714)+(4))|0);var $735=(($734+$_sum101)|0);var $736=$735;var $737=HEAP32[(($736)>>2)];var $738=$737|1;HEAP32[(($736)>>2)]=$738;label=164;break;case 164:var $740=(($718+8)|0);var $741=$740;var $mem_0=$741;label=341;break;case 165:var $743=HEAP32[((((2308)|0))>>2)];var $744=(($nb_0)>>>(0))<(($743)>>>(0));if($744){label=166;break;}else{label=167;break;}
case 166:var $746=((($743)-($nb_0))|0);HEAP32[((((2308)|0))>>2)]=$746;var $747=HEAP32[((((2320)|0))>>2)];var $748=$747;var $749=(($748+$nb_0)|0);var $750=$749;HEAP32[((((2320)|0))>>2)]=$750;var $751=$746|1;var $_sum=((($nb_0)+(4))|0);var $752=(($748+$_sum)|0);var $753=$752;HEAP32[(($753)>>2)]=$751;var $754=$nb_0|3;var $755=(($747+4)|0);HEAP32[(($755)>>2)]=$754;var $756=(($747+8)|0);var $757=$756;var $mem_0=$757;label=341;break;case 167:var $759=HEAP32[((((2256)|0))>>2)];var $760=(($759)|(0))==0;if($760){label=168;break;}else{label=171;break;}
case 168:var $762=_sysconf(30);var $763=((($762)-(1))|0);var $764=$763&$762;var $765=(($764)|(0))==0;if($765){label=170;break;}else{label=169;break;}
case 169:_abort();throw"Reached an unreachable!";case 170:HEAP32[((((2264)|0))>>2)]=$762;HEAP32[((((2260)|0))>>2)]=$762;HEAP32[((((2268)|0))>>2)]=-1;HEAP32[((((2272)|0))>>2)]=-1;HEAP32[((((2276)|0))>>2)]=0;HEAP32[((((2740)|0))>>2)]=0;var $767=_time(0);var $768=$767&-16;var $769=$768^1431655768;HEAP32[((((2256)|0))>>2)]=$769;label=171;break;case 171:var $771=((($nb_0)+(48))|0);var $772=HEAP32[((((2264)|0))>>2)];var $773=((($nb_0)+(47))|0);var $774=((($772)+($773))|0);var $775=(((-$772))|0);var $776=$774&$775;var $777=(($776)>>>(0))>(($nb_0)>>>(0));if($777){label=172;break;}else{var $mem_0=0;label=341;break;}
case 172:var $779=HEAP32[((((2736)|0))>>2)];var $780=(($779)|(0))==0;if($780){label=174;break;}else{label=173;break;}
case 173:var $782=HEAP32[((((2728)|0))>>2)];var $783=((($782)+($776))|0);var $784=(($783)>>>(0))<=(($782)>>>(0));var $785=(($783)>>>(0))>(($779)>>>(0));var $or_cond1_i=$784|$785;if($or_cond1_i){var $mem_0=0;label=341;break;}else{label=174;break;}
case 174:var $787=HEAP32[((((2740)|0))>>2)];var $788=$787&4;var $789=(($788)|(0))==0;if($789){label=175;break;}else{var $tsize_1_i=0;label=198;break;}
case 175:var $791=HEAP32[((((2320)|0))>>2)];var $792=(($791)|(0))==0;if($792){label=181;break;}else{label=176;break;}
case 176:var $794=$791;var $sp_0_i_i=((2744)|0);label=177;break;case 177:var $sp_0_i_i;var $796=(($sp_0_i_i)|0);var $797=HEAP32[(($796)>>2)];var $798=(($797)>>>(0))>(($794)>>>(0));if($798){label=179;break;}else{label=178;break;}
case 178:var $800=(($sp_0_i_i+4)|0);var $801=HEAP32[(($800)>>2)];var $802=(($797+$801)|0);var $803=(($802)>>>(0))>(($794)>>>(0));if($803){label=180;break;}else{label=179;break;}
case 179:var $805=(($sp_0_i_i+8)|0);var $806=HEAP32[(($805)>>2)];var $807=(($806)|(0))==0;if($807){label=181;break;}else{var $sp_0_i_i=$806;label=177;break;}
case 180:var $808=(($sp_0_i_i)|(0))==0;if($808){label=181;break;}else{label=188;break;}
case 181:var $809=_sbrk(0);var $810=(($809)|(0))==-1;if($810){var $tsize_0303639_i=0;label=197;break;}else{label=182;break;}
case 182:var $812=$809;var $813=HEAP32[((((2260)|0))>>2)];var $814=((($813)-(1))|0);var $815=$814&$812;var $816=(($815)|(0))==0;if($816){var $ssize_0_i=$776;label=184;break;}else{label=183;break;}
case 183:var $818=((($814)+($812))|0);var $819=(((-$813))|0);var $820=$818&$819;var $821=((($776)-($812))|0);var $822=((($821)+($820))|0);var $ssize_0_i=$822;label=184;break;case 184:var $ssize_0_i;var $824=HEAP32[((((2728)|0))>>2)];var $825=((($824)+($ssize_0_i))|0);var $826=(($ssize_0_i)>>>(0))>(($nb_0)>>>(0));var $827=(($ssize_0_i)>>>(0))<2147483647;var $or_cond_i131=$826&$827;if($or_cond_i131){label=185;break;}else{var $tsize_0303639_i=0;label=197;break;}
case 185:var $829=HEAP32[((((2736)|0))>>2)];var $830=(($829)|(0))==0;if($830){label=187;break;}else{label=186;break;}
case 186:var $832=(($825)>>>(0))<=(($824)>>>(0));var $833=(($825)>>>(0))>(($829)>>>(0));var $or_cond2_i=$832|$833;if($or_cond2_i){var $tsize_0303639_i=0;label=197;break;}else{label=187;break;}
case 187:var $835=_sbrk($ssize_0_i);var $836=(($835)|(0))==(($809)|(0));var $ssize_0__i=$836?$ssize_0_i:0;var $__i=$836?$809:-1;var $tbase_0_i=$__i;var $tsize_0_i=$ssize_0__i;var $br_0_i=$835;var $ssize_1_i=$ssize_0_i;label=190;break;case 188:var $838=HEAP32[((((2308)|0))>>2)];var $839=((($774)-($838))|0);var $840=$839&$775;var $841=(($840)>>>(0))<2147483647;if($841){label=189;break;}else{var $tsize_0303639_i=0;label=197;break;}
case 189:var $843=_sbrk($840);var $844=HEAP32[(($796)>>2)];var $845=HEAP32[(($800)>>2)];var $846=(($844+$845)|0);var $847=(($843)|(0))==(($846)|(0));var $_3_i=$847?$840:0;var $_4_i=$847?$843:-1;var $tbase_0_i=$_4_i;var $tsize_0_i=$_3_i;var $br_0_i=$843;var $ssize_1_i=$840;label=190;break;case 190:var $ssize_1_i;var $br_0_i;var $tsize_0_i;var $tbase_0_i;var $849=(((-$ssize_1_i))|0);var $850=(($tbase_0_i)|(0))==-1;if($850){label=191;break;}else{var $tsize_244_i=$tsize_0_i;var $tbase_245_i=$tbase_0_i;label=201;break;}
case 191:var $852=(($br_0_i)|(0))!=-1;var $853=(($ssize_1_i)>>>(0))<2147483647;var $or_cond5_i=$852&$853;var $854=(($ssize_1_i)>>>(0))<(($771)>>>(0));var $or_cond6_i=$or_cond5_i&$854;if($or_cond6_i){label=192;break;}else{var $ssize_2_i=$ssize_1_i;label=196;break;}
case 192:var $856=HEAP32[((((2264)|0))>>2)];var $857=((($773)-($ssize_1_i))|0);var $858=((($857)+($856))|0);var $859=(((-$856))|0);var $860=$858&$859;var $861=(($860)>>>(0))<2147483647;if($861){label=193;break;}else{var $ssize_2_i=$ssize_1_i;label=196;break;}
case 193:var $863=_sbrk($860);var $864=(($863)|(0))==-1;if($864){label=195;break;}else{label=194;break;}
case 194:var $866=((($860)+($ssize_1_i))|0);var $ssize_2_i=$866;label=196;break;case 195:var $868=_sbrk($849);var $tsize_0303639_i=$tsize_0_i;label=197;break;case 196:var $ssize_2_i;var $870=(($br_0_i)|(0))==-1;if($870){var $tsize_0303639_i=$tsize_0_i;label=197;break;}else{var $tsize_244_i=$ssize_2_i;var $tbase_245_i=$br_0_i;label=201;break;}
case 197:var $tsize_0303639_i;var $871=HEAP32[((((2740)|0))>>2)];var $872=$871|4;HEAP32[((((2740)|0))>>2)]=$872;var $tsize_1_i=$tsize_0303639_i;label=198;break;case 198:var $tsize_1_i;var $874=(($776)>>>(0))<2147483647;if($874){label=199;break;}else{label=340;break;}
case 199:var $876=_sbrk($776);var $877=_sbrk(0);var $notlhs_i=(($876)|(0))!=-1;var $notrhs_i=(($877)|(0))!=-1;var $or_cond8_not_i=$notrhs_i&$notlhs_i;var $878=(($876)>>>(0))<(($877)>>>(0));var $or_cond9_i=$or_cond8_not_i&$878;if($or_cond9_i){label=200;break;}else{label=340;break;}
case 200:var $879=$877;var $880=$876;var $881=((($879)-($880))|0);var $882=((($nb_0)+(40))|0);var $883=(($881)>>>(0))>(($882)>>>(0));var $_tsize_1_i=$883?$881:$tsize_1_i;var $_tbase_1_i=$883?$876:-1;var $884=(($_tbase_1_i)|(0))==-1;if($884){label=340;break;}else{var $tsize_244_i=$_tsize_1_i;var $tbase_245_i=$_tbase_1_i;label=201;break;}
case 201:var $tbase_245_i;var $tsize_244_i;var $885=HEAP32[((((2728)|0))>>2)];var $886=((($885)+($tsize_244_i))|0);HEAP32[((((2728)|0))>>2)]=$886;var $887=HEAP32[((((2732)|0))>>2)];var $888=(($886)>>>(0))>(($887)>>>(0));if($888){label=202;break;}else{label=203;break;}
case 202:HEAP32[((((2732)|0))>>2)]=$886;label=203;break;case 203:var $890=HEAP32[((((2320)|0))>>2)];var $891=(($890)|(0))==0;if($891){label=204;break;}else{var $sp_067_i=((2744)|0);label=211;break;}
case 204:var $893=HEAP32[((((2312)|0))>>2)];var $894=(($893)|(0))==0;var $895=(($tbase_245_i)>>>(0))<(($893)>>>(0));var $or_cond10_i=$894|$895;if($or_cond10_i){label=205;break;}else{label=206;break;}
case 205:HEAP32[((((2312)|0))>>2)]=$tbase_245_i;label=206;break;case 206:HEAP32[((((2744)|0))>>2)]=$tbase_245_i;HEAP32[((((2748)|0))>>2)]=$tsize_244_i;HEAP32[((((2756)|0))>>2)]=0;var $897=HEAP32[((((2256)|0))>>2)];HEAP32[((((2332)|0))>>2)]=$897;HEAP32[((((2328)|0))>>2)]=-1;var $i_02_i_i=0;label=207;break;case 207:var $i_02_i_i;var $899=$i_02_i_i<<1;var $900=((2336+($899<<2))|0);var $901=$900;var $_sum_i_i=((($899)+(3))|0);var $902=((2336+($_sum_i_i<<2))|0);HEAP32[(($902)>>2)]=$901;var $_sum1_i_i=((($899)+(2))|0);var $903=((2336+($_sum1_i_i<<2))|0);HEAP32[(($903)>>2)]=$901;var $904=((($i_02_i_i)+(1))|0);var $905=(($904)>>>(0))<32;if($905){var $i_02_i_i=$904;label=207;break;}else{label=208;break;}
case 208:var $906=((($tsize_244_i)-(40))|0);var $907=(($tbase_245_i+8)|0);var $908=$907;var $909=$908&7;var $910=(($909)|(0))==0;if($910){var $914=0;label=210;break;}else{label=209;break;}
case 209:var $912=(((-$908))|0);var $913=$912&7;var $914=$913;label=210;break;case 210:var $914;var $915=(($tbase_245_i+$914)|0);var $916=$915;var $917=((($906)-($914))|0);HEAP32[((((2320)|0))>>2)]=$916;HEAP32[((((2308)|0))>>2)]=$917;var $918=$917|1;var $_sum_i14_i=((($914)+(4))|0);var $919=(($tbase_245_i+$_sum_i14_i)|0);var $920=$919;HEAP32[(($920)>>2)]=$918;var $_sum2_i_i=((($tsize_244_i)-(36))|0);var $921=(($tbase_245_i+$_sum2_i_i)|0);var $922=$921;HEAP32[(($922)>>2)]=40;var $923=HEAP32[((((2272)|0))>>2)];HEAP32[((((2324)|0))>>2)]=$923;label=338;break;case 211:var $sp_067_i;var $924=(($sp_067_i)|0);var $925=HEAP32[(($924)>>2)];var $926=(($sp_067_i+4)|0);var $927=HEAP32[(($926)>>2)];var $928=(($925+$927)|0);var $929=(($tbase_245_i)|(0))==(($928)|(0));if($929){label=213;break;}else{label=212;break;}
case 212:var $931=(($sp_067_i+8)|0);var $932=HEAP32[(($931)>>2)];var $933=(($932)|(0))==0;if($933){label=218;break;}else{var $sp_067_i=$932;label=211;break;}
case 213:var $934=(($sp_067_i+12)|0);var $935=HEAP32[(($934)>>2)];var $936=$935&8;var $937=(($936)|(0))==0;if($937){label=214;break;}else{label=218;break;}
case 214:var $939=$890;var $940=(($939)>>>(0))>=(($925)>>>(0));var $941=(($939)>>>(0))<(($tbase_245_i)>>>(0));var $or_cond47_i=$940&$941;if($or_cond47_i){label=215;break;}else{label=218;break;}
case 215:var $943=((($927)+($tsize_244_i))|0);HEAP32[(($926)>>2)]=$943;var $944=HEAP32[((((2320)|0))>>2)];var $945=HEAP32[((((2308)|0))>>2)];var $946=((($945)+($tsize_244_i))|0);var $947=$944;var $948=(($944+8)|0);var $949=$948;var $950=$949&7;var $951=(($950)|(0))==0;if($951){var $955=0;label=217;break;}else{label=216;break;}
case 216:var $953=(((-$949))|0);var $954=$953&7;var $955=$954;label=217;break;case 217:var $955;var $956=(($947+$955)|0);var $957=$956;var $958=((($946)-($955))|0);HEAP32[((((2320)|0))>>2)]=$957;HEAP32[((((2308)|0))>>2)]=$958;var $959=$958|1;var $_sum_i18_i=((($955)+(4))|0);var $960=(($947+$_sum_i18_i)|0);var $961=$960;HEAP32[(($961)>>2)]=$959;var $_sum2_i19_i=((($946)+(4))|0);var $962=(($947+$_sum2_i19_i)|0);var $963=$962;HEAP32[(($963)>>2)]=40;var $964=HEAP32[((((2272)|0))>>2)];HEAP32[((((2324)|0))>>2)]=$964;label=338;break;case 218:var $965=HEAP32[((((2312)|0))>>2)];var $966=(($tbase_245_i)>>>(0))<(($965)>>>(0));if($966){label=219;break;}else{label=220;break;}
case 219:HEAP32[((((2312)|0))>>2)]=$tbase_245_i;label=220;break;case 220:var $968=(($tbase_245_i+$tsize_244_i)|0);var $sp_160_i=((2744)|0);label=221;break;case 221:var $sp_160_i;var $970=(($sp_160_i)|0);var $971=HEAP32[(($970)>>2)];var $972=(($971)|(0))==(($968)|(0));if($972){label=223;break;}else{label=222;break;}
case 222:var $974=(($sp_160_i+8)|0);var $975=HEAP32[(($974)>>2)];var $976=(($975)|(0))==0;if($976){label=304;break;}else{var $sp_160_i=$975;label=221;break;}
case 223:var $977=(($sp_160_i+12)|0);var $978=HEAP32[(($977)>>2)];var $979=$978&8;var $980=(($979)|(0))==0;if($980){label=224;break;}else{label=304;break;}
case 224:HEAP32[(($970)>>2)]=$tbase_245_i;var $982=(($sp_160_i+4)|0);var $983=HEAP32[(($982)>>2)];var $984=((($983)+($tsize_244_i))|0);HEAP32[(($982)>>2)]=$984;var $985=(($tbase_245_i+8)|0);var $986=$985;var $987=$986&7;var $988=(($987)|(0))==0;if($988){var $993=0;label=226;break;}else{label=225;break;}
case 225:var $990=(((-$986))|0);var $991=$990&7;var $993=$991;label=226;break;case 226:var $993;var $994=(($tbase_245_i+$993)|0);var $_sum93_i=((($tsize_244_i)+(8))|0);var $995=(($tbase_245_i+$_sum93_i)|0);var $996=$995;var $997=$996&7;var $998=(($997)|(0))==0;if($998){var $1003=0;label=228;break;}else{label=227;break;}
case 227:var $1000=(((-$996))|0);var $1001=$1000&7;var $1003=$1001;label=228;break;case 228:var $1003;var $_sum94_i=((($1003)+($tsize_244_i))|0);var $1004=(($tbase_245_i+$_sum94_i)|0);var $1005=$1004;var $1006=$1004;var $1007=$994;var $1008=((($1006)-($1007))|0);var $_sum_i21_i=((($993)+($nb_0))|0);var $1009=(($tbase_245_i+$_sum_i21_i)|0);var $1010=$1009;var $1011=((($1008)-($nb_0))|0);var $1012=$nb_0|3;var $_sum1_i22_i=((($993)+(4))|0);var $1013=(($tbase_245_i+$_sum1_i22_i)|0);var $1014=$1013;HEAP32[(($1014)>>2)]=$1012;var $1015=HEAP32[((((2320)|0))>>2)];var $1016=(($1005)|(0))==(($1015)|(0));if($1016){label=229;break;}else{label=230;break;}
case 229:var $1018=HEAP32[((((2308)|0))>>2)];var $1019=((($1018)+($1011))|0);HEAP32[((((2308)|0))>>2)]=$1019;HEAP32[((((2320)|0))>>2)]=$1010;var $1020=$1019|1;var $_sum46_i_i=((($_sum_i21_i)+(4))|0);var $1021=(($tbase_245_i+$_sum46_i_i)|0);var $1022=$1021;HEAP32[(($1022)>>2)]=$1020;label=303;break;case 230:var $1024=HEAP32[((((2316)|0))>>2)];var $1025=(($1005)|(0))==(($1024)|(0));if($1025){label=231;break;}else{label=232;break;}
case 231:var $1027=HEAP32[((((2304)|0))>>2)];var $1028=((($1027)+($1011))|0);HEAP32[((((2304)|0))>>2)]=$1028;HEAP32[((((2316)|0))>>2)]=$1010;var $1029=$1028|1;var $_sum44_i_i=((($_sum_i21_i)+(4))|0);var $1030=(($tbase_245_i+$_sum44_i_i)|0);var $1031=$1030;HEAP32[(($1031)>>2)]=$1029;var $_sum45_i_i=((($1028)+($_sum_i21_i))|0);var $1032=(($tbase_245_i+$_sum45_i_i)|0);var $1033=$1032;HEAP32[(($1033)>>2)]=$1028;label=303;break;case 232:var $_sum2_i23_i=((($tsize_244_i)+(4))|0);var $_sum95_i=((($_sum2_i23_i)+($1003))|0);var $1035=(($tbase_245_i+$_sum95_i)|0);var $1036=$1035;var $1037=HEAP32[(($1036)>>2)];var $1038=$1037&3;var $1039=(($1038)|(0))==1;if($1039){label=233;break;}else{var $oldfirst_0_i_i=$1005;var $qsize_0_i_i=$1011;label=280;break;}
case 233:var $1041=$1037&-8;var $1042=$1037>>>3;var $1043=(($1037)>>>(0))<256;if($1043){label=234;break;}else{label=246;break;}
case 234:var $_sum3940_i_i=$1003|8;var $_sum105_i=((($_sum3940_i_i)+($tsize_244_i))|0);var $1045=(($tbase_245_i+$_sum105_i)|0);var $1046=$1045;var $1047=HEAP32[(($1046)>>2)];var $_sum41_i_i=((($tsize_244_i)+(12))|0);var $_sum106_i=((($_sum41_i_i)+($1003))|0);var $1048=(($tbase_245_i+$_sum106_i)|0);var $1049=$1048;var $1050=HEAP32[(($1049)>>2)];var $1051=$1042<<1;var $1052=((2336+($1051<<2))|0);var $1053=$1052;var $1054=(($1047)|(0))==(($1053)|(0));if($1054){label=237;break;}else{label=235;break;}
case 235:var $1056=$1047;var $1057=HEAP32[((((2312)|0))>>2)];var $1058=(($1056)>>>(0))<(($1057)>>>(0));if($1058){label=245;break;}else{label=236;break;}
case 236:var $1060=(($1047+12)|0);var $1061=HEAP32[(($1060)>>2)];var $1062=(($1061)|(0))==(($1005)|(0));if($1062){label=237;break;}else{label=245;break;}
case 237:var $1063=(($1050)|(0))==(($1047)|(0));if($1063){label=238;break;}else{label=239;break;}
case 238:var $1065=1<<$1042;var $1066=$1065^-1;var $1067=HEAP32[((((2296)|0))>>2)];var $1068=$1067&$1066;HEAP32[((((2296)|0))>>2)]=$1068;label=279;break;case 239:var $1070=(($1050)|(0))==(($1053)|(0));if($1070){label=240;break;}else{label=241;break;}
case 240:var $_pre56_i_i=(($1050+8)|0);var $_pre_phi57_i_i=$_pre56_i_i;label=243;break;case 241:var $1072=$1050;var $1073=HEAP32[((((2312)|0))>>2)];var $1074=(($1072)>>>(0))<(($1073)>>>(0));if($1074){label=244;break;}else{label=242;break;}
case 242:var $1076=(($1050+8)|0);var $1077=HEAP32[(($1076)>>2)];var $1078=(($1077)|(0))==(($1005)|(0));if($1078){var $_pre_phi57_i_i=$1076;label=243;break;}else{label=244;break;}
case 243:var $_pre_phi57_i_i;var $1079=(($1047+12)|0);HEAP32[(($1079)>>2)]=$1050;HEAP32[(($_pre_phi57_i_i)>>2)]=$1047;label=279;break;case 244:_abort();throw"Reached an unreachable!";case 245:_abort();throw"Reached an unreachable!";case 246:var $1081=$1004;var $_sum34_i_i=$1003|24;var $_sum96_i=((($_sum34_i_i)+($tsize_244_i))|0);var $1082=(($tbase_245_i+$_sum96_i)|0);var $1083=$1082;var $1084=HEAP32[(($1083)>>2)];var $_sum5_i_i=((($tsize_244_i)+(12))|0);var $_sum97_i=((($_sum5_i_i)+($1003))|0);var $1085=(($tbase_245_i+$_sum97_i)|0);var $1086=$1085;var $1087=HEAP32[(($1086)>>2)];var $1088=(($1087)|(0))==(($1081)|(0));if($1088){label=252;break;}else{label=247;break;}
case 247:var $_sum3637_i_i=$1003|8;var $_sum98_i=((($_sum3637_i_i)+($tsize_244_i))|0);var $1090=(($tbase_245_i+$_sum98_i)|0);var $1091=$1090;var $1092=HEAP32[(($1091)>>2)];var $1093=$1092;var $1094=HEAP32[((((2312)|0))>>2)];var $1095=(($1093)>>>(0))<(($1094)>>>(0));if($1095){label=251;break;}else{label=248;break;}
case 248:var $1097=(($1092+12)|0);var $1098=HEAP32[(($1097)>>2)];var $1099=(($1098)|(0))==(($1081)|(0));if($1099){label=249;break;}else{label=251;break;}
case 249:var $1101=(($1087+8)|0);var $1102=HEAP32[(($1101)>>2)];var $1103=(($1102)|(0))==(($1081)|(0));if($1103){label=250;break;}else{label=251;break;}
case 250:HEAP32[(($1097)>>2)]=$1087;HEAP32[(($1101)>>2)]=$1092;var $R_1_i_i=$1087;label=259;break;case 251:_abort();throw"Reached an unreachable!";case 252:var $_sum67_i_i=$1003|16;var $_sum103_i=((($_sum2_i23_i)+($_sum67_i_i))|0);var $1106=(($tbase_245_i+$_sum103_i)|0);var $1107=$1106;var $1108=HEAP32[(($1107)>>2)];var $1109=(($1108)|(0))==0;if($1109){label=253;break;}else{var $R_0_i_i=$1108;var $RP_0_i_i=$1107;label=254;break;}
case 253:var $_sum104_i=((($_sum67_i_i)+($tsize_244_i))|0);var $1111=(($tbase_245_i+$_sum104_i)|0);var $1112=$1111;var $1113=HEAP32[(($1112)>>2)];var $1114=(($1113)|(0))==0;if($1114){var $R_1_i_i=0;label=259;break;}else{var $R_0_i_i=$1113;var $RP_0_i_i=$1112;label=254;break;}
case 254:var $RP_0_i_i;var $R_0_i_i;var $1115=(($R_0_i_i+20)|0);var $1116=HEAP32[(($1115)>>2)];var $1117=(($1116)|(0))==0;if($1117){label=255;break;}else{var $R_0_i_i=$1116;var $RP_0_i_i=$1115;label=254;break;}
case 255:var $1119=(($R_0_i_i+16)|0);var $1120=HEAP32[(($1119)>>2)];var $1121=(($1120)|(0))==0;if($1121){label=256;break;}else{var $R_0_i_i=$1120;var $RP_0_i_i=$1119;label=254;break;}
case 256:var $1123=$RP_0_i_i;var $1124=HEAP32[((((2312)|0))>>2)];var $1125=(($1123)>>>(0))<(($1124)>>>(0));if($1125){label=258;break;}else{label=257;break;}
case 257:HEAP32[(($RP_0_i_i)>>2)]=0;var $R_1_i_i=$R_0_i_i;label=259;break;case 258:_abort();throw"Reached an unreachable!";case 259:var $R_1_i_i;var $1129=(($1084)|(0))==0;if($1129){label=279;break;}else{label=260;break;}
case 260:var $_sum31_i_i=((($tsize_244_i)+(28))|0);var $_sum99_i=((($_sum31_i_i)+($1003))|0);var $1131=(($tbase_245_i+$_sum99_i)|0);var $1132=$1131;var $1133=HEAP32[(($1132)>>2)];var $1134=((2600+($1133<<2))|0);var $1135=HEAP32[(($1134)>>2)];var $1136=(($1081)|(0))==(($1135)|(0));if($1136){label=261;break;}else{label=263;break;}
case 261:HEAP32[(($1134)>>2)]=$R_1_i_i;var $cond_i_i=(($R_1_i_i)|(0))==0;if($cond_i_i){label=262;break;}else{label=269;break;}
case 262:var $1138=HEAP32[(($1132)>>2)];var $1139=1<<$1138;var $1140=$1139^-1;var $1141=HEAP32[((((2300)|0))>>2)];var $1142=$1141&$1140;HEAP32[((((2300)|0))>>2)]=$1142;label=279;break;case 263:var $1144=$1084;var $1145=HEAP32[((((2312)|0))>>2)];var $1146=(($1144)>>>(0))<(($1145)>>>(0));if($1146){label=267;break;}else{label=264;break;}
case 264:var $1148=(($1084+16)|0);var $1149=HEAP32[(($1148)>>2)];var $1150=(($1149)|(0))==(($1081)|(0));if($1150){label=265;break;}else{label=266;break;}
case 265:HEAP32[(($1148)>>2)]=$R_1_i_i;label=268;break;case 266:var $1153=(($1084+20)|0);HEAP32[(($1153)>>2)]=$R_1_i_i;label=268;break;case 267:_abort();throw"Reached an unreachable!";case 268:var $1156=(($R_1_i_i)|(0))==0;if($1156){label=279;break;}else{label=269;break;}
case 269:var $1158=$R_1_i_i;var $1159=HEAP32[((((2312)|0))>>2)];var $1160=(($1158)>>>(0))<(($1159)>>>(0));if($1160){label=278;break;}else{label=270;break;}
case 270:var $1162=(($R_1_i_i+24)|0);HEAP32[(($1162)>>2)]=$1084;var $_sum3233_i_i=$1003|16;var $_sum100_i=((($_sum3233_i_i)+($tsize_244_i))|0);var $1163=(($tbase_245_i+$_sum100_i)|0);var $1164=$1163;var $1165=HEAP32[(($1164)>>2)];var $1166=(($1165)|(0))==0;if($1166){label=274;break;}else{label=271;break;}
case 271:var $1168=$1165;var $1169=HEAP32[((((2312)|0))>>2)];var $1170=(($1168)>>>(0))<(($1169)>>>(0));if($1170){label=273;break;}else{label=272;break;}
case 272:var $1172=(($R_1_i_i+16)|0);HEAP32[(($1172)>>2)]=$1165;var $1173=(($1165+24)|0);HEAP32[(($1173)>>2)]=$R_1_i_i;label=274;break;case 273:_abort();throw"Reached an unreachable!";case 274:var $_sum101_i=((($_sum2_i23_i)+($_sum3233_i_i))|0);var $1176=(($tbase_245_i+$_sum101_i)|0);var $1177=$1176;var $1178=HEAP32[(($1177)>>2)];var $1179=(($1178)|(0))==0;if($1179){label=279;break;}else{label=275;break;}
case 275:var $1181=$1178;var $1182=HEAP32[((((2312)|0))>>2)];var $1183=(($1181)>>>(0))<(($1182)>>>(0));if($1183){label=277;break;}else{label=276;break;}
case 276:var $1185=(($R_1_i_i+20)|0);HEAP32[(($1185)>>2)]=$1178;var $1186=(($1178+24)|0);HEAP32[(($1186)>>2)]=$R_1_i_i;label=279;break;case 277:_abort();throw"Reached an unreachable!";case 278:_abort();throw"Reached an unreachable!";case 279:var $_sum9_i_i=$1041|$1003;var $_sum102_i=((($_sum9_i_i)+($tsize_244_i))|0);var $1190=(($tbase_245_i+$_sum102_i)|0);var $1191=$1190;var $1192=((($1041)+($1011))|0);var $oldfirst_0_i_i=$1191;var $qsize_0_i_i=$1192;label=280;break;case 280:var $qsize_0_i_i;var $oldfirst_0_i_i;var $1194=(($oldfirst_0_i_i+4)|0);var $1195=HEAP32[(($1194)>>2)];var $1196=$1195&-2;HEAP32[(($1194)>>2)]=$1196;var $1197=$qsize_0_i_i|1;var $_sum10_i_i=((($_sum_i21_i)+(4))|0);var $1198=(($tbase_245_i+$_sum10_i_i)|0);var $1199=$1198;HEAP32[(($1199)>>2)]=$1197;var $_sum11_i_i=((($qsize_0_i_i)+($_sum_i21_i))|0);var $1200=(($tbase_245_i+$_sum11_i_i)|0);var $1201=$1200;HEAP32[(($1201)>>2)]=$qsize_0_i_i;var $1202=$qsize_0_i_i>>>3;var $1203=(($qsize_0_i_i)>>>(0))<256;if($1203){label=281;break;}else{label=286;break;}
case 281:var $1205=$1202<<1;var $1206=((2336+($1205<<2))|0);var $1207=$1206;var $1208=HEAP32[((((2296)|0))>>2)];var $1209=1<<$1202;var $1210=$1208&$1209;var $1211=(($1210)|(0))==0;if($1211){label=282;break;}else{label=283;break;}
case 282:var $1213=$1208|$1209;HEAP32[((((2296)|0))>>2)]=$1213;var $_sum27_pre_i_i=((($1205)+(2))|0);var $_pre_i24_i=((2336+($_sum27_pre_i_i<<2))|0);var $F4_0_i_i=$1207;var $_pre_phi_i25_i=$_pre_i24_i;label=285;break;case 283:var $_sum30_i_i=((($1205)+(2))|0);var $1215=((2336+($_sum30_i_i<<2))|0);var $1216=HEAP32[(($1215)>>2)];var $1217=$1216;var $1218=HEAP32[((((2312)|0))>>2)];var $1219=(($1217)>>>(0))<(($1218)>>>(0));if($1219){label=284;break;}else{var $F4_0_i_i=$1216;var $_pre_phi_i25_i=$1215;label=285;break;}
case 284:_abort();throw"Reached an unreachable!";case 285:var $_pre_phi_i25_i;var $F4_0_i_i;HEAP32[(($_pre_phi_i25_i)>>2)]=$1010;var $1222=(($F4_0_i_i+12)|0);HEAP32[(($1222)>>2)]=$1010;var $_sum28_i_i=((($_sum_i21_i)+(8))|0);var $1223=(($tbase_245_i+$_sum28_i_i)|0);var $1224=$1223;HEAP32[(($1224)>>2)]=$F4_0_i_i;var $_sum29_i_i=((($_sum_i21_i)+(12))|0);var $1225=(($tbase_245_i+$_sum29_i_i)|0);var $1226=$1225;HEAP32[(($1226)>>2)]=$1207;label=303;break;case 286:var $1228=$1009;var $1229=$qsize_0_i_i>>>8;var $1230=(($1229)|(0))==0;if($1230){var $I7_0_i_i=0;label=289;break;}else{label=287;break;}
case 287:var $1232=(($qsize_0_i_i)>>>(0))>16777215;if($1232){var $I7_0_i_i=31;label=289;break;}else{label=288;break;}
case 288:var $1234=((($1229)+(1048320))|0);var $1235=$1234>>>16;var $1236=$1235&8;var $1237=$1229<<$1236;var $1238=((($1237)+(520192))|0);var $1239=$1238>>>16;var $1240=$1239&4;var $1241=$1240|$1236;var $1242=$1237<<$1240;var $1243=((($1242)+(245760))|0);var $1244=$1243>>>16;var $1245=$1244&2;var $1246=$1241|$1245;var $1247=(((14)-($1246))|0);var $1248=$1242<<$1245;var $1249=$1248>>>15;var $1250=((($1247)+($1249))|0);var $1251=$1250<<1;var $1252=((($1250)+(7))|0);var $1253=$qsize_0_i_i>>>(($1252)>>>(0));var $1254=$1253&1;var $1255=$1254|$1251;var $I7_0_i_i=$1255;label=289;break;case 289:var $I7_0_i_i;var $1257=((2600+($I7_0_i_i<<2))|0);var $_sum12_i26_i=((($_sum_i21_i)+(28))|0);var $1258=(($tbase_245_i+$_sum12_i26_i)|0);var $1259=$1258;HEAP32[(($1259)>>2)]=$I7_0_i_i;var $_sum13_i_i=((($_sum_i21_i)+(16))|0);var $1260=(($tbase_245_i+$_sum13_i_i)|0);var $_sum14_i_i=((($_sum_i21_i)+(20))|0);var $1261=(($tbase_245_i+$_sum14_i_i)|0);var $1262=$1261;HEAP32[(($1262)>>2)]=0;var $1263=$1260;HEAP32[(($1263)>>2)]=0;var $1264=HEAP32[((((2300)|0))>>2)];var $1265=1<<$I7_0_i_i;var $1266=$1264&$1265;var $1267=(($1266)|(0))==0;if($1267){label=290;break;}else{label=291;break;}
case 290:var $1269=$1264|$1265;HEAP32[((((2300)|0))>>2)]=$1269;HEAP32[(($1257)>>2)]=$1228;var $1270=$1257;var $_sum15_i_i=((($_sum_i21_i)+(24))|0);var $1271=(($tbase_245_i+$_sum15_i_i)|0);var $1272=$1271;HEAP32[(($1272)>>2)]=$1270;var $_sum16_i_i=((($_sum_i21_i)+(12))|0);var $1273=(($tbase_245_i+$_sum16_i_i)|0);var $1274=$1273;HEAP32[(($1274)>>2)]=$1228;var $_sum17_i_i=((($_sum_i21_i)+(8))|0);var $1275=(($tbase_245_i+$_sum17_i_i)|0);var $1276=$1275;HEAP32[(($1276)>>2)]=$1228;label=303;break;case 291:var $1278=HEAP32[(($1257)>>2)];var $1279=(($I7_0_i_i)|(0))==31;if($1279){var $1284=0;label=293;break;}else{label=292;break;}
case 292:var $1281=$I7_0_i_i>>>1;var $1282=(((25)-($1281))|0);var $1284=$1282;label=293;break;case 293:var $1284;var $1285=$qsize_0_i_i<<$1284;var $K8_0_i_i=$1285;var $T_0_i27_i=$1278;label=294;break;case 294:var $T_0_i27_i;var $K8_0_i_i;var $1287=(($T_0_i27_i+4)|0);var $1288=HEAP32[(($1287)>>2)];var $1289=$1288&-8;var $1290=(($1289)|(0))==(($qsize_0_i_i)|(0));if($1290){label=299;break;}else{label=295;break;}
case 295:var $1292=$K8_0_i_i>>>31;var $1293=(($T_0_i27_i+16+($1292<<2))|0);var $1294=HEAP32[(($1293)>>2)];var $1295=(($1294)|(0))==0;var $1296=$K8_0_i_i<<1;if($1295){label=296;break;}else{var $K8_0_i_i=$1296;var $T_0_i27_i=$1294;label=294;break;}
case 296:var $1298=$1293;var $1299=HEAP32[((((2312)|0))>>2)];var $1300=(($1298)>>>(0))<(($1299)>>>(0));if($1300){label=298;break;}else{label=297;break;}
case 297:HEAP32[(($1293)>>2)]=$1228;var $_sum24_i_i=((($_sum_i21_i)+(24))|0);var $1302=(($tbase_245_i+$_sum24_i_i)|0);var $1303=$1302;HEAP32[(($1303)>>2)]=$T_0_i27_i;var $_sum25_i_i=((($_sum_i21_i)+(12))|0);var $1304=(($tbase_245_i+$_sum25_i_i)|0);var $1305=$1304;HEAP32[(($1305)>>2)]=$1228;var $_sum26_i_i=((($_sum_i21_i)+(8))|0);var $1306=(($tbase_245_i+$_sum26_i_i)|0);var $1307=$1306;HEAP32[(($1307)>>2)]=$1228;label=303;break;case 298:_abort();throw"Reached an unreachable!";case 299:var $1310=(($T_0_i27_i+8)|0);var $1311=HEAP32[(($1310)>>2)];var $1312=$T_0_i27_i;var $1313=HEAP32[((((2312)|0))>>2)];var $1314=(($1312)>>>(0))<(($1313)>>>(0));if($1314){label=302;break;}else{label=300;break;}
case 300:var $1316=$1311;var $1317=(($1316)>>>(0))<(($1313)>>>(0));if($1317){label=302;break;}else{label=301;break;}
case 301:var $1319=(($1311+12)|0);HEAP32[(($1319)>>2)]=$1228;HEAP32[(($1310)>>2)]=$1228;var $_sum21_i_i=((($_sum_i21_i)+(8))|0);var $1320=(($tbase_245_i+$_sum21_i_i)|0);var $1321=$1320;HEAP32[(($1321)>>2)]=$1311;var $_sum22_i_i=((($_sum_i21_i)+(12))|0);var $1322=(($tbase_245_i+$_sum22_i_i)|0);var $1323=$1322;HEAP32[(($1323)>>2)]=$T_0_i27_i;var $_sum23_i_i=((($_sum_i21_i)+(24))|0);var $1324=(($tbase_245_i+$_sum23_i_i)|0);var $1325=$1324;HEAP32[(($1325)>>2)]=0;label=303;break;case 302:_abort();throw"Reached an unreachable!";case 303:var $_sum1819_i_i=$993|8;var $1326=(($tbase_245_i+$_sum1819_i_i)|0);var $mem_0=$1326;label=341;break;case 304:var $1327=$890;var $sp_0_i_i_i=((2744)|0);label=305;break;case 305:var $sp_0_i_i_i;var $1329=(($sp_0_i_i_i)|0);var $1330=HEAP32[(($1329)>>2)];var $1331=(($1330)>>>(0))>(($1327)>>>(0));if($1331){label=307;break;}else{label=306;break;}
case 306:var $1333=(($sp_0_i_i_i+4)|0);var $1334=HEAP32[(($1333)>>2)];var $1335=(($1330+$1334)|0);var $1336=(($1335)>>>(0))>(($1327)>>>(0));if($1336){label=308;break;}else{label=307;break;}
case 307:var $1338=(($sp_0_i_i_i+8)|0);var $1339=HEAP32[(($1338)>>2)];var $sp_0_i_i_i=$1339;label=305;break;case 308:var $_sum_i15_i=((($1334)-(47))|0);var $_sum1_i16_i=((($1334)-(39))|0);var $1340=(($1330+$_sum1_i16_i)|0);var $1341=$1340;var $1342=$1341&7;var $1343=(($1342)|(0))==0;if($1343){var $1348=0;label=310;break;}else{label=309;break;}
case 309:var $1345=(((-$1341))|0);var $1346=$1345&7;var $1348=$1346;label=310;break;case 310:var $1348;var $_sum2_i17_i=((($_sum_i15_i)+($1348))|0);var $1349=(($1330+$_sum2_i17_i)|0);var $1350=(($890+16)|0);var $1351=$1350;var $1352=(($1349)>>>(0))<(($1351)>>>(0));var $1353=$1352?$1327:$1349;var $1354=(($1353+8)|0);var $1355=$1354;var $1356=((($tsize_244_i)-(40))|0);var $1357=(($tbase_245_i+8)|0);var $1358=$1357;var $1359=$1358&7;var $1360=(($1359)|(0))==0;if($1360){var $1364=0;label=312;break;}else{label=311;break;}
case 311:var $1362=(((-$1358))|0);var $1363=$1362&7;var $1364=$1363;label=312;break;case 312:var $1364;var $1365=(($tbase_245_i+$1364)|0);var $1366=$1365;var $1367=((($1356)-($1364))|0);HEAP32[((((2320)|0))>>2)]=$1366;HEAP32[((((2308)|0))>>2)]=$1367;var $1368=$1367|1;var $_sum_i_i_i=((($1364)+(4))|0);var $1369=(($tbase_245_i+$_sum_i_i_i)|0);var $1370=$1369;HEAP32[(($1370)>>2)]=$1368;var $_sum2_i_i_i=((($tsize_244_i)-(36))|0);var $1371=(($tbase_245_i+$_sum2_i_i_i)|0);var $1372=$1371;HEAP32[(($1372)>>2)]=40;var $1373=HEAP32[((((2272)|0))>>2)];HEAP32[((((2324)|0))>>2)]=$1373;var $1374=(($1353+4)|0);var $1375=$1374;HEAP32[(($1375)>>2)]=27;assert(16%1===0);HEAP32[(($1354)>>2)]=HEAP32[(((((2744)|0)))>>2)];HEAP32[((($1354)+(4))>>2)]=HEAP32[((((((2744)|0)))+(4))>>2)];HEAP32[((($1354)+(8))>>2)]=HEAP32[((((((2744)|0)))+(8))>>2)];HEAP32[((($1354)+(12))>>2)]=HEAP32[((((((2744)|0)))+(12))>>2)];HEAP32[((((2744)|0))>>2)]=$tbase_245_i;HEAP32[((((2748)|0))>>2)]=$tsize_244_i;HEAP32[((((2756)|0))>>2)]=0;HEAP32[((((2752)|0))>>2)]=$1355;var $1376=(($1353+28)|0);var $1377=$1376;HEAP32[(($1377)>>2)]=7;var $1378=(($1353+32)|0);var $1379=(($1378)>>>(0))<(($1335)>>>(0));if($1379){var $1380=$1377;label=313;break;}else{label=314;break;}
case 313:var $1380;var $1381=(($1380+4)|0);HEAP32[(($1381)>>2)]=7;var $1382=(($1380+8)|0);var $1383=$1382;var $1384=(($1383)>>>(0))<(($1335)>>>(0));if($1384){var $1380=$1381;label=313;break;}else{label=314;break;}
case 314:var $1385=(($1353)|(0))==(($1327)|(0));if($1385){label=338;break;}else{label=315;break;}
case 315:var $1387=$1353;var $1388=$890;var $1389=((($1387)-($1388))|0);var $1390=(($1327+$1389)|0);var $_sum3_i_i=((($1389)+(4))|0);var $1391=(($1327+$_sum3_i_i)|0);var $1392=$1391;var $1393=HEAP32[(($1392)>>2)];var $1394=$1393&-2;HEAP32[(($1392)>>2)]=$1394;var $1395=$1389|1;var $1396=(($890+4)|0);HEAP32[(($1396)>>2)]=$1395;var $1397=$1390;HEAP32[(($1397)>>2)]=$1389;var $1398=$1389>>>3;var $1399=(($1389)>>>(0))<256;if($1399){label=316;break;}else{label=321;break;}
case 316:var $1401=$1398<<1;var $1402=((2336+($1401<<2))|0);var $1403=$1402;var $1404=HEAP32[((((2296)|0))>>2)];var $1405=1<<$1398;var $1406=$1404&$1405;var $1407=(($1406)|(0))==0;if($1407){label=317;break;}else{label=318;break;}
case 317:var $1409=$1404|$1405;HEAP32[((((2296)|0))>>2)]=$1409;var $_sum11_pre_i_i=((($1401)+(2))|0);var $_pre_i_i=((2336+($_sum11_pre_i_i<<2))|0);var $F_0_i_i=$1403;var $_pre_phi_i_i=$_pre_i_i;label=320;break;case 318:var $_sum12_i_i=((($1401)+(2))|0);var $1411=((2336+($_sum12_i_i<<2))|0);var $1412=HEAP32[(($1411)>>2)];var $1413=$1412;var $1414=HEAP32[((((2312)|0))>>2)];var $1415=(($1413)>>>(0))<(($1414)>>>(0));if($1415){label=319;break;}else{var $F_0_i_i=$1412;var $_pre_phi_i_i=$1411;label=320;break;}
case 319:_abort();throw"Reached an unreachable!";case 320:var $_pre_phi_i_i;var $F_0_i_i;HEAP32[(($_pre_phi_i_i)>>2)]=$890;var $1418=(($F_0_i_i+12)|0);HEAP32[(($1418)>>2)]=$890;var $1419=(($890+8)|0);HEAP32[(($1419)>>2)]=$F_0_i_i;var $1420=(($890+12)|0);HEAP32[(($1420)>>2)]=$1403;label=338;break;case 321:var $1422=$890;var $1423=$1389>>>8;var $1424=(($1423)|(0))==0;if($1424){var $I1_0_i_i=0;label=324;break;}else{label=322;break;}
case 322:var $1426=(($1389)>>>(0))>16777215;if($1426){var $I1_0_i_i=31;label=324;break;}else{label=323;break;}
case 323:var $1428=((($1423)+(1048320))|0);var $1429=$1428>>>16;var $1430=$1429&8;var $1431=$1423<<$1430;var $1432=((($1431)+(520192))|0);var $1433=$1432>>>16;var $1434=$1433&4;var $1435=$1434|$1430;var $1436=$1431<<$1434;var $1437=((($1436)+(245760))|0);var $1438=$1437>>>16;var $1439=$1438&2;var $1440=$1435|$1439;var $1441=(((14)-($1440))|0);var $1442=$1436<<$1439;var $1443=$1442>>>15;var $1444=((($1441)+($1443))|0);var $1445=$1444<<1;var $1446=((($1444)+(7))|0);var $1447=$1389>>>(($1446)>>>(0));var $1448=$1447&1;var $1449=$1448|$1445;var $I1_0_i_i=$1449;label=324;break;case 324:var $I1_0_i_i;var $1451=((2600+($I1_0_i_i<<2))|0);var $1452=(($890+28)|0);var $I1_0_c_i_i=$I1_0_i_i;HEAP32[(($1452)>>2)]=$I1_0_c_i_i;var $1453=(($890+20)|0);HEAP32[(($1453)>>2)]=0;var $1454=(($890+16)|0);HEAP32[(($1454)>>2)]=0;var $1455=HEAP32[((((2300)|0))>>2)];var $1456=1<<$I1_0_i_i;var $1457=$1455&$1456;var $1458=(($1457)|(0))==0;if($1458){label=325;break;}else{label=326;break;}
case 325:var $1460=$1455|$1456;HEAP32[((((2300)|0))>>2)]=$1460;HEAP32[(($1451)>>2)]=$1422;var $1461=(($890+24)|0);var $_c_i_i=$1451;HEAP32[(($1461)>>2)]=$_c_i_i;var $1462=(($890+12)|0);HEAP32[(($1462)>>2)]=$890;var $1463=(($890+8)|0);HEAP32[(($1463)>>2)]=$890;label=338;break;case 326:var $1465=HEAP32[(($1451)>>2)];var $1466=(($I1_0_i_i)|(0))==31;if($1466){var $1471=0;label=328;break;}else{label=327;break;}
case 327:var $1468=$I1_0_i_i>>>1;var $1469=(((25)-($1468))|0);var $1471=$1469;label=328;break;case 328:var $1471;var $1472=$1389<<$1471;var $K2_0_i_i=$1472;var $T_0_i_i=$1465;label=329;break;case 329:var $T_0_i_i;var $K2_0_i_i;var $1474=(($T_0_i_i+4)|0);var $1475=HEAP32[(($1474)>>2)];var $1476=$1475&-8;var $1477=(($1476)|(0))==(($1389)|(0));if($1477){label=334;break;}else{label=330;break;}
case 330:var $1479=$K2_0_i_i>>>31;var $1480=(($T_0_i_i+16+($1479<<2))|0);var $1481=HEAP32[(($1480)>>2)];var $1482=(($1481)|(0))==0;var $1483=$K2_0_i_i<<1;if($1482){label=331;break;}else{var $K2_0_i_i=$1483;var $T_0_i_i=$1481;label=329;break;}
case 331:var $1485=$1480;var $1486=HEAP32[((((2312)|0))>>2)];var $1487=(($1485)>>>(0))<(($1486)>>>(0));if($1487){label=333;break;}else{label=332;break;}
case 332:HEAP32[(($1480)>>2)]=$1422;var $1489=(($890+24)|0);var $T_0_c8_i_i=$T_0_i_i;HEAP32[(($1489)>>2)]=$T_0_c8_i_i;var $1490=(($890+12)|0);HEAP32[(($1490)>>2)]=$890;var $1491=(($890+8)|0);HEAP32[(($1491)>>2)]=$890;label=338;break;case 333:_abort();throw"Reached an unreachable!";case 334:var $1494=(($T_0_i_i+8)|0);var $1495=HEAP32[(($1494)>>2)];var $1496=$T_0_i_i;var $1497=HEAP32[((((2312)|0))>>2)];var $1498=(($1496)>>>(0))<(($1497)>>>(0));if($1498){label=337;break;}else{label=335;break;}
case 335:var $1500=$1495;var $1501=(($1500)>>>(0))<(($1497)>>>(0));if($1501){label=337;break;}else{label=336;break;}
case 336:var $1503=(($1495+12)|0);HEAP32[(($1503)>>2)]=$1422;HEAP32[(($1494)>>2)]=$1422;var $1504=(($890+8)|0);var $_c7_i_i=$1495;HEAP32[(($1504)>>2)]=$_c7_i_i;var $1505=(($890+12)|0);var $T_0_c_i_i=$T_0_i_i;HEAP32[(($1505)>>2)]=$T_0_c_i_i;var $1506=(($890+24)|0);HEAP32[(($1506)>>2)]=0;label=338;break;case 337:_abort();throw"Reached an unreachable!";case 338:var $1507=HEAP32[((((2308)|0))>>2)];var $1508=(($1507)>>>(0))>(($nb_0)>>>(0));if($1508){label=339;break;}else{label=340;break;}
case 339:var $1510=((($1507)-($nb_0))|0);HEAP32[((((2308)|0))>>2)]=$1510;var $1511=HEAP32[((((2320)|0))>>2)];var $1512=$1511;var $1513=(($1512+$nb_0)|0);var $1514=$1513;HEAP32[((((2320)|0))>>2)]=$1514;var $1515=$1510|1;var $_sum_i134=((($nb_0)+(4))|0);var $1516=(($1512+$_sum_i134)|0);var $1517=$1516;HEAP32[(($1517)>>2)]=$1515;var $1518=$nb_0|3;var $1519=(($1511+4)|0);HEAP32[(($1519)>>2)]=$1518;var $1520=(($1511+8)|0);var $1521=$1520;var $mem_0=$1521;label=341;break;case 340:var $1522=___errno_location();HEAP32[(($1522)>>2)]=12;var $mem_0=0;label=341;break;case 341:var $mem_0;return $mem_0;default:assert(0,"bad label: "+label);}}
Module["_malloc"]=_malloc;function _free($mem){var label=0;label=1;while(1)switch(label){case 1:var $1=(($mem)|(0))==0;if($1){label=140;break;}else{label=2;break;}
case 2:var $3=((($mem)-(8))|0);var $4=$3;var $5=HEAP32[((((2312)|0))>>2)];var $6=(($3)>>>(0))<(($5)>>>(0));if($6){label=139;break;}else{label=3;break;}
case 3:var $8=((($mem)-(4))|0);var $9=$8;var $10=HEAP32[(($9)>>2)];var $11=$10&3;var $12=(($11)|(0))==1;if($12){label=139;break;}else{label=4;break;}
case 4:var $14=$10&-8;var $_sum=((($14)-(8))|0);var $15=(($mem+$_sum)|0);var $16=$15;var $17=$10&1;var $18=(($17)|(0))==0;if($18){label=5;break;}else{var $p_0=$4;var $psize_0=$14;label=56;break;}
case 5:var $20=$3;var $21=HEAP32[(($20)>>2)];var $22=(($11)|(0))==0;if($22){label=140;break;}else{label=6;break;}
case 6:var $_sum232=(((-8)-($21))|0);var $24=(($mem+$_sum232)|0);var $25=$24;var $26=((($21)+($14))|0);var $27=(($24)>>>(0))<(($5)>>>(0));if($27){label=139;break;}else{label=7;break;}
case 7:var $29=HEAP32[((((2316)|0))>>2)];var $30=(($25)|(0))==(($29)|(0));if($30){label=54;break;}else{label=8;break;}
case 8:var $32=$21>>>3;var $33=(($21)>>>(0))<256;if($33){label=9;break;}else{label=21;break;}
case 9:var $_sum276=((($_sum232)+(8))|0);var $35=(($mem+$_sum276)|0);var $36=$35;var $37=HEAP32[(($36)>>2)];var $_sum277=((($_sum232)+(12))|0);var $38=(($mem+$_sum277)|0);var $39=$38;var $40=HEAP32[(($39)>>2)];var $41=$32<<1;var $42=((2336+($41<<2))|0);var $43=$42;var $44=(($37)|(0))==(($43)|(0));if($44){label=12;break;}else{label=10;break;}
case 10:var $46=$37;var $47=(($46)>>>(0))<(($5)>>>(0));if($47){label=20;break;}else{label=11;break;}
case 11:var $49=(($37+12)|0);var $50=HEAP32[(($49)>>2)];var $51=(($50)|(0))==(($25)|(0));if($51){label=12;break;}else{label=20;break;}
case 12:var $52=(($40)|(0))==(($37)|(0));if($52){label=13;break;}else{label=14;break;}
case 13:var $54=1<<$32;var $55=$54^-1;var $56=HEAP32[((((2296)|0))>>2)];var $57=$56&$55;HEAP32[((((2296)|0))>>2)]=$57;var $p_0=$25;var $psize_0=$26;label=56;break;case 14:var $59=(($40)|(0))==(($43)|(0));if($59){label=15;break;}else{label=16;break;}
case 15:var $_pre305=(($40+8)|0);var $_pre_phi306=$_pre305;label=18;break;case 16:var $61=$40;var $62=(($61)>>>(0))<(($5)>>>(0));if($62){label=19;break;}else{label=17;break;}
case 17:var $64=(($40+8)|0);var $65=HEAP32[(($64)>>2)];var $66=(($65)|(0))==(($25)|(0));if($66){var $_pre_phi306=$64;label=18;break;}else{label=19;break;}
case 18:var $_pre_phi306;var $67=(($37+12)|0);HEAP32[(($67)>>2)]=$40;HEAP32[(($_pre_phi306)>>2)]=$37;var $p_0=$25;var $psize_0=$26;label=56;break;case 19:_abort();throw"Reached an unreachable!";case 20:_abort();throw"Reached an unreachable!";case 21:var $69=$24;var $_sum266=((($_sum232)+(24))|0);var $70=(($mem+$_sum266)|0);var $71=$70;var $72=HEAP32[(($71)>>2)];var $_sum267=((($_sum232)+(12))|0);var $73=(($mem+$_sum267)|0);var $74=$73;var $75=HEAP32[(($74)>>2)];var $76=(($75)|(0))==(($69)|(0));if($76){label=27;break;}else{label=22;break;}
case 22:var $_sum273=((($_sum232)+(8))|0);var $78=(($mem+$_sum273)|0);var $79=$78;var $80=HEAP32[(($79)>>2)];var $81=$80;var $82=(($81)>>>(0))<(($5)>>>(0));if($82){label=26;break;}else{label=23;break;}
case 23:var $84=(($80+12)|0);var $85=HEAP32[(($84)>>2)];var $86=(($85)|(0))==(($69)|(0));if($86){label=24;break;}else{label=26;break;}
case 24:var $88=(($75+8)|0);var $89=HEAP32[(($88)>>2)];var $90=(($89)|(0))==(($69)|(0));if($90){label=25;break;}else{label=26;break;}
case 25:HEAP32[(($84)>>2)]=$75;HEAP32[(($88)>>2)]=$80;var $R_1=$75;label=34;break;case 26:_abort();throw"Reached an unreachable!";case 27:var $_sum269=((($_sum232)+(20))|0);var $93=(($mem+$_sum269)|0);var $94=$93;var $95=HEAP32[(($94)>>2)];var $96=(($95)|(0))==0;if($96){label=28;break;}else{var $R_0=$95;var $RP_0=$94;label=29;break;}
case 28:var $_sum268=((($_sum232)+(16))|0);var $98=(($mem+$_sum268)|0);var $99=$98;var $100=HEAP32[(($99)>>2)];var $101=(($100)|(0))==0;if($101){var $R_1=0;label=34;break;}else{var $R_0=$100;var $RP_0=$99;label=29;break;}
case 29:var $RP_0;var $R_0;var $102=(($R_0+20)|0);var $103=HEAP32[(($102)>>2)];var $104=(($103)|(0))==0;if($104){label=30;break;}else{var $R_0=$103;var $RP_0=$102;label=29;break;}
case 30:var $106=(($R_0+16)|0);var $107=HEAP32[(($106)>>2)];var $108=(($107)|(0))==0;if($108){label=31;break;}else{var $R_0=$107;var $RP_0=$106;label=29;break;}
case 31:var $110=$RP_0;var $111=(($110)>>>(0))<(($5)>>>(0));if($111){label=33;break;}else{label=32;break;}
case 32:HEAP32[(($RP_0)>>2)]=0;var $R_1=$R_0;label=34;break;case 33:_abort();throw"Reached an unreachable!";case 34:var $R_1;var $115=(($72)|(0))==0;if($115){var $p_0=$25;var $psize_0=$26;label=56;break;}else{label=35;break;}
case 35:var $_sum270=((($_sum232)+(28))|0);var $117=(($mem+$_sum270)|0);var $118=$117;var $119=HEAP32[(($118)>>2)];var $120=((2600+($119<<2))|0);var $121=HEAP32[(($120)>>2)];var $122=(($69)|(0))==(($121)|(0));if($122){label=36;break;}else{label=38;break;}
case 36:HEAP32[(($120)>>2)]=$R_1;var $cond=(($R_1)|(0))==0;if($cond){label=37;break;}else{label=44;break;}
case 37:var $124=HEAP32[(($118)>>2)];var $125=1<<$124;var $126=$125^-1;var $127=HEAP32[((((2300)|0))>>2)];var $128=$127&$126;HEAP32[((((2300)|0))>>2)]=$128;var $p_0=$25;var $psize_0=$26;label=56;break;case 38:var $130=$72;var $131=HEAP32[((((2312)|0))>>2)];var $132=(($130)>>>(0))<(($131)>>>(0));if($132){label=42;break;}else{label=39;break;}
case 39:var $134=(($72+16)|0);var $135=HEAP32[(($134)>>2)];var $136=(($135)|(0))==(($69)|(0));if($136){label=40;break;}else{label=41;break;}
case 40:HEAP32[(($134)>>2)]=$R_1;label=43;break;case 41:var $139=(($72+20)|0);HEAP32[(($139)>>2)]=$R_1;label=43;break;case 42:_abort();throw"Reached an unreachable!";case 43:var $142=(($R_1)|(0))==0;if($142){var $p_0=$25;var $psize_0=$26;label=56;break;}else{label=44;break;}
case 44:var $144=$R_1;var $145=HEAP32[((((2312)|0))>>2)];var $146=(($144)>>>(0))<(($145)>>>(0));if($146){label=53;break;}else{label=45;break;}
case 45:var $148=(($R_1+24)|0);HEAP32[(($148)>>2)]=$72;var $_sum271=((($_sum232)+(16))|0);var $149=(($mem+$_sum271)|0);var $150=$149;var $151=HEAP32[(($150)>>2)];var $152=(($151)|(0))==0;if($152){label=49;break;}else{label=46;break;}
case 46:var $154=$151;var $155=HEAP32[((((2312)|0))>>2)];var $156=(($154)>>>(0))<(($155)>>>(0));if($156){label=48;break;}else{label=47;break;}
case 47:var $158=(($R_1+16)|0);HEAP32[(($158)>>2)]=$151;var $159=(($151+24)|0);HEAP32[(($159)>>2)]=$R_1;label=49;break;case 48:_abort();throw"Reached an unreachable!";case 49:var $_sum272=((($_sum232)+(20))|0);var $162=(($mem+$_sum272)|0);var $163=$162;var $164=HEAP32[(($163)>>2)];var $165=(($164)|(0))==0;if($165){var $p_0=$25;var $psize_0=$26;label=56;break;}else{label=50;break;}
case 50:var $167=$164;var $168=HEAP32[((((2312)|0))>>2)];var $169=(($167)>>>(0))<(($168)>>>(0));if($169){label=52;break;}else{label=51;break;}
case 51:var $171=(($R_1+20)|0);HEAP32[(($171)>>2)]=$164;var $172=(($164+24)|0);HEAP32[(($172)>>2)]=$R_1;var $p_0=$25;var $psize_0=$26;label=56;break;case 52:_abort();throw"Reached an unreachable!";case 53:_abort();throw"Reached an unreachable!";case 54:var $_sum233=((($14)-(4))|0);var $176=(($mem+$_sum233)|0);var $177=$176;var $178=HEAP32[(($177)>>2)];var $179=$178&3;var $180=(($179)|(0))==3;if($180){label=55;break;}else{var $p_0=$25;var $psize_0=$26;label=56;break;}
case 55:HEAP32[((((2304)|0))>>2)]=$26;var $182=HEAP32[(($177)>>2)];var $183=$182&-2;HEAP32[(($177)>>2)]=$183;var $184=$26|1;var $_sum264=((($_sum232)+(4))|0);var $185=(($mem+$_sum264)|0);var $186=$185;HEAP32[(($186)>>2)]=$184;var $187=$15;HEAP32[(($187)>>2)]=$26;label=140;break;case 56:var $psize_0;var $p_0;var $189=$p_0;var $190=(($189)>>>(0))<(($15)>>>(0));if($190){label=57;break;}else{label=139;break;}
case 57:var $_sum263=((($14)-(4))|0);var $192=(($mem+$_sum263)|0);var $193=$192;var $194=HEAP32[(($193)>>2)];var $195=$194&1;var $phitmp=(($195)|(0))==0;if($phitmp){label=139;break;}else{label=58;break;}
case 58:var $197=$194&2;var $198=(($197)|(0))==0;if($198){label=59;break;}else{label=112;break;}
case 59:var $200=HEAP32[((((2320)|0))>>2)];var $201=(($16)|(0))==(($200)|(0));if($201){label=60;break;}else{label=62;break;}
case 60:var $203=HEAP32[((((2308)|0))>>2)];var $204=((($203)+($psize_0))|0);HEAP32[((((2308)|0))>>2)]=$204;HEAP32[((((2320)|0))>>2)]=$p_0;var $205=$204|1;var $206=(($p_0+4)|0);HEAP32[(($206)>>2)]=$205;var $207=HEAP32[((((2316)|0))>>2)];var $208=(($p_0)|(0))==(($207)|(0));if($208){label=61;break;}else{label=140;break;}
case 61:HEAP32[((((2316)|0))>>2)]=0;HEAP32[((((2304)|0))>>2)]=0;label=140;break;case 62:var $211=HEAP32[((((2316)|0))>>2)];var $212=(($16)|(0))==(($211)|(0));if($212){label=63;break;}else{label=64;break;}
case 63:var $214=HEAP32[((((2304)|0))>>2)];var $215=((($214)+($psize_0))|0);HEAP32[((((2304)|0))>>2)]=$215;HEAP32[((((2316)|0))>>2)]=$p_0;var $216=$215|1;var $217=(($p_0+4)|0);HEAP32[(($217)>>2)]=$216;var $218=(($189+$215)|0);var $219=$218;HEAP32[(($219)>>2)]=$215;label=140;break;case 64:var $221=$194&-8;var $222=((($221)+($psize_0))|0);var $223=$194>>>3;var $224=(($194)>>>(0))<256;if($224){label=65;break;}else{label=77;break;}
case 65:var $226=(($mem+$14)|0);var $227=$226;var $228=HEAP32[(($227)>>2)];var $_sum257258=$14|4;var $229=(($mem+$_sum257258)|0);var $230=$229;var $231=HEAP32[(($230)>>2)];var $232=$223<<1;var $233=((2336+($232<<2))|0);var $234=$233;var $235=(($228)|(0))==(($234)|(0));if($235){label=68;break;}else{label=66;break;}
case 66:var $237=$228;var $238=HEAP32[((((2312)|0))>>2)];var $239=(($237)>>>(0))<(($238)>>>(0));if($239){label=76;break;}else{label=67;break;}
case 67:var $241=(($228+12)|0);var $242=HEAP32[(($241)>>2)];var $243=(($242)|(0))==(($16)|(0));if($243){label=68;break;}else{label=76;break;}
case 68:var $244=(($231)|(0))==(($228)|(0));if($244){label=69;break;}else{label=70;break;}
case 69:var $246=1<<$223;var $247=$246^-1;var $248=HEAP32[((((2296)|0))>>2)];var $249=$248&$247;HEAP32[((((2296)|0))>>2)]=$249;label=110;break;case 70:var $251=(($231)|(0))==(($234)|(0));if($251){label=71;break;}else{label=72;break;}
case 71:var $_pre303=(($231+8)|0);var $_pre_phi304=$_pre303;label=74;break;case 72:var $253=$231;var $254=HEAP32[((((2312)|0))>>2)];var $255=(($253)>>>(0))<(($254)>>>(0));if($255){label=75;break;}else{label=73;break;}
case 73:var $257=(($231+8)|0);var $258=HEAP32[(($257)>>2)];var $259=(($258)|(0))==(($16)|(0));if($259){var $_pre_phi304=$257;label=74;break;}else{label=75;break;}
case 74:var $_pre_phi304;var $260=(($228+12)|0);HEAP32[(($260)>>2)]=$231;HEAP32[(($_pre_phi304)>>2)]=$228;label=110;break;case 75:_abort();throw"Reached an unreachable!";case 76:_abort();throw"Reached an unreachable!";case 77:var $262=$15;var $_sum235=((($14)+(16))|0);var $263=(($mem+$_sum235)|0);var $264=$263;var $265=HEAP32[(($264)>>2)];var $_sum236237=$14|4;var $266=(($mem+$_sum236237)|0);var $267=$266;var $268=HEAP32[(($267)>>2)];var $269=(($268)|(0))==(($262)|(0));if($269){label=83;break;}else{label=78;break;}
case 78:var $271=(($mem+$14)|0);var $272=$271;var $273=HEAP32[(($272)>>2)];var $274=$273;var $275=HEAP32[((((2312)|0))>>2)];var $276=(($274)>>>(0))<(($275)>>>(0));if($276){label=82;break;}else{label=79;break;}
case 79:var $278=(($273+12)|0);var $279=HEAP32[(($278)>>2)];var $280=(($279)|(0))==(($262)|(0));if($280){label=80;break;}else{label=82;break;}
case 80:var $282=(($268+8)|0);var $283=HEAP32[(($282)>>2)];var $284=(($283)|(0))==(($262)|(0));if($284){label=81;break;}else{label=82;break;}
case 81:HEAP32[(($278)>>2)]=$268;HEAP32[(($282)>>2)]=$273;var $R7_1=$268;label=90;break;case 82:_abort();throw"Reached an unreachable!";case 83:var $_sum239=((($14)+(12))|0);var $287=(($mem+$_sum239)|0);var $288=$287;var $289=HEAP32[(($288)>>2)];var $290=(($289)|(0))==0;if($290){label=84;break;}else{var $R7_0=$289;var $RP9_0=$288;label=85;break;}
case 84:var $_sum238=((($14)+(8))|0);var $292=(($mem+$_sum238)|0);var $293=$292;var $294=HEAP32[(($293)>>2)];var $295=(($294)|(0))==0;if($295){var $R7_1=0;label=90;break;}else{var $R7_0=$294;var $RP9_0=$293;label=85;break;}
case 85:var $RP9_0;var $R7_0;var $296=(($R7_0+20)|0);var $297=HEAP32[(($296)>>2)];var $298=(($297)|(0))==0;if($298){label=86;break;}else{var $R7_0=$297;var $RP9_0=$296;label=85;break;}
case 86:var $300=(($R7_0+16)|0);var $301=HEAP32[(($300)>>2)];var $302=(($301)|(0))==0;if($302){label=87;break;}else{var $R7_0=$301;var $RP9_0=$300;label=85;break;}
case 87:var $304=$RP9_0;var $305=HEAP32[((((2312)|0))>>2)];var $306=(($304)>>>(0))<(($305)>>>(0));if($306){label=89;break;}else{label=88;break;}
case 88:HEAP32[(($RP9_0)>>2)]=0;var $R7_1=$R7_0;label=90;break;case 89:_abort();throw"Reached an unreachable!";case 90:var $R7_1;var $310=(($265)|(0))==0;if($310){label=110;break;}else{label=91;break;}
case 91:var $_sum250=((($14)+(20))|0);var $312=(($mem+$_sum250)|0);var $313=$312;var $314=HEAP32[(($313)>>2)];var $315=((2600+($314<<2))|0);var $316=HEAP32[(($315)>>2)];var $317=(($262)|(0))==(($316)|(0));if($317){label=92;break;}else{label=94;break;}
case 92:HEAP32[(($315)>>2)]=$R7_1;var $cond298=(($R7_1)|(0))==0;if($cond298){label=93;break;}else{label=100;break;}
case 93:var $319=HEAP32[(($313)>>2)];var $320=1<<$319;var $321=$320^-1;var $322=HEAP32[((((2300)|0))>>2)];var $323=$322&$321;HEAP32[((((2300)|0))>>2)]=$323;label=110;break;case 94:var $325=$265;var $326=HEAP32[((((2312)|0))>>2)];var $327=(($325)>>>(0))<(($326)>>>(0));if($327){label=98;break;}else{label=95;break;}
case 95:var $329=(($265+16)|0);var $330=HEAP32[(($329)>>2)];var $331=(($330)|(0))==(($262)|(0));if($331){label=96;break;}else{label=97;break;}
case 96:HEAP32[(($329)>>2)]=$R7_1;label=99;break;case 97:var $334=(($265+20)|0);HEAP32[(($334)>>2)]=$R7_1;label=99;break;case 98:_abort();throw"Reached an unreachable!";case 99:var $337=(($R7_1)|(0))==0;if($337){label=110;break;}else{label=100;break;}
case 100:var $339=$R7_1;var $340=HEAP32[((((2312)|0))>>2)];var $341=(($339)>>>(0))<(($340)>>>(0));if($341){label=109;break;}else{label=101;break;}
case 101:var $343=(($R7_1+24)|0);HEAP32[(($343)>>2)]=$265;var $_sum251=((($14)+(8))|0);var $344=(($mem+$_sum251)|0);var $345=$344;var $346=HEAP32[(($345)>>2)];var $347=(($346)|(0))==0;if($347){label=105;break;}else{label=102;break;}
case 102:var $349=$346;var $350=HEAP32[((((2312)|0))>>2)];var $351=(($349)>>>(0))<(($350)>>>(0));if($351){label=104;break;}else{label=103;break;}
case 103:var $353=(($R7_1+16)|0);HEAP32[(($353)>>2)]=$346;var $354=(($346+24)|0);HEAP32[(($354)>>2)]=$R7_1;label=105;break;case 104:_abort();throw"Reached an unreachable!";case 105:var $_sum252=((($14)+(12))|0);var $357=(($mem+$_sum252)|0);var $358=$357;var $359=HEAP32[(($358)>>2)];var $360=(($359)|(0))==0;if($360){label=110;break;}else{label=106;break;}
case 106:var $362=$359;var $363=HEAP32[((((2312)|0))>>2)];var $364=(($362)>>>(0))<(($363)>>>(0));if($364){label=108;break;}else{label=107;break;}
case 107:var $366=(($R7_1+20)|0);HEAP32[(($366)>>2)]=$359;var $367=(($359+24)|0);HEAP32[(($367)>>2)]=$R7_1;label=110;break;case 108:_abort();throw"Reached an unreachable!";case 109:_abort();throw"Reached an unreachable!";case 110:var $371=$222|1;var $372=(($p_0+4)|0);HEAP32[(($372)>>2)]=$371;var $373=(($189+$222)|0);var $374=$373;HEAP32[(($374)>>2)]=$222;var $375=HEAP32[((((2316)|0))>>2)];var $376=(($p_0)|(0))==(($375)|(0));if($376){label=111;break;}else{var $psize_1=$222;label=113;break;}
case 111:HEAP32[((((2304)|0))>>2)]=$222;label=140;break;case 112:var $379=$194&-2;HEAP32[(($193)>>2)]=$379;var $380=$psize_0|1;var $381=(($p_0+4)|0);HEAP32[(($381)>>2)]=$380;var $382=(($189+$psize_0)|0);var $383=$382;HEAP32[(($383)>>2)]=$psize_0;var $psize_1=$psize_0;label=113;break;case 113:var $psize_1;var $385=$psize_1>>>3;var $386=(($psize_1)>>>(0))<256;if($386){label=114;break;}else{label=119;break;}
case 114:var $388=$385<<1;var $389=((2336+($388<<2))|0);var $390=$389;var $391=HEAP32[((((2296)|0))>>2)];var $392=1<<$385;var $393=$391&$392;var $394=(($393)|(0))==0;if($394){label=115;break;}else{label=116;break;}
case 115:var $396=$391|$392;HEAP32[((((2296)|0))>>2)]=$396;var $_sum248_pre=((($388)+(2))|0);var $_pre=((2336+($_sum248_pre<<2))|0);var $F16_0=$390;var $_pre_phi=$_pre;label=118;break;case 116:var $_sum249=((($388)+(2))|0);var $398=((2336+($_sum249<<2))|0);var $399=HEAP32[(($398)>>2)];var $400=$399;var $401=HEAP32[((((2312)|0))>>2)];var $402=(($400)>>>(0))<(($401)>>>(0));if($402){label=117;break;}else{var $F16_0=$399;var $_pre_phi=$398;label=118;break;}
case 117:_abort();throw"Reached an unreachable!";case 118:var $_pre_phi;var $F16_0;HEAP32[(($_pre_phi)>>2)]=$p_0;var $405=(($F16_0+12)|0);HEAP32[(($405)>>2)]=$p_0;var $406=(($p_0+8)|0);HEAP32[(($406)>>2)]=$F16_0;var $407=(($p_0+12)|0);HEAP32[(($407)>>2)]=$390;label=140;break;case 119:var $409=$p_0;var $410=$psize_1>>>8;var $411=(($410)|(0))==0;if($411){var $I18_0=0;label=122;break;}else{label=120;break;}
case 120:var $413=(($psize_1)>>>(0))>16777215;if($413){var $I18_0=31;label=122;break;}else{label=121;break;}
case 121:var $415=((($410)+(1048320))|0);var $416=$415>>>16;var $417=$416&8;var $418=$410<<$417;var $419=((($418)+(520192))|0);var $420=$419>>>16;var $421=$420&4;var $422=$421|$417;var $423=$418<<$421;var $424=((($423)+(245760))|0);var $425=$424>>>16;var $426=$425&2;var $427=$422|$426;var $428=(((14)-($427))|0);var $429=$423<<$426;var $430=$429>>>15;var $431=((($428)+($430))|0);var $432=$431<<1;var $433=((($431)+(7))|0);var $434=$psize_1>>>(($433)>>>(0));var $435=$434&1;var $436=$435|$432;var $I18_0=$436;label=122;break;case 122:var $I18_0;var $438=((2600+($I18_0<<2))|0);var $439=(($p_0+28)|0);var $I18_0_c=$I18_0;HEAP32[(($439)>>2)]=$I18_0_c;var $440=(($p_0+20)|0);HEAP32[(($440)>>2)]=0;var $441=(($p_0+16)|0);HEAP32[(($441)>>2)]=0;var $442=HEAP32[((((2300)|0))>>2)];var $443=1<<$I18_0;var $444=$442&$443;var $445=(($444)|(0))==0;if($445){label=123;break;}else{label=124;break;}
case 123:var $447=$442|$443;HEAP32[((((2300)|0))>>2)]=$447;HEAP32[(($438)>>2)]=$409;var $448=(($p_0+24)|0);var $_c=$438;HEAP32[(($448)>>2)]=$_c;var $449=(($p_0+12)|0);HEAP32[(($449)>>2)]=$p_0;var $450=(($p_0+8)|0);HEAP32[(($450)>>2)]=$p_0;label=136;break;case 124:var $452=HEAP32[(($438)>>2)];var $453=(($I18_0)|(0))==31;if($453){var $458=0;label=126;break;}else{label=125;break;}
case 125:var $455=$I18_0>>>1;var $456=(((25)-($455))|0);var $458=$456;label=126;break;case 126:var $458;var $459=$psize_1<<$458;var $K19_0=$459;var $T_0=$452;label=127;break;case 127:var $T_0;var $K19_0;var $461=(($T_0+4)|0);var $462=HEAP32[(($461)>>2)];var $463=$462&-8;var $464=(($463)|(0))==(($psize_1)|(0));if($464){label=132;break;}else{label=128;break;}
case 128:var $466=$K19_0>>>31;var $467=(($T_0+16+($466<<2))|0);var $468=HEAP32[(($467)>>2)];var $469=(($468)|(0))==0;var $470=$K19_0<<1;if($469){label=129;break;}else{var $K19_0=$470;var $T_0=$468;label=127;break;}
case 129:var $472=$467;var $473=HEAP32[((((2312)|0))>>2)];var $474=(($472)>>>(0))<(($473)>>>(0));if($474){label=131;break;}else{label=130;break;}
case 130:HEAP32[(($467)>>2)]=$409;var $476=(($p_0+24)|0);var $T_0_c245=$T_0;HEAP32[(($476)>>2)]=$T_0_c245;var $477=(($p_0+12)|0);HEAP32[(($477)>>2)]=$p_0;var $478=(($p_0+8)|0);HEAP32[(($478)>>2)]=$p_0;label=136;break;case 131:_abort();throw"Reached an unreachable!";case 132:var $481=(($T_0+8)|0);var $482=HEAP32[(($481)>>2)];var $483=$T_0;var $484=HEAP32[((((2312)|0))>>2)];var $485=(($483)>>>(0))<(($484)>>>(0));if($485){label=135;break;}else{label=133;break;}
case 133:var $487=$482;var $488=(($487)>>>(0))<(($484)>>>(0));if($488){label=135;break;}else{label=134;break;}
case 134:var $490=(($482+12)|0);HEAP32[(($490)>>2)]=$409;HEAP32[(($481)>>2)]=$409;var $491=(($p_0+8)|0);var $_c244=$482;HEAP32[(($491)>>2)]=$_c244;var $492=(($p_0+12)|0);var $T_0_c=$T_0;HEAP32[(($492)>>2)]=$T_0_c;var $493=(($p_0+24)|0);HEAP32[(($493)>>2)]=0;label=136;break;case 135:_abort();throw"Reached an unreachable!";case 136:var $495=HEAP32[((((2328)|0))>>2)];var $496=((($495)-(1))|0);HEAP32[((((2328)|0))>>2)]=$496;var $497=(($496)|(0))==0;if($497){var $sp_0_in_i=((2752)|0);label=137;break;}else{label=140;break;}
case 137:var $sp_0_in_i;var $sp_0_i=HEAP32[(($sp_0_in_i)>>2)];var $498=(($sp_0_i)|(0))==0;var $499=(($sp_0_i+8)|0);if($498){label=138;break;}else{var $sp_0_in_i=$499;label=137;break;}
case 138:HEAP32[((((2328)|0))>>2)]=-1;label=140;break;case 139:_abort();throw"Reached an unreachable!";case 140:return;default:assert(0,"bad label: "+label);}}
Module["_free"]=_free;function _realloc($oldmem,$bytes){var label=0;label=1;while(1)switch(label){case 1:var $1=(($oldmem)|(0))==0;if($1){label=2;break;}else{label=3;break;}
case 2:var $3=_malloc($bytes);var $mem_0=$3;label=11;break;case 3:var $5=(($bytes)>>>(0))>4294967231;if($5){label=4;break;}else{label=5;break;}
case 4:var $7=___errno_location();HEAP32[(($7)>>2)]=12;var $mem_0=0;label=11;break;case 5:var $9=(($bytes)>>>(0))<11;if($9){var $14=16;label=7;break;}else{label=6;break;}
case 6:var $11=((($bytes)+(11))|0);var $12=$11&-8;var $14=$12;label=7;break;case 7:var $14;var $15=((($oldmem)-(8))|0);var $16=$15;var $17=_try_realloc_chunk($16,$14);var $18=(($17)|(0))==0;if($18){label=9;break;}else{label=8;break;}
case 8:var $20=(($17+8)|0);var $21=$20;var $mem_0=$21;label=11;break;case 9:var $23=_malloc($bytes);var $24=(($23)|(0))==0;if($24){var $mem_0=0;label=11;break;}else{label=10;break;}
case 10:var $26=((($oldmem)-(4))|0);var $27=$26;var $28=HEAP32[(($27)>>2)];var $29=$28&-8;var $30=$28&3;var $31=(($30)|(0))==0;var $32=$31?8:4;var $33=((($29)-($32))|0);var $34=(($33)>>>(0))<(($bytes)>>>(0));var $35=$34?$33:$bytes;assert($35%1===0);(_memcpy($23,$oldmem,$35)|0);_free($oldmem);var $mem_0=$23;label=11;break;case 11:var $mem_0;return $mem_0;default:assert(0,"bad label: "+label);}}
Module["_realloc"]=_realloc;function _try_realloc_chunk($p,$nb){var label=0;label=1;while(1)switch(label){case 1:var $1=(($p+4)|0);var $2=HEAP32[(($1)>>2)];var $3=$2&-8;var $4=$p;var $5=(($4+$3)|0);var $6=$5;var $7=HEAP32[((((2312)|0))>>2)];var $8=(($4)>>>(0))<(($7)>>>(0));if($8){label=72;break;}else{label=2;break;}
case 2:var $10=$2&3;var $11=(($10)|(0))!=1;var $12=(($4)>>>(0))<(($5)>>>(0));var $or_cond=$11&$12;if($or_cond){label=3;break;}else{label=72;break;}
case 3:var $_sum3334=$3|4;var $14=(($4+$_sum3334)|0);var $15=$14;var $16=HEAP32[(($15)>>2)];var $17=$16&1;var $phitmp=(($17)|(0))==0;if($phitmp){label=72;break;}else{label=4;break;}
case 4:var $19=(($10)|(0))==0;if($19){label=5;break;}else{label=9;break;}
case 5:var $21=(($nb)>>>(0))<256;if($21){var $newp_0=0;label=73;break;}else{label=6;break;}
case 6:var $23=((($nb)+(4))|0);var $24=(($3)>>>(0))<(($23)>>>(0));if($24){label=8;break;}else{label=7;break;}
case 7:var $26=((($3)-($nb))|0);var $27=HEAP32[((((2264)|0))>>2)];var $28=$27<<1;var $29=(($26)>>>(0))>(($28)>>>(0));if($29){label=8;break;}else{var $newp_0=$p;label=73;break;}
case 8:var $newp_0=0;label=73;break;case 9:var $32=(($3)>>>(0))<(($nb)>>>(0));if($32){label=12;break;}else{label=10;break;}
case 10:var $34=((($3)-($nb))|0);var $35=(($34)>>>(0))>15;if($35){label=11;break;}else{var $newp_0=$p;label=73;break;}
case 11:var $37=(($4+$nb)|0);var $38=$37;var $39=$2&1;var $40=$39|$nb;var $41=$40|2;HEAP32[(($1)>>2)]=$41;var $_sum29=((($nb)+(4))|0);var $42=(($4+$_sum29)|0);var $43=$42;var $44=$34|3;HEAP32[(($43)>>2)]=$44;var $45=HEAP32[(($15)>>2)];var $46=$45|1;HEAP32[(($15)>>2)]=$46;_dispose_chunk($38,$34);var $newp_0=$p;label=73;break;case 12:var $48=HEAP32[((((2320)|0))>>2)];var $49=(($6)|(0))==(($48)|(0));if($49){label=13;break;}else{label=15;break;}
case 13:var $51=HEAP32[((((2308)|0))>>2)];var $52=((($51)+($3))|0);var $53=(($52)>>>(0))>(($nb)>>>(0));if($53){label=14;break;}else{var $newp_0=0;label=73;break;}
case 14:var $55=((($52)-($nb))|0);var $56=(($4+$nb)|0);var $57=$56;var $58=$2&1;var $59=$58|$nb;var $60=$59|2;HEAP32[(($1)>>2)]=$60;var $_sum28=((($nb)+(4))|0);var $61=(($4+$_sum28)|0);var $62=$61;var $63=$55|1;HEAP32[(($62)>>2)]=$63;HEAP32[((((2320)|0))>>2)]=$57;HEAP32[((((2308)|0))>>2)]=$55;var $newp_0=$p;label=73;break;case 15:var $65=HEAP32[((((2316)|0))>>2)];var $66=(($6)|(0))==(($65)|(0));if($66){label=16;break;}else{label=21;break;}
case 16:var $68=HEAP32[((((2304)|0))>>2)];var $69=((($68)+($3))|0);var $70=(($69)>>>(0))<(($nb)>>>(0));if($70){var $newp_0=0;label=73;break;}else{label=17;break;}
case 17:var $72=((($69)-($nb))|0);var $73=(($72)>>>(0))>15;if($73){label=18;break;}else{label=19;break;}
case 18:var $75=(($4+$nb)|0);var $76=$75;var $77=(($4+$69)|0);var $78=$2&1;var $79=$78|$nb;var $80=$79|2;HEAP32[(($1)>>2)]=$80;var $_sum25=((($nb)+(4))|0);var $81=(($4+$_sum25)|0);var $82=$81;var $83=$72|1;HEAP32[(($82)>>2)]=$83;var $84=$77;HEAP32[(($84)>>2)]=$72;var $_sum26=((($69)+(4))|0);var $85=(($4+$_sum26)|0);var $86=$85;var $87=HEAP32[(($86)>>2)];var $88=$87&-2;HEAP32[(($86)>>2)]=$88;var $storemerge=$76;var $storemerge27=$72;label=20;break;case 19:var $90=$2&1;var $91=$90|$69;var $92=$91|2;HEAP32[(($1)>>2)]=$92;var $_sum23=((($69)+(4))|0);var $93=(($4+$_sum23)|0);var $94=$93;var $95=HEAP32[(($94)>>2)];var $96=$95|1;HEAP32[(($94)>>2)]=$96;var $storemerge=0;var $storemerge27=0;label=20;break;case 20:var $storemerge27;var $storemerge;HEAP32[((((2304)|0))>>2)]=$storemerge27;HEAP32[((((2316)|0))>>2)]=$storemerge;var $newp_0=$p;label=73;break;case 21:var $99=$16&2;var $100=(($99)|(0))==0;if($100){label=22;break;}else{var $newp_0=0;label=73;break;}
case 22:var $102=$16&-8;var $103=((($102)+($3))|0);var $104=(($103)>>>(0))<(($nb)>>>(0));if($104){var $newp_0=0;label=73;break;}else{label=23;break;}
case 23:var $106=((($103)-($nb))|0);var $107=$16>>>3;var $108=(($16)>>>(0))<256;if($108){label=24;break;}else{label=36;break;}
case 24:var $_sum17=((($3)+(8))|0);var $110=(($4+$_sum17)|0);var $111=$110;var $112=HEAP32[(($111)>>2)];var $_sum18=((($3)+(12))|0);var $113=(($4+$_sum18)|0);var $114=$113;var $115=HEAP32[(($114)>>2)];var $116=$107<<1;var $117=((2336+($116<<2))|0);var $118=$117;var $119=(($112)|(0))==(($118)|(0));if($119){label=27;break;}else{label=25;break;}
case 25:var $121=$112;var $122=(($121)>>>(0))<(($7)>>>(0));if($122){label=35;break;}else{label=26;break;}
case 26:var $124=(($112+12)|0);var $125=HEAP32[(($124)>>2)];var $126=(($125)|(0))==(($6)|(0));if($126){label=27;break;}else{label=35;break;}
case 27:var $127=(($115)|(0))==(($112)|(0));if($127){label=28;break;}else{label=29;break;}
case 28:var $129=1<<$107;var $130=$129^-1;var $131=HEAP32[((((2296)|0))>>2)];var $132=$131&$130;HEAP32[((((2296)|0))>>2)]=$132;label=69;break;case 29:var $134=(($115)|(0))==(($118)|(0));if($134){label=30;break;}else{label=31;break;}
case 30:var $_pre=(($115+8)|0);var $_pre_phi=$_pre;label=33;break;case 31:var $136=$115;var $137=(($136)>>>(0))<(($7)>>>(0));if($137){label=34;break;}else{label=32;break;}
case 32:var $139=(($115+8)|0);var $140=HEAP32[(($139)>>2)];var $141=(($140)|(0))==(($6)|(0));if($141){var $_pre_phi=$139;label=33;break;}else{label=34;break;}
case 33:var $_pre_phi;var $142=(($112+12)|0);HEAP32[(($142)>>2)]=$115;HEAP32[(($_pre_phi)>>2)]=$112;label=69;break;case 34:_abort();throw"Reached an unreachable!";case 35:_abort();throw"Reached an unreachable!";case 36:var $144=$5;var $_sum=((($3)+(24))|0);var $145=(($4+$_sum)|0);var $146=$145;var $147=HEAP32[(($146)>>2)];var $_sum2=((($3)+(12))|0);var $148=(($4+$_sum2)|0);var $149=$148;var $150=HEAP32[(($149)>>2)];var $151=(($150)|(0))==(($144)|(0));if($151){label=42;break;}else{label=37;break;}
case 37:var $_sum14=((($3)+(8))|0);var $153=(($4+$_sum14)|0);var $154=$153;var $155=HEAP32[(($154)>>2)];var $156=$155;var $157=(($156)>>>(0))<(($7)>>>(0));if($157){label=41;break;}else{label=38;break;}
case 38:var $159=(($155+12)|0);var $160=HEAP32[(($159)>>2)];var $161=(($160)|(0))==(($144)|(0));if($161){label=39;break;}else{label=41;break;}
case 39:var $163=(($150+8)|0);var $164=HEAP32[(($163)>>2)];var $165=(($164)|(0))==(($144)|(0));if($165){label=40;break;}else{label=41;break;}
case 40:HEAP32[(($159)>>2)]=$150;HEAP32[(($163)>>2)]=$155;var $R_1=$150;label=49;break;case 41:_abort();throw"Reached an unreachable!";case 42:var $_sum4=((($3)+(20))|0);var $168=(($4+$_sum4)|0);var $169=$168;var $170=HEAP32[(($169)>>2)];var $171=(($170)|(0))==0;if($171){label=43;break;}else{var $R_0=$170;var $RP_0=$169;label=44;break;}
case 43:var $_sum3=((($3)+(16))|0);var $173=(($4+$_sum3)|0);var $174=$173;var $175=HEAP32[(($174)>>2)];var $176=(($175)|(0))==0;if($176){var $R_1=0;label=49;break;}else{var $R_0=$175;var $RP_0=$174;label=44;break;}
case 44:var $RP_0;var $R_0;var $177=(($R_0+20)|0);var $178=HEAP32[(($177)>>2)];var $179=(($178)|(0))==0;if($179){label=45;break;}else{var $R_0=$178;var $RP_0=$177;label=44;break;}
case 45:var $181=(($R_0+16)|0);var $182=HEAP32[(($181)>>2)];var $183=(($182)|(0))==0;if($183){label=46;break;}else{var $R_0=$182;var $RP_0=$181;label=44;break;}
case 46:var $185=$RP_0;var $186=(($185)>>>(0))<(($7)>>>(0));if($186){label=48;break;}else{label=47;break;}
case 47:HEAP32[(($RP_0)>>2)]=0;var $R_1=$R_0;label=49;break;case 48:_abort();throw"Reached an unreachable!";case 49:var $R_1;var $190=(($147)|(0))==0;if($190){label=69;break;}else{label=50;break;}
case 50:var $_sum11=((($3)+(28))|0);var $192=(($4+$_sum11)|0);var $193=$192;var $194=HEAP32[(($193)>>2)];var $195=((2600+($194<<2))|0);var $196=HEAP32[(($195)>>2)];var $197=(($144)|(0))==(($196)|(0));if($197){label=51;break;}else{label=53;break;}
case 51:HEAP32[(($195)>>2)]=$R_1;var $cond=(($R_1)|(0))==0;if($cond){label=52;break;}else{label=59;break;}
case 52:var $199=HEAP32[(($193)>>2)];var $200=1<<$199;var $201=$200^-1;var $202=HEAP32[((((2300)|0))>>2)];var $203=$202&$201;HEAP32[((((2300)|0))>>2)]=$203;label=69;break;case 53:var $205=$147;var $206=HEAP32[((((2312)|0))>>2)];var $207=(($205)>>>(0))<(($206)>>>(0));if($207){label=57;break;}else{label=54;break;}
case 54:var $209=(($147+16)|0);var $210=HEAP32[(($209)>>2)];var $211=(($210)|(0))==(($144)|(0));if($211){label=55;break;}else{label=56;break;}
case 55:HEAP32[(($209)>>2)]=$R_1;label=58;break;case 56:var $214=(($147+20)|0);HEAP32[(($214)>>2)]=$R_1;label=58;break;case 57:_abort();throw"Reached an unreachable!";case 58:var $217=(($R_1)|(0))==0;if($217){label=69;break;}else{label=59;break;}
case 59:var $219=$R_1;var $220=HEAP32[((((2312)|0))>>2)];var $221=(($219)>>>(0))<(($220)>>>(0));if($221){label=68;break;}else{label=60;break;}
case 60:var $223=(($R_1+24)|0);HEAP32[(($223)>>2)]=$147;var $_sum12=((($3)+(16))|0);var $224=(($4+$_sum12)|0);var $225=$224;var $226=HEAP32[(($225)>>2)];var $227=(($226)|(0))==0;if($227){label=64;break;}else{label=61;break;}
case 61:var $229=$226;var $230=HEAP32[((((2312)|0))>>2)];var $231=(($229)>>>(0))<(($230)>>>(0));if($231){label=63;break;}else{label=62;break;}
case 62:var $233=(($R_1+16)|0);HEAP32[(($233)>>2)]=$226;var $234=(($226+24)|0);HEAP32[(($234)>>2)]=$R_1;label=64;break;case 63:_abort();throw"Reached an unreachable!";case 64:var $_sum13=((($3)+(20))|0);var $237=(($4+$_sum13)|0);var $238=$237;var $239=HEAP32[(($238)>>2)];var $240=(($239)|(0))==0;if($240){label=69;break;}else{label=65;break;}
case 65:var $242=$239;var $243=HEAP32[((((2312)|0))>>2)];var $244=(($242)>>>(0))<(($243)>>>(0));if($244){label=67;break;}else{label=66;break;}
case 66:var $246=(($R_1+20)|0);HEAP32[(($246)>>2)]=$239;var $247=(($239+24)|0);HEAP32[(($247)>>2)]=$R_1;label=69;break;case 67:_abort();throw"Reached an unreachable!";case 68:_abort();throw"Reached an unreachable!";case 69:var $251=(($106)>>>(0))<16;if($251){label=70;break;}else{label=71;break;}
case 70:var $253=HEAP32[(($1)>>2)];var $254=$253&1;var $255=$103|$254;var $256=$255|2;HEAP32[(($1)>>2)]=$256;var $_sum910=$103|4;var $257=(($4+$_sum910)|0);var $258=$257;var $259=HEAP32[(($258)>>2)];var $260=$259|1;HEAP32[(($258)>>2)]=$260;var $newp_0=$p;label=73;break;case 71:var $262=(($4+$nb)|0);var $263=$262;var $264=HEAP32[(($1)>>2)];var $265=$264&1;var $266=$265|$nb;var $267=$266|2;HEAP32[(($1)>>2)]=$267;var $_sum5=((($nb)+(4))|0);var $268=(($4+$_sum5)|0);var $269=$268;var $270=$106|3;HEAP32[(($269)>>2)]=$270;var $_sum78=$103|4;var $271=(($4+$_sum78)|0);var $272=$271;var $273=HEAP32[(($272)>>2)];var $274=$273|1;HEAP32[(($272)>>2)]=$274;_dispose_chunk($263,$106);var $newp_0=$p;label=73;break;case 72:_abort();throw"Reached an unreachable!";case 73:var $newp_0;return $newp_0;default:assert(0,"bad label: "+label);}}
function _dispose_chunk($p,$psize){var label=0;label=1;while(1)switch(label){case 1:var $1=$p;var $2=(($1+$psize)|0);var $3=$2;var $4=(($p+4)|0);var $5=HEAP32[(($4)>>2)];var $6=$5&1;var $7=(($6)|(0))==0;if($7){label=2;break;}else{var $_0=$p;var $_0277=$psize;label=54;break;}
case 2:var $9=(($p)|0);var $10=HEAP32[(($9)>>2)];var $11=$5&3;var $12=(($11)|(0))==0;if($12){label=134;break;}else{label=3;break;}
case 3:var $14=(((-$10))|0);var $15=(($1+$14)|0);var $16=$15;var $17=((($10)+($psize))|0);var $18=HEAP32[((((2312)|0))>>2)];var $19=(($15)>>>(0))<(($18)>>>(0));if($19){label=53;break;}else{label=4;break;}
case 4:var $21=HEAP32[((((2316)|0))>>2)];var $22=(($16)|(0))==(($21)|(0));if($22){label=51;break;}else{label=5;break;}
case 5:var $24=$10>>>3;var $25=(($10)>>>(0))<256;if($25){label=6;break;}else{label=18;break;}
case 6:var $_sum35=(((8)-($10))|0);var $27=(($1+$_sum35)|0);var $28=$27;var $29=HEAP32[(($28)>>2)];var $_sum36=(((12)-($10))|0);var $30=(($1+$_sum36)|0);var $31=$30;var $32=HEAP32[(($31)>>2)];var $33=$24<<1;var $34=((2336+($33<<2))|0);var $35=$34;var $36=(($29)|(0))==(($35)|(0));if($36){label=9;break;}else{label=7;break;}
case 7:var $38=$29;var $39=(($38)>>>(0))<(($18)>>>(0));if($39){label=17;break;}else{label=8;break;}
case 8:var $41=(($29+12)|0);var $42=HEAP32[(($41)>>2)];var $43=(($42)|(0))==(($16)|(0));if($43){label=9;break;}else{label=17;break;}
case 9:var $44=(($32)|(0))==(($29)|(0));if($44){label=10;break;}else{label=11;break;}
case 10:var $46=1<<$24;var $47=$46^-1;var $48=HEAP32[((((2296)|0))>>2)];var $49=$48&$47;HEAP32[((((2296)|0))>>2)]=$49;var $_0=$16;var $_0277=$17;label=54;break;case 11:var $51=(($32)|(0))==(($35)|(0));if($51){label=12;break;}else{label=13;break;}
case 12:var $_pre62=(($32+8)|0);var $_pre_phi63=$_pre62;label=15;break;case 13:var $53=$32;var $54=(($53)>>>(0))<(($18)>>>(0));if($54){label=16;break;}else{label=14;break;}
case 14:var $56=(($32+8)|0);var $57=HEAP32[(($56)>>2)];var $58=(($57)|(0))==(($16)|(0));if($58){var $_pre_phi63=$56;label=15;break;}else{label=16;break;}
case 15:var $_pre_phi63;var $59=(($29+12)|0);HEAP32[(($59)>>2)]=$32;HEAP32[(($_pre_phi63)>>2)]=$29;var $_0=$16;var $_0277=$17;label=54;break;case 16:_abort();throw"Reached an unreachable!";case 17:_abort();throw"Reached an unreachable!";case 18:var $61=$15;var $_sum26=(((24)-($10))|0);var $62=(($1+$_sum26)|0);var $63=$62;var $64=HEAP32[(($63)>>2)];var $_sum27=(((12)-($10))|0);var $65=(($1+$_sum27)|0);var $66=$65;var $67=HEAP32[(($66)>>2)];var $68=(($67)|(0))==(($61)|(0));if($68){label=24;break;}else{label=19;break;}
case 19:var $_sum33=(((8)-($10))|0);var $70=(($1+$_sum33)|0);var $71=$70;var $72=HEAP32[(($71)>>2)];var $73=$72;var $74=(($73)>>>(0))<(($18)>>>(0));if($74){label=23;break;}else{label=20;break;}
case 20:var $76=(($72+12)|0);var $77=HEAP32[(($76)>>2)];var $78=(($77)|(0))==(($61)|(0));if($78){label=21;break;}else{label=23;break;}
case 21:var $80=(($67+8)|0);var $81=HEAP32[(($80)>>2)];var $82=(($81)|(0))==(($61)|(0));if($82){label=22;break;}else{label=23;break;}
case 22:HEAP32[(($76)>>2)]=$67;HEAP32[(($80)>>2)]=$72;var $R_1=$67;label=31;break;case 23:_abort();throw"Reached an unreachable!";case 24:var $_sum28=(((16)-($10))|0);var $_sum29=((($_sum28)+(4))|0);var $85=(($1+$_sum29)|0);var $86=$85;var $87=HEAP32[(($86)>>2)];var $88=(($87)|(0))==0;if($88){label=25;break;}else{var $R_0=$87;var $RP_0=$86;label=26;break;}
case 25:var $90=(($1+$_sum28)|0);var $91=$90;var $92=HEAP32[(($91)>>2)];var $93=(($92)|(0))==0;if($93){var $R_1=0;label=31;break;}else{var $R_0=$92;var $RP_0=$91;label=26;break;}
case 26:var $RP_0;var $R_0;var $94=(($R_0+20)|0);var $95=HEAP32[(($94)>>2)];var $96=(($95)|(0))==0;if($96){label=27;break;}else{var $R_0=$95;var $RP_0=$94;label=26;break;}
case 27:var $98=(($R_0+16)|0);var $99=HEAP32[(($98)>>2)];var $100=(($99)|(0))==0;if($100){label=28;break;}else{var $R_0=$99;var $RP_0=$98;label=26;break;}
case 28:var $102=$RP_0;var $103=(($102)>>>(0))<(($18)>>>(0));if($103){label=30;break;}else{label=29;break;}
case 29:HEAP32[(($RP_0)>>2)]=0;var $R_1=$R_0;label=31;break;case 30:_abort();throw"Reached an unreachable!";case 31:var $R_1;var $107=(($64)|(0))==0;if($107){var $_0=$16;var $_0277=$17;label=54;break;}else{label=32;break;}
case 32:var $_sum30=(((28)-($10))|0);var $109=(($1+$_sum30)|0);var $110=$109;var $111=HEAP32[(($110)>>2)];var $112=((2600+($111<<2))|0);var $113=HEAP32[(($112)>>2)];var $114=(($61)|(0))==(($113)|(0));if($114){label=33;break;}else{label=35;break;}
case 33:HEAP32[(($112)>>2)]=$R_1;var $cond=(($R_1)|(0))==0;if($cond){label=34;break;}else{label=41;break;}
case 34:var $116=HEAP32[(($110)>>2)];var $117=1<<$116;var $118=$117^-1;var $119=HEAP32[((((2300)|0))>>2)];var $120=$119&$118;HEAP32[((((2300)|0))>>2)]=$120;var $_0=$16;var $_0277=$17;label=54;break;case 35:var $122=$64;var $123=HEAP32[((((2312)|0))>>2)];var $124=(($122)>>>(0))<(($123)>>>(0));if($124){label=39;break;}else{label=36;break;}
case 36:var $126=(($64+16)|0);var $127=HEAP32[(($126)>>2)];var $128=(($127)|(0))==(($61)|(0));if($128){label=37;break;}else{label=38;break;}
case 37:HEAP32[(($126)>>2)]=$R_1;label=40;break;case 38:var $131=(($64+20)|0);HEAP32[(($131)>>2)]=$R_1;label=40;break;case 39:_abort();throw"Reached an unreachable!";case 40:var $134=(($R_1)|(0))==0;if($134){var $_0=$16;var $_0277=$17;label=54;break;}else{label=41;break;}
case 41:var $136=$R_1;var $137=HEAP32[((((2312)|0))>>2)];var $138=(($136)>>>(0))<(($137)>>>(0));if($138){label=50;break;}else{label=42;break;}
case 42:var $140=(($R_1+24)|0);HEAP32[(($140)>>2)]=$64;var $_sum31=(((16)-($10))|0);var $141=(($1+$_sum31)|0);var $142=$141;var $143=HEAP32[(($142)>>2)];var $144=(($143)|(0))==0;if($144){label=46;break;}else{label=43;break;}
case 43:var $146=$143;var $147=HEAP32[((((2312)|0))>>2)];var $148=(($146)>>>(0))<(($147)>>>(0));if($148){label=45;break;}else{label=44;break;}
case 44:var $150=(($R_1+16)|0);HEAP32[(($150)>>2)]=$143;var $151=(($143+24)|0);HEAP32[(($151)>>2)]=$R_1;label=46;break;case 45:_abort();throw"Reached an unreachable!";case 46:var $_sum32=((($_sum31)+(4))|0);var $154=(($1+$_sum32)|0);var $155=$154;var $156=HEAP32[(($155)>>2)];var $157=(($156)|(0))==0;if($157){var $_0=$16;var $_0277=$17;label=54;break;}else{label=47;break;}
case 47:var $159=$156;var $160=HEAP32[((((2312)|0))>>2)];var $161=(($159)>>>(0))<(($160)>>>(0));if($161){label=49;break;}else{label=48;break;}
case 48:var $163=(($R_1+20)|0);HEAP32[(($163)>>2)]=$156;var $164=(($156+24)|0);HEAP32[(($164)>>2)]=$R_1;var $_0=$16;var $_0277=$17;label=54;break;case 49:_abort();throw"Reached an unreachable!";case 50:_abort();throw"Reached an unreachable!";case 51:var $_sum=((($psize)+(4))|0);var $168=(($1+$_sum)|0);var $169=$168;var $170=HEAP32[(($169)>>2)];var $171=$170&3;var $172=(($171)|(0))==3;if($172){label=52;break;}else{var $_0=$16;var $_0277=$17;label=54;break;}
case 52:HEAP32[((((2304)|0))>>2)]=$17;var $174=HEAP32[(($169)>>2)];var $175=$174&-2;HEAP32[(($169)>>2)]=$175;var $176=$17|1;var $_sum24=(((4)-($10))|0);var $177=(($1+$_sum24)|0);var $178=$177;HEAP32[(($178)>>2)]=$176;var $179=$2;HEAP32[(($179)>>2)]=$17;label=134;break;case 53:_abort();throw"Reached an unreachable!";case 54:var $_0277;var $_0;var $181=HEAP32[((((2312)|0))>>2)];var $182=(($2)>>>(0))<(($181)>>>(0));if($182){label=133;break;}else{label=55;break;}
case 55:var $_sum1=((($psize)+(4))|0);var $184=(($1+$_sum1)|0);var $185=$184;var $186=HEAP32[(($185)>>2)];var $187=$186&2;var $188=(($187)|(0))==0;if($188){label=56;break;}else{label=109;break;}
case 56:var $190=HEAP32[((((2320)|0))>>2)];var $191=(($3)|(0))==(($190)|(0));if($191){label=57;break;}else{label=59;break;}
case 57:var $193=HEAP32[((((2308)|0))>>2)];var $194=((($193)+($_0277))|0);HEAP32[((((2308)|0))>>2)]=$194;HEAP32[((((2320)|0))>>2)]=$_0;var $195=$194|1;var $196=(($_0+4)|0);HEAP32[(($196)>>2)]=$195;var $197=HEAP32[((((2316)|0))>>2)];var $198=(($_0)|(0))==(($197)|(0));if($198){label=58;break;}else{label=134;break;}
case 58:HEAP32[((((2316)|0))>>2)]=0;HEAP32[((((2304)|0))>>2)]=0;label=134;break;case 59:var $201=HEAP32[((((2316)|0))>>2)];var $202=(($3)|(0))==(($201)|(0));if($202){label=60;break;}else{label=61;break;}
case 60:var $204=HEAP32[((((2304)|0))>>2)];var $205=((($204)+($_0277))|0);HEAP32[((((2304)|0))>>2)]=$205;HEAP32[((((2316)|0))>>2)]=$_0;var $206=$205|1;var $207=(($_0+4)|0);HEAP32[(($207)>>2)]=$206;var $208=$_0;var $209=(($208+$205)|0);var $210=$209;HEAP32[(($210)>>2)]=$205;label=134;break;case 61:var $212=$186&-8;var $213=((($212)+($_0277))|0);var $214=$186>>>3;var $215=(($186)>>>(0))<256;if($215){label=62;break;}else{label=74;break;}
case 62:var $_sum20=((($psize)+(8))|0);var $217=(($1+$_sum20)|0);var $218=$217;var $219=HEAP32[(($218)>>2)];var $_sum21=((($psize)+(12))|0);var $220=(($1+$_sum21)|0);var $221=$220;var $222=HEAP32[(($221)>>2)];var $223=$214<<1;var $224=((2336+($223<<2))|0);var $225=$224;var $226=(($219)|(0))==(($225)|(0));if($226){label=65;break;}else{label=63;break;}
case 63:var $228=$219;var $229=(($228)>>>(0))<(($181)>>>(0));if($229){label=73;break;}else{label=64;break;}
case 64:var $231=(($219+12)|0);var $232=HEAP32[(($231)>>2)];var $233=(($232)|(0))==(($3)|(0));if($233){label=65;break;}else{label=73;break;}
case 65:var $234=(($222)|(0))==(($219)|(0));if($234){label=66;break;}else{label=67;break;}
case 66:var $236=1<<$214;var $237=$236^-1;var $238=HEAP32[((((2296)|0))>>2)];var $239=$238&$237;HEAP32[((((2296)|0))>>2)]=$239;label=107;break;case 67:var $241=(($222)|(0))==(($225)|(0));if($241){label=68;break;}else{label=69;break;}
case 68:var $_pre60=(($222+8)|0);var $_pre_phi61=$_pre60;label=71;break;case 69:var $243=$222;var $244=(($243)>>>(0))<(($181)>>>(0));if($244){label=72;break;}else{label=70;break;}
case 70:var $246=(($222+8)|0);var $247=HEAP32[(($246)>>2)];var $248=(($247)|(0))==(($3)|(0));if($248){var $_pre_phi61=$246;label=71;break;}else{label=72;break;}
case 71:var $_pre_phi61;var $249=(($219+12)|0);HEAP32[(($249)>>2)]=$222;HEAP32[(($_pre_phi61)>>2)]=$219;label=107;break;case 72:_abort();throw"Reached an unreachable!";case 73:_abort();throw"Reached an unreachable!";case 74:var $251=$2;var $_sum2=((($psize)+(24))|0);var $252=(($1+$_sum2)|0);var $253=$252;var $254=HEAP32[(($253)>>2)];var $_sum3=((($psize)+(12))|0);var $255=(($1+$_sum3)|0);var $256=$255;var $257=HEAP32[(($256)>>2)];var $258=(($257)|(0))==(($251)|(0));if($258){label=80;break;}else{label=75;break;}
case 75:var $_sum18=((($psize)+(8))|0);var $260=(($1+$_sum18)|0);var $261=$260;var $262=HEAP32[(($261)>>2)];var $263=$262;var $264=(($263)>>>(0))<(($181)>>>(0));if($264){label=79;break;}else{label=76;break;}
case 76:var $266=(($262+12)|0);var $267=HEAP32[(($266)>>2)];var $268=(($267)|(0))==(($251)|(0));if($268){label=77;break;}else{label=79;break;}
case 77:var $270=(($257+8)|0);var $271=HEAP32[(($270)>>2)];var $272=(($271)|(0))==(($251)|(0));if($272){label=78;break;}else{label=79;break;}
case 78:HEAP32[(($266)>>2)]=$257;HEAP32[(($270)>>2)]=$262;var $R7_1=$257;label=87;break;case 79:_abort();throw"Reached an unreachable!";case 80:var $_sum5=((($psize)+(20))|0);var $275=(($1+$_sum5)|0);var $276=$275;var $277=HEAP32[(($276)>>2)];var $278=(($277)|(0))==0;if($278){label=81;break;}else{var $R7_0=$277;var $RP9_0=$276;label=82;break;}
case 81:var $_sum4=((($psize)+(16))|0);var $280=(($1+$_sum4)|0);var $281=$280;var $282=HEAP32[(($281)>>2)];var $283=(($282)|(0))==0;if($283){var $R7_1=0;label=87;break;}else{var $R7_0=$282;var $RP9_0=$281;label=82;break;}
case 82:var $RP9_0;var $R7_0;var $284=(($R7_0+20)|0);var $285=HEAP32[(($284)>>2)];var $286=(($285)|(0))==0;if($286){label=83;break;}else{var $R7_0=$285;var $RP9_0=$284;label=82;break;}
case 83:var $288=(($R7_0+16)|0);var $289=HEAP32[(($288)>>2)];var $290=(($289)|(0))==0;if($290){label=84;break;}else{var $R7_0=$289;var $RP9_0=$288;label=82;break;}
case 84:var $292=$RP9_0;var $293=(($292)>>>(0))<(($181)>>>(0));if($293){label=86;break;}else{label=85;break;}
case 85:HEAP32[(($RP9_0)>>2)]=0;var $R7_1=$R7_0;label=87;break;case 86:_abort();throw"Reached an unreachable!";case 87:var $R7_1;var $297=(($254)|(0))==0;if($297){label=107;break;}else{label=88;break;}
case 88:var $_sum15=((($psize)+(28))|0);var $299=(($1+$_sum15)|0);var $300=$299;var $301=HEAP32[(($300)>>2)];var $302=((2600+($301<<2))|0);var $303=HEAP32[(($302)>>2)];var $304=(($251)|(0))==(($303)|(0));if($304){label=89;break;}else{label=91;break;}
case 89:HEAP32[(($302)>>2)]=$R7_1;var $cond53=(($R7_1)|(0))==0;if($cond53){label=90;break;}else{label=97;break;}
case 90:var $306=HEAP32[(($300)>>2)];var $307=1<<$306;var $308=$307^-1;var $309=HEAP32[((((2300)|0))>>2)];var $310=$309&$308;HEAP32[((((2300)|0))>>2)]=$310;label=107;break;case 91:var $312=$254;var $313=HEAP32[((((2312)|0))>>2)];var $314=(($312)>>>(0))<(($313)>>>(0));if($314){label=95;break;}else{label=92;break;}
case 92:var $316=(($254+16)|0);var $317=HEAP32[(($316)>>2)];var $318=(($317)|(0))==(($251)|(0));if($318){label=93;break;}else{label=94;break;}
case 93:HEAP32[(($316)>>2)]=$R7_1;label=96;break;case 94:var $321=(($254+20)|0);HEAP32[(($321)>>2)]=$R7_1;label=96;break;case 95:_abort();throw"Reached an unreachable!";case 96:var $324=(($R7_1)|(0))==0;if($324){label=107;break;}else{label=97;break;}
case 97:var $326=$R7_1;var $327=HEAP32[((((2312)|0))>>2)];var $328=(($326)>>>(0))<(($327)>>>(0));if($328){label=106;break;}else{label=98;break;}
case 98:var $330=(($R7_1+24)|0);HEAP32[(($330)>>2)]=$254;var $_sum16=((($psize)+(16))|0);var $331=(($1+$_sum16)|0);var $332=$331;var $333=HEAP32[(($332)>>2)];var $334=(($333)|(0))==0;if($334){label=102;break;}else{label=99;break;}
case 99:var $336=$333;var $337=HEAP32[((((2312)|0))>>2)];var $338=(($336)>>>(0))<(($337)>>>(0));if($338){label=101;break;}else{label=100;break;}
case 100:var $340=(($R7_1+16)|0);HEAP32[(($340)>>2)]=$333;var $341=(($333+24)|0);HEAP32[(($341)>>2)]=$R7_1;label=102;break;case 101:_abort();throw"Reached an unreachable!";case 102:var $_sum17=((($psize)+(20))|0);var $344=(($1+$_sum17)|0);var $345=$344;var $346=HEAP32[(($345)>>2)];var $347=(($346)|(0))==0;if($347){label=107;break;}else{label=103;break;}
case 103:var $349=$346;var $350=HEAP32[((((2312)|0))>>2)];var $351=(($349)>>>(0))<(($350)>>>(0));if($351){label=105;break;}else{label=104;break;}
case 104:var $353=(($R7_1+20)|0);HEAP32[(($353)>>2)]=$346;var $354=(($346+24)|0);HEAP32[(($354)>>2)]=$R7_1;label=107;break;case 105:_abort();throw"Reached an unreachable!";case 106:_abort();throw"Reached an unreachable!";case 107:var $358=$213|1;var $359=(($_0+4)|0);HEAP32[(($359)>>2)]=$358;var $360=$_0;var $361=(($360+$213)|0);var $362=$361;HEAP32[(($362)>>2)]=$213;var $363=HEAP32[((((2316)|0))>>2)];var $364=(($_0)|(0))==(($363)|(0));if($364){label=108;break;}else{var $_1=$213;label=110;break;}
case 108:HEAP32[((((2304)|0))>>2)]=$213;label=134;break;case 109:var $367=$186&-2;HEAP32[(($185)>>2)]=$367;var $368=$_0277|1;var $369=(($_0+4)|0);HEAP32[(($369)>>2)]=$368;var $370=$_0;var $371=(($370+$_0277)|0);var $372=$371;HEAP32[(($372)>>2)]=$_0277;var $_1=$_0277;label=110;break;case 110:var $_1;var $374=$_1>>>3;var $375=(($_1)>>>(0))<256;if($375){label=111;break;}else{label=116;break;}
case 111:var $377=$374<<1;var $378=((2336+($377<<2))|0);var $379=$378;var $380=HEAP32[((((2296)|0))>>2)];var $381=1<<$374;var $382=$380&$381;var $383=(($382)|(0))==0;if($383){label=112;break;}else{label=113;break;}
case 112:var $385=$380|$381;HEAP32[((((2296)|0))>>2)]=$385;var $_sum13_pre=((($377)+(2))|0);var $_pre=((2336+($_sum13_pre<<2))|0);var $F16_0=$379;var $_pre_phi=$_pre;label=115;break;case 113:var $_sum14=((($377)+(2))|0);var $387=((2336+($_sum14<<2))|0);var $388=HEAP32[(($387)>>2)];var $389=$388;var $390=HEAP32[((((2312)|0))>>2)];var $391=(($389)>>>(0))<(($390)>>>(0));if($391){label=114;break;}else{var $F16_0=$388;var $_pre_phi=$387;label=115;break;}
case 114:_abort();throw"Reached an unreachable!";case 115:var $_pre_phi;var $F16_0;HEAP32[(($_pre_phi)>>2)]=$_0;var $394=(($F16_0+12)|0);HEAP32[(($394)>>2)]=$_0;var $395=(($_0+8)|0);HEAP32[(($395)>>2)]=$F16_0;var $396=(($_0+12)|0);HEAP32[(($396)>>2)]=$379;label=134;break;case 116:var $398=$_0;var $399=$_1>>>8;var $400=(($399)|(0))==0;if($400){var $I19_0=0;label=119;break;}else{label=117;break;}
case 117:var $402=(($_1)>>>(0))>16777215;if($402){var $I19_0=31;label=119;break;}else{label=118;break;}
case 118:var $404=((($399)+(1048320))|0);var $405=$404>>>16;var $406=$405&8;var $407=$399<<$406;var $408=((($407)+(520192))|0);var $409=$408>>>16;var $410=$409&4;var $411=$410|$406;var $412=$407<<$410;var $413=((($412)+(245760))|0);var $414=$413>>>16;var $415=$414&2;var $416=$411|$415;var $417=(((14)-($416))|0);var $418=$412<<$415;var $419=$418>>>15;var $420=((($417)+($419))|0);var $421=$420<<1;var $422=((($420)+(7))|0);var $423=$_1>>>(($422)>>>(0));var $424=$423&1;var $425=$424|$421;var $I19_0=$425;label=119;break;case 119:var $I19_0;var $427=((2600+($I19_0<<2))|0);var $428=(($_0+28)|0);var $I19_0_c=$I19_0;HEAP32[(($428)>>2)]=$I19_0_c;var $429=(($_0+20)|0);HEAP32[(($429)>>2)]=0;var $430=(($_0+16)|0);HEAP32[(($430)>>2)]=0;var $431=HEAP32[((((2300)|0))>>2)];var $432=1<<$I19_0;var $433=$431&$432;var $434=(($433)|(0))==0;if($434){label=120;break;}else{label=121;break;}
case 120:var $436=$431|$432;HEAP32[((((2300)|0))>>2)]=$436;HEAP32[(($427)>>2)]=$398;var $437=(($_0+24)|0);var $_c=$427;HEAP32[(($437)>>2)]=$_c;var $438=(($_0+12)|0);HEAP32[(($438)>>2)]=$_0;var $439=(($_0+8)|0);HEAP32[(($439)>>2)]=$_0;label=134;break;case 121:var $441=HEAP32[(($427)>>2)];var $442=(($I19_0)|(0))==31;if($442){var $447=0;label=123;break;}else{label=122;break;}
case 122:var $444=$I19_0>>>1;var $445=(((25)-($444))|0);var $447=$445;label=123;break;case 123:var $447;var $448=$_1<<$447;var $K20_0=$448;var $T_0=$441;label=124;break;case 124:var $T_0;var $K20_0;var $450=(($T_0+4)|0);var $451=HEAP32[(($450)>>2)];var $452=$451&-8;var $453=(($452)|(0))==(($_1)|(0));if($453){label=129;break;}else{label=125;break;}
case 125:var $455=$K20_0>>>31;var $456=(($T_0+16+($455<<2))|0);var $457=HEAP32[(($456)>>2)];var $458=(($457)|(0))==0;var $459=$K20_0<<1;if($458){label=126;break;}else{var $K20_0=$459;var $T_0=$457;label=124;break;}
case 126:var $461=$456;var $462=HEAP32[((((2312)|0))>>2)];var $463=(($461)>>>(0))<(($462)>>>(0));if($463){label=128;break;}else{label=127;break;}
case 127:HEAP32[(($456)>>2)]=$398;var $465=(($_0+24)|0);var $T_0_c10=$T_0;HEAP32[(($465)>>2)]=$T_0_c10;var $466=(($_0+12)|0);HEAP32[(($466)>>2)]=$_0;var $467=(($_0+8)|0);HEAP32[(($467)>>2)]=$_0;label=134;break;case 128:_abort();throw"Reached an unreachable!";case 129:var $470=(($T_0+8)|0);var $471=HEAP32[(($470)>>2)];var $472=$T_0;var $473=HEAP32[((((2312)|0))>>2)];var $474=(($472)>>>(0))<(($473)>>>(0));if($474){label=132;break;}else{label=130;break;}
case 130:var $476=$471;var $477=(($476)>>>(0))<(($473)>>>(0));if($477){label=132;break;}else{label=131;break;}
case 131:var $479=(($471+12)|0);HEAP32[(($479)>>2)]=$398;HEAP32[(($470)>>2)]=$398;var $480=(($_0+8)|0);var $_c9=$471;HEAP32[(($480)>>2)]=$_c9;var $481=(($_0+12)|0);var $T_0_c=$T_0;HEAP32[(($481)>>2)]=$T_0_c;var $482=(($_0+24)|0);HEAP32[(($482)>>2)]=0;label=134;break;case 132:_abort();throw"Reached an unreachable!";case 133:_abort();throw"Reached an unreachable!";case 134:return;default:assert(0,"bad label: "+label);}}
function _i64Add(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var l=0,h=0;l=(a+c)>>>0;h=(b+d+(((l>>>0)<(a>>>0))|0))>>>0;return tempRet0=h,l|0;}
function _i64Subtract(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var l=0,h=0;l=(a-c)>>>0;h=(b-d)>>>0;h=(b-d-(((c>>>0)>(a>>>0))|0))>>>0;return tempRet0=h,l|0;}
function _bitshift64Shl(low,high,bits){low=low|0;high=high|0;bits=bits|0;var ander=0;if((bits|0)<32){ander=((1<<bits)-1)|0;tempRet0=(high<<bits)|((low&(ander<<(32-bits)))>>>(32-bits));return low<<bits;}
tempRet0=low<<(bits-32);return 0;}
function _bitshift64Lshr(low,high,bits){low=low|0;high=high|0;bits=bits|0;var ander=0;if((bits|0)<32){ander=((1<<bits)-1)|0;tempRet0=high>>>bits;return(low>>>bits)|((high&ander)<<(32-bits));}
tempRet0=0;return(high>>>(bits-32))|0;}
function _bitshift64Ashr(low,high,bits){low=low|0;high=high|0;bits=bits|0;var ander=0;if((bits|0)<32){ander=((1<<bits)-1)|0;tempRet0=high>>bits;return(low>>>bits)|((high&ander)<<(32-bits));}
tempRet0=(high|0)<0?-1:0;return(high>>(bits-32))|0;}
function _llvm_ctlz_i32(x){x=x|0;var ret=0;ret=HEAP8[(((ctlz_i8)+(x>>>24))|0)];if((ret|0)<8)return ret|0;var ret=HEAP8[(((ctlz_i8)+((x>>16)&0xff))|0)];if((ret|0)<8)return(ret+8)|0;var ret=HEAP8[(((ctlz_i8)+((x>>8)&0xff))|0)];if((ret|0)<8)return(ret+16)|0;return(HEAP8[(((ctlz_i8)+(x&0xff))|0)]+24)|0;}
var ctlz_i8=allocate([8,7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"i8",ALLOC_DYNAMIC);function _llvm_cttz_i32(x){x=x|0;var ret=0;ret=HEAP8[(((cttz_i8)+(x&0xff))|0)];if((ret|0)<8)return ret|0;var ret=HEAP8[(((cttz_i8)+((x>>8)&0xff))|0)];if((ret|0)<8)return(ret+8)|0;var ret=HEAP8[(((cttz_i8)+((x>>16)&0xff))|0)];if((ret|0)<8)return(ret+16)|0;return(HEAP8[(((cttz_i8)+(x>>>24))|0)]+24)|0;}
var cttz_i8=allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],"i8",ALLOC_DYNAMIC);function ___muldsi3($a,$b){$a=$a|0;$b=$b|0;var $1=0,$2=0,$3=0,$6=0,$8=0,$11=0,$12=0;$1=$a&65535;$2=$b&65535;$3=Math.imul($2,$1)|0;$6=$a>>>16;$8=($3>>>16)+(Math.imul($2,$6)|0)|0;$11=$b>>>16;$12=Math.imul($11,$1)|0;return(tempRet0=(($8>>>16)+(Math.imul($11,$6)|0)|0)+((($8&65535)+$12|0)>>>16)|0,0|($8+$12<<16|$3&65535))|0;}
function ___divdi3($a$0,$a$1,$b$0,$b$1){$a$0=$a$0|0;$a$1=$a$1|0;$b$0=$b$0|0;$b$1=$b$1|0;var $1$0=0,$1$1=0,$2$0=0,$2$1=0,$4$0=0,$4$1=0,$6$0=0,$7$0=0,$7$1=0,$8$0=0,$10$0=0;$1$0=$a$1>>31|(($a$1|0)<0?-1:0)<<1;$1$1=(($a$1|0)<0?-1:0)>>31|(($a$1|0)<0?-1:0)<<1;$2$0=$b$1>>31|(($b$1|0)<0?-1:0)<<1;$2$1=(($b$1|0)<0?-1:0)>>31|(($b$1|0)<0?-1:0)<<1;$4$0=_i64Subtract($1$0^$a$0,$1$1^$a$1,$1$0,$1$1)|0;$4$1=tempRet0;$6$0=_i64Subtract($2$0^$b$0,$2$1^$b$1,$2$0,$2$1)|0;$7$0=$2$0^$1$0;$7$1=$2$1^$1$1;$8$0=___udivmoddi4($4$0,$4$1,$6$0,tempRet0,0)|0;$10$0=_i64Subtract($8$0^$7$0,tempRet0^$7$1,$7$0,$7$1)|0;return(tempRet0=tempRet0,$10$0)|0;}
function ___remdi3($a$0,$a$1,$b$0,$b$1){$a$0=$a$0|0;$a$1=$a$1|0;$b$0=$b$0|0;$b$1=$b$1|0;var $rem=0,$1$0=0,$1$1=0,$2$0=0,$2$1=0,$4$0=0,$4$1=0,$6$0=0,$10$0=0,$10$1=0,__stackBase__=0;__stackBase__=STACKTOP;STACKTOP=STACKTOP+8|0;$rem=__stackBase__|0;$1$0=$a$1>>31|(($a$1|0)<0?-1:0)<<1;$1$1=(($a$1|0)<0?-1:0)>>31|(($a$1|0)<0?-1:0)<<1;$2$0=$b$1>>31|(($b$1|0)<0?-1:0)<<1;$2$1=(($b$1|0)<0?-1:0)>>31|(($b$1|0)<0?-1:0)<<1;$4$0=_i64Subtract($1$0^$a$0,$1$1^$a$1,$1$0,$1$1)|0;$4$1=tempRet0;$6$0=_i64Subtract($2$0^$b$0,$2$1^$b$1,$2$0,$2$1)|0;___udivmoddi4($4$0,$4$1,$6$0,tempRet0,$rem)|0;$10$0=_i64Subtract(HEAP32[$rem>>2]^$1$0,HEAP32[$rem+4>>2]^$1$1,$1$0,$1$1)|0;$10$1=tempRet0;STACKTOP=__stackBase__;return(tempRet0=$10$1,$10$0)|0;}
function ___muldi3($a$0,$a$1,$b$0,$b$1){$a$0=$a$0|0;$a$1=$a$1|0;$b$0=$b$0|0;$b$1=$b$1|0;var $x_sroa_0_0_extract_trunc=0,$y_sroa_0_0_extract_trunc=0,$1$0=0,$1$1=0,$2=0;$x_sroa_0_0_extract_trunc=$a$0;$y_sroa_0_0_extract_trunc=$b$0;$1$0=___muldsi3($x_sroa_0_0_extract_trunc,$y_sroa_0_0_extract_trunc)|0;$1$1=tempRet0;$2=Math.imul($a$1,$y_sroa_0_0_extract_trunc)|0;return(tempRet0=((Math.imul($b$1,$x_sroa_0_0_extract_trunc)|0)+$2|0)+$1$1|$1$1&0,0|$1$0&-1)|0;}
function ___udivdi3($a$0,$a$1,$b$0,$b$1){$a$0=$a$0|0;$a$1=$a$1|0;$b$0=$b$0|0;$b$1=$b$1|0;var $1$0=0;$1$0=___udivmoddi4($a$0,$a$1,$b$0,$b$1,0)|0;return(tempRet0=tempRet0,$1$0)|0;}
function ___uremdi3($a$0,$a$1,$b$0,$b$1){$a$0=$a$0|0;$a$1=$a$1|0;$b$0=$b$0|0;$b$1=$b$1|0;var $rem=0,__stackBase__=0;__stackBase__=STACKTOP;STACKTOP=STACKTOP+8|0;$rem=__stackBase__|0;___udivmoddi4($a$0,$a$1,$b$0,$b$1,$rem)|0;STACKTOP=__stackBase__;return(tempRet0=HEAP32[$rem+4>>2]|0,HEAP32[$rem>>2]|0)|0;}
function ___udivmoddi4($a$0,$a$1,$b$0,$b$1,$rem){$a$0=$a$0|0;$a$1=$a$1|0;$b$0=$b$0|0;$b$1=$b$1|0;$rem=$rem|0;var $n_sroa_0_0_extract_trunc=0,$n_sroa_1_4_extract_shift$0=0,$n_sroa_1_4_extract_trunc=0,$d_sroa_0_0_extract_trunc=0,$d_sroa_1_4_extract_shift$0=0,$d_sroa_1_4_extract_trunc=0,$4=0,$17=0,$37=0,$49=0,$51=0,$57=0,$58=0,$66=0,$78=0,$86=0,$88=0,$89=0,$91=0,$92=0,$95=0,$105=0,$117=0,$119=0,$125=0,$126=0,$130=0,$q_sroa_1_1_ph=0,$q_sroa_0_1_ph=0,$r_sroa_1_1_ph=0,$r_sroa_0_1_ph=0,$sr_1_ph=0,$d_sroa_0_0_insert_insert99$0=0,$d_sroa_0_0_insert_insert99$1=0,$137$0=0,$137$1=0,$carry_0203=0,$sr_1202=0,$r_sroa_0_1201=0,$r_sroa_1_1200=0,$q_sroa_0_1199=0,$q_sroa_1_1198=0,$147=0,$149=0,$r_sroa_0_0_insert_insert42$0=0,$r_sroa_0_0_insert_insert42$1=0,$150$1=0,$151$0=0,$152=0,$154$0=0,$r_sroa_0_0_extract_trunc=0,$r_sroa_1_4_extract_trunc=0,$155=0,$carry_0_lcssa$0=0,$carry_0_lcssa$1=0,$r_sroa_0_1_lcssa=0,$r_sroa_1_1_lcssa=0,$q_sroa_0_1_lcssa=0,$q_sroa_1_1_lcssa=0,$q_sroa_0_0_insert_ext75$0=0,$q_sroa_0_0_insert_ext75$1=0,$q_sroa_0_0_insert_insert77$1=0,$_0$0=0,$_0$1=0;$n_sroa_0_0_extract_trunc=$a$0;$n_sroa_1_4_extract_shift$0=$a$1;$n_sroa_1_4_extract_trunc=$n_sroa_1_4_extract_shift$0;$d_sroa_0_0_extract_trunc=$b$0;$d_sroa_1_4_extract_shift$0=$b$1;$d_sroa_1_4_extract_trunc=$d_sroa_1_4_extract_shift$0;if(($n_sroa_1_4_extract_trunc|0)==0){$4=($rem|0)!=0;if(($d_sroa_1_4_extract_trunc|0)==0){if($4){HEAP32[$rem>>2]=($n_sroa_0_0_extract_trunc>>>0)%($d_sroa_0_0_extract_trunc>>>0);HEAP32[$rem+4>>2]=0;}
$_0$1=0;$_0$0=($n_sroa_0_0_extract_trunc>>>0)/($d_sroa_0_0_extract_trunc>>>0)>>>0;return(tempRet0=$_0$1,$_0$0)|0;}else{if(!$4){$_0$1=0;$_0$0=0;return(tempRet0=$_0$1,$_0$0)|0;}
HEAP32[$rem>>2]=$a$0&-1;HEAP32[$rem+4>>2]=$a$1&0;$_0$1=0;$_0$0=0;return(tempRet0=$_0$1,$_0$0)|0;}}
$17=($d_sroa_1_4_extract_trunc|0)==0;do{if(($d_sroa_0_0_extract_trunc|0)==0){if($17){if(($rem|0)!=0){HEAP32[$rem>>2]=($n_sroa_1_4_extract_trunc>>>0)%($d_sroa_0_0_extract_trunc>>>0);HEAP32[$rem+4>>2]=0;}
$_0$1=0;$_0$0=($n_sroa_1_4_extract_trunc>>>0)/($d_sroa_0_0_extract_trunc>>>0)>>>0;return(tempRet0=$_0$1,$_0$0)|0;}
if(($n_sroa_0_0_extract_trunc|0)==0){if(($rem|0)!=0){HEAP32[$rem>>2]=0;HEAP32[$rem+4>>2]=($n_sroa_1_4_extract_trunc>>>0)%($d_sroa_1_4_extract_trunc>>>0);}
$_0$1=0;$_0$0=($n_sroa_1_4_extract_trunc>>>0)/($d_sroa_1_4_extract_trunc>>>0)>>>0;return(tempRet0=$_0$1,$_0$0)|0;}
$37=$d_sroa_1_4_extract_trunc-1|0;if(($37&$d_sroa_1_4_extract_trunc|0)==0){if(($rem|0)!=0){HEAP32[$rem>>2]=0|$a$0&-1;HEAP32[$rem+4>>2]=$37&$n_sroa_1_4_extract_trunc|$a$1&0;}
$_0$1=0;$_0$0=$n_sroa_1_4_extract_trunc>>>((_llvm_cttz_i32($d_sroa_1_4_extract_trunc|0)|0)>>>0);return(tempRet0=$_0$1,$_0$0)|0;}
$49=_llvm_ctlz_i32($d_sroa_1_4_extract_trunc|0)|0;$51=$49-(_llvm_ctlz_i32($n_sroa_1_4_extract_trunc|0)|0)|0;if($51>>>0<=30){$57=$51+1|0;$58=31-$51|0;$sr_1_ph=$57;$r_sroa_0_1_ph=$n_sroa_1_4_extract_trunc<<$58|$n_sroa_0_0_extract_trunc>>>($57>>>0);$r_sroa_1_1_ph=$n_sroa_1_4_extract_trunc>>>($57>>>0);$q_sroa_0_1_ph=0;$q_sroa_1_1_ph=$n_sroa_0_0_extract_trunc<<$58;break;}
if(($rem|0)==0){$_0$1=0;$_0$0=0;return(tempRet0=$_0$1,$_0$0)|0;}
HEAP32[$rem>>2]=0|$a$0&-1;HEAP32[$rem+4>>2]=$n_sroa_1_4_extract_shift$0|$a$1&0;$_0$1=0;$_0$0=0;return(tempRet0=$_0$1,$_0$0)|0;}else{if(!$17){$117=_llvm_ctlz_i32($d_sroa_1_4_extract_trunc|0)|0;$119=$117-(_llvm_ctlz_i32($n_sroa_1_4_extract_trunc|0)|0)|0;if($119>>>0<=31){$125=$119+1|0;$126=31-$119|0;$130=$119-31>>31;$sr_1_ph=$125;$r_sroa_0_1_ph=$n_sroa_0_0_extract_trunc>>>($125>>>0)&$130|$n_sroa_1_4_extract_trunc<<$126;$r_sroa_1_1_ph=$n_sroa_1_4_extract_trunc>>>($125>>>0)&$130;$q_sroa_0_1_ph=0;$q_sroa_1_1_ph=$n_sroa_0_0_extract_trunc<<$126;break;}
if(($rem|0)==0){$_0$1=0;$_0$0=0;return(tempRet0=$_0$1,$_0$0)|0;}
HEAP32[$rem>>2]=0|$a$0&-1;HEAP32[$rem+4>>2]=$n_sroa_1_4_extract_shift$0|$a$1&0;$_0$1=0;$_0$0=0;return(tempRet0=$_0$1,$_0$0)|0;}
$66=$d_sroa_0_0_extract_trunc-1|0;if(($66&$d_sroa_0_0_extract_trunc|0)!=0){$86=(_llvm_ctlz_i32($d_sroa_0_0_extract_trunc|0)|0)+33|0;$88=$86-(_llvm_ctlz_i32($n_sroa_1_4_extract_trunc|0)|0)|0;$89=64-$88|0;$91=32-$88|0;$92=$91>>31;$95=$88-32|0;$105=$95>>31;$sr_1_ph=$88;$r_sroa_0_1_ph=$91-1>>31&$n_sroa_1_4_extract_trunc>>>($95>>>0)|($n_sroa_1_4_extract_trunc<<$91|$n_sroa_0_0_extract_trunc>>>($88>>>0))&$105;$r_sroa_1_1_ph=$105&$n_sroa_1_4_extract_trunc>>>($88>>>0);$q_sroa_0_1_ph=$n_sroa_0_0_extract_trunc<<$89&$92;$q_sroa_1_1_ph=($n_sroa_1_4_extract_trunc<<$89|$n_sroa_0_0_extract_trunc>>>($95>>>0))&$92|$n_sroa_0_0_extract_trunc<<$91&$88-33>>31;break;}
if(($rem|0)!=0){HEAP32[$rem>>2]=$66&$n_sroa_0_0_extract_trunc;HEAP32[$rem+4>>2]=0;}
if(($d_sroa_0_0_extract_trunc|0)==1){$_0$1=$n_sroa_1_4_extract_shift$0|$a$1&0;$_0$0=0|$a$0&-1;return(tempRet0=$_0$1,$_0$0)|0;}else{$78=_llvm_cttz_i32($d_sroa_0_0_extract_trunc|0)|0;$_0$1=0|$n_sroa_1_4_extract_trunc>>>($78>>>0);$_0$0=$n_sroa_1_4_extract_trunc<<32-$78|$n_sroa_0_0_extract_trunc>>>($78>>>0)|0;return(tempRet0=$_0$1,$_0$0)|0;}}}while(0);if(($sr_1_ph|0)==0){$q_sroa_1_1_lcssa=$q_sroa_1_1_ph;$q_sroa_0_1_lcssa=$q_sroa_0_1_ph;$r_sroa_1_1_lcssa=$r_sroa_1_1_ph;$r_sroa_0_1_lcssa=$r_sroa_0_1_ph;$carry_0_lcssa$1=0;$carry_0_lcssa$0=0;}else{$d_sroa_0_0_insert_insert99$0=0|$b$0&-1;$d_sroa_0_0_insert_insert99$1=$d_sroa_1_4_extract_shift$0|$b$1&0;$137$0=_i64Add($d_sroa_0_0_insert_insert99$0,$d_sroa_0_0_insert_insert99$1,-1,-1)|0;$137$1=tempRet0;$q_sroa_1_1198=$q_sroa_1_1_ph;$q_sroa_0_1199=$q_sroa_0_1_ph;$r_sroa_1_1200=$r_sroa_1_1_ph;$r_sroa_0_1201=$r_sroa_0_1_ph;$sr_1202=$sr_1_ph;$carry_0203=0;while(1){$147=$q_sroa_0_1199>>>31|$q_sroa_1_1198<<1;$149=$carry_0203|$q_sroa_0_1199<<1;$r_sroa_0_0_insert_insert42$0=0|($r_sroa_0_1201<<1|$q_sroa_1_1198>>>31);$r_sroa_0_0_insert_insert42$1=$r_sroa_0_1201>>>31|$r_sroa_1_1200<<1|0;_i64Subtract($137$0,$137$1,$r_sroa_0_0_insert_insert42$0,$r_sroa_0_0_insert_insert42$1)|0;$150$1=tempRet0;$151$0=$150$1>>31|(($150$1|0)<0?-1:0)<<1;$152=$151$0&1;$154$0=_i64Subtract($r_sroa_0_0_insert_insert42$0,$r_sroa_0_0_insert_insert42$1,$151$0&$d_sroa_0_0_insert_insert99$0,((($150$1|0)<0?-1:0)>>31|(($150$1|0)<0?-1:0)<<1)&$d_sroa_0_0_insert_insert99$1)|0;$r_sroa_0_0_extract_trunc=$154$0;$r_sroa_1_4_extract_trunc=tempRet0;$155=$sr_1202-1|0;if(($155|0)==0){break;}else{$q_sroa_1_1198=$147;$q_sroa_0_1199=$149;$r_sroa_1_1200=$r_sroa_1_4_extract_trunc;$r_sroa_0_1201=$r_sroa_0_0_extract_trunc;$sr_1202=$155;$carry_0203=$152;}}
$q_sroa_1_1_lcssa=$147;$q_sroa_0_1_lcssa=$149;$r_sroa_1_1_lcssa=$r_sroa_1_4_extract_trunc;$r_sroa_0_1_lcssa=$r_sroa_0_0_extract_trunc;$carry_0_lcssa$1=0;$carry_0_lcssa$0=$152;}
$q_sroa_0_0_insert_ext75$0=$q_sroa_0_1_lcssa;$q_sroa_0_0_insert_ext75$1=0;$q_sroa_0_0_insert_insert77$1=$q_sroa_1_1_lcssa|$q_sroa_0_0_insert_ext75$1;if(($rem|0)!=0){HEAP32[$rem>>2]=0|$r_sroa_0_1_lcssa;HEAP32[$rem+4>>2]=$r_sroa_1_1_lcssa|0;}
$_0$1=(0|$q_sroa_0_0_insert_ext75$0)>>>31|$q_sroa_0_0_insert_insert77$1<<1|($q_sroa_0_0_insert_ext75$1<<1|$q_sroa_0_0_insert_ext75$0>>>31)&0|$carry_0_lcssa$1;$_0$0=($q_sroa_0_0_insert_ext75$0<<1|0>>>31)&-2|$carry_0_lcssa$0;return(tempRet0=$_0$1,$_0$0)|0;}
var i64Math=(function(){var goog={math:{}};goog.math.Long=function(low,high){this.low_=low|0;this.high_=high|0;};goog.math.Long.IntCache_={};goog.math.Long.fromInt=function(value){if(-128<=value&&value<128){var cachedObj=goog.math.Long.IntCache_[value];if(cachedObj){return cachedObj;}}
var obj=new goog.math.Long(value|0,value<0?-1:0);if(-128<=value&&value<128){goog.math.Long.IntCache_[value]=obj;}
return obj;};goog.math.Long.fromNumber=function(value){if(isNaN(value)||!isFinite(value)){return goog.math.Long.ZERO;}else if(value<=-goog.math.Long.TWO_PWR_63_DBL_){return goog.math.Long.MIN_VALUE;}else if(value+1>=goog.math.Long.TWO_PWR_63_DBL_){return goog.math.Long.MAX_VALUE;}else if(value<0){return goog.math.Long.fromNumber(-value).negate();}else{return new goog.math.Long((value%goog.math.Long.TWO_PWR_32_DBL_)|0,(value/goog.math.Long.TWO_PWR_32_DBL_)|0);}};goog.math.Long.fromBits=function(lowBits,highBits){return new goog.math.Long(lowBits,highBits);};goog.math.Long.fromString=function(str,opt_radix){if(str.length==0){throw Error('number format error: empty string');}
var radix=opt_radix||10;if(radix<2||36<radix){throw Error('radix out of range: '+radix);}
if(str.charAt(0)=='-'){return goog.math.Long.fromString(str.substring(1),radix).negate();}else if(str.indexOf('-')>=0){throw Error('number format error: interior "-" character: '+str);}
var radixToPower=goog.math.Long.fromNumber(Math.pow(radix,8));var result=goog.math.Long.ZERO;for(var i=0;i<str.length;i+=8){var size=Math.min(8,str.length-i);var value=parseInt(str.substring(i,i+size),radix);if(size<8){var power=goog.math.Long.fromNumber(Math.pow(radix,size));result=result.multiply(power).add(goog.math.Long.fromNumber(value));}else{result=result.multiply(radixToPower);result=result.add(goog.math.Long.fromNumber(value));}}
return result;};goog.math.Long.TWO_PWR_16_DBL_=1<<16;goog.math.Long.TWO_PWR_24_DBL_=1<<24;goog.math.Long.TWO_PWR_32_DBL_=goog.math.Long.TWO_PWR_16_DBL_*goog.math.Long.TWO_PWR_16_DBL_;goog.math.Long.TWO_PWR_31_DBL_=goog.math.Long.TWO_PWR_32_DBL_/2;goog.math.Long.TWO_PWR_48_DBL_=goog.math.Long.TWO_PWR_32_DBL_*goog.math.Long.TWO_PWR_16_DBL_;goog.math.Long.TWO_PWR_64_DBL_=goog.math.Long.TWO_PWR_32_DBL_*goog.math.Long.TWO_PWR_32_DBL_;goog.math.Long.TWO_PWR_63_DBL_=goog.math.Long.TWO_PWR_64_DBL_/2;goog.math.Long.ZERO=goog.math.Long.fromInt(0);goog.math.Long.ONE=goog.math.Long.fromInt(1);goog.math.Long.NEG_ONE=goog.math.Long.fromInt(-1);goog.math.Long.MAX_VALUE=goog.math.Long.fromBits(0xFFFFFFFF|0,0x7FFFFFFF|0);goog.math.Long.MIN_VALUE=goog.math.Long.fromBits(0,0x80000000|0);goog.math.Long.TWO_PWR_24_=goog.math.Long.fromInt(1<<24);goog.math.Long.prototype.toInt=function(){return this.low_;};goog.math.Long.prototype.toNumber=function(){return this.high_*goog.math.Long.TWO_PWR_32_DBL_+
this.getLowBitsUnsigned();};goog.math.Long.prototype.toString=function(opt_radix){var radix=opt_radix||10;if(radix<2||36<radix){throw Error('radix out of range: '+radix);}
if(this.isZero()){return'0';}
if(this.isNegative()){if(this.equals(goog.math.Long.MIN_VALUE)){var radixLong=goog.math.Long.fromNumber(radix);var div=this.div(radixLong);var rem=div.multiply(radixLong).subtract(this);return div.toString(radix)+rem.toInt().toString(radix);}else{return'-'+this.negate().toString(radix);}}
var radixToPower=goog.math.Long.fromNumber(Math.pow(radix,6));var rem=this;var result='';while(true){var remDiv=rem.div(radixToPower);var intval=rem.subtract(remDiv.multiply(radixToPower)).toInt();var digits=intval.toString(radix);rem=remDiv;if(rem.isZero()){return digits+result;}else{while(digits.length<6){digits='0'+digits;}
result=''+digits+result;}}};goog.math.Long.prototype.getHighBits=function(){return this.high_;};goog.math.Long.prototype.getLowBits=function(){return this.low_;};goog.math.Long.prototype.getLowBitsUnsigned=function(){return(this.low_>=0)?this.low_:goog.math.Long.TWO_PWR_32_DBL_+this.low_;};goog.math.Long.prototype.getNumBitsAbs=function(){if(this.isNegative()){if(this.equals(goog.math.Long.MIN_VALUE)){return 64;}else{return this.negate().getNumBitsAbs();}}else{var val=this.high_!=0?this.high_:this.low_;for(var bit=31;bit>0;bit--){if((val&(1<<bit))!=0){break;}}
return this.high_!=0?bit+33:bit+1;}};goog.math.Long.prototype.isZero=function(){return this.high_==0&&this.low_==0;};goog.math.Long.prototype.isNegative=function(){return this.high_<0;};goog.math.Long.prototype.isOdd=function(){return(this.low_&1)==1;};goog.math.Long.prototype.equals=function(other){return(this.high_==other.high_)&&(this.low_==other.low_);};goog.math.Long.prototype.notEquals=function(other){return(this.high_!=other.high_)||(this.low_!=other.low_);};goog.math.Long.prototype.lessThan=function(other){return this.compare(other)<0;};goog.math.Long.prototype.lessThanOrEqual=function(other){return this.compare(other)<=0;};goog.math.Long.prototype.greaterThan=function(other){return this.compare(other)>0;};goog.math.Long.prototype.greaterThanOrEqual=function(other){return this.compare(other)>=0;};goog.math.Long.prototype.compare=function(other){if(this.equals(other)){return 0;}
var thisNeg=this.isNegative();var otherNeg=other.isNegative();if(thisNeg&&!otherNeg){return-1;}
if(!thisNeg&&otherNeg){return 1;}
if(this.subtract(other).isNegative()){return-1;}else{return 1;}};goog.math.Long.prototype.negate=function(){if(this.equals(goog.math.Long.MIN_VALUE)){return goog.math.Long.MIN_VALUE;}else{return this.not().add(goog.math.Long.ONE);}};goog.math.Long.prototype.add=function(other){var a48=this.high_>>>16;var a32=this.high_&0xFFFF;var a16=this.low_>>>16;var a00=this.low_&0xFFFF;var b48=other.high_>>>16;var b32=other.high_&0xFFFF;var b16=other.low_>>>16;var b00=other.low_&0xFFFF;var c48=0,c32=0,c16=0,c00=0;c00+=a00+b00;c16+=c00>>>16;c00&=0xFFFF;c16+=a16+b16;c32+=c16>>>16;c16&=0xFFFF;c32+=a32+b32;c48+=c32>>>16;c32&=0xFFFF;c48+=a48+b48;c48&=0xFFFF;return goog.math.Long.fromBits((c16<<16)|c00,(c48<<16)|c32);};goog.math.Long.prototype.subtract=function(other){return this.add(other.negate());};goog.math.Long.prototype.multiply=function(other){if(this.isZero()){return goog.math.Long.ZERO;}else if(other.isZero()){return goog.math.Long.ZERO;}
if(this.equals(goog.math.Long.MIN_VALUE)){return other.isOdd()?goog.math.Long.MIN_VALUE:goog.math.Long.ZERO;}else if(other.equals(goog.math.Long.MIN_VALUE)){return this.isOdd()?goog.math.Long.MIN_VALUE:goog.math.Long.ZERO;}
if(this.isNegative()){if(other.isNegative()){return this.negate().multiply(other.negate());}else{return this.negate().multiply(other).negate();}}else if(other.isNegative()){return this.multiply(other.negate()).negate();}
if(this.lessThan(goog.math.Long.TWO_PWR_24_)&&other.lessThan(goog.math.Long.TWO_PWR_24_)){return goog.math.Long.fromNumber(this.toNumber()*other.toNumber());}
var a48=this.high_>>>16;var a32=this.high_&0xFFFF;var a16=this.low_>>>16;var a00=this.low_&0xFFFF;var b48=other.high_>>>16;var b32=other.high_&0xFFFF;var b16=other.low_>>>16;var b00=other.low_&0xFFFF;var c48=0,c32=0,c16=0,c00=0;c00+=a00*b00;c16+=c00>>>16;c00&=0xFFFF;c16+=a16*b00;c32+=c16>>>16;c16&=0xFFFF;c16+=a00*b16;c32+=c16>>>16;c16&=0xFFFF;c32+=a32*b00;c48+=c32>>>16;c32&=0xFFFF;c32+=a16*b16;c48+=c32>>>16;c32&=0xFFFF;c32+=a00*b32;c48+=c32>>>16;c32&=0xFFFF;c48+=a48*b00+a32*b16+a16*b32+a00*b48;c48&=0xFFFF;return goog.math.Long.fromBits((c16<<16)|c00,(c48<<16)|c32);};goog.math.Long.prototype.div=function(other){if(other.isZero()){throw Error('division by zero');}else if(this.isZero()){return goog.math.Long.ZERO;}
if(this.equals(goog.math.Long.MIN_VALUE)){if(other.equals(goog.math.Long.ONE)||other.equals(goog.math.Long.NEG_ONE)){return goog.math.Long.MIN_VALUE;}else if(other.equals(goog.math.Long.MIN_VALUE)){return goog.math.Long.ONE;}else{var halfThis=this.shiftRight(1);var approx=halfThis.div(other).shiftLeft(1);if(approx.equals(goog.math.Long.ZERO)){return other.isNegative()?goog.math.Long.ONE:goog.math.Long.NEG_ONE;}else{var rem=this.subtract(other.multiply(approx));var result=approx.add(rem.div(other));return result;}}}else if(other.equals(goog.math.Long.MIN_VALUE)){return goog.math.Long.ZERO;}
if(this.isNegative()){if(other.isNegative()){return this.negate().div(other.negate());}else{return this.negate().div(other).negate();}}else if(other.isNegative()){return this.div(other.negate()).negate();}
var res=goog.math.Long.ZERO;var rem=this;while(rem.greaterThanOrEqual(other)){var approx=Math.max(1,Math.floor(rem.toNumber()/other.toNumber()));var log2=Math.ceil(Math.log(approx)/Math.LN2);var delta=(log2<=48)?1:Math.pow(2,log2-48);var approxRes=goog.math.Long.fromNumber(approx);var approxRem=approxRes.multiply(other);while(approxRem.isNegative()||approxRem.greaterThan(rem)){approx-=delta;approxRes=goog.math.Long.fromNumber(approx);approxRem=approxRes.multiply(other);}
if(approxRes.isZero()){approxRes=goog.math.Long.ONE;}
res=res.add(approxRes);rem=rem.subtract(approxRem);}
return res;};goog.math.Long.prototype.modulo=function(other){return this.subtract(this.div(other).multiply(other));};goog.math.Long.prototype.not=function(){return goog.math.Long.fromBits(~this.low_,~this.high_);};goog.math.Long.prototype.and=function(other){return goog.math.Long.fromBits(this.low_&other.low_,this.high_&other.high_);};goog.math.Long.prototype.or=function(other){return goog.math.Long.fromBits(this.low_|other.low_,this.high_|other.high_);};goog.math.Long.prototype.xor=function(other){return goog.math.Long.fromBits(this.low_^other.low_,this.high_^other.high_);};goog.math.Long.prototype.shiftLeft=function(numBits){numBits&=63;if(numBits==0){return this;}else{var low=this.low_;if(numBits<32){var high=this.high_;return goog.math.Long.fromBits(low<<numBits,(high<<numBits)|(low>>>(32-numBits)));}else{return goog.math.Long.fromBits(0,low<<(numBits-32));}}};goog.math.Long.prototype.shiftRight=function(numBits){numBits&=63;if(numBits==0){return this;}else{var high=this.high_;if(numBits<32){var low=this.low_;return goog.math.Long.fromBits((low>>>numBits)|(high<<(32-numBits)),high>>numBits);}else{return goog.math.Long.fromBits(high>>(numBits-32),high>=0?0:-1);}}};goog.math.Long.prototype.shiftRightUnsigned=function(numBits){numBits&=63;if(numBits==0){return this;}else{var high=this.high_;if(numBits<32){var low=this.low_;return goog.math.Long.fromBits((low>>>numBits)|(high<<(32-numBits)),high>>>numBits);}else if(numBits==32){return goog.math.Long.fromBits(high,0);}else{return goog.math.Long.fromBits(high>>>(numBits-32),0);}}};var navigator={appName:'Modern Browser'};var dbits;var canary=0xdeadbeefcafe;var j_lm=((canary&0xffffff)==0xefcafe);function BigInteger(a,b,c){if(a!=null)
if("number"==typeof a)this.fromNumber(a,b,c);else if(b==null&&"string"!=typeof a)this.fromString(a,256);else this.fromString(a,b);}
function nbi(){return new BigInteger(null);}
function am1(i,x,w,j,c,n){while(--n>=0){var v=x*this[i++]+w[j]+c;c=Math.floor(v/0x4000000);w[j++]=v&0x3ffffff;}
return c;}
function am2(i,x,w,j,c,n){var xl=x&0x7fff,xh=x>>15;while(--n>=0){var l=this[i]&0x7fff;var h=this[i++]>>15;var m=xh*l+h*xl;l=xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);c=(l>>>30)+(m>>>15)+xh*h+(c>>>30);w[j++]=l&0x3fffffff;}
return c;}
function am3(i,x,w,j,c,n){var xl=x&0x3fff,xh=x>>14;while(--n>=0){var l=this[i]&0x3fff;var h=this[i++]>>14;var m=xh*l+h*xl;l=xl*l+((m&0x3fff)<<14)+w[j]+c;c=(l>>28)+(m>>14)+xh*h;w[j++]=l&0xfffffff;}
return c;}
if(j_lm&&(navigator.appName=="Microsoft Internet Explorer")){BigInteger.prototype.am=am2;dbits=30;}
else if(j_lm&&(navigator.appName!="Netscape")){BigInteger.prototype.am=am1;dbits=26;}
else{BigInteger.prototype.am=am3;dbits=28;}
BigInteger.prototype.DB=dbits;BigInteger.prototype.DM=((1<<dbits)-1);BigInteger.prototype.DV=(1<<dbits);var BI_FP=52;BigInteger.prototype.FV=Math.pow(2,BI_FP);BigInteger.prototype.F1=BI_FP-dbits;BigInteger.prototype.F2=2*dbits-BI_FP;var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz";var BI_RC=new Array();var rr,vv;rr="0".charCodeAt(0);for(vv=0;vv<=9;++vv)BI_RC[rr++]=vv;rr="a".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;rr="A".charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;function int2char(n){return BI_RM.charAt(n);}
function intAt(s,i){var c=BI_RC[s.charCodeAt(i)];return(c==null)?-1:c;}
function bnpCopyTo(r){for(var i=this.t-1;i>=0;--i)r[i]=this[i];r.t=this.t;r.s=this.s;}
function bnpFromInt(x){this.t=1;this.s=(x<0)?-1:0;if(x>0)this[0]=x;else if(x<-1)this[0]=x+DV;else this.t=0;}
function nbv(i){var r=nbi();r.fromInt(i);return r;}
function bnpFromString(s,b){var k;if(b==16)k=4;else if(b==8)k=3;else if(b==256)k=8;else if(b==2)k=1;else if(b==32)k=5;else if(b==4)k=2;else{this.fromRadix(s,b);return;}
this.t=0;this.s=0;var i=s.length,mi=false,sh=0;while(--i>=0){var x=(k==8)?s[i]&0xff:intAt(s,i);if(x<0){if(s.charAt(i)=="-")mi=true;continue;}
mi=false;if(sh==0)
this[this.t++]=x;else if(sh+k>this.DB){this[this.t-1]|=(x&((1<<(this.DB-sh))-1))<<sh;this[this.t++]=(x>>(this.DB-sh));}
else
this[this.t-1]|=x<<sh;sh+=k;if(sh>=this.DB)sh-=this.DB;}
if(k==8&&(s[0]&0x80)!=0){this.s=-1;if(sh>0)this[this.t-1]|=((1<<(this.DB-sh))-1)<<sh;}
this.clamp();if(mi)BigInteger.ZERO.subTo(this,this);}
function bnpClamp(){var c=this.s&this.DM;while(this.t>0&&this[this.t-1]==c)--this.t;}
function bnToString(b){if(this.s<0)return"-"+this.negate().toString(b);var k;if(b==16)k=4;else if(b==8)k=3;else if(b==2)k=1;else if(b==32)k=5;else if(b==4)k=2;else return this.toRadix(b);var km=(1<<k)-1,d,m=false,r="",i=this.t;var p=this.DB-(i*this.DB)%k;if(i-->0){if(p<this.DB&&(d=this[i]>>p)>0){m=true;r=int2char(d);}
while(i>=0){if(p<k){d=(this[i]&((1<<p)-1))<<(k-p);d|=this[--i]>>(p+=this.DB-k);}
else{d=(this[i]>>(p-=k))&km;if(p<=0){p+=this.DB;--i;}}
if(d>0)m=true;if(m)r+=int2char(d);}}
return m?r:"0";}
function bnNegate(){var r=nbi();BigInteger.ZERO.subTo(this,r);return r;}
function bnAbs(){return(this.s<0)?this.negate():this;}
function bnCompareTo(a){var r=this.s-a.s;if(r!=0)return r;var i=this.t;r=i-a.t;if(r!=0)return(this.s<0)?-r:r;while(--i>=0)if((r=this[i]-a[i])!=0)return r;return 0;}
function nbits(x){var r=1,t;if((t=x>>>16)!=0){x=t;r+=16;}
if((t=x>>8)!=0){x=t;r+=8;}
if((t=x>>4)!=0){x=t;r+=4;}
if((t=x>>2)!=0){x=t;r+=2;}
if((t=x>>1)!=0){x=t;r+=1;}
return r;}
function bnBitLength(){if(this.t<=0)return 0;return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));}
function bnpDLShiftTo(n,r){var i;for(i=this.t-1;i>=0;--i)r[i+n]=this[i];for(i=n-1;i>=0;--i)r[i]=0;r.t=this.t+n;r.s=this.s;}
function bnpDRShiftTo(n,r){for(var i=n;i<this.t;++i)r[i-n]=this[i];r.t=Math.max(this.t-n,0);r.s=this.s;}
function bnpLShiftTo(n,r){var bs=n%this.DB;var cbs=this.DB-bs;var bm=(1<<cbs)-1;var ds=Math.floor(n/this.DB),c=(this.s<<bs)&this.DM,i;for(i=this.t-1;i>=0;--i){r[i+ds+1]=(this[i]>>cbs)|c;c=(this[i]&bm)<<bs;}
for(i=ds-1;i>=0;--i)r[i]=0;r[ds]=c;r.t=this.t+ds+1;r.s=this.s;r.clamp();}
function bnpRShiftTo(n,r){r.s=this.s;var ds=Math.floor(n/this.DB);if(ds>=this.t){r.t=0;return;}
var bs=n%this.DB;var cbs=this.DB-bs;var bm=(1<<bs)-1;r[0]=this[ds]>>bs;for(var i=ds+1;i<this.t;++i){r[i-ds-1]|=(this[i]&bm)<<cbs;r[i-ds]=this[i]>>bs;}
if(bs>0)r[this.t-ds-1]|=(this.s&bm)<<cbs;r.t=this.t-ds;r.clamp();}
function bnpSubTo(a,r){var i=0,c=0,m=Math.min(a.t,this.t);while(i<m){c+=this[i]-a[i];r[i++]=c&this.DM;c>>=this.DB;}
if(a.t<this.t){c-=a.s;while(i<this.t){c+=this[i];r[i++]=c&this.DM;c>>=this.DB;}
c+=this.s;}
else{c+=this.s;while(i<a.t){c-=a[i];r[i++]=c&this.DM;c>>=this.DB;}
c-=a.s;}
r.s=(c<0)?-1:0;if(c<-1)r[i++]=this.DV+c;else if(c>0)r[i++]=c;r.t=i;r.clamp();}
function bnpMultiplyTo(a,r){var x=this.abs(),y=a.abs();var i=x.t;r.t=i+y.t;while(--i>=0)r[i]=0;for(i=0;i<y.t;++i)r[i+x.t]=x.am(0,y[i],r,i,0,x.t);r.s=0;r.clamp();if(this.s!=a.s)BigInteger.ZERO.subTo(r,r);}
function bnpSquareTo(r){var x=this.abs();var i=r.t=2*x.t;while(--i>=0)r[i]=0;for(i=0;i<x.t-1;++i){var c=x.am(i,x[i],r,2*i,0,1);if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1))>=x.DV){r[i+x.t]-=x.DV;r[i+x.t+1]=1;}}
if(r.t>0)r[r.t-1]+=x.am(i,x[i],r,2*i,0,1);r.s=0;r.clamp();}
function bnpDivRemTo(m,q,r){var pm=m.abs();if(pm.t<=0)return;var pt=this.abs();if(pt.t<pm.t){if(q!=null)q.fromInt(0);if(r!=null)this.copyTo(r);return;}
if(r==null)r=nbi();var y=nbi(),ts=this.s,ms=m.s;var nsh=this.DB-nbits(pm[pm.t-1]);if(nsh>0){pm.lShiftTo(nsh,y);pt.lShiftTo(nsh,r);}
else{pm.copyTo(y);pt.copyTo(r);}
var ys=y.t;var y0=y[ys-1];if(y0==0)return;var yt=y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);var d1=this.FV/yt,d2=(1<<this.F1)/yt,e=1<<this.F2;var i=r.t,j=i-ys,t=(q==null)?nbi():q;y.dlShiftTo(j,t);if(r.compareTo(t)>=0){r[r.t++]=1;r.subTo(t,r);}
BigInteger.ONE.dlShiftTo(ys,t);t.subTo(y,y);while(y.t<ys)y[y.t++]=0;while(--j>=0){var qd=(r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);if((r[i]+=y.am(0,qd,r,j,0,ys))<qd){y.dlShiftTo(j,t);r.subTo(t,r);while(r[i]<--qd)r.subTo(t,r);}}
if(q!=null){r.drShiftTo(ys,q);if(ts!=ms)BigInteger.ZERO.subTo(q,q);}
r.t=ys;r.clamp();if(nsh>0)r.rShiftTo(nsh,r);if(ts<0)BigInteger.ZERO.subTo(r,r);}
function bnMod(a){var r=nbi();this.abs().divRemTo(a,null,r);if(this.s<0&&r.compareTo(BigInteger.ZERO)>0)a.subTo(r,r);return r;}
function Classic(m){this.m=m;}
function cConvert(x){if(x.s<0||x.compareTo(this.m)>=0)return x.mod(this.m);else return x;}
function cRevert(x){return x;}
function cReduce(x){x.divRemTo(this.m,null,x);}
function cMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r);}
function cSqrTo(x,r){x.squareTo(r);this.reduce(r);}
Classic.prototype.convert=cConvert;Classic.prototype.revert=cRevert;Classic.prototype.reduce=cReduce;Classic.prototype.mulTo=cMulTo;Classic.prototype.sqrTo=cSqrTo;function bnpInvDigit(){if(this.t<1)return 0;var x=this[0];if((x&1)==0)return 0;var y=x&3;y=(y*(2-(x&0xf)*y))&0xf;y=(y*(2-(x&0xff)*y))&0xff;y=(y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;y=(y*(2-x*y%this.DV))%this.DV;return(y>0)?this.DV-y:-y;}
function Montgomery(m){this.m=m;this.mp=m.invDigit();this.mpl=this.mp&0x7fff;this.mph=this.mp>>15;this.um=(1<<(m.DB-15))-1;this.mt2=2*m.t;}
function montConvert(x){var r=nbi();x.abs().dlShiftTo(this.m.t,r);r.divRemTo(this.m,null,r);if(x.s<0&&r.compareTo(BigInteger.ZERO)>0)this.m.subTo(r,r);return r;}
function montRevert(x){var r=nbi();x.copyTo(r);this.reduce(r);return r;}
function montReduce(x){while(x.t<=this.mt2)
x[x.t++]=0;for(var i=0;i<this.m.t;++i){var j=x[i]&0x7fff;var u0=(j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;j=i+this.m.t;x[j]+=this.m.am(0,u0,x,i,0,this.m.t);while(x[j]>=x.DV){x[j]-=x.DV;x[++j]++;}}
x.clamp();x.drShiftTo(this.m.t,x);if(x.compareTo(this.m)>=0)x.subTo(this.m,x);}
function montSqrTo(x,r){x.squareTo(r);this.reduce(r);}
function montMulTo(x,y,r){x.multiplyTo(y,r);this.reduce(r);}
Montgomery.prototype.convert=montConvert;Montgomery.prototype.revert=montRevert;Montgomery.prototype.reduce=montReduce;Montgomery.prototype.mulTo=montMulTo;Montgomery.prototype.sqrTo=montSqrTo;function bnpIsEven(){return((this.t>0)?(this[0]&1):this.s)==0;}
function bnpExp(e,z){if(e>0xffffffff||e<1)return BigInteger.ONE;var r=nbi(),r2=nbi(),g=z.convert(this),i=nbits(e)-1;g.copyTo(r);while(--i>=0){z.sqrTo(r,r2);if((e&(1<<i))>0)z.mulTo(r2,g,r);else{var t=r;r=r2;r2=t;}}
return z.revert(r);}
function bnModPowInt(e,m){var z;if(e<256||m.isEven())z=new Classic(m);else z=new Montgomery(m);return this.exp(e,z);}
BigInteger.prototype.copyTo=bnpCopyTo;BigInteger.prototype.fromInt=bnpFromInt;BigInteger.prototype.fromString=bnpFromString;BigInteger.prototype.clamp=bnpClamp;BigInteger.prototype.dlShiftTo=bnpDLShiftTo;BigInteger.prototype.drShiftTo=bnpDRShiftTo;BigInteger.prototype.lShiftTo=bnpLShiftTo;BigInteger.prototype.rShiftTo=bnpRShiftTo;BigInteger.prototype.subTo=bnpSubTo;BigInteger.prototype.multiplyTo=bnpMultiplyTo;BigInteger.prototype.squareTo=bnpSquareTo;BigInteger.prototype.divRemTo=bnpDivRemTo;BigInteger.prototype.invDigit=bnpInvDigit;BigInteger.prototype.isEven=bnpIsEven;BigInteger.prototype.exp=bnpExp;BigInteger.prototype.toString=bnToString;BigInteger.prototype.negate=bnNegate;BigInteger.prototype.abs=bnAbs;BigInteger.prototype.compareTo=bnCompareTo;BigInteger.prototype.bitLength=bnBitLength;BigInteger.prototype.mod=bnMod;BigInteger.prototype.modPowInt=bnModPowInt;BigInteger.ZERO=nbv(0);BigInteger.ONE=nbv(1);function bnpFromRadix(s,b){this.fromInt(0);if(b==null)b=10;var cs=this.chunkSize(b);var d=Math.pow(b,cs),mi=false,j=0,w=0;for(var i=0;i<s.length;++i){var x=intAt(s,i);if(x<0){if(s.charAt(i)=="-"&&this.signum()==0)mi=true;continue;}
w=b*w+x;if(++j>=cs){this.dMultiply(d);this.dAddOffset(w,0);j=0;w=0;}}
if(j>0){this.dMultiply(Math.pow(b,j));this.dAddOffset(w,0);}
if(mi)BigInteger.ZERO.subTo(this,this);}
function bnpChunkSize(r){return Math.floor(Math.LN2*this.DB/Math.log(r));}
function bnSigNum(){if(this.s<0)return-1;else if(this.t<=0||(this.t==1&&this[0]<=0))return 0;else return 1;}
function bnpDMultiply(n){this[this.t]=this.am(0,n-1,this,0,0,this.t);++this.t;this.clamp();}
function bnpDAddOffset(n,w){if(n==0)return;while(this.t<=w)this[this.t++]=0;this[w]+=n;while(this[w]>=this.DV){this[w]-=this.DV;if(++w>=this.t)this[this.t++]=0;++this[w];}}
function bnpToRadix(b){if(b==null)b=10;if(this.signum()==0||b<2||b>36)return"0";var cs=this.chunkSize(b);var a=Math.pow(b,cs);var d=nbv(a),y=nbi(),z=nbi(),r="";this.divRemTo(d,y,z);while(y.signum()>0){r=(a+z.intValue()).toString(b).substr(1)+r;y.divRemTo(d,y,z);}
return z.intValue().toString(b)+r;}
function bnIntValue(){if(this.s<0){if(this.t==1)return this[0]-this.DV;else if(this.t==0)return-1;}
else if(this.t==1)return this[0];else if(this.t==0)return 0;return((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];}
function bnpAddTo(a,r){var i=0,c=0,m=Math.min(a.t,this.t);while(i<m){c+=this[i]+a[i];r[i++]=c&this.DM;c>>=this.DB;}
if(a.t<this.t){c+=a.s;while(i<this.t){c+=this[i];r[i++]=c&this.DM;c>>=this.DB;}
c+=this.s;}
else{c+=this.s;while(i<a.t){c+=a[i];r[i++]=c&this.DM;c>>=this.DB;}
c+=a.s;}
r.s=(c<0)?-1:0;if(c>0)r[i++]=c;else if(c<-1)r[i++]=this.DV+c;r.t=i;r.clamp();}
BigInteger.prototype.fromRadix=bnpFromRadix;BigInteger.prototype.chunkSize=bnpChunkSize;BigInteger.prototype.signum=bnSigNum;BigInteger.prototype.dMultiply=bnpDMultiply;BigInteger.prototype.dAddOffset=bnpDAddOffset;BigInteger.prototype.toRadix=bnpToRadix;BigInteger.prototype.intValue=bnIntValue;BigInteger.prototype.addTo=bnpAddTo;var Wrapper={abs:function(l,h){var x=new goog.math.Long(l,h);var ret;if(x.isNegative()){ret=x.negate();}else{ret=x;}
HEAP32[tempDoublePtr>>2]=ret.low_;HEAP32[tempDoublePtr+4>>2]=ret.high_;},ensureTemps:function(){if(Wrapper.ensuredTemps)return;Wrapper.ensuredTemps=true;Wrapper.two32=new BigInteger();Wrapper.two32.fromString('4294967296',10);Wrapper.two64=new BigInteger();Wrapper.two64.fromString('18446744073709551616',10);Wrapper.temp1=new BigInteger();Wrapper.temp2=new BigInteger();},lh2bignum:function(l,h){var a=new BigInteger();a.fromString(h.toString(),10);var b=new BigInteger();a.multiplyTo(Wrapper.two32,b);var c=new BigInteger();c.fromString(l.toString(),10);var d=new BigInteger();c.addTo(b,d);return d;},stringify:function(l,h,unsigned){var ret=new goog.math.Long(l,h).toString();if(unsigned&&ret[0]=='-'){Wrapper.ensureTemps();var bignum=new BigInteger();bignum.fromString(ret,10);ret=new BigInteger();Wrapper.two64.addTo(bignum,ret);ret=ret.toString(10);}
return ret;},fromString:function(str,base,min,max,unsigned){Wrapper.ensureTemps();var bignum=new BigInteger();bignum.fromString(str,base);var bigmin=new BigInteger();bigmin.fromString(min,10);var bigmax=new BigInteger();bigmax.fromString(max,10);if(unsigned&&bignum.compareTo(BigInteger.ZERO)<0){var temp=new BigInteger();bignum.addTo(Wrapper.two64,temp);bignum=temp;}
var error=false;if(bignum.compareTo(bigmin)<0){bignum=bigmin;error=true;}else if(bignum.compareTo(bigmax)>0){bignum=bigmax;error=true;}
var ret=goog.math.Long.fromString(bignum.toString());HEAP32[tempDoublePtr>>2]=ret.low_;HEAP32[tempDoublePtr+4>>2]=ret.high_;if(error)throw'range error';}};return Wrapper;})();if(memoryInitializer){function applyData(data){HEAPU8.set(data,STATIC_BASE);}
if(ENVIRONMENT_IS_NODE||ENVIRONMENT_IS_SHELL){applyData(Module['readBinary'](memoryInitializer));}else{addRunDependency('memory initializer');Browser.asyncLoad(memoryInitializer,function(data){applyData(data);removeRunDependency('memory initializer');},function(data){throw'could not load memory initializer '+memoryInitializer;});}}
function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status;};ExitStatus.prototype=new Error();ExitStatus.prototype.constructor=ExitStatus;var initialStackTop;var preloadStartTime=null;var calledMain=false;var calledRun=false;dependenciesFulfilled=function runCaller(){if(!calledRun&&shouldRunNow)run();if(!calledRun)dependenciesFulfilled=runCaller;}
Module['callMain']=Module.callMain=function callMain(args){assert(runDependencies==0,'cannot call main when async dependencies remain! (listen on __ATMAIN__)');assert(__ATPRERUN__.length==0,'cannot call main when preRun functions remain to be called');args=args||[];if(ENVIRONMENT_IS_WEB&&preloadStartTime!==null){Module.printErr('preload time: '+(Date.now()-preloadStartTime)+' ms');}
ensureInitRuntime();var argc=args.length+1;function pad(){for(var i=0;i<4-1;i++){argv.push(0);}}
var argv=[allocate(intArrayFromString("/bin/this.program"),'i8',ALLOC_NORMAL)];pad();for(var i=0;i<argc-1;i=i+1){argv.push(allocate(intArrayFromString(args[i]),'i8',ALLOC_NORMAL));pad();}
argv.push(0);argv=allocate(argv,'i32',ALLOC_NORMAL);initialStackTop=STACKTOP;try{var ret=Module['_main'](argc,argv,0);if(!Module['noExitRuntime']){exit(ret);}}
catch(e){if(e instanceof ExitStatus){return;}else if(e=='SimulateInfiniteLoop'){Module['noExitRuntime']=true;return;}else{throw e;}}finally{calledMain=true;}}
function run(args){args=args||Module['arguments'];if(preloadStartTime===null)preloadStartTime=Date.now();if(runDependencies>0){Module.printErr('run() called, but dependencies remain, so not running');return;}
preRun();if(runDependencies>0){return;}
function doRun(){ensureInitRuntime();preMain();calledRun=true;if(Module['_main']&&shouldRunNow){Module['callMain'](args);}
postRun();}
if(Module['setStatus']){Module['setStatus']('Running...');setTimeout(function(){setTimeout(function(){Module['setStatus']('');},1);if(!ABORT)doRun();},1);}else{doRun();}}
Module['run']=Module.run=run;function exit(status){ABORT=true;EXITSTATUS=status;STACKTOP=initialStackTop;exitRuntime();throw new ExitStatus(status);}
Module['exit']=Module.exit=exit;function abort(text){if(text){Module.print(text);Module.printErr(text);}
ABORT=true;EXITSTATUS=1;throw'abort() at '+(new Error().stack);}
Module['abort']=Module.abort=abort;if(Module['preInit']){if(typeof Module['preInit']=='function')Module['preInit']=[Module['preInit']];while(Module['preInit'].length>0){Module['preInit'].pop()();}}
var shouldRunNow=true;if(Module['noInitialRun']){shouldRunNow=false;}
run();  

 htmlstuff = Module.cwrap('htmlstuff_c', 'int', ['string']);



	var map         	= [];
    map[0]          	= 0;

    var input       	= [];
    var output      	= [];
    var avoid       	= [];
    var prevCnf     	= '';
    var variables   	= [];
    var ignore      	= [];
    var combinations	= [];
    
    Array.prototype.contains = function(v) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] === v) return true;
        }
        return false;
    };

    Array.prototype.unique = function() {
        var arr = [];
        for(var i = 0; i < this.length; i++) {
            if(!arr.contains(this[i])) {
                arr.push(this[i]);
            }
        }
        return arr; 
    }

    if (typeof String.prototype.startsWith != 'function') {
        // see below for better implementation!
        String.prototype.startsWith = function (str){
            return this.indexOf(str) == 0;
        };
    }

    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };



    function getTag(node) {
        var tag = '';
        tag = node.split(".")[0].split("#")[0];
        if(ignore.indexOf(tag) == -1)
            return tag;
        else
            return '';
    }

    function getID(node) {
        var id = '';
        if(node.indexOf("#") != -1) {
            var indexHash = node.indexOf("#");
            id = node.substring(indexHash).split(".")[0];
        }
        if(ignore.indexOf(id) == -1)
            return id;
        else
            return '';
    }
        
    function getClasses(node) {
        var classes = new Array();
        if(node.indexOf(".") != -1) {
            var indexDot = node.indexOf(".");
            var temp = node.substring(indexDot);
            temp = temp.substring(1);
            classes = temp.split(".");
        }
        var ret = [];
        for(var i=0; i<classes.length; i++) {
            if(ignore.indexOf('.' + classes[i]) == -1)
                ret.push('.' + classes[i]);
        }
        return ret;
    }

    function filterBeforeID(positive) {
    	var pos = positive.split(' ').reverse();

        var ret = new Array();

        for(var i=0; i < pos.length; i++) {
            
            
            var id = getID(pos[i]);
            var tag = getTag(pos[i]);
            var css =  getClasses(pos[i]).sort();
            
            if(id != '') {
                ret.push(id);
                break;
            } else {
                ret.push(pos[i]);
            }
        }
        return ret.reverse().join(' ');
    }

    function getParentSelector(selector) {
        var temp = selector.split(' ');
        temp.pop();
        return temp.join(' ').trim();
    }

    function getNode(selector) {
        var temp = selector.split(" ");
        temp.reverse();
        return temp[0];
    }

    function getIDSequences(parentSelector, maxDepth, IDSequences) {
        
        if(parentSelector != '' && maxDepth > 0) {            
            var counter     = IDSequences.length;
            
            for(var i=0; i<counter; i++) {

                var ret         = IDSequences[0];
                IDSequences.shift();

                var tempParentSelector  = parentSelector;
                var tempRet             = ret;
                var tempMaxDepth        = maxDepth;

                for( var j=0; j<parentSelector.split(' ').length; j++) {
                    var node            = getNode(tempParentSelector);
                    var id              = getID(node);
                    tempParentSelector  = getParentSelector(tempParentSelector);

                    var tempIDSequencesSkip = [];
                    tempIDSequencesSkip.push(tempRet);
                    IDSequences = IDSequences.concat(getIDSequences(tempParentSelector,tempMaxDepth,tempIDSequencesSkip));
                    

                    if(id != '') {
                        id = id + ' ';
                    }
                    var tempIDSequences = [];
                    tempIDSequences.push(id + tempRet);
                    var p = tempMaxDepth - j - 1;
                    IDSequences = IDSequences.concat(getIDSequences(tempParentSelector,tempMaxDepth - j - 1,tempIDSequences));                    
                }

            }
        }
        return IDSequences;
    }

    function getTagSequences(parentSelector, maxDepth, tagSequences) {
        
        if(parentSelector != '' && maxDepth > 0) {            
            var counter     = tagSequences.length;
            
            for(var i=0; i<counter; i++) {

                var ret         = tagSequences[0];
                tagSequences.shift();

                var tempParentSelector  = parentSelector;
                var tempRet             = ret;
                var tempMaxDepth        = maxDepth;

                for( var j=0; j<parentSelector.split(' ').length; j++) {
                    var node            = getNode(tempParentSelector);
                    var tag              = getTag(node);
                    tempParentSelector  = getParentSelector(tempParentSelector);

                    var tempTagSequencesSkip = [];
                    tempTagSequencesSkip.push(tempRet);
                    tagSequences = tagSequences.concat(getTagSequences(tempParentSelector,tempMaxDepth,tempTagSequencesSkip));
                    

                    if(tag != '') {
                        tag = tag + ' ';
                    }
                    var tempTagSequences = [];
                    tempTagSequences.push(tag + tempRet);
                    tagSequences = tagSequences.concat(getTagSequences(tempParentSelector,tempMaxDepth - j - 1,tempTagSequences));                    
                }
            }
        }
        return tagSequences;
    }

    function getClassSequences(parentSelector, maxDepth, classSequences) {
        
        if(parentSelector != '' && maxDepth > 0) {            
            var counter     = classSequences.length;
            
            for(var i=0; i<counter; i++) {

                var ret         = classSequences[0];
                classSequences.shift();

                var tempParentSelector  = parentSelector;
                var tempRet             = ret;
                var tempMaxDepth        = maxDepth;

                for( var j=0; j<parentSelector.split(' ').length; j++) {
                    var node            = getNode(tempParentSelector);
                    var classes         = getClasses(node);
                    tempParentSelector  = getParentSelector(tempParentSelector);

                    var tempClassSequencesSkip = [];
                    tempClassSequencesSkip.push(tempRet);
                    classSequences = classSequences.concat(getClassSequences(tempParentSelector,tempMaxDepth,tempClassSequencesSkip));
                    

                    for(var k=0; k<classes.length; k++) {
                        var tempClassSequences = [];
                        tempClassSequences.push(classes[k] + ' ' + tempRet);
                        classSequences = classSequences.concat(getClassSequences(tempParentSelector,tempMaxDepth - j - 1,tempClassSequences));  
                    }                  
                }
            }
        }
        return classSequences;
    }

    function isMixed(mixSequence) {
    	var tags 	= 0;
    	var classes = 0;
    	var ids 	= 0;


    	var nodes 	= mixSequence.trim().split(' ');
    	for(i=0; i<nodes.length; i++){
			
			var node = nodes[i];
			var id              = getID(node);
	        var tag             = getTag(node);
    	    var css         = getClasses(node);
    		
    		if(id.trim() != '')
    			ids 	= 1;

    		if(tag.trim() != '')
    			tags 	= 1;

    		if(css.length > 0)
    			classes 	= 1;

    	}

    	var ret = tags + classes + ids;
    	if(mixSequence.trim() == "body div") {
    		alert(mixSequence);
    		alert(tags);
    		alert(classes);
    		alert(ids);

    	}
    	return (ret > 1);
    }
    function getMixSequences(parentSelector, maxDepth, mixSequences) {
        
        if(parentSelector != '' && maxDepth > 0) {            
            var counter     = mixSequences.length;
            
            for(var i=0; i<counter; i++) {

                var ret         = mixSequences[0];
                mixSequences.shift();

                var tempParentSelector  = parentSelector;
                var tempRet             = ret;
                var tempMaxDepth        = maxDepth;

                for( var j=0; j<parentSelector.split(' ').length; j++) {
                    var node            = getNode(tempParentSelector);
                    var mix             = [];
                    var id              = getID(node);
                    var tag             = getTag(node);
                    var classes         = getClasses(node);
                    tempParentSelector  = getParentSelector(tempParentSelector);

                    if(!options['id']['allowed'])
                    	id = '';
                    
                    if(!options['tag']['allowed'])
                    	tag = '';
                    
                    if(!options['classes']['allowed'])
                    	classes = [];

                    if(id != '')
                        mix.push(id);
                    if(tag != '')
                        mix.push(tag);
                    mix = mix.concat(classes);

                    var tempMixSequencesSkip = [];
                    tempMixSequencesSkip.push(tempRet);
                    mixSequences = mixSequences.concat(getMixSequences(tempParentSelector,tempMaxDepth,tempMixSequencesSkip));
                    

                    for(var k=0; k<mix.length; k++) {
                        var tempMixSequences = [];
                        tempMixSequences.push(mix[k] + ' ' + tempRet);
                        mixSequences = mixSequences.concat(getMixSequences(tempParentSelector,tempMaxDepth - j - 1,tempMixSequences));  
                    }                  
                }
            }
        }
        return mixSequences;
    }

    function getDepth(data) {
        return data.split(" ").length;
    }

    function using(sequence, use) {
        if(use.length <= 0) {
            return true;
        } else {
            var temp = sequence.trim().split(' ');
            for(var i=0; i<temp.length; i++) {
                var id              = getID(temp[i]);
                var tag             = getTag(temp[i]);
                var classes         = getClasses(temp[i]);
                use.remove(id);
                use.remove(tag);
                for(var j=0; j<classes.length; j++) {
                    use.remove(classes[j]);
                }
            }
            return (use.length == 0);
        }
    }

    function generateIDSequences(selector, options) {
        
        
        var temp 			= selector.split(',');
        selector 			= temp[0].trim();
        var ps 				= '';
        if(temp.length > 1)
        	ps = temp[1];

        if(selector.length > 0) {
	        var parentSelector  = getParentSelector(selector);
	        var node            = getNode(selector);
	        var id              = getID(node);
	        var tag             = getTag(node);
	        var classes         = getClasses(node);
	        var minDepth        = 0;//options['depth'];  
	        

	        
	        if(options['id']['allowed'] == true && id != '') {

	            var maxDepth = options['depth'];
	            maxDepth--;
	            if(ps != '')
	            	maxDepth--;
	            
	            var IDSequences = [];
	            IDSequences.push(id);
	            if(parentSelector != '') {
	                IDSequences = getIDSequences(parentSelector, maxDepth, IDSequences).unique();
	            }            
	            for(var j=0; j<IDSequences.length; j++) {
	                var IDSequence = IDSequences[j];
	                if(ps != '')
	                	IDSequence = ps + ' ' + IDSequence;
	                if(getDepth(IDSequence) >= minDepth && using(IDSequence,options['use'].slice(0))) {
	                    var index = -1;
	                    IDSequence = filterBeforeID(IDSequence);
	                    index = map.indexOf(IDSequence);
	                    if(index == -1) {
	                        map.push(IDSequence);
	                        index = map.indexOf(IDSequence);
	                    }
	                    variables.push(index);
	                }
	            }
	        }
	    } else {
	    	var index = -1;
	        IDSequence = ps;
            index = map.indexOf(IDSequence);
            if(index == -1) {
                map.push(IDSequence);
                index = map.indexOf(IDSequence);
            }
            variables.push(index);
	    }
    }

    function generateTagSequences(selector, options) {
        
        var temp 			= selector.split(',');
        selector 			= temp[0].trim();
        var ps 				= '';
        if(temp.length > 1)
        	ps = temp[1];

        if(selector.length > 0) {
	        var parentSelector  = getParentSelector(selector);
	        var node            = getNode(selector);
	        var id              = getID(node);
	        var tag             = getTag(node);
	        var classes         = getClasses(node);
	        var minDepth        = 0;//options['depth'];  
	        
	        if(options['tag']['allowed'] == true && tag != '') {

	            var maxDepth = options['depth'];
	            maxDepth--;
	            if(ps != '')
	            	maxDepth--;
	            
	            var tagSequences = [];
	            tagSequences.push(tag);
	            
	            if(parentSelector != '') {
	                tagSequences = getTagSequences(parentSelector, maxDepth, tagSequences).unique();
	            }

	            for(var j=0; j<tagSequences.length; j++) {
	            	var tagSequence = tagSequences[j];
	                if(ps != '')
	                	tagSequence = ps + ' ' + tagSequence;
	                
	                if(getDepth(tagSequence) >= minDepth && using(tagSequence,options['use'].slice(0))) {
	                    var index = -1;
	                    index = map.indexOf(tagSequence);
	                    if(index == -1) {
	                        map.push(tagSequence);
	                        index = map.indexOf(tagSequence);
	                    }
	                    variables.push(index);
	                }
	            }
	        }
        } else {
	    	var index = -1;
	        var tagSequence = ps;
            index = map.indexOf(tagSequence);
            if(index == -1) {
                map.push(tagSequence);
                index = map.indexOf(tagSequence);
            }
            variables.push(index);
	    }
    }

    function generateClassSequences(selector, options) {
        
        var temp 			= selector.split(',');
        selector 			= temp[0].trim();
        var ps 				= '';
        if(temp.length > 1)
        	ps = temp[1];

        if(selector.length > 0) {
	        var parentSelector  = getParentSelector(selector);
	        var node            = getNode(selector);
	        var id              = getID(node);
	        var tag             = getTag(node);
	        var classes         = getClasses(node);
	        var minDepth        = 0;//options['depth']; 
	        
	        if(options['classes']['allowed'] == true && classes.length > 0) {

	            var maxDepth = options['depth'];
	            maxDepth--;
	            if(ps != '')
	            	maxDepth--;
	            if(ps != '')
	            	maxDepth--;
	            
	            var classSequences = [];
	            classSequences = classSequences.concat(classes);
	            
	            if(parentSelector != '') {
	                classSequences = getClassSequences(parentSelector, maxDepth, classSequences).unique();
	            }

	            for(var j=0; j<classSequences.length; j++) {
	                var classSequence = classSequences[j];
	                if(ps != '')
	                	classSequence = ps + ' ' + classSequence;
	                if(getDepth(classSequence) >= minDepth && using(classSequence,options['use'].slice(0))) {
	                    var index = -1;
	                    index = map.indexOf(classSequence);
	                    if(index == -1) {
	                        map.push(classSequence);
	                        index = map.indexOf(classSequence);
	                    }
	                    variables.push(index);
	                }
	            }
	        }
	    } else {
	    	var index = -1;
	        var classSequence = ps;
            index = map.indexOf(classSequence);
            if(index == -1) {
                map.push(classSequence);
                index = map.indexOf(classSequence);
            }
            variables.push(index);
	    }
    }

    function generateMixSequences(selector, options) {
        
        var temp 			= selector.split(',');
        selector 			= temp[0].trim();
        var ps 				= '';
        if(temp.length > 1)
        	ps = temp[1];

        if(selector.length > 0) {
	        var parentSelector  = getParentSelector(selector);
	        var node            = getNode(selector);
	        var id              = getID(node);
	        var tag             = getTag(node);
	        var classes         = getClasses(node);
	        var minDepth        = 0;//options['depth'];  
	        
	        if(!options['id']['allowed']) {
	        	id = '';
	        }
	        
	        if(!options['tag']['allowed']) {
	            tag = '';
	        }
	        
	        if(!options['classes']['allowed']) {
	            classes = [];
	        }

	        if(options['mix']['allowed'] == true) {
	            
	            var mixSequences = [];
	            if(id != '')
	                mixSequences.push(id);
	           	if(tag != '')
	                mixSequences.push(tag);
	            mixSequences = mixSequences.concat(classes);

	            var maxDepth = options['depth'];
	            maxDepth--;
	            if(ps != '')
	            	maxDepth--;
	            
	            if(parentSelector != '') {
	                mixSequences = getMixSequences(parentSelector, maxDepth, mixSequences).unique();
	            }

	            for(var j=0; j<mixSequences.length; j++) {
	                var mixSequence = mixSequences[j];
	                if(ps != '') {
	                	mixSequence = ps + ' ' + mixSequence;
	                }
	                if(getDepth(mixSequence) >= minDepth && using(mixSequence,options['use'].slice(0)) && isMixed(mixSequence)) {
	                    var index = -1;
	                    mixSequence = filterBeforeID(mixSequence);
	                    index = map.indexOf(mixSequence);
	                    if(index == -1) {
	                        map.push(mixSequence);
	                        index = map.indexOf(mixSequence);
	                    }
	                    variables.push(index);
	                }
	            }
	        }
	    } else {
	    	var index = -1;
	        var mixSequence = ps;
            index = map.indexOf(mixSequence);
            if(index == -1) {
                map.push(mixSequence);
                index = map.indexOf(mixSequence);
            }
            variables.push(index);
	    }
    }

    function getPriority(i, options){
        
        if(options['id']['priority'] == i)
            return 'id';

        if(options['tag']['priority'] == i)
            return 'tag';

        if(options['classes']['priority'] == i)
            return 'classes';

        if(options['mix']['priority'] == i)
            return 'mix';
    
    }

    function getNodes(tree,root) {

    	if(tree[root] == '') {
    		if(root == 'root')
    			return [];
    		else
    			return [root];
    	}
    	
    	var single = false;
    	while(tree[root].split(',').length == 1){
    		single = true;
    		if(tree[root] == '')
    			break;
    		root = tree[root];	
    	}
    	if(single == true)
    		return [root];
    	else {
    		var temp = tree[root].split(',');
    		var ret = [];
    		for(var i=0; i<temp.length; i++){
    			ret = ret.concat(getNodes(tree,temp[i]));
    		}
    		return ret;
    	}
    }
    function mixAndMatch(array){

    	
    	var tree = [];
    	tree['root']	= '';

    	for(var i=0; i<array.length; i++){
    		
    		var root = 'root';
    		var pointer = tree[root].split(',');
    			
    		var temp = array[i].trim().split(' ');
    		for(var j=0; j<temp.length; j++){
    			var id = getID(temp[j]);
    			if(id != ''){
    				if(pointer.indexOf(id) == -1) {
    					if(tree[root] != '')
    						tree[root] += ',';
    					tree[root] += id;
    				}

    				if(tree[id] == undefined)
    					tree[id] = '';
    				root = id;
    				pointer = tree[root].split(',');
    			}
    		}
    	}


		return getNodes(tree,'root');

    }

    function sharedStart(array){
    	//mixAndMatch(array));
/*    	var temp = [];
    	if(array.length == 1){
    		temp = array[0];
    	} else {
	    	var A= array.slice(0).sort(), 
	    	word1= A[0], word2= A[A.length-1], 
	    	L= word1.length, i= 0;
	    	while(i<L && word1.charAt(i)=== word2.charAt(i)) i++;
	    	temp = word1.substring(0, i);
	    }
	    if(temp.length > 1) {
    		temp = temp.substring(0,temp.lastIndexOf(' '));
    		if(temp.indexOf('#') >= 0) {
    			temp = temp.substring(temp.lastIndexOf('#'));
	    		if(temp.indexOf(' ') > 0)
    				temp = temp.substring(0,temp.indexOf(' '));
	    		if(temp.indexOf('.') > 0)
	    			temp = temp.substring(0,temp.indexOf('.'));
	    		return [temp];
	    	} 

    		} else {
    			return mixAndMatch(array);
    		}
    	else {
    		return mixAndMatch(array);
    	}*/
    	return '';
	}

	function minimize(selector, id){
		var selectors = selector.trim().split(' ').reverse();
		
		var ret = '';
		for(var i=0; i<selectors.length; i++){
			var node = selectors[i];
			var tid = getID(node);
			if(id.indexOf(tid) > -1)
				return ret.trim() + ',' + tid;
			ret = node + ' ' + ret;
		}
		ret = ret.trim();//.split(' ').reverse().join(' ');
		return ret;
	}

    function parse(selectors, nonSelectors, options) {

        
        var ps = [];
        var pns = [];

        if(options['selectLevel'] < 2) {
        	var all = selectors.slice(0);
        	all = all.concat(nonSelectors);

        	if(all.length > 0) {
	        	ps = mixAndMatch(all);
	        	
	        	if(ps.length > 0){
	        		for(var i=0; i<all.length; i++){
	        			all[i] = minimize(all[i],ps);
	        			if(i<selectors.length)
	        				selectors[i] = all[i];
	        			else
	        				nonSelectors[i-selectors.length] = all[i];
	        		}
	        	}
	        }
		}
		
        var order           = [];
            
        for(var j=0; j<4; j++){
            order[j] = getPriority(j, options);
        }
        ignore = options['ignore'];

        for(var i=0; i<selectors.length; i++) {

            var selector        = selectors[i].trim();//.toLowerCase();
            variables           = [];
            for(var j=0; j<4; j++){
                switch (order[j]) {
                    case "id"       : generateIDSequences(selector, options); break;
                    case "tag"      : generateTagSequences(selector, options); break;
                    case "classes"  : generateClassSequences(selector, options); break;
                    case "mix"      : generateMixSequences(selector, options); break;
                }
            }
            if(debug) console.log(variables);
            input.push(variables.unique());
        }

        for(var i=0; i<nonSelectors.length; i++) {

            var nonSelector        = nonSelectors[i].trim();//.toLowerCase();
            variables           = [];
        
            for(var j=0; j<4; j++){
                
                switch (order[j]) {
                    case "id"       : generateIDSequences(nonSelector, options); break;
                    case "tag"      : generateTagSequences(nonSelector, options); break;
                    case "classes"  : generateClassSequences(nonSelector, options); break;
                    case "mix"      : generateMixSequences(nonSelector, options); break;
                }
            }

            var uniqueAvoids = variables.unique();
            for(var j=0; j<uniqueAvoids.length; j++) {
                avoid.push('-' + uniqueAvoids[j]);
            }
        }
        if(debug) console.log(input);
        if(debug) console.log(avoid);
    }

    function process() {
        var num = input.length + output.length + avoid.length;
        var ret = 'p cnf ' + map.length + ' ' + num + '\n';
        for(var i=0; i<input.length; i++) {
            ret += input[i].join(' ') + ' 0\n';
        }
        for(var i=0; i<avoid.length; i++) {
            ret += avoid[i] + ' 0\n';
        }
        for(var i=0; i<output.length; i++) {
            var temp = output[i].split(" ");
            var add = '';
            for(var j=0; j<temp.length; j++){
                var val = parseInt(temp[j]);
                if(val >= 0) {
                    val = -1 * val;
                    add += ' ' + val;
                }
            }
            add = add.substring(1);
            ret += add + '\n';
        }
        return ret;
    }

/*---------------------------------adding drags()------------------------------------*/
(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    }
})(jQuery);
/*---------------------------------adding drags()------------------------------------*/


/*---------------------------------injecting css-------------------------------------*/
function injectStyles(rule) {
  var div = $("<div />", {
    html: '&shy;<style>' + rule + '</style>'
  }).appendTo("body");    
}
/*---------------------------------injecting css-------------------------------------*/


/*---------------------------------adding toolbox------------------------------------*/
var obj = [];

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("Text", getCSSPath($(ev.target),''));
}

function selectorExists(selector){
	var ret = 0;
	for(var i in obj) {
		if(obj[i]["selector"] == selector) {
			ret = 1;
		}
	}
	return ret;
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    if(debug) console.log(data);
    
    if(selectorExists(data) == 1) {
    	alert("Element already selected");
    } else {
	    var rgb = [];
	    var id = '';
	
		for(var i = 0; i < 3; i++) {
    		var num = Math.floor(Math.random() * 255);
    		rgb.push(num);
    		id = id + num;
		}
	
		id = "id_" + id;
	
		var html = 	'<div id="' + id + '" class="circleBase" style="background-color:rgb('+ rgb.join(',') +')" onmouseover=\'showOutline("'+id+'")\' onmouseout=\'hideOutline()\'>';
			html += '<div class="info tooltip">';
			html += data.trim().substring(data.lastIndexOf(' ') + 1).substring(0,20) + ' ...';
			html += '<span>';
			html += data.trim().split(" ").join("<br /><br />");
			html += '</span></div>';
			html += '<div class="arrow-cover">';
			html += '<div class="arrow-up" onclick="up(\''+ id +'\')"></div>';
			html += '<div class="arrow-down" onclick="down(\''+ id +'\')"></div>';
			html += '</div>';
			html += '<div id="' + id + '_negative" class="box negative" onclick="update(\'-1\',\''+ id +'\')">-</div>';
			html += '<div id="' + id + '_neutral" class="box" onclick="update(\'0\',\''+ id +'\')">0</div>';
			html += '<div id="' + id + '_positive" class="box positive selected" onclick="update(\'1\',\''+ id +'\')">+</div>';
			html += '<div id="' + id + '_positive" class="box delete" onclick="del(\''+ id +'\')">x</div>';
			html +=	'</div>';
	
	
		$(data).addClass("positiveHighlight");
		var item = {}
    
    	item["rgb"] = rgb.join(',');
		item["selector"] = data;
		item["role"] = 1;
		
   		obj[id] = item;
   		
		$("#loader").html($("#loader").html() + html);
	
		$("#loader").scrollTop(100000);
	}
}

function del(id) {
	$('#'+id).remove();
	$(obj[id]["selector"]).removeClass('positiveHighlight').removeClass('negativeHighlight').removeClass('runtimeHover').removeClass('show');
	delete obj[id];
	removeOverlay();
}

Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

function change(id, newSelector) {

	var prevSelector = obj[id]["selector"];
	$(prevSelector).removeClass('positiveHighlight').removeClass('negativeHighlight').removeClass('runtimeHover').removeClass('show');
	
	obj[id]["selector"] = newSelector;
	
	var role = obj[id]["role"];
	
	$('#' + id + ' .info').html(newSelector.trim().substring(newSelector.lastIndexOf(' ') + 1).substring(0,20) + ' ...' + '<span>' + newSelector.trim().split(" ").join("<br /><br />") + '</span>');
	if(debug) console.log(document.querySelector(newSelector));
	if(role == '-1'){
		$(newSelector).addClass("negativeHighlight");
	}
	if(role == '1'){
		$(newSelector).addClass("positiveHighlight");
	}
	hideMenu();
}

function hideMenu() {
	 $("div.custom-menu").remove();
}
function up(id) {
	
	var prevSelector = obj[id]["selector"];
	var newSelector = prevSelector.trim().split(" ");
	
	if(newSelector.length > 1) {
		newSelector.pop();
		newSelector = newSelector.join(" ");
	
		change(id, newSelector);
	} else {
		alert("No more parent element exist. You are at the document root!");
	}	
}


function customMenu(elems, id) {

    $("div.custom-menu").remove();
    
    var html = '<div style="width:100%; overflow:auto; float:left; text-align:right"><a href="javascript: hideMenu()">X</a></div>';
    html += '<ul>';
    
    for(var i = 0; i < elems.length; i++) {
		var newSelector = elems[i].trim().substring(elems[i].lastIndexOf(' ') + 1)
    	html += '<li><a href="javascript:change(\''+id+'\',\''+elems[i]+'\')">';
    	html += newSelector;
    	html += '</a></li>';
    }
    
    html += '</ul>';
    
    $("<div class='custom-menu gradient'>" + html + "</div>")
        .appendTo("body")
        .css({top: event.pageY + "px", left: event.pageX + "px"});
	return false;
}


function down(id) {

	var prevSelector = obj[id]["selector"];
	
	var children = $(prevSelector).children();
	
	if(children.length == 0) {
		alert("No more child elements");
		return false;
	}
	var elems = [];
	
	children.each(function() {
		var newSelector = getCSSPath($(this),'');
		elems.push(newSelector);
	});
	
	customMenu(elems.getUnique(), id);
	
}

function update(role, id) {
	obj[id]["role"] = role;
	$('#' + id + '_negative').removeClass('selected');
	$('#' + id + '_neutral').removeClass('selected');
	$('#' + id + '_positive').removeClass('selected');
	$(obj[id]["selector"]).removeClass('positiveHighlight').removeClass('negativeHighlight');
	if(role == '-1'){
		$('#' + id + '_negative').addClass('selected');
		$(obj[id]["selector"]).addClass('negativeHighlight');
	} else if(role == '0'){
		$('#' + id + '_neutral').addClass('selected');
	} else if(role == '1'){
		$('#' + id + '_positive').addClass('selected');
		$(obj[id]["selector"]).addClass('positiveHighlight');
	}
}
function getCSSPath(element, prev){
	
	var id = element.attr('id');
	if(id == undefined || id == '')
		id = '';
	else
		id = '#' + id;
		
	var className = element.attr('class');
	if(className == undefined || className == '')
		className = '';
	else
		className = '.' + className.split(" ").join(".");
	className = className.replace(".runtimeHover","");
	className = className.replace(".positiveHighlight","");
	className = className.replace(".negativeHighlight","");
	className = className.replace(".show","");
		
	var tagName = element.prop('tagName');	
	if(tagName == undefined)
		return prev;
	
	if(prev != '')
		prev = tagName+id+className+' ' + prev;
	else
		prev = tagName+id+className;
	
	if(element.parent().length > 0) {
		return getCSSPath(element.parent(),prev);
	} else {
		return prev;
	}
}

function showOutline(id) {
	$(obj[id]["selector"]).each(function() {
		overlay($(this)[0]);
	});
}

function hideOutline() {
	removeOverlay();
}

var target = null;
$('*').attr("draggable","true");
$('*').attr("ondragstart","drag(event)");

$('*').each(function(){
	$(this).hover(
        function() { 
        	$('*').removeClass("runtimeHover"); 
        	
        	$(this).addClass("runtimeHover"); 
        	target = $(this);
        
        },
        function() { 
        	$(this).removeClass("runtimeHover");
        	
			
			if($(this).parent().length > 0) {
				$(this).parent().addClass("runtimeHover"); 
				target = $(this).parent();
			} else {
				target = null;
			}
		}
    );
    
});

function overlay(element) {
	var rect = element.getBoundingClientRect();
	var elem = document.createElement("div");
	document.body.appendChild(elem);
	
	var top = (window.pageYOffset || document.scrollTop)  - (document.clientTop || 0) + rect.top;
	var left = rect.left;
	
	elem.className = 'overlay';
	elem.style.left = left + 'px';
	elem.style.top = top + 'px';
	elem.style.height = rect.height + 'px';
	elem.style.width = rect.width + 'px';
}

function addOverlay(index){

	var ret = selector[index];
	
	var elem = $(ret.positive).not(ret.negative);
	
	var counter = 0;
	elem.each(function(){
		var e = $(this)[0];
		if(debug) console.log(ret.reject.indexOf(counter));
		if(ret.reject.indexOf(counter) == -1) {
			overlay(e);
		}
		counter ++;
	});
}

function removeOverlay() {
	$('.overlay').remove();
}


injectStyles('.runtimeHover{outline:dashed 3px blue; outline-width: 3px}');

injectStyles('.positiveHighlight{outline:dashed 2px #4DDB94}');

injectStyles('.negativeHighlight{outline:dashed 2px #FF5C5C}');

injectStyles('.show{outline-width: 3px}');

injectStyles('#toolbox{position:fixed; top:20px; left:20px; min-height:100px; width:270px; z-index:999999; border:solid 3px #AAAAAA; background-color:#FFFFFF; opacity:0.9; overflow:auto}');

injectStyles('#handle{background-color: #CCCCCC; height:30px; width:100%; float:left}');

injectStyles('.circleBase { border-radius: 10px;overflow:auto; padding:20px; float:left; margin:5px;}');

injectStyles('#toolbox>.container{margin:0px auto; width:95%; overflow:auto; height: 380px}');

injectStyles('.selected{outline: dotted 3px blue}');

injectStyles('.box{float: left; font-weight:bolder; overflow: visible; text-align: center; height: 30px; line-height: 30px; font-size:20px; width:30px; background-color: white; margin: 5px; cursor:pointer}');

injectStyles('.positive{background-color: #4DDB94}');

injectStyles('.negative{background-color: #FF5C5C}');

injectStyles('.delete{background-color: #666666; color:#ffffff}');

injectStyles('.arrow-cover{float:left; overflow: visible; height: 30px; width: 20px; margin:5px; cursor: pointer}');

injectStyles('.arrow-up {width: 0; height: 0; border-left: 10px solid transparent;border-right: 10px solid transparent;border-bottom: 10px solid black; margin-top: 2px}');

injectStyles('.arrow-down {width: 0; height: 0; border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid black; margin-top: 5px;}');

injectStyles('.clear{float: left; width:100%; height: 5px; overflow:auto}');

injectStyles('.info{width: 170px; background-color: #FFFFFF; color: #333333; margin:5px; overflow: auto; padding:5px}');

injectStyles('.custom-menu { z-index:999999; width: 150px; max-height: 300px; overflow:auto; position: absolute; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; padding: 5px;}');

injectStyles('.gradient{background: #cfe7fa; background: -moz-linear-gradient(top,  #cfe7fa 0%, #6393c1 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#cfe7fa), color-stop(100%,#6393c1)); background: -webkit-linear-gradient(top,  #cfe7fa 0%,#6393c1 100%);  background: -o-linear-gradient(top,  #cfe7fa 0%,#6393c1 100%); background: -ms-linear-gradient(top,  #cfe7fa 0%,#6393c1 100%); background: linear-gradient(to bottom,  #cfe7fa 0%,#6393c1 100%);}');

injectStyles('.custom-menu ul{list-style-type: none; float: left; width: 110px}');

injectStyles('.custom-menu ul li{border-bottom: solid 1px white; margin-left: -30px; padding: 3px}');

injectStyles('.custom-menu ul li:hover{background-color: #AAAAAA;}');

injectStyles('.tooltip {outline:none; } .tooltip strong {line-height:30px;} .tooltip:hover {text-decoration:none;} .tooltip span {z-index:9999999;display:none; padding:14px 20px; margin-top:-30px; margin-left:28px; width:240px; line-height:16px;} .tooltip:hover span{display:inline; position:fixed; color:#111;border:1px solid #DCA; background:#fffAF0;} .callout {z-index:20;position:absolute;top:30px;border:0;left:-12px;} .tooltip span { border-radius:4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;-moz-box-shadow: 5px 5px 8px #CCC;-webkit-box-shadow: 5px 5px 8px #CCC;box-shadow: 5px 5px 8px #CCC;}');

injectStyles('#selectorBox{position:fixed; top:20px; right:20px; min-height:100px; width:270px; z-index:99999; border:solid 3px #AAAAAA; background-color:#FFFFFF; opacity:0.9; overflow:auto}');

injectStyles('#selectHandle{background-color: #CCCCCC; height:30px; width:100%; float:left}');

injectStyles('#selectorBox>.container{margin:0px auto; width:95%; overflow:auto; height:350px}');

injectStyles('.overlay{position: absolute; background-color: #58ACFA; opacity: 0.8; border: solid 1px #08298A; z-index: 123456}');

injectStyles('#cssSelector{border-top:solid 3px #AAA; width:100%; overflow:auto}');

injectStyles('.transparentOutline{outline:solid 5px green}');




var html = '<div id="toolbox"><div id="handle"><b>Step 1: </b>Drag and Drop DOM elements</div><div id="loader" class="container" ondrop="drop(event)" ondragover="allowDrop(event)"></div></div>';
$("body").prepend(html);


var opts = {handle: "#handle"};
$("#toolbox").drags(opts);

var selectors       			= [];
var nonSelectors    			= [];
var options 					= [];

options['id']                   = [];
options['tag']                  = [];
options['classes']              = [];
options['mix']                  = [];


options['id']['allowed']        = true;
options['tag']['allowed']       = true;
options['classes']['allowed']   = true;
options['mix']['allowed']       = true;
options['id']['priority']       = 0;
options['tag']['priority']      = 2;
options['classes']['priority']  = 1;
options['mix']['priority']      = 3;
options['depth']                = 4;
options['maxTime']			    = 10;
options['start']				= 0;

options['ignore']               = [];
options['ignore'].push('html');
options['ignore'].push('body');
options['ignore'].push('#container');
options['ignore'].push('.js');

options['use']                  = [];

options['selectLevel']			= 0;

var filteredCombinations 		= [];

var numElems					= [];


var html = '<div id="selectorBox"><div id="selectHandle"><b>Step 2: </b> Configure Options</div><div id="loader2" class="container""></div><input type="button" value="Generate Selector" onclick="generateSelector()" /><div id="cssSelector"></div></div>';
$("body").prepend(html);


var opts = {handle: "#selectHandle"};
$("#selectorBox").drags(opts);

function getAtPriority(i, options){
        
    if(options['id']['priority'] == i)
        return 'id';

    if(options['tag']['priority'] == i)
        return 'tag';

    if(options['classes']['priority'] == i)
        return 'classes';

    if(options['mix']['priority'] == i)
        return 'mix';

}


injectStyles('.label{float:left; padding: 2%; width: 96%; background-color: #AAAAAA; margin-bottom:2px; margin-top: 2px}');

function createDiv(val, allowed, j){
	var temp = '';

	temp += '<div class="label">';

	temp += '<input type="checkbox"  id="'+val+'_opt" onchange="flip(\''+val+'\')" ';
	if(allowed)
		temp += 'checked=checked';
	temp += ' />';

	temp += ' <label for="'+val+'_opt">' + val + '</label>';

	temp += '<div style="float:right; width:50px;min-height:5px; border:solid 1px #AAAAAA">';
	if(j < 3){
		temp += ' <a href="javascript:void(0)" onclick="orderDown(\''+val+'\','+j+')">down</a>';
	}
	temp += '</div>';

	temp += '<div style="float:right; width:50px;min-height:5px; border:solid 1px #AAAAAA">';
	if(j > 0){
		temp += ' <a href="javascript:void(0)" onclick="orderUp(\''+val+'\','+j+')">up</a>';
	}
	temp += '</div>';

	temp += '</div>';

	return temp;
}

function renderOptions(options, target) {
	
	var html		= '';
	
	var order           = [];
            
    for(var j=0; j<4; j++){
        order[j] = getAtPriority(j, options);
    }
        
    for(var j=0; j<4; j++){
        
        switch (order[j]) {
            case "id"       : html += createDiv('id',options['id']['allowed'], j); break;
            case "tag"      : html += createDiv('tag',options['tag']['allowed'], j); break;
            case "classes"  : html += createDiv('classes',options['classes']['allowed'], j); break;
            case "mix"      : html += createDiv('mix',options['mix']['allowed'], j); break;
        }
    }

    html += '<br /><br />Depth: ';
    html += '<select id="depth" onchange="changeDepth(this.value)">';
   	for(j=1; j<=100; j++) {
   		html += '<option value="'+j+'"';
   		if(j == options['depth'])
   			html += " selected"
   		html += '>' + j + '</option>';
   	}
    html += '</select>';
    $('#' + target).html(html);

    html += ' Max time: ';
    html += '<select id="maxTime" onchange="changeMaxTime(this.value)">';
   	for(j=1; j<=1000; j++) {
   		html += '<option value="'+j+'"';
   		if(j == options['maxTime'])
   			html += " selected"
   		html += '>' + j + '</option>';
   	}
    html += '</select>';
    html += '<br/><select id="selectLevel" onchange="changeSelectLevel(this.value)">';
    html += '<option value="0"';
    if(options['selectLevel'] == 0)
    	html += ' selected';
    html += '>Select only selected elements</option>';
    html += '<option value="1"';
    if(options['selectLevel'] == 1)
    	html += ' selected';
    html += '>Select similar elements locally</option>';
    html += '<option value="2"';
    if(options['selectLevel'] == 2)
    	html += ' selected';
    html += '>Select similar elements globally</option>';
    html += '</select>';
    html += '<br /><br/>Must use (one per line):<br />';
    html += '<textarea id="use" style="height:50px; width:97%" onkeyup="updateUse()">';
    for(var j=0; j<options['use'].length; j++){
    	html += options['use'][j];
    	if(j < options['use'].length-1)
    		html += "\n";
    }
    html += '</textarea>';
    html += '<br /><br/>Ignore (one per line):<br />';
    html += '<textarea id="ignore" style="height:50px; width:97%" onkeyup="updateIgnore()">';
    for(var j=0; j<options['ignore'].length; j++){
    	html += options['ignore'][j];
    	if(j < options['ignore'].length-1)
    		html += "\n";
    }
    html += '</textarea>';
    $('#' + target).html(html);
}
renderOptions(options,'loader2');

function flip(val) {
	if(options[val]['allowed'] == true) {
		options[val]['allowed'] = false;
	} else {
		options[val]['allowed'] = true;
	}
	if(debug) console.log(options);
}

function orderUp(val, j){

	var temp = getAtPriority(j-1, options);
	options[val]['priority'] = j-1;
	options[temp]['priority'] = j;
	renderOptions(options,'loader2');

}

function orderDown(val, j) {

	var temp = getAtPriority(j+1, options);
	options[val]['priority'] = j+1;
	options[temp]['priority'] = j;
	renderOptions(options,'loader2');

}

function changeDepth(value) {
	options['depth'] = parseInt(value);
}

function changeMaxTime(value) {
	options['maxTime'] = parseInt(value);
}
function changeSelectLevel(value) {
	options['selectLevel'] = parseInt(value);
}

function updateUse() {
	var use = document.getElementById("use").value.split("\n");
	var update = [];
	for(var i=0; i<use.length; i++) {
		if(use[i].trim()){
			update.push(use[i].trim());
		}	
	}
	options['use'] = update.slice(0);
}

function updateIgnore() {
	var ignore = document.getElementById("ignore").value.split("\n");
	var update = [];
	for(var i=0; i<ignore.length; i++) {
		if(ignore[i].trim()){
			update.push(ignore[i].trim());
		}	
	}
	options['ignore'] = update.slice(0);
}

function generateSelector(){

	var html = '<div style="float:left; width:100%; overflow:auto; text-align:center"><img src="http://enviroshutters.co/wp-content/themes/FSC/images/loading_bar.gif" height="100" /></div>';
	$('#cssSelector').html(html);
	selectors 		= [];
	nonSelectors	= [];

	map         	= [];
    map[0]          	= 0;

    input       	= [];
    output      	= [];
    avoid       	= [];
    prevCnf     	= '';
    variables   	= [];
    ignore      	= [];
    combinations	= [];

	for(var i in obj) {
		if(obj[i]['role'] == 1)
			selectors.push(obj[i]['selector'].trim());

		else if (obj[i]['role'] == -1)
			nonSelectors.push(obj[i]['selector'].trim())
	}
	
	parse(selectors, nonSelectors, options);

	if(debug) console.log(map);
    if(debug) console.log(input);
    if(debug) console.log(avoid);
    
    options['start'] = Date.now() / 1000;

   	setTimeout('solve()',20);
}

function solve(){
    var cnf = process();
    
    if(debug) console.log(cnf);
    var a = htmlstuff(cnf);
    if(debug) console.log(a);
    if(a != '' && a != undefined) {
        output.push(a);

        if((Date.now()/1000 - options['start']) < options['maxTime'])
            solve();
        else{
        	postProcess();
        }
    } else {
        postProcess();
    }

}


function getPositives(answer){
    var ret = [];
    
    var all = answer.trim().split(' ');
    for(var i=0; i<all.length; i++){
        var val = parseInt(all[i]);
        if(val > 0){
            ret.push(val);
        }
    }

    return ret;
}

function mapBack(positives){
    var ret = [];

    for(var i=0; i<positives.length; i++){
        ret.push(map[positives[i]]);
    }

    return ret;
}


function getUniversality(selector){
	if(!options['tag']['allowed'])
		return 2;

	var ret = 0;
	var temp = selector.trim().split(' ');
	for(var i=0; i<temp.length; i++){
		var node = temp[i];
		var tag = getTag(node);
		if(tag != '')
			ret++;
	}
	return ret/temp.length;
}


function countDescendants(selector) {

	if(numElems[selector] === undefined){
		numElems[selector] = $(selector).find("*").length;
	}
	return numElems[selector];
}
function getAbstractness(selector){

	var ret = 0;
	var total = countDescendants("html");

	var temp = selector.trim().split(' ');
	var n = temp.length;
	
	var total = n * total;

	var prev = "";
	for(var i=0; i<temp.length; i++){
		prev += temp[i];
		ret += countDescendants(prev);
		prev += ' ';
	}

	return (ret/total);
}

function postProcess() {
    
    for(var i=0; i<selectors.length; i++){
        var temp = selectors[i].split(",");
        if(temp.length > 1)
        	selectors[i] = temp[1] + ' ' + temp[0];
        else
        	selectors[i] = temp[0];
    }
        
    for(var i=0; i<output.length; i++) {
        var answer          = output[i];
        var combination     = mapBack(getPositives(answer));

        if(options['selectLevel'] < 1) {
        	if($(combination.join(',')).length == $(selectors.join(',')).length) {
        		combinations.push(combination);	
        	}
        }else{
	        combinations.push(combination);
    	}
    }
    if(combinations.length == 0) {
    	alert("No matching selector found. Please change the search crieteria or provide more examples.")
    	var html = '';
    	$('#cssSelector').html(html);
    	if(debug) console.log("here");
    	return 0;
    }
    if(debug) console.log(combinations);

    var orderedCombinations = [];
    var avg	= [];
    var num = [];
    var maxLen = 1;
 	
	for(var i=0; i<combinations.length; i++){
    	var combination = combinations[i];
    	var len = combination.length;

    	
    	var universality = 0;
    	var abstractness = 0;

    	var universalityCheck = 0;
    	
    	for(var j=0; j<combination.length; j++) {
    		var selector = combination[j];

    		universality += getUniversality(selector);
    		if(universality > 0 && universality <= 1)
    			universalityCheck = 1;

    		abstractness += getAbstractness(selector);
    	}

    	universality = universality/len;
    	abstractness = abstractness/len;

    	
    	var score = abstractness;

    	if(universalityCheck)
    		score = Math.min(universality,abstractness);
    	else
    		score = score / 2;

    	score = 100 - len + score;

    	if(avg[len] == undefined) {
    		avg[len] = 0;
    		num[len] = 0;
    	}

    	if(maxLen < len)
    		maxLen = len;

    	avg[len] += score;
    	num[len]++;

    	orderedCombinations[orderedCombinations.length] = {"score" : score, "combination":combination};

    }

    for(var i=1; i<=maxLen; i++) {
    	avg[i] = avg[i] / num[i];
    }
    
    if(debug) console.log(orderedCombinations);

    filteredCombinations = [];

    for(var i=0; i<orderedCombinations.length; i++){

    	var temp = orderedCombinations[i];
    	if(temp.score >= avg[temp.combination.length] || orderedCombinations.length < 10)
    		filteredCombinations[filteredCombinations.length] = temp;
    }

    function compare(a,b) {
	  	if (a.score < b.score)
	     	return 1;
	  	if (a.score > b.score)
	    	return -1;
	  	return 0;
	}
	filteredCombinations.sort(compare);


    if(debug) console.log(filteredCombinations);

    createSelector(0);
    
}

function showResult(selector){

	$(selector).addClass("transparentOutline");
}

function hideResult(){
	$("*").removeClass("transparentOutline");
}

function createSelector(i){
	
	var html = '';

	if(debug) console.log(filteredCombinations);

	html += '<b>Total CSS Selectors: ' + filteredCombinations.length + '</b><br />';
    html += '<p onmouseover="showResult(\''+filteredCombinations[i].combination.join(',')+'\')" onmouseout="hideResult()">';
    html += filteredCombinations[i].combination.join('<br />');
    html += '</p><br /><br />';
    var prev = i-1;
    var next = i+1;

    if(prev >= 0)
    	html += '<a style="float:left" href="javascript:void(0)" onclick="createSelector('+prev+')">Prev</a>';
    
    if(next < filteredCombinations.length)
    	html += '<a style="float:right" href="javascript:void(0)" onclick="createSelector('+next+')">Next</a>';

    $('#cssSelector').html(html);


}
/*---------------------------------adding toolbox------------------------------------*/
