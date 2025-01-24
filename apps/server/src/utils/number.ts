import { z } from "zod";

export function separateNumber(number: number, range: number): number[] {
    const result: number[] = [];
    const excess = number % range;
    const fullFits = Math.floor(number / range);
    for (let i = 0; i < fullFits; i++) {
        result.push(range);
    }
    if (excess > 0) {
        result.push(excess);
    }

    return result;
}

export const validateNumber = (fieldName: string, isPositive: boolean = false, isInteger: boolean = false) => {
    return z
        .string()
        .refine((s) => {
            const n = Number(s);
            if (isPositive && n <= 0) return false;
            if (isInteger && !Number.isInteger(n)) return false;

            return Number.isFinite(n) && !Number.isNaN(n);
        }, value => ({ message: `Field ${fieldName} Expected number or numeric string, received '${value}'` }))
        .transform(Number);
};

// (() => {
//   // Test validateNumber
//   const number  = z
//     .string()
//     .refine((s) => {
//       const n = Number(s);
//       return Number.isFinite(n) && !Number.isNaN(n);
//     }, value => ({ message: `${value} is not a valid number` }))
//     .transform(Number);
//   const positiveNumber = validateNumber("positiveNumber", true);
//   const negativeNumber = validateNumber("negativeNumber", false);
//   const integerNumber = validateNumber("integerNumber", false, true);
//   const positiveIntegerNumber = validateNumber("positiveIntegerNumber", true, true);
//
//   console.log(positiveNumber.parse("1")); // 1
//   console.log(positiveNumber.parse("2")); // Throws error
//   console.log(positiveNumber.parse("r")); // Throws error
// })()