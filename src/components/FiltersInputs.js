import React, { useContext, useState } from 'react';
import { PlanetsAndFiltersContext } from '../context/PlanetsAndFiltersContext';

const FiltersInputs = () => {
  const { setStates:
    { setSearchterm, setNumericFilters, setOrder },
  } = useContext(PlanetsAndFiltersContext);

  const [columnValues, setColumnValues] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [filters, setFilters] = useState([]);
  const [orderColumn, setOrderColumn] = useState('Name');
  const [sort, setSort] = useState('ASC');

  const columns = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
    'climate',
    'gravity',
    'terrain',
    'population',
  ];

  const filterPlanetsByName = ({ target: { value } }) => {
    setSearchterm(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedInputs = [...event.target.elements]
      .filter((element) => element.tagName.toLowerCase() !== 'button')
      .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});

    setNumericFilters((prevState) => [...prevState, selectedInputs]);
    setColumnValues(columnValues.filter((value) => value !== selectedInputs.column));
    setFilters((prevState) => [...prevState, selectedInputs]);
  };

  const removeFilter = (column) => {
    const removedFilter = filters.filter((filter) => filter.column !== column);

    setFilters(removedFilter);
    setColumnValues((prevState) => [...prevState, column]);
    setNumericFilters(removedFilter);
  };

  const sortByOrder = (event) => {
    event.preventDefault();

    const sortOrder = {
      column: orderColumn.toLowerCase(),
      sort,
    };

    setOrder(sortOrder);
  };

  return (
    <div>
      <form onSubmit={ sortByOrder }>
        <label htmlFor="sort">
          Order by:
          <select
            name="column"
            id="sort"
            onChange={ ({ target: { value } }) => setOrderColumn(value) }
            data-testid="column-sort"
          >
            {columns.map((column) => (
              <option
                key={ column }
                value={ column }
              >
                {column}
              </option>))}
          </select>
        </label>

        <label htmlFor="asc">
          Ascending:
          <input
            type="radio"
            name="sort-options"
            id="asc"
            value="ASC"
            onChange={ ({ target: { value } }) => setSort(value) }
            data-testid="column-sort-input-asc"
          />
        </label>

        <label htmlFor="desc">
          Descending:
          <input
            type="radio"
            name="sort-options"
            id="desc"
            value="DESC"
            onChange={ ({ target: { value } }) => setSort(value) }
            data-testid="column-sort-input-desc"
          />
        </label>

        <button type="submit" data-testid="column-sort-button">Sort</button>
      </form>

      <input
        type="text"
        name="search-name-filter"
        data-testid="name-filter"
        placeholder="Search by a planet name"
        onChange={ filterPlanetsByName }
      />

      <form onSubmit={ handleSubmit }>

        <label htmlFor="column">
          Filter:
          <select
            name="column"
            id="column-filter"
            data-testid="column-filter"
          >
            {columnValues
              .map((value) => (
                <option key={ value } value={ value }>{value}</option>))}
          </select>
        </label>

        <label htmlFor="comparison">
          Compare:
          <select
            name="comparison"
            id="comparison-filter"
            data-testid="comparison-filter"
          >
            <option value="maior que" selected>maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="value">
          Value:
          <input
            type="number"
            name="value"
            id="value-filter"
            placeholder="Value for compare"
            data-testid="value-filter"
          />
        </label>

        <button type="submit" data-testid="button-filter">Filter</button>
      </form>

      <ul>
        {
          filters && filters.map(({ column, comparison, value }) => (
            <li
              key={ `${column}-filter` }
              data-testid="filter"
            >
              {`Filtro: ${column} - ${comparison} - ${value} `}
              <button
                type="button"
                key={ `${column}-button` }
                onClick={ () => removeFilter(column) }
              >
                X
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default FiltersInputs;
