const express = require("express")
const router = express.Router()
const utilities = require("../utilities/")
const controller = require("../controllers/accountController")
const accountValidate = require('../utilities/account-validation')
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")


//Routes
router.get('/login', utilities.handleErrors(controller.buildLogin));
router.get('/register', utilities.handleErrors(controller.buildRegister));

router.post('/register', utilities.handleErrors(accountController.registerAccount))

router.get('/login', utilities.handleErrors(controller.buildLogin));
router.get('/register', utilities.handleErrors(controller.buildRegister));
router.post(
"/register",
  accountValidate.registrationRules(),
  accountValidate.checkRegData,
  utilities.handleErrors(controller.registerAccount)
)
router.post(
  "/login",
 accountValidate.loginRules(),
  accountValidate.checkLoginData,
  utilities.handleErrors(controller.accountLogin)
)
router.get("/", (req, res) => {
 utilities.checkLogin,
 utilities.handleErrors(controller.buildAccount)})
 router.get("/update", utilities.handleErrors(controller.buildUpdate))
 router.post("/update-account-info",
  accountValidate.updateBasicInfoRules(),
  accountValidate.checkBasicInfoData,
  utilities.handleErrors(controller.updateAccount)
)
router.post("/update-account-password",
  accountValidate.updatePasswordRules(),
  accountValidate.checkPasswordData,
  utilities.handleErrors(controller.updatePassword)
)
router.get("/management", (req, res) => {
 utilities.checkJWTToken,
 utilities.checkLogin,
 utilities.checkAdminAccess,
 utilities.handleErrors(controller.buildAccountManagement)})
router.get('/management/update/:accountId', (req, res) => {
 utilities.checkJWTToken,
 utilities.checkLogin,
 utilities.checkAdminAccess,
 utilities.handleErrors(controller.buildEditAccount)
 });
router.post("/management/update-account",
 accountValidate.updateBasicInfoRules(),
 accountValidate.checkBasicInfoData,
 utilities.handleErrors(controller.updateAccount)
)
router.post("/management/update-account-password",
 accountValidate.updatePasswordRules(),
 accountValidate.checkPasswordData,
 utilities.handleErrors(controller.updatePassword)
)
router.get('/management/delete/:accountId', (req, res) => {
 utilities.checkJWTToken,
 utilities.checkLogin,
 utilities.checkAdminAccess, 
 utilities.handleErrors(controller.buildDeleteAccount)});
router.post('/management/delete-account', utilities.handleErrors(controller.deleteAccount)
);

router.get("/logout", utilities.handleErrors(controller.accountLogout))


/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
    })
  }

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      title: "Register",
      nav,
    })
  }  

// Process the registration data
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )
  

router.post('/register', utilities.handleErrors(accountController.registerAccount))
  
  
module.exports = { buildLogin, buildRegister }


module.exports = router;