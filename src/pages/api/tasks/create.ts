import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function create(req: NextApiRequest, res: NextApiResponse) {
    const { data } = req.body;

    await prisma.task.create({
        data: {
            ...data,
            done: false,
        }
    });

    return res.status(201).json({});
}

