const Highcharts = require('highcharts');
const { createCanvas } = require('canvas');
require('/highcharts/modules/exporting')(Highcharts)

const pieChart = Highcharts.chart({
    chart: {
        type: 'pie',
        scrollablePlotArea: {
            minWidth: 400,
            minHeight : 400
        }
    },
    title: {
        text: 'Pie Chart Example'
    },
    series: [{
        name: 'Data',
        data: [
            { name: 'A', y: 30 },
            { name: 'B', y: 70 }
        ]
    }]
});

const pieCanvas = createCanvas(400, 300);
