function Access({ copy }) {
  const access = copy.accessPage
  const contact = copy.contactPage

  return (
    <div className="contact-page access-contact-page">
      <section className="contact-hero access-contact-hero">
        <div className="contact-hero-copy">
          <p className="eyebrow">{access.eyebrow}</p>
          <h1>{access.title}</h1>
          <div className="contact-title-rule" aria-hidden="true">
            <span />
          </div>
          <p>{access.body}</p>
        </div>
      </section>

      <section className="contact-main access-contact-main">
        <div className="contact-intro">
          <p className="eyebrow">{access.privateEyebrow}</p>
          {access.privateBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="contact-direct">
            <p className="eyebrow">{contact.directEyebrow}</p>
            <span className="contact-direct-icon" aria-hidden="true">☏</span>
            <div className="contact-people">
              {contact.contacts.map((person) => (
                <a
                  className={person.role ? 'contact-person contact-person-featured' : 'contact-person'}
                  href={`tel:${person.phone.replaceAll(' ', '')}`}
                  key={person.name}
                >
                  <strong>{person.name}</strong>
                  <span>{person.phone}</span>
                  {person.role && <em>{person.role}</em>}
                </a>
              ))}
            </div>
            <a className="contact-email-link" href={`mailto:${contact.directEmail}`}>
              <span aria-hidden="true">✉</span>
              {contact.directEmail}
            </a>
          </div>
        </div>

        <form className="contact-form access-request-form">
          <p className="eyebrow">{access.formEyebrow}</p>
          <div className="access-profile-options" role="group" aria-label={access.profileLabel}>
            {access.profiles.map((profile) => (
              <label key={profile}>
                <input name="profile" type="radio" defaultChecked={profile === access.profiles[0]} />
                <span>{profile}</span>
              </label>
            ))}
          </div>

          <div className="contact-form-row">
            {access.fields.map((field) => (
              <label key={field.name}>
                {field.label}
                <input name={field.name} type={field.type || 'text'} placeholder={field.placeholder} />
              </label>
            ))}
          </div>

          <label>
            {access.message}
            <textarea name="message" rows="5" placeholder={access.messagePlaceholder} />
          </label>

          <button type="button">
            {access.button}
            <span aria-hidden="true">→</span>
          </button>
          <small>{access.disclaimer}</small>
        </form>
      </section>

      <section className="contact-reasons">
        {contact.reasons.map((reason) => (
          <article key={reason.title}>
            <span aria-hidden="true">{reason.icon}</span>
            <h2>{reason.title}</h2>
            <p>{reason.body}</p>
          </article>
        ))}
      </section>

      <section className="contact-closing">
        <span aria-hidden="true" />
        <p>{contact.closing}</p>
        <em>{access.note}</em>
      </section>
    </div>
  )
}

export default Access
