import { getCurrentVersion } from './helpers';
import { logo } from './assets/images';

const AppConfig = {
  name: 'Order Admin',
  copyright: 'Company',
  version: getCurrentVersion(),
  logo,
};

export default AppConfig;
