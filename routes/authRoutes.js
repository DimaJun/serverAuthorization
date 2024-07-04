const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();
require('dotenv').config();
const { JWT_SECRET } = process.env;

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username: username });

    if (user) {
      return res
        .status(400)
        .json({ message: 'Пользователь с таким именем уже существует!' });
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'Регистрация прошла успешно!' });
  } catch (error) {
    console.error('Ошибка при регистрации пользователя: ', error);
    res
      .status(500)
      .json({ message: 'Ошибка сервера при регистрации пользователя!' });
  }
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        let user = await User.findOne({username: username});

        if(!user) {
            return res.status(404).json({message: "Пользователь с таким именем отсутствует!"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(401).json({message: "Вы ввели неправильный пароль!"});
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: "2h"});

        res.status(200).json(token);
    } catch(error) {
        console.error('Ошибка при аутентификации пользователя: ', error);
        res.status(500).json({message: "Ошибка сервера при аутентификации пользователя!"});
    }
});

module.exports = router;