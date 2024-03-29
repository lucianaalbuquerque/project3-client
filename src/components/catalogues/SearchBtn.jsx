import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

function SearchBtn(props) {
  const [value, setValue] = useState(null);
  const { pageId, catalogueId, products, closeSearch } = props;

  const storedToken = localStorage.getItem('authToken');

  const defaultProps = {
    options: products,
    getOptionLabel: option => option.name,
  };

  const addProduct = async () => {
    const body = { value, catalogueId };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/addproduct/${pageId}`,
        body,
        { headers: { Authorization: `Bearer ${storedToken}` } },
      );
      closeSearch();
      props.refreshPage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Autocomplete
        {...defaultProps}
        id="controlled-demo"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderInput={params => <input {...params} label="products" variant="standard" />}
      />
      <button onClick={addProduct}>Add</button>
    </>
  );
}

export default SearchBtn;
