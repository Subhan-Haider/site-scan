import './Footer.scss';
import colors from 'client/styles/colors';

const Footer = (props: { isFixed?: boolean }): JSX.Element => {
  return (
    <footer className={`footer-container ${props.isFixed ? 'is-fixed' : ''}`}>
      <div className="nav-row">
        <a href="/about">About</a>
        <a href="/docs">Documentation</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/blog">Blog</a>
      </div>
      <div className="social-row">
        <a href="https://github.com/Subhan-Haider/site-scan" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://x.com/Subhan_haide" target="_blank" rel="noreferrer">X (Twitter)</a>
        <a href="https://www.linkedin.com/in/subhan-haider" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://www.youtube.com/@ImgConvertPro" target="_blank" rel="noreferrer">YouTube</a>
        <a href="https://www.instagram.com/subhan_haid" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.tiktok.com/@s.subhan.haider" target="_blank" rel="noreferrer">TikTok</a>
        <a href="https://discord.gg/MmRfqXqvC2" target="_blank" rel="noreferrer">Discord</a>
        <a href="https://paypal.me/Subhanhaide" target="_blank" rel="noreferrer" style={{ color: colors.primary, fontWeight: 'bold' }}>Support</a>
      </div>
      <div className="projects-row">
        <span className="label">My Projects:</span>
        <a href="https://subhan.tech" target="_blank" rel="noreferrer">Humanize AI</a>
        <a href="https://codelens.site" target="_blank" rel="noreferrer">CodeLens</a>
        <a href="https://blizflow.online" target="_blank" rel="noreferrer">BlizFlow</a>
        <a href="https://adshield-vpn.subhan.tech" target="_blank" rel="noreferrer">AdShield VPN</a>
        <a href="https://emoji.subhan.tech" target="_blank" rel="noreferrer">Emoji Smuggle</a>
        <a href="https://pong.subhan.tech" target="_blank" rel="noreferrer">Pixel Pong</a>
        <a href="https://security.subhan.tech" target="_blank" rel="noreferrer">Stealth Vault</a>
        <a href="https://lootops.me" target="_blank" rel="noreferrer">LootOps</a>
        <a href="https://media.subhan.tech" target="_blank" rel="noreferrer">Media Server</a>
      </div>
    </footer>
  );
};

export default Footer;
