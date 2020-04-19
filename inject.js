function submit() {
    let latitude = document.getElementById("latitude").value;
    let longitude = document.getElementById("longitude").value;
    if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180 && latitude !== "" && longitude !== "") {
        moveTo(latitude, longitude);
    }
    if (document.getElementById("toDate").value.length === 0) {
        dateSingle(latitude, longitude)
    } else {
        dateMultiple(latitude, longitude)
    }
}

function coordinateFromMap(latitude, longitude) {
    if (document.getElementById("toDate").value.length === 0) {
        dateSingle(latitude, longitude)
    } else {
        dateMultiple(latitude, longitude)
    }
}

function clearFrom() {
    document.getElementById("fromDate").valueAsDate = null;
}

function clearTo() {
    document.getElementById("toDate").valueAsDate = null;
}

function dateSingle(latitude, longitude) {
    let fromDate = document.getElementById("fromDate");
    if (fromDate.value.length === 0) {
        fromDate = new Date();
    } else {
        fromDate = new Date(fromDate.value);
    }
    getSunStatusSingle(latitude, longitude, fromDate)
}

function dateMultiple(latitude, longitude) {
    let fromDate = document.getElementById("fromDate");
    let toDate = document.getElementById("toDate");
    if (fromDate.value.length === 0) {
        fromDate = new Date();
    } else {
        fromDate = new Date(fromDate.value);
    }
    if (toDate.value.length !== 0) {
        toDate = new Date(toDate.value);
    }
    getSunStatusMultiple(latitude, longitude, fromDate, toDate);
}

function getSunStatusSingle(latitude, longitude, fromDate) {
    // let test = fromDate.toISOString().split(/[A-Z]/);
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);
    if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180 && latitude !== "" && longitude !== "") {
        let coordinates = ol.proj.fromLonLat([longitude, latitude], 'EPSG:4326');
        document.getElementById("coordinates").innerText = coordinates[1].toFixed(2) + ", " + coordinates[0].toFixed(2);
        let sun = SunCalc.getTimes(fromDate, latitude, longitude);
        if (sun.sunrise.toString().localeCompare("Invalid Date") || sun.sunset.toString().localeCompare("Invalid Date")) {
            document.getElementById("sunrise").innerText = sun.sunrise;
            document.getElementById("sunset").innerText = sun.sunset;
            // https://stackoverflow.com/questions/19225414/how-to-get-the-hours-difference-between-two-date-objects
            document.getElementById("duration").innerText = (Math.abs(sun.sunset - sun.sunrise) / 36e5).toFixed(2) + " hours";
        } else {
            document.getElementById("sunrise").innerText = "Sun does not rise";
            document.getElementById("sunset").innerText = "Sun does not set";
            document.getElementById("duration").innerText = "24" + " hours";
        }
        console.log(sun.sunrise);
    } else {
        document.getElementById("coordinates").innerText = "Invalid input";
    }
}

function getSunStatusMultiple(latitude, longitude, fromDate, toDate) {
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);
    if (fromDate > toDate) {
        alert("Please put dates correctly, i.e. first date must be before than second date.");
    } else if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180 && latitude !== "" && longitude !== "") {
        let coordinates = ol.proj.fromLonLat([longitude, latitude], 'EPSG:4326');
        document.getElementById("coordinates").innerText = coordinates[1].toFixed(2) + ", " + coordinates[0].toFixed(2);
        let labelArr = [];
        let durationArr = [];
        // https://stackoverflow.com/questions/4345045/javascript-loop-between-date-ranges
        for (let i = fromDate; i <= toDate; i.setDate(i.getDate() + 1)) {
            labelArr.push(i.toDateString());
            let sun = SunCalc.getTimes(fromDate, latitude, longitude);
            durationArr.push((Math.abs(sun.sunset - sun.sunrise) / 36e5).toFixed(2));
        }
        drawChart(labelArr, durationArr);
        toggelMap();

    } else {
        document.getElementById("coordinates").innerText = "Invalid input";
    }
}

function toggelMap() {
    let map = document.getElementById("map");
    if (map.style.display === "none") {
        map.style.display = "block";
        document.getElementById("toggleMap").innerText = "Hide map";
    } else {
        map.style.display = "none";
        document.getElementById("toggleMap").innerText = "Show map";
    }
}
