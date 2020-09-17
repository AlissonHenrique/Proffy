import { Router, Request, Response } from 'express';

import ClassesController from '../controllers/ClassesController';
import ConnectionsController from '../controllers/ConnectionsController';

const classesControllers = new ClassesController();
const connectionsControllers = new ConnectionsController();
const routes = Router();

routes.get('/classes', classesControllers.index);
routes.post('/classes', classesControllers.create);

routes.get('/connections', connectionsControllers.index);
routes.post('/connections', connectionsControllers.create);

routes.get('/', (request:Request, response:Response) => {
  response.json({ success: true });
});
export default routes;
