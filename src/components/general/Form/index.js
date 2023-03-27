import React from 'react';
import styles from './styles.module.scss';

const Form = ({ title, fields, btnText, handleChange, handleSubmit }) => {
  return (
    <div className={styles.form}>
    <div className={styles.bigTab}>
      <h2>Login</h2>
    </div>
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
        <div className={styles.smallTab}>
        <button>{btnText}</button></div>
      </form>
    </div>
  );
};

export default Form;
