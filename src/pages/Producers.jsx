function Producers({ copy, onNavigate }) {
  return (
    <div className="producers-page">
      <section className="producers-hero">
        <div className="producers-side-note" aria-hidden="true">
          <span>{copy.producersPage.sideNote}</span>
        </div>
        <div className="producers-hero-copy">
          <p className="eyebrow">{copy.producersPage.eyebrow}</p>
          <h1>
            {copy.producersPage.titleMain ? (
              <>
                {copy.producersPage.titleMain}
                <span>{copy.producersPage.titleAccent}</span>
              </>
            ) : (
              copy.producersPage.title
            )}
          </h1>
          <div className="producers-rule" aria-hidden="true">
            <span />
          </div>
          <p>{copy.producersPage.body}</p>
          <button type="button" onClick={() => onNavigate('about')}>
            {copy.producersPage.action}
            <span aria-hidden="true">→</span>
          </button>
          <blockquote className="producers-hero-quote">
            {copy.producersPage.heroQuote}
          </blockquote>
        </div>
      </section>

      <div className="producers-seam" aria-hidden="true">
        <span />
      </div>

      <section className="producers-catalog">
        <div className="producers-grid">
          {copy.producers.slice(0, 3).map((producer, index) => (
            <article className="producer-catalog-card" key={producer.name}>
              <div className={`producer-catalog-image producer-catalog-image-${index + 1}`} aria-hidden="true" />
              <div className="producer-catalog-content">
                <p className="eyebrow">{producer.region}</p>
                <h2>{producer.name}</h2>
                <div className="mini-gold-rule" aria-hidden="true">
                  <span />
                </div>
                <p>{producer.description}</p>
                <p>{producer.focus}</p>
                <button type="button" onClick={() => onNavigate('wines')}>
                  {copy.producersPage.cardAction}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="producers-quote" aria-label={copy.producersPage.quote}>
          <span aria-hidden="true">“</span>
          <p>{copy.producersPage.quote}</p>
          <span aria-hidden="true">”</span>
        </div>
      </section>
    </div>
  )
}

export default Producers
