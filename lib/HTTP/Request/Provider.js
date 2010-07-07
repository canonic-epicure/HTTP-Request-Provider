Class('HTTP.Request.Provider', {
    
    trait        : 'JooseX.CPS',
    
    
    has : {
        method          : 'GET',
        
        user            : null,
        password        : null,
        
        url             : null,
        
        parameters      : null,
        postbody        : null,
        
        headers         : { is : 'rw' }
    },
    
    
    methods : {
        
        initialize : function () {
            if (this.url) return this.request()
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