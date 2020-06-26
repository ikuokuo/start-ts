import { StringValidator } from "./StringValidator";

const numberRegexp = /^[0-9]+$/;

class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

// Export statements

export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };
