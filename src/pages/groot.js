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

  const openPopup = () => {
    if(!window.mootrack)
          {
            !(function (t, n, e, o, a) {
              function d(t) {
                var n = ~~(Date.now() / 3e5),
                  o = document.createElement(e);
                (o.async = !0), (o.src = t + "?ts=" + n);
                var a = document.getElementsByTagName(e)[0];
                a.parentNode.insertBefore(o, a);
              }
              (t.MooTrackerObject = a),
                (t[a] =
                  t[a] ||
                  function () {
                    return t[a].q
                      ? void t[a].q.push(arguments)
                      : void (t[a].q = [arguments]);
                  }),
                window.attachEvent
                  ? window.attachEvent("onload", d.bind(this, o))
                  : window.addEventListener("load", d.bind(this, o), !1);
            })(
              window,
              document,
              "script",
              "https://cdn.stat-track.com/statics/moosend-tracking.min.js",
              "mootrack"
            )
          }{" "}
          mootrack('loadForm', '419144d798774876bcfcd1e1f0b6a2ad')
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
                <h3>Groot 2 is under development (preview now available)</h3>
              <p>
                We are reimaginging Groot to be easier to use and more scalable, focusing in particular
                on the needs of industrial and professional users.
                <br/>If you use BT.CPP and Groot professionally, <a href="mailto:dfaconti@aurynrobotics.com">contact us</a> and
                we will be happy to help.
              </p>
              
              <div className={styles.buttonGroup}>
                <button
                  data-mooform-id="419144d7-9877-4876-bcfc-d1e1f0b6a2ad"
                  className="button button--primary button--lg umami--click--signup-button"
                  onClick={openPopup} >
                  Keep me up to date
                </button>
              </div>

            </div>
            <div className="col col--6">
              <img
              className={styles.grootImg}
                src={useBaseUrl('img/groot_2.png')}
                alt="groot 2" />
            </div>
          </div>
        </div>
      </div>
      {/* groot versions & cards */}
      <div className={styles.sectionText}>
      </div>
      <div className={`${styles.sectionText} ${styles.comparisionSection} ${styles.flexCol}`}>
        <div class="container">
          <h2 className='text--center'>Which version of Groot is the right for you?</h2>
          <div className="row">
            <div className="col col--6">
              <div className={`text--left ${styles.sectionText}`}>
                <div className={`row ${styles.grootCardWrapper}`}>
                  <div className={styles.grootCard}>
                    <h2><img
                      src={useBaseUrl('img/pro_logo_icon.svg')}
                      alt="pro" width="40"/>   Groot 2.X</h2>
                    
                    <p><b>Groot 2</b> is the professional successor of Groot, focusing on improved
                      user experience, debuggability and scalability.<br/>
                      It introduces advanced tools to support the
                      entire development cycle, from conception to validation.
                    </p>
                    <p>
                      <b>Under development:</b> you can download the free editor.
                    </p>
                  </div>
                  <div className={styles.grootCard}>
                  <h2><img
                      src={useBaseUrl('img/open_source_icon.svg')}
                      alt="pro" width="40"/>   Groot 1.0</h2>
                    <p><b>Groot</b> is the original open source editor for <b>BT.CPP</b>.<br/>
                      It is not under active development anymore, but it is still a great
                      option for users who are using <b>BehaviorTree.CPP 3.8</b> and need
                      real-time visualization.</p>
                      <div className={styles.buttonGroup}>
                      <Link className="button button--primary" to="https://github.com/BehaviorTree/Groot">
                        Groot on Github
                      </Link>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col--6">
              {/* groot features table */}
              <div className={`${styles.sectionText} ${styles.grootFeatureTableWrapper}`}>
                <Table className={styles.grootFeatureTable}>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col" className={`text--center ${styles.whitespaceNoWrap}`}>Groot 1.0</th>
                      <th scope="col" className={`text--center ${styles.whitespaceNoWrap}`}>Groot 2.x</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">BehaviorTree.CPP compatibility
                      </th>
                      <td>3.8</td>
                      <td>4.X</td>
                    </tr>
                    <tr>
                      <th scope="row">Open Source</th>
                      <td><Check /></td>
                      <td><Cross /></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        Actively developed
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
                      <th scope="row">Multi-file projects<br /></th>
                      <td><Cross /></td>
                      <td><Check /></td>
                    </tr>
                    <tr>
                      <th scope="row">Support for BT.CPP 4 pre/post conditions<br /></th>
                      <td><Cross /></td>
                      <td><Check /></td>
                    </tr>
                    <tr>
                      <th scope="row">Realtime Monitoring</th>
                      <td>Free</td>
                      <td>Commercial<br/><span className={`${styles.whitespaceNoWrap}`}>(Coming soon)</span></td>
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
            </div>
          </div>
        </div>
      </div>
     
     {/* groot download  */}
      <div className={`${styles.sectionText} container ${styles.flexCol} gap-5 `}>
      <h1>Download Groot 2</h1>
      <h3>Version: 0.1.0 (beta-1)</h3>
      <div className={styles.downloadGroup}>
        <div>
          <img className={styles.downloadLogo} src={useBaseUrl('img/windows.png')} alt="windows logo"/>
          <Link
            className="button button--outline button--primary button--lg umami--click--download-windows"
            to="https://s3.us-west-1.amazonaws.com/download.behaviortree.dev/groot2_windows_installer/Groot2-windows-installer.exe"
          >
            Download Windows installer
          </Link>
        </div>
        <div>
          <img className={styles.downloadLogo} src={useBaseUrl('img/linux.png')} alt="linux logo"/>
          <Link
            className="button button--outline button--primary button--lg umami--click--download-linux"
            to="https://s3.us-west-1.amazonaws.com/download.behaviortree.dev/groot2_linux_installer/Groot2-linux-installer.run"
          >
            Download Linux installer
          </Link>
        </div>
        <div>
          <img className={styles.downloadLogo} src={useBaseUrl('img/appimage.png')} alt="appimage logo"/>
          <Link
            className="button button--outline button--primary button--lg umami--click--download-appimage"
            to="https://s3.us-west-1.amazonaws.com/download.behaviortree.dev/groot2_linux_installer/Groot2-x86_64.AppImage"
          >
            Download AppImage (Linux)
          </Link>
        </div>
      </div>
      </div>
    </Layout>
  );
}
