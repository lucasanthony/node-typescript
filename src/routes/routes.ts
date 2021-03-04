import { Router } from 'express';

import moviesRoutes from '../movie/movies.route';
import userRoutes from '../user/user.route';

const routes = Router();

routes.use('/movie', moviesRoutes);
routes.use('/user', userRoutes);

export default routes;