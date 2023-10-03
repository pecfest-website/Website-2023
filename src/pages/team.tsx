import React from 'react'
import PageLayout from "@/components/layout/PageLayout";
import styles from "@/styles/Teams/teams.module.css";

function Team() {
  return (
    <PageLayout title="Schedule | Pecfest">
      <div className={styles.coreTeamContainer}>
        <div className={styles.coreTeamSidebar}>
          <div className={styles.sidebarParent}>
            <ul className={styles.sidebar}>
              <li>
                <a href="#t1">Convenors</a>
              </li>
              <li>
                <a href="#t1">Convenors</a>
              </li>
              <li>
                <a href="#t1">Convenors</a>
              </li>
              <li>
                <a href="#t1">Convenors</a>
              </li>
              <li>
                <a href="#t1">Convenors</a>
              </li>
              <li>
                <a href="#t1">Convenors</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Team