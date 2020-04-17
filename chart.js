// https://www.chartjs.org/docs/latest/
function drawChart(labelArr, durationArr) {
    let myChart = document.getElementById("chart").getContext("2d");
    document.getElementById("chart").style.display = "block";
    // document.getElementById("chart").style.backgroundColor = "#eeeeee";
    let sunLightDurationChart = new Chart(myChart, {
        type: 'line',
        data: {
            // labels: ["a", "b", "c"],
            labels: labelArr,
            datasets: [{
                label: "Day length",
                // data: [10, 100, 50]
                data: durationArr,
                backgroundColor: "lightblue",
                borderColor: 'black'
            }]
        },
        options: {
            title: {
                display: true,
                text: "Day length",
                fontSize: 25,
                titleFontColor: "white"
            }
        }
    });
}