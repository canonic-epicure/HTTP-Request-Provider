COMPONENTS = {
	// a comment
	
	"Core" : [
		"HTTP.Request.Provider"
	],
	
    
    "Web" : [
    	"+Core",
        "HTTP.Request.Provider.XHR"
    ],
    
    
    "NodeJS" : [
        "+Core",
        "HTTP.Request.Provider.NodeJS"
    ],
    
    
    "Auto" : [
        "+Core",
        "HTTP.Request.Provider.XHR",
        "HTTP.Request.Provider.NodeJS"
    ]
}