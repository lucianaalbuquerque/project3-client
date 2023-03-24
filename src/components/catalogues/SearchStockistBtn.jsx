import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function SearchStockistBtn({ stockists, selectStockist }) {
  const [value, setValue] = useState(null);
  // const storedToken = localStorage.getItem("authToken");

  const defaultProps = {
    options: stockists,
    getOptionLabel: option => option.name,
  };

  return (
    <div className="searchStockist">
      <Autocomplete
        {...defaultProps}
        id="controlled-demo"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderInput={params => <input {...params} label="stockists" variant="standard" />}
      />
      <button onClick={() => selectStockist(value)}>Add</button>
    </div>
  );
}

export default SearchStockistBtn;
