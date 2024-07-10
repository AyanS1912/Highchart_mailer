
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");


const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));


// Send Email call1
app.post("/send-email", (req, res) => {
  const { images } = req.body;

  let htmlContent = `
      <html>
        <head>
          <style>
          /*
            .flex-container {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-items: center;
              width: 100vw;
              padding: 10px;
              position : fixed;
            }

            .scroll-container {
              max-height: 400px;
              overflow: auto;
              scrollbar-width: thin;
              scrollbar-color: #888 #f0f0f0;
              padding : 10px;
              margin : 10px;
              box-sizing : border-box;
              justify-content : space-around;
              align-content : center;
            }

            .scroll-container img {
              max-width: 100%;
              max-height: 100%;
              display: block;
            }

            .scroll-container::-webkit-scrollbar {
              width: 6px;
              height: 6px;
            }
            .scroll-container::-webkit-scrollbar-thumb {
              background-color: #888;
              border-radius: 3px;
            }
            .scroll-container::-webkit-scrollbar-track {
              background-color: #f0f0f0;
            }

          */
          </style>
        </head>
        <body>
        <div class="flex-container">`;

  let attachments = images.map((image, index) => {
    const imageBuffer = Buffer.from(image.split(",")[1], "base64");
    htmlContent += `
      <div class="scroll-container">
        <img src="cid:highchartImage${index}" alt="Highchart${index}"/>
      </div>
      `;
    return {
      filename: `highchart${index+1}.png`,
      content: imageBuffer,
      cid: `highchartImage${index}`,
    };
  });

  htmlContent += ` </div>
    </body>
  </html>`;


  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ayansheikh.cse@gmail.com",
      pass: "gwmt emxb xwhu frza",
    },
  });

  let mailOptions = {
    form: "ayansheikh.cse@gmail.com",
    to: "ayan.sheikh@innovapptive.com",
    subject: "Send Widget -Proper visible Chart",
    html: htmlContent,
    attachments: attachments,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).send(err.toString());
    }
    res.status(200).send("Mail Sent" + info.response);
  });
});




// Sending mail with puppeteer
// app.post("/send-email", async(req, res) => {
//   try{
//     const browser = await puppeteer.launch({headless:false})
//     const page = await browser.newPage()

//     await page.setViewport({width: 1280, height: 720 })

//     await page.goto('http://localhost:4200'/*,{waitUntil : "networkidle2"}*/);
    
//     await page.waitForSelector(".chart-container");

//     const chartSelectors = await page.$$(".scrollable-container")
//     console.log("cdchsdcsd",chartSelectors)

//     chartSelectors.forEach(async(element) => {
//       // This actually works and gives me the id of each of the elements
//       const jsHandle = await (await element.getProperty(".scrollable-container")).jsonValue();
//       // This always returns {}
//       console.log(await element.getProperties())
//   })

//     const getScreenshots = []

//     for (const selector of chartSelectors) {
//       const targetElement = await page.$(selector);
//       console.log(targetElement)


//    //get class attribute
//    let v = await page.$eval("input", targetElement => targetElement.getAttribute("class"))
//    console.log(v)

//       // Temporarily update chart dimensions
//       await page.evaluate((selector) => {
//         console.log("chart we got",selector)
//         // const originalWidth = chart.chartWidth;
//         // const originalHeight = chart.chartHeight;
//         // chart.update({
//         //   chart: {
//         //     width: 1600,
//         //     height: 1200
//         //   },
//         //   xAxis: {
//         //     max: chart.xAxis[0].dataMax
//         //   },
//         //   scrollbar: {
//         //     enabled: false
//         //   }
//         // });
//         // return { originalWidth, originalHeight };
//       }, selector);

//       // await targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       const screenshot = await targetElement.screenshot({ encoding: 'base64' });
//       getScreenshots.push(`data:image/png;base64,${screenshot}`);

//       // Revert chart dimensions back to original
//       // await page.evaluate((selector, originalWidth, originalHeight) => {
//       //   const chart = Highcharts.charts.find(chart => chart.renderTo.id === selector.replace('#', ''));
//       //   console.log("chart we got2",chart)
//       //   chart.update({
//       //     chart: {
//       //       width: originalWidth,
//       //       height: originalHeight
//       //     },
//       //     scrollbar: {
//       //       enabled: true
//       //     }
//       //   });
//       // }, selector, originalWidth, originalHeight);

//     }

//     await browser.close()


//       let htmlContent = `
//       <html>
//         <head>
//           <style>
//           /*
//             .flex-container {
//               display: flex;
//               flex-wrap: wrap;
//               justify-content: center;
//               width: 100vw;
//               position : fixed;
//             }

//             .scroll-container {
//               max-height: 400px;
//               overflow: auto;
//               scrollbar-width: thin;
//               scrollbar-color: #888 #f0f0f0;
//               padding : 10px;
//               margin : 10px;
//               box-sizing : border-box;
//               justify-content : space-around;
//               align-content : center;
//             }

//             .scroll-container img {
//               max-width: 100%;f0f0;
//             }

//           */
//           </style>
//         </head>
//         <body>
//         <div class="flex-container">`;
  
//   let attachments = getScreenshots.map((image, index) => {
//     const imageBuffer = Buffer.from(image.split(",")[1], "base64");
//     htmlContent += `
//       <div class="scroll-container">
//         <img src="cid:highchartImage${index}" alt="Highchart${index}"/>
//       </div>
//       `;
//     return {
//       filename: `highchart${index}.png`,
//       content: imageBuffer,
//       cid: `highchartImage${index}`,
//     };
//   });

//   htmlContent += ` </div>
//     </body>
//   </html>`;

//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "ayansheikh.cse@gmail.com",
//       pass: "gwmt emxb xwhu frza",
//     },
//   });

//   let mailOptions = {
//     form: "ayansheikh.cse@gmail.com",
//     to: "ayan.sheikh@innovapptive.com",
//     subject: "Send Widget -Proper visible Chart",
//     html: htmlContent,
//     attachments: attachments,
//   };

//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       return res.status(500).send(err.toString());
//     }
//     res.status(200).send("Mail Sent" + info.response);
//   });

//   }
//   catch(err){
//     console.error("Error capturing screenshot or sending email:", err);
//     res.status(500).send("Internal server error");
//   }
// })

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
