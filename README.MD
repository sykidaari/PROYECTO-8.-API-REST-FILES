# Introducción

Esta base de datos sería para una tienda de productos para mascotas.

- En el repositorio de GitHub, en la raiz del proyecto, hay un archivo .yaml que contiene todas las peticiones de la aplicación. Pueden importarla en Insomnia/Postman y así probar las peticiones más rápidamente.

- En utils/productQueryValidator podrán encontrar la función validateProductQuery, que fue lo "extra" que añadí a la API en este proyecto, que sirve para filtrar los products en los GETs, y realmente también se podría utilizar con otros modelos
- En utils/errorHandler se encuentra la función handleError, que es la que gestiona todos los errores del proyecto (de forma flexible según el controlador y error), aportando una mayor claridad que en mis anteriores proyectos

# ENDPOINTS

## Brands

### GET

**ENDPOINT** brandsRouter.get('/', getBrands)

**USO** Recoge todas las brands de la base de datos

**EJEMPLO DE URL** http://localhost:3000/api/v1/brands/

**Queries que acepta la petición:**

- tier (economy/standard/premium)
  <br>
  <br>

**ENDPOINT** brandsRouter.get('/:id', getBrandById)

**USO** Recoge el brand con el ID (\_id de Mongo) indicado en la URL

**EJEMPLO DE URL** http://localhost:3000/api/v1/brands/ID-DEL-BRAND
<br>
<br>

### POST

**ENDPOINT** brandsRouter.post('/', [upload.single('img')], postBrand)

**USO** Crea un nuevo brand insertando en el cuerpo de la petición (req.body) un objeto estructurado en _Multipart Form Data_ según brandSchema

**EJEMPLO DE URL** http://localhost:3000/api/v1/brands/
<br>
<br>

### PUT

**ENDPOINT** brandsRouter.put('/:id', [upload.single('img')], putBrand)

**USO**
Recoge el brand con el ID (\_id de Mongo) indicado en la URL, y actualiza dicho brand insertando en el cuerpo de la petición (req.body) un objeto estructurado en _Multipart Form Data_ con los datos a actualizar

**EJEMPLO DE URL** http://localhost:3000/api/v1/brands/ID-DEL-BRAND
<br>
<br>

### DELETE

**ENDPOINT** brandsRouter.delete('/:id', deleteBrand)

**USO**
Recoge el brand con el ID (\_id de Mongo) indicado en la URL, y lo elimina

**EJEMPLO DE URL** http://localhost:3000/api/v1/brands/ID-DEL-BRAND
<br>
<br>

## Products

### GET

**ENDPOINT** productsRouter.get('/', getProducts)

**USO** Recoge todos los products de la base de datos

**EJEMPLO DE URL** http://localhost:3000/api/v1/products/
<br>
<br>

**ENDPOINT** productsRouter.get('/:id', getProductById)

**USO** Recoge el product con el ID (\_id de Mongo) indicado en la URL

**EJEMPLO DE URL** http://localhost:3000/api/v1/products/ID-DEL-PRODUCT
<br>
<br>

**ENDPOINT** productsRouter.get('/animal/:animalType', getProductsByAnimalType)

**USO** Recoge todos los productos con el animalType indicado en la URL

**EJEMPLO DE URL** http://localhost:3000/api/v1/products/animal/cat/?category=snack&ageGroup=adult

**Queries que acepta la petición**:
_Ver utils/productQueryValidator_

- weightClass: (small, medium, large)
- ageGroup (young, adult, senior)
- category (dry-food, wet-food, snack, toy)

<br>
<br>

**ENDPOINT** productsRouter.get('/brand/:brandId', getProductsByBrand)

**USO** Recoge todos los productos con el brand (\_id de Mongo del brand) indicado en la URL

**EJEMPLO DE URL** http://localhost:3000/api/v1/products/brand/ID-DEL-BRAND

**Queries que acepta la petición**:
_Ver utils/productQueryValidator_

- animalType (dog, cat, bird, fish, rodent, reptile)
- weightClass (small, medium, large)
- ageGroup (young, adult, senior)
- category (dry-food, wet-food, snack, toy)
  <br>
  <br>

### POST

**ENDPOINT** productsRouter.post('/', [upload.single('img')], postProduct)

**USO** Crea un nuevo product insertando en el cuerpo de la petición (req.body) un objeto estructurado en _Multipart Form Data_ según productSchema

**EJEMPLO DE URL** http://localhost:3000/api/v1/products/
<br>
<br>

### PUT

**ENDPOINT** productsRouter.put('/:id', [upload.single('img')], putProduct)

**USO**
Recoge el product con el ID (\_id de Mongo) indicado en la URL, y actualiza dicho product insertando en el cuerpo de la petición (req.body) un objeto estructurado en _Multipart Form Data_ con los datos a actualizar

**EJEMPLO DE URL** http://localhost:3000/api/v1/products/ID-DEL-PRODUCT
<br>
<br>

### DELETE

**ENDPOINT** productsRouter.delete('/:id', deleteProduct)

**USO**
Recoge el product con el ID (\_id de Mongo) indicado en la URL, y lo elimina

**EJEMPLO DE URL** http://localhost:3000/api/v1/products/ID-DEL-PRODUCT
