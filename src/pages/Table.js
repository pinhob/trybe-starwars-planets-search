import React, { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';
import TableData from '../components/TableData';

// const filteredPlanets = () => {
//   if (!searchTerm) return filter((planet) => planet[name].includes(searchTerm));

//   return planets;
// };

const Table = () => {
  const { planets, loading } = useContext(PlanetsContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {!loading
          ? planets.map((planet) => <TableData key={ planet.name } data={ planet } />)
          : <tr><td>The force is loading...</td></tr>}
      </tbody>
    </table>
  );
};

export default Table;
