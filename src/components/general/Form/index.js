import React from 'react';
import styles from './styles.module.scss';

const Form = ({ title, fields, btnText, handleSubmit }) => {
  return (
    <div className={styles.form}>
    <div className={styles.bigTab}>
        <h2>{title}</h2>
    </div>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <input
            type="text"
            name={field.name}
            placeholder={field.name}
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
