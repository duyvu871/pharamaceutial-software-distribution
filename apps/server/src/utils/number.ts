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

export const validateNumber = (isPositive: boolean) => {
    return z
      .string()
      .refine(
        v => {
            let n = Number(v);
            return !isNaN(n)
              && v?.length > 0
              && (isPositive ? n > 0 : true);
        },
        {message: "Invalid number"}
      ).innerType();
}