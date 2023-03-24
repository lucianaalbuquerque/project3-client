import React from 'react';

const Form = ({ title, fields, btnText, handleSubmit }) => {
  return (
    <>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <input
            type="text"
            name="description"
            placeholder="write about your brand"
            value={field.description}
            onChange={field.handleChange}
          />
        ))}
        <button>{btnText}</button>
      </form>
    </>
  );
};

export default Form;
