// UMD modules

export function isPrime(x: number): boolean;
export as namespace mathLib;

/*
import { isPrime } from "math-lib";
isPrime(2);
mathLib.isPrime(2); // ERROR: can't use the global definition from inside a module
*/
