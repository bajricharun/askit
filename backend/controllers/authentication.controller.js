require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const env = process.env;
const errors = require("../messages/errors");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res) => {
    try {
        const { name, email, password, passwordSecond } = req.body;

        if (password !== passwordSecond) {
            error = {
                code: "202",
                message: errors.authentication.registration.passwordNotMatching
            }
            throw error;
        }

        const hashedPass = await bcrypt.hash(password, parseInt(env.SALT_ROUNDS));

        const jwtToken = jwt.sign(
            {
                email: email
            },
            env.JWT_SECRET_KEY,
            {
                expiresIn: "2h"
            }
        );

        const dataToInput = {
            name: name,
            email: email,
            password: hashedPass,
            jwtToken: jwtToken
        };

        user = await prisma.users.create({ data: dataToInput });

        res.status(200).send({
            payload: {
                jwt: user.jwtToken,
                id: user.id
            }
        });

    } catch (error) {
        if (error.code === 'P2002') {
            res.status(500).send({
                error: errors.authentication.registration.userExists
            });
        }

        if (error.code === "202") {
            res.status(500).send(error.message);
        }

        res.status(500).send(errors.authentication.registration.createFailed);
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        });

        const isPassOk = await bcrypt.compare(password, user.password);

        if (!isPassOk) {
            throw errors.authentication.login.passwordIncorrect;
        }

        const jwtToken = jwt.sign(
            {
                email: email
            },
            env.JWT_SECRET_KEY,
            {
                expiresIn: "2h"
            }
        );

        const updatedUser = await prisma.users.update({
            data: {
                jwtToken: jwtToken
            },
            where: {
                email: email
            }
        });

        res.status(200).send({ payload: updatedUser.jwtToken, id: updatedUser.id });

    } catch (error) {
        if (error.code === 'P2015') {
            res.status(500).send({ error: errors.authentication.login.userDoesNotExist })
        }
        res.status(500).send({ error: error });
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await prisma.users.delete({
            where: {
                id: parseInt(id)
            }
        });

        res.status(200).send({ payload: deleteUser });
    } catch (error) {
        res.status(500).send({ error: translations.authentication.delete.deleteFailed });
    }
}

