Class('HTTP.Request.Provider.NodeJS', {
    
    isa        : 'HTTP.Request.Provider',
    
    
    continued : {
        
        methods : {
            
            request : function (url) {
                url = url || this.url
                
                var QueryString = require('querystring')
                
                var parsedURL   = require('url').parse(url)
                
                // preparing query part of the URL
                var query       = this.query
                var queryStr    = parsedURL.query || ''
                
                if (typeof query == 'string') queryStr += query
                if (typeof query == 'object') queryStr += QueryString.stringify(query)
                
                var requestPath = parsedURL.path + (queryStr ? '?' + queryStr : '')
                
                
                // adding `application/x-www-form-urlencoded` content-type to conform with XHR provider? 
                var method      = this.method
                var data        = this.data
                var headers     = this.headers || {}
                
                if (method == 'POST' && typeof data == 'object') {
                    headers[ 'Content-type' ] = "application/x-www-form-urlencoded"
                    
                    data = QueryString.stringify(data)
                }
                
                // making the actual request 
                
                var client      = require('http').createClient(parsedURL.port || 80, parsedURL.hostname)
                var request     = client.request(method, requestPath, headers)

                if (method == 'POST' && data) request.write(data, 'utf8')
                
                
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
