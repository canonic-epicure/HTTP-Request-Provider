StartTest(function(t) {
    
    var async0 = t.beginAsync()
    
    use([ 'HTTP.Request.Provider', 'HTTP.Request.Provider.XHR', 'HTTP.Request.Provider.NodeJS' ], function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(HTTP.Request.Provider, "HTTP.Request.Provider is here")
        t.ok(HTTP.Request.Provider.XHR, "HTTP.Request.Provider.XHR is here")
        t.ok(HTTP.Request.Provider.NodeJS, "HTTP.Request.Provider.NodeJS is here")
        
        t.endAsync(async0)
        
        t.done()
    })
})    