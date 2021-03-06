/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

const TableData = (
  { data:
  { name,
    rotation_period: rotationPeriod,
    orbital_period: orbitalPeriod,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water: surfaceWater,
    population,
    films,
    created,
    edited,
    url } },
) => (
  <tr>
    <td data-testid="planet-name">{name}</td>
    <td>{rotationPeriod}</td>
    <td>{orbitalPeriod}</td>
    <td>{diameter}</td>
    <td>{climate}</td>
    <td>{gravity}</td>
    <td>{terrain}</td>
    <td>{surfaceWater}</td>
    <td>{population}</td>
    <td>{films}</td>
    <td>{created}</td>
    <td>{edited}</td>
    <td>{url}</td>
  </tr>
);

TableData.propTypes = {
  data: PropTypes.objectOf(PropTypes.oneOfType(
    PropTypes.string,
    PropTypes.array,
  )).isRequired,
};

export default TableData;
