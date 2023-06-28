const Service = require('../services/index.js');
const newUser = async (req, res, next) => {
    const user = req.body;
    if (user.username && user.password && user.email) {
        try {
            await Service.UserService.signup(user);
            res.status(201).json({
                message: 'User created successfully',
            });
            console.log('User created successfully: ' + user.username);
        } catch (error) {
            res.status(500).json({
                message: 'Error occurred during signup',
                error: error.message,
            });
            console.log('Error occurred during signup for user: ' + user.username);
        }
    } else {
        res.status(400).json({
            message: 'Invalid request body',
        });
        console.log('Invalid request body for user: ' + user.username);
    }
};

module.exports = {
    newUser,
};