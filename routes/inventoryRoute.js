// Needed Resources 
const express = require("express")
const utilities = require("../utilities")
const router = new express.Router() 
const invController = require("../controllers/invController")
const inventoryValidate = require("../utilities/inventory-validation")

//Routes as below:

router.get('/', utilities.handleErrors(invController.buildInvManagement));
router.get('/add-classification', utilities.handleErrors(invController.buildAddClassification));
router.post('/add-classification',
 inventoryValidate.classificationRules(),
 inventoryValidate.checkClassificationData,
 utilities.handleErrors(invController.addClassification)
)
router.get('/add-inventory', utilities.handleErrors(invController.buildAddInventory));
router.post('/add-inventory',
 inventoryValidate.inventoryRules(),
 inventoryValidate.checkInventoryData,
 utilities.handleErrors(invController.addInventory)
 )

 router.get('/type/:classificationId', utilities.handleErrors(invController.buildByClassificationId));
 router.get('/detail/:inventoryId', utilities.handleErrors(invController.buildByInventoryId)); 

router.get('/', (req, res) =>{
 utilities.checkJWTToken,
 utilities.checkLogin,
 utilities.checkAccountAccess,   
 utilities.handleErrors(invController.buildInvManagement)});
router.get('/add-classification', utilities.handleErrors(invController.buildAddClassification));
router.post('/add-classification',
 inventoryValidate.classificationRules(),
 inventoryValidate.checkClassificationData,
 utilities.handleErrors(invController.addClassification)
)

router.get('/add-inventory', utilities.handleErrors(invController.buildAddInventory));
router.post('/add-inventory',
 inventoryValidate.inventoryRules(),
 inventoryValidate.checkInventoryData,
 utilities.handleErrors(invController.addInventory)
)

router.get('/type/:classificationId', utilities.handleErrors(invController.buildByClassificationId));
router.get('/detail/:inventoryId', utilities.handleErrors(invController.buildByInventoryId));
router.get('/getInventory/:classification_id', utilities.handleErrors(invController.getInventoryJSON))
router.get('/edit/:inventoryId', utilities.handleErrors(invController.buildEditInventory))
router.post('/update/',
 inventoryValidate.inventoryRules(),
 inventoryValidate.checkUpdateData,
 utilities.handleErrors(invController.updateInventory))

module.exports = router;
router.get('/delete/:inventoryId', utilities.handleErrors(invController.buildDeleteInventory))
router.post('/delete/', invController.deleteInventory)

module.exports = router;