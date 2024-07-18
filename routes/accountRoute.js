const express = require("express")
const router = express.Router()
const utilities = require("../utilities/")
const accountValidate = require('../utilities/account-validation')
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")


//Routes
router.get('/login', utilities.handleErrors(accountController.buildLogin));
router.get('/register', utilities.handleErrors(accountController.buildRegister));

router.post('/register', utilities.handleErrors(accountController.registerAccount))

router.post(
"/register",
  accountValidate.registrationRules(),
  accountValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)
router.post(
  "/login",
 accountValidate.loginRules(),
  accountValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)
router.get("/", (req, res) => {
 utilities.checkLogin,
 utilities.handleErrors(accountController.buildAccount)})

router.get("/update", utilities.handleErrors(accountController.buildUpdate))
router.post("/update-account-info",
  accountValidate.updateBasicInfoRules(),
  accountValidate.checkBasicInfoData,
  utilities.handleErrors(accountController.updateAccount)
)
router.post("/update-account-password",
  accountValidate.updatePasswordRules(),
  accountValidate.checkPasswordData,
  utilities.handleErrors(accountController.updatePassword)
)
router.get("/management", (req, res) => {
 utilities.checkJWTToken,
 utilities.checkLogin,
 utilities.checkAdminAccess,
 utilities.handleErrors(accountController.buildAccountManagement)})
router.get('/management/update/:accountId', (req, res) => {
 utilities.checkJWTToken,
 utilities.checkLogin,
 utilities.checkAdminAccess,
 utilities.handleErrors(accountController.buildEditAccount)
 });
router.post("/management/update-account",
 accountValidate.updateBasicInfoRules(),
 accountValidate.checkBasicInfoData,
 utilities.handleErrors(accountController.updateAccount)
)
router.post("/management/update-account-password",
 accountValidate.updatePasswordRules(),
 accountValidate.checkPasswordData,
 utilities.handleErrors(accountController.updatePassword)
)
router.get('/management/delete/:accountId', (req, res) => {
 utilities.checkJWTToken,
 utilities.checkLogin,
 utilities.checkAdminAccess, 
 utilities.handleErrors(accountController.buildDeleteAccount)});
router.post('/management/delete-account', utilities.handleErrors(accountController.deleteAccount)
);

router.get("/logout", utilities.handleErrors(accountController.accountLogout))


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

//Process the login request
// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

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