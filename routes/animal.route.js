const {Router} = require('express')
const router = Router()
const Animal = require('../models/Animals')
const {Types} = require("mongoose");
const User = require("../models/User");

router.post('/add', async(req, res) => {
    try {
        const {text, name, gender, img, age, kind, vaccinations, userId, liked} = req.body

        const animal = await new Animal({
            text,
            owner: userId,
            name,
            gender,
            age,
            kind,
            vaccinations,
            img,
            liked
        })
        await animal.save()
        res.json(animal)
    } catch (e) {
        console.log(e)
    }
})

router.post('/change/:id', async(req, res) => {
    try {
        const {text, name, gender, img, age, kind, vaccinations, userId, _id} = req.body
        const animal = await Animal.findOne({_id: req.params._id})
        animal._id = _id
        animal.owner = userId
        animal.text = text
        animal.name = name
        animal.gender = gender
        animal.img = img
        animal.age = age
        animal.vaccinations = vaccinations
        animal.kind = kind

        await animal.save()
        res.json(animal)
    } catch (e) {
        console.log(e)
    }
})

router.get('/', async (req, res) => {
    try {
        const { userId } = req.query
        const animal = await Animal.find({owner: userId})
        res.json(animal)
    } catch (e) {
        console.log(e)
    }
})

router.get('/allAnimals', async (req, res) => {
    try {
        const animal = await Animal.find()
        res.json(animal)
    } catch (e) {
        console.log(e)
    }
})

router.get('/favoriteAnimals', async (req, res) => {
    try {
        const { userId } = req.query
        const animal = await Animal.find({liked: userId})
        res.json(animal)
    } catch (e) {
        console.log(e)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const animal = await Animal.findOneAndDelete({_id: req.params.id})
        res.json(animal)
    } catch (e) {
        console.log(e)
    }
})

router.put('/completed/:id', async (req, res) => {
    try {
        const animal = await Animal.findOne({_id: req.params.id})
        animal.completed = !animal.completed
        await animal.save()
        res.json(animal)
    } catch (e) {
        console.log(e)
    }
})

router.put('/important/:id', async (req, res) => {
    try {
        const animal = await Animal.findOne({_id: req.params.id})
        animal.important = !animal.important
        await animal.save()
        res.json(animal)
    } catch (e) {
        console.log(e)
    }
})
module.exports = router
