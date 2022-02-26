import { Controller } from 'express-ext';
import { User, UserFilter, UserService } from './user';

export class UserController extends Controller<User, string, UserFilter> {
  constructor(log: (msg: any, ctx?: any) => void, userService: UserService) {
    super(log, userService);
  }
}
