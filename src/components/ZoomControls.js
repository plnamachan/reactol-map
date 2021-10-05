import MapControlButton from './MapControlButton';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {fromLonLat} from 'ol/proj';

const ZoomControls = ({view}) => {
  const handleZoomIn = () => {
    const zoom = view.getZoom();
    zoom < 15 && view.animate({zoom: zoom + 1});
  };

  const handleZoomOut = () => {
    const zoom = view.getZoom();
    zoom > 0 && view.animate({zoom: zoom - 1});
  };

  const zoomToNull = () => {
    view.setCenter(fromLonLat([0, 0]));
    view.setZoom(15);
  };

  const zoomToWorld = () => {
    view.setCenter(fromLonLat([0, 0]));
    view.setZoom(0);
  };

  return (
    <Fragment>
      <MapControlButton onClick={handleZoomIn} title="Zoom In">
        +
      </MapControlButton>
      <MapControlButton onClick={handleZoomOut} title="Zoom Out">
        -
      </MapControlButton>
      <MapControlButton onClick={zoomToWorld} title="Reset Zoom">
        ↻
      </MapControlButton>
      <MapControlButton onClick={zoomToNull} title="Zoom to Null Island">
        🏝
      </MapControlButton>
    </Fragment>
  );
};

ZoomControls.propTypes = {
  view: PropTypes.object,
};

export default ZoomControls;
