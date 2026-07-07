import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import colors from 'client/styles/colors';

const FooterContainer = styled.footer<{ isFixed?: boolean }>`
  width: 100%;
  padding: 1.5rem;
  background: ${colors.backgroundLighter};
  border-top: 1px solid ${colors.bgShadowColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  
  ${({ isFixed }) => isFixed && `
    position: absolute;
    bottom: 0;
    left: 0;
  `}

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

const NavRow = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 600px) { gap: 1rem; }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 0.8rem;
  opacity: 0.8;
  a:hover { opacity: 1; }
  @media (max-width: 600px) { gap: 0.8rem; }
`;

const ProjectsRow = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 0.78rem;
  padding-top: 0.5rem;
  border-top: 1px solid ${colors.bgShadowColor};
  width: 100%;

  span.label {
    opacity: 0.5;
    font-weight: normal;
    margin-right: 0.25rem;
  }
  a {
    color: ${colors.primary};
    font-weight: bold;
    &:hover { color: ${colors.textColor}; }
  }
  @media (max-width: 600px) { gap: 0.8rem; }
`;

const Footer = (props: { isFixed?: boolean }): JSX.Element => {
  return (
    <FooterContainer isFixed={props.isFixed}>
      <NavRow>
        <Link to="/about">About</Link>
        <Link to="/docs">Documentation</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
        <a href="/blog">Blog</a>
      </NavRow>
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
    </FooterContainer>
  );
};

export default Footer;
