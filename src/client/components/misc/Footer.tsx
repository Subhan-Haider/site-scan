import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import colors from 'client/styles/colors';

const FooterContainer = styled.footer<{ isFixed?: boolean }>`
  width: 100%;
  padding: 1.5rem;
  background: ${colors.backgroundLighter};
  border-top: 1px solid ${colors.bgShadowColor};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
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

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.8rem;
    position: relative;
  }
`;

const Footer = (props: { isFixed?: boolean }): JSX.Element => {
  return (
    <FooterContainer isFixed={props.isFixed}>
      <Link to="/about">About</Link>
      <Link to="/docs">Documentation</Link>
      <Link to="/privacy">Privacy Policy</Link>
      <Link to="/terms">Terms of Service</Link>
      <a target="_blank" rel="noreferrer" href="https://github.com/Subhan-Haider/site-scan">GitHub</a>
    </FooterContainer>
  );
};

export default Footer;
