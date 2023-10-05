import ImagePics from "../Pics/Pics"
import styles from '../../styles/Organisers/organiser.module.css'


const Organiser = ({id,eventname,eventOrg}) => {

    return (
        <div className={styles.org}>
            <div id={id} className={styles.heading}>{eventname}</div>
            <div className={styles.img}>
                { eventOrg.map(e=> <ImagePics src={e.src} alt={e.alt}/> ) }
            </div>
        </div>
    )
}

export default Organiser