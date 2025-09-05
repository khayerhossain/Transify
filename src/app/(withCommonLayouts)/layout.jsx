import Navbar from "../../Components/Shared/Navbar/Navbar";
import Footer from "../../Components/Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        {children} <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Footer />
    </div>
  );
};

export default layout;
