import Icon from '@/assets/app-image.svg'
import classes from './AboutPage.module.scss'

const AboutPage = () => {
  return (
    <div className={classes.aboutPage}>
      About page <Icon className={classes.icon} width={50} height={50} />
    </div>
  )
}

export default AboutPage
