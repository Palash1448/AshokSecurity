import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { GuardRequestData } from "@/services/firebaseService";

interface ViewGuardRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: GuardRequestData | null;
}

const ViewGuardRequestModal = ({ isOpen, onClose, request }: ViewGuardRequestModalProps) => {
  if (!request) return null;

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
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
            <span>Guard Request Details</span>
            <Badge className={getStatusColor(request.status)}>
              {request.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Company Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Company Name</label>
                <p className="text-gray-900 font-medium">{request.companyName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Contact Person</label>
                <p className="text-gray-900">{request.contactPerson}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-gray-900">{request.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <p className="text-gray-900">{request.phone}</p>
              </div>
              {request.whatsappNumber && (
                <div>
                  <label className="text-sm font-medium text-gray-600">WhatsApp Number</label>
                  <p className="text-gray-900">{request.whatsappNumber}</p>
                </div>
              )}
            </div>
          </div>

          {/* Requirement Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirement Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Number of Guards</label>
                <p className="text-gray-900 font-medium text-lg">{request.numberOfGuards}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Guard Designation</label>
                <p className="text-gray-900 font-medium">{request.guardDesignation}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">Site Location</label>
                <p className="text-gray-900">{request.location}</p>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          {request.message && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Details</h3>
              <p className="text-gray-900 whitespace-pre-wrap">{request.message}</p>
            </div>
          )}

          {/* Submission Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Submission Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Request ID</label>
                <p className="text-gray-900 font-mono text-sm">{request.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Submitted At</label>
                <p className="text-gray-900">{formatDate(request.submittedAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Current Status</label>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewGuardRequestModal;