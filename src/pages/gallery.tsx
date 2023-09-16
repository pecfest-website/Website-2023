import React from "react";
import { Gallery } from "react-grid-gallery";
import PageLayout from "@/components/layout/PageLayout";
import IMAGES from "@/data/gallery";
import styles from "@/styles/Gallery/gallery.module.css";

function Contacts() {
    return (
        <PageLayout
            title="Gallery"
            description="Explore Our Fest Event History Gallery."
        >
            <h2 className={styles.heading}>Past Events and Competition</h2>
            <Gallery images={IMAGES} enableImageSelection={false} rowHeight={300} />

        </PageLayout>
    );
}

export default Contacts;

