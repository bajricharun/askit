require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const env = process.env;
const errors = require("../messages/errors");
const bcrypt = require("bcrypt");

exports.myProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(id),
            }
        });

        return res.status(200).send({ payload: user });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

exports.editProfile = async (req, res) => {
    try {

        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(req.body.id)
            }
        });

        let email = user.email;
        let name = user.name;

        if (req.body.email !== "") {
            email = req.body.email;
        }

        if (req.body.name !== "") {
            name = req.body.name;
        }

        const updatedUser = await prisma.users.update({
            data: {
                email: email,
                name: name
            },
            where: {
                email: email
            }
        });

        res.status(200).send({ payload: updatedUser });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { id, passwordOld, passwordNew } = req.body;

        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        const isOldPassOk = await bcrypt.compare(passwordOld, user.password);

        if (!isOldPassOk) {
            throw errors.authentication.login.passwordIncorrect;
        }

        const hashedPass = await bcrypt.hash(passwordNew, parseInt(env.SALT_ROUNDS));

        const updatedUser = await prisma.users.update({
            data: {
                password: hashedPass
            },
            where: {
                id: parseInt(id)
            }
        });

        res.status(200).send({ payload: updatedUser });
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}