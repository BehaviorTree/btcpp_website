import React, { useEffect } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./groot.module.css";
import Table from "react-bootstrap/Table";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Head from "@docusaurus/Head";
import clsx from "clsx";

import EditorVideo from "@site/static/img/groot2_editor.mp4";
import MonitorVideo from "@site/static/img/groot2_monitor.mp4";
import LogVideo from "@site/static/img/groot2_log.mp4";

function Check(props) {
  return <img src={useBaseUrl("img/check.png")} width='15' alt='yes' />;
}
function Cross(props) {
  return <img src={useBaseUrl("img/cross.png")} width='15' alt='no' />;
}
export default function Groot() {
  const obj = [
    {
      name: "Basic",
      price: "Free",
      durance: "",
      points: [
        "Full Behavior Tree Editor",
        "Real-time Monitoring (max 20 Nodes)",
        "Log Visualization (max 20 Nodes)",
        "Not for commercial use",
      ],
      btn: "Download",
    },
    {
      name: "PRO (floating license)",
      price: "€790",
      durance: " / year",
      points: [
        "Search Nodes in large trees",
        "Unlimited Number of Nodes in Monitor and Log Visualizer",
        "Interactive real-time debugging",
        "Technical support",
      ],
      btn: "Licensing page",
    },
    {
      name: "PRO (source code)",
      price: "Contact us",
      durance: "",
      points: [
        "All the features in PRO",
        "Access to the source code",
        "Site license with unlimited number of seats.",
      ],
      btn: "Contact us",
    },
  ];
  console.log(obj);
  useEffect(() => {
    openPopup();
    window.plausible =
      window.plausible ||
      function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
  }, []);

  const renderTooltip = (message, props) => {
    return (
      <Tooltip id='button-tooltip' className={styles.toolTip} {...props}>
        {message}
      </Tooltip>
    );
  };

  const openPopup = () => {
    if (!window.mootrack) {
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
      );
    }
    {
      (" ");
    }
    mootrack("loadForm", "419144d798774876bcfcd1e1f0b6a2ad");
  };

  return (
    <Layout title='Groot' description='Groot Editor'>
      {/* groot intro */}
      <Head>
        <script
          defer
          file-types='run,AppImage'
          data-domain='behaviortree.dev'
          src='https://plausible.io/js/script.file-downloads.js'></script>
        <script
          defer
          data-domain='behaviortree.dev'
          src='https://plausible.io/js/script.js'></script>
      </Head>

      <div className={clsx("hero hero--dark", styles.heroBanner)}>
        <div className='container '>
          <div className='row align-items-center'>
            <div className='col col--5'>
              <h1 className='hero__title '>Groot2</h1>
              <p className='hero__subtitle'>
                The IDE to create and debug Behavior Trees.
              </p>
              <div className={styles.buttonGroup}>
                {/* <Link
                  className="button button--primary button--lg umami--click--signup-button"
                        to="https://airtable.com/shrTx7NgRIa0cKlK8">
                        Keep me up to date
                </Link> */}
                <button
                  data-mooform-id='419144d7-9877-4876-bcfc-d1e1f0b6a2ad'
                  className='button button--primary button--lg umami--click--signup-button'
                  onClick={openPopup}>
                  Keep me up to date
                </button>
              </div>
            </div>
            <div className='col col--7'>
              <img src={useBaseUrl("img/groot2.png")} />
            </div>
          </div>
        </div>
      </div>

      <div className={`styles.sectionText`}>
        <div className={`container text--left ${styles.sectionText}`}>
          <div className='row'>
            <div className='col col--7'>
              <video src={EditorVideo} muted loop autoPlay width='100%'></video>
            </div>
            <div className='col col--5'>
              <h1>BT Editor</h1>
              <ul>
                <li>Create and edit trees, using a drag and drop interface.</li>
                <li>Manage large projects and multiple files.</li>
                <li>Compatible with both BT.CPP 3 and 4</li>
                <li>Split view to visualize multiple trees at once.</li>
                <li>Preview the XML in real-time.</li>
                <li>Search Nodes in large trees (PRO)</li>
              </ul>
              <br />
            </div>
          </div>
        </div>
      </div>

      <div className={`styles.sectionText`}>
        <div className={`container text--left ${styles.sectionText}`}>
          <div className='row'>
            <div className='col col--5'>
              <h1>Real-time Monitor</h1>
              <ul>
                <li>
                  Connect to a running BT.CPP executor and visualize its state
                  in real-time.
                </li>
                <li>
                  Record all transitions into a log file, to analyze them later.
                </li>
                <li>Visualize the content of the blackboard (PRO)</li>
                <li>Add interactive breakpoints and fault injection (PRO)</li>
                <li>
                  Substitute any Nodes with dummy ones, at run-time (PRO).{" "}
                </li>
              </ul>
              <br />
            </div>
            <div className='col col--7'>
              <video
                src={MonitorVideo}
                muted
                loop
                autoPlay
                width='100%'></video>
            </div>
          </div>
        </div>
      </div>

      <div className={`styles.sectionText`}>
        <div className={`container text--left ${styles.sectionText}`}>
          <div className='row'>
            <div className='col col--7'>
              <video src={LogVideo} muted loop autoPlay width='100%'></video>
            </div>
            <div className='col col--5'>
              <h1>Log Visualization</h1>
              <ul>
                <li>
                  Open logs and replay the execution of the tree at different
                  speeds.
                </li>
                <li>
                  Visualize how long a Node has been in the RUNNING state.
                </li>
                <li>
                  View and export statistics about the number of times Nodes
                  returned a status.
                </li>
              </ul>
              <br />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${styles.sectionSeparator} container`}>
        Pricing
      </div>  

      <div className={`styles.sectionText`}>
        <div className={`container `}>
          <div className={`row`} id='row_price'>
            {obj?.map((item) => (
              <div
                className='col col--4 '
                id='card_col'
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}>
                <div id='card'>
                  <div id='card_header'>{item.name}</div>
                  <div id='price_row'>
                    <div id='price'>{item.price}</div>
                    <div id='durance'>{item.durance}</div>
                  </div>

                  <ul id='point_stack' as='ul'>
                    {item.points.map((p) => (
                      <li id='point' as='li'>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <button className='button  button--md umami--click' id='btn'>
                    {item.btn}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className='row'>
            <div className='col col--2 '></div>
            <div className='col col--8 '>
              <h1 id='pricingHead'>Our commitment to the community</h1>
              <ul>
                <li id='text'>
                  <span id='text_head'>Free for researchers:</span> if you are a
                  student or researcher, you can receive a complementary 1
                  year license. Fill this form to tell us more about you.
                </li>

                <li id='text'>
                  <span id='text_head'> Source code escrow:</span> if Auryn Robotics,
                  the company behind Groot2, becomes unable to support and maintain it, 
                  its source code will be released open source under the Apache License, Version 2.0.
                </li>
              </ul>
              <br />
            </div>
            <div className='col col--2 '></div>
          </div>
        </div>
      </div>
      {/* groot download  */}
      <div
        className={`${styles.sectionSeparator} container`}>
        Download
      </div>  

      <div
        className={`${styles.sectionText} container ${styles.flexCol} gap-5 `}>
        <h3>Latest release: 1.0.1 (2023-07-07)</h3>
        <div className={styles.downloadGroup}>
          <div>
            <img
              className={styles.downloadLogo}
              src={useBaseUrl("img/windows.png")}
              alt='windows logo'
            />
            <Link
              onclick="fathom.trackGoal('I8XXZTK4', 0);"
              to='https://s3.us-west-1.amazonaws.com/download.behaviortree.dev/groot2_windows_installer/Groot2-1.0.1-windows-installer.exe'>
              Download Windows installer
            </Link>
          </div>
          <div>
            <img
              className={styles.downloadLogo}
              src={useBaseUrl("img/linux.png")}
              alt='linux logo'
            />
            <Link
              onclick="fathom.trackGoal('VGT2ANC4', 0);"
              to='https://s3.us-west-1.amazonaws.com/download.behaviortree.dev/groot2_linux_installer/Groot2-1.0.1-linux-installer.run'>
              Download Linux installer
            </Link>
          </div>
          <div>
            <img
              className={styles.downloadLogo}
              src={useBaseUrl("img/appimage.png")}
              alt='appimage logo'
            />
            <Link
              onclick="fathom.trackGoal('DIQDUTJ2', 0);"
              to='https://s3.us-west-1.amazonaws.com/download.behaviortree.dev/groot2_linux_installer/Groot2-v1.0.1-x86_64.AppImage'>
              Download AppImage (Linux)
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
