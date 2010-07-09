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
        
        var req = new HTTP.Request.Provider.NodeJS({
            
            headers : {
                'Host'              : 'yahoo.com',
                'User-Agent'        : 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.2.6) Gecko/20100628 Ubuntu/10.04 (lucid) Firefox/3.6.6',
                'Accept'            : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language'   : 'en-us,en;q=0.5',
                'Accept-Encoding'   : 'gzip,deflate',
                'Accept-Charset'    : 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
                'Keep-Alive'        : '115',
                'Connection'        : 'keep-alive',
                'Pragma'            : 'no-cache',
                'Cache-Control'     : 'no-cache'
            }
        })
        
        req.request('127.0.0.1:5984').then(function (res) {
            
            t.ok(res.status == 200, 'Request was successfull')
            t.like(res.text, 'http://extjs.com/license/mit.txt', 'And seems it has correct response text')

            t.endAsync(async0)
            
            t.done()
            
        }).now()
        
        
    })
})    