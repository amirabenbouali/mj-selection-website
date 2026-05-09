import { motion, useReducedMotion } from 'framer-motion'
import { createMotionVariants } from '../animations.js'

function Hero({ copy, onNavigate }) {
  const reducedMotion = useReducedMotion()
  const { fadeUp } = createMotionVariants(reducedMotion)
  const delayedFadeUp = (delay) => ({
    hidden: fadeUp.hidden,
    visible: {
      ...fadeUp.visible,
      transition: {
        ...fadeUp.visible.transition,
        delay: reducedMotion ? 0 : delay,
      },
    },
  })

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-title-block">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {copy.title}
          </motion.h1>
          <motion.span
            className="hero-script"
            initial="hidden"
            animate="visible"
            variants={delayedFadeUp(0.18)}
          >
            {copy.script}
          </motion.span>
          <motion.div
            className="hero-rule"
            aria-hidden="true"
            initial="hidden"
            animate="visible"
            variants={delayedFadeUp(0.28)}
          >
            <span />
          </motion.div>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={delayedFadeUp(0.36)}
          >
            {copy.body}
          </motion.p>
          <motion.div
            className="hero-actions"
            initial="hidden"
            animate="visible"
            variants={delayedFadeUp(0.5)}
          >
            <button type="button" onClick={() => onNavigate('wines')}>
              {copy.primaryAction}
            </button>
          </motion.div>
        </div>
      </div>
      <button
        className="scroll-cue"
        type="button"
        aria-label={copy.scrollLabel}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      />
    </section>
  )
}

export default Hero
