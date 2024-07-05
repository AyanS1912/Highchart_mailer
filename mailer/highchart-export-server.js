// Import the Highcharts Export Server module
const exporter = require('highcharts-exports-server');

// Export options correspond to the available CLI/HTTP arguments described above
const options = {
  export: {
    type: 'png',
    options: {
      title: {
        text: 'My Chart'
      },
      xAxis: {
        categories: ["Jan", "Feb", "Mar", "Apr"]
      },
      series: [
        {
          type: 'line',
          data: [1, 3, 2, 4]
        },
        {
          type: 'line',
          data: [5, 3, 4, 2]
        }
      ]
    }
  }
};

// Initialize export settings with your chart's config
const exportSettings = exporter.setOptions(options);

// Must initialize exporting before being able to export charts
exporter.initExport(exportSettings);

// Perform an export
exporter.startExport(exportSettings, async (error, info) => {
  // The export result is now in info
  // It will be base64 encoded (info.data)

  // Kill the pool when we are done with it
  await exporter.killPool();
});