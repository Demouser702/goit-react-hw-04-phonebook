import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Filter(onChange) {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setFilter(filter);
  }, [filter, setFilter]);

  return (
    <form className="form">
      <label>
        <span>Find contacts by name</span>
        <input
          className="form-input "
          value={filter}
          name="filter"
          type="text"
          placeholder=""
          onChange={evt => setFilter(evt.target.value)}
        />
      </label>
    </form>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func,
};

export default Filter;
