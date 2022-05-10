require("dotenv").config;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const env = process.env;
const errors = require("../messages/errors");


exports.viewQuestions = async (req, res) => {
    try {
        const questions = await prisma.question.findMany();
        res.status(200).send({ payload: questions });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.addQuestion = async (req, res) => {
    try {
        const { questionTitle, questionText, userId, token } = req.body;

        const dataToInput = {
            title: questionTitle,
            question: questionText,
            user: {
                connect: {
                    id: parseInt(userId)
                }
            }
        };


        const question = await prisma.question.create({ data: dataToInput });

        res.status(200).send({
            payload: question
        }); return;

    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}

exports.viewLastQuestions = async (req, res) => {
    try {
        const questions = await prisma.question.findMany({
            skip: req.body.skip,
            take: 20
        });

        res.status(200).send({ payload: questions });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.myQuestions = async (req, res) => {
    try {

        const questions = await prisma.question.findMany({
            where: {
                usersId: parseInt(req.params.userId)
            }
        });

        res.status(200).send({ payload: questions });

    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.viewQuestion = async (req, res) => {
    try {
        const question = await prisma.question.findMany({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.status(200).send({ payload: question });

    } catch (error) {
        res.status(500).send(error);
    }
}


exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedQuestion = await prisma.question.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.status(200).send({ payload: deletedQuestion });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.likeQuestion = async (req, res) => {
    try {
        const { id } = req.body;

        const question = await prisma.question.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        let countOfLikes = question.countOfLikes;
        countOfLikes += 1;

        const likedQuestion = await prisma.question.update({
            data: {
                countOfLikes: countOfLikes
            },
            where: {
                id: id
            }
        });

        res.status(200).send({ payload: likedQuestion });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.dislikeQuestion = async (req, res) => {
    try {
        const { id } = req.body;

        const question = await prisma.question.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        let countOfDislikes = question.countOfDislikes;
        countOfDislikes -= 1;

        const likedQuestion = await prisma.question.update({
            data: {
                countOfDislikes: countOfDislikes
            },
            where: {
                id: id
            }
        });

        res.status(200).send({ payload: likedQuestion });

    } catch (error) {
        res.status(500).send(error);
    }
}
