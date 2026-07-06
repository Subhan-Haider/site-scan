import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import Footer from 'client/components/misc/Footer';
import Button from 'client/components/Form/Button';
import Heading from 'client/components/Form/Heading';
import { StyledCard } from 'client/components/Form/Card';
import colors from 'client/styles/colors';
import FancyBackground from 'client/components/misc/FancyBackground';

const AboutContainer = styled.div`
  width: 95vw;
  max-width: 1000px;
  margin: 2rem auto;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 2;
  font-family: var(--font-mono);
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 1rem 2rem 1rem;
  img {
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.25rem;
    color: ${colors.textColor};
    max-width: 600px;
    margin: 1.5rem auto;
    line-height: 1.6;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const InfoCard = styled(StyledCard)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 6px 6px 0px ${colors.bgShadowColor};
  }

  h3 {
    color: ${colors.primary};
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    margin: 0;
    line-height: 1.5;
    color: ${colors.textColor};
  }
  ul {
    padding-left: 1.2rem;
    margin: 0;
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const CTASection = styled.section`
  text-align: center;
  margin-top: 3rem;
  padding: 3rem;
  background: ${colors.backgroundLighter};
  border-radius: 8px;
  box-shadow: 4px 4px 0px ${colors.bgShadowColor};
`;

const About = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
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
      <FancyBackground />
      <AboutContainer>
        <HeroSection>
          <a href="/">
            <img width="96" src="/site-scan.png" alt="SiteScan Logo" />
          </a>
          <Heading as="h1" size="xLarge" align="center" color={colors.primary}>
            About SiteScan
          </Heading>
          <p>
            Democratizing access to complex web and security data by breaking it down into simple, actionable insights.
          </p>
        </HeroSection>

        <Grid>
          <InfoCard>
            <h3>Our Mission</h3>
            <p>
              SiteScan is an open-source, all-in-one web analysis tool designed to help developers, security researchers, and system administrators quickly gather and analyze public data about any given URL. We believe security should be accessible to everyone, not hidden behind obscure command-line interfaces or expensive enterprise tools.
            </p>
          </InfoCard>

          <InfoCard>
            <h3>The Tech Stack</h3>
            <p>Built for speed and modern aesthetics, SiteScan leverages:</p>
            <ul>
              <li><strong>Frontend:</strong> Astro, React, and Emotion for dynamic styling.</li>
              <li><strong>Backend:</strong> Node.js and Express for blazing fast API endpoints.</li>
              <li><strong>Design System:</strong> A custom, premium light theme tailored for data visualization.</li>
            </ul>
          </InfoCard>
        </Grid>

        <CTASection>
          <Heading as="h2" size="large" align="center" color={colors.primary}>
            Ready to dive in?
          </Heading>
          <p style={{ marginBottom: '2rem', color: colors.textColor }}>
            Start discovering hidden insights about any website instantly.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/check">
              <Button size="large">Start Scanning</Button>
            </Link>
            <a target="_blank" rel="noreferrer" href="https://github.com/Subhan-Haider/site-scan">
              <Button size="large">View on GitHub</Button>
            </a>
          </div>
        </CTASection>
      </AboutContainer>
      <Footer />
    </div>
  );
};

export default About;
