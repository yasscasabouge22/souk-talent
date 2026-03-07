import { RouterProvider } from "react-router";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "../contexts/AuthContext";
import { router } from "./routes";

export default function App() {
  return (
    <div className="min-h-screen bg-[#191414]">
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </div>
  );
}