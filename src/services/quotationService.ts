import jsPDF from 'jspdf';
import { GuardRequestData } from './firebaseService';

// Rate data interface (matching RateManagement)
interface RateData {
  id?: string;
  guardType: string;
  hourlyRate: number;
  monthlyRate: number;
  description: string;
  district?: string;
  createdAt?: any;
  updatedAt?: any;
}

// Function to get rates from Rate Management system
const getRatesFromStorage = (): RateData[] => {
  try {
    const stored = localStorage.getItem('securityRates');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error fetching rates from storage:', error);
    return [];
  }
};

// Fallback pricing data (used if no rates are set in Rate Management)
const FALLBACK_PRICING_DATA = {
  'Security Officer': { dailyRate: 520, hourlyRate: 65, monthlyRate: 15600, type: 'Security Officer', district: undefined },
  'Security Supervisor': { dailyRate: 520, hourlyRate: 65, monthlyRate: 15600, type: 'Security Supervisor', district: undefined },
  'Security Guard': { dailyRate: 520, hourlyRate: 65, monthlyRate: 15600, type: 'Security Guard', district: undefined },
  'Lady Guard': { dailyRate: 520, hourlyRate: 65, monthlyRate: 15600, type: 'Lady Guard', district: undefined },
  'Housekeeping (Male)': { dailyRate: 520, hourlyRate: 65, monthlyRate: 15600, type: 'Housekeeping (Male)', district: undefined },
  'Housekeeping (Female)': { dailyRate: 520, hourlyRate: 65, monthlyRate: 15600, type: 'Housekeeping (Female)', district: undefined },
  'Car Parking Guard': { dailyRate: 520, hourlyRate: 65, monthlyRate: 15600, type: 'Car Parking Guard', district: undefined }
};

const getGuardTypeRate = (guardDesignation: string, district?: string) => {
  // First, try to get rates from Rate Management system
  const rates = getRatesFromStorage();

  // Try to find rate for specific guard type and district
  let rateData = rates.find(rate =>
    rate.guardType === guardDesignation &&
    rate.district === district
  );

  // If no district-specific rate found, try to find any rate for the guard type
  if (!rateData) {
    rateData = rates.find(rate => rate.guardType === guardDesignation);
  }

  if (rateData) {
    // Calculate daily rate from hourly rate (8 hours per day)
    const dailyRate = rateData.hourlyRate * 8;
    return {
      dailyRate: dailyRate,
      hourlyRate: rateData.hourlyRate,
      monthlyRate: rateData.monthlyRate,
      type: rateData.description || guardDesignation,
      district: rateData.district
    };
  }

  // Fallback to hardcoded rates if not found in Rate Management
  return FALLBACK_PRICING_DATA[guardDesignation as keyof typeof FALLBACK_PRICING_DATA] || FALLBACK_PRICING_DATA['Security Guard'];
};

