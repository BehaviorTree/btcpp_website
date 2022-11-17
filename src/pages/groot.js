import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './groot.module.css';
import Table from 'react-bootstrap/Table';

function Check(props) {
  return <img src={useBaseUrl('img/green_check.svg')} width="15" alt="yes" />;
}

function Cross(props) {
  return <img src={useBaseUrl('img/red_cross.svg')} width="13" alt="yes" />;
}

export default function Groot() {
  return (
    <Layout title="Groot" description="Groot Editor">
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

      <div className={styles.sectionTable}>
        <Table hover>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Groot 1.0</th>
              <th scope="col">Groot 2.x</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Open Source</th>
              <td><Check /></td>
              <td><Cross /></td>
            </tr>
            <tr>
              <th scope="row">Actively developed and supported</th>
              <td><Cross /></td>
              <td><Check /></td>
            </tr>
            <tr>
              <th scope="row">BehaviorTree.CPP 4.X support</th>
              <td><Cross /></td>
              <td><Check /></td>
            </tr>
            <tr>
              <th scope="row">Advanced Editor:<br/><ul>
                <li>Multi-file projects</li>
                <li>Improved subtree navigation</li>
              </ul> </th>
              <td><Cross /></td>
              <td><Check /></td>
            </tr>
            <tr>
              <th scope="row">Realtime monitoring</th>
              <td><Check /></td>
              <td>Coming soon</td>
            </tr>
            <tr>
              <th scope="row">Realtime Debugging:<br/><ul>
                <li>Add breakpoints</li>
                <li>Visualize the Blackboard</li>
                <li>Mock Nodes</li>
                <li>Add fault injection</li>
              </ul> </th>
              <td><Cross /></td>
              <td>Coming soon</td>
            </tr>

          </tbody>
        </Table>
      </div>
    </Layout>
  );
}