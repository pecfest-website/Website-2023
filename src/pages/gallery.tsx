import { useState, useEffect } from "react";
import styles from "@/styles/Gallery/gallery.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import {
    IoIosArrowBack,
    IoIosArrowForward,
    IoMdClose,
    IoIosHeart,
} from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import PageLayout from "@/components/layout/PageLayout";
import PageLoader from "@/components/layout/PageLoader";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/serverless/firebase";

const Gallery = () => {
    const [galleryImages, setGalleryImages] = useState<any>([]);
    const [likes, setLikes] = useState<number[]>([]);
    const [totalImages, setTotalImages] = useState<any>([]);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchGalleryImages = async () => {
        try {
            const colRef = collection(db, "gallery");
            const imagesSnapshot = await getDocs(colRef);

            if (imagesSnapshot.docs) {
                const imgs = imagesSnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return data["image"];
                });
                setTotalImages(imgs);
                setGalleryImages(imgs.slice(0, 10));
                setLikes(imgs.slice(0, 10).map((e: any) => e.like));
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchGalleryImages();
    }, []);

    const handleLike = () => {
        const selectedImage = galleryImages[slideNumber];
        const updatedImages = [...galleryImages];

        if (!likes.includes(slideNumber)) {
            setIsLiked(true);
            updatedImages[slideNumber] = {
                ...selectedImage,
                like: selectedImage.like + 1,
            };
            setLikes([...likes, slideNumber]);
        } else {
            setIsLiked(false);
            updatedImages[slideNumber] = {
                ...selectedImage,
                like: selectedImage.like - 1,
            };
            const updatedLikes = likes.filter((like) => like !== slideNumber);
            setLikes(updatedLikes);
        }

        setGalleryImages(updatedImages);
    };

    const [slideNumber, setSlideNumber] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = (index: any) => {
        setSlideNumber(index);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const prevSlide = () => {
        slideNumber === 0
            ? setSlideNumber(galleryImages.length - 1)
            : setSlideNumber(slideNumber - 1);
    };

    const nextSlide = () => {
        slideNumber + 1 === galleryImages.length
            ? setSlideNumber(0)
            : setSlideNumber(slideNumber + 1);
    };

    useEffect(() => {
        const handleKeyPress = (event: any) => {
            if (event.keyCode === 37) {
                prevSlide();
            } else if (event.keyCode === 39) {
                nextSlide();
            } else if (event.keyCode === 27) {
                handleCloseModal();
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    });

    const nextImages = (endIndex: number) => {
        setGalleryImages(totalImages.slice(0, endIndex));
        setLikes(totalImages.slice(0, endIndex).map((e: any) => e.like));
    };

    if (loading) {
        return <PageLoader />;
    }

    return (
        <PageLayout title="Gallery | PECFEST'23">
            <div className={styles.gallery}>
                <div className={styles.galleryTitle}>
                    <h1 className={styles.heading}>Gallery</h1>
                </div>
                {openModal && (
                    <div
                        className={styles.sliderWrap}
                    >
                        <IoMdClose
                            className={styles.btnClose}
                            onClick={handleCloseModal}
                            size={25}
                        />
                        <IoIosArrowBack
                            className={styles.btnPrev}
                            onClick={prevSlide}
                            size={40}
                        />
                        <IoIosArrowForward
                            className={styles.btnNext}
                            onClick={nextSlide}
                            size={40}
                        />
                        <div className={styles.fullScreenImage}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={galleryImages[slideNumber]} alt="" />
                        </div>
                    </div>
                )}
                <InfiniteScroll
                    dataLength={galleryImages.length}
                    next={() => {
                        nextImages(galleryImages.length + 10);
                    }}
                    hasMore={totalImages.length > galleryImages.length}
                    loader={<p>loading</p>}
                >
                    <div className={styles.galleryWrap}>
                        {galleryImages &&
                            galleryImages.map((slide: any, index: any) => {
                                return (
                                    <div
                                        className={styles.single}
                                        key={index}
                                        onClick={() => handleOpenModal(index)}
                                    >
                                        <LazyLoadImage
                                            src={slide}
                                            alt=""
                                            effect="blur"
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </InfiniteScroll>
            </div>
        </PageLayout>
    );
};

export default Gallery;
