import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IPizzaCreateDTO } from "../interfaces/pizza.interface";
import { IUserQuery } from "../interfaces/user.interface";
import { pizzaService } from "../services/pizza.service";

class PizzaController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { validateQuery } = req as any as {
                validateQuery: IUserQuery;
            };
            const data = await pizzaService.getAll(validateQuery);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const pizza = req.body as IPizzaCreateDTO;
            const data = await pizzaService.create(pizza);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }
}
export const pizzaController = new PizzaController();
