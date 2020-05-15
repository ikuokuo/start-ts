// Enums are compatible with numbers, and numbers are compatible with enums. Enum values from different enum types are considered incompatible. For example,
{
  enum Status { Ready, Waiting };
  enum Color { Red, Blue, Green };

  let status = Status.Ready;
  // status = Color.Green;  // Error
}
