import express from 'express'
import cors from 'cors'
import router from './src/routes'
import bodyParser from 'body-parser'

const PORT = 8080
const app = express()

app.use('*', cors({ origin: `http://localhost:${PORT}` }))
// app.use(cors({ origin: true }))
app.use(bodyParser.json())
app.use('/api/v1', router)
app.use((err, req, resp, next) => {
	resp.status(400).json({
		error: err.message,
	})
})

app.listen(PORT, () => {
	console.log('Beautystore is listening on 8080')
})

export default app
