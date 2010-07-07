Class('HTTP.Request.Provider', {
    
    trait        : 'JooseX.CPS',
    
    
    has : {
        method          : 'GET',
        
        url             : null,
        
        parameters      : null,
        postbody        : null,
        
        headers         : { is : 'rw' }
    },
    
    
    continued : {
        
        methods : {
            
            request : function (url) {
                throw "Abstract method `request` of the 'HTTP.Request.Provider' reached"
            }
        }
    }

})