import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Add logo and header to the report
const addReportHeader = (doc, title) => {
  // Add app logo (you can replace this with your own logo)
  // doc.addImage(logoUrl, 'PNG', 14, 10, 30, 30);
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(44, 62, 80); // Dark blue color
  doc.text(title, 14, 22);
  
  // Add date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 30);
  
  // Add divider line
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 35, 196, 35);
};

// Add footer with page number
const addFooter = (doc) => {
  const pageCount = doc.internal.getNumberOfPages();
  
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Page ${i} of ${pageCount} | Neighbor Link Community Platform`, 14, 285);
  }
};

export { addReportHeader, addFooter };