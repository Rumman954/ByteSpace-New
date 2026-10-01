import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const creators = [
  { name: "Ava Martinez", role: "Full-stack", students: "84k" },
  { name: "Emily Chen", role: "Product design", students: "41k" },
  { name: "John Smith", role: "Web development", students: "120k" },
  { name: "Sarah Johnson", role: "Data science", students: "67k" },
];

export default function CreatorsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h1 className="text-4xl font-extrabold text-dark-navy text-center mb-3">Meet our creators</h1>
        <p className="text-gray-500 text-center mb-10">Learn from practitioners who ship real products.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((creator) => (
            <div key={creator.name} className="rounded-2xl border border-gray-100 p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary-blue text-white mx-auto flex items-center justify-center text-xl font-bold mb-4">
                {creator.name[0]}
              </div>
              <h3 className="font-bold text-dark-navy">{creator.name}</h3>
              <p className="text-sm text-gray-500">{creator.role}</p>
              <p className="text-xs text-primary-blue mt-2">{creator.students} students</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
