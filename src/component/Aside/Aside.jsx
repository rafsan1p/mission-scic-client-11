import { Home, Users, Settings, BarChart3, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const navClass = ({ isActive }) =>
  `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
    isActive
      ? "bg-sky-500/20 text-sky-400 ring-1 ring-sky-500/30"
      : "text-slate-300 hover:text-white hover:bg-slate-800"
  }`;

export default function Aside() {
  return (
    <aside className="h-screen w-64 bg-slate-900 text-slate-100 flex flex-col shadow-xl">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-wide bg-linear-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow">
          AdminPanel
        </h1>
      </div>

      <div className="flex-1 px-3 py-4 space-y-1">
        <NavLink to="/dashboard/main" className={navClass}>
          <Home className="w-5 h-5" />
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/add-product" className={navClass}>
          <Home className="w-5 h-5" />
          Add Product
        </NavLink>

        <NavLink to="/dashboard/users" className={navClass}>
          <BarChart3 className="w-5 h-5" />
          Analytics
        </NavLink>

        <NavLink to="/users" className={navClass}>
          <Users className="w-5 h-5" />
          Users
        </NavLink>

        <NavLink to="/settings" className={navClass}>
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
