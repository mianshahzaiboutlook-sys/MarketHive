import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-600 to-blue-800">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">{children}</div>
    </div>
  );
}
