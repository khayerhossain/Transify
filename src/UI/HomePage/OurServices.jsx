import Container from "../../Components/Shared/Container/Container";
import { Truck, Package, Clock, MapPin, Shield, Phone } from "lucide-react";

export default function OurServices() {
  const services = [
    {
      icon: <Truck className="w-10 h-10 text-red-500" />,
      title: "Nationwide Doorstep Delivery",
      desc: "Standard and express delivery from Dhaka to all 64 districts.",
    },
    {
      icon: <Package className="w-10 h-10 text-red-500" />,
      title: "E‑commerce & Merchant Delivery",
      desc: "Optimised for online shops with bulk order support and easy uploads.",
    },
    {
      icon: <Clock className="w-10 h-10 text-red-500" />,
      title: "Same‑Day City Delivery",
      desc: "In‑city same‑day and next‑day delivery options for urgent parcels.",
    },
    {
      icon: <MapPin className="w-10 h-10 text-red-500" />,
      title: "Live Tracking & Notifications",
      desc: "End‑to‑end tracking with SMS and dashboard updates for every order.",
    },
    {
      icon: <Shield className="w-10 h-10 text-red-500" />,
      title: "Secure COD Management",
      desc: "Cash‑on‑delivery collection with transparent, timely settlements.",
    },
    {
      icon: <Phone className="w-10 h-10 text-red-500" />,
      title: "Dedicated Merchant Support",
      desc: "Support team focused on helping your business scale deliveries.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900">
            Solutions for{" "}
            <span className="text-red-500">Modern E‑commerce Delivery</span>
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mt-4 mb-12">
            From small home‑based shops to large marketplaces, streamline your
            last‑mile logistics with reliable delivery, COD handling and
            real‑time visibility.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition"
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
