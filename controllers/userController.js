const User = require('../models/User');

exports.getUser = async (req, res) => {
    try {
        const userID = req.body.id;
        const user = await User.findById(userID);

        if(!user) {
            return res.status(404).json({message: `Пользователь с id: ${userID} не был найден в базе данных!`})
        }

        res.status(200).json(user);
    } catch(error) {
        console.error('Ошибка при получении пользователя!');
        res.status(500).json({message: "Ошибка сервера при получении пользователя!"})
    }
};

exports.getUsers = async (req, res) => {
    try{
        const users = await User.find().select('_id username');
        if(users == null || users.length === 0) {
            return res.status(404).json({message: 'Список пользователей пуст!'});
        }

        res.status(200).json(users);

    } catch(error) {
        console.error('Ошибка при получении списка пользователей', error);
        res.status(500).json({message: "Ошибка сервера при получении списка пользователей!"})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userID = req.body.id;
        const user = await User.findById(userID);

        if(!user) {
            return res.status(404).json({message: `Пользователь с таким id: ${userID} не был найден!`})
        }

        await User.deleteOne({_id: userID});
        res.status(200).json({message: `Пользователь id: ${userID} успешно удален из базы данных!`})
    } catch(error) {
        console.error('Ошибка при удалении пользователя из базы данных', error);
        res.status(500).json({message: "Ошибка сервера при удалении пользователя из базы данных!"})
    }
}