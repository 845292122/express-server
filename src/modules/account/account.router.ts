import { Router } from 'express'
import logger from '../../helper/logger.helper'
import replyHelper from '../../helper/reply.helper'
import { httpOk } from '../../app'

const router = Router()

router.get(
  '/',
  replyHelper(async (req, res) => {
    logger.info('Hello Account!')
    await new Promise(resolve => setTimeout(resolve, 1000))
    httpOk(res, 'Hello Account11111!')
  })
)

export default router
