import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaDownload,
  FaEdit,
  FaSave,
  FaHome
} from "react-icons/fa";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import api from "../service/api";
import "./Resume.css";

function Resume() {
  const navigate = useNavigate();

  const personalId = localStorage.getItem("personalId");

  const template = (
    localStorage.getItem("template") || "Professional"
  ).toLowerCase();

  const [personal, setPersonal] = useState({});
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const personalRes = await api.get(`/personal/${personalId}`);
        setPersonal(personalRes.data);

        const educationRes = await api.get(
          `/education/personal/${personalId}`
        );
        setEducation(educationRes.data);

        const experienceRes = await api.get(
          `/experience/personal/${personalId}`
        );
        setExperience(experienceRes.data);

        const skillsRes = await api.get(
          `/skills/personal/${personalId}`
        );
        setSkills(skillsRes.data);

        const projectsRes = await api.get(
          `/projects/personal/${personalId}`
        );
        setProjects(projectsRes.data);

        const certificationsRes = await api.get(
          `/certifications/personal/${personalId}`
        );
        setCertifications(certificationsRes.data);

        const languagesRes = await api.get(
          `/languages/personal/${personalId}`
        );
        setLanguages(languagesRes.data);
      } catch (error) {
        console.error("Failed to load resume:", error);
        alert("Unable to load resume data. Please try again.");
      }
    };

    if (personalId) {
      loadResume();
    }
  }, [personalId]);

  const shortText = (text, max) => {
    if (!text) return "";

    return text.length > max
      ? text.substring(0, max) + "..."
      : text;
  };

  const saveResume = () => {
    alert("Resume Saved Successfully.");
    navigate("/dashboard");
  };

  // Create an A4 PDF without changing the resume layout
  const downloadResume = async () => {
    const element = document.querySelector(".resume-container");

    if (!element || downloading) return;

    try {
      setDownloading(true);

      // Wait for web fonts to finish loading
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: 794,
        windowWidth: 794,
        scrollX: 0,
        scrollY: 0
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true
      });

      const pageWidth = 210;
      const pageHeight = 297;

      // Pixel height corresponding to one A4 page
      const pagePixelHeight = Math.floor(
        canvas.width * (pageHeight / pageWidth)
      );

      const totalPages = Math.ceil(
        canvas.height / pagePixelHeight
      );

      for (let page = 0; page < totalPages; page++) {
        const sourceY = page * pagePixelHeight;

        const currentPageHeight = Math.min(
          pagePixelHeight,
          canvas.height - sourceY
        );

        const pageCanvas = document.createElement("canvas");

        pageCanvas.width = canvas.width;
        pageCanvas.height = currentPageHeight;

        const context = pageCanvas.getContext("2d");

        if (!context) {
          throw new Error("Unable to create PDF canvas.");
        }

        context.fillStyle = "#ffffff";
        context.fillRect(
          0,
          0,
          pageCanvas.width,
          pageCanvas.height
        );

        context.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          currentPageHeight,
          0,
          0,
          canvas.width,
          currentPageHeight
        );

        const imageData = pageCanvas.toDataURL("image/jpeg", 0.95);

        if (page > 0) {
          pdf.addPage("a4", "portrait");
        }

        const renderedHeight =
          (currentPageHeight / canvas.width) * pageWidth;

        pdf.addImage(
          imageData,
          "JPEG",
          0,
          0,
          pageWidth,
          renderedHeight,
          undefined,
          "FAST"
        );
      }

      const fileName = `${
        (personal.firstName || "Resume").replace(
          /[^a-z0-9_-]/gi,
          "_"
        )
      }_Resume.pdf`;

      pdf.save(fileName);

    } catch (error) {
      console.error("PDF download failed:", error);
      alert("Unable to download resume. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="resume-page">

      {/* TOOLBAR */}

      <div className="resume-toolbar">

        <button
          className="toolbar-btn back"
          onClick={() => navigate("/templates")}
        >
          <FaArrowLeft />
          Back
        </button>

        <div className="toolbar-right">

          <button
            className="toolbar-btn edit"
            onClick={() => navigate("/personal")}
          >
            <FaEdit />
            Edit
          </button>

          <button
            className="toolbar-btn download"
            onClick={downloadResume}
            disabled={downloading}
          >
            <FaDownload />
            {downloading ? "Generating PDF..." : "Download PDF"}
          </button>

          <button
            className="toolbar-btn save"
            onClick={saveResume}
          >
            <FaSave />
            Save Resume
          </button>

          <button
            className="toolbar-btn dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            <FaHome />
            Dashboard
          </button>

        </div>
      </div>

      {/* FIXED A4 RESUME DOCUMENT */}

      <div
        className={`resume-container ${template}`}
        id="resume-document"
      >

        {/* HEADER */}

        <div className="resume-header">

          <h1>
            {`${personal.firstName || ""} ${
              personal.lastName || ""
            }`.trim()}
          </h1>

          <div className="contact-row">

            <span>
              <strong>Email:</strong>{" "}
              {personal.email}
            </span>

            <span>
              <strong>Phone:</strong>{" "}
              {personal.phone}
            </span>

            <span>
              <strong>Address:</strong>{" "}
              {personal.address}
            </span>

          </div>

          <div className="contact-row">

            <span>
              <strong>LinkedIn:</strong>{" "}
              {shortText(personal.linkedin, 45)}
            </span>

            <span>
              <strong>GitHub:</strong>{" "}
              {shortText(personal.github, 45)}
            </span>

          </div>

        </div>

        {/* BODY */}

        <div className="resume-body">

          {/* LEFT COLUMN */}

          <div className="left-column">

            <section className="resume-section">
              <h2>Professional Summary</h2>

              <p className="summary-text">
                {shortText(personal.summary, 450)}
              </p>
            </section>

            <section className="resume-section">
              <h2>Skills</h2>

              <div className="badge-container">

                {skills.length === 0 ? (
                  <p>No skills added.</p>
                ) : (
                  skills.map((item) => (
                    <span
                      key={item.id}
                      className="skill-badge"
                    >
                      {item.skillName}
                    </span>
                  ))
                )}

              </div>
            </section>

            <section className="resume-section">
              <h2>Languages</h2>

              <div className="badge-container">

                {languages.length === 0 ? (
                  <p>No languages added.</p>
                ) : (
                  languages.map((item) => (
                    <span
                      key={item.id}
                      className="language-badge"
                    >
                      {item.languageName}
                    </span>
                  ))
                )}

              </div>
            </section>

          </div>

          {/* RIGHT COLUMN */}

          <div className="right-column">

            {experience.length > 0 && (
              <section className="resume-section">
                <h2>Experience</h2>

                {experience.map((item) => (
                  <div
                    key={item.id}
                    className="resume-item"
                  >
                    <h3>{item.position}</h3>
                    <h4>{item.company}</h4>

                    <div className="resume-date">
                      {item.startDate}
                      {" - "}
                      {item.currentWorking
                        ? "Present"
                        : item.endDate}
                    </div>

                    <p>{item.description}</p>
                  </div>
                ))}
              </section>
            )}

            {education.length > 0 && (
              <section className="resume-section">
                <h2>Education</h2>

                {education.map((item) => (
                  <div
                    key={item.id}
                    className="resume-item"
                  >
                    <h3>{item.degree}</h3>
                    <h4>{item.college}</h4>

                    <p className="university">
                      {item.university}
                    </p>

                    <div className="resume-date">
                      {item.startYear}
                      {" - "}
                      {item.endYear}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {projects.length > 0 && (
              <section className="resume-section">
                <h2>Projects</h2>

                {projects.map((item) => (
                  <div
                    key={item.id}
                    className="resume-item"
                  >
                    <h3>{item.title}</h3>
                    <h4>{item.technology}</h4>
                    <p>{item.description}</p>
                  </div>
                ))}
              </section>
            )}

            {certifications.length > 0 && (
              <section className="resume-section">
                <h2>Certifications</h2>

                {certifications.map((item) => (
                  <div
                    key={item.id}
                    className="resume-item"
                  >
                    <h3>{item.certificationName}</h3>
                    <h4>{item.organization}</h4>

                    <div className="resume-date">
                      {item.issueDate}
                    </div>
                  </div>
                ))}
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;