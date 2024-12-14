const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '123456',
    isAdmin: true,
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456', // Plain password for testing only
    isAdmin: false,
  },
  {
    id: '3',
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: '123456', // Plain password for testing only
    isAdmin: false,
  },
]

const products = [
  {
    id: '1',
    name: 'Product One',
    image: '/images/camera.jpg',
    brand: 'Brand A',
    category: 'Category A',
    description: 'High-quality camera',
    reviews: [
      {
        name: 'John Doe',
        rating: 5,
        comment: 'Amazing product!',
      },
      {
        name: 'Jane Doe',
        rating: 4,
        comment: 'Very good quality!',
      },
    ],
    rating: 4.5,
    numReviews: 2,
    price: 99.99,
    countInStock: 10,
  },
  {
    id: '2',
    name: 'Product Two',
    image: '/images/mouse.jpg',
    brand: 'Brand B',
    category: 'Category B',
    description: 'High-quality product two',
    reviews: [],
    rating: 0,
    numReviews: 0,
    price: 149.99,
    countInStock: 5,
  },
  {
    id: '3',
    name: 'phone',
    image: '/images/phone.jpg',
    brand: 'Brand B',
    category: 'Category B',
    description: 'High-quality phone',
    reviews: [
      {
        name: 'John Doe',
        rating: 5,
        comment: 'Amazing product!',
      },
      {
        name: 'Jane Doe',
        rating: 4,
        comment: 'Very good quality!',
      },
    ],
    rating: 2.5,
    numReviews: 2,
    price: 149.99,
    countInStock: 5,
  },
  {
    id: '4',
    name: 'playstation',
    image: '/images/playstation.jpg',
    brand: 'Brand B',
    category: 'Category B',
    description: 'High-quality playstation',
    reviews: [],
    rating: 0,
    numReviews: 0,
    price: 149.99,
    countInStock: 5,
  },
]

export { users, products }
