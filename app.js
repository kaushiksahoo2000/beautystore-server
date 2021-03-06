import express from 'express'
import cors from 'cors'
import router from './src/routes'
import bodyParser from 'body-parser'

const PORT = 8080
const app = express()

app.use('*', cors({ origin: `http://localhost:${PORT}` }))
app.use(bodyParser.json())
app.use('/api/v1', router)
app.use((err, req, res, next) => {
	res.status(400).json({
		error: err.message,
	})
})

app.listen(PORT, () => {
	console.log(`Beautystore is listening on ${PORT}`)
})

export default app
