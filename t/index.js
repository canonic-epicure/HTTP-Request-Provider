var Harness
var isNode      = typeof process != 'undefined' && process.pid

if (isNode) {
    require('Task/Test/Run/NodeJSBundle')
    
    Harness = Test.Run.Harness.NodeJS
} else 
    Harness = Test.Run.Harness.Browser.ExtJS
        
    
var INC = (isNode ? require.paths : []).concat('../lib', '/jsan')


Harness.configure({
	title 	: 'HTTP.Request.Provider Test Suite',
    
    verbosity : 1,
    
	preload : Joose.is_NodeJS ? [
        "jsan:Task.Joose.Core",
        "jsan:Task.JooseX.Namespace.Depended.NodeJS",
        {
            text : "JooseX.Namespace.Depended.Manager.my.INC = " + JSON.stringify(INC)
        },
        "Task.HTTP.Request.Provider.All"
        
    ] : [
        "jsan:Task.Joose.Core",
        "jsan:JooseX.SimpleRequest",
        "jsan:Task.JooseX.Namespace.Depended.Web",
        {
            text : "JooseX.Namespace.Depended.Manager.my.INC = " + Ext.encode(Harness.absolutizeINC(INC))
        },
        "Task.HTTP.Request.Provider.All"
    ]
})


Harness.start(
	'010_sanity.t.js',
    '020_xhr.t.js',
    '030_nodejs.t.js'
)
