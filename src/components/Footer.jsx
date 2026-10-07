function Footer({ copy, onNavigate }) {
  return (
    <footer className="footer">
      <div>
        <strong>MJ Selection</strong>
        <p>{copy.body}</p>
      </div>
      <button type="button" onClick={() => onNavigate('access')}>
        {copy.contact}
      </button>
    </footer>
  )
}

export default Footer
