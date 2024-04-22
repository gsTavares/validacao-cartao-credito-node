import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

type UserRequest = {
    nome: string,
    email: string,
    login: string,
    senha: string
}

class CreateUserService {
    async execute(payload: UserRequest) {
        if (!payload.email) {
            throw new Error('E-mail é obrigatório!');
        }

        if(!payload.login) {
            throw new Error('Login é obrigatório!');
        }

        const userAlreadyExistsByEmail = await prismaClient.usuario.findFirst({
            where: {
                email: payload.email
            }
        });

        if (userAlreadyExistsByEmail) {
            throw new Error('Já existe um usuário cadastrado com esse e-mail!');
        }

        const userAlreadyExistsByLogin = await prismaClient.usuario.findFirst({
            where: {
                login: payload.login
            }
        });

        if (userAlreadyExistsByLogin) {
            throw new Error('Já existe um usuário cadastrado com esse login!');
        }

        const userCreated = await prismaClient.usuario.create({
            data: {
                ...payload,
                senha: await hash(payload.senha, 12)
            },
            select: {
                id: true,
                nome: true,
                email: true
            }
        });

        return userCreated;
    }
}

export { CreateUserService }