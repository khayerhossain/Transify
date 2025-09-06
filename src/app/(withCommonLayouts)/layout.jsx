import { Toaster } from "react-hot-toast";

const layout = ({ children }) => {
  return (
    <div>
      <div className="min-h-screen">
        {children} <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default layout;
