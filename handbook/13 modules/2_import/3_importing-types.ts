// Prior to TypeScript 3.8, you can import a type using import. With TypeScript 3.8, you can import a type using the import statement, or using import type.

// Re-using the same import
// import {APIResponseType} from "./api";

// Explicitly use import type
// import type {APIResponseType} from "./api";

// import type is always guaranteed to be removed from your JavaScript, and tools like Babel can make better assumptions about your code via the isolatedModules compiler flag.
