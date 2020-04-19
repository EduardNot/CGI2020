// https://www.chartjs.org/docs/latest/
// Chart drawing function
let sunLightDurationChart
function drawChart(labelArr, durationArr) {
    if (typeof sunLightDurationChart != 'undefined') {
        sunLightDurationChart.destroy();
    }
    let myChart = document.getElementById("chart").getContext("2d");
    document.getElementById("chart").style.display = "block";
    // document.getElementById("chart").style.backgroundColor = "#eeeeee";
    sunLightDurationChart = new Chart(myChart, {
        type: 'line',
        data: {
            labels: labelArr,
            datasets: [{
                label: "Day length",
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