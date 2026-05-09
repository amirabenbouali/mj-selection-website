function ProducerCard({ producer }) {
  return (
    <article className="info-card producer-card">
      <div className="producer-card-image" aria-hidden="true" />
      <div className="producer-card-content">
        <p className="eyebrow">{producer.region}</p>
        <h3>{producer.name}</h3>
        <p>{producer.description}</p>
        <span>{producer.focus}</span>
      </div>
    </article>
  )
}

export default ProducerCard
