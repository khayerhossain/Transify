import Image from "next/image";
import Link from "next/link";
// import Rider from "@/assets/become-a-rider.jpeg";
import Container from "../../Components/Shared/Container/Container";

export default function BecomeDeliveryMan() {
  return (
    <section className="bg-red-50/60 py-16">
      <Container>
        <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-100">
          {/* Left Content */}
          <div className="md:w-1/2 p-10 flex flex-col justify-center h-full space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 w-max">
              Earn with every delivery
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              Become a <span className="text-red-500">Rider Partner</span>
            </h2>
            <p className="text-gray-600">
              Join our nationwide delivery network and earn more with flexible
              hours, weekly payouts, and priority support from the operations
              team.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="bg-red-50 rounded-xl px-3 py-2">
                <p className="font-semibold text-red-600">Flexible shifts</p>
                <p>Work when it fits your schedule.</p>
              </div>
              <div className="bg-red-50 rounded-xl px-3 py-2">
                <p className="font-semibold text-red-600">On-time payouts</p>
                <p>Fast, transparent rider payments.</p>
              </div>
            </div>
            <Link
              href="/be-a-rider"
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition cursor-pointer text-center w-full md:w-auto shadow-md"
            >
              Apply as Rider
            </Link>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center items-center h-full bg-red-50">
            <Image
              src="/hero-person-1.png"
              alt="Delivery Person"
              width={320}
              height={230}
              className="rounded-2xl pt-6"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
