import { motion, useReducedMotion } from 'framer-motion'
import { createMotionVariants } from '../animations.js'
import Hero from '../components/Hero.jsx'

function PillarIcon({ index }) {
  const icons = [
    (
      <svg viewBox="0 0 54 54" aria-hidden="true">
        <path d="M28 10c5 3 8 8 8 14M27 13c-6 2-10 6-11 12" />
        <circle cx="23" cy="25" r="5" />
        <circle cx="33" cy="25" r="5" />
        <circle cx="18" cy="34" r="5" />
        <circle cx="28" cy="34" r="5" />
        <circle cx="38" cy="34" r="5" />
        <circle cx="23" cy="43" r="5" />
        <circle cx="33" cy="43" r="5" />
        <path d="M32 12c4-5 9-6 14-4-2 6-7 9-14 8" />
      </svg>
    ),
    (
      <svg viewBox="0 0 54 54" aria-hidden="true">
        <path d="M14 14c5 4 21 4 26 0v27c-5 4-21 4-26 0V14Z" />
        <path d="M18 14c-3 9-3 18 0 27M36 14c3 9 3 18 0 27M14 23h26M14 33h26" />
      </svg>
    ),
    (
      <svg viewBox="0 0 54 54" aria-hidden="true">
        <path d="M8 38 22 22l9 10 7-8 8 14" />
        <path d="M22 22l4 16M31 32l-5 6M38 24l-2 14M21 34l5-3 5 3 5-3" />
      </svg>
    ),
    (
      <svg viewBox="0 0 54 54" aria-hidden="true">
        <path d="M27 7 42 13v12c0 11-6 18-15 22-9-4-15-11-15-22V13l15-6Z" />
        <path d="m20 27 5 5 10-12" />
      </svg>
    ),
  ]

  return icons[index] || icons[0]
}

function Home({ copy, onNavigate }) {
  const reducedMotion = useReducedMotion()
  const { fadeUp, fadeInLeft, staggerContainer, staggerItem } =
    createMotionVariants(reducedMotion)
  const viewport = { once: true, amount: 0.22 }

  return (
    <>
      <Hero copy={copy.hero} onNavigate={onNavigate} />
      <motion.div
        className="gold-divider"
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
      >
        <span />
      </motion.div>
      <motion.section
        className="story-section section-gradient"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div className="story-copy" variants={fadeInLeft}>
          <p className="eyebrow">{copy.story.eyebrow}</p>
          <h2>{copy.story.title}</h2>
          {copy.story.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <button type="button" onClick={() => onNavigate('about')}>
            {copy.story.action}
          </button>
        </motion.div>
      </motion.section>
      <motion.div
        className="home-section-seam"
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
      >
        <span />
      </motion.div>
      <motion.section
        className="home-story-cinematic-section section-gradient"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div className="home-story-hero-copy" variants={fadeInLeft}>
          <p className="eyebrow">{copy.story.eyebrow}</p>
          <h2>
            {copy.story.featureTitleBefore}
            <span>{copy.story.featureTitleHighlight}</span>
          </h2>
          <p>{copy.story.featureBody}</p>
        </motion.div>
        <motion.div className="story-timeline home-story-timeline" variants={staggerContainer}>
          {copy.story.timeline.map((item) => (
            <motion.article className="timeline-item" key={item.date} variants={staggerItem}>
              <span>{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>
      <motion.div
        className="home-section-seam"
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
      >
        <span />
      </motion.div>
      <motion.section
        className="story-pillars-section section-gradient"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div className="story-section-header" variants={fadeUp}>
          <p className="eyebrow">{copy.story.eyebrow}</p>
          <h2>
            {copy.story.pillarsTitle}
            {copy.story.pillarsTitleHighlight && <span>{copy.story.pillarsTitleHighlight}</span>}
          </h2>
          <p className="pillars-intro">{copy.story.pillarsIntro}</p>
        </motion.div>
        <motion.div
          className="pillar-feature-strip"
          aria-label={copy.story.pillarsTitle}
          variants={staggerContainer}
        >
          {copy.story.pillars.map((pillar, index) => (
            <motion.article
              className="pillar-card"
              key={pillar.title}
              variants={staggerItem}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      y: -10,
                      scale: 1.015,
                      transition: { duration: 0.35, ease: 'easeOut' },
                    }
              }
            >
              <span className="pillar-shine" aria-hidden="true" />
              <span className="pillar-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="pillar-icon" aria-hidden="true">
                <PillarIcon index={index} />
              </span>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>
      <motion.div
        className="home-section-seam"
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
      >
        <span />
      </motion.div>
      <motion.section
        className="home-gateway-section section-gradient"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div className="home-gateway-heading" variants={fadeUp}>
          <p className="eyebrow">{copy.home.gatewayEyebrow}</p>
          <h2>{copy.home.gatewayTitle}</h2>
          <span aria-hidden="true" />
        </motion.div>
        <motion.div className="home-gateway-list" variants={staggerContainer}>
          {copy.home.gatewayItems.map((item, index) => (
            <motion.article
              className={`home-gateway-panel home-gateway-panel-${index + 1}`}
              key={item.page}
              variants={staggerItem}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      y: -6,
                      transition: { duration: 0.35, ease: 'easeOut' },
                    }
              }
            >
              <button type="button" onClick={() => onNavigate(item.page)}>
                <span className="home-gateway-image" aria-hidden="true" />
                <span className="home-gateway-overlay" aria-hidden="true" />
                <span className="home-gateway-content">
                  <span className="eyebrow">{item.label}</span>
                  <strong>{item.title}</strong>
                  <span className="home-gateway-rule" aria-hidden="true" />
                  <span className="home-gateway-body">{item.body}</span>
                  <span className="home-gateway-link">
                    {item.action}
                    <span aria-hidden="true">→</span>
                  </span>
                </span>
              </button>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>
    </>
  )
}

export default Home
