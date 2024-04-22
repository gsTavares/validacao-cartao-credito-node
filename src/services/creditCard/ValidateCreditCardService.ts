import prismaClient from "../../prisma";

type CreditCardValidationRequest = {
    creditCardNumber: string,
    userId: string,
}


class ValidateCreditCardService {

    async execute(payload: CreditCardValidationRequest) {

        payload.creditCardNumber = payload.creditCardNumber.replace(' ', '').replace('-', '').replace('.', '');

        const existsById = await prismaClient.cartaoCredito.findFirst({
            where: {
                numero: payload.creditCardNumber
            }
        });

        if (!existsById) {
            return { isValid: false };
        }

        return { isValid: existsById.usuarioId === payload.userId };
    }

}

export { ValidateCreditCardService };