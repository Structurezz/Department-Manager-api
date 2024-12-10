
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPasswordConfirmed(property: string, validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'isPasswordConfirmed',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const relatedValue = (args.object as any)[args.constraints[0]];
                    return value === relatedValue; // Check if passwords match
                },
            },
        });
    };
}
