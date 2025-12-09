import React from "react";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";

function Profile() {
  const [auth] = useAuth();
  const user = auth?.user;
  console.log("Profile user data:", user);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

        {/* Profile Card */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Pic */}
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-md border border-gray-200">
            <img
              src={
                user?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-xl font-semibold text-gray-800">
                {user?.username}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="text-lg text-gray-700">{user?.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  user?.isAdmin
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user?.isAdmin ? "Admin" : "Custmer"}
              </span>
            </div>


            {/* Edit Profile Button */}
            <Link
              to="/edit-profile"
              className="inline-block mt-4 px-5 py-3 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-lg shadow"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
