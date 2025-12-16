import Container from "../../Components/Shared/Container/Container";
import { Truck, Package, MapPin, CheckCircle } from "lucide-react";

export default function Process() {
  const steps = [
    {
      icon: <Truck className="w-10 h-10 text-red-500" />,
      title: "Create Order",
      desc: "Place orders individually or in bulk for your online store.",
    },
    {
      icon: <Package className="w-10 h-10 text-red-500" />,
      title: "Pickup from Seller",
      desc: "Riders collect parcels from your warehouse, office or home.",
    },
    {
      icon: <MapPin className="w-10 h-10 text-red-500" />,
      title: "In Transit",
      desc: "Parcels move through hubs across Bangladesh with live tracking.",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-red-500" />,
      title: "Delivered & COD Settled",
      desc: "Consignee receives the parcel and your COD is settled on time.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className=" mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How Your <span className="text-red-500">Parcels Move</span>
          </h2>
          <p className="text-gray-600 mb-12">
            A simple, transparent process from order creation to on‑time COD
            settlement built for Bangladeshi e‑commerce merchants.
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
