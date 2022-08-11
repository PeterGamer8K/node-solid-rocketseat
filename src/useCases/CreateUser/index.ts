import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailTrapMailProvider = new MailTrapMailProvider();
const postgresTrapMailRepository = new PostgresUsersRepository();

const createUserUseCase = new CreateUserUseCase(
	postgresTrapMailRepository,
	mailTrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
