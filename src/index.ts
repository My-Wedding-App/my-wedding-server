import { application } from 'express';

const port = 8000

application.listen(port, () => {
  console.log('Listening ... 8000')
})