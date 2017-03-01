'use strict';
var windowWidth = $(window).width();
var windowHeight = $(window).height();
//swatches is a global variable so that we can set it when the background is called and use it when we click the button
var swatches;
$(document).ready(function () {

  newQuote()

  $("#next").click(function(){
    newQuote()

    //we put the dominant color of the last background as the loading background
    $("body").css("background-color", swatches["DarkVibrant"].getHex())
    //and style the loader with the other colors from vibrant script
    $("#loader").css("border", "5px solid " + swatches["Muted"].getHex())
    $("#loader").css("border-top", "5px solid " + swatches["Vibrant"].getHex())

  })

})

function newQuote(){

  //we show a loading gif while we wait for the quote
  $("#wrapper").css("opacity", "0")

  //We call a new background image
  var newBackground = new Image()
  //The random is to make the image change
  newBackground.src = "https://unsplash.it/"+ windowWidth +"/"+ windowHeight +"/?random&test=" + Math.random()
  newBackground.alt = ""
  newBackground.id = "background"
  newBackground.setAttribute('crossOrigin', 'anonymous') 

  //and when it is loaded we call the quote
  newBackground.onload = function() {
    //Vibrant is a function from a script that gets dominant color
    var vibrant = new Vibrant(newBackground);
    swatches = vibrant.swatches()

    //cache needs to be false or the quotes won't change
    $.ajaxSetup({ cache: false});
    $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function (json)
    {
      let quote = json[0].content
      let author = " —"  + json[0].title
      let quoteTweet = truncateString(quote, 140 - author.length)
      quoteTweet += author

      $("#quote").html(quote)
      $("#author").html(author)
      $("#twitter").attr("href", "https://twitter.com/intent/tweet?text=" + quoteTweet)


      $("#wrapper").css("opacity", "1")
      $("#next").css("background-color", swatches["LightVibrant"].getHex())
      $("#next").css("color", swatches["DarkMuted"].getHex())

      $("#imgBackground").html(newBackground);
    })
  }


}

function truncateString(str, num) {
  // Clear out that junk in your trunk
  if(num <= 3)
  {
    str = str.slice(0, num) + "..."
  }
  else if(str.length <= num)
  {
    return str
  }
  else
  {
    str = str.slice(0, num - 3) + "...";
  }
  return str
}
