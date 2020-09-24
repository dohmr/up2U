$("#clear").on("click", function(){
   $("#mainbody").empty()
})
$("#search").on("click", function(){
  var query=  "https://cors-anywhere.herokuapp.com/https://remotive.io/api/remote-jobs?category=software-dev"
  $.ajax({
   url: query,
   method:"GET"
  }) .then(function(remotive){
      
      for(var i=0; i < 8; i++ ){
          var a=i+1
       var title= remotive.jobs[i].title
       var tags=remotive.jobs[i].tags
       var url=remotive.jobs[i].url
       var company=remotive.jobs[i].company_name

       console.log(title)
       console.log(tags)
       console.log(url)
       console.log(company)
     
     //create card to append to mainbody
      var id="card"+a
      var idcont="cardcontent"+a
      
      $("#mainbody").append("<div id="+id+"></div>")
      var card=$("#"+id)
      card.addClass("card")
      card.append("<div id="+idcont+"></div>")
      var cardcontent=$("#"+idcont)
      cardcontent.addClass("card-content")

       // creates job title header for cards
          var titleEl=$("<p>")
       titleEl.addClass("title")
      titleEl.text(title)
      
       cardcontent.append(titleEl)

        //create company el
      var companyEl=$("<p>").addClass("company")
      companyEl.text(company)
      cardcontent.append(companyEl)

       //creates url element
       var urlEl=$("<a>")
       urlEl.attr("href", url)
        urlEl.text(url)
       cardcontent.append(urlEl)

         //create footer
        var footerEl=$("<footer>").addClass("card-footer")
        cardcontent.append(footerEl)

      // creates tags link
       if(tags.length!=0){
           for(var x=0; x<tags.length; x++){
           var footeritem=$("<p>").addClass("card-footer-item")
          footeritem.append(footerEl)
           var tagslink=$("<span>")
           tagslink.text(tags[x])
          tagslink.append(footerEl)
       }}

      } 
  })

})