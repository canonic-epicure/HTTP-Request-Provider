StartTest(function(t) {
    
    if (!Joose.is_NodeJS) {
        t.skip("Tests for NodeJS platform")
        
        t.done()
        
        return
    }
    
    var async0 = t.beginAsync()
    
    use([ 'HTTP.Request.Provider.NodeJS' ], function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('GET')
        
        var req = new HTTP.Request.Provider.NodeJS()
        
        req.request('http://ajax.googleapis.com/ajax/libs/ext-core/3.1.0/ext-core.js').then(function (res) {
            
            t.ok(res.status == 200, 'Request was successfull')
            t.like(res.text, 'http://extjs.com/license/mit.txt', 'And seems it has correct response text')

            t.endAsync(async0)
            
            t.done()
            
        }).now()
        
        
    })
})    