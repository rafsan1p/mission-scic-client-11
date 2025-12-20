import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Shield, Users, Ban, CheckCircle } from "lucide-react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/users");
      let filteredUsers = res.data;
      
      if (filter !== 'all') {
        filteredUsers = res.data.filter(user => user.status === filter);
      }
      
      setUsers(filteredUsers);
    } catch(err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);
  
  const handleStatusChange = async (email, status) => {
    try {
      const res = await axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`);
      if (res.data.modifiedCount > 0) {
        toast.success(`User ${status === 'active' ? 'unblocked' : 'blocked'} successfully!`);
        fetchUsers();
      }
    } catch(err) {
      toast.error('Failed to update status');
    }
  };

  const handleRoleChange = async (email, role) => {
    try {
      const res = await axiosSecure.patch('/update/user/role', { email, role });
      if (res.data.modifiedCount > 0) {
        toast.success(`User role updated to ${role}!`);
        fetchUsers();
      }
    } catch(err) {
      toast.error('Failed to update role');
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: 'badge badge-error',
      volunteer: 'badge badge-info',
      donor: 'badge badge-success'
    };
    return badges[role] || 'badge';
  };

  return (
    <div className="p-3 lg:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">All Users</h1>
        
        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          >
            All Users
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`btn btn-sm ${filter === 'active' ? 'btn-success' : 'btn-outline'}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('blocked')}
            className={`btn btn-sm ${filter === 'blocked' ? 'btn-error' : 'btn-outline'}`}
          >
            Blocked
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-lg">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Blood Group</th>
                <th>Location</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={user?.mainPhotoUrl}
                              alt="Avatar"
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user?.name}</div>
                          <div className="text-sm opacity-50">{user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-error text-white font-bold">
                        {user?.blood}
                      </span>
                    </td>
                    <td>
                      <div className="text-sm">
                        {user?.upazila}, {user?.district}
                      </div>
                    </td>
                    <td>
                      <span className={getRoleBadge(user?.role)}>
                        {user?.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${user?.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                        {user?.status}
                      </span>
                    </td>
                    <td>
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-xs">
                          ⋮
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                          {/* Status Change */}
                          {user?.status === 'active' ? (
                            <li>
                              <button
                                onClick={() => handleStatusChange(user?.email, 'blocked')}
                                className="text-error"
                              >
                                <Ban className="w-4 h-4" />
                                Block User
                              </button>
                            </li>
                          ) : (
                            <li>
                              <button
                                onClick={() => handleStatusChange(user?.email, 'active')}
                                className="text-success"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Unblock User
                              </button>
                            </li>
                          )}

                          {/* Role Changes */}
                          {user?.role !== 'volunteer' && (
                            <li>
                              <button
                                onClick={() => handleRoleChange(user?.email, 'volunteer')}
                                className="text-info"
                              >
                                <Users className="w-4 h-4" />
                                Make Volunteer
                              </button>
                            </li>
                          )}

                          {user?.role !== 'admin' && (
                            <li>
                              <button
                                onClick={() => handleRoleChange(user?.email, 'admin')}
                                className="text-warning"
                              >
                                <Shield className="w-4 h-4" />
                                Make Admin
                              </button>
                            </li>
                          )}

                          {user?.role !== 'donor' && (
                            <li>
                              <button
                                onClick={() => handleRoleChange(user?.email, 'donor')}
                              >
                                <Users className="w-4 h-4" />
                                Make Donor
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;