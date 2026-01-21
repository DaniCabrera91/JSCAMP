import express from 'express'
import jobs from './jobs.json' with { type: 'json' }

const PORT = process.env.PORT ?? 1234
const app = express()

app.use((req, res, next) => {
    const timestring = new Date().toLocaleTimeString()
    console.log(`[${timestring}] ${req.method} ${req.url}`)
    next()
})

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/health', (req, res) => {
    return res.json({
        status: 'OK',
        timestamp: process.uptime()
    })
})

app.get('/get-jobs', (req, res) => {
    const { text, title, level, limit, technology, offset} = req.query

    let filteredJobs = jobs
    if(text){
        const searchTerm = text.toLowerCase()
        filteredJobs = filteredJobs.filter(job =>
            job.title.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm)
        )
    }

    return res.json(filteredJobs)
})


app.get('/get-job/:id', (req, res) => {
    const { id } = req.params
    return res.json({ id, title: `Job with id ${id}` })
})

// Opcional /abcd /acd
app.get('/a{b}cd', (req, res) => {
    return res.send('abcd o acd' )
})



app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})