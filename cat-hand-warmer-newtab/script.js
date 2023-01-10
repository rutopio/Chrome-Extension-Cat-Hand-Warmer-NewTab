
function time() {
    var d = new Date();
    var sec = d.getSeconds();
    var min = d.getMinutes();
    var hr = d.getHours();
    var year = d.getFullYear();
    var mon = d.getMonth();
    var date = d.getDate();
    // const monthNamesEn = [
    //     'January', 'February', 'March', 'April', 'May', 'June',
    //     'July', 'August', 'September', 'October', 'November', 'December'
    //   ]
    const monthNamesEn = [ //abbr
        'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June',
        'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
      ]
    if (sec < 10) {
      sec = "0" + sec;
    }
    if (min < 10) {
      min = "0" + min;
    }
    if (hr < 10) {
      hr = "0" + hr;
    }
    
    // span.textContent = h + ":" + m + ":" + s;
    document.getElementById('time').innerHTML = hr + '<span class="blinking">:<\/span>' + min + '<span class="blinking">:<\/span>' + sec +' ' + monthNamesEn[mon] + " "+ date;

}

// set time
time()
setInterval(time, 1000);
// ----- CHANGE THESE VARIABLES

// Do you want to show the weather?
const weather = true;
// Do you want animations?
const animated = false;

// Read the documentation for setting the weather API key
const apiKey = "YOUR_OPEN_WEATHER_MAP_API_KEY";
const lat = YOUR_LATITUDE_FLOAT;
const lon = YOUR_LONGITUDE_FLOAT;
const units = "metric";

// ----- DON'T TOUCH ANYTHING BELOW THIS UNLESS YOU KNOW WHAT YOU'RE DOING

var weatherEl = document.getElementById("weatherDesc");
var tempEl = document.getElementById("temp");

if (weather) {
    var apiLink =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=" +
        units +
        "&appid=" +
        apiKey;
    console.log(apiLink);
    // grabs json data from url, thanks https://stackoverflow.com/a/35970894
    var getJSON = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "json";
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    };

    // gets city name from weather api
    getJSON(apiLink, function (err, data) {
        if (err !== null) {
            weatherEl.innerText = "";
            tempEl.innerText = "";
        } else {
            var city = data.name;
            var temp = data.main.temp;
            var hiTemp = data.main.temp_max;
            var loTemp = data.main.temp_min;
            var weatherDesc = data.weather[0].description;
            weatherEl.innerHTML =
                weatherDesc + " @ " + city;
            tempEl.innerHTML = "<i class='fa-solid fa-temperature-three-quarters'><\/i> " + temp + "° <i class='fa-solid fa-temperature-high'><\/i> " + hiTemp + "° <i class='fa-solid fa-temperature-low'><\/i> " + loTemp + "°";
        }
    });
} else {
    weatherEl.innerText = "";
    tempEl.innerText = "";
}



if (animated) {
    // hides all elements
    document.querySelectorAll("*").forEach(el => el.style.opacity = 0);

    // anime.js animation function
    function playAnimation() {
        var tl = anime.timeline({
            easing: "easeInOutExpo",
            duration: 1500,
        });

        tl.add({
            targets: "#img",
            opacity: [0, 1],
            translateY: [100, 0],
        })
            .add(
                {
                    targets: "#img",
                    width: ["100%", "60%"],
                },
                "-=1200"
            )
            .add(
                {
                    targets: "main *",
                    opacity: [0, 1],
                    translateY: [10, 0],
                    delay: anime.stagger(15),
                },
                "-=1800"
            );
    }

    window.onload = function () {
        document.querySelectorAll("*").forEach(el => el.style.opacity = 1);
        playAnimation();
    }
}



function CountdownWorkday() {
    workdayStartString = "10:00";
    workdayEndString = "19:00";
    workdayStartHour = workdayStartString.split(":")[0];
    workdayStartMin = workdayStartString.split(":")[1];
    workdayEndHour = workdayEndString.split(":")[0];
    workdayEndMin = workdayEndString.split(":")[1];
    var now = new Date(),
        workdayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(workdayStartHour), parseInt(workdayStartMin)),
        workdayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(workdayEndHour), parseInt(workdayEndMin));
    if (now < workdayStart) {
        progressPCT = 0
        document.getElementById('time-icon').innerHTML = '<i class="fa-solid fa-bed"></i>'
    } else if (now > workdayEnd) {
        progressPCT = 100
        document.getElementById('time-icon').innerHTML = '<i class="fa-solid fa-utensils"></i>'

    } else {
        var progressMS = now - workdayStart,
            totalDayMS = workdayEnd - workdayStart;
        progressPCT = progressMS / totalDayMS * 100
        document.getElementById('time-icon').innerHTML = '<i class="fa-solid fa-person-running fa-xl"></i>'

    }
    var prettyPCT = Math.round(progressPCT);
    document.querySelector(':root').style.setProperty('--workpercentage', prettyPCT+ "%");

}

CountdownWorkday()