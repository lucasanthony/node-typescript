import { Router } from 'express';
import MovieController from './movie.controller';

const routes = Router()

routes.post('/', MovieController.save)
routes.get('/', MovieController.getByGenre)

export default routes