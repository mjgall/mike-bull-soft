import { Loader as SUILoader } from 'semantic-ui-react';
import React from 'react';

const Loader = () => {
  return (
    <SUILoader
      active
      size="huge"
      style={{ position: 'fixed', top: '50%', left: '60%' }}>
      Loading
    </SUILoader>
  );
};

export default Loader;
