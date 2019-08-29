# beautystore-server

A simple Node.js API to handle skin care product management

## Local Development Server Setup and Running

1. Clone this repository: `$ git clone https://github.com/kaushiksahoo2000/beautystore-server.git`
2. Ensure that there is a valid `keyfile.json` file in the root directory. This has
   private key information allowing you to use your personal Firestore account to
   persist data. More information: https://firebase.google.com/docs/firestore/quickstart
3. Install dependencies

```
npm install
```

3. Start the server

```
npm start
```

# API

- **ROOT URL**

  http://localhost:8080/api/v1

## **Submit Product**

Allows the addition of a product to the skin care product database.

- **URL**

  /products

- **Method:**

  `POST`

- **Data Params**

  `{category: string, link: string, name: string, price: number, rating: number}`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    `{ "id": "ce35ef393a3993319e44f17e65abc9c8", "data": { "name": "Counter+ Charcoal Facial Mask", "price": 49, "link": "https://www.beautycounter.com/product/counter+-charcoal-facial-mask", "rating": 1, "category": "masks" } }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "name is blank" }`

## **Retrieve Product**

Returns json data about a single skin care product.

- **URL**

  /products/:id

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[string]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    `{ "id": "ce35ef393a3993319e44f17e65abc9c8", "data": { "name": "Counter+ Charcoal Facial Mask", "price": 49, "link": "https://www.beautycounter.com/product/counter+-charcoal-facial-mask", "rating": 1, "category": "masks" } }`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "product does not exist" }`

## **Retrieve Products by Category**

Returns json data about every skin product under a specific category. The products will be ordered via descending rating.

- **URL**

  /categories/:category

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `category=[string]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    `[ { "id": "fca01de85e48ff1c805d0ad3a062face", "data": { "name": "Charcoal Cleansing Bar", "rating": 5, "category": "cleansers", "link": "https://www.beautycounter.com/product/charcoal-cleansing-bar", "price": 26 } }, { "id": "8b5957ada463ca61be8ef261ac9d1910", "data": { "name": "Instant Eye Makeup Remover", "rating": 4.5, "category": "cleansers", "link": "https://www.beautycounter.com/product/instant-eye-makeup-remover", "price": 25 } } ]`

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "category does not exist" }`
