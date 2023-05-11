core types in TS 
 -number
 -string
 -boolean
 -object
 -array
 - any (includes all)
typescript help provide clarity of assigning data types while compiling and help avoid error and bugs

typescript builds on js, any js file can be run in ts


npm i -g typescript

to setup configuration file
 use this command -->  tsc --init


 if want to give 2 datatupes to a parameter or a variable, we use join
 like if want to give num as number and string also then we use pipe
 like this num1: number | string


 type alias helps to define usion in a single name and helps to avoid repitions and provide optimisation

 type numORstring = number | string

 interface help to define structure of an object


 generics
 arrays can also be considered as generic types because they can be declared with a specific element type.
  TypeScript provides a way to declare an array with a specific element type using the syntax Array<elementType> or elementType[].
 let myArray: string[] = ["hello", "world"];
let myArray: Array<string> = ["hello", "world"];
