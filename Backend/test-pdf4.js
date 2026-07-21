const fs = require('fs');
const pdfParse = require("pdf-parse");

async function test() {
    // create a dummy pdf buffer for testing? No, I'll just check the prototype.
    console.log(Object.getOwnPropertyNames(pdfParse.PDFParse.prototype));
}
test();
