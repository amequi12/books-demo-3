import ErrorLogger from '../loggers/error-logger';

export function initialize(application) {
  application.register('logger:errorLogger', ErrorLogger);
  
  application.inject('component', 'errorLogger', 'logger:errorLogger');
  application.inject('controller', 'errorLogger', 'logger:errorLogger');
  application.inject('route', 'errorLogger', 'logger:errorLogger');
}

export default {
  initialize
};
