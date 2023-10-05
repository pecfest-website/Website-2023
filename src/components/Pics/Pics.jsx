const styles = {
    img:{
        height: '250px',
        width: '250px',
        borderRadius: '10px'
    }
}

function ImagePics(props){
    const {src,alt} = props
    return (
        <img src={src} alt={alt} style={styles.img}/>
    )
}

export default ImagePics;