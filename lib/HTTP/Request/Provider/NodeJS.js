Class('HTTP.Request.Provider.NodeJS', {
    
    isa        : 'HTTP.Request.Provider',
    
    
    
    continued : {
        
        methods : {
            
            request : function (url) {
                url = url || this.url
                
                var http        = require('http')
                var client      = http.createClient(80, 'www.google.com');
                var request     = client.request('GET', '/', {'host': 'www.google.com'});
                var CONT        = this.CONT
                var headers     = this.headers
                
                
                request.addListener('response', function (response) {
                    var status          = response.statusCode
                    var buffer          = ''
                    
                    response.setEncoding('utf8')
                    
                    response.addListener('data', function (chunk) {
                        buffer += chunk || ''
                    })
                    
                    response.addListener('end', function () {
                        if (status >= 200 && status < 300)
                            CONT.CONTINUE({
                                status          : status,
                                text            : buffer
                            })
                        else 
                            CONT.THROW({
                                status          : status
                            })
                    })
                })
                
                request.end()
            }
        }
    }

})
