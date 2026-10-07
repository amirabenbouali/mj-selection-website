import { useEffect, useMemo, useRef, useState } from 'react'
import WineCard from '../components/WineCard.jsx'

const FILTER_KEYS = ['all', 'red', 'white', 'rose', 'sparkling']
const SORT_KEYS = ['name', 'producer', 'region']

function getGrapeOptions(wines) {
  const grapes = wines.flatMap((wine) =>
    wine.grapes
      .split(/[,|]/)
      .map((grape) => grape.trim().replace(/^\d+%\s*/, '').trim())
      .filter(Boolean),
  )

  return [...new Set(grapes)].sort((a, b) => a.localeCompare(b))
}

function WineDropdown({ label, onChange, open, onToggle, options, value }) {
  const selected = options.find((option) => option.value === value) || options[0]

  return (
    <div className={`wine-dropdown ${open ? 'open' : ''}`}>
      <button
        aria-expanded={open}
        className="wine-dropdown-trigger"
        onClick={onToggle}
        type="button"
      >
        <span className="wine-dropdown-text">
          <span className="wine-dropdown-kicker">{label}</span>
          <strong>{selected.label}</strong>
        </span>
        <span aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div className="wine-dropdown-menu" role="listbox">
          {options.map((option) => (
            <button
              aria-selected={option.value === value}
              className={option.value === value ? 'selected' : ''}
              key={option.value}
              onClick={() => onChange(option.value)}
              role="option"
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function QuantityControl({ onChange, value }) {
  return (
    <div className="quantity-control">
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))}>
        −
      </button>
      <span>{value}</span>
      <button type="button" onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  )
}

function Wines({ copy, onAddToSelection }) {
  const filtersRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [activeRegion, setActiveRegion] = useState('all')
  const [activeGrape, setActiveGrape] = useState('all')
  const [activeSort, setActiveSort] = useState('name')
  const [openDropdown, setOpenDropdown] = useState(null)
  const [visibleCount, setVisibleCount] = useState(9)
  const [selectedWineId, setSelectedWineId] = useState(copy.wines[0]?.id)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [detailQuantity, setDetailQuantity] = useState(1)
  const filterLabels = copy.winesPage.filters
  const shopCopy = copy.winesPage.shop
  const title = copy.winesPage.catalogTitle
  const regionOptions = useMemo(
    () => [...new Set(copy.wines.map((wine) => wine.regionName))].sort((a, b) => a.localeCompare(b)),
    [copy.wines],
  )
  const grapeOptions = useMemo(() => getGrapeOptions(copy.wines), [copy.wines])
  const regionFilterOptions = useMemo(
    () => [
      { label: filterLabels.allRegions, value: 'all' },
      ...regionOptions.map((region) => ({ label: region, value: region })),
    ],
    [filterLabels.allRegions, regionOptions],
  )
  const grapeFilterOptions = useMemo(
    () => [
      { label: filterLabels.allGrapes, value: 'all' },
      ...grapeOptions.map((grape) => ({ label: grape, value: grape })),
    ],
    [filterLabels.allGrapes, grapeOptions],
  )
  const sortFilterOptions = useMemo(
    () => filterLabels.sortOptions.map((label, index) => ({ label, value: SORT_KEYS[index] })),
    [filterLabels.sortOptions],
  )

  useEffect(() => {
    function handlePointerDown(event) {
      if (!filtersRef.current?.contains(event.target)) {
        setOpenDropdown(null)
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const filteredWines = useMemo(() => {
    const wines = copy.wines.filter((wine) => {
      const matchesStyle = activeFilter === 'all' || wine.categories?.includes(activeFilter)
      const matchesRegion = activeRegion === 'all' || wine.regionName === activeRegion
      const matchesGrape = activeGrape === 'all' || wine.grapes.toLowerCase().includes(activeGrape.toLowerCase())
      const matchesAvailability = !availableOnly || wine.available

      return matchesStyle && matchesRegion && matchesGrape && matchesAvailability
    })

    return [...wines].sort((a, b) => {
      if (activeSort === 'producer') {
        return a.producer.localeCompare(b.producer) || a.name.localeCompare(b.name)
      }

      if (activeSort === 'region') {
        return a.regionName.localeCompare(b.regionName) || a.name.localeCompare(b.name)
      }

      return a.name.localeCompare(b.name)
    })
  }, [activeFilter, activeGrape, activeRegion, activeSort, availableOnly, copy.wines])

  const visibleWines = filteredWines.slice(0, visibleCount)
  const selectedWine = copy.wines.find((wine) => wine.id === selectedWineId) || visibleWines[0] || copy.wines[0]

  function handleViewDetails(wine, imageIndex) {
    setSelectedWineId(wine.id)
    setSelectedImageIndex(imageIndex)
    setDetailQuantity(1)
    window.requestAnimationFrame(() => {
      document.getElementById('wine-detail-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }

  return (
    <section className="wines-page wines-catalog-page">
      <div className="wines-catalog-shell">
        <aside className="wines-side-rail" aria-hidden="true">
          <span>{copy.winesPage.railText}</span>
          <strong>♧</strong>
        </aside>

        <header className="wines-catalog-header">
          <div className="wines-catalog-copy">
            <p className="eyebrow">{copy.winesPage.catalogEyebrow || copy.winesPage.eyebrow}</p>
            <h1>
              {title ? (
                <>
                  {title.before} <span>{title.highlight}</span>
                </>
              ) : (
                copy.winesPage.title
              )}
            </h1>
            <p>{copy.winesPage.catalogBody || copy.winesPage.body}</p>
            <span className="wines-catalog-rule" aria-hidden="true" />
          </div>

          <div className="wine-filters" aria-label={filterLabels.label}>
          <div className="filter-group">
            {filterLabels.types.map((filter, index) => (
              <button
                aria-pressed={activeFilter === FILTER_KEYS[index]}
                className={activeFilter === FILTER_KEYS[index] ? 'active' : ''}
                key={filter}
                onClick={() => {
                  setActiveFilter(FILTER_KEYS[index])
                  setVisibleCount(9)
                }}
                type="button"
              >
                {filter}
              </button>
            ))}
            <button
              aria-pressed={availableOnly}
              className={availableOnly ? 'active availability-filter' : 'availability-filter'}
              onClick={() => {
                setAvailableOnly((value) => !value)
                setVisibleCount(9)
              }}
              type="button"
            >
              {availableOnly ? shopCopy.availableOnly : shopCopy.allAvailability}
            </button>
          </div>
            <div className="filter-selects" ref={filtersRef}>
              <WineDropdown
                label={filterLabels.selects[0]}
                onChange={(value) => {
                  setActiveRegion(value)
                  setVisibleCount(9)
                  setOpenDropdown(null)
                }}
                onToggle={() => setOpenDropdown(openDropdown === 'region' ? null : 'region')}
                open={openDropdown === 'region'}
                options={regionFilterOptions}
                value={activeRegion}
              />
              <WineDropdown
                label={filterLabels.selects[1]}
                onChange={(value) => {
                  setActiveGrape(value)
                  setVisibleCount(9)
                  setOpenDropdown(null)
                }}
                onToggle={() => setOpenDropdown(openDropdown === 'grape' ? null : 'grape')}
                open={openDropdown === 'grape'}
                options={grapeFilterOptions}
                value={activeGrape}
              />
              <WineDropdown
                label={filterLabels.selects[2]}
                onChange={(value) => {
                  setActiveSort(value)
                  setVisibleCount(9)
                  setOpenDropdown(null)
                }}
                onToggle={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
                open={openDropdown === 'sort'}
                options={sortFilterOptions}
                value={activeSort}
              />
            </div>
          </div>
        </header>

        <div className="wine-list wine-catalog-grid">
          {visibleWines.map((wine, index) => (
            <WineCard
              detailLabel={copy.winesPage.detailLabel}
              imageIndex={index}
              key={wine.name}
              labels={copy.cardLabels}
              onAddToSelection={onAddToSelection}
              onViewDetails={handleViewDetails}
              shopCopy={shopCopy}
              wine={wine}
            />
          ))}
        </div>

        {selectedWine && (
          <section className="wine-detail-panel" id="wine-detail-panel">
            <div className={`wine-detail-image wine-card-media-${(selectedImageIndex % 10) + 1}`} aria-hidden="true" />
            <div className="wine-detail-copy">
              <span className="wine-style-pill">{selectedWine.style}</span>
              <h2>{selectedWine.name}</h2>
              <p className="wine-detail-producer">{selectedWine.producer}</p>
              <p>{selectedWine.notes}</p>
              <dl>
                <div>
                  <dt>{copy.cardLabels.style}</dt>
                  <dd>{selectedWine.style}</dd>
                </div>
                <div>
                  <dt>{copy.cardLabels.grapes}</dt>
                  <dd>{selectedWine.grapes}</dd>
                </div>
                <div>
                  <dt>Region</dt>
                  <dd>{selectedWine.region}</dd>
                </div>
              </dl>
            </div>
            <aside className="wine-purchase-panel">
              <strong>{shopCopy.taxIncluded}</strong>
              <span>{shopCopy.requestOnly}</span>
              <p className={selectedWine.available ? 'available' : ''}>
                {selectedWine.available ? shopCopy.availableNow : shopCopy.requestOnly}
              </p>
              <small>{shopCopy.stockNote}</small>
              <label>
                {shopCopy.quantity}
                <QuantityControl value={detailQuantity} onChange={setDetailQuantity} />
              </label>
              <button
                className="wine-add-selection"
                type="button"
                onClick={() => onAddToSelection?.(selectedWine, detailQuantity, selectedImageIndex)}
              >
                {shopCopy.addToSelection}
              </button>
              <div className="wine-service-notes">
                <p>{shopCopy.carefullySelected}</p>
                <p>{shopCopy.securePayment}</p>
                <p>{shopCopy.supportBody}</p>
              </div>
            </aside>
          </section>
        )}

        {visibleCount < filteredWines.length && (
          <button
            className="load-more-wines"
            onClick={() => setVisibleCount((count) => count + 9)}
            type="button"
          >
            {copy.winesPage.loadMore || 'Load more wines'}
          </button>
        )}
      </div>
    </section>
  )
}

export default Wines
