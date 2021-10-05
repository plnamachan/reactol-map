import PropTypes from 'prop-types';
import React, {Fragment, useEffect, useRef, useState} from 'react';

import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import ScaleLine from 'ol/control/ScaleLine';
import TileLayer from 'ol/layer/Tile'; // a default export
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import ZoomSlider from 'ol/control/ZoomSlider';
import {fromLonLat} from 'ol/proj';

import ChangeDate from './ChangeDate';
import MapControlButton from './MapControlButton';
import Toggle from './Toggle';
import UploadControl from './UploadControl';
import ZoomControls from './ZoomControls';
import {API_KEY, MAPBOX_ACCESS_TOKEN} from '../constants';
import {getLayerByName} from '../util';

// Next Steps:
/*
1. Catalog / outline your experience/process/ creating app
  - new js stuff, react,
  - gotchas
  - techniques
  - philosophies DRY etc
  - tooling / dev env

  wiki article, blog post, 
2. demo what you built
3. eventually presentation

b. workflow on apps team
c. GIS background


*/

// ternary operator
// condition ? true : false

const calcXyzUrl = (month, year) =>
  `https://tiles{0-3}.planet.com/basemaps/v1/planet-tiles/global_monthly_${year}_${
    month < 10 ? '0' + month.toString() : month.toString()
  }_mosaic/gmap/{z}/{x}/{y}.png?api_key=${API_KEY}`;
const INITIAL_YEAR = 2016;
const INITIAL_MONTH = 1;

const OpenLayerMap = ({fileData, onSetData, error, onSetError}) => {
  const mapRef = useRef();
  const [olMap, setOlMap] = useState();
  const [month, setMonth] = useState(INITIAL_MONTH);
  const [year, setYear] = useState(INITIAL_YEAR);

  // console.log(fileData);

  // typeof is a js way to get the type of a variable
  // console.log("OLM.js", typeof fileData);

  // Changes Date for PLanet Basemap
  useEffect(() => {
    if (olMap) {
      const layer = getLayerByName('Planet Basemap', olMap.getLayers());
      const source = layer.getSource();
      source.setUrl(calcXyzUrl(month, year));
    }
    return () => {
      // cleanup function
    };
  }, [month, year, olMap]);

  // will update our VectorLayer
  useEffect(() => {
    if (olMap) {
      const layer = getLayerByName('AOI', olMap.getLayers());
      const source = layer.getSource();
      // We clear because we only want one AOI at a time
      source.clear();

      if (fileData) {
        if (fileData.type === 'FeatureCollection') {
          const features = new GeoJSON().readFeatures(fileData, {
            featureProjection: 'EPSG:3857',
          });
          source.addFeatures(features);

          // Ask yourself if something isn't worki: what is the projection??
          // console.log(view.getProjection());
        } else if (fileData.type === 'Feature') {
          const feature = new GeoJSON().readFeature(fileData, {
            featureProjection: 'EPSG:3857',
          });
          source.addFeature(feature);
        }

        olMap.getView().fit(source.getExtent());
      }
    }
  }, [fileData, olMap]);

  // Sets up initial maps
  useEffect(() => {
    const mapCheck = mapRef.current.getElementsByClassName('ol-viewport')[0];

    if (!mapCheck) {
      const initialMap = new Map({
        controls: [new ZoomSlider(), new ScaleLine()],
        target: mapRef.current,
        layers: [
          new TileLayer({
            // opacity:0.1,
            properties: {name: 'OSM Basemap'},
            source: new OSM(),
          }),

          new TileLayer({
            opacity: 0,
            properties: {name: 'Planet Basemap'},
            source: new XYZ({
              url: calcXyzUrl(INITIAL_MONTH, INITIAL_YEAR),
            }),
          }),
          new TileLayer({
            opacity: 0,
            properties: {name: 'Mapbox Basemap'},
            source: new XYZ({
              url: `https://api.mapbox.com/styles/v1/namachan/cktyq9mc20agx19pfp6f7m9hk/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`,
            }),
          }),
          new VectorLayer({
            properties: {name: 'AOI'},
            source: new VectorSource(),
            // style:
          }),
        ],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
          maxZoom: 15,
        }),
      });
      setOlMap(initialMap);
    }

    console.log('initial map created!');
    return () => {
      // This is the cleanup function.
    };
  }, [setOlMap]);

  const handleZoomToAoi = () => {
    const layer = getLayerByName('AOI', olMap.getLayers());
    const source = layer.getSource();
    olMap.getView().fit(source.getExtent());
  };

  return (
    <Fragment>
      {/* <h1>
        Global Monthly Basemap: {MONTHS[month - 1]} {YEARS[year - 2016]}
      </h1> */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        ref={mapRef}
        id="map-container"
        className="map-container"
      >
        {error !== null && fileData !== undefined ? (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'white',
              padding: 100,
              borderRadius: 6,
            }}
          >
            <div
              style={{
                color: 'red',
                fontSize: 30,
                fontWeight: 'bold',
              }}
            >
              This is an invalid GeoJSON.
            </div>
            {/* <div
              style={{
                color: 'red',
                fontSize: 15,
                fontWeight: 'bold',
                position: 'absolute',
                bottom: '85%',
                left: '95%',
                border: '2px solid red',
              }}
            >
              x
            </div> */}
          </div>
        ) : (
          <div></div>
        )}
        <div
          className="map-controls"
          style={{
            position: 'absolute',
            zIndex: 1,
            right: 10,
            top: 10,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ZoomControls view={olMap && olMap.getView()} />
          <MapControlButton
            title="Zoom to AOI"
            disabled={!fileData}
            onClick={handleZoomToAoi}
          >
            ✈
          </MapControlButton>
          {/* Double shebang not not */}
          <UploadControl
            style={{}}
            onSetData={onSetData}
            hasFileData={!!fileData}
            hasSetError={onSetError}
          />
        </div>

        <div
          className="update-map-container"
          style={{position: 'absolute', zIndex: 1, bottom: 35}}
        >
          <h2>Pick a Month (Only for Planet Basemap):</h2>
          <div>
            <ChangeDate
              handleChangeMonth={setMonth}
              handleChangeYear={setYear}
            />
          </div>
          <div>
            <Toggle map={olMap} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

OpenLayerMap.propTypes = {
  fileData: PropTypes.object,
  onSetData: PropTypes.func.isRequired,
  error: PropTypes.string,
  onSetError: PropTypes.func.isRequired,
};

export default OpenLayerMap;
