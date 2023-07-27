import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";

import Layout from "@theme/Layout";
import clsx from "clsx";

import styles from "./index.module.css";
import EditorVideo from "@site/static/img/editor.mp4";
import Head from "@docusaurus/Head";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      permalink={"/"}
      description={"The leading C++ BehaviorTree Library."}
    >
      <Head>
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
      <div className={clsx("hero hero--light", styles.heroBanner)}>
        <div className="container ">
          <div className="row align-items-center">
            <div className="col col--6">
              <div className={clsx(styles.heroText)}>
                <h1 className="hero__title ">BehaviorTree.CPP 4.3</h1>
                <p className="hero__subtitle">
                  The C++ library to build Behavior Trees.
                  <br />
                  Batteries included.
                </p>
                <div>
                  <Link
                    className="button button--outline button--primary button--lg"
                    to={useBaseUrl("docs/Intro")}
                  >
                    Tutorials
                  </Link>
                </div>
              </div>
            </div>
            <div className="col col--5">
              <img
                className={clsx(styles.heroSvg)}
                alt="behavior tree animation"
                src={useBaseUrl("img/animated.svg")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.features}>
        <div className="container">
          <div className="row">
            <div className={clsx("col col--4", styles.feature)}>
              <h3>
                Think in terms of Actions,
                <br /> not states
              </h3>
              <p>
                Unlike state machines, behavior trees emphasize executing
                actions, not transitioning between states.
              </p>
            </div>
            <div className={clsx("col col--4", styles.feature)}>
              <h3>
                Build extensible and <br /> hierarchical behaviors
              </h3>
              <p>
                Behavior Trees are <b>composable</b>. You can build complex
                behaviors reusing simpler ones.
              </p>
            </div>
            <div className={clsx("col col--4", styles.feature)}>
              <h3>
                The power of C++,
                <br />
                the flexibility of scripting
              </h3>
              <p>
                Implement your Actions in C++ and assemble them into trees using
                a scripting language based on XML.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sectionText}>
        <div className="container padding-vert--xl text--left {styles.sectionText}">
          <div className="row">
            <div className="col col--6">
              <h2>
                Perfect for robotics
                <br />
                and automation
              </h2>
              <p>
                <b>BehaviorTree.CPP</b> is increasingly used to implement{" "}
                <b>Task Planning</b> in a large variety of robotics systems,
                including:
              </p>
              <ul>
                <li>Automated Ground Vehicles</li>
                <li>Robotic Manipulators</li>
                <li>Humanoid and Quadruped robots</li>
                <li>Semi-autonomous drones</li>
                <li>Social Robots</li>
              </ul>
            </div>
            <div className="col col--5 col--offset-1">
              <Carousel autoPlay showThumbs={false} infiniteLoop={true}>
                <div>
                  <img src={useBaseUrl("img/image_agv.webp")} alt="robots" />
                </div>
                <div>
                  <img src={useBaseUrl("img/image_quadruped.webp")} alt="quadrupeds" />
                </div>
                <div>
                  <img src={useBaseUrl("img/image_drone.jpg")} alt="robots" />
                </div>
                <div>
                  <img src={useBaseUrl("img/image_arm.jpg")} alt="robots" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sectionText}>
        <div className="container padding-vert--xl text--left">
          <div className="row">
            <div className="col col--5">
              <video src={EditorVideo} muted autoPlay width="100%"></video>
            </div>
            <div className="col col--6 col--offset-1">
              <h2>Visual Editing and Monitoring</h2>
              <p>
                <b>Groot</b> is our "IDE for Behavior Trees".
                <br />
                It allows users to visualize, create and edit Behavior Trees,
                using a simple drag and drop interface. <br />
                Trees can be monitored in real-time
              </p>
              <Link
                className="button button--outline button--primary button--lg"
                to={useBaseUrl("/groot")}
              >
                About Groot
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.supportFrame}>
        <div className="container">
          <div className="row">
            <div className={styles.sectionText}>
              <div className="col col--9">
                <h1>Software and Technical Support</h1>
                <p>
                  <b>BehaviorTree.CPP</b> is Open Source software and can be
                  download for free on
                  <a href="https://github.com/BehaviorTree/BehaviorTree.CPP">
                    {" "}
                    Github.
                  </a>
                  <br />
                  You can ask questions and reach other users in our
                  <a href="https://discourse.behaviortree.dev/">
                    {" "}
                    community forum.
                  </a>
                  <br />
                  If you are using BehaviorTree.CPP in your commercial product
                  and you need support,
                  <a href="mailto:dfaconti@aurynrobotics.com"> contact us!</a>
                </p>
              </div>
            </div>
            <div className="col col--3 ">
              <img
                alt="behavior tree animation"
                src={useBaseUrl("img/support.svg")}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
