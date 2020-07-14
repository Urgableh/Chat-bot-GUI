var fs = require('fs');

// Responsible for showing content for each tab
function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Loads the file
function loadFile(csv)
{
  var text1 = fs.readFileSync(csv + '.csv','utf8'); 
  var allTextLines = text1.split(/\r\n|\n/); // Splits lines by rows
  var headers = allTextLines[0].split(','); // Splits the first row by commas as header
  var columns = headers.length;
  showDataFile(text1, csv, columns);
}

// Processes the file loaded
function showDataFile(text, id, columns)
{ 
  var getCSVData = text;
  var tableId = id + "Table";
  //console.log(getCSVData);
  var rows = getCSVData.split("\n");
  var html = `<table border="1" width="100%" id="${tableId}">`;
  rows.forEach((data, index) => {
    html += "<tr>";
    var value = data.split(",");

    for (i=0; i< columns; i++) {
      if (index == 0) {
        html += "<td style='text-align:center;'>" + value[i] + "</td>";
      }
      else {
        html += "<td contenteditable='true'>" + value[i] + "</td>";
      }
    }
    html += "</tr>";
  });
  html += '</table>';
  document.getElementById(`${id}`).innerHTML = html;
  document.getElementById(`${id}`).style.color="white";
  document.getElementById(`${id}`).style.tableLayout="auto";
}

// Access the entire console.log history in messages

var messages = [];
console.log = function(msg) {
    messages.push(msg);
    var current = document.getElementById("logger").innerHTML;
    document.getElementById("logger").innerHTML = current + "<br>" + msg;
    document.getElementById("logger").scrollTop = document.getElementById("logger").scrollHeight;  
}

var loop = false; // for chatbot start/stop
var hide = true;

function startStop()
{
  // Below is shorthand to invert the value of the loop variable from true to false.
  loop = !loop;
  document.getElementById('caution').style.display = 'inline';
  // I guess we're also like to change the text on the loop button to say start or stop
  // below we are using shorthand for if(loop === true) print "STOP" else print "START"
  document.getElementById("loop").value = loop ? "STOP" : "START";
  // then we need to call your function, because we want to restart the loop or stop it after clicking
  // console.log(loop);
  if (loop == true) {
    twitchBot(); // wrapped entirety of mainbot_from_Twitchbot.js into function twitchBot()
    document.getElementById("loop").style.display='none';
  }
}

function hiddenf()
{
  hide = !hide;
  //console.log(hide);
  document.getElementById("hide").value = hide ? "Unhide" : "Hide";
  if (hide == false) {
    document.getElementById('credentials').style.color = "#ccc";
    document.getElementById('credentials').style.textShadow = "none";
  }
  if (hide == true) {
    document.getElementById('credentials').style.color = "transparent";
    document.getElementById('credentials').style.textShadow = "0 0 6px white";
  }
}

// Overwrite csv files
function save(csv)
{
  var str = document.getElementById(`${csv}`).innerText;
  str = str.replace(/	/g, ",");
  fs.writeFileSync(`./${csv}.csv`, str);
  fadeout(`${csv}SaveMessage`);
  document.getElementById(`${csv}Save`).disabled = true;
  setTimeout(function() {
    document.getElementById(`${csv}Save`).disabled = false
  }, 2300);
}

// Fade out saved message
function fadeout(id)
{
  setTimeout(function() { // start a delay
    var fade = document.getElementById(id); // get required element
    fade.style.opacity = 1; // set opacity for the element to 1
    var timerId = setInterval(function() { // start interval loop
      var opacity = fade.style.opacity; // get current opacity
      if (opacity == 0) { // check if its 0 yet
        clearInterval(timerId); // if so, exit from interval loop
      } else {
        fade.style.opacity = opacity - 0.05; // else remove 0.05 from opacity
      }
    }, 100); // run every 0.1 second
  }, 200); // wait to run after 0.2 seconds
}

// Add new row to table
function newRow()
{
  var text1 = fs.readFileSync('data.csv','utf8'); 
  var allTextLines = text1.split(/\r\n|\n/); // Splits lines by rows
  var columns = allTextLines[0].split(',').length;
  var row = document.getElementById('dataTable').insertRow(1);
  for (i=0;i<columns;i++) {
    var temp = row.insertCell(i);
    temp.outerHTML = "<td contenteditable='true'>value</td>";
  }
}

// Delete top row
function deleteRow()
{
  document.getElementById('dataTable').deleteRow(1);
}