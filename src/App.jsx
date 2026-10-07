import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Home from './pages/Home.jsx'
import Wines from './pages/Wines.jsx'
import Producers from './pages/Producers.jsx'
import Regions from './pages/Regions.jsx'
import Experience from './pages/Experience.jsx'
import About from './pages/About.jsx'
import Access from './pages/Access.jsx'
import { defaultLanguage, translations } from './data/translations.js'
import './index.css'

const pages = {
  home: Home,
  wines: Wines,
  producers: Producers,
  regions: Regions,
  experience: Experience,
  about: About,
  access: Access,
  contact: Access,
}

function getInitialPage() {
  const hashPage = window.location.hash.replace('#', '')
  if (hashPage === 'contact') {
    return 'access'
  }
  return pages[hashPage] ? hashPage : 'home'
}

function getInitialLanguage() {
  const savedLanguage = window.localStorage.getItem('mj-selection-language')
  return translations[savedLanguage] ? savedLanguage : defaultLanguage
}

function App() {
  const [activePage, setActivePage] = useState(getInitialPage)
  const [language, setLanguage] = useState(getInitialLanguage)
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const ActivePage = useMemo(() => pages[activePage] || Home, [activePage])
  const copy = translations[language]
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem('mj-selection-language', language)
  }, [language])

  function handleNavigate(page) {
    setActivePage(page)
    window.history.replaceState(null, '', page === 'home' ? '#' : `#${page}`)
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  function handleAddToSelection(wine, quantity = 1, imageIndex = 0) {
    setCartItems((items) => {
      const existing = items.find((item) => item.wine.id === wine.id)

      if (existing) {
        return items.map((item) =>
          item.wine.id === wine.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }

      return [...items, { wine, quantity, imageIndex }]
    })
    setIsCartOpen(true)
  }

  function handleCartQuantityChange(id, quantity) {
    if (quantity <= 0) {
      setCartItems((items) => items.filter((item) => item.wine.id !== id))
      return
    }

    setCartItems((items) => items.map((item) => (item.wine.id === id ? { ...item, quantity } : item)))
  }

  function handleCheckout() {
    setIsCartOpen(false)
    handleNavigate('access')
  }

  return (
    <div className="site-shell">
      <Navbar
        activePage={activePage}
        cartCount={cartCount}
        cartLabel={copy.winesPage.shop.cartLabel}
        copy={copy.nav}
        language={language}
        onCartOpen={() => setIsCartOpen(true)}
        onLanguageChange={setLanguage}
        onNavigate={handleNavigate}
      />
      <main>
        <ActivePage
          key={`${activePage}-${language}`}
          copy={copy}
          onAddToSelection={handleAddToSelection}
          onNavigate={handleNavigate}
        />
      </main>
      <CartDrawer
        copy={copy.winesPage.shop}
        isOpen={isCartOpen}
        items={cartItems}
        onCheckout={handleCheckout}
        onClose={() => setIsCartOpen(false)}
        onQuantityChange={handleCartQuantityChange}
        onRemove={(id) => setCartItems((items) => items.filter((item) => item.wine.id !== id))}
      />
      <Footer copy={copy.footer} onNavigate={handleNavigate} />
    </div>
  )
}

export default App
