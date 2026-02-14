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
      "There is no limitation based on the number of users. The license is tied to a single machine.",
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

const CURRENT_VERSION = "1.9.0";

// Track download event
const trackDownload = async (file, platform) => {
  try {
    await fetch('/api/track-download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file, platform, version: CURRENT_VERSION })
    });
  } catch (error) {
    // Don't block download if tracking fails
    console.error('Failed to track download:', error);
  }
};

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
          window.Chargebee?.init({
            site: "aurynrobotics",
            isItemsModel: true
          });
          setChargebeeInitialized(true);
        };
        document.body.appendChild(script);
      } else {
        window.Chargebee?.init({
          site: "aurynrobotics",
          isItemsModel: true
        });
        setChargebeeInitialized(true);
      }
    }
  }, [chargebeeInitialized]);

  const scrollToDownload = () => {
    document.getElementById("download")?.scrollIntoView({ behavior: "smooth" });
  };

  const openCheckout = () => {
    try {
      const cbInstance = window.Chargebee.getInstance();
      cbInstance.openCheckout({
        hostedPage: () => {
          return Promise.resolve({
            url: 'https://aurynrobotics.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Floating-License-fixed2-EUR-Yearly&subscription_items[quantity][0]=1',
            state: 'created'
          });
        },
        layout: 'in_app'
      });
    } catch (error) {
      console.error("Chargebee checkout error:", error);
    }
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
                  €590<span className={styles.planPeriod}>/year</span>
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
                <button
                  className={clsx(styles.btn, styles.btnPrimary)}
                  onClick={openCheckout}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className={styles.downloadSection}>
        <div className={styles.downloadInner}>
          <div className={styles.downloadHeader}>
            <h2 className={styles.downloadTitle}>Download</h2>
            <p className={styles.downloadVersion}>Latest release: {CURRENT_VERSION} (2026-02-14)</p>
          </div>

          <div className={styles.downloadGrid}>
            <Link
              className={styles.downloadCard}
              to={`https://pub-32cef6782a9e411e82222dee82af193e.r2.dev/Groot2-v${CURRENT_VERSION}-windows-installer.exe`}
              onClick={() => trackDownload('windows-installer.exe', 'windows')}
            >
              <img
                className={styles.downloadLogo}
                src={useBaseUrl("img/windows.png")}
                alt="Windows"
              />
              <div className={styles.downloadInfo}>
                <span className={styles.downloadName}>Windows</span>
                <span className={styles.downloadArch}>x86_64 Installer</span>
              </div>
            </Link>
            <Link
              className={styles.downloadCard}
              to={`https://pub-32cef6782a9e411e82222dee82af193e.r2.dev/Groot2-v${CURRENT_VERSION}-linux-installer.run`}
              onClick={() => trackDownload('linux-installer.run', 'linux')}
            >
              <img
                className={styles.downloadLogo}
                src={useBaseUrl("img/linux.png")}
                alt="Linux"
              />
              <div className={styles.downloadInfo}>
                <span className={styles.downloadName}>Linux</span>
                <span className={styles.downloadArch}>x86_64 Installer</span>
              </div>
            </Link>
            <Link
              className={styles.downloadCard}
              to={`https://pub-32cef6782a9e411e82222dee82af193e.r2.dev/Groot2-v${CURRENT_VERSION}-x86_64.AppImage`}
              onClick={() => trackDownload('x86_64.AppImage', 'linux')}
            >
              <img
                className={styles.downloadLogo}
                src={useBaseUrl("img/appimage.png")}
                alt="AppImage"
              />
              <div className={styles.downloadInfo}>
                <span className={styles.downloadName}>AppImage</span>
                <span className={styles.downloadArch}>x86_64 Portable</span>
              </div>
            </Link>
            <Link
              className={styles.downloadCard}
              to={`https://pub-32cef6782a9e411e82222dee82af193e.r2.dev/Groot2-v${CURRENT_VERSION}-aarch64.AppImage`}
              onClick={() => trackDownload('aarch64.AppImage', 'linux')}
            >
              <img
                className={styles.downloadLogo}
                src={useBaseUrl("img/appimage.png")}
                alt="AppImage"
              />
              <div className={styles.downloadInfo}>
                <span className={styles.downloadName}>AppImage</span>
                <span className={styles.downloadArch}>aarch64 Portable</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div className={styles.faqHeader}>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            <p className={styles.faqSubtitle}>
              Everything you need to know about Groot2 licensing and features.
            </p>
            <div className={styles.faqDecoration}>
              <span className={styles.faqDecorationDot}></span>
              <span className={styles.faqDecorationDot}></span>
              <span className={styles.faqDecorationDot}></span>
            </div>
          </div>
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





