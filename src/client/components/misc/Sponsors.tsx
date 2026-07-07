import styled from '@emotion/styled';
import colors from 'client/styles/colors';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: calc(100% - 2rem);
  max-width: 60rem;
  margin: 0.5rem auto 1.5rem auto;
`;

const CardLink = styled.a`
  text-decoration: none;
  flex: 1 1 280px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.2rem 1.4rem;
  min-height: 130px;
  border: 2px solid ${colors.primary};
  background: ${colors.backgroundLighter};
  box-shadow: 4px 4px 0px ${colors.primary};
  border-radius: 8px;
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 6px 6px 0px ${colors.primary};
  }
`;

const Label = styled.span`
  display: inline-block;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${colors.primary};
  font-weight: bold;
  font-family: var(--font-mono);
  border: 1px solid ${colors.primary};
  padding: 1px 6px;
  border-radius: 3px;
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  margin: 0.25rem 0 0.4rem 0;
  color: ${colors.textColor};
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.2;
`;

const Desc = styled.p`
  font-size: 0.87rem;
  color: ${colors.textColorSecondary};
  margin: 0 0 0.8rem 0;
  line-height: 1.45;
  flex: 1;
`;

const Cta = styled.span`
  font-weight: bold;
  color: ${colors.primary};
  font-family: var(--font-mono);
  font-size: 0.82rem;
  margin-top: auto;
`;

const Sponsors = () => {
  return (
    <Container>
      <CardLink href="https://subhan.tech" target="_blank" rel="noreferrer">
        <Card>
          <div>
            <Label>Sponsored</Label>
            <Title>Humanize AI</Title>
            <Desc>Bypass AI detectors with our state-of-the-art text humanization engine. Try it for free!</Desc>
          </div>
          <Cta>Learn More →</Cta>
        </Card>
      </CardLink>

      <CardLink href="https://www.lootops.website" target="_blank" rel="noreferrer">
        <Card>
          <div>
            <Label>Sponsored</Label>
            <Title>Image Converter Pro</Title>
            <Desc>Studio-grade image conversion. Batch process entirely in your browser — zero data leaves your device.</Desc>
          </div>
          <Cta>Try for Free →</Cta>
        </Card>
      </CardLink>
    </Container>
  );
};

export default Sponsors;
