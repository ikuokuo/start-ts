// Subtype vs Assignment

// So far, we’ve used “compatible”, which is not a term defined in the language spec. In TypeScript, there are two kinds of compatibility: subtype and assignment. These differ only in that assignment extends subtype compatibility with rules to allow assignment to and from any, and to and from enum with corresponding numeric values.

// Different places in the language use one of the two compatibility mechanisms, depending on the situation. For practical purposes, type compatibility is dictated by assignment compatibility, even in the cases of the implements and extends clauses.

// For more information, see the TypeScript spec.
