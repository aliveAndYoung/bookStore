import express from "express";
import { deleteUserById, getUsers } from "../DB/Users";
export const getAllUsers = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const users = await getUsers();
        return res.json(users).status(200);
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
export const deleteUser = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserById(id);
        return res.status(200).json(deletedUser);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
