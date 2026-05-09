import { motion, useReducedMotion } from 'framer-motion'
import { createMotionVariants } from '../animations.js'

function WineMap() {
  return (
    <svg
      className="regions-editorial-map"
      viewBox="0 0 900 560"
      role="img"
      aria-label="Stylized wine atlas map showing Bordeaux, Loire Valley, Champagne, Rhône Valley, Tuscany and Piedmont"
    >
      <defs>
        <filter id="mapInkSoftness" x="-12%" y="-12%" width="124%" height="124%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.55" result="blur" />
          <feOffset dx="0" dy="1" result="offset" />
          <feMerge>
            <feMergeNode in="offset" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="editorial-contours" aria-hidden="true">
        <path d="M80 112 C156 72 244 76 326 118 S502 162 596 100 S764 70 836 116" />
        <path d="M56 264 C138 202 226 206 312 254 S470 318 562 250 S728 190 846 244" />
        <path d="M94 400 C190 340 284 356 376 408 S560 474 724 392" />
        <path d="M332 64 C374 118 368 178 324 226 S286 338 342 400" />
        <path d="M626 70 C578 128 596 204 662 252 S746 356 704 466" />
        <path d="M726 104 C792 156 800 222 742 278 S664 396 738 476" />
      </g>

      <g className="editorial-compass" aria-hidden="true">
        <circle cx="108" cy="92" r="30" />
        <path d="M108 38 L118 92 L108 146 L98 92 Z M54 92 L108 82 L162 92 L108 102 Z" />
        <path d="M76 60 L140 124 M140 60 L76 124" />
        <text x="103" y="30">N</text>
      </g>

      <g className="editorial-countries" filter="url(#mapInkSoftness)">
        <path
          className="editorial-country-outline editorial-france"
          d="M180 162 C158 154 136 166 120 188 C106 208 124 222 112 244 C96 274 122 288 132 306 C142 326 132 344 150 358 C170 374 190 366 210 382 C236 402 264 382 292 388 C326 394 340 360 362 344 C384 328 380 302 398 280 C418 254 396 232 406 204 C416 176 376 174 354 158 C330 140 306 154 284 136 C260 116 236 144 212 142 C198 141 190 156 180 162 Z"
        />
        <path
          className="editorial-country-outline editorial-italy"
          d="M548 154 C580 132 632 132 660 158 C684 180 662 206 676 232 C688 254 724 270 722 304 C720 332 684 342 678 366 C670 398 720 404 718 432 C716 454 682 450 658 434 C630 416 618 382 600 354 C582 326 546 326 532 300 C518 274 548 250 538 224 C526 194 516 176 548 154 Z"
        />
        <path
          className="editorial-country-outline editorial-island"
          d="M636 430 C662 434 686 458 680 486 C674 512 642 508 626 488 C610 468 614 438 636 430 Z"
        />
        <path
          className="editorial-country-outline editorial-island"
          d="M738 376 C768 380 790 408 780 436 C770 464 734 456 722 430 C712 408 716 382 738 376 Z"
        />
      </g>

      <g className="editorial-region-shapes">
        <path className="editorial-region-highlight" d="M162 294 C176 282 200 282 216 298 C214 320 198 336 174 332 C156 326 150 308 162 294 Z" />
        <path className="editorial-region-highlight" d="M194 224 C226 208 274 204 314 220 C292 244 236 254 194 244 Z" />
        <path className="editorial-region-highlight" d="M320 186 C344 180 364 194 368 218 C354 234 328 236 314 218 C310 204 312 194 320 186 Z" />
        <path className="editorial-region-highlight" d="M322 286 C344 292 356 314 348 344 C330 358 310 350 304 326 C302 308 310 294 322 286 Z" />
        <path className="editorial-region-highlight" d="M604 316 C628 320 648 342 646 370 C632 386 604 378 592 352 C584 334 590 322 604 316 Z" />
        <path className="editorial-region-highlight" d="M560 180 C588 164 626 172 642 198 C630 224 590 238 558 224 C544 206 546 190 560 180 Z" />
      </g>

      <path
        className="editorial-route editorial-route-main"
        d="M184 310 C244 258 300 226 340 208 C354 250 338 292 328 322 C414 356 522 360 618 346 C612 294 598 242 596 204"
      />
      <path className="editorial-route editorial-route-secondary" d="M248 232 C324 182 430 156 596 204" />

      <g className="editorial-map-marker editorial-marker-bordeaux">
        <circle cx="184" cy="310" r="6" />
        <line x1="184" y1="310" x2="92" y2="322" />
        <text x="36" y="318">Bordeaux</text>
        <text className="editorial-map-country" x="36" y="336">France</text>
      </g>
      <g className="editorial-map-marker editorial-marker-loire">
        <circle cx="248" cy="232" r="6" />
        <line x1="248" y1="232" x2="134" y2="232" />
        <text x="54" y="228">Loire Valley</text>
        <text className="editorial-map-country" x="54" y="246">France</text>
      </g>
      <g className="editorial-map-marker editorial-marker-champagne">
        <circle cx="340" cy="208" r="6" />
        <line x1="340" y1="208" x2="430" y2="174" />
        <text x="438" y="172">Champagne</text>
        <text className="editorial-map-country" x="438" y="190">France</text>
      </g>
      <g className="editorial-map-marker editorial-marker-rhone">
        <circle cx="328" cy="322" r="6" />
        <line x1="328" y1="322" x2="390" y2="388" />
        <text x="398" y="398">Rhône Valley</text>
        <text className="editorial-map-country" x="398" y="416">France</text>
      </g>
      <g className="editorial-map-marker editorial-marker-tuscany">
        <circle cx="618" cy="346" r="6" />
        <line x1="618" y1="346" x2="546" y2="416" />
        <text x="482" y="432">Tuscany</text>
        <text className="editorial-map-country" x="482" y="450">Italy</text>
      </g>
      <g className="editorial-map-marker editorial-marker-piedmont">
        <circle cx="596" cy="204" r="6" />
        <line x1="596" y1="204" x2="704" y2="188" />
        <text x="712" y="188">Piedmont</text>
        <text className="editorial-map-country" x="712" y="206">Italy</text>
      </g>

      <g className="editorial-map-annotations" aria-hidden="true">
        <text x="684" y="76">Chaque région</text>
        <text x="688" y="97">a sa voix.</text>
        <text x="688" y="118">Notre rôle est</text>
        <text x="688" y="139">de l'écouter.</text>
        <path d="M684 148 C718 164 756 160 790 144" />
      </g>

      <g className="editorial-map-stamp" aria-hidden="true">
        <rect x="704" y="438" width="118" height="58" rx="2" />
        <text x="724" y="462">CARNET</text>
        <text x="720" y="482">DE VOYAGE</text>
      </g>
    </svg>
  )
}

