"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaUserPlus } from "react-icons/fa";
import React from "react";
import { useRouter } from "next/navigation";

// Komponen untuk Form (dipisah agar lebih rapi)
const UserForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:8000/api/register", formData);
      onSuccess(); // Panggil callback jika sukses
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New User</h2>
        {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 bg-gray-50 outline-none text-black" placeholder="Full Name" />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 bg-gray-50 outline-none text-black" placeholder="Email Address" />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 bg-gray-50 outline-none text-black" placeholder="Password" />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Access Status</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-black">
              <option value="admin">Admin</option>
              <option value="bk">Bk</option>
               {/* Sesuaikan role lain jika ada */}
            </select>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onCancel} className="py-2 px-4 rounded-lg font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="py-2 px-4 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// Komponen Utama
export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "bk">("all");
  const [editUser, setEditUser] = useState(null);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/users");
      const formattedUsers = res.data.map(user => ({
        ...user,
        access_status: user.role.charAt(0).toUpperCase() + user.role.slice(1)
      }));
      setUsers(formattedUsers);
    } catch (err) {
      setError("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) {
      router.replace("/Welcome");
      return;
    }
    let userObj;
    try {
      userObj = JSON.parse(user);
    } catch {
      router.replace("/Welcome");
      return;
    }
    if (!userObj.role || userObj.role !== "admin") {
      router.replace("/Welcome");
    }
  }, [router]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFormSuccess = () => {
    setShowForm(false);
    fetchUsers();
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${userId}`);
        setUsers(users.filter((user) => user.id !== userId)); 
      } catch (err) {
        alert("Failed to delete user.");
      }
    }
  };

  // Edit: tampilkan form edit
  const handleEdit = (user) => {
    setEditUser(user);
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/users/${editUser.id}`, editUser);
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      alert("Failed to update user.");
    }
  };

  // Filter users sesuai filterRole dan search
  const filteredUsers =
  (filterRole === "all"
    ? users.filter(user => user.role === "admin" || user.role === "bk")
    : users.filter(user => user.role === filterRole)
  ).filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {showForm && <UserForm onSuccess={handleFormSuccess} onCancel={() => setShowForm(false)} />}

      {/* Form Edit User */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit User</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editUser.name}
                  onChange={e => setEditUser({ ...editUser, name: e.target.value })}
                  required
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50 outline-none text-black"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editUser.email}
                  onChange={e => setEditUser({ ...editUser, email: e.target.value })}
                  required
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50 outline-none text-black"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Role</label>
                <select
                  name="role"
                  value={editUser.role}
                  onChange={e => setEditUser({ ...editUser, role: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-black"
                >
                  <option value="admin">Admin</option>
                  <option value="bk">BK</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => setEditUser(null)} className="py-2 px-4 rounded-lg font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 transition">
                  Cancel
                </button>
                <button type="submit" className="py-2 px-4 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All User</h1>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-gray-50 outline-none text-black"
          />
          <button
            onClick={() => setFilterRole("all")}
            className={`py-2 px-4 rounded-lg font-semibold ${filterRole === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} transition`}
          >
            All
          </button>
          <button
            onClick={() => setFilterRole("admin")}
            className={`py-2 px-4 rounded-lg font-semibold ${filterRole === "admin" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} transition`}
          >
            Admin
          </button>
          <button
            onClick={() => setFilterRole("bk")}
            className={`py-2 px-4 rounded-lg font-semibold ${filterRole === "bk" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} transition`}
          >
            BK
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition"
          >
            <FaUserPlus />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-1/12"></th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Role</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="5" className="text-center py-4">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan="5" className="text-center py-4 text-red-500">{error}</td></tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <button onClick={() => handleEdit(user)} className="text-gray-500 hover:text-blue-600 transition">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="text-gray-500 hover:text-red-600 transition">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-800">{user.access_status}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-800">{user.email}</div>
                  </td>
                </tr>
              ))
            )}
            {!loading && filteredUsers.length === 0 && (
                <tr><td colSpan="5" className="text-center py-4">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}