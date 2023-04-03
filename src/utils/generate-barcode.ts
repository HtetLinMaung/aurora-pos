import bwipjs from "bwip-js";

export default function generateBarcode(
  productId: string,
  callback: (err: Error | null, buffer: Buffer | undefined) => void
): void {
  const code = `#${productId}`;
  const options = {
    bcid: "code128", // Barcode type
    text: code, // Text to encode
    scale: 3, // Scaling factor
    height: 10, // Barcode height, in millimeters
    includetext: true, // Include human-readable text
  };
  bwipjs.toBuffer(options, callback);
}

// Get the product from the database
// Product.findById(productId, (err, product) => {
//     if (err) throw err;
//     // Generate the barcode
//     generateBarcode(product._id, (err, png) => {
//       if (err) throw err;
//       // Save the barcode to a file or use it in your application
//       fs.writeFile(`${product._id}.png`, png, (err) => {
//         if (err) throw err;
//         console.log('Barcode saved to file!');
//       });
//     });
//   });
