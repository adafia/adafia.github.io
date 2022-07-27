import data from './data.json' assert { type: "json" }

const about = `<p>Hello, my name is <span class='prompt'>Samuel Adafia</span>, welcome to my slice of the internet.<br> I'm a Youtube and Udemy trained <span class='prompt'>full-stack web developer</span>.<br> My core competencies include: <br>- API design, development and integration with <span class='prompt'>Node.js</span> <br>- Single Page Applications with <span class='prompt'>React.js</span> and
<br>- Test-driven development with <span class='prompt'>Mocha</span> and <span class='prompt'>Chai</span>.</p>`

const welcomeMessage = "<p>This is a simplistic terminal emulator.<br> For a list of supported commands, type <span class='prompt'>'help'</span> or <span class='prompt'>'?'</span></p>"

document.addEventListener('DOMContentLoaded', function() {

  document.querySelector('form').onsubmit = function(event) {
    event.preventDefault();
    checkWord();
    window.scrollTo(0, 150);
  }

  document.getElementById("terminal-results").innerHTML = welcomeMessage;

  function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }


  // Focus on text input immediatly
  document.getElementById('terminal-input').focus();

  let terminalInputValue = document.getElementById('terminal-input').value.trim();

  const clearInput = () => {
    document.getElementById("terminal-input").value = "";
  }

  const clearScreen = () => {
    document.getElementById("terminal-results").innerHTML = "";
  }

  const exitTerminal = () => {
    window.location.href = "index.html"
  }

  const scrollToBottomOfResults = () => {
    let terminalResultsDiv = document.getElementById('terminal-results')
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  }



  const addTextToResults = (textToAdd) => {
    document.getElementById('terminal-results').innerHTML += "<p>" + textToAdd + "</p>";
    scrollToBottomOfResults();
  }

  const displayResults = (result) => {
    document.getElementById('terminal-results').appendChild(result)
    scrollToBottomOfResults();
  }

  const renderCommandDescriptions = () => {
    const { commands } = data
    const table = document.createElement('table')
    let tableBody = document.createElement('tbody');
    commands.forEach(command => {
      const row = document.createElement('tr')
      const rowDataWord = document.createElement('td')
      rowDataWord.innerHTML = `${command.word}`
      rowDataWord.style.color = '#ffc300'
      const rowDataDescription = document.createElement('td')
      rowDataDescription.innerHTML = command.description

      row.appendChild(rowDataWord)
      row.appendChild(rowDataDescription)

      tableBody.appendChild(row)
    })

    table.appendChild(tableBody)
    displayResults(table)
  }


  const renderResources = () => {
    const { resources } = data
    const table = document.createElement('table')
    let tableBody = document.createElement('tbody');
    resources.forEach(resource => {
      const row = document.createElement('tr')
      const rowDataIcon = document.createElement('td')
      rowDataIcon.innerHTML = resource.type == 'video' ? '🚀' : '🔥'
      const rowData = document.createElement('td')
      rowData.innerHTML = `<a href='${resource.link}'>${resource.title}</a>`

      row.appendChild(rowDataIcon)
      row.appendChild(rowData)

      tableBody.appendChild(row)
    })
    table.appendChild(tableBody)
    displayResults(table)
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


  let textReplies = function(terminalInputValueLowerCase) {
    switch(terminalInputValueLowerCase) {
      case "whoami":
      case "about":
      case "who":
        clearInput();
        addTextToResults(about)
        break;
      case "resource":
      case "resources":
        clearInput();
        addTextToResults("These are links to conference talks on YouTube and the occassional blog posts authored by yours truly or someone smarter.")
        renderResources();
        break;
      case "cls":
      case "clear":
        clearInput();
        clearScreen();
        break;
      case "exit":
        clearScreen();
        exitTerminal();
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
        renderCommandDescriptions();
        break;
      default:
        clearInput();
        addTextToResults("<p><i>Command not found: " + "<span class='notFound'>" + terminalInputValue + "</span>" + ". Type <span class='prompt'>'help'</span> or <span class='prompt'>'?'</span> for a list of commands.</i></p>");
        break;
    }
  }

  let checkWord = function() {
    terminalInputValue = document.getElementById('terminal-input').value.trim();
    let terminalInputValueLowerCase = terminalInputValue.toLowerCase();


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
        textReplies(terminalInputValueLowerCase);
      }
    }
  }
})