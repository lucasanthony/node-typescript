import { Router } from 'express';
import UserController from './user.controller';

const routes = Router()

routes.post('/', UserController.save)
routes.get('/', UserController.getAll)

export default routes