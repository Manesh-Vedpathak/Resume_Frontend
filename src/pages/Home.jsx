import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaUserGraduate,
  FaDownload,
  FaCheckCircle,
  FaBars,
  FaTimes
} from "react-icons/fa";

import modern from "../assets/templates/Blue.jpeg";
import professional from "../assets/templates/Green.jpeg";
import creative from "../assets/templates/Orange.jpeg";
import minimal from "../assets/templates/Grey.jpeg";

import "./Home.css";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <div className="container">

          <Link
            className="navbar-brand fw-bold fs-3"
            to="/"
            onClick={closeMenu}
          >
            Resume Builder
          </Link>

          <button
            type="button"
            className="navbar-toggler"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="menu"
            onClick={() => setMenuOpen((previous) => !previous)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div
            id="menu"
            className={`collapse navbar-collapse ${
              menuOpen ? "show" : ""
            }`}
          >
            <ul className="navbar-nav ms-auto">

              <li className="nav-item">
                <a
                  href="#features"
                  className="nav-link"
                  onClick={closeMenu}
                >
                  Features
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="#templates"
                  className="nav-link"
                  onClick={closeMenu}
                >
                  Templates
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="#about"
                  className="nav-link"
                  onClick={closeMenu}
                >
                  About
                </a>
              </li>

            </ul>

            <div className="navbar-actions">
              <Link
                to="/login"
                className="btn btn-outline-light"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-warning"
                onClick={closeMenu}
              >
                Register
              </Link>
            </div>
          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6">
              <h1 className="hero-title">
                Create Professional
                <br />
                Resume In Minutes
              </h1>

              <p className="hero-text">
                Build beautiful ATS-friendly resumes using
                modern templates.
                <br />
                No design skills required.
              </p>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700"
                alt="Resume building on a laptop"
                className="hero-image img-fluid"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="container">

          <div className="text-center mb-5">
            <h2>Why Choose Resume Builder?</h2>
            <p>
              Everything you need to build a professional resume.
            </p>
          </div>

          <div className="row">

            <div className="col-md-3">
              <div className="feature-card">
                <FaFileAlt className="feature-icon" />
                <h4>Modern Templates</h4>
                <p>Multiple professional resume templates.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-card">
                <FaUserGraduate className="feature-icon" />
                <h4>ATS Friendly</h4>
                <p>Optimized for recruiters and hiring software.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-card">
                <FaDownload className="feature-icon" />
                <h4>PDF Download</h4>
                <p>Download resume instantly.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-card">
                <FaCheckCircle className="feature-icon" />
                <h4>Easy To Use</h4>
                <p>Build your resume within minutes.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Resume Templates */}
      <section className="templates py-5" id="templates">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="section-title">
              Choose Your Favorite Template
            </h2>
            <p className="section-subtitle">
              Select from professionally designed resume templates.
            </p>
          </div>

          <div className="row">

            {[
              { name: "Modern", image: modern },
              { name: "Professional", image: professional },
              { name: "Creative", image: creative },
              { name: "Minimal", image: minimal }
            ].map((item) => (
              <div
                className="col-lg-3 col-md-6 mb-4"
                key={item.name}
              >
                <div className="template-box">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid"
                  />
                  <h5 className="mt-3">{item.name}</h5>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats">
        <div className="container">
          <div className="row text-center">

            <div className="col-md-3">
              <h2>10K+</h2>
              <p>Users</p>
            </div>

            <div className="col-md-3">
              <h2>25+</h2>
              <p>Templates</p>
            </div>

            <div className="col-md-3">
              <h2>50K+</h2>
              <p>Resumes Created</p>
            </div>

            <div className="col-md-3">
              <h2>99%</h2>
              <p>User Satisfaction</p>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonial">
        <div className="container">

          <div className="text-center mb-5">
            <h2>What Our Users Say</h2>
          </div>

          <div className="row">

            <div className="col-md-4">
              <div className="testimonial-card">
                <h5>Rahul Sharma</h5>
                <p>
                  "Amazing resume builder. I got my first job
                  using this resume."
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="testimonial-card">
                <h5>Priya Patel</h5>
                <p>
                  "Beautiful templates and extremely easy to use."
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="testimonial-card">
                <h5>Amit Verma</h5>
                <p>
                  "Downloaded my resume in less than five minutes."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="cta">
        <div className="container text-center">

          <h2>Ready To Build Your Resume?</h2>

          <p>
            Login to your account and start building your
            professional resume.
          </p>

          <Link
            to="/login"
            className="btn btn-warning btn-lg"
          >
            Login & Start Building
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="about">
        <div className="container text-center">

          <h3>Resume Builder</h3>

          <p>
            Build professional resumes with modern templates.
          </p>

          <hr />

          <p>
            Project Developed by : Manesh Vedpathak
          </p>

        </div>
      </footer>
    </>
  );
}

export default Home;