import { useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

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
      <aside className="w-56 bg-sky-600 text-white flex flex-col p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Student Aid Nav</h1>
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

      <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
        <Header page={pages.find((p) => p.id === active).label} />
        {active === "dashboard" && <Dashboard />}
        {active === "finder" && <Finder />}
        {active === "tracker" && <Tracker />}
        {active === "profile" && <Profile />}
      </main>
    </div>
  );
}

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow p-6 ${className}`}>
    <h2 className="text-lg font-semibold mb-3">{title}</h2>
    {children}
  </div>
);

function Header({ page }) {
  return (
    <header className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold text-sky-700">{page}</h2>
      <button className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition">Log Out</button>
    </header>
  );
}

const awards = [
  { name: "Emergency Aid", value: 1200, color: "#0284c7" },
  { name: "Campus Pantry", value: 800, color: "#38bdf8" },
  { name: "Housing Grant", value: 1000, color: "#7dd3fc" },
];

const usedPrograms = [
  { name: "Emergency Aid", rating: 5 },
  { name: "Campus Pantry", rating: 4 },
  { name: "Housing Grant", rating: 4 },
];

function Stars({ rating }) {
  return (
    <span className="text-yellow-400">
      {[...Array(5).keys()].map((i) => (
        <span key={i} className={i < rating ? "" : "text-gray-300"}>★</span>
      ))}
    </span>
  );
}

function Dashboard() {
  const handleEligibilityCheck = () => alert('Eligibility check started');
  return (
    <>
      <div className="mb-6">
        <button onClick={handleEligibilityCheck} className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition">
          Start Eligibility Check
        </button>
      </div>
      <section className="flex flex-wrap gap-6">
        <Card title="Eligible Awards" className="w-full xl:w-1/2">
          <ul className="text-sm space-y-2 mb-4">
            {awards.map((a) => (
              <li key={a.name} className="flex justify-between">
                <span>{a.name}</span>
                <span className="font-semibold text-sky-600">${a.value.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <PieChart width={320} height={180} className="mx-auto">
            <Pie data={awards} dataKey="value" outerRadius={70} label={false} labelLine={false}>
              {awards.map((a) => (
                <Cell key={a.name} fill={a.color} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" iconType="circle" height={36} />
          </PieChart>
        </Card>

        <Card title="Upcoming Deadlines" className="flex-1 min-w-[260px]">
          <ul className="text-sm space-y-2">
            <li className="flex justify-between"><span>Campus Pantry</span><span>-</span></li>
            <li className="flex justify-between"><span>Emergency Aid</span><span>Nov 1</span></li>
          </ul>
        </Card>

        <Card title="Rate Your Aid Experience" className="w-full">
          <table className="min-w-full text-sm mb-4">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="pb-2">Program</th>
                <th className="pb-2">Your Rating</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {usedPrograms.map((p) => (
                <tr key={p.name} className="odd:bg-slate-50">
                  <td className="py-2 pr-4">{p.name}</td>
                  <td className="py-2 pr-4"><Stars rating={p.rating} /></td>
                  <td className="py-2">
                    <button className="text-sky-600 hover:underline">Give feedback</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>
    </>
  );
}

function Finder() {
  const programs = [
    { id: 1, name: "Campus Pantry", rating: 4.6 },
    { id: 2, name: "Emergency Aid", rating: 4.2 },
    { id: 3, name: "Housing Grant", rating: 4.1 },
    { id: 4, name: "Wellness Fund", rating: 3.9 },
  ];
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Browse Aid Programs</h3>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {programs.map(({ id, name, rating }) => (
          <div key={id} className="bg-white p-5 rounded-xl shadow space-y-3 hover:ring-2 hover:ring-sky-200 transition">
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-gray-600">Review benefits & conditions.</p>
            <p className="text-sm text-sky-600 font-medium">Rating {rating}/5</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition text-xs md:text-sm">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Tracker() {
  const apps = [
    { name: "Campus Pantry", status: "Approved", date: "25 Sep 25" },
    { name: "Emergency Aid", status: "Pending", date: "21 Sep 25" },
    { name: "Housing Grant", status: "Under Review", date: "19 Sep 25" },
  ];
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Application Status</h3>
      <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Program</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Last Update</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {apps.map((a) => (
            <tr key={a.name} className="odd:bg-slate-50">
              <td className="px-4 py-2">{a.name}</td>
              <td className="px-4 py-2">{a.status}</td>
              <td className="px-4 py-2">{a.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function Profile() {
  const handleEdit = () => alert('Edit profile clicked');
  return (
    <section className="space-y-4 relative">
      <button onClick={handleEdit} className="absolute top-0 right-0 bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700 transition text-sm">
        Edit
      </button>
      <Card title="Student Profile">
        <p className="text-sm text-gray-600">Name: Alex Johnson</p>
        <p className="text-sm text-gray-600">Email: alex.j@umd.edu</p>
        <p className="text-sm text-gray-600">Major: Computer Science</p>
      </Card>
      <Card title="Account Preferences">
        <p className="text-sm">Notification settings, saved applications, and more will go here.</p>
      </Card>
    </section>
  );
}