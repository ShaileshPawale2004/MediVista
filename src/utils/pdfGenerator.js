
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (contentId, fileName) => {
  try {
    const content = document.getElementById(contentId);
    if (!content) {
      console.error("Element not found for PDF generation");
      return false;
    }

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm

    const canvas = await html2canvas(content, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const imgWidth = pdfWidth; // Keep width same as A4
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Scale the image to fit within one page
    const finalHeight = Math.min(imgHeight, pdfHeight); // Prevents overflow

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, finalHeight);
    pdf.save(fileName);
    
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
};
