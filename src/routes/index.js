import { Router } from 'express'
import { genProductID } from '../util'
import Collections from '../consts/db_collections'
import Errors from '../consts/errors'
import admin from 'firebase-admin'
import serviceAccount from '../../keyfile.json'

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
})
const db = admin.firestore()
const router = Router()

router.get('/', async (req, res, next) => {
	res.send('Hello from the Beautystore API')
})

router.post('/products', async (req, res, next) => {
	try {
		const { name, price, link, rating, category } = req.body

		if (!name && typeof name === 'string') throw Errors.BLANK_NAME_ERR
		if (!price && typeof price === 'number') throw Errors.BLANK_PRICE_ERR
		if (!link && typeof link === 'string') throw Errors.BLANK_LINK_ERR
		if (!rating && typeof rating === 'number') throw Errors.BLANK_RATING_ERR
		if (!category && typeof category === 'string') throw Errors.BLANK_CATEGORY_ERR

		const productID = genProductID(name, link)
		const data = {
			name,
			price,
			link,
			rating,
			category,
		}
		const productRef = await db
			.collection(Collections.PRODUCTS_COLLECTION)
			.doc(productID)
			.set(data)
		res.json({
			id: productID,
			data,
		})
	} catch (err) {
		next(err)
	}
})

router.get('/products/:id', async (req, res, next) => {
	try {
		const {
			params: { id: productID },
		} = req

		if (!productID && typeof productID === 'string') throw Errors.PRODUCT_ID_ERR
		const product = await db
			.collection(Collections.PRODUCTS_COLLECTION)
			.doc(productID)
			.get()

		if (!product.exists) throw Errors.PRODUCT_EXISTS_ERR
		res.json({
			id: product.id,
			data: product.data(),
		})
	} catch (err) {
		next(err)
	}
})

router.get('/categories/:category', async (req, res, next) => {
	try {
		const {
			params: { category },
		} = req

		if (!category) throw Errors.BLANK_CATEGORY_ERR
		const productsSnapshot = await db
			.collection(Collections.PRODUCTS_COLLECTION)
			.where('category', '==', category)
			.orderBy('rating', 'desc')
			.get()

		if (productsSnapshot.empty) throw Errors.CATEGORY_EXISTS_ERR
		const products = []
		productsSnapshot.forEach(product => {
			products.push({
				id: product.id,
				data: product.data(),
			})
		})
		res.json(products)
	} catch (err) {
		next(err)
	}
})

export default router
