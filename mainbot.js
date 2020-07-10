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

/*
In the terminal, you are running the node application and it is running your script. That is a very different execution environment than directly running your script in the browser. While the Javascript language is largely the same (both V8 if you're running the Chrome browser), the rest of the execution environment such as libraries available are not the same.

node.js is a server-side Javascript execution environment that combines the V8 Javascript engine with a bunch of server-side libraries. require() is one such feature that node.js adds to the environment. So, when you run node in the terminal, you are running an environment that contains require().

require() is not a feature that is built into the browser. That is a specific feature of node.js, not of a browser. So, when you try to have the browser run your script, it does not have require().

There are ways to run some forms of node.js code in a browser (but not all). For example, you can get browser substitutes for require() that work similarly (though not identically).

But, you won't be running a web server in your browser as that is not something the browser has the capability to do.
*/