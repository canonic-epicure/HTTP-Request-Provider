Class('HTTP.Request.Provider', {
    
    trait        : 'JooseX.CPS',
    
    
    has : {
        method          : 'GET',
        
        user            : null,
        password        : null,
        
        url             : null,
        
        query           : null,
        data            : null,
        
        headers         : { is : 'rw' }
    },
    
    
    methods : {
        
        initialize : function () {
            var url     = this.url
            
            if (url) return this.request(url)
        }
    },
    
    
    continued : {
        
        methods : {
            
            request : function (url) {
                throw "Abstract method `request` of the 'HTTP.Request.Provider' reached"
            }
        }
    },
    
    
    my : {
        
        methods : {
        
            getRequest : function (config) {
                
                var providerClass = Joose.is_NodeJS ? HTTP.Request.Provider.NodeJS : HTTP.Request.Provider.XHR
                
                return new providerClass(config)
            }
        }
    }
})