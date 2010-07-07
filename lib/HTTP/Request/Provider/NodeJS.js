Class('HTTP.Request.Provider.NodeJS', {
    
    isa        : 'HTTP.Request.Provider',
    
    
    
    continued : {
        
        methods : {
            
            request : function (url) {
                url = url || this.url
                
                var parsedURL   = require('url').parse(url)
                
                var client      = require('http').createClient(parsedURL.port || 80, parsedURL.hostname)
                var request     = client.request(this.method, parsedURL.path, this.headers)

                var CONT        = this.CONT
                
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
