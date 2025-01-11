import { Router } from 'express'
import logger from '../helper/logger.helper'

const router = Router()

router.get('/', async (req, res) => {
  logger.info('Hello Account!')
  await new Promise(resolve => setTimeout(resolve, 1000))
  res.send('Hello Account!')
})

export default router
