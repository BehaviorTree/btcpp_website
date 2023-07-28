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

  const handleClickBasic = () => {
    console.log('free')
    scrollToSection('sectionDownload')
  }
  const handleClickPro = () => {
    console.log('Pro')
    window.location.href = 'mailto:license@aurynrobotics.com'
  }
  const obj = [
    {
      name: "Basic",
      price: "Free",
      durance: "",
      points: [
        "Full Behavior Tree Editor",
        "Monitor and Log Visualizer limited to 20 Nodes",
        "Not for commercial use",
      ],
      btn: "Download",
      onclick:() => handleClickBasic()
    },
    {
      name: "PRO (floating license)",
      price: "€790",
      durance: " / year",
      points: [
        "Search Nodes in large trees",
        "Unlimited Number of Nodes in Monitor and Log Visualizer",
        "Interactive real-time debugger",
        "Technical support",
      ],
      btn: "Contact",
      onclick: () => handleClickPro()
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
      btn: "Contact",
      onclick:() => handleClickPro()
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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Layout title='Groot' description='Groot Editor'>
      {/* groot intro */}

      <div className={clsx("hero hero--dark", styles.heroBanner)}>
        <div className='container '>
          <div className='row align-items-center'>
            <div className='col col--6' style={{ textAlign: "center" }}>
              <h1 className='hero__title ' id='hero__title'>
                Groot2
              </h1>
              <p className='hero__subtitle'>
                The most feature complete IDE <br/>to create and debug Behavior Trees.
              </p>
              <div className={styles.buttonGroup}>
                {/* <button
                  data-mooform-id='419144d7-9877-4876-bcfc-d1e1f0b6a2ad'
                  className='button button--primary button--lg'
                  onClick={openPopup}>
                  Our newsletter
                </button> */}
                <button
                  onClick={() => scrollToSection("sectionDownload")}
                  className='button button--primary button--lg'>
                  Download
                </button>
              </div>
            </div>
            <div className='col col--6'>
              <img src={useBaseUrl("img/groot2.png")} />
            </div>
          </div>
        </div>
      </div>

      <div className={`styles.sectionText`}>
        <div className={`container text--left ${styles.sectionText}`}>
          <div className='row'>
            <div className='col col--5' id="t1">
              <h1>BT Editor</h1>
              <ul>
                <li>Create and edit trees, using a simple drag and drop interface.</li>
                <li>Manage large projects using multiple files.</li>
                <li>Compatible with both BT.CPP 3 and 4.</li>
                <li>Split view to visualize two trees at once.</li>
                <li>Preview the XML in real-time.</li>
                <li><b>PRO:</b> search Nodes in large trees.</li>
              </ul>
              <br />
            </div>
            <div className='col col--6'>
              <video src={EditorVideo} muted loop autoPlay width='100%'></video>
            </div>
            <div className='col col--6' id="t2">
              <h1>BT Editor</h1>
              <ul>
                <li>Create and edit trees, using a simple drag and drop interface.</li>
                <li>Manage large projects using multiple files.</li>
                <li>Compatible with both BT.CPP 3 and 4.</li>
                <li>Split view to visualize two trees at once.</li>
                <li>Preview the XML in real-time.</li>
                <li><b>PRO:</b> search Nodes in large trees.</li>
              </ul>
              <br />
            </div>
          </div>
        </div>
      </div>

      <div className={`styles.sectionText`}>
        <div className={`container text--left ${styles.sectionText}`}>
          <div className='row'>
            <div className='col col--6'>
              <h1>Real-time Monitor</h1>
              <ul>
                <li>
                  Connect to a running BT.CPP executor and visualize the state
                  of the tree in real-time.
                </li>
                <li>
                  Record all transitions into a log file, that you can analyze later.
                </li>
                <li><b>PRO:</b> Visualize the content of the blackboard.</li>
                <li><b>PRO:</b> Add interactive breakpoints and fault injection.</li>
                <li><b>PRO:</b> Substitute any Nodes with dummy ones, at run-time.
                </li>
              </ul>
              <br />
            </div>
            <div className='col col--6'>
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
          <div className='col col--6' id="t3">
              <h1>Log Visualization</h1>
              <ul>
                <li>Open logs and replay the execution of the tree at different speeds. </li>
                <li>Visualize how long the Node was in the RUNNING state or returned a new status.</li>
                <li>View and export statistics about the status reported by your Nodes.</li>
              </ul>
              <br />
            </div>
            <div className='col col--6'>
              <video src={LogVideo} muted loop autoPlay width='100%'></video>
            </div>
            <div className='col col--6' id="t4">
              <h1>Log Visualization</h1>
              <ul>
                <li>Open logs and replay the execution of the tree at different speeds. </li>
                <li>Visualize how long the Node was in the RUNNING state or returned a new status.</li>
                <li>View and export statistics about the status reported by your Nodes.</li>
              </ul>
              <br />
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.sectionSeparator} container`}>Pricing</div>

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
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      id='btn'
                      data-mooform-id='419144d7-9877-4876-bcfc-d1e1f0b6a2ad'
                      className='button button--primary button--md'
                      onClick={item.onclick}>
                      {item.btn}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='row'>
            <div className='col col--2 '></div>
            <div className='col col--8 '>
              <h1 id='pricingHead'>(*) But wait, there is more!</h1>
              <ul>
              <li id='text'>
                  <b>Discounts:</b> planning to buy multiple licenses? 
                  Tell us more about your plans and we can suggest a tailored
                  solution for your needs.
                </li>
                <li id='text'>
                <b>Free for academia:</b> if you are a
                  student or researcher, you can receive a complementary 1 year
                  license. <a href="https://airtable.com/appqTlC23AiSoB4Fd/shrsC33d8feHZmKXs" target="_blank">Fill this form</a>
                  &ensp;and tell us more about your project.
                </li>

                <li id='text'>
                  <b>Source code escrow:</b> if Auryn
                  Robotics, the company behind Groot2, becomes unable to support
                  and maintain its software, the source code will be released open source,
                  under the Apache License, Version 2.0.
                </li>
              </ul>
              <br />
            </div>
            <div className='col col--2 '></div>
          </div>
        </div>
      </div>
      {/* groot download  */}
      <div id='sectionDownload' className={`${styles.sectionSeparator} container`}>
        Download
      </div>

      <div
        className={`${styles.sectionText} container ${styles.flexCol} gap-5 `}>
        <h3>Latest release: 1.1.0 (2023-07-28)</h3>
        <div className={styles.downloadGroup}>
          <div id='card_download' style={{ textAlign: "center" }}>
            <img
              className={styles.downloadLogo}
              src={useBaseUrl("img/windows.png")}
              alt='windows logo'
            />
            <Link
              onclick="fathom.trackGoal('I8XXZTK4', 0);"
              to='https://s3.us-west-1.amazonaws.com/download.behaviortree.dev/groot2_windows_installer/Groot2-1.1.0-windows-installer.exe'>
              Windows installer
            </Link>
          </div>
          <div id='card_download' style={{ textAlign: "center" }}>
            <img
              className={styles.downloadLogo}
              src={useBaseUrl("img/linux.png")}
              alt='linux logo'
            />
            <Link
              onclick="fathom.trackGoal('VGT2ANC4', 0);"
              to='https://s3.us-west-1.amazonaws.com/download.behaviortree.dev/groot2_linux_installer/Groot2-1.1.0-linux-installer.run'>
              Linux installer
            </Link>
          </div>
          <div id='card_download' style={{ textAlign: "center" }}>
            <img
              className={styles.downloadLogo}
              src={useBaseUrl("img/appimage.png")}
              alt='appimage logo'
            />
            <Link
              // style={{marginLeft: '20px'}}
              onclick="fathom.trackGoal('DIQDUTJ2', 0);"
              to='https://s3.us-west-1.amazonaws.com/download.behaviortree.dev/groot2_linux_installer/Groot2-v1.1.0-x86_64.AppImage'>
              AppImage (Linux)
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
