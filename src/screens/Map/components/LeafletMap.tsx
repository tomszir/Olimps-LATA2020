import styled from 'styled-components';
import React from 'react';
import { TileLayer, MapContainer, MapConsumer, Marker, Popup } from 'react-leaflet';
import { Map, LatLngTuple } from 'leaflet';
import { Link } from 'react-router-dom';

import firebase from '@/firebase';
import { LocationDoc } from '~/src/types';

const S_MapContainer = styled(MapContainer)`
  width: 100%;
  height: 100%;
`;

type LeafletMapState = {
  markers: LocationDoc[];
};

export default class LeafletMap extends React.Component<{}, LeafletMapState> {
  readonly initialPosition: LatLngTuple = [51.505, -0.09];

  state: LeafletMapState = {
    markers: [],
  };

  map: null | Map = null;

  componentDidMount() {
    firebase
      .firestore()
      .collection('locations')
      .onSnapshot(snapshot => {
        this.setState({
          markers: snapshot.docs.map(d => ({ id: d.id, ...(d.data() as LocationDoc) })),
        });
      });
  }

  render() {
    return (
      <S_MapContainer center={this.initialPosition} zoom={13} scrollWheelZoom={true}>
        <MapConsumer>
          {map => {
            this.map = map;
            return null;
          }}
        </MapConsumer>
        {this.state.markers.map(location => (
          <Marker
            position={[location.coordinates.latitude, location.coordinates.longitude]}
          >
            <Popup>
              <Link to={`/location/${location.id}`}>{location.title}</Link>
            </Popup>
          </Marker>
        ))}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </S_MapContainer>
    );
  }

  panTo = (position: LatLngTuple) => {
    this.map?.panTo(position);
  };

  setView = (position: LatLngTuple) => {
    this.map?.setView(position, this.map?.getZoom());
  };
}
