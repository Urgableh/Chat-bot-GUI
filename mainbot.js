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
  //console.log(getCSVData);
  var rows = getCSVData.split("\n");
  var html = '<table border="1">';
  rows.forEach((data, index) => {
    html += "<tr>";
    var value = data.split(",");

    for (i=0; i< columns; i++) {
      html += "<td>" + value[i] + "</td>";
    }
    html += "</tr>";
  });
  html += '</table>';
  document.getElementById(`${id}`).innerHTML = html;
  document.getElementById(`${id}`).style.color="blue";
}
