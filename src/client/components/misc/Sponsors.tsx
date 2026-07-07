import './Sponsors.scss';

const Sponsors = () => {
  return (
    <div className="sponsors-container">
      <a href="https://subhan.tech" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', flex: '1 1 300px' }}>
        <div className="sponsor-card">
          <div style={{ marginBottom: '0.8rem' }}>
            <span className="sponsor-label">Sponsored</span>
            <h3 className="sponsor-title">Humanize AI</h3>
            <p className="sponsor-desc">
              Bypass AI detectors with our state-of-the-art text humanization engine. Try it for free!
            </p>
          </div>
          <span className="sponsor-cta">Learn More →</span>
        </div>
      </a>

      <a href="https://www.lootops.website" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', flex: '1 1 300px' }}>
        <div className="sponsor-card">
          <div style={{ marginBottom: '0.8rem' }}>
            <span className="sponsor-label">Sponsored</span>
            <h3 className="sponsor-title">Image Converter Pro</h3>
            <p className="sponsor-desc">
              Studio-grade image conversion. Batch process entirely in your browser — zero data leaves your device.
            </p>
          </div>
          <span className="sponsor-cta">Try for Free →</span>
        </div>
      </a>
    </div>
  );
};

export default Sponsors;
