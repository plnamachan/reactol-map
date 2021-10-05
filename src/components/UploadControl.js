import PropTypes from 'prop-types';
import React, {Fragment, useRef} from 'react';

import MapControlButton from './MapControlButton';
import {validateGeojson} from '../util';
/* 
1. make sure only geojson can be passed
2. make sure the handleUpload onChange func doesn't break when cancelling
3. make sure that we have a valid geojson when we upload* do a "basic" validation
4. finally, get the data into our map
*/

/*
const myObj = {
    property1: 'foo',
    property2:'bar',
    property3: {
        subproperty1: 'baz'
    }
}

const whatIwant = myObj.property3.subproperty1; //should be "baz"
const {property3: {
    subproperty1: kewjsfnej
}} = myObj;

console.log('subproperty1', kewjsfnej);

// name

const props = {name: 'tim', lastname: 'schuab', phone: '12345'}
const reactComponent = ({name, lastname, phone}) => {
    return <div>{name}</div>

}
const mycomponent = (props, children) => 
*/

const UploadControl = ({onSetData, hasFileData, hasSetError, ...props}) => {
  const inputRef = useRef();

  const handleUpload = e => {
    // Check for .geojson file type (Doesnt catch everything, make a change)
    const fileExtension = e.target.value.split('.')[1];
    if (fileExtension !== 'geojson') {
      console.error('Wrong file type');
    } else {
      const file = e.target.files[0];
      // Checks if file is not chosen
      if (file !== undefined) {
        // makes a file reader
        const fr = new FileReader();
        // onChange for the file reader
        fr.onload = event => {
          // JSON.parse changes it to an object
          const rawData = JSON.parse(event.target.result);
          if (validateGeojson(rawData)) {
            console.log('it works!');
            onSetData(rawData);
            hasSetError(null);
          } else {
            console.log('this is invalid');
            hasSetError('This is an invalid geojson!');
          }
        };
        //takes a file
        // console.log(fr);
        fr.readAsText(file);
      }
    }
  };

  const handleClearAoi = () => onSetData(null);

  const handleClick = () => {
    // Ref allows you to access the DOM in React
    inputRef.current.click();
  };

  return (
    <Fragment>
      <input
        ref={inputRef}
        style={{display: 'none'}}
        onChange={handleUpload}
        type="file"
        accept=".geojson"
      />
      <MapControlButton
        title={hasFileData ? 'Clear Aoi' : 'Upload a file'}
        onClick={hasFileData ? handleClearAoi : handleClick}
        {...props}
      >
        {hasFileData ? '✖' : '↥'}
      </MapControlButton>
    </Fragment>
  );
};

UploadControl.propTypes = {
  onSetData: PropTypes.func.isRequired,
  hasFileData: PropTypes.bool,
  hasSetError: PropTypes.func,
};

export default UploadControl;
