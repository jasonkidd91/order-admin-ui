import React from 'react';
import { CFooter } from '@coreui/react';
import AppConfig from 'src/AppConfig';

const TheFooter = () => (
  <CFooter fixed={false}>
    <div className="mfs-auto">
      <a href="/" rel="noopener noreferrer" className="text-success">
        {AppConfig.copyright}
      </a>
      <span className="ml-1">&copy; 2021</span>
    </div>
  </CFooter>
);

export default React.memo(TheFooter);
