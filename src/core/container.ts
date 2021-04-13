import { Container } from 'inversify';
import { AuthService } from '../services/auth';
import { TokenService } from '../services/token';
import { UserService } from '../services/user';

export function getContainer(): Container {
  const container = new Container({ skipBaseClassChecks: true });

  container.bind<AuthService>(AuthService).to(AuthService);
  container.bind<TokenService>(TokenService).to(TokenService)
  container.bind<UserService>(UserService).to(UserService);
  
  return container;
}
