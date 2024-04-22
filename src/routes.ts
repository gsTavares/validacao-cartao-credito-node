import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCreditCardController } from './controllers/creditCard/CreateCreditCardController';
import { ValidateCreditCardController } from './controllers/creditCard/ValidateCreditCardController';

const router = Router();

router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.post('/creditcard', isAuthenticated, new CreateCreditCardController().handle);
router.get('/validate-creditcard/:creditCardNumber', isAuthenticated, new ValidateCreditCardController().handle);

export { router };