import { languages } from '../data/translations.js'

const navItems = [
  'home',
  'producers',
  'wines',
  'regions',
  'experience',
  'about',
  'contact',
]

function Navbar({ activePage, cartCount = 0, cartLabel = 'Open selection', copy, language, onCartOpen, onLanguageChange, onNavigate }) {
  return (
    <header className="navbar">
      <button className="brand" type="button" onClick={() => onNavigate('home')}>
        <img src="/images/logo.png" alt="MJ Selection" />
      </button>
      <nav aria-label="Primary navigation" className="primary-nav">
        {navItems.map((page) => (
          <button
            className={activePage === page ? 'active' : ''}
            key={page}
            type="button"
            onClick={() => onNavigate(page)}
          >
            {copy[page]}
          </button>
        ))}
      </nav>
      <div className="navbar-actions">
        <div className="language-switcher" aria-label={copy.language}>
          {languages.map((item) => (
            <button
              aria-pressed={language === item.code}
              className={language === item.code ? 'active' : ''}
              key={item.code}
              type="button"
              onClick={() => onLanguageChange(item.code)}
            >
              <span>{item.shortLabel}</span>
              <span className="visually-hidden">{item.label}</span>
            </button>
          ))}
        </div>
        <button className="cart-nav-button" type="button" onClick={onCartOpen} aria-label={cartLabel}>
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9 13h14l-1.5 11h-11L9 13Z" />
            <path d="M12 13c.6-4 2-6 4-6s3.4 2 4 6" />
            <path d="M11 17h10" />
          </svg>
          {cartCount > 0 && <strong>{cartCount}</strong>}
        </button>
      </div>
    </header>
  )
}

export default Navbar
