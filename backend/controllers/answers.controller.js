require("dotenv").config;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const env = process.env;
const errors = require("../messages/errors");

exports.addAnswer = async (req, res) => {
    try {
        const { answerString, userId, questionId } = req.body;
        const data = {
            answer: answerString,
            user: {
                connect: {
                    id: parseInt(userId)
                }
            },
            question: {
                connect: {
                    id: parseInt(questionId)
                }
            }
        };

        const answer = await prisma.answers.create({ data: data });

        res.status(200).send({
            payload: answer
        }); return;
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

exports.viewAnswers = async (req, res) => {
    try {
        const id = req.params.id;
        const answers = await prisma.answers.findMany({
            where: {
                questionId: parseInt(id)
            },
            include: {
                user: true
            }
        });

        res.status(200).send({ payload: answers });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

exports.deleteAnswer = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteAnswer = await prisma.answers.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.status(200).send({ payload: deleteAnswer });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

exports.editAnswer = async (req, res) => {
    try {
        const id = req.params.id;
        const { answer } = req.body;

        const updatedAnswer = await prisma.answers.update({
            data: {
                answer: answer
            },
            where: {
                id: parseInt(id)
            }
        });
        res.status(200).send({ payload: updatedAnswer });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
