$("#search").on("click", function(){
   var query=  "https://cors-anywhere.herokuapp.com/https://remotive.io/api/remote-jobs?category=software-dev"
   $.ajax({
    url: query,
    method:"GET"
   }) .then(function(remotive){
       
       for(var i=0; i < 8; i++ ){
        var title= remotive.jobs[i].title
        var tags=remotive.jobs[i].tags
        var url=remotive.jobs[i].url
        console.log(title)
        console.log(tags)
        console.log(url)
       } 
   })

})