import styled from 'styled-components';
import React from 'react';

import Spinner from '@/components/Spinner';
import LeafletMap from './components/LeafletMap';

const S_Map = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const S_Loading = styled.div`
  z-index: 1000;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${p => p.theme.backgroundColor};
`;

const S_LoadingLabel = styled.p`
  margin: 16px;
  font-size: 12px;
  font-family: 'Poppins', sans-serif;
  color: ${p => p.theme.text.color};
`;

export interface MapScreenState {
  loading: boolean;
}

export default class Map extends React.Component<{}, MapScreenState> {
  mapRef = React.createRef<LeafletMap>();

  state = {
    loading: true,
  };

  componentDidMount() {
    // Liepāja lat/lng
    const latitude = 56.5047;
    const longitude = 21.0108;

    setTimeout(() => {
      this.mapRef.current?.setView([latitude, longitude]);
      this.setState({ loading: false });
    }, 500);
  }

  render() {
    return (
      <S_Map>
        <LeafletMap ref={this.mapRef} />
        {this.state.loading && (
          <S_Loading>
            <Spinner />
            <S_LoadingLabel>Loading...</S_LoadingLabel>
          </S_Loading>
        )}
      </S_Map>
    );
  }
}
