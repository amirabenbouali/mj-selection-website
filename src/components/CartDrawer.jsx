function CartDrawer({ copy, isOpen, items, onCheckout, onClose, onQuantityChange, onRemove }) {
  return (
    <div className={`cart-drawer-shell ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <button className="cart-drawer-backdrop" type="button" onClick={onClose} tabIndex={isOpen ? 0 : -1} />
      <aside className="cart-drawer" aria-label={copy.selectedTitle}>
        <div className="cart-drawer-header">
          <p>{copy.selectedTitle} ({items.length})</p>
          <button type="button" onClick={onClose} aria-label={copy.closeCart}>
            ×
          </button>
        </div>

        <div className="cart-drawer-items">
          {items.length === 0 ? (
            <p className="cart-empty">{copy.emptySelection}</p>
          ) : (
            items.map((item) => (
              <article className="cart-line-item" key={item.wine.id}>
                <div className={`cart-line-image wine-card-media-${(item.imageIndex % 10) + 1}`} aria-hidden="true" />
                <div>
                  <h3>{item.wine.name}</h3>
                  <p>{item.wine.producer}</p>
                  <strong>{copy.requestOnly}</strong>
                  <div className="quantity-control">
                    <button type="button" onClick={() => onQuantityChange(item.wine.id, item.quantity - 1)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => onQuantityChange(item.wine.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <button className="cart-remove" type="button" onClick={() => onRemove(item.wine.id)}>
                  ×
                </button>
              </article>
            ))
          )}
        </div>

        <div className="cart-drawer-footer">
          <div className="cart-subtotal">
            <span>{copy.subtotal}</span>
            <strong>{copy.taxIncluded}</strong>
          </div>
          <p>{copy.deliveryNote}</p>
          <button className="cart-primary" type="button" onClick={onCheckout}>
            {copy.requestBottles}
          </button>
          <button className="cart-secondary" type="button" onClick={onCheckout}>
            {copy.completeSelection}
          </button>
          <div className="cart-trust">
            <span>{copy.securePayment}</span>
            <span>{copy.support}</span>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
