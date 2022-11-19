# Development

### Link to Deployed Website
`https://olddragon000.github.io/cs1300-development/`

### Goal and Value of the Application
The overall goal of this application is to sell bakery items. It makes it
easier for users to select cheaper and lower calories products.

### Usability Principles Considered
Products are displayed in grid to make the website responsive and
easier to navigate. In each product card, the name of the product is bolded, which
makes it stand out. The description text is in light grey because it's less important.
The category, calories, and price values are grouped together for easier navigation.

### Organization of Components
There is only one extra component apart from App.js, which is the bakeryItem component.

### How Data is Passed Down Through Components
Product information is passed down to the bakeryItem component along with a function
to remove item, a function to add item, and a value indicating how many given products
there are in the shopping cart.

### How the User Triggers State Changes
For each filter, there is a corresponding boolean useState that keeps track of
whether it is active. For sort type, there is one string useState that keeps
track of what type of sorting should be applied. There is also a list useState
to keep track of all the distinct products in the cart in chronological order, and
there is an object/dictionary useState that keeps track of the quantity of the
products that are currently in the cart. There is also a number useState that
keeps track of the total price of the cart.
Therefore, when the user adds a product to
cart or remove a product from cart, the list, dictionary, and number useStates will be
updated correspondingly. There is also a cart reset button to reset the 3 corresponding useStates.
