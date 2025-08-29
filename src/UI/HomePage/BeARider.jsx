import Image from "next/image";
import Link from "next/link";
import Rider from "../../assets/become-a-rider.jpeg";
import Container from "@/Components/Shared/Container/Container";

export default function BecomeDeliveryMan() {
  return (
    <section className="bg-gray-50 py-16">
      <Container>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Left Content */}
            <div className="md:w-1/2 p-10 flex flex-col justify-center h-full">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Become a <span className="text-red-500">Rider</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Join our team and start earning by delivering parcels in your
                city. Flexible hours, supportive team, and instant payouts.
              </p>
              <Link
                href="/become-delivery"
                className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer text-center w-full md:w-auto"
              >
                Join Now
              </Link>
            </div>

            {/* Right Image */}
            <div className="md:w-1/2 flex justify-center items-center h-full">
              <Image
                src={Rider}
                alt="Delivery Person"
                width={290}
                height={210}
                className="rounded-2xl pt-0 lg:pt-8"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
