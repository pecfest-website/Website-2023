import PhoneSharpIcon from "@mui/icons-material/PhoneSharp";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookMark from "@mui/icons-material/Bookmark";
import { SOCIALICONS } from "@/data/socials";
import styles from "@/styles/Contacts/contacts.module.css";

const getSocialIconSpan = () => {
    const spans = SOCIALICONS.map((socialIcon, id) => (
        <a href={socialIcon.link} key={id} className={styles.socialIcon}>
            {socialIcon.icon}
        </a>
    ))

    return (
        <div className={styles.socialWrapper}>
            {spans}
        </div>
    )
}

export const CONTACTUSINFO = [
    {
        heading: "Call us directly at",
        icon: <PhoneSharpIcon fontSize="large" />,
        paras: ["First Last: +91 xxxxx xxxx90", "First Last: +91 xxxxx xxxx90"],
    },

    {
        heading: "Reach out via email at",
        icon: <EmailIcon fontSize="large" />,
        paras: ["convener.pecfest@pec.edu.in"],
    },
    {
        heading: "Visit Us at",
        icon: <LocationOnIcon fontSize="large" />,
        paras: ["Punjab Engineering College", "Sector-12, Chandigarh"],
    },
    {
        heading: "Follow Us on Social",
        icon: <BookMark fontSize="large" />,
        paras: [getSocialIconSpan()]
    }
];