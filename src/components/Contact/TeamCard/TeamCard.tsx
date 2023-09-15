import React from 'react'
import styles from '@/styles/Contacts/teamCard.module.css';

type Props = {
    name?: string,
    post?: string,
    imgUrl?: string,
}

export default function ContactCard({name="John Doe", post="", imgUrl="/assets/logos/logo.png"}: Props) {

    return (
        <div 
            className={styles.container} 
            style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div>
                <div className={styles.name}>{name.toUpperCase()}</div>
                <div className={styles.post}>{post.toUpperCase()}</div>
            </div>
        </div>
    )
}
