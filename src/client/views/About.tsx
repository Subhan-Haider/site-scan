import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import Footer from 'client/components/misc/Footer';
import Button from 'client/components/Form/Button';
import Heading from 'client/components/Form/Heading';
import { StyledCard } from 'client/components/Form/Card';
import Sponsors from 'client/components/misc/Sponsors';
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

const ProjectsSection = styled.section`
  margin-top: 1rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ProjectCard = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.2rem 1.5rem;
  background: ${colors.backgroundLighter};
  border: 1px solid ${colors.bgShadowColor};
  border-radius: 6px;
  text-decoration: none;
  box-shadow: 2px 2px 0 ${colors.bgShadowColor};
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 4px 4px 0 ${colors.primary};
    border-color: ${colors.primary};
  }
  .domain {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: ${colors.primary};
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .label {
    font-size: 0.78rem;
    color: ${colors.textColorSecondary};
    font-family: var(--font-mono);
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
            About the Project
          </Heading>
          <p>
            <strong>SiteScan</strong> represents a paradigm shift in web architecture. By combining client-first computation models with optimized visual sandboxes, we deliver lightning-fast analysis without ever violating privacy.
          </p>
        </HeroSection>

        <Grid>
          <InfoCard style={{ gridColumn: '1 / -1' }}>
            <h3>Why We Built This</h3>
            <p style={{ marginBottom: '1rem' }}>
              Most web scanners require uploading your private data—internal URLs, staging IPs, sensitive endpoints—to foreign remote servers. This introduces network wait times, consumes expensive bandwidth, and exposes sensitive targets to third-party disk cache compromises.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              We designed a better architecture. SiteScan processes everything safely. Leveraging state-of-the-art libraries and accelerated HTML5 rendering pipelines, your data is computed efficiently.
            </p>
            <p>
              Load up your websites and watch them analyze SSL, DNS, headers, and security protocols instantly. High-fidelity scanning meets uncompromising security.
            </p>
          </InfoCard>

          <InfoCard>
            <h3>100% Secure Sandbox</h3>
            <p>
              All critical operations execute safely within your browser tab. We prioritize privacy with zero unnecessary network packet uploads.
            </p>
          </InfoCard>

          <InfoCard>
            <h3>WASM & GPU Accelerated</h3>
            <p>
              Leverages WebAssembly compiled binaries and HTML5 Canvas API for massive local core utilization and speed.
            </p>
          </InfoCard>

          <InfoCard>
            <h3>Privacy Compliant</h3>
            <p>
              Zero file caching, tracking data, or remote server disk logging, leaving no trace upon tab close.
            </p>
          </InfoCard>

          <InfoCard>
            <h3>Bloomberg-Terminal Aesthetic</h3>
            <p>
              Tailored with glassmorphism design parameters, harmonic color HSL scales, and premium hover scales.
            </p>
          </InfoCard>

          <InfoCard style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Subhan Haider</h3>
            <p style={{ fontWeight: 'bold', color: colors.primary, marginBottom: '1rem' }}>Founder & Lead Developer</p>
            <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
              Passionate about building advanced local-first web applications, client-side cryptography, and highly aesthetic developer workspaces.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem' }}>
              <a href="https://github.com/Subhan-Haider" target="_blank" rel="noreferrer" style={{ color: colors.textColor, textDecoration: 'none' }}>GitHub</a>
              <span style={{ opacity: 0.3 }}>|</span>
              <a href="https://x.com/Subhan_haide" target="_blank" rel="noreferrer" style={{ color: colors.textColor, textDecoration: 'none' }}>X (Twitter)</a>
              <span style={{ opacity: 0.3 }}>|</span>
              <a href="https://www.linkedin.com/in/subhan-haider" target="_blank" rel="noreferrer" style={{ color: colors.textColor, textDecoration: 'none' }}>LinkedIn</a>
              <span style={{ opacity: 0.3 }}>|</span>
              <a href="https://www.youtube.com/@ImgConvertPro" target="_blank" rel="noreferrer" style={{ color: colors.textColor, textDecoration: 'none' }}>YouTube</a>
              <span style={{ opacity: 0.3 }}>|</span>
              <a href="https://www.instagram.com/subhan_haid" target="_blank" rel="noreferrer" style={{ color: colors.textColor, textDecoration: 'none' }}>Instagram</a>
              <span style={{ opacity: 0.3 }}>|</span>
              <a href="https://www.tiktok.com/@s.subhan.haider" target="_blank" rel="noreferrer" style={{ color: colors.textColor, textDecoration: 'none' }}>TikTok</a>
              <span style={{ opacity: 0.3 }}>|</span>
              <a href="https://discord.gg/MmRfqXqvC2" target="_blank" rel="noreferrer" style={{ color: colors.textColor, textDecoration: 'none' }}>Discord</a>
              <span style={{ opacity: 0.3 }}>|</span>
              <a href="https://paypal.me/Subhanhaide" target="_blank" rel="noreferrer" style={{ color: colors.primary, fontWeight: 'bold', textDecoration: 'none' }}>Support (PayPal)</a>
            </div>
          </InfoCard>
        </Grid>

        <ProjectsSection>
          <Heading as="h2" size="large" color={colors.primary}>My Other Projects</Heading>
          <p style={{ color: colors.textColorSecondary, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            A collection of my live domains and side projects — click any to scan it!
          </p>
          <ProjectsGrid>
            {[
              { domain: 'subhan.tech',              label: 'Main Portfolio' },
              { domain: 'adshield-vpn.subhan.tech', label: 'VPN Shield Tool' },
              { domain: 'emoji.subhan.tech',         label: 'Emoji Explorer' },
              { domain: 'pong.subhan.tech',          label: 'Pong Game' },
              { domain: 'security.subhan.tech',      label: 'Security Tools' },
              { domain: 'storage.subhan.tech',       label: 'Storage Service' },
              { domain: 'sample.subhan.tech',        label: 'Sample Project' },
              { domain: 'test.subhan.tech',          label: 'Test Environment' },
              { domain: 'lootops.me',                label: 'LootOps' },
              { domain: 'server.lootops.me',         label: 'LootOps Server' },
              { domain: 'storage.lootops.me',        label: 'LootOps Storage' },
              { domain: 'codelens.site',             label: 'CodeLens' },
              { domain: 'codiner.online',            label: 'Codiner' },
              { domain: 'blizflow.online',           label: 'BlizFlow' },
            ].map(({ domain, label }) => (
              <ProjectCard
                key={domain}
                href={`/check/${domain}`}
                title={`Scan ${domain} with SiteScan`}
              >
                <span className="domain">{domain}</span>
                <span className="label">{label}</span>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </ProjectsSection>

        <CTASection>
          <Heading as="h2" size="large" align="center" color={colors.primary}>
            Built with Uncompromising Passion
          </Heading>
          <p style={{ maxWidth: '700px', margin: '0 auto 1.5rem auto' }}>
            This application stands as proof that highly premium, feature-dense analysis tools can execute safely. Powered by React, Astro, Emotion CSS, and Node.
          </p>
          <p style={{ fontWeight: 'bold', fontFamily: 'var(--font-mono)', color: colors.textColorSecondary, marginBottom: '2rem' }}>
            Version 2.0 (Stable Release) ➔ 100% Verified
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
      
      <div style={{ marginTop: '2rem' }}>
        <Sponsors />
      </div>

      <Footer />
    </PageWrapper>
  );
};

export default About;
