import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import html2canvas from "html2canvas";
import axios from "axios";
// import * as Highcharts from "highcharts/highstock";
import * as Highcharts from "highcharts"
import HC_exporting from "highcharts/modules/exporting";
import HC_Data from "highcharts/modules/export-data";
import Accessbility from "highcharts/modules/accessibility";

@Component({
  selector: "app-widgets",
  templateUrl: "./widgets.component.html",
  styleUrl: "./widgets.component.scss",
})
export class WidgetsComponent implements OnInit {
  // @ViewChildren("chartContainer1, chartContainer1, chartContainer3")
  // chartContainers!: QueryList<ElementRef>;

  // @ViewChild("chartContainer1", { static: false }) chartContainer1: any;
  // @ViewChild("chartContainer2", { static: false }) chartContainer2: any;
  // @ViewChild("chartContainer3", { static: false }) chartContainer3: any;

  isHighcharts: boolean = false;
  ngOnInit(): void {
    this.isHighcharts = typeof Highcharts === "object";
  }

  Highcharts: typeof Highcharts = Highcharts;

  pieChart: Highcharts.Options = {
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
  };

  barChart1: Highcharts.Options = {
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
      // scrollablePlotArea: {
      //   minHeight: 800,
      //   minWidth: 800,
      // },
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
      // scrollbar: {
      //   enabled: true,
      //   showFull: false,
      // },
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
  };

  barChart2: Highcharts.Options = {
    chart: {
      type: "bar",
      marginLeft: 150,
      events: {
        // load: function () {
        //   const chart = this;
        //   const numCategories = chart.series[0].data.length;
        //   // Set the max dynamically based on number of categories
        //   if (numCategories > 5) {
        //     chart.xAxis[0].setExtremes(0, 5);
        //     chart.xAxis[0].update({
        //       scrollbar: {
        //         enabled: true,
        //       },
        //     });
        //   } else {
        //     chart.xAxis[0].update({
        //       scrollbar: {
        //         enabled: false,
        //       },
        //     });
        //   }
        // },
      },
      scrollablePlotArea:{
        minHeight: 400,
      }
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
      // scrollbar: {
      //   enabled: true,
      //   showFull: false
      // },
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
  };

  constructor() {}

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
  //       .catch((error) => {
  //         console.error("Error sending email", error);
  //       });
  //   });
  // }

  //call to pupetter to make screen shot in headless browserr.
  sendEmail() {
    axios
      .post("http://localhost:3000/send-email", {})
      .then((response) => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.error("Error sending email", error);
      });
  }

  
}
