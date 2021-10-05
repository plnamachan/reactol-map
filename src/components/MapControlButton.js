import PropTypes from 'prop-types';
import React from 'react';

// styling variable
const mapControlButtonStyle = {
  width: 40,
  height: 40,
  fontWeight: 'bold',
  marginBottom: 10,
  backgroundColor: 'white',
  padding: 5,
  border: 'none',
  color: 'SteelBlue',
  borderRadius: 4,
  fontSize: 22,
};

const MapControlButton = ({style, children, ...props}) => (
  <button style={{...mapControlButtonStyle, ...style}} {...props}>
    {children}
  </button>
);

MapControlButton.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default MapControlButton;
