import { Home, Users, Settings, BarChart3, LogOut, PackagePlus, Menu, X, Users2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const navClass = ({ isActive }) =>
  `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
    isActive
      ? "bg-sky-500/20 text-sky-400 ring-1 ring-sky-500/30"
      : "text-slate-300 hover:text-white hover:bg-slate-800"
  }`;

  export default function Aside() {
  const [isOpen, setIsOpen] = useState(false);
  const {role} = useContext(AuthContext)
  const handleLogout = ()=>{
    signOut(auth)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 text-slate-100 flex flex-col shadow-xl z-40 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold tracking-wide bg-linear-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow">
            AdminPanel
          </h1>
        </div>

        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <NavLink to="/dashboard" end className={navClass} onClick={() => setIsOpen(false)}>
            <Home className="w-5 h-5" />
            Dashboard
          </NavLink>

          {
            role == 'donor' && (<NavLink to="/dashboard/add-request"
                className={navClass} onClick={() => setIsOpen(false)}>
                <PackagePlus className="w-5 h-5" />
                Add Request
              </NavLink>)
          }

          {
            role == 'admin' && (<NavLink to="/dashboard/all-users" className={navClass} onClick={() => setIsOpen(false)}><Users2 className="w-5 h-5" />All Users</NavLink>)
          }

          <NavLink to="/dashboard/manage-product" className={navClass} onClick={() => setIsOpen(false)}>
            <BarChart3 className="w-5 h-5" />
            Manage Product
          </NavLink>

          <NavLink to="/users" className={navClass} onClick={() => setIsOpen(false)}>
            <Users className="w-5 h-5" />
            Users
          </NavLink>

          <NavLink to="/settings" className={navClass} onClick={() => setIsOpen(false)}>
            <Settings className="w-5 h-5" />
            Settings
          </NavLink>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}