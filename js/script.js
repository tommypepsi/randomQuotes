'use strict';
$(document).ready(function () {

  let quotes = $.getJSON("http://quotes.stormconsultancy.co.uk/quotes.json", function (json)
  {
    let random = Math.floor(Math.random() * json.length)
    let quote = json[random].quote
    let author = " —"  + json[random].author
    let quoteTweet = truncateString(quote, 140 - author.length)
    quoteTweet += author

    $("#quotes").html(quote)
    $("#twitter").attr("href", "https://twitter.com/intent/tweet?text=" + quoteTweet)
    $("#next").on("click", function ()
    {
      let random = Math.floor(Math.random() * json.length)
      let quote = json[random].quote
      let quoteTweet = truncateString(quote, 140);
      $("#quotes").html(quote)
      $("#twitter").attr("href", "https://twitter.com/intent/tweet?text=" + quoteTweet)
    })
  })



})

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
