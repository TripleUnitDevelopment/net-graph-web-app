import { InMemoryDbService } from 'angular-in-memory-web-api';
import { UserDB } from './users';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return { 
      'users': UserDB.users,
    }
  }
}