import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from 'client/components/misc/Footer';
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

const PageContainer = styled.div`
  width: 95vw;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 0 4rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-family: var(--font-mono);
`;

const ContentCard = styled(StyledCard)`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  line-height: 1.7;
  color: ${colors.textColor};
  background: ${colors.backgroundLighter};

  h2 {
    color: ${colors.primary};
    margin: 0.5rem 0 0.25rem 0;
    font-size: 1.1rem;
  }
  p {
    margin: 0;
    font-size: 0.95rem;
  }
  ul {
    padding-left: 1.5rem;
    margin: 0;
    font-size: 0.95rem;
  }
`;

const Privacy = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <PageWrapper>
      <PageContainer>
        <BackLink href="/check">&#8592; Back to SiteScan</BackLink>
        <Heading as="h1" size="large" align="center" color={colors.primary}>
          Privacy Policy
        </Heading>
        <ContentCard>
          <p><strong>Last Updated:</strong> July 2026</p>
          <p>
            At SiteScan, we believe in transparency and the protection of your privacy. This Privacy Policy outlines how we handle data when you use our web analysis tool.
          </p>

          <h2>1. Data Collection</h2>
          <p>
            SiteScan is designed to gather public data about URLs provided by users. We do not require account creation, and we do not collect personally identifiable information (PII) to operate the core service.
          </p>
          <p>
            When you enter a URL, the tool queries public records (e.g., DNS, SSL, Headers) and third-party APIs to present an analysis. The URLs you scan may be temporarily logged by the server for rate-limiting, debugging, or abuse prevention, but they are not sold or monetized.
          </p>

          <h2>2. Third-Party Services</h2>
          <p>
            To provide comprehensive checks, SiteScan may send the URL you entered to third-party security and analysis APIs (e.g., Google Safe Browsing, Shodan, VirusTotal). We are not responsible for the privacy practices of these external services. Please review their respective policies if you have concerns about submitting specific URLs.
          </p>

          <h2>3. Cookies & Local Storage</h2>
          <p>
            We may use local storage or minimal cookies purely for functional purposes (like remembering your theme preference or rate-limit status). We do not use tracking cookies or third-party analytics trackers.
          </p>

          <h2>4. Changes to This Policy</h2>
          <p>
            Because SiteScan is open-source, this policy may be updated as new features are added. We encourage you to review this page periodically.
          </p>

          <h2>5. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please email us at{' '}
            <a href="mailto:support@subhan.tech" style={{ color: 'inherit' }}>support@subhan.tech</a>{' '}
            or open an issue on our GitHub repository.
          </p>
        </ContentCard>
      </PageContainer>
      <Footer />
    </PageWrapper>
  );
};

export default Privacy;
