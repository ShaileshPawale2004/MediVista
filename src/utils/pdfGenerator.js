import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (contentId, fileName) => {
  try {
    const content = document.getElementById(contentId);
    if (!content) {
      console.error("Element not found for PDF generation");
      return false;
    }

    const canvas = await html2canvas(content, { scale: 2 }); // Increase scale for better quality
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm

    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
};
