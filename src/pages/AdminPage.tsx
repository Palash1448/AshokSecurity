import AdminPanel from "@/components/AdminPanel";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAutoLogout } from "@/hooks/useAutoLogout";

const AdminPage = () => {
  // Enable auto-logout when navigating away from admin page
  useAutoLogout();

  return (
    <ProtectedRoute>
      <AdminPanel />
    </ProtectedRoute>
  );
};

export default AdminPage;