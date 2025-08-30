import Container from "../../Components/Shared/Container/Container";
import { Truck, Package, Clock, MapPin, Shield, Phone } from "lucide-react";

export default function OurServices() {
  const services = [
    {
      icon: <Truck className="w-10 h-10 text-red-500" />,
      title: "Fast Delivery",
      desc: "Quick and reliable parcel delivery to your doorstep.",
    },
    {
      icon: <Package className="w-10 h-10 text-red-500" />,
      title: "Secure Packaging",
      desc: "Your parcels are packed with extra care and safety.",
    },
    {
      icon: <Clock className="w-10 h-10 text-red-500" />,
      title: "On-Time Service",
      desc: "We value your time with guaranteed on-time delivery.",
    },
    {
      icon: <MapPin className="w-10 h-10 text-red-500" />,
      title: "Real-Time Tracking",
      desc: "Track your parcels live anytime, anywhere.",
    },
    {
      icon: <Shield className="w-10 h-10 text-red-500" />,
      title: "Safe & Secure",
      desc: "Ensuring safety with trusted handling and transport.",
    },
    {
      icon: <Phone className="w-10 h-10 text-red-500" />,
      title: "24/7 Support",
      desc: "Our team is always here to help you out anytime.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900">
            Our <span className="text-red-500">Services</span>
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mt-4 mb-12">
            We provide reliable and affordable parcel delivery across the
            country. From doorstep pickup to real-time tracking, we’ve got you
            covered.
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
