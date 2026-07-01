import { GuardRequestData } from './firebaseService';

// Rate data interface
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

// Get rate for specific guard type and district
const getGuardRate = (guardDesignation: string, district?: string) => {
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
    return {
      hourlyRate: rateData.hourlyRate,
      monthlyRate: rateData.monthlyRate,
      description: rateData.description,
      district: rateData.district
    };
  }

  // Fallback rates if not found in Rate Management (using base rates from Sangli/Solapur/Satara)
  const fallbackRates: { [key: string]: any } = {
    'Security Officer': { hourlyRate: 65, monthlyRate: 15600 },
    'Security Supervisor': { hourlyRate: 65, monthlyRate: 15600 },
    'Security Guard': { hourlyRate: 65, monthlyRate: 15600 },
    'Lady Guard': { hourlyRate: 65, monthlyRate: 15600 },
    'Housekeeping (Male)': { hourlyRate: 65, monthlyRate: 15600 },
    'Housekeeping (Female)': { hourlyRate: 65, monthlyRate: 15600 },
    'Car Parking Guard': { hourlyRate: 65, monthlyRate: 15600 }
  };

  return fallbackRates[guardDesignation] || fallbackRates['Security Guard'];
};

// Format phone number for WhatsApp (remove + and ensure country code)
const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  let cleaned = phone.replace(/\D/g, '');

  // If it starts with 91 (India country code), keep as is
  if (cleaned.startsWith('91')) {
    return cleaned;
  }

  // If it's a 10-digit number, add India country code
  if (cleaned.length === 10) {
    return '91' + cleaned;
  }

  // If it starts with 0, remove it and add country code
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    return '91' + cleaned.substring(1);
  }

  return cleaned;
};

// Generate quotation message text
const generateQuotationMessage = (request: Omit<GuardRequestData, 'id' | 'submittedAt' | 'status'>): string => {
  const guardRate = getGuardRate(request.guardDesignation, request.district);
  const numberOfGuards = parseInt(request.numberOfGuards) || 1;
  const totalHourlyRate = guardRate.hourlyRate * numberOfGuards;
  const totalMonthlyRate = guardRate.monthlyRate * numberOfGuards;

  return `🛡️ *ASHOK SECURITY SERVICES*
*Professional Security Quotation*

Dear ${request.contactPerson},

Thank you for your inquiry regarding security services for ${request.companyName}.

📋 *Your Requirements:*
• Number of Guards: ${request.numberOfGuards}
• Guard Designation: ${request.guardDesignation}
• District: ${request.district}
• Location: ${request.location}

💰 *Pricing Details:*${guardRate.district ? `\n• District: ${guardRate.district}` : ''}
• Rate per Guard per Hour: ₹${guardRate.hourlyRate}
• Rate per Guard per Month: ₹${guardRate.monthlyRate.toLocaleString()}

*Total Cost for ${numberOfGuards} Guard(s):*
• Hourly: ₹${totalHourlyRate}
• Monthly: ₹${totalMonthlyRate.toLocaleString()}

✅ *Service Includes:*
• 24/7 Security Coverage
• Trained & Certified Personnel
• Real-time Supervision
• Immediate Replacement for Absent Guards

📞 *Next Steps:*
Our team will contact you within 2 hours to discuss:
• Final pricing confirmation
• Service commencement timeline
• Contract terms and conditions
• Site assessment scheduling

🏢 *About Us:*
Government Approved Security Agency
Serving since 2008 | 400+ Guards Deployed
18 Districts Covered | 4.9/5 Client Satisfaction

📱 *Contact Information:*
Phone: +91 96655 32950
Email: ashoksecurityservices08@gmail.com

*We Protect Your Business*

Best regards,
Ashok Security Services Team`;
};

// Send quotation via WhatsApp Web
export const sendQuotationToWhatsApp = async (request: Omit<GuardRequestData, 'id' | 'submittedAt' | 'status'>): Promise<boolean> => {
  if (!request.whatsappNumber) {
    console.log('No WhatsApp number provided, skipping WhatsApp quotation');
    return false;
  }

  try {
    const formattedPhone = formatPhoneNumber(request.whatsappNumber);
    const message = generateQuotationMessage(request);
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp Web URL
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, '_blank');

    console.log('WhatsApp quotation opened for:', formattedPhone);
    return true;
  } catch (error) {
    console.error('Error opening WhatsApp quotation:', error);
    return false;
  }
};

// Test function to verify WhatsApp functionality
export const testWhatsAppQuotation = async (testPhone: string = '919112491779'): Promise<boolean> => {
  try {
    const testRequest: GuardRequestData = {
      companyName: 'Test Company',
      contactPerson: 'Test User',
      phone: testPhone,
      whatsappNumber: testPhone,
      email: 'test@example.com',
      numberOfGuards: '5',
      guardDesignation: 'Security Guard',
      district: 'Test District',
      location: 'Test Location',
      message: 'This is a test quotation request',
      submittedAt: new Date() as any,
      status: 'pending'
    };

    return await sendQuotationToWhatsApp(testRequest);
  } catch (error) {
    console.error('WhatsApp test failed:', error);
    return false;
  }
};