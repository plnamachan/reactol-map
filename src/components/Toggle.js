import PropTypes from 'prop-types';
import React, {Fragment} from 'react';

import {getLayerByName} from '../util';

const Toggle = ({map}) => {
  const handleToggle = name => {
    const layer = getLayerByName(name, map.getLayers());
    layer.setOpacity(+!layer.get('opacity'));
  };

  const toggleButtonStyles = {
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    border: '2px solid SteelBlue',
    color: 'SteelBlue',
    borderRadius: 6,
    marginLeft: 5,
    fontSize: 15,
  };

  return (
    <Fragment>
      <h3>Toggle Basemaps</h3>
      <div className="toggle">
        <button
          style={{...toggleButtonStyles}}
          onClick={() => handleToggle('Planet Basemap')}
        >
          Toggle Planet Basemap
        </button>
        <button
          style={{...toggleButtonStyles}}
          onClick={() => handleToggle('Mapbox Basemap')}
        >
          Toggle Mapbox Basemap
        </button>
      </div>
    </Fragment>
  );
};

Toggle.propTypes = {
  map: PropTypes.object,
};

export default Toggle;
