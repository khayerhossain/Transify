import Container from "../../Components/Shared/Container/Container";

export default function StatsSection() {
  const stats = [
    { label: "Districts Covered", value: "64+" },
    { label: "Upazilas Served", value: "490+" },
    { label: "Parcels Delivered / Day", value: "50K+" },
    { label: "Merchants Trust Us", value: "10K+" },
  ];

  return (
    <section className="bg-white py-10 border-y border-gray-100">
      <Container>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((item) => (
              <div
                key={item.label}
                className="text-center rounded-2xl bg-gray-50 border border-gray-100 px-4 py-6 shadow-sm"
              >
                <p className="text-2xl md:text-3xl font-extrabold text-red-600">
                  {item.value}
                </p>
                <p className="mt-2 text-xs md:text-sm font-medium text-gray-600">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}






