import { useState, ChangeEvent, FormEvent } from "react";
import { jobApplicationsService } from "@/services/firebaseService";
import { useToast } from "@/components/ui/use-toast";

interface JobOpeningsFormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  qualification: string;
  age: string;
  message: string;
}

const JobOpeningsForm = () => {
  const [formData, setFormData] = useState<JobOpeningsFormData>({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    qualification: "",
    age: "",
    message: "",
  });
  const [documents, setDocuments] = useState<File[]>([]);
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const newFiles = Array.from(files);
    setDocuments((prev) => [...prev, ...newFiles]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    console.log('Submitting job application:', formData);

    try {
      const result = await jobApplicationsService.create(formData);
      console.log('Job application submitted successfully:', result);
      
      toast({
        title: "Application Submitted Successfully!",
        description: "We have received your job application. Our HR team will review it and contact you soon.",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        qualification: "",
        age: "",
        message: "",
      });
      setDocuments([]);
    } catch (error) {
      console.error("Error submitting job application:", error);
      const errorMessage = error instanceof Error ? error.message : "There was an error submitting your application. Please try again.";
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
    <section className="bg-white rounded-2xl shadow-md border border-border/60 p-6 mb-8">
      <h2 className="text-2xl font-bold text-secondary mb-4">Job Openings</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-muted-foreground"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-muted-foreground"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
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
            placeholder="Enter your contact number"
            required
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="position"
            className="block text-sm font-medium text-muted-foreground"
          >
            Position Applied For
          </label>
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
          >
            <option value="">Select position</option>
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
            htmlFor="experience"
            className="block text-sm font-medium text-muted-foreground"
          >
            Experience (Years)
          </label>
          <input
            id="experience"
            name="experience"
            type="number"
            min={0}
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g., 3"
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="qualification"
            className="block text-sm font-medium text-muted-foreground"
          >
            Qualification
          </label>
          <input
            id="qualification"
            name="qualification"
            type="text"
            value={formData.qualification}
            onChange={handleChange}
            placeholder="e.g., 12th Pass, Graduate, Ex-serviceman"
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-muted-foreground"
          >
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            min={18}
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="documents"
            className="block text-sm font-medium text-muted-foreground"
          >
            Upload CV / Qualification Documents
          </label>
          <input
            id="documents"
            name="documents"
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/90"
          />
          {documents.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {documents.length} file(s) selected
            </p>
          )}
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
            placeholder="Share relevant experience or questions"
            className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-md bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium shadow-sm hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </section>
  );
};

export default JobOpeningsForm;
