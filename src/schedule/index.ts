import schedule from 'node-schedule'

const safeTask = (task: () => Promise<void> | void) => {
  return async () => {
    try {
      await Promise.resolve(task())
    } catch (error) {
      console.error('Task encountered an error:', error)
    }
  }
}

// test
// const task = () => {
//   console.log('Running sync task...')
//   throw new Error('This is a synchronous error.')
// }

// schedule.scheduleJob('*/5 * * * * *', safeTask(task))
