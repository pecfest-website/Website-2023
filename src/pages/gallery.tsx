import React, { useState } from "react";
import { Gallery } from "react-grid-gallery";
import PageLayout from "@/components/layout/PageLayout";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import IMAGES from "@/data/gallery";
import styles from "@/styles/Gallery/gallery.module.css";
import { GetServerSidePropsContext } from "next";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/serverless/firebase";

interface ImageObject {
    src: string;
    original: string;
    width: number;
    height: number;
    caption: string;
}

interface SlidesObject {
    src: string;
    height: number;
    width: number;
}

interface Props {
    img: ImageObject[];
    slides: SlidesObject[];
}

function GalleryView({ img, slides }: Props) {
    const [index, setIndex] = useState(-1);
    const handleClick = (index: number, _: any) => setIndex(index);

    return (
        <PageLayout title="Gallery | Pecfest'23">
            <h2 className={styles.heading}>Past Events and Competition</h2>
            <Gallery
                images={img}
                enableImageSelection={false}
                onClick={handleClick}
                rowHeight={300}
            />
            <Lightbox
                slides={slides}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
            />
        </PageLayout>
    );
}

export default GalleryView;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const docRef = doc(db, "gallery/images");
    const imagesSnapshot = await getDoc(docRef);

    if (imagesSnapshot.exists()) {
        const imageUrls = imagesSnapshot.data()["images"] as string[];

        const imgs = imageUrls.map((imageurl: string) => {
            return {
                src: imageurl,
                original: imageurl,
                width: 420,
                height: 283,
                caption: "37H (gratispgraphy.com)",
            };
        });

        const slides = imgs.map(({ src, width, height }) => ({
            src: src,
            width: 800,
            height: 800,
        }));
        console.log(imgs);
        console.log(slides);
        return {
            props: {
                imgs,
                slides,
            },
        };
    } else {
        return {
            props: {
                imgs: [],
                slides: []
            },
        };
    }
}
