"use client";

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

interface Profile {
  username: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
 
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile>({
    username: "",
    email: "",
    phone: "",
    address: "",
    gender: ""
    
  });

  // ✅ Fetch profile when page loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();

        if (res.ok && data.user) {
          setProfile(data.user);
          if (data.user.image) setPreviewImage(data.user.image);
        } else {
          toast.error("Failed to load profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ✅ Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
      setProfile({ ...profile }); // save base64 in state
    };
    reader.readAsDataURL(file);
  };

  // ✅ Save or toggle edit
  const handleToggleEdit = async () => {
    if (isEditing) {
      try {
        console.log("Saving profile:", profile);
        const res = await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        });

        const data = await res.json();

        if (res.ok) {
          setProfile(data.user);
          toast.success("Profile updated successfully!");
        } else {
          toast.error(data.message || "Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Something went wrong!");
      }
    }
    setIsEditing(!isEditing);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-6 sm:p-10">
        {/* Profile Image + Name */}
        <div className="flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-14 h-14 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
              </svg>
            )}
          </div>

          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2 text-sm text-gray-500"
            />
          )}

          {isEditing ? (
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              className="mt-4 text-xl font-semibold text-gray-800 text-center border-b border-gray-300 focus:outline-none"
            />
          ) : (
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              {profile.username}
            </h2>
          )}
        </div>

        {/* Contact Information */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">
            Contact Information
          </h3>
          <div className="mt-4 space-y-2 text-sm">
            <div>
              <span className="font-medium">Email:</span>{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-indigo-600 hover:underline ml-1"
              >
                {profile.email}
              </a>
            </div>
            <div>
              <span className="font-medium">Phone:</span>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="border-b border-gray-300 focus:outline-none ml-2"
                />
              ) : (
                profile.phone || "Not added"
              )}
            </div>
            <div>
              <span className="font-medium">Address:</span>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="border-b border-gray-300 focus:outline-none ml-2"
                />
              ) : (
                profile.address || "Not added"
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">
            Basic Information
          </h3>
          <div className="mt-4 space-y-2 text-sm">
            <div>
              <span className="font-medium">Gender:</span>{" "}
              {isEditing ? (
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className="ml-2 border border-gray-300 rounded px-2 py-1 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                profile.gender || "Not Selected"
              )}
            </div>
          </div>
        </div>

        {/* Edit / Save Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleToggleEdit}
            className="px-6 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
          >
            {isEditing ? "Save Information" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}
