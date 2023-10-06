import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import styles from "@/styles/Teams/teams.module.css";
import Organiser from "@/components/organisers/Organiser";
import { coreTeam } from "@/data/coreTeam";

function Team() {
    return (
        <>
            <PageLayout title="Core Team | Pecfest">
                <main className={styles.background}>
                    <div className={styles.main_container}>
                        <div>
                            <div className={styles.pageheader}>Conveners</div>
                            <div>
                                <div className={styles.third}>
                                    {coreTeam.convener &&
                                        coreTeam.convener.map((item, i) => (
                                            <Organiser
                                                key={i}
                                                organiser={item}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.pageheader}>Secretaries</div>
                            <div>
                                <div className={styles.third}>
                                    {coreTeam.secretary.map((item, i) => (
                                        <Organiser key={i} organiser={item} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.pageheader}>Heads</div>
                            <div>
                                <div className={styles.third}>
                                    {coreTeam.head.map((item, i) => (
                                        <Organiser key={i} organiser={item} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </PageLayout>
        </>
    );
}

export default Team;
