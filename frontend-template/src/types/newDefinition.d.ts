interface dynamicObject {
  [key: string]:
    | string
    | Number
    | Array<any>
    | Array<string>
    | Array<dynamicObject>
    | dynamicObject
    | {};
}
type dynamicArray = Array<dynamicObject>;
export { dynamicObject, dynamicArray };
