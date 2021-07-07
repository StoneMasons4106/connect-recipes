# API Docs

### GET Methods

##### My Recipes

Endpoint: /api/v1/my-recipes?key=(API_KEY)

This endpoint allows a user to return a list of their recipes provided they supply their unique API key.

Example Payload: [{'_id': ObjectId('60dcc5bf827cb49f8946e3b1'), 'recipe_picture_url': 'https://i.ibb.co/41wqTHG/Animal-test.jpg', 'name':
'Testing this name', 'ingredients': '1. Test ingredient\r\n2. Test ingredient', 'prep_work': '1. Test ingredient\r\n2.
Test ingredient', 'cooking_instructions': '1. Test ingredient\r\n2. Test ingredient', 'serving_instructions': '1. Test
ingredient\r\n2. Test ingredient', 'tags': ['Ethiopian', 'Lunch'], 'owner': 'admin'}]

Payload Data Type: String