import { Router } from 'express'
import logger from '../helper/logger.helper'

const router = Router()

router.get('/', (req, res) => {
  logger.info('Hello Account!')
  res.send('Hello Account!')
})

export default router
