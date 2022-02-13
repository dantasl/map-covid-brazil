google.charts.load('current', {'packages':['geochart']});

function showConfirmed() {
    getDataThenDrawMap();
    sessionStorage.setItem('type', 'confirmed');
    document.getElementById('viewing').innerText = 'You are currently viewing the number of Confirmed Cases.';
}

function showCasualities() {
    getDataThenDrawMap();
    sessionStorage.setItem('type', 'deaths');
    document.getElementById('viewing').innerText = 'You are currently viewing the number of Casualities.';
}

function fetchData() {
    fetch('https://api.brasil.io/v1/dataset/covid19/caso/data/?place_type=state', {
        headers: {"Authorization": "Token 8e91da2bd4acc0021df573785ea3f7893c84c7d1"}
    })
    .then(response => response.json())
    .then(function(response) {
        var data = response['results'].filter(result => result['is_last']);
        sessionStorage.setItem('covid-data', JSON.stringify(data));
        drawRegionsMap(data);
    });
}

function getDataThenDrawMap() {
    if (sessionStorage.getItem('covid-data')) {
        drawRegionsMap(JSON.parse(sessionStorage.getItem('covid-data')));
        return;
    }

    fetchData();
}

function drawRegionsMap(cases) {
    var type = sessionStorage.getItem('type');

    if (!type) return;

    var message = type === 'confirmed' ? 'Confirmed Cases' : 'Confirmed Casualities';
    var statesArray = [ ['State', message] ];

    cases.forEach(function (item) {
        statesArray.push(['BR-' + item['state'], item[type]]);
    });

    var data = google.visualization.arrayToDataTable(statesArray);
    var options = {
        region: 'BR',
        resolution: 'provinces',
        width: '100%',
        height: 800,
        colorAxis: {
            colors: ['#acb2b9', '#2f3f4f']
        }
    };
    var chart = new google.visualization.GeoChart(document.getElementById('regions'));
    
    chart.draw(data, options);
}
