import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import Footer from 'client/components/misc/Footer';
import Button from 'client/components/Form/Button';
import Heading from 'client/components/Form/Heading';
import { StyledCard } from 'client/components/Form/Card';
import colors from 'client/styles/colors';

const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: ${colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.5rem 0;
  transition: gap 0.2s ease;
  &:hover { gap: 0.7rem; text-decoration: underline; }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${colors.background};
`;

const AboutContainer = styled.div`
  width: 95vw;
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 0 4rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-family: var(--font-mono);
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 2rem 1rem 1rem 1rem;
  img {
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.15rem;
    color: ${colors.textColor};
    max-width: 600px;
    margin: 1rem auto;
    line-height: 1.6;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const InfoCard = styled(StyledCard)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${colors.backgroundLighter};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 6px 6px 0px ${colors.bgShadowColor};
  }

  h3 {
    color: ${colors.primary};
    margin: 0;
    font-size: 1.2rem;
  }
  p {
    margin: 0;
    line-height: 1.6;
    color: ${colors.textColor};
    font-size: 0.95rem;
  }
  ul {
    padding-left: 1.2rem;
    margin: 0;
    font-size: 0.95rem;
    li { margin-bottom: 0.4rem; }
  }
`;

const CTASection = styled.section`
  text-align: center;
  padding: 2.5rem;
  background: ${colors.backgroundLighter};
  border-radius: 8px;
  box-shadow: 4px 4px 0px ${colors.bgShadowColor};

  p {
    margin: 0 0 1.5rem 0;
    color: ${colors.textColor};
    font-size: 1rem;
  }
`;

const About = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <PageWrapper>
      <AboutContainer>
        <BackLink href="/check">&#8592; Back to SiteScan</BackLink>
        <HeroSection>
          <a href="/">
            <img width="80" src="/site-scan.png" alt="SiteScan Logo" />
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
              SiteScan is an open-source, all-in-one web analysis tool designed to help developers, security researchers, and system administrators quickly gather and analyze public data about any given URL. We believe security should be accessible to everyone.
            </p>
          </InfoCard>

          <InfoCard>
            <h3>The Tech Stack</h3>
            <p>Built for speed and modern aesthetics, SiteScan leverages:</p>
            <ul>
              <li><strong>Frontend:</strong> Astro, React, and Emotion.</li>
              <li><strong>Backend:</strong> Node.js and Express.</li>
              <li><strong>Design System:</strong> A custom, premium light theme.</li>
            </ul>
          </InfoCard>
        </Grid>

        <CTASection>
          <Heading as="h2" size="large" align="center" color={colors.primary}>
            Ready to dive in?
          </Heading>
          <p>Start discovering hidden insights about any website instantly.</p>
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
    </PageWrapper>
  );
};

export default About;
