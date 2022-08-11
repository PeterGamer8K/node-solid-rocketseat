import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
	private createUserUseCase: CreateUserUseCase;

	constructor(createUserUseCase: CreateUserUseCase) {
		this.createUserUseCase = createUserUseCase;
	}

	async handle(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;

		try {
			await this.createUserUseCase.execute({ name, email, password });

			return response
				.status(200)
				.json({ error: false, msg: "User created successfully" });
		} catch (e) {
			interface IError {
				message: string;
			}

			const error = e as IError;

			const errorMessage =
				typeof error.message == "string" ? error.message : "Unexpected error";

			return response.status(400).json({ error: false, msg: errorMessage });
		}
	}
}
