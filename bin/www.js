const app = require('../app')
const appConfig = require('../config/app')

app.set('port', appConfig.port)
const server = app.listen(app.get('port'), () => {
  console.log('Server started on http://localhost:' + server.address().port)
})
