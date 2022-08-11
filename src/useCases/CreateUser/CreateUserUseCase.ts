import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
	private usersRepository: IUsersRepository;
	private mailProvider: IMailProvider;

	constructor(usersRepository: IUsersRepository, mailProvider: IMailProvider) {
		this.usersRepository = usersRepository;
		this.mailProvider = mailProvider;
	}

	async execute(data: ICreateUserRequestDTO) {
		const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

		if (userAlreadyExists) {
			throw new Error(`User ${data.email} already exists`);
		}

		const user = new User(data);

		await this.usersRepository.save(user);

		this.mailProvider.sendMail({
			to: {
				name: data.name,
				email: data.email,
			},
			from: {
				name: "My app group",
				email: "myApp@email.com",
			},
			subject: "Welcome to the platform",
			body: "<p>Now you can log in to the platform</p>",
		});
	}
}
