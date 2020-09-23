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
        var company=remotive.jobs[i].company_name

        console.log(title)
        console.log(tags)
        console.log(url)
        console.log(company)

        // creates job title header for cards
        var titleEl=$("<h2>")
        titleEl.text(title)
        //change#mainbody later
        $("#mainbody").append(titleEl)

        //creates url element
        var urlEl=$("<a>")
        urlEl.attr("href", url)
        urlEl.text(url)
           //change#mainbody later
        $("#mainbody").append(urlEl)


        // creates tags buttons
        if(tags.length!=0){
            for(var x=0; x<tags.length; x++){
            tagsbtn=$("<button>")
            tagsbtn.text(tags[x])
            tagsbtn.attr("data-type",tags[x])
               //change#mainbody later
            $("#mainbody").append(tagsbtn)
        }}

       } 
   })

})