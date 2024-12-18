const users = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '123456',
    isAdmin: true,
  },
  {
    _id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456', // Plain password for testing only
    isAdmin: false,
  },
  {
    _id: '3',
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: '123456', // Plain password for testing only
    isAdmin: false,
  },
]

const products = [
  {
    _id: '1',
    name: 'Product One',
    image: '/images/camera.jpg',
    brand: 'Brand A',
    category: 'Category A',
    description: 'High-quality camera',
    reviews: [
      { _id: '1', name: 'John Doe', rating: 5, comment: 'Amazing product!' },
      { _id: '2', name: 'Jane Doe', rating: 4, comment: 'Very good quality!' },
    ],
    rating: 4.5,
    numReviews: 2,
    price: 99.99,
    countInStock: 10,
  },
  {
    _id: '2',
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
    _id: '3',
    name: 'phone',
    image: '/images/phone.jpg',
    brand: 'Brand B',
    category: 'Category B',
    description: 'High-quality phone',
    reviews: [
      { _id: '1', name: 'John Doe', rating: 5, comment: 'Amazing product!' },
      { _id: '2', name: 'Jane Doe', rating: 4, comment: 'Very good quality!' },
    ],
    rating: 2.5,
    numReviews: 2,
    price: 149.99,
    countInStock: 5,
  },
  {
    _id: '4',
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
const orders = [
  {
    _id: '1',
    user: '64bfc8cfcdf72e0017d91a6b', // Sample ObjectId for the user
    orderItems: [
      {
        name: 'Product 1',
        qty: 2,
        image: '/images/product1.jpg',
        price: 50.0,
        product: '64bfc8cfcdf72e0017d91a6c', // Sample ObjectId for the product
      },
      {
        name: 'Product 2',
        qty: 1,
        image: '/images/product2.jpg',
        price: 100.0,
        product: '64bfc8cfcdf72e0017d91a6d',
      },
    ],
    shippingAddress: {
      address: '123 Main Street',
      city: 'New York',
      postalCode: '10001',
      country: 'USA',
    },
    paymentMethod: 'PayPal',
    paymentResult: {
      id: 'abc123',
      status: 'Completed',
      update_time: '2024-12-16T10:00:00Z',
      email_address: 'user@example.com',
    },
    itemsPrice: 200.0,
    taxPrice: 20.0,
    shippingPrice: 10.0,
    totalPrice: 230.0,
    isPaid: true,
    paidAt: '2024-12-15T12:00:00Z',
    isDelivered: false,
    deliveredAt: null,
    createdAt: '2024-12-14T08:00:00Z',
    updatedAt: '2024-12-15T13:00:00Z',
  },
  {
    _id: '2',
    user: '64bfc8cfcdf72e0017d91a6e',
    orderItems: [
      {
        name: 'Product 3',
        qty: 3,
        image: '/images/product3.jpg',
        price: 30.0,
        product: '64bfc8cfcdf72e0017d91a6f',
      },
    ],
    shippingAddress: {
      address: '456 Elm Street',
      city: 'San Francisco',
      postalCode: '94101',
      country: 'USA',
    },
    paymentMethod: 'Credit Card',
    paymentResult: {
      id: 'xyz456',
      status: 'Pending',
      update_time: null,
      email_address: 'anotheruser@example.com',
    },
    itemsPrice: 90.0,
    taxPrice: 9.0,
    shippingPrice: 5.0,
    totalPrice: 104.0,
    isPaid: false,
    paidAt: null,
    isDelivered: false,
    deliveredAt: null,
    createdAt: '2024-12-13T15:00:00Z',
    updatedAt: '2024-12-14T16:00:00Z',
  },
]
const shippingAddress = {
  address: '123 Main St',
  city: 'New York',
  postalCode: '10001',
  country: 'USA',
}
const cart = {
  cartItems: [
    {
      product: '1',
      name: 'Sample Product 1',
      image: '/images/sample1.jpg',
      price: 50,
      qty: 2,
    },
    {
      product: '2',
      name: 'Sample Product 2',
      image: '/images/sample2.jpg',
      price: 30,
      qty: 1,
    },
  ],
  shippingAddress: {
    address: '123 Main St',
    city: 'New York',
    postalCode: '10001',
    country: 'USA',
  },
  paymentMethod: 'PayPal',
  itemsPrice: 130, // Calculated as: 50*2 + 30
  shippingPrice: 0, // Based on $100
  taxPrice: 19.5, // Calculate as 15% of itemsPrice
  totalPrice: 149.5, // itemsPrice + shippingPrice + taxPrice
}

export { users, products, orders, shippingAddress, cart }
