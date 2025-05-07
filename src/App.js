import { useState } from "react";

const pages = [
  { id: "dashboard", label: "Dashboard" },
  { id: "finder", label: "Aid Finder" },
  { id: "tracker", label: "Application Tracker" },
  { id: "profile", label: "Profile" },
];

export default function StudentAidNavigatorWireframe() {
  const [active, setActive] = useState("dashboard");
  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-56 bg-sky-600 text-white flex flex-col p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Student Aid Nav</h1>
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={`text-left rounded px-3 py-2 transition hover:bg-sky-700 ${
              active === p.id ? "bg-sky-800" : ""
            }`}
          >
            {p.label}
          </button>
        ))}
      </aside>

      {/* Main content area */}
      <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
        <Header />
        {active === "dashboard" && <Dashboard />}
        {active === "finder" && <Finder />}
        {active === "tracker" && <Tracker />}
        {active === "profile" && <Profile />}
      </main>
    </div>
  );
}

// --- UI sections ---
const Card = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow p-6 w-full md:w-1/2 xl:w-1/3">
    <h2 className="text-lg font-semibold mb-3">{title}</h2>
    {children}
  </div>
);

function Header() {
  return (
    <header className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold text-sky-700">{pages.find(p => p.id === "dashboard").label}</h2>
      <button className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition">Log Out</button>
    </header>
  );
}

function Dashboard() {
  return (
    <section className="flex flex-wrap gap-6">
      <Card title="Quick Eligibility Check">
        <p className="text-sm text-gray-600 mb-4">Answer a few questions to see matching aid programs.</p>
        <button className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition">Start Check</button>
      </Card>
      <Card title="Upcoming Deadlines">
        <ul className="text-sm space-y-2">
          <li className="flex justify-between"><span>Campus Pantry</span><span>Oct 15</span></li>
          <li className="flex justify-between"><span>Emergency Aid</span><span>Nov 1</span></li>
        </ul>
      </Card>
      <Card title="Feedback Score">
        <p className="text-5xl font-bold text-sky-600 text-center">4.5</p>
        <p className="text-center text-sm text-gray-500">out of 5</p>
      </Card>
    </section>
  );
}

function Finder() {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Browse Aid Programs</h3>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow">
            <h4 className="font-semibold mb-2">Program {i}</h4>
            <p className="text-sm text-gray-600 mb-4">Brief description of eligibility & benefits.</p>
            <button className="bg-sky-600 text-white px-3 py-2 rounded hover:bg-sky-700 transition w-full">Apply</button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Tracker() {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Application Status</h3>
      <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Program</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Last Update</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {[
            { name: "Campus Pantry", status: "Approved", date: "25 Sep 25" },
            { name: "Emergency Aid", status: "Pending", date: "23 Sep 25" },
          ].map((row) => (
            <tr key={row.name} className="odd:bg-slate-50">
              <td className="px-4 py-2">{row.name}</td>
              <td className="px-4 py-2">{row.status}</td>
              <td className="px-4 py-2">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function Profile() {
  return (
    <section className="max-w-lg mx-auto bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-semibold mb-4">My Profile</h3>
      <div className="space-y-4 text-sm text-gray-700">
        <p><span className="font-medium">Name: </span>Test Student</p>
        <p><span className="font-medium">Major: </span>Computer Science</p>
        <p><span className="font-medium">Aid Applications: </span>5 submitted</p>
      </div>
    </section>
  );
}