export const generateQuotation = async (formData: Omit<GuardRequestData, 'id' | 'submittedAt' | 'status'>) => {
  try {
    // Create PDF with optimization settings for minimal file size
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
      putOnlyUsedFonts: true
    });
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;

    // Add company logo
    try {
      // Function to load and compress image as base64
      const loadImageAsBase64 = (src: string): Promise<string> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = function (this: HTMLImageElement) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Optimize image size for PDF - reduce dimensions for smaller file size
            const maxWidth = 120;
            const maxHeight = 120;

            let width = this.width;
            let height = this.height;

            // Calculate new dimensions maintaining aspect ratio
            if (width > height) {
              if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width = (width * maxHeight) / height;
                height = maxHeight;
              }
            }

            canvas.width = width;
            canvas.height = height;

            // Use better image rendering
            if (ctx) {
              ctx.imageSmoothingEnabled = true;
              ctx.imageSmoothingQuality = 'medium';
              ctx.drawImage(this, 0, 0, width, height);
            }

            // Use JPEG with compression for smaller file size
            const dataURL = canvas.toDataURL('image/jpeg', 0.7);
            resolve(dataURL);
          };
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = src;
        });
      };

      // Try to load the actual logo
      try {
        const logoData = await loadImageAsBase64('/ashoklogo.png');
        // Use JPEG format and smaller size for reduced file size
        doc.addImage(logoData, 'JPEG', 15, 10, 25, 25); // Reduced size from 30x30 to 25x25
      } catch (logoError) {
        // Try alternative path
        try {
          const logoData = await loadImageAsBase64('./public/ashoklogo.png');
          doc.addImage(logoData, 'JPEG', 15, 10, 25, 25); // Reduced size
        } catch (altError) {
          // Fallback to optimized text logo
          console.log('Logo loading failed, using text fallback');
          doc.setFillColor(255, 255, 255);
          doc.circle(27.5, 22.5, 10, 'F'); // Smaller circle
          doc.setDrawColor(0, 0, 0);
          doc.setLineWidth(0.3); // Thinner line
          doc.circle(27.5, 22.5, 10, 'S');
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(7); // Smaller font
          doc.setFont('helvetica', 'bold');
          doc.text('ASHOK', 27.5, 20, { align: 'center' });
          doc.setFontSize(5);
          doc.text('SECURITY', 27.5, 23.5, { align: 'center' });
          doc.setFontSize(4);
          doc.text('SERVICES', 27.5, 26.5, { align: 'center' });
        }
      }

    } catch (error) {
      console.log('Logo loading failed, using text fallback');
      // Fallback to optimized text logo
      doc.setFillColor(255, 255, 255);
      doc.circle(27.5, 22.5, 10, 'F'); // Smaller circle
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.3); // Thinner line
      doc.circle(27.5, 22.5, 10, 'S');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(7); // Smaller font
      doc.setFont('helvetica', 'bold');
      doc.text('ASHOK', 27.5, 20, { align: 'center' });
      doc.setFontSize(5);
      doc.text('SECURITY', 27.5, 23.5, { align: 'center' });
      doc.setFontSize(4);
      doc.text('SERVICES', 27.5, 26.5, { align: 'center' });
    }

    // Header - optimized font sizes
    doc.setFontSize(16); // Reduced from 18
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('ASHOK SECURITY SERVICES', pageWidth / 2, 25, { align: 'center' });

    doc.setFontSize(12); // Reduced from 14
    doc.text('PROFESSIONAL QUOTATION', pageWidth / 2, 35, { align: 'center' });

    // Company Info - optimized
    doc.setFontSize(9); // Reduced from 10
    doc.setFont('helvetica', 'normal');
    doc.text('Gren Acres, Dhamni Road, Sangli - 416 416, Maharashtra, India', pageWidth / 2, 45, { align: 'center' });
    doc.text('Phone: +91 9665532950 | Email: ashoksecurities024@gmail.com', pageWidth / 2, 52, { align: 'center' });

    // Simplified line separator
    doc.setLineWidth(0.2); // Thinner line
    doc.line(margin, 60, pageWidth - margin, 60);

    // Client Information - optimized
    doc.setFontSize(11); // Reduced from 12
    doc.setFont('helvetica', 'bold');
    doc.text('CLIENT INFORMATION:', margin, 75);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9); // Reduced from 10
    let yPos = 85;
    doc.text(`Company: ${formData.companyName}`, margin, yPos);
    doc.text(`Contact Person: ${formData.contactPerson}`, margin, yPos + 8);
    doc.text(`Phone: ${formData.phone}`, margin, yPos + 16);
    doc.text(`Email: ${formData.email || 'N/A'}`, margin, yPos + 24);
    doc.text(`Location: ${formData.location || 'N/A'}`, margin, yPos + 32);

    // Requirement Summary - optimized
    yPos += 50;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11); // Reduced from 12
    doc.text('REQUIREMENT SUMMARY:', margin, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9); // Reduced from 10
    yPos += 10;
    doc.text(`Number of Guards Required: ${formData.numberOfGuards}`, margin, yPos);
    doc.text(`Guard Type: ${formData.guardDesignation}`, margin, yPos + 8);

    const guardInfo = getGuardTypeRate(formData.guardDesignation, formData.district);
    const numberOfGuards = parseInt(formData.numberOfGuards) || 1;
    const totalHourlyRate = guardInfo.hourlyRate * numberOfGuards;
    const totalDailyRate = guardInfo.dailyRate * numberOfGuards;
    const totalMonthlyRate = guardInfo.monthlyRate * numberOfGuards;

    yPos += 20;
    if (guardInfo.district) {
      doc.text(`District: ${guardInfo.district}`, margin, yPos);
      yPos += 8;
    }
    doc.text(`Rate per Guard per Hour: Rs. ${guardInfo.hourlyRate}`, margin, yPos);
    doc.text(`Rate per Guard per Day (8 hrs): Rs. ${guardInfo.dailyRate}`, margin, yPos + 8);
    doc.text(`Rate per Guard per Month: Rs. ${guardInfo.monthlyRate.toLocaleString()}`, margin, yPos + 16);

    yPos += 24;
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Hourly Cost (${numberOfGuards} guards): Rs. ${totalHourlyRate}`, margin, yPos);
    doc.text(`Total Daily Cost (${numberOfGuards} guards): Rs. ${totalDailyRate}`, margin, yPos + 8);
    doc.text(`Total Monthly Cost (${numberOfGuards} guards): Rs. ${totalMonthlyRate.toLocaleString()}`, margin, yPos + 16);
    doc.setFont('helvetica', 'normal');

    // Add new page for terms
    doc.addPage();

    // Terms and Conditions - optimized
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12); // Reduced from 14
    doc.text('TERMS AND CONDITIONS:-', margin, 30);

    yPos = 45;
    doc.setFontSize(9); // Reduced from 10

    const terms = [
      {
        number: '1.',
        title: 'Period of Contract:-',
        desc: 'The period of Contract should be kept be as one calendar year or on mutual agreement between the Company and the Agency.'
      },
      {
        number: '2.',
        title: 'Working Hours:-',
        desc: 'The Normal Duty Hours of the Security Personnel is 8 Hours. However, 8 Hourly Shifts also are arranged depending upon your specific requirement.'
      },
      {
        number: '3.',
        title: 'Reliever / Reliving Charges:-',
        desc: 'As per the statutory rule reliever for weekly off or compensation in lieu of weekly off is required to be paid to personnel.'
      },
      {
        number: '4.',
        title: 'Renewal / Termination of Contract:-',
        desc: 'A Letter of Renewal is required from the client at least 15 days prior to expiry of the existing contract period. However, either party can terminate the contract by giving one month notice or compensation in lieu thereof.'
      },
      {
        number: '5.',
        title: 'Re-employment:-',
        desc: 'You shall not employ our security personnel for a period of six months after termination of Our Contract.'
      }
    ];

    terms.forEach((term) => {
      // Term header with number and title
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 0, 0); // Red color for term numbers and titles
      doc.text(term.number, margin, yPos);
      doc.text(term.title, margin + 10, yPos);

      // Term description
      yPos += 8;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      const wrappedText = doc.splitTextToSize(term.desc, pageWidth - 2 * margin - 10);
      doc.text(wrappedText, margin + 5, yPos);

      // Calculate height based on wrapped text
      const textHeight = wrappedText.length * 5;
      yPos += textHeight + 10;
    });

    // Additional Terms - optimized
    yPos += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10); // Reduced from 12
    doc.text('ADDITIONAL TERMS:', margin, yPos);

    yPos += 15;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8); // Reduced from 9

    const additionalTerms = [
      '• Payment Terms: Monthly payment in advance. GST @ 18% extra (RCM applicable)',
      '• All guards are trained, licensed, and insured as per government regulations',
      '• 24/7 supervision and monitoring by experienced supervisors included',
      '• Immediate replacement provided for absent guards at no extra cost',
      '• Monthly performance reports and incident logs will be provided',
      '• All statutory compliances (ESI, EPF, Bonus, etc.) are included in the quoted rates'
    ];

    additionalTerms.forEach((term) => {
      const wrappedText = doc.splitTextToSize(term, pageWidth - 2 * margin - 10);
      doc.text(wrappedText, margin, yPos);
      yPos += wrappedText.length * 4 + 3;
    });

    // Footer - optimized
    yPos += 20;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10); // Reduced from 12
    doc.text('Thank you for considering Ashok Security Services!', pageWidth / 2, yPos, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8); // Reduced from 10
    doc.text('For any queries, please contact us at +91 9665532950', pageWidth / 2, yPos + 10, { align: 'center' });

    // Add date - optimized
    const currentDate = new Date().toLocaleDateString('en-IN');
    doc.text(`Quotation Date: ${currentDate}`, pageWidth / 2, yPos + 20, { align: 'center' });
    doc.text(`Valid until: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}`, pageWidth / 2, yPos + 27, { align: 'center' });

    // Generate filename
    const filename = `Quotation_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;

    // Check PDF size before saving
    const pdfOutput = doc.output('blob');
    const fileSizeInMB = pdfOutput.size / (1024 * 1024);

    console.log(`PDF size: ${fileSizeInMB.toFixed(2)} MB`);

    // If PDF is larger than 7MB (leaving buffer for 8MB limit), apply additional optimizations
    if (fileSizeInMB > 7) {
      console.warn('PDF size exceeds 7MB, applying additional optimizations...');

      // Create a new optimized PDF with minimal settings
      const optimizedDoc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
        precision: 0.5, // Even more aggressive precision reduction
        putOnlyUsedFonts: true,
        floatPrecision: 1
      });

      // Copy essential content only (without images if necessary)
      optimizedDoc.setFontSize(16);
      optimizedDoc.setFont('helvetica', 'bold');
      optimizedDoc.text('ASHOK SECURITY SERVICES', pageWidth / 2, 25, { align: 'center' });
      optimizedDoc.setFontSize(12);
      optimizedDoc.text('PROFESSIONAL QUOTATION', pageWidth / 2, 35, { align: 'center' });

      // Add essential content with minimal formatting
      optimizedDoc.setFontSize(10);
      optimizedDoc.setFont('helvetica', 'normal');
      let yPos = 50;

      optimizedDoc.text(`Company: ${formData.companyName}`, margin, yPos);
      optimizedDoc.text(`Contact: ${formData.contactPerson}`, margin, yPos + 8);
      optimizedDoc.text(`Phone: ${formData.phone}`, margin, yPos + 16);
      optimizedDoc.text(`Guards Required: ${formData.numberOfGuards}`, margin, yPos + 24);
      optimizedDoc.text(`Guard Type: ${formData.guardDesignation}`, margin, yPos + 32);

      const guardInfo = getGuardTypeRate(formData.guardDesignation, formData.district);
      const numberOfGuards = parseInt(formData.numberOfGuards) || 1;
      const totalMonthlyRate = guardInfo.monthlyRate * numberOfGuards;

      yPos += 50;
      optimizedDoc.setFont('helvetica', 'bold');
      optimizedDoc.text(`Total Monthly Cost: Rs. ${totalMonthlyRate.toLocaleString()}`, margin, yPos);

      // Save optimized version
      optimizedDoc.save(filename);
      console.log('Optimized PDF generated successfully');
    } else {
      // Save the original PDF if size is acceptable
      doc.save(filename);
      console.log('PDF generated successfully within size limits');
    }

    return filename;
  } catch (error) {
    console.error('Error generating quotation:', error);
    throw new Error('Failed to generate quotation PDF');
  }
};