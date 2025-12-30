import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import clsx from "clsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import styles from "./index.module.css";
import EditorVideo from "@site/static/img/groot2_editor.mp4";
import ContactFormModal from "../components/ContactFormModal";

// Feature data for bento grid
const features = [
  {
    id: "scalable",
    icon: "🌳",
    title: "More scalable than State Machines",
    description:
      "Behavior Trees enable complex behaviors with less code and more modularity, making them easier to maintain and extend.",
  },
  {
    id: "async",
    icon: "⚡",
    title: "Async Actions",
    description:
      "Non-blocking actions and reactive behaviors as first-class citizens.",
  },
  {
    id: "plugin",
    icon: "🧩",
    title: "Modular Architecture",
    description:
      "Load custom nodes at runtime, build reusable building blocks.",
  },
  {
    id: "xml",
    icon: "📝",
    title: "XML-Defined Trees",
    description:
      "Separation of concerns between logic and implementation.",
  },
  {
    id: "logging",
    icon: "🔍",
    title: "Built-in Logging",
    description:
      "Record, replay, and analyze state transitions for easier debugging.",
  },
  {
    id: "ros2",
    icon: "🤖",
    title: "ROS2 Integration",
    description:
      "Official wrappers for ROS2. Powers the Nav2 navigation stack.",
  },
];

// Groot2 features
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

// Trust bar logos
const trustLogos = [
  "Nav2",
  "MoveIt",
];

function BentoCard({ icon, title, description }) {
  return (
    <div className={styles.bentoCard}>
      <div className={styles.bentoHeader}>
        <div className={styles.bentoIcon}>{icon}</div>
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  );
}

function GrootFeature({ title, description }) {
  return (
    <div className={styles.grootFeature}>
      <div className={styles.grootFeatureIcon}>✓</div>
      <div className={styles.grootFeatureText}>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </div>
  );
}

function Home() {
  const [openContactModal, setOpenContactModal] = useState(false);

  return (
    <Layout
      permalink={"/"}
      description={"The leading C++ BehaviorTree Library."}
    >
      {openContactModal && (
        <ContactFormModal handleClose={() => setOpenContactModal(false)} />
      )}
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          async
          defer
          data-website-id="b0133a07-1c59-49aa-8f9c-7a0c25711718"
          src="https://behaviortree-cpp-umami.netlify.app/umami.js"
        ></script>
        <script
          src="https://cdn.stat-track.com/statics/moosend-tracking.min.js"
          data-website-id="419144d798774876bcfcd1e1f0b6a2ad"
        ></script>
      </Head>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={clsx(styles.blob, styles.blob1)}></div>
        <div className={clsx(styles.blob, styles.blob2)}></div>
        <div className={clsx(styles.blob, styles.blob3)}></div>

        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              The Industry Standard for{" "}
              <span className={styles.heroTitleHighlight}>Robot Behaviors</span>
            </h1>
            <p className={styles.heroSub}>
              BehaviorTree.CPP is the most popular, production-ready framework
              for building reactive, modular, and debuggable robot behaviors.
            </p>
            <div className={styles.heroCtas}>
              <Link
                className={clsx(styles.btn, styles.btnPrimary)}
                to={useBaseUrl("docs/intro")}
              >
                Documentation
              </Link>
              <Link
                className={clsx(styles.btn, styles.btnSecondary)}
                to={useBaseUrl("/groot")}
              >
                Try Groot2
              </Link>
              <button
                className={clsx(styles.btn, styles.btnSecondary)}
                onClick={() => setOpenContactModal(true)}
              >
                Contact Us
              </button>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <div className={styles.statValue}>MIT</div>
                <div className={styles.statLabel}>Open-Source License</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>3.7k+</div>
                <div className={styles.statLabel}>GitHub Stars</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>100+</div>
                <div className={styles.statLabel}>Companies</div>
              </div>
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
                <img src={useBaseUrl("img/image_quadruped.webp")} alt="Quadruped Robots" />
              </div>
              <div>
                <img src={useBaseUrl("img/image_drone.jpg")} alt="Autonomous Drones" />
              </div>
              <div>
                <img src={useBaseUrl("img/image_arm.jpg")} alt="Robotic Arms" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className={styles.trustBar}>
        <p className={styles.trustBarTitle}>
          Used by some of the most popular robotics frameworks:
        </p>
        <div className={styles.trustLogos}>
          {trustLogos.map((logo, idx) => (
            <span key={idx} className={styles.trustLogo}>
              {logo}
            </span>
          ))}
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section className={styles.featuresSection} id="features">
        <div className={styles.featuresHeader}>
          <h2 className={styles.featuresTitle}>Why BehaviorTree.CPP?</h2>
          <p className={styles.featuresSubtitle}>
            Built for real-world robotics, not just demos
          </p>
        </div>

        <div className={styles.bentoGrid}>
          {features.map((feature) => (
            <BentoCard key={feature.id} {...feature} />
          ))}
        </div>
      </section>

      {/* Groot2 Section */}
      <section className={styles.grootSection} id="groot">
        <div className={styles.grootBlob}></div>
        <div className={styles.grootContent}>
          <div className={styles.grootHeader}>
            <h2>
              Boost your productivity with{" "}
              <span className={styles.grootTextHighlight}>Groot2</span>
            </h2>
          </div>

          <div className={styles.grootBody}>
            <div className={styles.grootText}>
              <div className={styles.grootFeatures}>
                {grootFeatures.map((feature, idx) => (
                  <GrootFeature key={idx} {...feature} />
                ))}
              </div>
              <Link
                className={clsx(styles.btn, styles.btnPrimary)}
                to={useBaseUrl("/groot")}
              >
                Learn More About Groot2
              </Link>
            </div>

            <div className={styles.grootVisual}>
              <div className={styles.grootPreview}>
                <video src={EditorVideo} muted autoPlay loop playsInline />
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}

export default Home;