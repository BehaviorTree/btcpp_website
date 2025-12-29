import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./groot.module.css";
import sharedStyles from "./index.module.css";
import clsx from "clsx";

import EditorVideo from "@site/static/img/groot2_editor.mp4";
import MonitorVideo from "@site/static/img/groot2_monitor.mp4";
import LogVideo from "@site/static/img/groot2_log.mp4";
import ContactUSFormModal from "../components/ContactFormModal";

export default function Groot() {

  const [chargebeeInitialized, setChargebeeInitialized] = useState(false);
  const [openContactUsModal, setOpenContactUsModal] = useState(false);

  useEffect(() => {
    if (!chargebeeInitialized) {
      const chargeBeeScript = document.getElementById("chargebeeScript");

      if (!chargeBeeScript) {
        const el = document.createElement("script");
        el.onload = () => {
          Chargebee?.init({
            site: "aurynrobotics",
          });
          Chargebee?.registerAgain();
          setChargebeeInitialized(true);
        };
        el.setAttribute("src", "https://js.chargebee.com/v2/chargebee.js");
        el.setAttribute("id", "chargebeeScript");
        document.body?.appendChild(el);
      } else {
        Chargebee.init({
          site: "aurynrobotics",
        });
        Chargebee?.registerAgain();
        setChargebeeInitialized(true);
      }
    }
  }, [chargebeeInitialized]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClickContact = () => {
    setOpenContactUsModal(true);
  };

  const handleCloseModal = () => {
    setOpenContactUsModal(false);
  };

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      duration: "",
      points: [
        "Full Behavior Tree Editor",
        "Monitor and Log Visualizer limited to 20 Nodes",
      ],
      buttonText: "Download",
      onClick: () => scrollToSection("sectionDownload"),
    },
    {
      name: "PRO (floating license)",
      price: "€690",
      duration: " / year",
      points: [
        "Search Nodes in large trees",
        "Unlimited Number of Nodes in Monitor and Log Visualizer",
        "Interactive real-time debugger",
      ],
      buttonText: "Buy now",
      isChargebee: true,
    },
    {
      name: "Training",
      price: "€1,800",
      duration: " / month",
      points: [
        "Includes 1 PRO license (1 year)",
        "Up to 12 hours per month",
        "Learn how to use BT.CPP effectively or improve your current implementation",
      ],
      buttonText: "Contact us",
      onClick: handleClickContact,
    },
  ];

  return (
    <Layout title="Groot" description="Groot Editor">
      {openContactUsModal && (
        <ContactUSFormModal handleClose={handleCloseModal} />
      )}

      {/* Hero Section */}
      <div className={clsx("hero hero--dark", styles.heroBanner)}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col col--6" style={{ textAlign: "center" }}>
              <h1 className="hero__title">Groot2</h1>
              <p className="hero__subtitle">
                The most advanced IDE<br />to create and debug Behavior Trees.
              </p>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => scrollToSection("sectionDownload")}
                  className={clsx(sharedStyles.btn, sharedStyles.btnPrimary)}
                >
                  Download
                </button>
                <button
                  onClick={handleClickContact}
                  className={clsx(sharedStyles.btn, sharedStyles.btnSecondary)}
                >
                  Contact us
                </button>
              </div>
            </div>
            <div className="col col--6">
              <img src={useBaseUrl("img/groot2.png")} alt="Groot2 IDE" />
            </div>
          </div>
        </div>
      </div>

      {/* BT Editor Section */}
      <div className={`container text--left ${styles.sectionText}`}>
        <div className="row">
          <div className="col col--5" id="t1">
            <h1>BT Editor</h1>
            <ul>
              <li>Create and edit trees, using a simple drag and drop interface.</li>
              <li>Manage large projects using multiple files.</li>
              <li>Compatible with both BT.CPP 3 and 4.</li>
              <li>Split view to visualize two trees at once.</li>
              <li>Preview the XML in real-time.</li>
              <li><b>PRO:</b> search Nodes in large trees.</li>
            </ul>
          </div>
          <div className="col col--6">
            <video src={EditorVideo} muted loop autoPlay width="100%" />
          </div>
          <div className="col col--6" id="t2">
            <h1>BT Editor</h1>
            <ul>
              <li>Create and edit trees, using a simple drag and drop interface.</li>
              <li>Manage large projects using multiple files.</li>
              <li>Compatible with both BT.CPP 3 and 4.</li>
              <li>Split view to visualize two trees at once.</li>
              <li>Preview the XML in real-time.</li>
              <li><b>PRO:</b> search Nodes in large trees.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Real-time Monitor Section */}
      <div className={`container text--left ${styles.sectionText}`}>
        <div className="row">
          <div className="col col--6">
            <h1>Real-time Monitor</h1>
            <ul>
              <li>Connect to a running BT.CPP executor and visualize the state of the tree in real-time.</li>
              <li>Record all transitions into a log file, that you can analyze later.</li>
              <li><b>PRO:</b> Visualize the content of the blackboard.</li>
              <li><b>PRO:</b> Add interactive breakpoints and fault injection.</li>
              <li><b>PRO:</b> Substitute any Nodes with dummy ones, at run-time.</li>
            </ul>
          </div>
          <div className="col col--6">
            <video src={MonitorVideo} muted loop autoPlay width="100%" />
          </div>
        </div>
      </div>

      {/* Log Visualization Section */}
      <div className={`container text--left ${styles.sectionText}`}>
        <div className="row">
          <div className="col col--6" id="t3">
            <h1>Log Visualization</h1>
            <ul>
              <li>Open logs and replay the execution of the tree at different speeds.</li>
              <li>Visualize how long a Node was in the RUNNING state and how many times it returned a new status.</li>
              <li>Filter transitions by name or time range.</li>
            </ul>
          </div>
          <div className="col col--6">
            <video src={LogVideo} muted loop autoPlay width="100%" />
          </div>
          <div className="col col--6" id="t4">
            <h1>Log Visualization</h1>
            <ul>
              <li>Open logs and replay the execution of the tree at different speeds.</li>
              <li>Visualize how long a Node was in the RUNNING state and how many times it returned a new status.</li>
              <li>Filter transitions by name or time range.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className={`${styles.sectionSeparator} container`}>Pricing</div>
      <div className="container">
        <div className="row" id="row_price">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className="col col--4"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div id="card">
                <div id="card_header">{plan.name}</div>
                <div id="price_row">
                  <div id="price">{plan.price}</div>
                  <div id="durance">{plan.duration}</div>
                </div>
                <ul id="point_stack">
                  {plan.points.map((point, i) => (
                    <li key={i} id="point">{point}</li>
                  ))}
                </ul>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {plan.isChargebee ? (
                    <a
                      className={clsx(sharedStyles.btn, sharedStyles.btnPrimary)}
                      href="javascript:void(0)"
                      data-cb-type="checkout"
                      data-cb-item-0="Floating-License-fixed2-EUR-Yearly"
                      data-cb-item-0-quantity="1"
                    >
                      {plan.buttonText}
                    </a>
                  ) : (
                    <button
                      className={clsx(sharedStyles.btn, sharedStyles.btnPrimary)}
                      onClick={plan.onClick}
                    >
                      {plan.buttonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col col--2" />
          <div className="col col--8">
            <h1 id="pricingHead">But wait, there is more!</h1>
            <ul>
              <li id="text">
                <b>Free Trial:</b> enjoy all the features of the PRO version
                for one month, activating your trial in "Preferences".
              </li>
              <li id="text">
                <b>Source code escrow:</b> if Auryn Robotics, the company behind Groot2,
                becomes unable to distribute and/or sell the software, the source code
                will be released as open source, under the Apache License, Version 2.0.
              </li>
            </ul>
          </div>
          <div className="col col--2" />
        </div>
      </div>
      {/* Download Section */}
      <div id="sectionDownload" className={`${styles.sectionSeparator} container`}>
        Download
      </div>

      <div className={`${styles.sectionText} container ${styles.flexCol} gap-5`}>
        <h3>Latest release: 1.7.0 (2025-12-14)</h3>
        <div className={styles.downloadGroup}>
          <div id="card_download" style={{ textAlign: "center" }}>
            <img
              className={styles.downloadLogo}
              src={useBaseUrl("img/windows.png")}
              alt="Windows logo"
            />
            <Link
              onClick={() => window.fathom?.trackGoal("I8XXZTK4", 0)}
              to="https://pub-32cef6782a9e411e82222dee82af193e.r2.dev/Groot2-v1.7.0-windows-installer.exe"
            >
              Windows installer
            </Link>
          </div>
          <div id="card_download" style={{ textAlign: "center" }}>
            <img
              className={styles.downloadLogo}
              src={useBaseUrl("img/linux.png")}
              alt="Linux logo"
            />
            <Link
              onClick={() => window.fathom?.trackGoal("VGT2ANC4", 0)}
              to="https://pub-32cef6782a9e411e82222dee82af193e.r2.dev/Groot2-v1.7.0-linux-installer.run"
            >
              Linux installer
            </Link>
          </div>
          <div id="card_download" style={{ textAlign: "center" }}>
            <img
              className={styles.downloadLogo}
              src={useBaseUrl("img/appimage.png")}
              alt="AppImage logo"
            />
            <Link
              onClick={() => window.fathom?.trackGoal("DIQDUTJ2", 0)}
              to="https://pub-32cef6782a9e411e82222dee82af193e.r2.dev/Groot2-v1.7.0-x86_64.AppImage"
            >
              AppImage (Linux)
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
