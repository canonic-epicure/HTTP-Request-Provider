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
            if (this.url) return this.request()
        },
        
        
        getQuery : function () {
            var me      = this
            var query   = this.query
            
            if (typeof query == 'object') {
                var queryStr = ''
                
                Joose.O.each(parameters, function (value, name) {
                    if (queryStr) queryStr += '&'
                    
                    queryStr += name + '=' + me.encodeURIComponent(value)
                })
            }
            
            return queryStr
        },
        
        
        encodeURIComponent : function (str) {
            throw "Abstract method `encodeURIComponent` of the 'HTTP.Request.Provider' reached"
        }
    },
    
    
    continued : {
        
        methods : {
            
            request : function (url) {
                throw "Abstract method `request` of the 'HTTP.Request.Provider' reached"
            }
        }
    }

})