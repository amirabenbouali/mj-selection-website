function Contact({ copy }) {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-copy">
          <p className="eyebrow">{copy.contactPage.eyebrow}</p>
          <h1>{copy.contactPage.title}</h1>
          <div className="contact-title-rule" aria-hidden="true">
            <span />
          </div>
          <p>{copy.contactPage.body}</p>
        </div>
      </section>

      <section className="contact-main">
        <div className="contact-intro">
          <p className="eyebrow">{copy.contactPage.approachEyebrow}</p>
          {copy.contactPage.philosophy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="contact-direct">
            <p className="eyebrow">{copy.contactPage.directEyebrow}</p>
            <span className="contact-direct-icon" aria-hidden="true">☏</span>
            <div className="contact-people">
              {copy.contactPage.contacts.map((contact) => (
                <a
                  className={contact.role ? 'contact-person contact-person-featured' : 'contact-person'}
                  href={`tel:${contact.phone.replaceAll(' ', '')}`}
                  key={contact.name}
                >
                  <strong>{contact.name}</strong>
                  <span>{contact.phone}</span>
                  {contact.role && <em>{contact.role}</em>}
                </a>
              ))}
            </div>
            <a className="contact-email-link" href={`mailto:${copy.contactPage.directEmail}`}>
              <span aria-hidden="true">✉</span>
              {copy.contactPage.directEmail}
            </a>
          </div>
        </div>

        <form className="contact-form">
          <div className="contact-form-row">
            <label>
              {copy.contactPage.name}
              <input type="text" name="name" placeholder={copy.contactPage.namePlaceholder} />
            </label>
            <label>
              {copy.contactPage.email}
              <input type="email" name="email" placeholder={copy.contactPage.emailPlaceholder} />
            </label>
          </div>
          <label>
            {copy.contactPage.subject}
            <input type="text" name="subject" placeholder={copy.contactPage.subjectPlaceholder} />
          </label>
          <label>
            {copy.contactPage.message}
            <textarea name="message" rows="5" placeholder={copy.contactPage.messagePlaceholder} />
          </label>
          <button type="button">
            {copy.contactPage.button}
            <span aria-hidden="true">→</span>
          </button>
        </form>
      </section>

      <section className="contact-reasons">
        {copy.contactPage.reasons.map((reason) => (
          <article key={reason.title}>
            <span aria-hidden="true">{reason.icon}</span>
            <h2>{reason.title}</h2>
            <p>{reason.body}</p>
          </article>
        ))}
      </section>

      <section className="contact-closing">
        <span aria-hidden="true" />
        <p>{copy.contactPage.closing}</p>
        <em>{copy.contactPage.closingNote}</em>
      </section>
    </div>
  )
}

export default Contact
