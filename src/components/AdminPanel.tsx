import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Users,
  Briefcase,
  Eye,
  Trash2,
  Download,
  Search,
  Filter,
  Calendar,
  LogOut,
  User,
  RefreshCw,
  FileText,
  Building2
} from "lucide-react";
import {
  jobApplicationsService,
  guardRequestsService,
  JobApplicationData,
  GuardRequestData
} from "@/services/firebaseService";
import { generateQuotation } from "@/services/quotationService";
import ViewJobApplicationModal from "./ViewJobApplicationModal";
import ViewGuardRequestModal from "./ViewGuardRequestModal";
import ClientManagement from "./ClientManagement";
import RateManagement from "./RateManagement";
import RateInitializer from "./RateInitializer";
import { seedDefaultClients } from "@/utils/seedClients";



const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<"job-applications" | "guard-requests" | "clients" | "rates">("job-applications");
  const [searchTerm, setSearchTerm] = useState("");
  const [jobApplications, setJobApplications] = useState<JobApplicationData[]>([]);
  const [guardRequests, setGuardRequests] = useState<GuardRequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobApplication, setSelectedJobApplication] = useState<JobApplicationData | null>(null);
  const [selectedGuardRequest, setSelectedGuardRequest] = useState<GuardRequestData | null>(null);
  const [isJobApplicationModalOpen, setIsJobApplicationModalOpen] = useState(false);
  const [isGuardRequestModalOpen, setIsGuardRequestModalOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobApps, guardReqs] = await Promise.all([
        jobApplicationsService.getAll(),
        guardRequestsService.getAll()
      ]);
      setJobApplications(jobApps);
      setGuardRequests(guardReqs);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJobApplication = async (id: string) => {
    try {
      await jobApplicationsService.delete(id);
      setJobApplications(prev => prev.filter(app => app.id !== id));
      toast({
        title: "Success",
        description: "Job application deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting job application:", error);
      toast({
        title: "Error",
        description: "Failed to delete job application.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteGuardRequest = async (id: string) => {
    try {
      await guardRequestsService.delete(id);
      setGuardRequests(prev => prev.filter(req => req.id !== id));
      toast({
        title: "Success",
        description: "Guard request deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting guard request:", error);
      toast({
        title: "Error",
        description: "Failed to delete guard request.",
        variant: "destructive",
      });
    }
  };



  const handleSeedClients = async () => {
    try {
      const seeded = await seedDefaultClients();
      toast({
        title: seeded ? "Clients Seeded" : "Clients Already Exist",
        description: seeded ? "Default clients have been added to the database" : "Clients already exist in the database",
      });
    } catch (error) {
      toast({
        title: "Seed Failed",
        description: "Failed to seed default clients",
        variant: "destructive",
      });
    }
  };

  const handleJobApplicationStatusUpdate = async (id: string, newStatus: JobApplicationData['status']) => {
    try {
      await jobApplicationsService.updateStatus(id, newStatus);
      setJobApplications(prev =>
        prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
      );
      toast({
        title: "Status Updated",
        description: `Job application status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating job application status:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleGuardRequestStatusUpdate = async (id: string, newStatus: GuardRequestData['status']) => {
    try {
      await guardRequestsService.updateStatus(id, newStatus);
      setGuardRequests(prev =>
        prev.map(req => req.id === id ? { ...req, status: newStatus } : req)
      );
      toast({
        title: "Status Updated",
        description: `Guard request status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating guard request status:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleViewJobApplication = (application: JobApplicationData) => {
    setSelectedJobApplication(application);
    setIsJobApplicationModalOpen(true);
  };

  const handleViewGuardRequest = (request: GuardRequestData) => {
    setSelectedGuardRequest(request);
    setIsGuardRequestModalOpen(true);
  };

  const handleDownloadQuotation = async (request: GuardRequestData) => {
    try {
      await generateQuotation(request);
      toast({
        title: "Quotation Downloaded",
        description: "Professional quotation has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Error generating quotation:', error);
      toast({
        title: "Download Failed",
        description: "Failed to generate quotation. Please try again.",
        variant: "destructive",
      });
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-orange-100 text-orange-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredJobApplications = jobApplications.filter(app =>
    app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGuardRequests = guardRequests.filter(req =>
    req.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.guardDesignation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-start">
          <div className="flex items-center gap-6">
            <div className="w-32 h-32">
              <img
                src="/ashoklogo.png"
                alt="Ashok Security Services Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Ashok Security Services</h1>
              <p className="text-gray-600">Manage job applications and guard requests</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{currentUser?.email}</span>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Job Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{jobApplications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Guard Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{guardRequests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {[...jobApplications, ...guardRequests].filter(item => item.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {jobApplications.length + guardRequests.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("job-applications")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "job-applications"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Job Applications ({jobApplications.length})
              </button>
              <button
                onClick={() => setActiveTab("guard-requests")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "guard-requests"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Guard Requests ({guardRequests.length})
              </button>
              <button
                onClick={() => setActiveTab("clients")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "clients"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Client Management
              </button>
              <button
                onClick={() => setActiveTab("rates")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "rates"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Rate Management
              </button>
            </nav>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={fetchData}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleSeedClients}>
            <Building2 className="h-4 w-4" />
            Seed Clients
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Content */}
        {activeTab === "job-applications" && (
          <Card>
            <CardHeader>
              <CardTitle>Job Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading...</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Position</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Experience</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredJobApplications.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-gray-500">
                            No job applications found
                          </td>
                        </tr>
                      ) : (
                        filteredJobApplications.map((app) => (
                          <tr key={app.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-gray-900">{app.fullName}</p>
                                <p className="text-sm text-gray-500">Age: {app.age}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <p className="text-sm text-gray-900">{app.email}</p>
                                <p className="text-sm text-gray-500">{app.phone}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-sm text-gray-900">{app.position}</p>
                              <p className="text-sm text-gray-500">{app.qualification}</p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-sm text-gray-900">{app.experience} years</p>
                            </td>
                            <td className="py-3 px-4">
                              <Select
                                value={app.status}
                                onValueChange={(value) => app.id && handleJobApplicationStatusUpdate(app.id, value as JobApplicationData['status'])}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="accepted">Accepted</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-sm text-gray-500">{formatDate(app.submittedAt)}</p>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewJobApplication(app)}
                                  title="View Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => app.id && handleDeleteJobApplication(app.id)}
                                  title="Delete Application"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "guard-requests" && (
          <Card>
            <CardHeader>
              <CardTitle>Guard Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading...</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Requirements</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGuardRequests.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-gray-500">
                            No guard requests found
                          </td>
                        </tr>
                      ) : (
                        filteredGuardRequests.map((req) => (
                          <tr key={req.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-gray-900">{req.companyName}</p>
                                <p className="text-sm text-gray-500">{req.contactPerson}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <p className="text-sm text-gray-900">{req.email}</p>
                                <p className="text-sm text-gray-500">{req.phone}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <p className="text-sm text-gray-900">{req.numberOfGuards} Guards</p>
                                <p className="text-sm text-gray-500">{req.guardDesignation}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-sm text-gray-900">{req.location}</p>
                            </td>
                            <td className="py-3 px-4">
                              <Select
                                value={req.status}
                                onValueChange={(value) => req.id && handleGuardRequestStatusUpdate(req.id, value as GuardRequestData['status'])}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="accepted">Accepted</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-sm text-gray-500">{formatDate(req.submittedAt)}</p>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewGuardRequest(req)}
                                  title="View Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDownloadQuotation(req)}
                                  title="Download Quotation"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => req.id && handleDeleteGuardRequest(req.id)}
                                  title="Delete Request"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "clients" && <ClientManagement />}

        {activeTab === "rates" && (
          <div className="space-y-6">
            <RateInitializer />
            <RateManagement />
          </div>
        )}

        {/* View Modals */}
        <ViewJobApplicationModal
          isOpen={isJobApplicationModalOpen}
          onClose={() => setIsJobApplicationModalOpen(false)}
          application={selectedJobApplication}
        />

        <ViewGuardRequestModal
          isOpen={isGuardRequestModalOpen}
          onClose={() => setIsGuardRequestModalOpen(false)}
          request={selectedGuardRequest}
        />
      </div>
    </div>
  );
};

export default AdminPanel;