import { rgba } from 'polished';
import styled, { css } from 'styled-components';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { LocationDoc } from '@/types';
import { mobile } from '@/utils/breakpoints';

const S = {
  Wrapper: styled.div`
    margin: 10px 8px;
    width: calc(33.33% - 16px);

    @media only screen and (max-width: 1218px) {
      width: calc(50% - 16px);
    }

    ${mobile(css`
      width: calc(100% - 16px);
    `)}

    &:hover {
      transform: scale(1.025);
      opacity: 0.8;
    }
  `,
  Link: styled(RouterLink)`
    color: ${p => rgba(p.theme.text.color, 0.8)};
    text-decoration: none;
  `,
  ThumbnailImage: styled.img`
    width: 100%;
    height: 160px;
    min-width: 124px;

    object-fit: cover;
    border-radius: 4px;

    background-color: ${p => p.theme.input.backgroundColor};
  `,
  ThumbnailPlaceholder: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 160px;
    min-width: 124px;

    padding: 12px;
    border-radius: 4px;
    font-family: 'Poppins', sans-serif;

    color: ${p => p.theme.text.color};
    background-color: ${p => p.theme.input.backgroundColor};
  `,
  Title: styled.h5`
    margin-top: 6px;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;

    color: ${p => p.theme.primaryColorContrast};
  `,
  TagList: styled.div`
    display: flex;
    margin: 0 -4px;
    margin-top: 8px;
  `,
  Tag: styled.div`
    margin: 2px 4px;

    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid ${p => p.theme.mainNav.dividerColor};

    font-size: 10px;
    font-family: 'Poppins', sans-serif;
  `,
  SponsoredTag: styled.div`
    margin: 2px 4px;

    padding: 2px 6px;
    border-radius: 4px;

    color: #fff;
    border: 1px solid ${p => p.theme.primaryColorContrast};
    background-color: ${p => rgba(p.theme.primaryColorContrast, 0.3)};

    font-size: 10px;
    font-family: 'Poppins', sans-serif;
  `,
  Address: styled.p`
    margin-top: 6px;
    font-size: 11px;
    font-family: 'Poppins', sans-serif;
    color: ${p => rgba(p.theme.text.color, 0.8)};
  `,
};

export interface LocationItemProps {
  id: string;
  location: LocationDoc;
  sponsored: boolean;
}

const LocationItem: React.FC<LocationItemProps> = ({
  id,
  location,
  sponsored = false,
}) => {
  const url = `/location/${id}`;
  const hasThumbnail = location.thumbnailURL && location.thumbnailURL != '';

  return (
    <S.Wrapper>
      <S.Link to={url}>
        {hasThumbnail ? (
          <S.ThumbnailImage src={location.thumbnailURL} />
        ) : (
          <S.ThumbnailPlaceholder>
            {location.title
              .split(' ')
              .map(s =>
                s
                  .replace(/[,"-']/g, '')
                  .charAt(0)
                  .toUpperCase(),
              )
              .join('')}
          </S.ThumbnailPlaceholder>
        )}
        <S.TagList>
          {sponsored && <S.SponsoredTag>#sponsored</S.SponsoredTag>}
          {location.tags.map(t => (
            <S.Tag key={t}>#{t}</S.Tag>
          ))}
        </S.TagList>
        <S.Title>{location.title}</S.Title>
        <S.Address>{location.address.replace(/(,\s?)?LV-([0-9]{4})/, '')}</S.Address>
      </S.Link>
    </S.Wrapper>
  );
};

export default LocationItem;
