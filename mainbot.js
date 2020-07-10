function openCity(evt, cityName) {
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
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function loadFile(o)
{
    var fr = new FileReader();
    fr.onload = function(e)
        {
            showDataFile(e, o);
        };
    fr.readAsText(o.files[0]);
}

function showDataFile(e, o)
{ 
  var getCSVData = e.target.result;
  console.log(getCSVData);
  var rows = getCSVData.split("\n");
  var html = '<table border="1">';
  rows.forEach((data, index) => {
    html += "<tr>";
    var value = data.split(",");

    html += "<td>" + value[0] + "</td>";
    html += "<td>" + value[1] + "</td>";
    html += "<td>" + value[2] + "</td>";
    html += "<td>" + value[3] + "</td>";
    html += "<td>" + value[4] + "</td>";

    html += "</tr>";
  });
  html += '</table>';
  document.getElementById("data").innerHTML = html;
  document.getElementById("data").style.color="blue";
}