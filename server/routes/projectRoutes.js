import express from "express";
import { generatePDF } from "../helper/html2pdf.js";


const router=express.Router();

router.post("/generate-pdf", async (req, res) => {
  try {
    const buffer = await generatePDF(req.body);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="referral-letter.pdf"'
    });

    res.send(buffer);

  } catch (err) {
    res.status(500).send("PDF Generation Failed");
  }
});


export default router;