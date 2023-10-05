
import styles from '../styles/SideBar/sidebar.module.css'
import Link from 'next/link'

const Sidebar = () => {
  const sideNav = [
    {id:1, event:'Festival Coordinator'},
    {id:1, event:'Event and Competitons'},
    {id:2, event:'Marketing'}, 
    {id:3, event:'Finance'}, 
    {id:4, event:'Show Management'}, 
    {id:5, event:'Media & publicity'}, 
    {id:6, event:'Public Relation'}, 
    {id:7, event:'Design'}, 
    {id:8, event:'Web & App'}, 
    {id:9, event:'Security'}, 
  ]

  return (
    <nav className={styles.nav}>
        <div className={styles.sidebox}>
            {sideNav.map( (navLink,index) => <div className={styles.linkBox}><Link className={styles.link} href={`#${navLink.id}`} key={index}>&#128312; {navLink.event}</Link></div>  )}
        </div>
    </nav>
  )
}

export default Sidebar