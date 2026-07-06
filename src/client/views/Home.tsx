import styled from '@emotion/styled';
import { type ChangeEvent, type SyntheticEvent, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, type NavigateOptions } from 'react-router-dom';

import Heading from 'client/components/Form/Heading';
import Input from 'client/components/Form/Input';
import Button from 'client/components/Form/Button';
import { StyledCard } from 'client/components/Form/Card';
import Footer from 'client/components/misc/Footer';
import FancyBackground from 'client/components/misc/FancyBackground';


import colors from 'client/styles/colors';
import { determineAddressType, normalizeAddress } from 'client/utils/address-type-checker';

const HomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: var(--font-mono);
  padding: 1.5rem 1rem 4rem 1rem;
  footer {
    z-index: 1;
  }
`;

const UserInputMain = styled.form`
  background: ${colors.backgroundLighter};
  box-shadow: 4px 4px 0px ${colors.bgShadowColor};
  border-radius: 8px;
  padding: 1rem;
  z-index: 5;
  margin: 1rem;
  width: calc(100% - 2rem);
  max-width: 60rem;
  z-index: 2;
`;


// const FindIpButton = styled.a`
//   margin: 0.5rem;
//   cursor: pointer;
//   display: block;
//   text-align: center;
//   color: ${colors.primary};
//   text-decoration: underline;
// `;

const ErrorMessage = styled.p`
  color: ${colors.danger};
  margin: 0.5rem;
`;

const SiteFeaturesWrapper = styled(StyledCard)`
  margin: 1rem;
  width: calc(100% - 2rem);
  max-width: 60rem;
  z-index: 2;
  .links {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    a {
      width: 100%;
      button {
        width: calc(100% - 2rem);
      }
    }
    @media (max-width: 600px) {
      flex-wrap: wrap;
    }
  }
  ul {
    -webkit-column-width: 150px;
    -moz-column-width: 150px;
    column-width: 150px;
    list-style: none;
    padding: 0 1rem;
    font-size: 0.9rem;
    color: ${colors.textColor};
    li {
      position: relative;
      margin: 0.25rem 0;
      padding-left: 1.2rem;
      break-inside: avoid-column;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: all 0.2s ease-in-out;
      cursor: default;
      &:hover {
        transform: translateX(5px);
        color: ${colors.primary};
      }
    }
    li:before {
      content: '✓';
      color: ${colors.primary};
      position: absolute;
      left: 0;
      transition: transform 0.2s ease-in-out;
    }
    li:hover:before {
      transform: scale(1.2);
    }
    li:not(:last-child) a {
      color: inherit;
      text-decoration: none;
    }
  }
  a {
    color: ${colors.primary};
  }
`;

// Build a URL-safe anchor id from a section title (e.g. "IP Info" -> "ip-info")
const makeAnchor = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^\w\s]|_/g, '')
    .replace(/\s+/g, '-');

const Home = (): JSX.Element => {
  const defaultPlaceholder = 'e.g. subhan.tech';
  const [userInput, setUserInput] = useState('');
  const [errorMsg, setErrMsg] = useState('');
  const [placeholder] = useState(defaultPlaceholder);
  const [inputDisabled] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const urlFromQuery = query.get('url');
    if (urlFromQuery) {
      const target = normalizeAddress(urlFromQuery);
      if (target) navigate(`/check/${target}`, { replace: true });
    }
  }, [navigate, location.search]);

  const submit = () => {
    const address = normalizeAddress(userInput);
    const addressType = determineAddressType(address);

    if (addressType === 'empt') {
      setErrMsg('Field must not be empty');
    } else if (addressType === 'err') {
      setErrMsg('Must be a valid URL, IPv4 or IPv6 Address');
    } else {
      const resultRouteParams: NavigateOptions = { state: { address, addressType } };
      navigate(`/check/${address}`, resultRouteParams);
    }
  };

  /* Update user input state, and hide error message if field is valid */
  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    const isError = ['err', 'empt'].includes(determineAddressType(event.target.value));
    if (!isError) setErrMsg('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  };

  const formSubmitEvent = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  return (
    <HomeContainer>
      <FancyBackground />
      <UserInputMain onSubmit={formSubmitEvent}>
        <a href="/">
          <Heading as="h1" size="xLarge" align="center" color={colors.primary}>
            <img width="64" src="/site-scan.png" alt="SiteScan Icon" />
            SiteScan
          </Heading>
        </a>
        <Input
          id="user-input"
          value={userInput}
          label="Enter a URL"
          size="large"
          orientation="vertical"
          name="url"
          placeholder={placeholder}
          disabled={inputDisabled}
          handleChange={inputChange}
          handleKeyDown={handleKeyPress}
        />
        {/* <FindIpButton onClick={findIpAddress}>Or, find my IP</FindIpButton> */}
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <Button type="submit" styles="width: calc(100% - 1rem);" size="large" onClick={submit}>
          Analyze!
        </Button>
      </UserInputMain>

      <SiteFeaturesWrapper>
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <Heading as="h3" size="small" align="center" color={colors.primary}>
            Quick Try
          </Heading>
          <div className="links" style={{ marginTop: '0.5rem' }}>
            <Button onClick={() => { setUserInput('subhan.tech'); submit(); }}>subhan.tech</Button>
            <Button onClick={() => { setUserInput('github.com'); submit(); }}>github.com</Button>
            <Button onClick={() => { setUserInput('wikipedia.org'); submit(); }}>wikipedia.org</Button>
          </div>
        </div>
        <hr style={{ border: `1px solid ${colors.background}`, width: '80%', margin: '0 auto 1rem auto' }} />
        <ul>
          <li>Archive History</li>
          <li>Block List Check</li>
          <li>Carbon Footprint</li>
          <li>Cookies</li>
          <li>DNS Server</li>
          <li>DNS Records</li>
          <li>DNSSEC</li>
          <li>Site Features</li>
          <li>Firewall Types</li>
          <li>Get IP Address</li>
          <li>Headers</li>
          <li>HSTS</li>
          <li>HTTP Security</li>
          <li>Linked Pages</li>
          <li>Mail Config</li>
          <li>Open Ports</li>
          <li>Quality Check</li>
          <li>Global Rank</li>
          <li>Redirects</li>
          <li>Robots.txt</li>
          <li>Screenshot</li>
          <li>Security.txt</li>
          <li>Sitemap</li>
          <li>Social Tags</li>
          <li>SSL Certificate</li>
          <li>Uptime Status</li>
          <li>Tech Stack</li>
          <li>Known Threats</li>
          <li>TLS Version</li>
          <li>Trace Route</li>
          <li>TXT Records</li>
          <li>Whois Lookup</li>
        </ul>
      </SiteFeaturesWrapper>


      <Footer isFixed={true} />
    </HomeContainer>
  );
};

export default Home;
