const Service = require('../services/index.js');
const newUser = async (req, res, next) => {
    const user = req.body;
    if (user.username && user.password && user.email) {
        try {
            const token = await Service.UserService.signup(user);
            console.log('token is : ' + token)
            res.status(201).json({
                message: 'User created successfully',
                token: token,
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

const login = async (req, res, next) => {
    const user = req.body;
    if (user.username && user.password) {
        try {
            const loggedInUser = await Service.UserService.login(user);
            res.cookie('access_token', loggedInUser.token, {
                httpOnly: true,
                // TODO: short lived token with refresh tokens
                maxAge: 60 * 1000 * 1440,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            }).status(200).json({
                message: 'Successful login',
                username: loggedInUser.username,
            });
            console.log('Successful login for : ' + user.username);
        } catch (error) {
            res.status(401).json({
                message: 'Login unsuccessful',
                error: error.message,
            });
            console.log('Login unsuccessful for : ' + user.username);
        }
    } else {
        res.status(400).json({
            message: 'Invalid request body',
        });
        console.log('Invalid request body for user: ' + user.username);
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie('access_token', {
            httpOnly: true,
            maxAge: 60 * 1000 * 1440,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }).status(200).json({
            message: 'Successful logout',
        });
    } catch (error) {
        res.status(401).json({
            message: 'Logout unsuccessful',
            error: error.message,
        });
    }


};

const getUserInfo = async (req, res, next) => {
    const user = req.user;
    return res.status(200).json({
        username: user.username,
        email: user.email,
    });
};

module.exports = {
    newUser,
    login,
    getUserInfo,
    logout,
};