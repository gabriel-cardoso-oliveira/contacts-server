import { Router } from 'express';
import UserController from './app/controllers/UserController';
import ContactsController from './app/controllers/ContactsController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/contacts', ContactsController.store);
routes.put('/contacts', ContactsController.update);
routes.get('/contacts', ContactsController.index);

routes.post('/users', UserController.store);
routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.put('/users-status', UserController.updateStatus);
routes.get('/users', UserController.index);

export default routes;
