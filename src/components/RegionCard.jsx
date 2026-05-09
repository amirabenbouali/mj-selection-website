function RegionCard({ region }) {
  return (
    <article className="info-card region-tile">
      <div className="region-tile-image" aria-hidden="true" />
      <div className="region-tile-content">
        <p className="eyebrow">{region.country}</p>
        <h3>{region.name}</h3>
        <p>{region.description}</p>
      </div>
    </article>
  )
}

export default RegionCard
