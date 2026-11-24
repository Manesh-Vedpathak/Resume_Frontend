import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaFileAlt,
  FaPlusCircle,
  FaUserCircle,
  FaSignOutAlt,
  FaChartBar,
  FaBars,
  FaTimes
} from "react-icons/fa";

import api from "../service/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [resumes, setResumes] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/login", { replace: true });
      return;
    }

    setUser({
      name: localStorage.getItem("fullName") || "User"
    });

    const loadDashboard = async () => {
      try {
        const response = await api.get(`/personal/user/${userId}`);
        const allResumes = response.data || [];

        setResumes(allResumes);

        if (allResumes.length === 0) {
          setProfileCompletion(0);
          return;
        }

        const completionValues = await Promise.all(
          allResumes.map(async (resume) => {
            try {
              const personalResponse = await api.get(
                `/personal/${resume.id}`
              );

              const personal = personalResponse.data || {};

              const fields = [
                personal.firstName,
                personal.lastName,
                personal.email,
                personal.phone,
                personal.address,
                personal.linkedin,
                personal.github,
                personal.summary
              ];

              const completed = fields.filter(
                (field) =>
                  field &&
                  field.toString().trim() !== ""
              ).length;

              return Math.round(
                (completed / fields.length) * 100
              );
            } catch (error) {
              console.error(
                `Profile calculation error for resume ${resume.id}:`,
                error
              );
              return 0;
            }
          })
        );

        const total = completionValues.reduce(
          (sum, value) => sum + value,
          0
        );

        setProfileCompletion(
          Math.round(total / completionValues.length)
        );
      } catch (error) {
        console.error("Dashboard loading error:", error);
      }
    };

    loadDashboard();
  }, [navigate]);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const createResume = () => {
    const temporaryKeys = [
      "personalId",
      "personal",
      "education",
      "experience",
      "skills",
      "projects",
      "certifications",
      "languages"
    ];

    temporaryKeys.forEach((key) => {
      localStorage.removeItem(key);
    });

    closeSidebar();
    navigate("/personal");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("personalId");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullName");

    closeSidebar();
    navigate("/", { replace: true });
  };

  return (
    <div className="dashboard">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
      >
        <div className="sidebar-heading">
          <h2 className="logo">Resume Builder</h2>

          <button
            type="button"
            className="sidebar-close"
            onClick={closeSidebar}
            aria-label="Close navigation menu"
          >
            <FaTimes />
          </button>
        </div>

        <ul>
          <li
            onClick={() => {
              closeSidebar();
              navigate("/dashboard");
            }}
          >
            <FaHome />
            <span>Dashboard</span>
          </li>

          <li onClick={createResume}>
            <FaPlusCircle />
            <span>Create Resume</span>
          </li>

          <li
            onClick={() => {
              closeSidebar();
              navigate("/my-resumes");
            }}
          >
            <FaFileAlt />
            <span>My Resumes</span>
          </li>

          <li
            onClick={() => {
              closeSidebar();
              navigate("/analytics");
            }}
          >
            <FaChartBar />
            <span>Analytics</span>
          </li>
        </ul>

        <button
          type="button"
          className="logout-btn"
          onClick={logout}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Topbar */}
        <div className="topbar">

          <button
            type="button"
            className="dashboard-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
          >
            <FaBars />
          </button>

          <h2>
            Welcome,{" "}
            {user.name || localStorage.getItem("fullName") || "User"}
          </h2>

        </div>

        {/* Dashboard Cards */}
        <div className="row dashboard-cards">

          <div className="col-md-4">
            <div className="dashboard-card">
              <FaFileAlt className="card-icon blue" />
              <h3>{resumes.length}</h3>
              <p>Total Resumes</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="dashboard-card">
              <FaUserCircle className="card-icon green" />
              <h3>{profileCompletion}%</h3>
              <p>Profile Completion</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="dashboard-card">
              <FaChartBar className="card-icon orange" />
              <h3>Active</h3>
              <p>Account Status</p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;