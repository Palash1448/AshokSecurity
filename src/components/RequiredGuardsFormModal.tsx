import { useState, ChangeEvent, FormEvent } from "react";
import { guardRequestsService } from "@/services/firebaseService";
import { generateQuotation } from "@/services/quotationService";
import { sendQuotationToWhatsApp } from "@/services/whatsappService";
import { useToast } from "@/components/ui/use-toast";

interface RequiredGuardsFormData {
  companyName: string;
  contactPerson: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  numberOfGuards: string;
  guardDesignation: string;
  district: string;
  location: string;
  message: string;
}

// Maharashtra districts
const MAHARASHTRA_DISTRICTS = [
  "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", 
  "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", 
  "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", 
  "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", 
  "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", 
  "Washim", "Yavatmal"
];

const RequiredGuardsFormModal = () => {
  const [formData, setFormData] = useState<RequiredGuardsFormData>({
    companyName: "",
    contactPerson: "",
    phone: "",
    whatsappNumber: "",
    email: "",
    numberOfGuards: "",
    guardDesignation: "",
    district: "",
    location: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await guardRequestsService.create(formData);
      
      let quotationGenerated = false;
      let whatsappSent = false;
      
      // Generate and download quotation
      try {
        await generateQuotation(formData);
        quotationGenerated = true;
        console.log('Quotation generated successfully');
      } catch (quotationError) {
        console.error('Error generating quotation:', quotationError);
      }
      
      // Send quotation via WhatsApp if WhatsApp number is provided
      if (formData.whatsappNumber) {
        try {
          whatsappSent = await sendQuotationToWhatsApp(formData);
          console.log('WhatsApp quotation sent:', whatsappSent);
        } catch (whatsappError) {
          console.error('Error sending WhatsApp quotation:', whatsappError);
        }
      }
      
      // Show appropriate success message based on what was completed
      let successMessage = "Your guard requirement has been received. Our team will contact you soon.";
      
      if (quotationGenerated && whatsappSent) {
        successMessage = "Your guard requirement has been received! Professional quotation has been downloaded and sent to your WhatsApp. Our team will contact you soon.";
      } else if (quotationGenerated) {
        successMessage = "Your guard requirement has been received and professional quotation has been downloaded. Our team will contact you soon.";
      } else if (whatsappSent) {
        successMessage = "Your guard requirement has been received and quotation has been sent to your WhatsApp. Our team will contact you soon.";
      }
      
      toast({
        title: "Request Submitted Successfully!",
        description: successMessage,
      });

      // Reset form
      setFormData({
        companyName: "",
        contactPerson: "",
        phone: "",
        whatsappNumber: "",
        email: "",
        numberOfGuards: "",
        guardDesignation: "",
        district: "",
        location: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting guard request:", error);
      const errorMessage = error instanceof Error ? error.message : "There was an error submitting your request. Please try again.";
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-muted-foreground"
        >
          Company / Organization Name
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter your company or organization name"
          required
          className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="contactPerson"
          className="block text-sm font-medium text-muted-foreground"
        >
          Contact Person
        </label>
        <input
          id="contactPerson"
          name="contactPerson"
          type="text"
          value={formData.contactPerson}
          onChange={handleChange}
          placeholder="Enter contact person's name"
          required
          className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-muted-foreground"
        >
          Contact Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter contact number"
          required
          className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="whatsappNumber"
          className="block text-sm font-medium text-muted-foreground"
        >
          WhatsApp Number
        </label>
        <input
          id="whatsappNumber"
          name="whatsappNumber"
          type="tel"
          value={formData.whatsappNumber}
          onChange={handleChange}
          placeholder="Enter WhatsApp number"
          className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-muted-foreground"
        >
          Email ID
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email id"
          className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="numberOfGuards"
          className="block text-sm font-medium text-muted-foreground"
        >
          Number of Guards Required
        </label>
        <input
          id="numberOfGuards"
          name="numberOfGuards"
          type="number"
          min={1}
          value={formData.numberOfGuards}
          onChange={handleChange}
          placeholder="e.g., 5"
          required
          className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="guardDesignation"
          className="block text-sm font-medium text-muted-foreground"
        >
          Guard Designation
        </label>
        <select
          id="guardDesignation"
          name="guardDesignation"
          value={formData.guardDesignation}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
        >
          <option value="">Select guard designation</option>
          <option value="Security Officer">Security Officer</option>
          <option value="Security Supervisor">Security Supervisor</option>
          <option value="Security Guard">Security Guard</option>
          <option value="Lady Guard">Lady Guard</option>
          <option value="Housekeeping (Male)">Housekeeping (Male)</option>
          <option value="Housekeeping (Female)">Housekeeping (Female)</option>
          <option value="Car Parking Guard">Car Parking Guard</option>
        </select>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="district"
          className="block text-sm font-medium text-muted-foreground"
        >
          District
        </label>
        <select
          id="district"
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
        >
          <option value="">Select district</option>
          {MAHARASHTRA_DISTRICTS.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-muted-foreground"
        >
          Site Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter location of deployment"
          className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-muted-foreground"
        >
          Additional Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Share timing, duration, or any specific requirements"
          className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center rounded-md bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium shadow-sm hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Requirement"}
      </button>
    </form>
  );
};

export default RequiredGuardsFormModal;