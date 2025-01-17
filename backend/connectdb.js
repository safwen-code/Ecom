const Pool = require('pg').Pool

// ********** Connect to DB (pgAdmin) **********
const pool = new Pool({
  user: 'postgres',
  password: 'pascal',
  host: 'localhost',
  database: 'Ecom',
  port: 5432,
})

const ConnectionDb = async () => {
  try {
    await pool.connect()
    console.log('La base de données est connectée')
  } catch (error) {
    console.error(
      'Erreur lors de la connexion à la base de données:',
      error.message,
    )
    process.exit(1)
  }
}

module.exports = { ConnectionDb, pool }
