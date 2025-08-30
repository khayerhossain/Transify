import Container from "../../Components/Shared/Container/Container";
import { Truck, Package, MapPin, CheckCircle } from "lucide-react";

export default function Process() {
  const steps = [
    {
      icon: <Truck className="w-10 h-10 text-red-500" />,
      title: "Schedule Pickup",
      desc: "Request a pickup at your convenient time, right from your doorstep.",
    },
    {
      icon: <Package className="w-10 h-10 text-red-500" />,
      title: "Package Handling",
      desc: "Our team safely packs and prepares your parcel for shipment.",
    },
    {
      icon: <MapPin className="w-10 h-10 text-red-500" />,
      title: "In Transit",
      desc: "Track your parcel in real-time as it moves through our network.",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-red-500" />,
      title: "Delivered",
      desc: "Your parcel arrives safely at the recipient's address.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It <span className="text-red-500">Works</span>
          </h2>
          <p className="text-gray-600 mb-12">
            Our delivery process is simple and transparent, ensuring your parcel
            reaches safely.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
