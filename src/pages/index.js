import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import clsx from "clsx";
import styles from "./index.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ContactUSFormModal from "../components/ContactFormModal";

function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* Floating blobs */}
      <div className={clsx(styles.blob, styles.blob1)} />
      <div className={clsx(styles.blob, styles.blob2)} />
      <div className={clsx(styles.blob, styles.blob3)} />

      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            The Industry Standard for{" "}
            <span className={styles.highlight}>Robot Behaviors</span>
          </h1>

          <p className={styles.heroSub}>
            BehaviorTree.CPP is the most advanced, production-ready framework for
            building reactive, modular, and debuggable robot behaviors. Design in
            XML, execute in C++.
          </p>
          <div className={styles.heroBadge}>
            <span className={styles.badgeDot} />
            Powering 100+ robotics companies
          </div>
          <div className={styles.heroCtas}>
            <Link
              to="/docs/intro"
              className={clsx(styles.btn, styles.btnPrimary)}
            >
              Read the Documentation
            </Link>
            <Link to="/groot" className={clsx(styles.btn, styles.btnSecondary)}>
              About Groot2
            </Link>
          </div>

        </div>

        <div className={styles.heroCarousel}>
          <Carousel
            autoPlay
            showThumbs={false}
            infiniteLoop={true}
            showStatus={false}
            interval={4000}
          >
            <div>
              <img src={useBaseUrl("img/image_agv.webp")} alt="Automated Ground Vehicles" />
            </div>
            <div>
              <img src={useBaseUrl("img/image_quadruped.webp")} alt="Quadruped robots" />
            </div>
            <div>
              <img src={useBaseUrl("img/image_drone.jpg")} alt="Drones" />
            </div>
            <div>
              <img src={useBaseUrl("img/image_arm.jpg")} alt="Robotic arms" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const logos = [
    "Nav2",
    "MoveIt2",
    "Anybotics",
  ];

  return (
    <section className={styles.trustBar}>
      <p className={styles.trustBarLabel}>
        Trusted by teams building autonomous systems
      </p>
      <div className={styles.trustLogos}>
        {logos.map((logo) => (
          <span key={logo} className={styles.trustLogo}>
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      id: "scalability",
      icon: "⚡",
      title: "Better scalability than FSMs",
      description:
        "Finite State Machines (FSMs) become unmanageable as complexity grows. Behavior Trees scale effortlessly with modular nodes and clear and reusable structure.",
      className: styles.cardAsync,
    },
    {
      id: "async",
      icon: "📊",
      title: "Async-First Design",
      description:
        "Non-blocking actions as first-class citizens. Build reactive behaviors that execute concurrently.",
      className: styles.cardBlackboard,
    },
    {
      id: "plugin",
      icon: "🔌",
      title: "Plugin Architecture",
      description:
        "Load custom nodes at runtime. Separate behavior design from implementation.",
      className: styles.cardPlugin,
    },
    {
      id: "xml",
      icon: "📝",
      title: "XML-Defined Trees",
      description:
        "Modify behaviors without recompiling. Perfect for field engineers.",
      className: styles.cardXml,
    },
    {
      id: "logging",
      icon: "🔍",
      title: "Built-in Logging",
      description:
        "Record, replay, and analyze state transitions with confidence.",
      className: styles.cardLogging,
    },
    {
      id: "ros2",
      icon: "🤖",
      title: "ROS2 Integration",
      description:
        "Official wrappers for actions, services, and topics. Powers the Nav2 navigation stack trusted by hundreds of robots and engineering teams worldwide.",
      className: styles.cardRos2,
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <div className={styles.featuresHeader}>
        <h2>Why BehaviorTree.CPP?</h2>
        <p>Built for real-world robotics, not just demos</p>
      </div>

      <div className={styles.bentoGrid}>
        {features.map((feature) => (
          <div
            key={feature.id}
            className={clsx(styles.bentoCard, feature.className)}
          >
            <div className={styles.bentoIcon}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function GrootSection() {
  const grootFeatures = [
    {
      title: "Visual Editor",
      description: "Drag-and-drop interface for rapid prototyping",
    },
    {
      title: "Real-time Monitoring",
      description: "Watch your tree execute live on your robot",
    },
    {
      title: "Log Replay & Analysis",
      description: "Debug past runs with full state reconstruction",
    },
    {
      title: "Breakpoints & Fault Injection",
      description: "Pause execution and simulate failures",
    },
  ];

  return (
    <section className={styles.grootSection}>
      <div className={styles.grootBlob} />

      <div className={styles.grootContent}>
        <div className={styles.grootText}>
          <h2>
            Supercharge you development speed with <span>Groot2</span>
          </h2>
          <p className={styles.grootTagline}>
            The IDE for Behavior Trees. Design, debug, and deploy with
            confidence.
          </p>

          <div className={styles.grootFeatures}>
            {grootFeatures.map((feature) => (
              <div key={feature.title} className={styles.grootFeature}>
                <div className={styles.grootFeatureIcon}>✓</div>
                <div className={styles.grootFeatureText}>
                  <strong>{feature.title}</strong>
                  <span>{feature.description}</span>
                </div>
              </div>
            ))}
          </div>

          <Link to="/groot" className={clsx(styles.btn, styles.btnPrimary)}>
            Learn More About Groot2
          </Link>
        </div>

        <div className={styles.grootVisual}>
          <div className={styles.grootPreview}>
            <div className={styles.grootPreviewHeader}>
              <span className={clsx(styles.windowDot, styles.windowDotRed)} />
              <span className={clsx(styles.windowDot, styles.windowDotYellow)} />
              <span className={clsx(styles.windowDot, styles.windowDotGreen)} />
            </div>
            <div className={styles.grootPreviewBody}>
              <div className={clsx(styles.treeNode, styles.treeNodeActive)}>
                Sequence
              </div>
              <div className={styles.treeConnector} />
              <div className={styles.treeRow}>
                <div className={styles.treeNode}>Fallback</div>
                <div className={styles.treeNode}>Navigate</div>
              </div>
              <div className={styles.treeConnector} />
              <div className={styles.treeRow}>
                <div className={styles.treeNode}>Check</div>
                <div className={clsx(styles.treeNode, styles.treeNodeActive)}>
                  Pick
                </div>
                <div className={styles.treeNode}>Place</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection({ onContactClick }) {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2>Ready to Build Smarter Robots?</h2>
        <p>
          Join hundreds of engineers using BehaviorTree.CPP to build
          production-grade autonomous systems.
        </p>
        <div className={styles.heroCtas}>
          <Link to="/docs/intro" className={clsx(styles.btn, styles.btnPrimary)}>
            Start the Tutorial
          </Link>
          <button
            onClick={onContactClick}
            className={clsx(styles.btn, styles.btnSecondary)}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [openContactUsModal, setOpenContactUsModal] = useState(false);

  const handleContactClick = () => {
    setOpenContactUsModal(true);
  };

  const handleCloseModal = () => {
    setOpenContactUsModal(false);
  };

  return (
    <Layout
      title={siteConfig.title}
      description="The leading C++ Behavior Tree library for robotics and AI."
    >
      {openContactUsModal && (
        <ContactUSFormModal handleClose={handleCloseModal} />
      )}
      <main className={styles.landingPage}>
        <HeroSection />
        <TrustBar />
        <FeaturesSection />
        <GrootSection />
        <CtaSection onContactClick={handleContactClick} />
      </main>
    </Layout>
  );
}