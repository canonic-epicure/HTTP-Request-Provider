Class('HTTP.Request.Provider.NodeJS', {
    
    isa        : 'HTTP.Request.Provider',
    
    
    continued : {
        
        methods : {
            
            request : function (url) {
                var QueryString = require('querystring')
                var CONT        = this.CONT
                
                var parsedURL       = require('url').parse(url)
                parsedURL.pathname  = parsedURL.pathname || '/'
                
                // preparing query part of the URL
                var query       = this.query
                var queryStr    = parsedURL.query || ''
                
                if (typeof query == 'string') queryStr += query
                if (typeof query == 'object') queryStr += (queryStr ? '&' : '') + QueryString.stringify(query)
                
                var requestPath = parsedURL.pathname + (queryStr ? '?' + queryStr : '')
                
                
                var method      = this.method
                var data        = this.data
                var headers     = this.headers || {}
                
                if (data && typeof data == 'object') data = QueryString.stringify(data)
                
                if (!headers.host) {
                    headers.host = parsedURL.hostname
                    
                    if (parsedURL.port) headers.host += ':' + parsedURL.port
                }
                
                if (data) headers[ 'Content-Length' ] = data.length
                
                
                // making the actual request 
                
                var client      = require('http').createClient(parsedURL.port || 80, parsedURL.hostname)
                var request     = client.request(method, requestPath, headers)

                if (data) request.write(data, 'utf8')
                

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
                                status          : status,
                                text            : buffer
                            })
                    })
                })
                
                request.end()
            }
        }
    }

})
