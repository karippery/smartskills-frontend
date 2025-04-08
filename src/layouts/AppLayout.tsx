import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );