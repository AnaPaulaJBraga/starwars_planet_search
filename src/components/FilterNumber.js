import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterNumber() {
  const { data, setData, filter, setFilter, options, setOptions, change, setChange,
  } = useContext(PlanetsContext);
  const { filterByNumericValues: filterValues } = filter;

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setChange({
      ...change,
      [name]: value,
    });
  };

  const handleClick = async () => {
    const { results } = data;
    const { value, column, comparison } = change;

    const filterValue = results.filter((planets) => {
      switch (comparison) {
      case 'maior que':
        return Number(planets[column]) > Number(value);
      case 'menor que':
        return Number(planets[column]) < Number(value);
      default:
        return planets[column] === value;
      }
    });

    setData({
      ...data,
      results: filterValue,
    });

    const optionColumn = options.filter((option) => option !== change.column);
    setOptions(optionColumn);

    setFilter({
      ...filter,
      filterByNumericValues: [
        ...filterValues,
        change,
      ],
    });

    setChange({
      column: optionColumn[0],
      comparison: 'maior que',
      value: 0,
    });
  };

  return (
    <section>
      <select
        name="column"
        id="column"
        data-testid="column-filter"
        onChange={ handleChange }
      >
        {options.map((col) => <option key={ col }>{col}</option>)}
      </select>
      <select
        name="comparison"
        id="comparison"
        data-testid="comparison-filter"
        onChange={ handleChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <label htmlFor="value">
        <input
          type="number"
          name="value"
          id="value"
          data-testid="value-filter"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </section>
  );
}

export default FilterNumber;
