import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import styles from "@/styles/Teams/teams.module.css";
import Organiser from "@/components/organisers/Organiser";
import Sidebar from "./SideBar";

function Team() {
  const eventsNorg = [
    {id:1,eventname:'Festival Coordinator',eventOrg:[{src:'/assets/organisers/profile.jpeg'},{src:'/assets/organisers/profile.jpeg'}]},
    {id:2,eventname:'Events and Competition',eventOrg:[{src:'/assets/organisers/profile.jpeg'},{src:'/assets/organisers/profile.jpeg'}]},
    {id:3,eventname:'Marketing',eventOrg:[{src:'/assets/organisers/profile.jpeg'},{src:'/assets/organisers/profile.jpeg'}]},
    {id:4,eventname:'Finance',eventOrg:[{src:'/assets/organisers/profile.jpeg'},{src:'/assets/organisers/profile.jpeg'}]},
  ]
  
  return (
    <>
    <PageLayout title="Schedule | Pecfest">
          <div className={styles.coreTeamContainer}>
            <div style={{display:'flex',alignItems:'flex-start',position:'relative'}}>
                <Sidebar />
                <div className={styles.organisers}>
                  {eventsNorg.map(event=> <Organiser key={event.id} id={event.id} eventname={event.eventname} eventOrg={event.eventOrg} /> )}
                </div>
            </div>
        </div>
    </PageLayout>
    </>
  );
}

export default Team;
