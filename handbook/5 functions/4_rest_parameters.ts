{
  function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
  }

  // employeeName will be "Joseph Samuel Lucas MacKinzie"
  let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
}

{
  let buildName = function(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
  }

  let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
}
