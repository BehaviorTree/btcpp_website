import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

export default function Studio() {
  return (
    <Layout title="MoveIt Studio" description="Picknik - MoveIt Studio">
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
      <div className={styles.sectionText}>
      <div className="container text--center {styles.sectionText}">
      <p> NOTE: <b>Auryn Robotics</b>, the company developing BehaviorTree.CPP, is not affiliated
              in any way with Picknik and MoveIt Studio.
      </p>
      </div>
      </div>
    </Layout>
  );
}