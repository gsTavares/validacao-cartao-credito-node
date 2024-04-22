import prismaClient from "../../prisma";

type CreditCardRequest = {
    numero: string,
    proprietario: string,
    validade: string,
    cvv: number,
    usuarioId?: string
}

class CreateCreditCardService {

    async execute(payload: CreditCardRequest) {
        if(!payload.numero) {
            throw new Error('Número do cartão é obrigatório!');
        }
        if(!payload.proprietario) {
            throw new Error('Proprietário do cartão é obrigatório!');
        }
        if(!payload.validade) {
            throw new Error('Validade do cartão é obrigatório!');
        }
        if(!payload.cvv) {
            throw new Error('CVV do cartão é obrigatório!');
        }

        payload.numero = payload.numero.replace(' ', '').replace('.', '').replace('-', '');

        const existsByNumber = await prismaClient.cartaoCredito.findFirst({
            where: {
                numero: payload.numero
            }
        });

        if(existsByNumber) {
            throw new Error('Já existe um cartão cadastrado com esse número!');
        }

        const createdCreditCard = await prismaClient.cartaoCredito.create({
            data: {...payload},
        });

        return createdCreditCard;
        
    }

}

export { CreateCreditCardService }