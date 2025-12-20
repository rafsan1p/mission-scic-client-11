import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Eye, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

const AllBloodDonationRequestAdmin = () => {
  const { role } = useContext(AuthContext);
  const [totalRequest, setTotalRequest] = useState(0);
  const [requests, setRequests] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(
        `/all-requests?page=${currentPage - 1}&size=${itemsPerPage}&status=${filter}`
      );
      setRequests(res.data.requests);
      setTotalRequest(res.data.totalRequest);
    } catch(err) {
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, itemsPerPage, filter]);

  const numberOfPages = Math.ceil(totalRequest / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDelete = async (id) => {
    // Only admins can delete
    if (role !== 'admin') {
      toast.error('Only admins can delete requests');
      return;
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/requests/${id}`);
        toast.success('Request deleted successfully!');
        fetchRequests();
      } catch(err) {
        toast.error('Failed to delete request');
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/requests/${id}/status`, { status });
      toast.success(`Status updated to ${status}!`);
      fetchRequests();
    } catch(err) {
      toast.error('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge badge-warning',
      inprogress: 'badge badge-info',
      done: 'badge badge-success',
      canceled: 'badge badge-error'
    };
    return badges[status] || 'badge';
  };

  return (
    <div className="p-3 lg:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          All Blood Donation Requests
        </h1>
        
        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`btn btn-sm ${filter === 'pending' ? 'btn-warning' : 'btn-outline'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('inprogress')}
            className={`btn btn-sm ${filter === 'inprogress' ? 'btn-info' : 'btn-outline'}`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter('done')}
            className={`btn btn-sm ${filter === 'done' ? 'btn-success' : 'btn-outline'}`}
          >
            Done
          </button>
          <button
            onClick={() => setFilter('canceled')}
            className={`btn btn-sm ${filter === 'canceled' ? 'btn-error' : 'btn-outline'}`}
          >
            Canceled
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-lg">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Requester</th>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Blood Group</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Donor Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-8 text-gray-500">
                      No requests found
                    </td>
                  </tr>
                ) : (
                  requests.map((request, index) => (
                    <tr key={request._id}>
                      <th>{(currentPage * itemsPerPage) + (index + 1) - itemsPerPage}</th>
                      <td>
                        <div className="text-xs">
                          <div className="font-semibold">{request.requester_name}</div>
                          <div className="text-gray-500">{request.requester_email}</div>
                        </div>
                      </td>
                      <td className="font-medium">{request.recipient_name}</td>
                      <td>
                        <div className="text-sm">
                          {request.recipient_district}, {request.recipient_upazila}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-error text-white font-bold">
                          {request.blood_group}
                        </span>
                      </td>
                      <td>{request.donation_date}</td>
                      <td>{request.donation_time}</td>
                      <td>
                        <span className={getStatusBadge(request.donation_status)}>
                          {request.donation_status}
                        </span>
                      </td>
                      <td>
                        {request.donor_info ? (
                          <div className="text-xs">
                            <div className="font-semibold">{request.donor_info.name}</div>
                            <div className="text-gray-500">{request.donor_info.email}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          {/* View Button */}
                          <Link
                            to={`/request-details/${request._id}`}
                            className="btn btn-xs btn-info text-white"
                            title="View Details"
                          >
                            <Eye className="w-3 h-3" />
                          </Link>

                          {/* Edit Button - Only admin */}
                          {role === 'admin' && (request.donation_status === 'pending' || request.donation_status === 'inprogress') && (
                            <Link
                              to={`/dashboard/edit-request/${request._id}`}
                              className="btn btn-xs btn-warning text-white"
                              title="Edit"
                            >
                              <Edit className="w-3 h-3" />
                            </Link>
                          )}

                          {/* Delete Button - Only admin */}
                          {role === 'admin' && (
                            <button
                              onClick={() => handleDelete(request._id)}
                              className="btn btn-xs btn-error text-white"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}

                          {/* Status Update Buttons */}
                          {request.donation_status === 'inprogress' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(request._id, 'done')}
                                className="btn btn-xs btn-success text-white"
                                title="Mark as Done"
                              >
                                <CheckCircle className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleStatusChange(request._id, 'canceled')}
                                className="btn btn-xs btn-error text-white"
                                title="Cancel"
                              >
                                <XCircle className="w-3 h-3" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {numberOfPages > 1 && (
            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="btn btn-sm"
              >
                Previous
              </button>
              {pages.map((page) => (
                <button
                  key={page}
                  className={`btn btn-sm ${
                    page === currentPage ? 'btn-primary' : 'btn-outline'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={handleNext}
                disabled={currentPage === pages.length}
                className="btn btn-sm"
              >
                Next
              </button>
            </div>
          )}

          {/* Permissions Info for Volunteer */}
          {role === 'volunteer' && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>Volunteer Permissions:</strong> You can view all requests and update donation status only. Edit and delete actions are restricted to admins.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllBloodDonationRequestAdmin;