const pdfParse = require("pdf-parse");
console.log("PDFParse type:", typeof pdfParse.PDFParse);
if (typeof pdfParse.PDFParse === 'function') {
    console.log("It is a function!");
}
// check if there's a default export
console.log("default type:", typeof pdfParse.default);
