const express = require('express')
const userController = require('../Controller/userController')
const projectController = require('../Controller/projectController')
const jwtMiddleware = require('../middleware/jwtMiddilware')
const multerConfig = require('../middleware/multerMiddleware')

const router = new express.Router() //create router

// register api call

router.post('/user/register',userController.register)

// login api call
router.post('/user/login',userController.login)

// addProjects
router.post('/projects/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)


// getUserProjects
router.get('/user/all-projects',jwtMiddleware,projectController.allUserProject)

// getAllProjects
router.get('/projects/all',jwtMiddleware,projectController.getAllProject)

// getHomeProjects
router.get('/projects/home-projects',projectController.getHomeProject)

// edit project
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProjectController)

//delete project
router.delete('/projects/remove/:id',jwtMiddleware,projectController.deleteProjectController)




// export router

module.exports = router