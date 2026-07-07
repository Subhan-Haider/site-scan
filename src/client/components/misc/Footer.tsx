import styled from '@emotion/styled';
import colors from 'client/styles/colors';

const FooterEl = styled.footer`
  width: 100%;
  padding: 1.5rem 1rem;
  background: ${colors.backgroundLighter};
  border-top: 1px solid ${colors.bgShadowColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;

  a {
    color: ${colors.textColor};
    text-decoration: none;
    transition: color 0.2s ease;
    &:hover {
      color: ${colors.primary};
      text-decoration: underline;
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SocialRow = styled(Row)`
  font-size: 0.78rem;
  opacity: 0.85;
  gap: 1.2rem;
`;

const ProjectsRow = styled(Row)`
  font-size: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${colors.bgShadowColor};
  gap: 1rem;

  .label {
    opacity: 0.55;
    font-weight: normal;
  }

  a {
    color: ${colors.primary};
    font-weight: bold;
    &:hover { color: ${colors.textColor}; }
  }
`;

const Footer = (props: { isFixed?: boolean }): JSX.Element => {
  return (
    <FooterEl style={props.isFixed ? { position: 'absolute', bottom: 0, left: 0 } : {}}>
      <Row>
        <a href="/about">About</a>
        <a href="/docs">Documentation</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/blog">Blog</a>
      </Row>
      <SocialRow>
        <a href="https://github.com/Subhan-Haider/site-scan" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://x.com/Subhan_haide" target="_blank" rel="noreferrer">X (Twitter)</a>
        <a href="https://www.linkedin.com/in/subhan-haider" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://www.youtube.com/@ImgConvertPro" target="_blank" rel="noreferrer">YouTube</a>
        <a href="https://www.instagram.com/subhan_haid" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.tiktok.com/@s.subhan.haider" target="_blank" rel="noreferrer">TikTok</a>
        <a href="https://discord.gg/MmRfqXqvC2" target="_blank" rel="noreferrer">Discord</a>
        <a href="https://paypal.me/Subhanhaide" target="_blank" rel="noreferrer" style={{ color: colors.primary, fontWeight: 'bold' }}>Support</a>
      </SocialRow>
      <ProjectsRow>
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
      </ProjectsRow>
    </FooterEl>
  );
};

export default Footer;
