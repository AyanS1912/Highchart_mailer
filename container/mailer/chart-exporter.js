
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");

const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));


//Send Email call1
// app.post("/send-email", (req, res) => {
//   const { images } = req.body;

//   let htmlContent = `
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
//               max-width: 100%;
//               max-height: 100%;
//               display: block;
//             }

//             .scroll-container::-webkit-scrollbar {
//               width: 6px;
//               height: 6px;
//             }
//             .scroll-container::-webkit-scrollbar-thumb {
//               background-color: #888;
//               border-radius: 3px;
//             }
//             .scroll-container::-webkit-scrollbar-track {
//               background-color: #f0f0f0;
//             }

//           */
//           </style>
//         </head>
//         <body>
//         <div class="flex-container">`;

//   let attachments = images.map((image, index) => {
//     console.log(image)
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

//   console.log("htmlContent", htmlContent);

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
//   console.log(mailOptions)

//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       return res.status(500).send(err.toString());
//     }
//     res.status(200).send("Mail Sent" + info.response);
//   });
// });

app.post("/send-email", async(req, res) => {
  try{
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()

    await page.setViewport({width: 1280, height: 720 })

    await page.goto('http://localhost:4200'/*,{waitUntil : "networkidle2"}*/);
    
    await page.waitForSelector("highcharts-chart");

    const chartSelectors = ['#piecontainer', '#barcontainer1', '#barcontainer2'];

    const getScreenshots = []

    for (const selector of chartSelectors) {
      const targetElement = await page.$(selector);
      await targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const screenshot = await targetElement.screenshot({ encoding: 'base64' });
      getScreenshots.push(`data:image/png;base64,${screenshot}`);
    }

    await browser.close()


      let htmlContent = `
      <html>
        <head>
          <style>
          /*
            .flex-container {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              width: 100vw;
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
  
  let attachments = getScreenshots.map((image, index) => {
    const imageBuffer = Buffer.from(image.split(",")[1], "base64");
    htmlContent += `
      <div class="scroll-container">
        <img src="cid:highchartImage${index}" alt="Highchart${index}"/>
      </div>
      `;
    return {
      filename: `highchart${index}.png`,
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

  }
  catch(err){
    console.error("Error capturing screenshot or sending email:", err);
    res.status(500).send("Internal server error");
  }
})

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
