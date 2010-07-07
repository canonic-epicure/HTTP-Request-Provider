Class('HTTP.Request.Provider.XHR', {
    
    isa        : 'HTTP.Request.Provider',
    
    
    has : {
    },
    
    
    continued : {
        
        methods : {
            
            request : function (url) {
                throw "Abstract method `request` of the 'HTTP.Request.Provider' reached"
            }
        }
    }

})
