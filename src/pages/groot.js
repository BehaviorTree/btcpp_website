import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";

import styles from "./groot.module.css";
import EditorVideo from "@site/static/img/groot2_editor.mp4";
import MonitorVideo from "@site/static/img/groot2_monitor.mp4";
import LogVideo from "@site/static/img/groot2_log.mp4";
import ContactFormModal from "../components/ContactFormModal";

// Pricing plans data
const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    period: "",
    features: [
      "Full Behavior Tree Editor",
      "Monitor and Log Visualizer limited to 20 Nodes",
    ],
    buttonText: "Download",
    action: "download",
  },
  {
    name: "PRO (floating license)",
    price: "€690",
    period: " / year",
    features: [
      "Search Nodes in large trees",
      "Unlimited Nodes in Monitor and Log Visualizer",
      "Interactive real-time debugger",
    ],
    buttonText: "Buy now",
    action: "checkout",
  },
  {
    name: "Training",
    price: "€1,800",
    period: " / month",
    features: [
      "Includes 1 PRO license (1 year)",
      "Up to 12 hours per month",
      "Learn how to use BT.CPP effectively",
    ],
    buttonText: "Contact us",
    action: "contact",
  },
];

// Feature sections data
const features = [
  {
    title: "BT Editor",
    items: [
      "Create and edit trees, using a simple drag and drop interface.",
      "Manage large projects using multiple files.",
      "Compatible with both BT.CPP 3 and 4.",
      "Split view to visualize two trees at once.",
      "Preview the XML in real-time.",
      "<b>PRO:</b> search Nodes in large trees.",
    ],
    video: EditorVideo,
  },
  {
    title: "Real-time Monitor",
    items: [
      "Connect to a running BT.CPP executor and visualize the state of the tree in real-time.",
      "Record all transitions into a log file, that you can analyze later.",
      "<b>PRO:</b> Visualize the content of the blackboard.",
      "<b>PRO:</b> Add interactive breakpoints and fault injection.",
      "<b>PRO:</b> Substitute any Nodes with dummy ones, at run-time.",
    ],
    video: MonitorVideo,
    reverse: true,
  },
  {
    title: "Log Visualization",
    items: [
      "Open logs and replay the execution of the tree at different speeds.",
      "Visualize how long a Node was in the RUNNING state and how many times it returned a new status.",
      "Filter transitions by name or time range.",
    ],
    video: LogVideo,
  },
];

function FeatureSection({ title, items, video, reverse }) {
  return (
    <section className={styles.featureSection}>
      <div className={clsx(styles.featureInner, { [styles.reverse]: reverse })}>
        <div className={styles.featureContent}>
          <h2>{title}</h2>
          <ul>
            {items.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
        <div className={styles.featureVideo}>
          <video src={video} muted loop autoPlay playsInline />
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan, onDownload, onContact }) {
  const handleClick = () => {
    if (plan.action === "download") {
      onDownload();
    } else if (plan.action === "contact") {
      onContact();
    }
  };

  return (
    <div className={styles.pricingCard}>
      <h3>{plan.name}</h3>
      <div className={styles.pricingPrice}>
        <span className={styles.pricingAmount}>{plan.price}</span>
        <span className={styles.pricingPeriod}>{plan.period}</span>
      </div>
      <ul className={styles.pricingFeatures}>
        {plan.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
      <div className={styles.pricingCta}>
        {plan.action === "checkout" ? (
          <a
            className={clsx(styles.btn, styles.btnPrimary)}
            href="javascript:void(0)"
            data-cb-type="checkout"
            data-cb-item-0="Floating-License-fixed2-EUR-Yearly"
            data-cb-item-0-quantity="1"
          >
            {plan.buttonText}
          </a>
        ) : (
          <button
            className={clsx(styles.btn, styles.btnPrimary)}
            onClick={handleClick}
          >
            {plan.buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Groot() {
  const [chargebeeInitialized, setChargebeeInitialized] = useState(false);
  const [openContactModal, setOpenContactModal] = useState(false);

  useEffect(() => {
    if (!chargebeeInitialized) {
      const existingScript = document.getElementById("chargebeeScript");

      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "chargebeeScript";
        script.src = "https://js.chargebee.com/v2/chargebee.js";
        script.onload = () => {
          window.Chargebee?.init({ site: "aurynrobotics" });
          window.Chargebee?.registerAgain();
          setChargebeeInitialized(true);
        };
        document.body.appendChild(script);
      } else {
        window.Chargebee?.init({ site: "aurynrobotics" });
        window.Chargebee?.registerAgain();
        setChargebeeInitialized(true);
      }
    }
  }, [chargebeeInitialized]);

  const scrollToDownload = () => {
    document.getElementById("download")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout title="Groot2" description="The IDE for Behavior Trees">
      {openContactModal && (
        <ContactFormModal handleClose={() => setOpenContactModal(false)} />
      )}

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Groot2</h1>
            <p className={styles.heroSubtitle}>
              The most advanced IDE to create and debug Behavior Trees.
            </p>
            <div className={styles.buttonGroup}>
              <button
                className={clsx(styles.btn, styles.btnPrimary)}
                onClick={scrollToDownload}
              >
                Download
              </button>
              <button
                className={clsx(styles.btn, styles.btnSecondary)}
                onClick={() => setOpenContactModal(true)}
              >
                Contact us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      {features.map((feature, idx) => (
        <FeatureSection key={idx} {...feature} />
      ))}

      {/* Pricing Section */}
      <div className={styles.sectionSeparator}>Pricing</div>
      <section className={styles.pricingSection}>
        <div className={styles.pricingGrid}>
          {pricingPlans.map((plan, idx) => (
            <PricingCard
              key={idx}
              plan={plan}
              onDownload={scrollToDownload}
              onContact={() => setOpenContactModal(true)}
              chargebeeReady={chargebeeInitialized}
            />
          ))}
        </div>
      </section>

      {/* Download Section */}
      <div id="download" className={styles.sectionSeparator}>
        Download
      </div>
      <section className={styles.downloadSection}>
        <div className={styles.downloadInner}>
          <h3>Latest release: 1.7.0 (2025-12-14)</h3>
          <div className={styles.downloadGrid}>
            <div className={styles.downloadCard}>
              <img
                className={styles.downloadLogo}
                src={useBaseUrl("img/windows.png")}
                alt="Windows"
              />
              <Link to="https://pub-32cef6782a9e411e82222dee82af193e.r2.dev/Groot2-v1.7.0-windows-installer.exe">
                Windows installer
              </Link>
            </div>
            <div className={styles.downloadCard}>
              <img
                className={styles.downloadLogo}
                src={useBaseUrl("img/linux.png")}
                alt="Linux"
              />
              <Link to="https://pub-32cef6782a9e411e82222dee82af193e.r2.dev/Groot2-v1.7.0-linux-installer.run">
                Linux installer
              </Link>
            </div>
            <div className={styles.downloadCard}>
              <img
                className={styles.downloadLogo}
                src={useBaseUrl("img/appimage.png")}
                alt="AppImage"
              />
              <Link to="https://pub-32cef6782a9e411e82222dee82af193e.r2.dev/Groot2-v1.7.0-x86_64.AppImage">
                AppImage (Linux)
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
