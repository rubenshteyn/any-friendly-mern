const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Animal = require("../models/Animals");

// user router
router.get('/currentUser', async (req, res) => {
    try {
        const { userId } = req.query
        const user = await User.find({_id: userId})
        res.json(user)
    } catch (e) {
        console.log(e)
    }
})

router.post('/addFavorite', async(req, res) => {
    try {
        const {animalId, userId} = req.body
        const user = await User.findOne({_id: userId})
        const animal = await Animal.findOne({_id: animalId})

        animal.liked.push(userId)
        user.favoriteAnimals.push(animalId)

        await animal.save()
        await user.save()

        console.log(user, animal)
        res.json(user)
        res.json(animal)
    } catch (e) {
        console.log(e)
    }
})

router.post('/deleteFavorite', async(req, res) => {
    try {
        const {animalId, userId} = req.body
        const user = await User.findOne({_id: userId})
        const animal = await Animal.findOne({_id: animalId})

        let removedUser = animal.liked.indexOf(userId);
        if(removedUser >= 0) {
            animal.liked.splice(removedUser,1);
        }

        let removedAnimal = user.favoriteAnimals.indexOf(animalId);
        if(removedAnimal >= 0) {
            user.favoriteAnimals.splice(removedAnimal,1);
        }

        await animal.save()
        await user.save()

        console.log(user, animal)
        res.json(user)
        res.json(animal)
    } catch (e) {
        console.log(e)
    }
})

// auth router
router.post('/registration',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Некорректный пароль').isLength({min: 6}),
        check('name', 'Некорректное имя').isLength({min: 2})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }
            const {email, password, role, name} = req.body
            const isUsed = await User.findOne({email})
            if (isUsed) {
                return res.status(300).json({message: "Данный email занят"})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email, password: hashedPassword, role, name
            })
            console.log(user)
            await user.save()

            res.status(201).json({message: "Пользователь создан!"})
        } catch (e) {
            console.log(e)
        }
    })
router.post('/login',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Некорректный пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }
            const {email, password} = req.body

            const user = await User.findOne({email})
            if(!user) {
               return res.status(400).json({message: 'Такого пользователя нет!'})
            }
            const isMatch = bcrypt.compare(password, user.password)
            if(!isMatch) {
                return res.status(400).json({message: 'Пароли не совпадают!'})
            }

            const jwtSecret = '35n535jnt53njntmtk3mt5tm'
            const token = jwt.sign(
                {
                    userId: user.id,
                    role: user.role
                },
                jwtSecret,
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id, role: user.role})

        } catch (e) {
            console.log(e)
        }
    })
module.exports = router