import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { JobApplicationData } from "@/services/firebaseService";

interface ViewJobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: JobApplicationData | null;
}

const ViewJobApplicationModal = ({ isOpen, onClose, application }: ViewJobApplicationModalProps) => {
  if (!application) return null;

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Job Application Details</span>
            <Badge className={getStatusColor(application.status)}>
              {application.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <p className="text-gray-900 font-medium">{application.fullName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Age</label>
                <p className="text-gray-900">{application.age} years</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-gray-900">{application.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <p className="text-gray-900">{application.phone}</p>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Position Applied For</label>
                <p className="text-gray-900 font-medium">{application.position}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Experience</label>
                <p className="text-gray-900">{application.experience} years</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">Qualification</label>
                <p className="text-gray-900">{application.qualification}</p>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          {application.message && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Details</h3>
              <p className="text-gray-900 whitespace-pre-wrap">{application.message}</p>
            </div>
          )}

          {/* Submission Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Submission Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Application ID</label>
                <p className="text-gray-900 font-mono text-sm">{application.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Submitted At</label>
                <p className="text-gray-900">{formatDate(application.submittedAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Current Status</label>
                <Badge className={getStatusColor(application.status)}>
                  {application.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewJobApplicationModal;