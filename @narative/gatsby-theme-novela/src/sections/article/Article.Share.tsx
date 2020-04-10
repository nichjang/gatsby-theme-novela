import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import Icons from '@icons';


interface ArticleShareProps {
  title: string
}

const ArticleShare: React.FC<ArticleShareProps> = ({ title }) => {
  const share = generateShare(title);

  return (
    <div>
      <MenuText>Share: </MenuText>
      <ReferralLink disabled={false} share={share.twitter}>
        <Icons.Twitter fill={"black"} width="18px" height="15px" />
      </ReferralLink>
      <ReferralLink disabled={false} share={share.linkedin}>
        <Icons.LinkedIn fill={"black"} width="16px" height="16px" />
      </ReferralLink>
      <ReferralLink disabled={false} share={share.facebook}>
        <Icons.Facebook fill={"black"} width="16px" height="16px" />
      </ReferralLink>
      <ReferralLink disabled={false} share={share.mail}>
        <Icons.Mail fill={"black"} width="16px" height="16px" />
      </ReferralLink>
    </div>
  );
};

export default ArticleShare;

function ReferralLink({ disabled, share, children }) {
  function handleClick(event) {
    event.preventDefault();
    if (disabled) return;

    window.open(
      share,
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600',
    );
  }

  return (
    <MenuShare
      href={disabled ? '' : share}
      onClick={handleClick}
      disabled={disabled}
    >
      <Hidden>Share the selected text</Hidden>
      {children}
    </MenuShare>
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

const popUpwards = keyframes`
  0% {
    transform:matrix(.97,0,0,1,0,12);
    opacity:0
  }
  20% {
    transform:matrix(.99,0,0,1,0,2);
    opacity:.7
  }
  40% {
    transform:matrix(1,0,0,1,0,-1);
    opacity:1
  }
  70% {
    transform:matrix(1,0,0,1,0,0);
    opacity:1
  }
  100% {
    transform:matrix(1,0,0,1,0,0);
    opacity:1
  }
`;

const MenuText = styled.span`
  margin-right: 11px;
`;

const Hidden = styled.div`
  width: 0px;
  height: 0px;
  visibility: hidden;
  opacity: 0;
`;

const MenuShare = styled.a<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 11px;
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};

  svg {
    path {
      fill: ${p => (p.disabled ? '#F89797' : '')};
    }
  }
`;
