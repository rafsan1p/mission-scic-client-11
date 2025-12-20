import { Home, Users, Settings, BarChart3, LogOut, PackagePlus, Menu, X, Users2, Droplet, DollarSign, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import toast from "react-hot-toast";

const navClass = ({ isActive }) =>
  `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
    isActive
      ? "bg-sky-500/20 text-sky-400 ring-1 ring-sky-500/30"
      : "text-slate-300 hover:text-white hover:bg-slate-800"
  }`;

export default function Aside() {
  const [isOpen, setIsOpen] = useState(false);
  const {role} = useContext(AuthContext);
  
  const handleLogout = () => {
    signOut(auth);
    toast.success('Logged out successfully!');
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
          <Droplet className="w-6 h-6 text-red-500 fill-red-500 mr-2" />
          <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow">
            BloodBridge
          </h1>
        </div>

        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {/* Common Routes */}
          <NavLink to="/dashboard" end className={navClass} onClick={() => setIsOpen(false)}>
            <Home className="w-5 h-5" />
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/profile" className={navClass} onClick={() => setIsOpen(false)}>
            <User className="w-5 h-5" />
            Profile
          </NavLink>

          {/* Donor Routes */}
          {role === 'donor' && (
            <>
              <NavLink to="/dashboard/add-request" className={navClass} onClick={() => setIsOpen(false)}>
                <PackagePlus className="w-5 h-5" />
                Create Request
              </NavLink>

              <NavLink to="/dashboard/my-request" className={navClass} onClick={() => setIsOpen(false)}>
                <BarChart3 className="w-5 h-5" />
                My Requests
              </NavLink>
            </>
          )}

          {/* Admin Routes */}
          {role === 'admin' && (
            <>
              <NavLink to="/dashboard/all-users" className={navClass} onClick={() => setIsOpen(false)}>
                <Users2 className="w-5 h-5" />
                All Users
              </NavLink>

              <NavLink to="/dashboard/all-blood-donation-request" className={navClass} onClick={() => setIsOpen(false)}>
                <Droplet className="w-5 h-5" />
                All Requests
              </NavLink>

              <NavLink to="/dashboard/funding" className={navClass} onClick={() => setIsOpen(false)}>
                <DollarSign className="w-5 h-5" />
                Funding
              </NavLink>
            </>
          )}

          {/* Volunteer Routes */}
          {role === 'volunteer' && (
            <>
              <NavLink to="/dashboard/all-blood-donation-request" className={navClass} onClick={() => setIsOpen(false)}>
                <Droplet className="w-5 h-5" />
                All Requests
              </NavLink>

              <NavLink to="/dashboard/funding" className={navClass} onClick={() => setIsOpen(false)}>
                <DollarSign className="w-5 h-5" />
                Funding
              </NavLink>
            </>
          )}

          {/* Divider */}
          <div className="border-t border-slate-800 my-4"></div>

          {/* Public Links */}
          <NavLink to="/donation-requests" className={navClass} onClick={() => setIsOpen(false)}>
            <Droplet className="w-5 h-5" />
            Browse Requests
          </NavLink>

          <NavLink to="/search-donors" className={navClass} onClick={() => setIsOpen(false)}>
            <Users className="w-5 h-5" />
            Search Donors
          </NavLink>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}