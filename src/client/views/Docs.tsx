import styled from '@emotion/styled';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Footer from 'client/components/misc/Footer';
import Sponsors from 'client/components/misc/Sponsors';
import Heading from 'client/components/Form/Heading';
import colors from 'client/styles/colors';
import docs, { type Doc } from 'client/utils/docs';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${colors.background};
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 1.5rem 0rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 2rem;
  font-family: var(--font-mono);
  box-sizing: border-box;
`;

const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: ${colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: bold;
  transition: gap 0.2s ease;
  &:hover { gap: 0.7rem; text-decoration: underline; }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1.2rem;
  border: 2px solid ${colors.bgShadowColor};
  border-radius: 6px;
  background: ${colors.backgroundLighter};
  color: ${colors.textColor};
  font-family: var(--font-mono);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  &:focus { border-color: ${colors.primary}; }
`;

const DocsGrid = styled.div`
  column-count: 3;
  column-gap: 1.5rem;
  width: 100%;

  @media (max-width: 900px) { column-count: 2; }
  @media (max-width: 600px) { column-count: 1; }
`;

const DocCard = styled.div<{ isOpen: boolean }>`
  break-inside: avoid-column;
  margin-bottom: 1.5rem;
  background: ${colors.backgroundLighter};
  border: 2px solid ${({ isOpen }) => isOpen ? colors.primary : colors.bgShadowColor};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 3px 3px 0px ${colors.bgShadowColor};
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 5px 5px 0px ${colors.bgShadowColor};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  user-select: none;

  h3 {
    margin: 0;
    font-size: 0.95rem;
    color: ${colors.primary};
    font-weight: bold;
  }
`;

const Arrow = styled.span<{ isOpen: boolean }>`
  color: ${colors.textColorSecondary};
  font-size: 0.9rem;
  transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  display: inline-block;
  transition: transform 0.25s ease;
  line-height: 1;
`;

const CardBody = styled.div`
  border-top: 1px solid ${colors.bgShadowColor};
  padding: 1rem 1.2rem 1.2rem 1.2rem;

  p {
    margin: 0 0 0.8rem 0;
    font-size: 0.85rem;
    line-height: 1.65;
    color: ${colors.textColor};
  }
  h4 {
    margin: 0.8rem 0 0.25rem 0;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${colors.primary};
    opacity: 0.75;
    &:first-of-type { margin-top: 0; }
  }
  ul {
    padding-left: 1.1rem;
    margin: 0;
    li {
      margin-bottom: 0.25rem;
      font-size: 0.83rem;
    }
    a {
      color: ${colors.primary};
      text-decoration: none;
      &:hover { text-decoration: underline; }
    }
  }
`;

const NoResults = styled.p`
  text-align: center;
  color: ${colors.textColorSecondary};
  font-size: 1rem;
  padding: 3rem;
`;

const Docs = (): JSX.Element => {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = docs.filter(
    (d: Doc) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  return (
    <PageWrapper>
      <PageContainer>
        <BackLink href="/check">&#8592; Back to SiteScan</BackLink>
        <Heading as="h1" size="xLarge" align="center" color={colors.primary}>
          Documentation
        </Heading>
        <p style={{ textAlign: 'center', color: colors.textColorSecondary, margin: '-1rem 0 0 0', fontSize: '1rem' }}>
          Learn what each check does and how to use the results.
        </p>
        <SearchInput
          placeholder="Search checks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filtered.length === 0 ? (
          <NoResults>No documentation found for &ldquo;{search}&rdquo;.</NoResults>
        ) : (
          <DocsGrid>
            {filtered.map((doc: Doc) => {
              const isOpen = openId === doc.id;
              return (
                <DocCard key={doc.id} isOpen={isOpen} onClick={() => toggle(doc.id)}>
                  <CardHeader>
                    <h3>{doc.title}</h3>
                    <Arrow isOpen={isOpen}>&#9662;</Arrow>
                  </CardHeader>
                  {isOpen && (
                    <CardBody onClick={(e) => e.stopPropagation()}>
                      <h4>What it checks</h4>
                      <p>{doc.description}</p>
                      <h4>Why it matters</h4>
                      <p>{doc.use}</p>
                      {doc.resources.length > 0 && (
                        <>
                          <h4>Resources</h4>
                          <ul>
                            {doc.resources.map((r: string | { title: string; link: string }, i: number) =>
                              typeof r === 'string' ? (
                                <li key={i}><a href={r} target="_blank" rel="noreferrer">{r}</a></li>
                              ) : (
                                <li key={i}><a href={r.link} target="_blank" rel="noreferrer">{r.title}</a></li>
                              ),
                            )}
                          </ul>
                        </>
                      )}
                    </CardBody>
                  )}
                </DocCard>
              );
            })}
          </DocsGrid>
        )}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/check" style={{ color: colors.primary, textDecoration: 'none', fontSize: '0.9rem' }}>
            Ready to scan? &rarr; Start Analyzing
          </Link>
        </div>
      </PageContainer>
      
      <div style={{ margin: '2rem 0' }}>
        <Sponsors />
      </div>

      <Footer />
    </PageWrapper>
  );
};

export default Docs;
