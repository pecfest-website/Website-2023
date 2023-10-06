import PageLayout from "@/components/layout/PageLayout";
import React from "react";
import styles from "@/styles/Developers/developers.module.css";
import { Box } from "@mui/material";
import { developers } from "@/data/coreTeam";
import Organiser from "@/components/organisers/Organiser";

function Developers() {
    return (
        <PageLayout title="Developers | PECFEST'23" darkHeader>
            <Box component={"main"} className={styles.background}>
                <div className={styles.main_container}>
                    <div>
                        <div className={styles.pageheader}>Developers</div>
                        <div>
                            <div className={styles.third}>
                                {developers.fullStack &&
                                    developers.fullStack.map((item, i) => (
                                        <Organiser key={i} organiser={item} />
                                    ))}
                            </div> 
                        </div>
                    </div>
                    <div>
                        <div className={styles.pageheader}>UI-UX</div>
                        <div>
                            <div className={styles.third}>
                                {developers.ui.map((item, i) => (
                                    <Organiser key={i} organiser={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </PageLayout>
    );
}

export default Developers;
