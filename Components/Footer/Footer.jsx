import React from "react";
import styles from "../../styles/Footer/Footer.module.css";


export default function Footer() {
  return (
   
    <footer className={styles.main}>
    <div className="container">
        <div className="row">
            <div className="col-12 mx-auto d-flex justify-content-center pt-3">
             <h4 className={styles.footext}> © 2023 The Decloud  </h4>
            </div>
        </div>
    </div>
    </footer>
  );
}
