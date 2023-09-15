import React from 'react'
import styles from '../styles/Contacts/contacts.module.css';
import ContactCard from '@/components/Contact/TeamCard/TeamCard';
import ContactUsCard from '@/components/Contact/ContactUsCard/ContactUsCard';
import PhoneSharpIcon from '@mui/icons-material/PhoneSharp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function Contacts() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Contact Us</div>
      <div className={styles.contactUsContainer}>
        {
          CONTACTUSINFO.map((contact, i) => {
            return (
              <ContactUsCard
                key={i}
                heading={contact.heading}
                icon={contact.icon}
                paras={contact.paras}
              />
            )
          })
        }
        <div>
          {/* <div className={styles.icon}><BookmarkIcon fontSize='large' /></div> */}
          {/* <div> */}
            <h2>Follow us at</h2>
            <div className={styles.socialIcons}>
              {
                SOCIALICONS.map((socialIcon, id) => <span key={id} className={styles.socialIcon}>{socialIcon.icon}</span>)
              }
            {/* </div> */}
          </div>
        </div>
      </div>

      <div className={styles.heading}>Our Team</div>
      <div className={styles.contactCards}>
        {
          (Array.apply(null, Array(6)).map((_, i) => {
            return (
              <div
                key={i}
                className={styles.contactCard}
              >
                <ContactCard />
              </div>
            );
          }))
        }
      </div>
    </div>
  )
}

export default Contacts;

const CONTACTUSINFO = [
  {
    heading: "Call us directly at",
    icon: <PhoneSharpIcon fontSize='large' />,
    paras: [
      "First Last: +91 xxxxx xxxx90",
      "First Last: +91 xxxxx xxxx90",
    ]
  },

  {
    heading: "Reach out via email at",
    icon: <EmailIcon fontSize='large' />,
    paras: [
      "convener.pecfest@pec.edu.in"
    ]
  },
  {
    heading: "Visit Us at",
    icon: <LocationOnIcon fontSize='large' />,
    paras: [
      "Punjab Engineering College",
      "Sector-12, Chandigarh"
    ]
  },
]

const SOCIALICONS = [
  { icon: <InstagramIcon sx={{ color: '#d62976' }} fontSize='large' /> },
  { icon: <FacebookIcon sx={{ color: '#1877F2' }} fontSize='large' /> },
  { icon: <YouTubeIcon sx={{ color: '#b2071d' }} fontSize='large' /> },
  { icon: <LinkedInIcon sx={{ color: '#0072b1' }} fontSize='large' /> },
]