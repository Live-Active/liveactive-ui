import puppeteer from "puppeteer";

/**
 * Generates a PDF Buffer using Puppeteer.
 * @param {Object} data - Object containing name, ageGender, and symptoms.
 * @returns {Buffer} PDF file buffer
 */
export const generatePDF = async (data) => {
  const { name, ageGender, symptoms, joint = "the affected area",testType  } = data;
  const formattedDate = new Date().toLocaleDateString("en-GB");

  const html = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            font-size: 16px;
            line-height: 1.6;
          }

          .logo-container {
            text-align: center;
            margin-bottom: 10px;
          }

          .logo {
            width: 300px;
          }

          .line {
            border-top: 1px solid #000;
            margin: 20px 0;
          }

          .doctor-section {
            text-align: left;
            margin-bottom: 20px;
          }

          .doctor-name {
            color: #1b944b;
            font-weight: bold;
            margin-bottom: 0;
          }

          .doctor-details {
            margin-top: 0;
          }

          .section {
            margin-top: 40px;
            text-align: left;
          }

          .footer {
            font-size: 12px;
            margin-top: 60px;
            border-top: 1px solid #ccc;
            padding-top: 10px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="logo-container">
          <img class="logo" src="https://www.liveactive.co.in/img/logoHd.png" />
        </div>

        <div class="line"></div>

        <div class="doctor-section">
          <p class="doctor-name">Anuja Dalvi</p>
          <p class="doctor-details">
            Master of Musculoskeletal & Sports Physiotherapy – Australia<br />
            Consultant Physiotherapist, Sports & Manual therapist
          </p>

          <p class="doctor-name">Niranjan Pandit</p>
          <p class="doctor-details">
            Master of Musculoskeletal Physiotherapy – K.E.M. Hospital, Mumbai<br />
            Consultant Physiotherapist, Sports & Manual therapist
          </p>
        </div>

        <div class="line"></div>

        <p><strong>Date: ${formattedDate}</strong></p>

        <div class="section">
          <p><strong>To,<br />The Radiologist,</strong></p>
          <p>
        Referring <strong>${name}</strong>, <strong>${ageGender}</strong>, for a ${testType} of <strong>${joint}</strong>.
            ${symptoms}
          </p>
          <p>
            Kindly perform on ${testType} for <strong>${joint}</strong>.
          </p>
          <p>Please do the needful.</p>
          <br />
          <p>Regards,<br />Team LiveActive</p>
        </div>

        <div class="footer">
          Clinic address: 1/Ground Floor, Jai Kutir, Taikalwadi, Near Starcity Cinema, Mumbai – 400 016<br />
          Mobile: +91 7506040780<br />
          E-mail: <a href="mailto:liveactivephysiotherapy@gmail.com">liveactivephysiotherapy@gmail.com</a><br />
          Instagram: @physio_liveactive
        </div>
      </body>
    </html>
  `;




  try {
    const browser = await puppeteer.launch({ headless: "new" }); // adjust for hosting if needed
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "40px", bottom: "40px", left: "40px", right: "40px" }
    });

    await browser.close();
    return pdfBuffer;

  } catch (error) {
    console.error("PDF generation failed:", error);
    throw new Error("Failed to generate PDF");
  }
};
