import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from 'client/components/misc/Footer';
import Nav from 'client/components/Form/Nav';
import Button from 'client/components/Form/Button';

const AboutContainer = styled.div`
width: 95vw;
max-width: 1000px;
margin: 2rem auto;
padding-bottom: 1rem;
header {
  margin: 1rem 0;
  width: auto;
}
section {
  width: auto;
  .inner-heading { display: none; }
}
`;

const HeaderLinkContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  a {
    text-decoration: none;
  }
`;

const About = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to hash fragment if present
    if (location.hash) {
      // Add a small delay to ensure the page has fully rendered
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div>
      <AboutContainer>
        <Nav>
          <HeaderLinkContainer>
            <a target="_blank" rel="noreferrer" href="https://github.com/Subhan-Haider/site-scan">
              <Button>View on GitHub</Button>
            </a>
          </HeaderLinkContainer>
        </Nav>
      </AboutContainer>
      <Footer />
    </div>
  );
};

export default About;
