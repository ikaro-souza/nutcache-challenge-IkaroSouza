export const getNumericEnumValues = <T extends Object>(type: T) => {
  const keys = Object.values(type).filter(
    (x) => typeof x === 'string',
  ) as Array<keyof T>
  return keys.map((k) => type[k])
}
