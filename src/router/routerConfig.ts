import common from './modules/common';
import dashboard from './modules/dashboard';
import system from './modules/system';

const configRouters = [...common, ...dashboard, ...system];

export default configRouters;
