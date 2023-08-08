import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: 'tranhh',
      email: 'tranhnguyen8a1@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'user123',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    }
  ],
  products: [
    {
      name: 'Slim Shirt',
      category: 'Shirts',
      image: '/images/d1.jpg',
      price: 60,
      countInStock: 0,
      brand: ' Nike',
      rating: 5,
      numReviews: 10,
      description: 'Lorem ipsum dolor sit amet cbore eamsd gubergren no sea takimata sanctus est lorem ipsum dolor sit amet.'
    },
    {
      name: 'Áo croptop',
      category: 'Shirts',
      image: '/images/d2.jpg',
      price: 50,
      countInStock: 10,
      brand: ' Adidas',
      rating: 4,
      numReviews: 5,
      description: 'Lorem ipsum dolor sit amet consetetur sadbergren no sea takimata sanctus est lorem ipsum dolor sit amet.'
    },
    {
      name: 'Áo sơ mi hồng',
      category: 'Pants',
      image: '/images/d3.jpg',
      price: 70,
      countInStock: 10,
      brand: ' Nike',
      rating: 4.5,
      numReviews: 8,
      description: 'Lorem ipsum dolor sit amet cokimata sanctus est lorem ipsum dolor sit amet.'
    }, {
      name: 'Áo sơ mi đỏ',
      category: 'Pants',
      image: '/images/h5.jpg',
      price: 70,
      countInStock: 10,
      brand: ' Adidas',
      rating: 3.5,
      numReviews: 8,
      description: 'Lorem ipsum dolor sit amet cokimata sanctus est lorem ipsum dolor sit amet.'
    }, {
      name: 'Áo xanh',
      category: 'Pants',
      image: '/images/h6.jpg',
      price: 70,
      countInStock: 10,
      brand: ' Adidas',
      rating: 3.5,
      numReviews: 8,
      description: 'Lorem ipsum dolor sit amet cokimata sanctus est lorem ipsum dolor sit amet.'
    }, {
      name: 'Áo quả táo',
      category: 'Pants',
      image: '/images/h7.jpg',
      price: 70,
      countInStock: 10,
      brand: ' Adidas',
      rating: 2.5,
      numReviews: 8,
      description: 'Lorem ipsum dolor sit amet cokimata sanctus est lorem ipsum dolor sit amet.'
    },{
      name: 'Áo sơ mi tím',
      category: 'Pants',
      image: '/images/h8.jpg',
      price: 70,
      countInStock: 10,
      brand: ' Adidas',
      rating: 5,
      numReviews: 8,
      description: 'Lorem ipsum dolor sit amet cokimata sanctus est lorem ipsum dolor sit amet.'
    },
  ]
}
export default data;