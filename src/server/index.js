const app = require('./app')

const { PORT = 8080 } = process.env
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)) 