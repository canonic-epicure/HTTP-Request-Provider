StartTest(function(t) {
    
	t.plan(1)
    
    var async0 = t.beginAsync()
    
    use('HTTP.Request.Provider', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(HTTP.Request.Provider, "HTTP.Request.Provider is here")
        
        t.endAsync(async0)
    })
})    