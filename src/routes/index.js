import { Router } from 'express'
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

		if (!name) throw new Error('name is blank')
		if (!price) throw new Error('price is blank')
		if (!link) throw new Error('link is blank')
		if (!rating) throw new Error('rating is blank')
		if (!category) throw new Error('category is blank')

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

router.get('/products/:id', async (req, resp, next) => {
	try {
		const { params } = req
		const { id: productID } = params

		if (!productID) throw new Error('product ID is required')
		const product = await db
			.collection(PRODUCTS_COLLECTION)
			.doc(productID)
			.get()

		if (!product.exists) throw new Error('product does not exist')
		resp.json({
			id: product.id,
			data: product.data(),
		})
	} catch (err) {
		next(err)
	}
})

router.get('/categories/:category', async (req, resp, next) => {
	try {
		const { params } = req
		const { category } = params

		if (!category) throw new Error('category is required')
		const productsSnapshot = await db
			.collection('products')
			.where('category', '==', category)
			.orderBy('rating', 'desc')
			.get()
		const products = []
		productsSnapshot.forEach(product => {
			products.push({
				id: product.id,
				data: product.data(),
			})
		})

		if (products.length === 0) throw new Error('category does not exist')
		resp.json(products)
	} catch (err) {
		next(err)
	}
})

export default router
