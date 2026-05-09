function WineCard({
  detailLabel,
  imageIndex = 0,
  labels,
  onAddToSelection,
  onViewDetails,
  showcase = false,
  shopCopy,
  wine,
}) {
  const isCatalogCard = Boolean(detailLabel && !showcase)
  const hasMedia = isCatalogCard || showcase

  return (
    <article className={`wine-card ${isCatalogCard ? 'wine-card-catalog' : ''} ${showcase ? 'wine-card-showcase' : ''}`}>
      {hasMedia && (
        <div className={`wine-card-media wine-card-media-${imageIndex + 1}`} aria-hidden="true" />
      )}
      <div className="wine-card-content">
        {isCatalogCard && (
          <div className="wine-card-topline">
            <span className="wine-style-pill">{wine.style}</span>
            <button aria-label={`${wine.name} favourite`} className="wine-favorite" type="button">
              ♡
            </button>
          </div>
        )}
        <p className="eyebrow">{wine.region}</p>
        <h3>{wine.name}</h3>
        <p>{wine.producer}</p>
        <dl>
          <div>
            <dt>
              {isCatalogCard && <span className="wine-spec-icon" aria-hidden="true">♧</span>}
              {labels.grapes}
            </dt>
            <dd>{wine.grapes}</dd>
          </div>
          <div>
            <dt>
              {isCatalogCard && <span className="wine-spec-icon" aria-hidden="true">♙</span>}
              {labels.style}
            </dt>
            <dd>{wine.style}</dd>
          </div>
        </dl>
        {detailLabel && (
          <>
            <div className="wine-commerce-row">
              <strong>€{wine.price.toFixed(2)}</strong>
              <span className={wine.available ? 'available' : ''}>
                {wine.available ? shopCopy.availableNow : shopCopy.requestOnly}
              </span>
            </div>
            <div className="wine-card-actions">
              <button className="wine-detail-link" type="button" onClick={() => onViewDetails?.(wine, imageIndex)}>
                {detailLabel}
                <span aria-hidden="true">→</span>
              </button>
              <button className="wine-add-mini" type="button" onClick={() => onAddToSelection?.(wine, 1, imageIndex)}>
                +
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  )
}

export default WineCard
