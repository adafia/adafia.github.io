document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('form').onsubmit = function(event) {
    event.preventDefault();
    checkWord();
    window.scrollTo(0, 150);
  }

  // Focus on text input immediatly
  document.getElementById('terminal-input').focus();

  let terminalInputValue = document.getElementById('terminal-input').value.trim();

  let terminalResultsValue = document.getElementById('terminal-results').innerHTML;

  let clearInput = function(){
    document.getElementById("terminal-input").value = "";
  }

  let scrollToBottomOfResults = function() {
    let terminalResultsDiv = document.getElementById('terminal-results')
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  }

  scrollToBottomOfResults();

  let addTextToResults = function(textToAdd) {
    document.getElementById('terminal-results').innerHTML += "<p>" + textToAdd + "</p>";
    scrollToBottomOfResults();
  }


  let postHelpList = function() {
    let helpKeyWords = [
      "- Open + website URL to open it in the browser (e.g open  https://samuel-adafia.firebaseapp.com/)",
      "- Google + keyword to search directly with Google (e.g google event loop)",
      "- YouTube + keyword to search for content on YouTube (e.g functional programming)",
      "- Wiki + keyword to search directly inWikipedia (e.g wiki terminal)",
      "- 'Time' displays the current time",
      "- 'Date' displays the current date",
      "* There are a lot more keywords to discover"
    ].join('<br>');

    addTextToResults(helpKeyWords)
  }

  let postInterests = () => {
    let interests = [
      {title: "Big O Notation", link: "https://dev.to/adafia/big-o-notation-3oi6"},
      {title: "Brief Performance Analysis of Arrays and Objects through the lens of Big O Notation", link: "https://dev.to/adafia/brief-performance-analysis-of-arrays-and-objects-through-the-lens-of-big-o-notation-4id3"},
      {title: "FOUC, and the Death of Progressive Enhancement with Kyle Simpson", link: "https://www.youtube.com/watch?v=HVSkcnIJEC0"},
      {title: "The Why of Go", link: "https://www.youtube.com/watch?v=bmZNaUcwBt4"},
      {title: "What the heck is the event loop anyway? | Philip Roberts | JSConf EU", link: "https://www.youtube.com/watch?v=8aGhZQkoFbQ4"},
    ]
    let render = interests.map(interest => `<li><a href='${interest.link}'>${interest.title}</a></li>`).join('<br>')
    addTextToResults(`<ul>${render}</ul>`)
  }


  let getTimeAndDate = function(postTimeDay) {
    let timeAndDate = new Date();
    let timeHours = timeAndDate.getHours();
    let timeMinutes = timeAndDate.getMinutes();
    let dateDay = timeAndDate.getDate();
    let dateMonth = timeAndDate.getMonth();
    let dateYear = timeAndDate.getFullYear();

    if(timeHours < 10) {
      timeHours = "0" + timeHours
    }

    if(timeMinutes < 10) {
      timeMinutes = "0" + timeMinutes
    }

    let currentTime = timeHours + ":" + timeMinutes;
    let currentDate = dateDay + "/" + dateMonth + "/" + dateYear;

    if(postTimeDay == "time") {
      addTextToResults(currentTime)
    }

    if(postTimeDay == "date") {
      addTextToResults(currentDate)
    }
  }


  // opening links in a new tab
  let openLinkInNewWindow = function(linkToOpen) {
    window.open(linkToOpen, '_blank');
    clearInput();
  }


  let textReplies = function() {
    switch(terminalInputValueLowerCase) {
      case "whoami":
      case "about":
      case "who":
        clearInput();
        addTextToResults("Hello, my name is Samuel Adafia, welcome to my slice of the internet. I'm a Youtube and Udemy trained full-stack web developer.")
        addTextToResults("I'm currently studying mechatronic engineering so I can be valuable in the robot uprising.")
        break;
      case "interests":
        clearInput();
        addTextToResults("These are links to conference talks on YouTube and the rare occassional blog posts authored by yours truly or someone smarter.")
        postInterests();
        break;
      case "youtube":
        clearInput();
        addTextToResults("type youtube + something to search for.")
        break;
      case "google":
        clearInput();
        addTextToResults("type google + something to search for.")
        break;
      case "wiki":
        clearInput();
        addTextToResults("type wiki + something to search for.")
        break;
      case "time":
        clearInput();
        getTimeAndDate("time");
        break;
      case "date":
        clearInput();
        getTimeAndDate("date");
        break;
      case "help":
      case "?":
        clearInput();
        postHelpList();
        break;
      default:
        clearInput();
        addTextToResults("<p><i>The command " + "<b>" + terminalInputValue + "</b>" + " is not yet supported.</i></p>");
        break;
    }
  }

  let checkWord = function() {
    terminalInputValue = document.getElementById('terminal-input').value.trim();
    terminalInputValueLowerCase = terminalInputValue.toLowerCase();


    if(terminalInputValue != "") {
      addTextToResults("<p class='userEnteredText'><span class='prompt'>></span> " + terminalInputValue + "</p>");
      if(terminalInputValueLowerCase.substr(0,5) == "open ") {
        openLinkInNewWindow('http://' + terminalInputValueLowerCase.substr(5));
        addTextToResults("<i>The URL " + "<b>" + terminalInputValue + "should be opened soon")
      } else if(terminalInputValueLowerCase.substr(0,8) == "youtube ") {
        openLinkInNewWindow('https://www.youtube.com/results?search_query=' + terminalInputValueLowerCase.substr(8));
        addTextToResults("<i>I've searched YouTube for <b>" + terminalInputValue.substr(8))
      } else if(terminalInputValueLowerCase.substr(0,7) == "google ") {
        openLinkInNewWindow('https://www.google.com/search?q=' + terminalInputValueLowerCase.substr(7));
        addTextToResults("<i>I've searched Google for <b>" + terminalInputValue.substr(7))
      } else if(terminalInputValueLowerCase.substr(0,5) == "wiki ") {
        openLinkInNewWindow('https://wikipedia.org/w/index.php?search=' + terminalInputValueLowerCase.substr(5));
        addTextToResults("<i>I've searched Wikipedia for <b>" + terminalInputValue.substr(5))
      } else {
        textReplies();
      }
    }
  }
})