import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';

export const generatePDF = async (elementId, fileName) => {
  try {
    const element = document.getElementById(elementId);
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    const pdf = new jsPDF('p', 'mm', 'a4');
    let currentPage = 1;

    // Add header with logo and date
    pdf.setFontSize(22);
    pdf.setTextColor(33, 150, 243); // Primary color
    pdf.text('Image-e-Nation', 20, 20);
    
    pdf.setFontSize(12);
    pdf.setTextColor(100);
    pdf.text(`Generated on: ${format(new Date(), 'PPP')}`, 20, 30);
    pdf.text('Health Report Summary', 20, 40);

    // Add the converted canvas content
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 60, imgWidth, imgHeight);

    // Add page numbers
    pdf.setFontSize(10);
    pdf.setTextColor(150);
    pdf.text(`Page ${currentPage}`, imgWidth - 20, pageHeight - 10);

    // If content spans multiple pages
    while (heightLeft >= pageHeight) {
      position = heightLeft - pageHeight;
      pdf.addPage();
      currentPage++;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.text(`Page ${currentPage}`, imgWidth - 20, pageHeight - 10);
      heightLeft -= pageHeight;
    }

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};
