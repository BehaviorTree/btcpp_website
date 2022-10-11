import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Layout from '@theme/Layout';
import clsx from 'clsx';

import styles from './index.module.css';
import EditorVideo from "@site/static/img/editor.mp4"

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      permalink={'/'}
      description={'Set up a modern web app by running one command.'}
    >
      <div className={clsx('hero hero--light', styles.heroBanner)}>
        <div className="container ">
          <div className="row align-items-center">
            <div className="col col--6">
              <div className={clsx(styles.heroText)}>
                <h1 className="hero__title">BehaviorTree.CPP 4.0</h1>
                <p className="hero__subtitle">
                  The C++ library to build Behavior Trees.<br />
                  Batteries included.</p>
                <div>
                  <Link
                    className="button button--outline button--primary button--lg"
                    to={useBaseUrl('docs/Intro')}
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
                src={useBaseUrl('img/animated.svg')}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.features}>
        <div className="container">
          <div className="row">
            <div className={clsx('col col--4', styles.feature)}>
              <h3>Think in terms of Actions,<br /> not states</h3>
              <p>Unlike state machines, behavior trees empathize
                executing actions, not transitioning between states.</p>
            </div>
            <div className={clsx('col col--4', styles.feature)}>
              <h3>Build extensible and <br /> hierarchical behaviors</h3>
              <p>Behavior Trees are <b>composable</b>. You can build complex behaviors reusing simpler ones.</p>
            </div>
            <div className={clsx('col col--4', styles.feature)}>
              <h3>The power of C++,<br />the flexibility of scripting</h3>
              <p>Implement your Actions in C++ and assemble them
                into trees using a scripting language based on XML.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sectionText}>
        <div className="container padding-vert--xl text--left {styles.sectionText}">
          <div className="row">
            <div className="col col--5">
              <h2>Perfect for robotics<br />and automation</h2>
              <p><b>BehaviorTree.CPP</b> is increasingly used to implement <b>Task Planning</b> in a large variety of robotics systems, including:</p>
              <ul>
                <li>Automated Ground Vehicles</li>
                <li>Robotic Manipulators</li>
                <li>Humanoid and Quadruped robots</li>
                <li>Social Robots</li>
              </ul>
            </div>
            <div className="col col--6 col--offset-1">
              <img
                src={useBaseUrl('img/image02.jpg')}
                alt="robots" />
            </div>
          </div>
        </div>
      </div >

      <div className={styles.sectionText}>
        <div className="container padding-vert--xl text--left">
          <div className="row">
            <div className="col col--6">
              <video src={EditorVideo} muted autoPlay width="100%"></video>
            </div>
            <div className="col col--5 col--offset-1">
              <h2>Easy to Maintain</h2>
              <p>
                <b>Groot</b> is our "IDE for Behavior Trees".<br />It allows users to
                visualize, create, edit and monitor Behavior Trees, using
                a simple drag and drop interface.
              </p>
              <Link
                className="button button--outline button--primary button--lg"
                to={useBaseUrl('/editors')}
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
                <p><b>BehaviorTree.CPP</b> is Open Source software and can be download for free on
                  <a href="https://github.com/BehaviorTree/BehaviorTree.CPP"> Github.</a>
                  <br />You can ask questions and reach other users in our
                  <a href="https://discourse.behaviortree.dev/"> community forum.</a>
                  <br />If you are using BehaviorTree.CPP in your commercial product and need support,
                  <a href="mailto:dfaconti@aurynrobotics"> contact u!</a>
                </p>
              </div>
              <div className="col col--3 ">
                <img
                  alt="behavior tree animation"
                  src={useBaseUrl('img/support.svg')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout >
  );
}

export default Home;