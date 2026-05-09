import { motion, useReducedMotion } from 'framer-motion'
import { createMotionVariants } from '../animations.js'

function About({ copy }) {
  const reducedMotion = useReducedMotion()
  const { fadeInLeft, fadeInRight, staggerContainer, staggerItem } =
    createMotionVariants(reducedMotion)
  const viewport = { once: true, amount: 0.24 }

  return (
    <div className="about-page">
      <section className="about-hero">
        <motion.div
          className="about-hero-copy"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p className="eyebrow" variants={staggerItem}>
            {copy.aboutPage.eyebrow}
          </motion.p>
          <motion.h1 variants={staggerItem}>{copy.aboutPage.title}</motion.h1>
          <motion.div className="about-gold-rule" aria-hidden="true" variants={staggerItem}>
            <span />
          </motion.div>
          <motion.p variants={staggerItem}>{copy.aboutPage.heroBody}</motion.p>
        </motion.div>
      </section>

      <motion.section
        className="about-philosophy"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div className="about-philosophy-copy" variants={fadeInLeft}>
          <p className="eyebrow">{copy.aboutPage.philosophy.eyebrow}</p>
          <h2>{copy.aboutPage.philosophy.title}</h2>
          <p>{copy.aboutPage.philosophy.body}</p>
          <div className="about-values">
            {copy.aboutPage.philosophy.values.map((value) => (
              <article key={value.title}>
                <span aria-hidden="true">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </article>
            ))}
          </div>
        </motion.div>
        <motion.div className="about-philosophy-image" aria-hidden="true" variants={fadeInRight} />
      </motion.section>

      <motion.section
        className="about-commitment"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div className="about-commitment-image" aria-hidden="true" variants={fadeInLeft} />
        <motion.div className="about-commitment-copy" variants={fadeInRight}>
          <p className="eyebrow">{copy.aboutPage.commitment.eyebrow}</p>
          <h2>{copy.aboutPage.commitment.title}</h2>
          <p>{copy.aboutPage.commitment.body}</p>
          <strong>{copy.aboutPage.commitment.signature}</strong>
        </motion.div>
      </motion.section>

      <motion.section
        className="about-heritage"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div className="about-heritage-copy" variants={fadeInLeft}>
          <p className="eyebrow">{copy.aboutPage.heritage.eyebrow}</p>
          <h2>{copy.aboutPage.heritage.title}</h2>
        </motion.div>
        <motion.div className="about-timeline" variants={staggerContainer}>
          {copy.aboutPage.heritage.items.map((item) => (
            <motion.article key={item.year} variants={staggerItem}>
              <span>{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>
    </div>
  )
}

export default About
