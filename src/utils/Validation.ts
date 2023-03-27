import { validate } from 'class-validator';

export class ValidationService {
  async validate(property: any) {
    const validationError = await validate(property, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (validationError.length) {
      const err = validationError.map((error) => {
        const validationError = {
          property: error.property,
          constraints: error.constraints,
        };
        return validationError;
      });
      throw err;
    }
  }
}
