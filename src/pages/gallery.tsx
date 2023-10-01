<<<<<<< HEAD
import React, { useState } from "react";
import { Gallery } from "react-grid-gallery";
import PageLayout from "@/components/layout/PageLayout";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import IMAGES from "@/data/gallery";
import styles from "@/styles/Gallery/gallery.module.css";

const slides = IMAGES.map(({ src, width, height }) => ({
    src: src,
    width: 800,
    height: 800,
}));

function Contacts() {
    const [index, setIndex] = useState(-1);
    const handleClick = (index: number, _: any) => setIndex(index);

    return (
        <PageLayout
            title="Gallery"
            description="Explore Our Fest Event History Gallery."
        >
            <h2 className={styles.heading}>Past Events and Competition</h2>
            <Gallery 
                images={IMAGES} 
                enableImageSelection={false}
                onClick={handleClick} 
                rowHeight={300} />
            <Lightbox
                slides={slides}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
            />

=======
import PirateShipLottie from "@/components/events/shipLottieAnimation";
import PageLayout from "@/components/layout/PageLayout";
import React from "react";
import styles from "@/styles/Sponsors/sponsors.module.css";

function Gallery() {
    return (
        <PageLayout title="Gallery | Pecfest" noHeader>
            <PirateShipLottie loop={true} />
            <h1 className={styles.comingSoon}>Coming Soon</h1>
>>>>>>> 05d38f3cf5055ef29848d728e7cd3a1735967d28
        </PageLayout>
    );
}

<<<<<<< HEAD
export default Contacts;

=======
export default Gallery;
>>>>>>> 05d38f3cf5055ef29848d728e7cd3a1735967d28
