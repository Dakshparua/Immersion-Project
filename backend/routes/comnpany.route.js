import express from 'express';
import {registerCompany, getCompany, getCompanyById} from '../controllers/company.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';



const router = express.Router();


router.route('/register').post(isAuthenticated,registerCompany);
router.route('/get').get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
// router.route('/profile/update').post(isAuthenticated, updateProfile);

export default router;