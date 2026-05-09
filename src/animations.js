const ease = 'easeOut'

export function createMotionVariants(reducedMotion = false) {
  const move = (value) => (reducedMotion ? 0 : value)

  const fadeUp = {
    hidden: { opacity: 0, y: move(20) },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.02, ease },
    },
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: move(-24) },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.05, ease },
    },
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: move(24) },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.05, ease },
    },
  }

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.11,
        delayChildren: reducedMotion ? 0 : 0.06,
      },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: move(18) },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.94, ease },
    },
  }

  return {
    fadeUp,
    fadeInLeft,
    fadeInRight,
    staggerContainer,
    staggerItem,
  }
}
