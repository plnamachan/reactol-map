import PropTypes from 'prop-types';
import React, {Fragment} from 'react';

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const YEARS = ['2016', '2017', '2018', '2019', '2020', '2021'];

const ChangeMonth = ({handleChangeMonth, handleChangeYear}) => {
  const handleSelectMonth = ({target: {value}}) => handleChangeMonth(value);

  const handleSelectYear = ({target: {value}}) => handleChangeYear(value);

  const dateStyles = {
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 5,
    border: '2px solid SteelBlue',
    color: 'SteelBlue',
    borderRadius: 6,
    marginLeft: 5,
    fontSize: 15,
  };

  return (
    <Fragment>
      <select
        style={{...dateStyles}}
        onChange={handleSelectMonth}
        name="month"
        id="month"
      >
        {MONTHS.map((month, i) => (
          <option key={month} value={i + 1}>
            {month}
          </option>
        ))}
      </select>

      <select
        style={{...dateStyles}}
        onChange={handleSelectYear}
        name="year"
        id="year"
      >
        {YEARS.map((year, i) => (
          <option key={year} value={i + 2016}>
            {year}
          </option>
        ))}
      </select>
    </Fragment>
  );
};

ChangeMonth.propTypes = {
  handleChangeMonth: PropTypes.func.isRequired,
  handleChangeYear: PropTypes.func.isRequired,
};

export default ChangeMonth;
