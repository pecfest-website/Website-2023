import PhoneSharpIcon from "@mui/icons-material/PhoneSharp";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookMark from "@mui/icons-material/Bookmark";
import { SOCIALICONS } from "@/data/socials";
import styles from "@/styles/Contacts/contacts.module.css";

const getSocialIconSpan = () => {
    const spans = SOCIALICONS.map((socialIcon, id) => (
        <a
            href={socialIcon.link}
            key={id}
            className={styles.socialIcon}
            target="_blank"
            referrerPolicy="no-referrer"
        >
            {socialIcon.icon}
        </a>
    ));

    return <div className={styles.socialWrapper}>{spans}</div>;
};

export const CONTACTUSINFO = [
    {
        heading: "Call us directly at",
        icon: <PhoneSharpIcon fontSize="large" />,
        paras: [
            "Harshpreet Singh Johar: 96461 70170",
            "Ishwarendra Jha: 99151 06579",
        ],
    },

    {
        heading: "Reach out via email at",
        icon: <EmailIcon fontSize="large" />,
        paras: ["convener.pecfest@pec.edu.in"],
    },
    {
        heading: "Visit us at",
        icon: <LocationOnIcon fontSize="large" />,
        paras: ["Punjab Engineering College", "Sector-12, Chandigarh"],
    },
    {
        heading: "Follow Us on Social",
        icon: <BookMark fontSize="large" />,
        paras: [getSocialIconSpan()],
    },
];
