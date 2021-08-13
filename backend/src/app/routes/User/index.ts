import { Router } from 'express';
import { UserControllers } from '@/app/controllers';

const UserRouter = Router();
const route = new UserControllers();

UserRouter.get("/login", route.loginGet);
UserRouter.post("login", route.login);

export default UserRouter;