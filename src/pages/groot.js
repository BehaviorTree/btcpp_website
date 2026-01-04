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

// Pricing comparison features
const pricingFeatures = [
  { name: "Full Behavior Tree Editor", free: true, pro: true },
  { name: "Multi-file Project Support", free: true, pro: true },
  { name: "Monitor & Log Visualizer", free: "20 nodes", pro: "Unlimited" },
  { name: "Search Nodes in Large Trees", free: false, pro: true },
  { name: "Blackboard Visualization", free: false, pro: true },
  { name: "Interactive Breakpoints", free: false, pro: true },
  { name: "Fault Injection", free: false, pro: true },
  { name: "Technical Support", free: "Community", pro: "Priority" },
];

// FAQ data
const faqItems = [
  {
    question: "What does \"floating license\" mean?",
    answer:
      "A floating license can be used on a single machine, but it can be migrated from one machine to another an unlimited number of times.",
  },
  {
    question: "How many users can use a floating license?",
    answer:
      "There is no limitation based on the number of users. The license is tied to a single machine.", git pus
  },
  {
    question: "Can I try Groot2 PRO?",
    answer:
      "Yes, you can activate a 30-day free trial for the PRO version in Preferences -> License.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express). Contact us if you prefer a wire transfer.",
  },
  {
    question: "Can I use Groot2 offline?",
    answer:
      "Yes, Groot2 works offline. The PRO license requires an internet connection only for initial activation and periodic validation (once every 7 days). If you are in an air-gapped environment, please contact us for offline activation options.",
  },
  {
    question: "What happens if your company goes out of business?",
    answer:
      "We use an escrow service to guarantee that, if Auryn Robotics goes out of business, Groot2 will be released under the Apache 2.0 license.",
  }
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

function PricingFeatureValue({ value }) {
  if (value === true) {
    return <span className={styles.checkMark}>✓</span>;
  } else if (value === false) {
    return <span className={styles.crossMark}>—</span>;
  } else {
    return <span className={styles.textValue}>{value}</span>;
  }
}

function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <div className={clsx(styles.faqItem, { [styles.faqItemOpen]: isOpen })}>
      <button className={styles.faqQuestion} onClick={onClick}>
        <span>{question}</span>
        <span className={styles.faqIcon}>{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className={styles.faqAnswer}>{answer}</div>}
    </div>
  );
}

export default function Groot() {
  const [chargebeeInitialized, setChargebeeInitialized] = useState(false);
  const [openContactModal, setOpenContactModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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
      <section className={styles.pricingSection}>
        <div className={styles.pricingInner}>
          <h2 className={styles.pricingTitle}>Pricing</h2>
          <div className={styles.pricingTable}>
            {/* Header */}
            <div className={styles.pricingHeader}>
              <div className={styles.pricingFeatureCol}>Features</div>
              <div className={styles.pricingPlanCol}>
                <div className={styles.planName}>Free</div>
                <div className={styles.planPrice}>€0</div>
              </div>
              <div className={clsx(styles.pricingPlanCol, styles.proPlan)}>
                <div className={styles.planName}>PRO<br />Floating License</div>
                <div className={styles.planPrice}>
                  €690<span className={styles.planPeriod}>/year</span>
                </div>
              </div>
            </div>

            {/* Feature Rows */}
            {pricingFeatures.map((feature, idx) => (
              <div key={idx} className={styles.pricingRow}>
                <div className={styles.pricingFeatureCol}>{feature.name}</div>
                <div className={styles.pricingPlanCol}>
                  <PricingFeatureValue value={feature.free} />
                </div>
                <div className={clsx(styles.pricingPlanCol, styles.proPlan)}>
                  <PricingFeatureValue value={feature.pro} />
                </div>
              </div>
            ))}

            {/* CTA Row */}
            <div className={styles.pricingCta}>
              <div className={styles.pricingFeatureCol}></div>
              <div className={styles.pricingPlanCol}>
                <button
                  className={clsx(styles.btn, styles.btnSecondary)}
                  onClick={scrollToDownload}
                >
                  Download
                </button>
              </div>
              <div className={clsx(styles.pricingPlanCol, styles.proPlan)}>
                <a
                  className={clsx(styles.btn, styles.btnPrimary)}
                  href="javascript:void(0)"
                  data-cb-type="checkout"
                  data-cb-item-0="Floating-License-fixed2-EUR-Yearly"
                  data-cb-item-0-quantity="1"
                >
                  Buy PRO
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className={styles.downloadSection}>
        <div className={styles.downloadInner}>
          <h2 className={styles.downloadTitle}>Download</h2>
          <h3>Latest release: 1.7.1 (2026-01-04)</h3>
          <div className={styles.downloadGrid}>
            <div className={styles.downloadCard}>
              <img
                className={styles.downloadLogo}
                src={useBaseUrl("img/windows.png")}
                alt="Windows"
              />
              <Link to="https://pub-32cef6782a9e411e82222dee82af193e.r2.dev/Groot2-v1.7.1-windows-installer.exe">
                Windows installer
              </Link>
            </div>
            <div className={styles.downloadCard}>
              <img
                className={styles.downloadLogo}
                src={useBaseUrl("img/linux.png")}
                alt="Linux"
              />
              <Link to="https://pub-32cef6782a9e411e82222dee82af193e.r2.dev/Groot2-v1.7.1-linux-installer.run">
                Linux installer
              </Link>
            </div>
            <div className={styles.downloadCard}>
              <img
                className={styles.downloadLogo}
                src={useBaseUrl("img/appimage.png")}
                alt="AppImage"
              />
              <Link to="https://pub-32cef6782a9e411e82222dee82af193e.r2.dev/Groot2-v1.7.1-x86_64.AppImage">
                AppImage (Linux)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqItems.map((item, idx) => (
              <FaqItem
                key={idx}
                question={item.question}
                answer={item.answer}
                isOpen={openFaqIndex === idx}
                onClick={() =>
                  setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                }
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

