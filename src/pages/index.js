import React, { useState, useEffect } from "react";
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

// SVG Icons
const Icons = {
  tree: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="6" rx="1" />
      <path d="M12 8v4" />
      <path d="M5 12h14" />
      <path d="M5 12v3" />
      <path d="M19 12v3" />
      <rect x="1" y="15" width="8" height="6" rx="1" />
      <rect x="15" y="15" width="8" height="6" rx="1" />
    </svg>
  ),
  bolt: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  puzzle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.68c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.611-1.611a2.404 2.404 0 0 1 1.704-.706c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
    </svg>
  ),
  code: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m10 13-2 2 2 2" />
      <path d="m14 17 2-2-2-2" />
    </svg>
  ),
  search: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  robot: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="10" x="3" y="11" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" x2="8" y1="16" y2="16" />
      <line x1="16" x2="16" y1="16" y2="16" />
    </svg>
  ),
};

// Feature data for bento grid
const features = [
  {
    id: "scalable",
    icon: Icons.tree,
    title: "More scalable than State Machines",
    description:
      "Behavior Trees enable complex behaviors with less code and more modularity, making them easier to maintain and extend, compared to traditional state machines.",
  },
  {
    id: "async",
    icon: Icons.bolt,
    title: "Async Actions",
    description:
      "Non-blocking actions and reactive behaviors as first-class citizens.",
  },
  {
    id: "plugin",
    icon: Icons.puzzle,
    title: "Modular Architecture",
    description:
      "Build reusable building blocks, load custom nodes at runtime.",
  },
  {
    id: "xml",
    icon: Icons.code,
    title: "XML-Defined Trees",
    description:
      "Separation of concerns between logic (XML) and implementation (C++).",
  },
  {
    id: "logging",
    icon: Icons.search,
    title: "Built-in Logging",
    description:
      "Record, replay, and analyze state transitions for easier debugging.",
  },
  {
    id: "ros2",
    icon: Icons.robot,
    title: "ROS2 Integration",
    description:
      "The most widely used Robot Deliberation library in the ROS2 ecosystem. The main library is ROS-agnostic, but we provide seamless ROS2 integration.",
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

function formatStars(count) {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k+';
  }
  return count.toString();
}

function Home() {
  const [openContactModal, setOpenContactModal] = useState(false);
  const [githubStars, setGithubStars] = useState("3.7k+");

  useEffect(() => {
    fetch("https://api.github.com/repos/BehaviorTree/BehaviorTree.CPP")
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count) {
          setGithubStars(formatStars(data.stargazers_count));
        }
      })
      .catch(() => {
        // Keep default value on error
      });
  }, []);

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
              The Industry Standard for
              <br />
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
                <div className={styles.statLabel}><b>OSS</b> License</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>{githubStars}</div>
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
          <h2 className={styles.featuresTitle}>Why <span className={styles.highlight}>BehaviorTree.CPP</span>?</h2>
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