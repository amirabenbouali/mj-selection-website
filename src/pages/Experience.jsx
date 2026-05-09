import { motion, useReducedMotion } from 'framer-motion'
import { createMotionVariants } from '../animations.js'

function VineLeaf() {
  return (
    <svg className="experience-vine-svg" viewBox="0 0 560 260" aria-hidden="true">
      <path
        d="M36 147 C108 66 162 198 242 112 C300 48 366 80 394 138 C424 200 500 152 536 76"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M380 131 C392 72 440 38 510 28 C488 92 442 136 380 131 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M408 124 C438 96 470 58 510 28 M424 122 L421 78 M450 108 L466 58 M474 82 L503 72"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M244 108 C264 72 300 52 342 58 C320 96 286 116 244 108 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M130 78h78l-12 58c-5 24-49 24-54 0L130 78Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M169 154v58M138 212h62M137 106h64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M74 174c7-8 18-8 25 0c7-8 18-8 25 0c-8 8-17 11-25 9c-8 2-17-1-25-9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function ExperienceIcon({ type }) {
  if (type === 1) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 29v11M17 40h14M15 7h18l-3 17a6 6 0 0 1-12 0L15 7Z" />
        <path d="M17 17h14" />
      </svg>
    )
  }

  if (type === 2) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 42V8" />
        <path d="M24 8 12 20l12 22 12-22L24 8Z" />
        <path d="M24 20 13 20M24 27l-8 5M24 27l8 5M24 34l-6 4M24 34l6 4" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M13 15c3-3 19-3 22 0v18c-3 3-19 3-22 0V15Z" />
      <path d="M15 12c4 3 14 3 18 0M15 36c4-3 14-3 18 0M18 14c-2 7-2 15 0 22M30 14c2 7 2 15 0 22" />
      <path d="M13 24h22" />
    </svg>
  )
}

function Experience({ copy, onNavigate }) {
  const reducedMotion = useReducedMotion()
  const { fadeUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem } = createMotionVariants(reducedMotion)
  const page = copy.experiencePage

  return (
    <div className="experience-page">
      <section className="experience-hero">
        <motion.div
          className="experience-hero-copy"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="eyebrow" variants={staggerItem}>
            {page.eyebrow}
          </motion.p>
          <motion.h1 variants={staggerItem}>{page.title}</motion.h1>
          <motion.p variants={staggerItem}>{page.body}</motion.p>
          <motion.button
            className="experience-button"
            type="button"
            onClick={() => onNavigate('contact')}
            variants={staggerItem}
          >
            {page.action}
            <span aria-hidden="true">→</span>
          </motion.button>
        </motion.div>
      </section>

      <motion.section
        className="experience-list-section"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div className="experience-list-image" variants={fadeInLeft}>
          <blockquote className="experience-image-quote">{page.heroQuote}</blockquote>
        </motion.div>
        <motion.div className="experience-list-panel" variants={fadeInRight}>
          <p className="eyebrow">{page.listEyebrow}</p>
          <div className="experience-list">
            {page.experiences.map((item, index) => (
              <article className="experience-row" key={item.title}>
                <span aria-hidden="true">
                  <ExperienceIcon type={index + 1} />
                </span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="experience-approach-section"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.div className="experience-approach-copy" variants={fadeUp}>
          <p className="eyebrow">{page.approach.eyebrow}</p>
          <h2>{page.approach.title}</h2>
          <p>{page.approach.body}</p>
        </motion.div>
        <motion.div className="experience-leaf-illustration" variants={fadeInRight}>
          <VineLeaf />
          <p>{page.approach.note}</p>
        </motion.div>
      </motion.section>

      <motion.section
        className="experience-destinations"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.p className="eyebrow" variants={staggerItem}>
          {page.destinations.eyebrow}
        </motion.p>
        <motion.div className="experience-destination-grid" variants={staggerContainer}>
          {page.destinations.items.map((destination, index) => (
            <motion.button
              className={`experience-destination experience-destination-${index + 1}`}
              type="button"
              key={destination}
              variants={staggerItem}
            >
              <span className="experience-destination-image" aria-hidden="true" />
              <span className="experience-destination-content">
                <strong>{destination}</strong>
                <small>
                  {page.destinations.action}
                  <span aria-hidden="true">→</span>
                </small>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="experience-final-cta"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <div>
          <h2>{page.cta.title}</h2>
          <p>{page.cta.body}</p>
          <button className="experience-button" type="button" onClick={() => onNavigate('contact')}>
            {page.cta.action}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </motion.section>
    </div>
  )
}

export default Experience
