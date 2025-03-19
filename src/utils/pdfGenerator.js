
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import html2pdf from 'html2pdf.js';

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




export const sharePDF = async (elementId, filename, type = 'blob') => {
  const element = document.getElementById(elementId);
  const opt = {
    margin: 1,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  try {
    if (type === 'blob') {
      return await html2pdf().set(opt).from(element).output('blob');
    } else if (type === 'datauri') {
      return await html2pdf().set(opt).from(element).output('datauristring');
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};