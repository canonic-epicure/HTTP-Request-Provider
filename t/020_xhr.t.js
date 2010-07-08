StartTest(function(t) {
    
    if (Joose.is_NodeJS) {
        t.skip("Tests for browser platform")
        
        t.done()
        
        return
    }
    
    var async0 = t.beginAsync()
    
    use([ 'HTTP.Request.Provider.XHR' ], function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('GET')
        
        var req = new HTTP.Request.Provider.XHR()
        
        var url = t.harness.absolutizeURL('/jsan/Scope/Provider/static/stub.html')
        
        req.request(url).then(function (res) {
            
            t.ok(res.status == 200, 'Request was successfull')
            t.like(res.text, '<html>', 'And seems it has correct response text')

            t.endAsync(async0)
            
            t.done()
            
        }).now()
        
        
    })
})    