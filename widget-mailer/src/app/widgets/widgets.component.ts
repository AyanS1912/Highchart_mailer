import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import * as Highcharts from "highcharts/highstock";
import html2canvas from "html2canvas";
import axios from "axios";

import Accessbility from 'highcharts/modules/accessibility.js';
import HC_exporting from 'highcharts/modules/exporting';
import HC_offlineExporting from 'highcharts/modules/offline-exporting';
import { image } from "html2canvas/dist/types/css/types/image";
import { BehaviorSubject } from "rxjs";
import { chart } from "highcharts/highcharts.src";


Accessbility(Highcharts);
HC_exporting(Highcharts);
HC_offlineExporting(Highcharts);


@Component({
  selector: "app-widgets",
  templateUrl: "./widgets.component.html",
  styleUrl: "./widgets.component.scss",
})
export class WidgetsComponent implements OnInit,OnChanges{

  isLoading$:BehaviorSubject<boolean> = new BehaviorSubject(false)
  isHighcharts: boolean = false;
  pieChart : Highcharts.Options= {
    chart: {
      type: "pie",
    },
    title: {
      text: "Status",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        type: "pie",
        name: "Status",
        data: [
          { name: "Open", y: 30, sliced: true, selected: true },
          ["Resolved", 20],
          ["In-Progress", 30],
          ["Overdue", 20],
        ],
      },
    ],
    exporting: {
      chartOptions: {
        chart: {
          width: 1600, 
          height: 1200 
      },
        scrollbar: {
          enabled: false
        },

      }
    }
  };
  barChart1 : Highcharts.Options = {
    chart: {
      type: "bar",
      events: {
        load: function () {
          const chart = this;
          const numCategories = chart.series[0].data.length;
          // Set the max dynamically based on number of categories
          if (numCategories > 5) {
            chart.xAxis[0].setExtremes(0, 5);
            chart.xAxis[0].update({
              scrollbar: {
                enabled: true,
              },
            });
          } else {
            chart.xAxis[0].update({
              scrollbar: {
                enabled: false,
              },
            });
          }
        },
      },
    },
    title: {
      text: "Most popular ideas by April 2016",
    },
    subtitle: {
      text:
        'Source: <a href="https://highcharts.uservoice.com/forums/55896-highcharts-javascript-api">UserVoice</a>',
    },
    xAxis: {
      type: "category",
      title: {
        text: null,
      },
      min: 0,
      max: 4,
      tickLength: 0,

    },
    yAxis: {
      min: 0,
      max: 1200,
      title: {
        text: "Votes",
        align: "high",
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    scrollbar: {
      enabled: true,
    },
    series: [
      {
        type: "bar",
        name: "Votes",
        data: [
          ["Gantt chart", 1000],
          ["Autocalculation and plotting of trend lines", 575],
          ["Allow navigator to have multiple data series", 523],
          ["Implement dynamic font size", 427],
          ["Multiple axis alignment control", 399],
        ],
      },
    ],
    exporting: {
      chartOptions: {
        chart: {
          width: 1600, 
          height: 1200 
      },
        scrollbar: {
          enabled: false
        }
      }
    }
  };
  barChart2 : Highcharts.Options = {
    chart: {
      type: "bar",
      renderTo: 'chart',
      marginLeft: 150,
      events: {
        load: function () {
          const chart = this;
          const numCategories = chart.series[0].data.length;
          // Set the max dynamically based on number of categories
          if (numCategories > 5) {
            chart.xAxis[0].setExtremes(0, 4);
            chart.xAxis[0].update({
              scrollbar: {
                enabled: true,  
              },
              max: 4
            });
          } else {
            chart.xAxis[0].update({
              scrollbar: {
                enabled: false,
              },
            });
          }
        },
      },
    },
    title: {
      text: "Most popular ideas by April 2016",
    },
    subtitle: {
      text:
        'Source: <a href="https://highcharts.uservoice.com/forums/55896-highcharts-javascript-api">UserVoice</a>',
    },
    xAxis: {
      type: "category",
      title: {
        text: null,
      },
      min: 0,
      max: 4,
      tickLength: 0,
    },
    yAxis: {
      min: 0,
      max: 1200,
      title: {
        text: "Votes",
        align: "high",
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },

    series: [
      {
        type: "bar",
        name: "Votes",
        data: [
          ["Gantt chart", 1000],
          ["Autocalculation and plotting of trend lines", 575],
          ["Allow navigator to have multiple data series", 523],
          ["Implement dynamic font size", 427],
          ["Multiple axis alignment control", 399],
          ["Stacked area (spline etc) in irregular datetime series", 309],
          ["Adapt chart height to legend height", 278],
          ["Export charts in excel sheet", 239],
          ["Toggle legend box", 235],
          ["Venn Diagram", 203],
          ["Add ability to change Rangeselector position", 182],
          ["Draggable legend box", 157],
          ["Sankey Diagram", 149],
          ["Add Navigation bar for Y-Axis in Highcharts Stock", 144],
          ["Grouped x-axis", 143],
          ["ReactJS plugin", 137],
          ["3D surface charts", 134],
          ["Draw lines over a stock chart, for analysis purpose", 118],
          ["Data module for database tables", 118],
          ["Draggable points", 117],
        ],
      },
    ],
    exporting: {
      chartOptions: {
        chart: {
          width: 1600, 
          height: 1200,
      },
        scrollbar: {
          enabled: false
        }
      }
    }
  };

  ngOnInit(): void {
    this.isHighcharts = typeof Highcharts === "object";    
  }

  Highcharts: typeof Highcharts = Highcharts;

  constructor(
    private cdr : ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.cdr.detectChanges()
  }
 

  //send mail capture screen shots
  // sendEmail() {
  //   const chartElements = document.querySelectorAll("#container");
  //   const imagePromises = Array.from(chartElements).map((element) => {
  //     const takeOriginalHeight = (element as HTMLElement).style.height;
  //     const takeOriginalWidth = (element as HTMLElement).style.width;

  //     (element as HTMLElement).style.height = "auto";
  //     (element as HTMLElement).style.width = "auto";

  //     return html2canvas(element as HTMLElement).then((canvas) => {
  //       (element as HTMLElement).style.height = takeOriginalHeight;
  //       (element as HTMLElement).style.width = takeOriginalWidth;
  //       return canvas.toDataURL("image/png");
  //     });
  //   });

  //   Promise.all(imagePromises).then((images) => {
  //     axios
  //       .post("http://localhost:3000/send-email", { images })
  //       .then((response) => {
  //         console.log("Email sent successfully");
  //       })
  //       .catch((error)(chartOptions.xAxis as Highcharts.AxisOptions).max = maxDatalen - => {
  //         console.error("Error sending email", error);
  //       });
  //   });
  // }

  // call to pupetter to make screen shot in headless browserr.
//   sendEmail() {
//     axios
//       .post("http://localhost:3000/send-email", {})
//       .then((response) => {
//         console.log("Email sent successfully");
//       })
//       .catch((error) => {
//         console.error("Error sending email", error);
//       });
//   }


  //Temporary chnage in chartValues for during sending the mail
  sendEmail() {
    let imagePromises:any;
    const originalChartSettings = this.adjustChartOptions();
    this.isLoading$.next(false)
    const chartContainers = ['#piecontainer', '#barcontainer1', '#barcontainer2'];
    setTimeout(() => {
      const chartContainers = ['piecontainer', 'barcontainer1', 'barcontainer2'];
      const imagePromises = chartContainers.map(selector => {
        const element = document.getElementById(selector);
        return html2canvas(element as HTMLElement).then(canvas => {
          return canvas.toDataURL('image/png');
        });
      });

      Promise.all(imagePromises).then(images => {
        axios.post('http://localhost:3000/send-email', { images: images })
          .then(response => {
            console.log('Email sent successfully');
            this.isLoading$.next(true);
            this.resetChartOptions(originalChartSettings);
            this.isLoading$.next(false);
          })
          .catch(error => {
            console.error('Error sending email:', error);
            this.isLoading$.next(true);
            this.resetChartOptions(originalChartSettings);
            this.isLoading$.next(false);
          });
      }).catch(error => {
        console.error('Error capturing screenshots:', error);
        this.isLoading$.next(true);
        this.resetChartOptions(originalChartSettings);
        this.isLoading$.next(false);
      });
    }, 2000); // Ensure charts are rendered
  }

  adjustChartOptions(): any {
    this.isLoading$.next(true)
    const originalSettings = {
      pieChart: { ...this.pieChart },
      barChart1: { ...this.barChart1 },
      barChart2: { ...this.barChart2 },
    };

    this.pieChart.chart = { ...this.pieChart.chart };

    this.barChart1 = this.adjustBarChartOptions({ ...this.barChart1});
    this.barChart2 = this.adjustBarChartOptions({ ...this.barChart2});

    this.cdr.detectChanges();
    return originalSettings;
  }

  adjustBarChartOptions(chartOptions: Highcharts.Options) {

    let maxDatalen=0;
    if (chartOptions.series) {
      chartOptions.series.forEach((series) => {
        if ((series as Highcharts.SeriesBarOptions).data) {
          maxDatalen = (series as Highcharts.SeriesBarOptions).data!.length;
        }
      });
    }

    if(chartOptions.xAxis){
      (chartOptions.xAxis as Highcharts.AxisOptions).max = maxDatalen - 1;
    }

    chartOptions.chart = {
      ...chartOptions.chart,
      events:{
        load: function () {
          const chart = this;
          const numCategories = chart.series[0].data.length;
          // Set the max dynamically based on number of categories
          if (numCategories > 5) {
            chart.xAxis[0].setExtremes(0, maxDatalen);
            chart.xAxis[0].update({
              scrollbar: {
                enabled: true,  
              },
              max: 4
            });
          } else {
            chart.xAxis[0].update({
              scrollbar: {
                enabled: false,
              },
            });
          }
        },
      }
    }
    return chartOptions
  }

  resetChartOptions(originalSettings: any) {
    this.pieChart = { ...originalSettings.pieChart };
    this.barChart1 = { ...originalSettings.barChart1 };
    this.barChart2 = { ...originalSettings.barChart2 };
  }

}
