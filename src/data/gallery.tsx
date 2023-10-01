const convert = (imgUrl: string) => {
    const startId = imgUrl.indexOf('/d/') + 3;
    const endId = imgUrl.indexOf('/view') - 1;

    if (startId - 3 === -1 || endId + 1 === -1) {
        return imgUrl; // image link not from g-drive 
    } else {
        const newImgUrl = `https://drive.google.com/uc?export=view&id=${imgUrl.substring(startId, endId + 1)}`;
        return newImgUrl;
    }
}

const IMAGES = [

    {
        src: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
        original: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
        width: 420,
        height: 274,
        tags: [
            { value: 'Nature', title: 'Nature' },
            { value: 'Flora', title: 'Flora' }
        ],
        caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
        src: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
        original: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
        width: 420,
        height: 312,
        caption: 'Boats (Jeshu John - designerspics.com)'
    },
    {
        src: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
        original: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
        width: 420,
        height: 312,
        caption: 'Color Pencils (Jeshu John - designerspics.com)'
    },
    {
        src: 'https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg',
        original: 'https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg',
        width: 420,
        height: 313,
        caption: 'Red Apples with other Red Fruit (foodiesfeed.com)'
    },
    {
        src: 'https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg',
        original: 'https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg',
        width: 420,
        height: 283,
        caption: '37H (gratispgraphy.com)'
    },
    {
        src: 'https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg',
        original: 'https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg',
        width: 340,
        height: 420,
        tags: [{ value: 'Nature', title: 'Nature' }],
        caption: '8H (gratisography.com)'
    },
    {
        src: 'https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg',
        original: 'https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg',
        width: 420,
        height: 290,
        caption: '286H (gratisography.com)'
    },
    {
        src: 'https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg',
        original: 'https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg',
        width: 420,
        height: 248,
        tags: [{ value: 'People', title: 'People' }],
        caption: '315H (gratisography.com)'
    },
    {
        src: 'https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg',
        original: 'https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg',
        width: 420,
        height: 313,
        caption: '201H (gratisography.com)'
    },
    {
        src: 'https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg',
        original: 'https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg',
        alt: 'Big Ben - London',
        width: 348,
        height: 420,
        caption: 'Big Ben (Tom Eversley - isorepublic.com)'
    },
    {
        src: 'https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg',
        original: 'https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg',
        alt: 'Red Zone - Paris',
        width: 420,
        height: 213,
        tags: [{ value: 'People', title: 'People' }],
        caption: 'Red Zone - Paris (Tom Eversley - isorepublic.com)'
    },
    {
        src: 'https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg',
        original: 'https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg',
        alt: 'Wood Glass',
        width: 413,
        height: 420,
        caption: 'Wood Glass (Tom Eversley - isorepublic.com)'
    },
    {
        src: 'https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg',
        original: 'https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg',
        width: 420,
        height: 313,
        caption: 'Flower Interior Macro (Tom Eversley - isorepublic.com)'
    },
    {
        src: 'https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg',
        original: 'https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg',
        width: 420,
        height: 294,
        caption: 'Old Barn (Tom Eversley - isorepublic.com)'
    },
    {
        src: 'https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg',
        original: 'https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg',
        alt: 'Cosmos Flower',
        width: 420,
        height: 313,
        caption: 'Cosmos Flower Macro (Tom Eversley - isorepublic.com)'
    },
    {
        src: 'https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg',
        original: 'https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg',
        width: 371,
        height: 420,
        caption: 'Orange Macro (Tom Eversley - isorepublic.com)'
    },
    {
        src: 'https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg',
        original: 'https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg',
        width: 420,
        height: 313,
        tags: [
            { value: 'Nature', title: 'Nature' },
            { value: 'People', title: 'People' }
        ],
        caption: 'Surfer Sunset (Tom Eversley - isorepublic.com)'
    },
    {
        src: 'https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg',
        original: 'https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg',
        width: 420,
        height: 313,
        tags: [
            { value: 'People', title: 'People' },
            { value: 'Sport', title: 'Sport' }
        ],
        caption: 'Man on BMX (Tom Eversley - isorepublic.com)'
    },
    {
        src: 'https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg',
        original: 'https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg',
        width: 420,
        height: 313,
        caption: 'Ropeman - Thailand (Tom Eversley - isorepublic.com)'
    },
    {
        src: 'https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg',
        original: 'https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg',
        width: 420,
        height: 313,
        caption: 'Time to Think (Tom Eversley - isorepublic.com)'
    },
    {
        src: 'https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg',
        original: 'https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg',
        width: 420,
        height: 279,
        tags: [
            { value: 'Nature', title: 'Nature' },
            { value: 'Fauna', title: 'Fauna' }
        ],
        caption: 'Untitled (Jan Vasek - jeshoots.com)'
    },
    {
        src: 'https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg',
        original: 'https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg',
        width: 420,
        height: 315,
        tags: [{ value: 'People', title: 'People' }],
        caption: 'Untitled (moveast.me)'
    },
    {
        src: 'https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg',
        original: 'https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg',
        width: 357,
        height: 420,
        caption: 'A photo by 贝莉儿 NG. (unsplash.com)'
    },
    {
        src: 'https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg',
        original: 'https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg',
        width: 326,
        height: 420,
        caption: 'A photo by Matthew Wiebe. (unsplash.com)'
    }
]

export default IMAGES;