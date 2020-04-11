import React from 'react';
import styled from '@emotion/styled';

import Icons from '@icons';
import mediaqueries from '@styles/media';
import { SharePageButton } from './Article.Controls';

interface ArticleShareProps {
  title: string
}

const ArticleShare: React.FC<ArticleShareProps> = ({ title }) => {
  const share = generateShare(title);

  return (
    <ShareWrapper>
      <ReferralLink share={share.twitter}>
        <Icons.TwitterLarge fill={"#73737D"} width="18px" height="15px" />
      </ReferralLink>
      <ReferralLink share={share.linkedin}>
        <Icons.LinkedinLarge fill={"#73737D"} width="16px" height="16px" />
      </ReferralLink>
      <ReferralLink share={share.facebook}>
        <Icons.FacebookLarge fill={"#73737D"} width="16px" height="16px" />
      </ReferralLink>
      <ReferralLink share={share.mail}>
        <Icons.MailLarge fill={"#73737D"} width="16px" height="16px" />
      </ReferralLink>
      <SharePageButton />
    </ShareWrapper>
  );
};

export default ArticleShare;

function ReferralLink({ share, children }) {
  function handleClick(event) {
    event.preventDefault();

    window.open(
      share,
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600',
    );
  }

  return (
    <SocialIconContainer
      href={share}
      onClick={handleClick}
    >
      <Hidden>Share the article</Hidden>
      {children}
    </SocialIconContainer>
  );
}

function generateShare(title: string) {
  const url = window.location.href;

  return {
    twitter: `https://twitter.com/intent/tweet?text="${title}" — ${url}`,
    linkedin: `http://www.linkedin.com/shareArticle?mini=true&url=${url}&summary=${title}&title=${title}`,
    facebook: `http://www.facebook.com/sharer.php?u=${url}`,
    mail: `mailto:?subject=${title}&body=${url}`,
  };
}

const ShareWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  
  ${mediaqueries.tablet`
    padding-top: 45px;
  `}

  ${mediaqueries.phablet`
    padding-top: 40px;
  `}
`;


const SocialIconContainer = styled.a`
  position: relative;
  margin-left: 3.2rem;
  text-decoration: none;
  max-width: 24px;
  display: inherit;

  ${mediaqueries.phablet`
    margin-left: 2rem;
  `}

  &:hover {
    svg {
      &:hover * {
        fill: ${p => p.theme.colors.primary};
      }
      * {
        transition: fill 0.25s var(--ease-in-out-quad);
      }
    }
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -50%;
    top: -20%;
    width: 200%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }
`;

const Hidden = styled.span`
  width: 0px;
  height: 0px;
  visibility: hidden;
  opacity: 0;
  overflow: hidden;
  display: inline-block;
`;
