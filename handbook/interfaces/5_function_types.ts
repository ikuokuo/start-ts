{
  // call signature
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }

  let mySearch: SearchFunc;
  mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
  }

  // the names of the parameters do not need to match
  let mySearch2: SearchFunc;
  mySearch2 = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
  }

  // infer the argument types
  let mySearch3: SearchFunc;
  mySearch3 = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
  }
}
