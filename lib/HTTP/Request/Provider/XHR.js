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
                url = url || this.url
                
                var me          = this
                var xhr         = this.getTransport()
                var CONT        = this.CONT
                var headers     = this.headers
                var method      = this.method
                
                if (method == 'GET' && this.query) url += '?' + this.urlEncode(this.query)
                
                
                xhr.open(method, url, true, this.user, this.password)
                
                if (headers) Joose.O.eachOwn(headers, function (value, name) {
                    xhr.setRequestHeader(name, value)
                })
                
                
                var data = this.data
                
                if (method == 'POST' && typeof data == 'object') {
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                    
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
                
                xhr.send(method == 'POST' && data || null)
            }
        }
    }

})
