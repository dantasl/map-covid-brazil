google.charts.load('current', {'packages':['geochart']});

fetch('https://api.brasil.io/v1/dataset/covid19/caso/data/?place_type=state', {
    method: "GET",
    headers: {"Authorization": "Token 8e91da2bd4acc0021df573785ea3f7893c84c7d1"}
})
.then(response => response.json())
.then(response => response['results'].filter(result => result['is_last']))
.then(response => drawRegionsMap(response));

function drawRegionsMap(stateCases) {
    var data = google.visualization.arrayToDataTable([
        ['State', 'Cases'],
        ['BR-' + stateCases[0]['state'], stateCases[0]['confirmed']],
        ['BR-' + stateCases[1]['state'], stateCases[1]['confirmed']],
        ['BR-' + stateCases[2]['state'], stateCases[2]['confirmed']],
        ['BR-' + stateCases[3]['state'], stateCases[3]['confirmed']],
        ['BR-' + stateCases[4]['state'], stateCases[4]['confirmed']],
        ['BR-' + stateCases[5]['state'], stateCases[5]['confirmed']],
        ['BR-' + stateCases[6]['state'], stateCases[6]['confirmed']],
        ['BR-' + stateCases[7]['state'], stateCases[7]['confirmed']],
        ['BR-' + stateCases[8]['state'], stateCases[8]['confirmed']],
        ['BR-' + stateCases[9]['state'], stateCases[9]['confirmed']],
        ['BR-' + stateCases[10]['state'], stateCases[10]['confirmed']],
        ['BR-' + stateCases[11]['state'], stateCases[11]['confirmed']],
        ['BR-' + stateCases[12]['state'], stateCases[12]['confirmed']],
        ['BR-' + stateCases[13]['state'], stateCases[13]['confirmed']],
        ['BR-' + stateCases[14]['state'], stateCases[14]['confirmed']],
        ['BR-' + stateCases[15]['state'], stateCases[15]['confirmed']],
        ['BR-' + stateCases[16]['state'], stateCases[16]['confirmed']],
        ['BR-' + stateCases[17]['state'], stateCases[17]['confirmed']],
        ['BR-' + stateCases[18]['state'], stateCases[18]['confirmed']],
        ['BR-' + stateCases[19]['state'], stateCases[19]['confirmed']],
        ['BR-' + stateCases[20]['state'], stateCases[20]['confirmed']],
        ['BR-' + stateCases[21]['state'], stateCases[21]['confirmed']],
        ['BR-' + stateCases[22]['state'], stateCases[22]['confirmed']],
        ['BR-' + stateCases[23]['state'], stateCases[23]['confirmed']],
        ['BR-' + stateCases[24]['state'], stateCases[24]['confirmed']],
        ['BR-' + stateCases[25]['state'], stateCases[25]['confirmed']],
        ['BR-' + stateCases[26]['state'], stateCases[26]['confirmed']],
    ]);

    var options = {
        region: 'BR',
        resolution: 'provinces',
        width: 800,
        height: 600,
        colorAxis: {
            colors: ['#acb2b9', '#2f3f4f']
        }
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    chart.draw(data, options);
}