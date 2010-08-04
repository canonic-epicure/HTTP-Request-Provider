Class('HTTP.Request.Provider.XHR', {
    
    isa        : 'HTTP.Request.Provider',
    
    
    has     : {
        transport : {
            is          : 'rw',
            builder     : 'this.buildTransport'
        }
    },
    
    
    methods : {
        
        buildTransport  : function () {
            if (window.XMLHttpRequest)
                return new XMLHttpRequest()
            else
                return new ActiveXObject("Microsoft.XMLHTTP")
        },
        
        
        urlEncode : function (object) {
            if (typeof object == 'string') return object
            
            if (typeof object == 'object') {
                var queryStr = ''
                
                Joose.O.each(object, function (value, name) {
                    if (queryStr) queryStr += '&'
                    
                    queryStr += encodeURIComponent(name) + '=' + encodeURIComponent(value + '')
                })
                
                return queryStr
            }
            
            return ''
        }
    },
    
    
    continued : {
        
        methods : {
            
            request : function (url) {
                var me          = this
                var CONT        = this.CONT
                var method      = this.method
                
                
                var query       = this.query
                
                if (query) {
                    var encodedQuery = this.urlEncode(query)
                    
                    if (url.match(/\?/))
                        url += '&' + encodedQuery
                    else
                        url += '?' + encodedQuery 
                }
                
                
                var xhr         = this.getTransport()
                
                xhr.open(method, url, true, this.user, this.password)
                
                
                
                var headers     = this.headers
                
                if (headers) Joose.O.eachOwn(headers, function (value, name) {
                    xhr.setRequestHeader(name, value)
                })
                
                
                var data = this.data
                
                if (typeof data == 'object') {
//                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                    
                    data = this.urlEncode(data) 
                }
                
                                
                xhr.onreadystatechange = function () {
                    var status = xhr.status
                    
                    if (xhr.readyState == 4)
                        if (status >= 200 && status < 300) 
                            CONT.CONTINUE({
                                status          : status,
                                text            : xhr.responseText,
                                request         : me
                            })
                        else 
                            CONT.THROW({
                                status          : status,
                                request         : me
                            })
                }
                
                xhr.send(data || null)
            }
        }
    }

})
