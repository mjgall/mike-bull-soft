import { Loader as SUILoader } from 'semantic-ui-react';
import React from 'react';

const Loader = () => {
  return (
    <SUILoader active size="huge">
      Loading
    </SUILoader>
  );
};

export default Loader;
