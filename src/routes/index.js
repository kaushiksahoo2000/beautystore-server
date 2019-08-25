import { Router, Request } from 'express'
import { genProductID } from '../util'
import admin from 'firebase-admin'
import serviceAccount from '../../keyfile.json'

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
})
const db = admin.firestore()
const PRODUCTS_COLLECTION = 'products'
const router = Router()

router.get('/', async (req, resp, next) => {
	resp.send('Hello from the Beautystore API')
})

router.post('/products', async (req, resp, next) => {
	try {
		const { name, price, link, rating, category } = req.body
		const productID = genProductID(name, link)
		const data = {
			name,
			price,
			link,
			rating,
			category,
		}
		const productRef = await db
			.collection(PRODUCTS_COLLECTION)
			.doc(productID)
			.set(data)
		resp.json({
			id: productID,
			data,
		})
	} catch (err) {
		next(err)
	}
})

export default router
