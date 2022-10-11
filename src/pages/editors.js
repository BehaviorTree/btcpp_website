import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

export default function Hello() {
  return (
    <Layout title="Hello" description="Hello React Page">
      <div className={styles.sectionText}>
        <div className="container padding-vert--xl text--left {styles.sectionText}">
          <div className="row">
            <div className="col col--5">
              <h1> Groot</h1>
              <p><a href="https://github.com/BehaviorTree/Groot"> Groot </a>
                is an open source Graphical Editor, written in C++ and Qt, to create BehaviorTrees.
              </p>
              <p>With Groot you can:
                <ul>
                  <li>Create and edit trees using a drag and drop interface.</li>
                  <li>Monitor the state of a tree remotely in real-time.</li>
                  <li>Replay the state transitions offline, using a log.</li>
                </ul>
              </p>
              <p>
                <h3>Groot 2 is currently under development. </h3>
                We are reimaginging Groot to be easier to use and more scalable.
                If you use Groot professionally, it is the perfect time to <a href="mailto:dfaconti@aurynrobotics.com">get in touch</a>!
              </p>
            </div>
            <div className="col col--6 col--offset-1">
              <img
                src={useBaseUrl('img/groot_1.png')}
                alt="groot 1" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sectionText}>
        <div className="container padding-vert--xl text--left {styles.sectionText}">
          <div className="row">
            <div className="col col--6">
              <img
                src={useBaseUrl('img/moveit-studio.jpg')}
                alt="moveit studio" />
            </div>
            <div className="col col--5 col--offset-1">
              <h1>MoveIt Studio</h1>
              <p><a href="https://picknik.ai/studio/">MoveIt Studio</a> is a complete platform 
                that enables robotics engineers and robot field operators to more quickly build 
                advanced applications that include 
                manipulator arms. </p>
              <p>Designed with a user-friendly interface, it includes 
                a set of pre-built tools that make it easy to build and debug <b>behavior trees</b>, 
                inspect trajectories, diagnose failures, and provide robot recovery. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}