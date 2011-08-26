var Harness
var isNode      = typeof process != 'undefined' && process.pid

if (isNode) {
    require('Task/Test/Run/NodeJSBundle')
    
    Harness = Test.Run.Harness.NodeJS
} else 
    Harness = Test.Run.Harness.Browser.ExtJS
        
    
Harness.configure({
	title 	: 'HTTP.Request.Provider Test Suite',
    
    verbosity : 1,
    
	preload : [
        '../http-request-provider-test.js'
    ]
})


Harness.start(
	'010_sanity.t.js',
    '020_xhr.t.js',
    '030_nodejs.t.js'
)
