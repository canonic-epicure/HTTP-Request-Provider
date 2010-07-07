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
        }
    },
    
    
    continued : {
        
        methods : {
            
            request : function (url) {
                url = url || this.url
                
                var xhr         = this.getTransport()
                var CONT        = this.CONT
                var headers     = this.headers
                
                if (headers) Joose.O.eachOwn(headers, function (value, name) {
                    xhr.setRequestHeader(name, value)
                })
                
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4)
                        if (xhr.status >= 200 && xhr.status < 300) 
                            CONT.CONTINUE({
                                status          : xhr.status,
                                text            : xhr.responseText
                            })
                        else 
                            CONT.THROW({
                                status          : xhr.status
                            })
                }
                
                var method      = this.method
                
                xhr.open(method, url, true, this.user, this.password)
                
                xhr.send(method == 'POST' && this.postbody || null)
            }
        }
    }

})
