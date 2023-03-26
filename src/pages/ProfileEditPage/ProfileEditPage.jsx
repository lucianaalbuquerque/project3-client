import { useState } from 'react';
import { Layout } from '../../components/general';
// import styles from './styles.module.scss';

function ProfileEditPage() {
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <Layout
      mainChildren={<h3>Add info about your brand</h3>}
      sideChildren={
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="description"
            placeholder="write about your brand"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type="text"
            name="logoUrl"
            placeholder="your logo here"
            value={logoUrl}
            onChange={e => setLogoUrl(e.target.value)}
          />
          <button>Submit</button>
        </form>
      }
    />
  );
}

export default ProfileEditPage;
