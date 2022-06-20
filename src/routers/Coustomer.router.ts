import * as express from 'express'
import CustomerController from '../controllers/Customer.controller'
import { Customer } from '../entity/Customer'
import { checkJWTCS } from '../middleware/checkJWT'
import CoustomerService from '../services/Coustomer.service'
import { upladUserPhoto } from '../utils/multer'

const CoustomerRouter = express.Router()

const controller = new CustomerController(new CoustomerService())

CoustomerRouter.post('/signup', async (req, res) => {
  try {
    const responce = await controller.signup(req.body)

    return res.status(200).json({
      status: 'Success',
      message: 'You have Successfully registered',
      data: responce
    })
  } catch (err) {
    return res.status(400).json({
      status: 'Fail',
      message: err
    })
  }
})

CoustomerRouter.post('/login', async (req, res) => {
  try {
    const responce = await controller.login(req.body)

    return res.status(200).json({
      status: 'Success',
      message: 'You have login',
      data: responce
    })
  } catch (err) {
    return res.status(400).json({
      status: 'Fail',
      message: err.message
    })
  }
})
CoustomerRouter.post('/get-user-details', checkJWTCS, async (req, res) => {
  try {
    const responce = await controller.getUserDetails(req.body)

    return res.status(200).json({
      status: 'Success',
      message: 'Your Details',
      data: responce
    })
  } catch (err) {
    return res.status(400).json({
      status: 'Fail',
      message: err.message
    })
  }
})

CoustomerRouter.post('/transection', checkJWTCS, async (req, res) => {
  try {
    const responce = await controller.getUserTransection(req.body)

    return res.status(200).json({
      status: 'Success',
      message: 'Transection Details',
      data: responce
    })
  } catch (err) {
    return res.status(400).json({
      status: 'Fail',
      message: err.message
    })
  }
})

CoustomerRouter.post('/verify-otp', checkJWTCS, async (req, res) => {
  try {
    const responce = await controller.verifyEmail(req.body)

    return res.status(200).json({
      status: 'Success',
      data: responce
    })
  } catch (err) {
    return res.status(400).json({
      status: 'Fail',
      message: err.message
    })
  }
})

CoustomerRouter.post('/change-password', async (req, res) => {
  try {
    const responce = await controller.changePassword(req.body)

    return res.status(200).json({
      status: 'Success',
      data: responce
    })
  } catch (err) {
    return res.status(400).json({
      status: 'Fail',
      message: err.message
    })
  }
})

CoustomerRouter.post('/forgot-password', async (req, res) => {
  try {
    const responce = await controller.forgotPassword(req.body)

    return res.status(200).json({
      status: 'Success',
      data: responce
    })
  } catch (err) {
    return res.status(400).json({
      status: 'Fail',
      message: err.message
    })
  }
})

CoustomerRouter.post(
  '/create-account-pincode',
  checkJWTCS,
  async (req, res) => {
    try {
      const responce = await controller.createAccountPincode(req.body)

      return res.status(200).json({
        status: 'Success',
        data: responce
      })
    } catch (err) {
      return res.status(400).json({
        status: 'Fail',
        message: err.message
      })
    }
  }
)

CoustomerRouter.post(
  '/update-user-profile/:id',
  upladUserPhoto,
  async (req, res) => {
    try {
      const param: any = req.params.id
      const file: any = req.file
      const responce = await controller.updateUserProfile(param, file)

      console.log(req.file)

      return res.status(200).json({
        status: 'Success',
        data: responce
      })
    } catch (err) {
      return res.status(400).json({
        status: 'Fail',
        message: err.message
      })
    }
  }
)

CoustomerRouter.post('/create-transetion', async (req, res) => {
  try {
    let responce = await controller.createPayment(req.body)

    return res.status(200).json({
      status: 'Success',
      data: responce
    })
  } catch (err) {
    return res.status(400).json({
      status: 'Fail',
      message: err.message
    })
  }
})

CoustomerRouter.post('/request-money', async (req, res) => {
  try {
    let responce = await controller.requestMoney(req.body)

    return res.status(200).json({
      status: 'Success',
      data: responce
    })
  } catch (err) {
    return res.status(400).json({
      status: 'Fail',
      message: err.message
    })
  }
})

export default CoustomerRouter
