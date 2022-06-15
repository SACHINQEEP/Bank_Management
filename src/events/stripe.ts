import Stripe from 'stripe'
import service from '../config/app_config'
import AppError from '../middleware/AppError'

const stripe = new Stripe(service.stripe_key, {
  apiVersion: '2020-08-27'
})

const createStripeCustomer = async function (data: any) {
  try {
    const account = await stripe.customers.create({
      description: 'test User',
      email: data
    })
    return account
  } catch (err) {
    throw new AppError(400, err.message)
  }
}

export default createStripeCustomer
