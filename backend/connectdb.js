const { Client } = require('pg')

// ********** Connect to DB (pgAdmin) **********
const connectdb = new Client({
  user: 'postgres',
  password: 'pascal',
  host: 'localhost',
  database: 'Ecom',
  port: 5432,
})

const ConnectionDb = async () => {
  try {
    await connectdb.connect()
    console.log('La base de données est connectée')
  } catch (error) {
    console.error(
      'Erreur lors de la connexion à la base de données:',
      error.message,
    )
    process.exit(1)
  }
}

module.exports = ConnectionDb
