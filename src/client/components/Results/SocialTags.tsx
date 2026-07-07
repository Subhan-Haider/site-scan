import { Card } from 'client/components/Form/Card';
import Row from 'client/components/Form/Row';
import colors from 'client/styles/colors';
import styled from '@emotion/styled';

const cardStyles = `
  .color-field {
    border-radius: 4px;
    &:hover { color: ${colors.primary}; }
  }
`;

/* ── Social card preview ── */
const PreviewWrap = styled.div`
  margin: 1rem 0 0.5rem 0;
`;

const PreviewLabel = styled.p`
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: ${colors.textColorSecondary};
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const CardShell = styled.a`
  display: block;
  text-decoration: none;
  border: 1px solid ${colors.bgShadowColor};
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.15s ease;
  background: ${colors.backgroundLighter};
  max-width: 520px;
  &:hover {
    box-shadow: 0 6px 24px rgba(0,0,0,0.12);
    transform: translateY(-2px);
  }
`;

const BannerImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  background: ${colors.backgroundDarker};
`;

const BannerPlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, ${colors.backgroundDarker} 0%, ${colors.background} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.textColorSecondary};
  font-size: 0.85rem;
`;

const CardBody = styled.div`
  padding: 0.85rem 1rem;
  border-top: 1px solid ${colors.bgShadowColor};
`;

const CardDomain = styled.p`
  font-size: 0.72rem;
  text-transform: uppercase;
  color: ${colors.textColorSecondary};
  margin-bottom: 0.3rem;
  letter-spacing: 0.04em;
`;

const CardTitle = styled.p`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${colors.textColor};
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardDesc = styled.p`
  font-size: 0.82rem;
  color: ${colors.textColorSecondary};
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TwitterBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.72rem;
  background: ${colors.primaryTransparent || '#4a770015'};
  color: ${colors.primary};
  border: 1px solid ${colors.primary}40;
  border-radius: 20px;
  padding: 0.2rem 0.6rem;
  margin-top: 0.5rem;
`;

const OgCardPreview = ({ tags }: { tags: any }): JSX.Element => {
  const domain = (() => {
    try { return new URL(tags.canonicalUrl || tags.ogUrl || '').hostname; } catch { return tags.canonicalUrl || ''; }
  })();

  const imageUrl = (() => {
    if (!tags.ogImage) return null;
    if (tags.ogImage.startsWith('/') && (tags.canonicalUrl || tags.ogUrl)) {
      return `${(tags.canonicalUrl || tags.ogUrl).replace(/\/$/, '')}${tags.ogImage}`;
    }
    return tags.ogImage;
  })();

  const title = tags.ogTitle || tags.twitterTitle || tags.title;
  const desc = tags.ogDescription || tags.twitterDescription || tags.description;

  return (
    <PreviewWrap>
      <PreviewLabel>🔗 Social Card Preview</PreviewLabel>
      <CardShell href={tags.canonicalUrl || tags.ogUrl || '#'} target="_blank" rel="noreferrer">
        {imageUrl
          ? <BannerImg src={imageUrl} alt="OG Banner" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          : <BannerPlaceholder>No OG image found</BannerPlaceholder>
        }
        <CardBody>
          {domain && <CardDomain>{domain}</CardDomain>}
          {title && <CardTitle>{title}</CardTitle>}
          {desc && <CardDesc>{desc}</CardDesc>}
          {tags.twitterCard && <TwitterBadge>🐦 {tags.twitterCard}</TwitterBadge>}
        </CardBody>
      </CardShell>
    </PreviewWrap>
  );
};

const SocialTagsCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const tags = props.data;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons} styles={cardStyles}>
      <OgCardPreview tags={tags} />
      {tags.title && <Row lbl="Title" val={tags.title} />}
      {tags.description && <Row lbl="Description" val={tags.description} />}
      {tags.keywords && <Row lbl="Keywords" val={tags.keywords} />}
      {tags.canonicalUrl && <Row lbl="Canonical URL" val={tags.canonicalUrl} />}
      {tags.themeColor && (
        <Row lbl="" val="">
          <span className="lbl">Theme Color</span>
          <span className="val color-field" style={{ background: tags.themeColor }}>
            {tags.themeColor}
          </span>
        </Row>
      )}
      {tags.twitterCreator && <Row lbl="Twitter Creator" val={tags.twitterCreator} />}
      {tags.twitterSite && (
        <Row lbl="" val="">
          <span className="lbl">Twitter Site</span>
          <span className="val">
            <a href={`https://x.com/${tags.twitterSite}`}>{tags.twitterSite}</a>
          </span>
        </Row>
      )}
      {tags.author && <Row lbl="Author" val={tags.author} />}
      {tags.publisher && <Row lbl="Publisher" val={tags.publisher} />}
      {tags.generator && <Row lbl="Generator" val={tags.generator} />}
      {tags.robots && <Row lbl="Robots" val={tags.robots} />}
      {tags.viewport && <Row lbl="Viewport" val={tags.viewport} />}
    </Card>
  );
};

export default SocialTagsCard;

