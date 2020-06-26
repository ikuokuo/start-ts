let numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
export = ZipCodeValidator;

// TypeScript supports export = to model the traditional CommonJS and AMD workflow.

// Default exports are meant to act as a replacement for this behavior; however, the two are incompatible.
