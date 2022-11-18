import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './groot.module.css';
import Table from 'react-bootstrap/Table';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
function Check(props) {
  return <img src={useBaseUrl('img/check.png')} width="15" alt="yes" />;
}
function Cross(props) {
  return <img src={useBaseUrl('img/cross.png')} width="15" alt="no" />;
}
export default function Groot() {
  const renderTooltip = (message, props) => {
    return (<Tooltip id="button-tooltip" className={styles.toolTip} {...props}>
      {message}
    </Tooltip>)
  }
  
  return (
    <Layout title="Groot" description="Groot Editor">
      {/* groot intro */}
      <div className={`styles.sectionText`}>
        <div className={`container text--left ${styles.sectionText}`}>
          <div className="row">
            <div className="col col--6">
              <h1>Groot</h1>
              <p><b>Groot</b> is the Integrated Development Environment to build and debug Behavior Trees.
                It allows you to:
              </p>
              <p>
                <ul>
                  <li>Create and edit trees, using a drag and drop interface.</li>
                  <li>Monitor the state of a tree remotely in real-time.</li>
                  <li>Debug and test your behaviors (<b>new in version 2</b>)</li>
                </ul>
              </p>
                <h3>Groot 2 is under development, available in early preview</h3>
              <p>
                We are reimaginging Groot to be easier to use and more scalable, focusing in particular
                on the needs of industrial and professional users.
                <br />If you use BT.CPP and Groot professionally, <a href="mailto:dfaconti@aurynrobotics.com">contact us</a> and
                we will be happy to help.
              </p>
            </div>
            <div className="col col--6">
              <img
              className={styles.grootImg}
                src={useBaseUrl('img/groot_1.png')}
                alt="groot 1" />
            </div>
          </div>
        </div>
      </div>
      {/* groot versions & cards */}
      <div className={styles.sectionText}>
      </div>
      <div className={`${styles.sectionText} ${styles.flexCol}`}>
        <h1>Which version of Groot is the right for you?</h1>
        <div className={`container  text--left ${styles.sectionText}`}>
          <div className={`row ${styles.grootCardWrapper}`}>
            <div className={styles.grootCard}>
              <h2><img
                src={useBaseUrl('img/pro_logo_icon.svg')}
                alt="pro" width="40"/>   Groot 2.X</h2>
              
              <p><b>Groot 2</b> is the professional successor of Groot, focusing on improved
                user experience, modularity and scalability.
                It introduces powerful debugging and introspection tools, to support the
                entire development cycle, from conception to validation.
              </p>
            </div>
            <div className={styles.grootCard}>
            <h2><img
                src={useBaseUrl('img/open_source_icon.svg')}
                alt="pro" width="40"/>   Groot 1.0</h2>
              <p><b>Groot</b> is the original <a href="https://github.com/BehaviorTree/Groot">open source editor</a>.
                It is not under active development, but it still a valid
                option for users who are still using <b>BehaviorTree.CPP 3.8</b> and need
                real-time visualization.</p>
            </div>
          </div>
          
        </div>
      </div>
     
 {/* groot features table */}
      <div className={`container  ${styles.sectionText}`}>
        <Table className={styles.grootFeatureTable}>
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
              <th scope="row">
                Actively developed
                <OverlayTrigger
                  placement="bottom"
                  delay={{  hide: 400 }}
                  overlay={renderTooltip.bind(null, 'some extra information')}
                >
                  <button className={styles.tooltipTrigger}>?</button>
                </OverlayTrigger>
              </th>
              <td><Cross /></td>
              <td><Check /></td>
            </tr>
            <tr>
              <th scope="row">Commercial support</th>
              <td><Cross /></td>
              <td><Check /></td>
            </tr>
            <tr>
              <th scope="row">Tree Editor</th>
              <td>Free</td>
              <td>Free</td>
            </tr>
            <tr>
              <th scope="row">Realtime Monitoring</th>
              <td>Free</td>
              <td>Commercial<br/>(Coming soon)</td>
            </tr>
            <tr>
              <th scope="row">Supports the new feature in BehaviorTree.CPP 4.X</th>
              <td><Cross /></td>
              <td><Check /></td>
            </tr>
            <tr>
              <th scope="row">Multi-file projects<br /></th>
              <td><Cross /></td>
              <td><Check /></td>
            </tr>
            <tr>
              <th scope="row">Realtime Debugging:<br /><ul>
                <li>Add breakpoints at run-time</li>
                <li>Visualize the content of the Blackboard</li>
                <li>Nodes mocking and automated tests</li>
                <li>Add fault injection</li>
              </ul> </th>
              <td><Cross /></td>
              <td>Coming soon</td>
            </tr>
          </tbody>
        </Table>
      </div>
     {/* groot download  */}
      <div className={`${styles.sectionText} container ${styles.flexCol} gap-5 `}>
      <h1>Download Groot 2.0</h1>
      <p>
        <b>Free</b> as in "beer".   <b>Editor Mode</b> only.   <b>Version:</b> alpha_1.
      </p>
      <div className={styles.downloadGroup}>
        <div>
          <img className={styles.downloadLogo} src={useBaseUrl('img/linux.png')} alt="linux logo"/>
          <Link
            className="button button--outline button--primary"
            to={useBaseUrl('/')}
          >
            Download for linux
          </Link>
        </div>
        <div>
          <img className={styles.downloadLogo} src={useBaseUrl('img/windows.png')} alt="windows logo"/>
          <Link
            className="button button--outline button--primary"
            to={useBaseUrl('/')}
          >
            Download for windows
          </Link>
        </div>
        <div>
          <img className={styles.downloadLogo} src={useBaseUrl('img/mac.png')} alt="apple logo"/>
          <Link
            className="button button--outline button--primary"
            to={useBaseUrl('/')}
          >
            Download for mac
          </Link>
        </div>
      </div>
      </div>
    </Layout>
  );
}
