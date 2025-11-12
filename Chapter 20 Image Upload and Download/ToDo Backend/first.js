console.log("Hello World!");
const fs = require('fs');
///Define two variables
let a = 10;
let b = 20;

///Basic arithmetic operations
let sum = a+b;
let product = a * b;
let difference = a-b;
let quotient = a/b;
console.log("Sum: " + sum);
console.log("Product:" + product);
console.log("Difference: " + difference);
console.log("Quotient:" + quotient);

/// Write results to a file
fs.writeFile('results.txt', 'Sum: ' + sum + '\nProduct: ' + product + '\nDifference: ' + difference + 
  '\nQuotient: ' + quotient, (err) => {
    if(err){
      console.error("Error writing to file:", err);

    }else{
      console.log("Results written to results.txt");
    }
  }
)