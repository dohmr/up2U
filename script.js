$("#search").on("click", function () {
  $("#mainbody").empty()
  $("#ancestorTile").removeClass("is-hidden");
  var instructions = $("<p class='has-text-centered'><span class='title is-6'>Search Results:</span><br><span class='subtitle is-6'>Click the company name to see related New York Times articles.</span> </p>")
  $("#mainbody").append(instructions)
  $("#search").addClass("is-loading")
  $("#search").attr("disabled", true)
  
  var numinput = $("#checknuminput").val()
  var query = "https://remotive.com/api/remote-jobs?category=software-dev"
  $.ajax({
    url: query,
    method: "GET"
  }).then(function (remotive) {

    for (var i = 0; i < numinput; i++) {
      var a = i + 1
      var title = remotive.jobs[i].title
      var tags = remotive.jobs[i].tags
      var url = remotive.jobs[i].url
      var company = remotive.jobs[i].company_name
      var jobtype = remotive.jobs[i].job_type

      if (jobtype === "full_time") {
        jobtype = "Full Time";
      } else if (jobtype === "contract") {
        jobtype = "Contract";
      }


      //create new tiles to append to mainbody
      var tileid = "tile-" + a
      $("#mainbody").append("<div id=" + tileid + "></div>")
      var tile = $("#" + tileid)
      tile.addClass("tile is-parent notification is-vertical is-12 has-text-black")
      //create card to append to tiles
      var idcont = "cardcontent" + a
      var tileid = "tile" + a


      //tile.append("<div id="+cardid+"></div>")
      tile.append("<div id=" + idcont + "></div>")
      var cardcontent = $("#" + idcont)
      cardcontent.addClass("card-content ")

      // creates job title header for cards
      var titleEl = $("<p>")
      titleEl.addClass("title is-4")
      titleEl.text(title)

      cardcontent.append(titleEl)

      //create company el
      var companyEl = $("<span>").addClass("company")
      companyEl.html("<p>Company: " + company + "</p>")
      cardcontent.append(companyEl)

      //creates a job type
      var companyEl = $("<span>").addClass("jobtype")
      companyEl.html("<p>Job Type: " + jobtype + "</p>")
      cardcontent.append(companyEl)

      //creates url element
      var urlEl = $("<a>")
      urlEl.attr("href", url)
      urlEl.attr("target", "_blank")
      urlEl.text("Click here to view full job description")
      cardcontent.append(urlEl)

      //create footer
      var footerEl = $("<footer>").addClass("card-footer")
      cardcontent.append(footerEl)

      // creates tags link
      if (tags.length != 0) {
        for (var x = 0; x < tags.length; x++) {
          var footeritem = $("<p>").addClass("card-footer-item")
          footerEl.append(footeritem)
          var tagslink = $("<span>")

          tagslink.text(tags[x])
          tagslink.append(footerEl)
        }
      }

      //creates new tile is child.
      var ischildid = "childtile-" + a
      tile.append("<div id=" + ischildid + "></div>")
      var dropdown = $("#" + ischildid)
      dropdown.addClass("tile is-child box notification is-dark has-text-white is-hidden is-vertical")

      //ends spinner on search button function completing
      $("#search").removeClass("is-loading")
      $("#search").attr("disabled", false)

      
    }
  })

})



$(document).on("click", ".company", function (event) {
  event.preventDefault();

  var apiKey = "api-key=TD8WaDGvjAOlRzEak47DMtf8oe7ReO62"
  var searchTag = "&q=" + $(this).text()
  console.log(searchTag)
  var searchFilter = "&fq=section_name:(%22technology%22)"
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + apiKey + searchFilter + searchTag;
  var cardContent = $(this).parent()
  var dropDown = cardContent.siblings(".is-child")
      dropDown.removeClass("is-hidden")
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (newsAPI) {

    if (newsAPI.response.docs.length === 0) {
      var nullmessage = $("<p>").text("No New York Times article for this company")
      dropDown.append(nullmessage)
    }
    else {
      // added an empty function to prevent excess articles 09/25
      dropDown.empty()
      // grab 3 articles related to company
      for (var j = 0; j < 3; j++) {
        var dd = $("<div>")
        dropDown.append(dd)
        dd.addClass("is-child")
        var dataResponse = newsAPI.response.docs;

        var br=$("<br>")
        var snippet = $("<p>").text(dataResponse[j].snippet);
        var headline = $("<a>").text(dataResponse[j].headline.main).attr({'href': dataResponse[j].web_url , "target": "_blank"});
        //url for article search
        // var articleURL = $("<a>").text("Link: " + dataResponse[j].web_url).attr({'href': dataResponse[j].web_url , "target": "_blank"});
        dd.append(headline,br, snippet,br, br);
      }
      //Delete button via bulma to close the articles    
      
    }
    var deleteButton = $("<button class='delete'></button>")
    dropDown.append(deleteButton)
    $(".delete").on("click", function (event) {
      $(dropDown).addClass("is-hidden")
    })


  })




})
$(document).on("mouseenter",".company", function(){
  $(this).css("cursor", "pointer");
 })
