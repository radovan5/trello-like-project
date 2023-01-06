const express = require('express')
const { check, validationResult } = require('express-validator')
const cors = require('cors')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const app = express()
const Card = require('./models/Card')

app.use(cors())

// Connect DataBase
connectDB()

// Init Middleware, now we can accept body data
app.use(express.json({ extended: false }))

app.get('/', async (req, res) => {
  try {
    const cards = await Card.find()
    res.json(cards)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

app.post(
  '/',
  [check('title', 'Title is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, description } = req.body
    // Default value for status and user if not assigned
    const status = req.body.status || 'To do'
    const user = req.body.user || 'Unassigned'
    try {
      const newCard = new Card({
        title,
        description,
        status,
        user,
      })

      const card = await newCard.save()

      res.json(card)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  }
)

app.put('/:id', async (req, res) => {
  const { title, description, status, user } = req.body

  // Build card object, checks are they included and adds them to cardField
  const cardFields = {}
  if (title) cardFields.title = title
  if (description) cardFields.description = description
  if (status) cardFields.status = status
  if (user) cardFields.user = user

  try {
    let card = await Card.findById(req.params.id)
    if (!card) {
      return res.status(404).json({ msg: 'Task not found' })
    }

    card = await Card.findByIdAndUpdate(
      req.params.id,
      {
        $set: cardFields,
      },
      { new: true }
    )
    res.json(card)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
