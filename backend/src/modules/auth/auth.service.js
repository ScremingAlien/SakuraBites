
import eventBus from '../../utils/eventBus.js';
 
 

class AuthService {

  constructor() {
    this.eventBus = eventBus;
  }
  
   
}

export default new AuthService();
