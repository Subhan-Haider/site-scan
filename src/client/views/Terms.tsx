import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from 'client/components/misc/Footer';
import Heading from 'client/components/Form/Heading';
import { StyledCard } from 'client/components/Form/Card';
import colors from 'client/styles/colors';
import FancyBackground from 'client/components/misc/FancyBackground';

const PageContainer = styled.div`
  width: 95vw;
  max-width: 800px;
  margin: 2rem auto;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 2;
  font-family: var(--font-mono);
`;

const ContentCard = styled(StyledCard)`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  line-height: 1.6;
  color: ${colors.textColor};

  h2 {
    color: ${colors.primary};
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    margin: 0;
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;
  }
`;

const Terms = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <FancyBackground />
      <PageContainer>
        <Heading as="h1" size="large" align="center" color={colors.primary}>
          Terms of Service
        </Heading>
        <ContentCard>
          <p>
            <strong>Last Updated:</strong> July 2026
          </p>
          <p>
            Welcome to SiteScan. By using our website and analysis tools, you agree to comply with and be bound by the following terms and conditions of use.
          </p>
          
          <h2>1. Acceptable Use</h2>
          <p>
            SiteScan is provided as a tool for educational, research, and administrative purposes. You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of the service.
          </p>
          <p>
            You must not use this tool to perform denial-of-service (DoS) attacks, exploit vulnerabilities, or gather data for malicious intent.
          </p>

          <h2>2. Disclaimer of Warranties</h2>
          <p>
            The service is provided on an "AS IS" and "AS AVAILABLE" basis. SiteScan makes no representations or warranties of any kind, express or implied, as to the operation of the service, or the information, content, materials, or products included.
          </p>
          <p>
            We do not warrant that the analysis provided is 100% accurate, complete, or current. The information is gathered from public sources and third-party APIs which may occasionally be unavailable or provide outdated data.
          </p>

          <h2>3. Limitation of Liability</h2>
          <p>
            In no event shall SiteScan or its contributors be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of this service or with the delay or inability to use this service.
          </p>

          <h2>4. Open Source License</h2>
          <p>
            The source code for SiteScan is available under the GNU General Public License v3.0 (GPLv3). By using, modifying, or distributing the software, you are bound by the terms of that license.
          </p>

          <h2>5. Contact</h2>
          <p>
            If you have any questions about these Terms, please open an issue on our GitHub repository.
          </p>
        </ContentCard>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default Terms;