function Regions({ copy }) {
  const reducedMotion = useReducedMotion()
  const { fadeInLeft, fadeInRight, staggerContainer, staggerItem } =
    createMotionVariants(reducedMotion)
  const viewport = { once: true, amount: 0.22 }

  return (
    <div className="regions-editorial-page">
      <section className="regions-editorial-hero">
        <motion.div
          className="regions-editorial-hero-copy"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p className="eyebrow" variants={staggerItem}>
            {copy.regionsPage.eyebrow}
          </motion.p>
          <motion.h1 variants={staggerItem}>{copy.regionsPage.title}</motion.h1>
          <motion.p variants={staggerItem}>{copy.regionsPage.body}</motion.p>
          <motion.span className="regions-grape-icon" aria-hidden="true" variants={staggerItem}>
            ◈
          </motion.span>
        </motion.div>
      </section>

      <motion.section
        className="featured-regions-section"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer}
      >
        {copy.regionsPage.featured.map((region, index) => (
          <motion.article
            className={`featured-region-card featured-region-card-${index + 1}`}
            key={region.name}
            variants={staggerItem}
          >
            <div className="featured-region-image" aria-hidden="true" />
            <div className="featured-region-content">
              <span aria-hidden="true">{region.icon}</span>
              <h2>{region.name}</h2>
              <p className="featured-region-country">{region.country}</p>
              <p>{region.body}</p>
              <button type="button">
                {copy.regionsPage.discover}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </motion.article>
        ))}
      </motion.section>

      <motion.section
        className="regions-approach-section"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div className="regions-approach-copy" variants={fadeInLeft}>
          <p className="eyebrow">{copy.regionsPage.approach.eyebrow}</p>
          <h2>{copy.regionsPage.approach.title}</h2>
          <p>{copy.regionsPage.approach.body}</p>
          <div className="regions-approach-values">
            {copy.regionsPage.approach.values.map((value) => (
              <article key={value.title}>
                <span aria-hidden="true">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </article>
            ))}
          </div>
        </motion.div>
        <motion.div className="regions-map-panel regions-approach-map" variants={fadeInRight}>
          <WineMap />
        </motion.div>
      </motion.section>

      <motion.section
        className="regions-stats-section"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer}
      >
        {copy.regionsPage.stats.map((stat) => (
          <motion.article key={stat.label} variants={staggerItem}>
            <span aria-hidden="true">{stat.icon}</span>
            <strong>{stat.value}</strong>
            <p>{stat.label}</p>
          </motion.article>
        ))}
      </motion.section>

      <motion.section
        className="regions-promise-section"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div className="regions-promise-image" aria-hidden="true" variants={fadeInLeft} />
        <motion.div className="regions-promise-copy" variants={fadeInRight}>
          <p className="eyebrow">{copy.regionsPage.promise.eyebrow}</p>
          <h2>{copy.regionsPage.promise.title}</h2>
          <p>{copy.regionsPage.promise.body}</p>
          <strong>{copy.regionsPage.promise.signature}</strong>
        </motion.div>
        <motion.div className="regions-promise-etching" aria-hidden="true" variants={fadeInRight} />
      </motion.section>
    </div>
  )
}

export default Regions
