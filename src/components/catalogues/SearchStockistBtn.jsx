import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

function SearchStockistBtn (props) {
    const [value, setValue] = useState(null);
    const {pageId, catalogueId, stockists, selectStockist, closeSearch} = props

    const storedToken = localStorage.getItem("authToken");

    const defaultProps = {
        options: stockists,
        getOptionLabel: (option) => option.name,
    };
    

  return (
    <div className='searchStockist'>
    <Autocomplete
        {...defaultProps}
        id="controlled-demo"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="stockists" variant="standard" />
        )}
      />
         <button onClick={() => selectStockist(value)}>Add</button>
    </div>
  )
}

export default SearchStockistBtn