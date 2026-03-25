"use client";

import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome to Collabden</p>
          </div>
          <Link 
            href={ROUTES.HOME}
            className="px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-black transition-all"
          >
            Go Home
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-48 animate-pulse" />
          ))}
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-96 flex items-center justify-center">
            <p className="text-gray-400 font-medium">Dashboard content coming soon...</p>
        </div>
      </div>
    </div>
  );
}
