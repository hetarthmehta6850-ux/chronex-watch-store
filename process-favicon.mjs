import { Jimp } from 'jimp';

async function processFavicon() {
  try {
    console.log("Reading image...");
    const image = await Jimp.read('public/favicon.png');
    
    console.log("Cleaning up anti-aliased edge pixels...");
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // Catch any light grey anti-aliasing left behind from the white background
      if (red > 230 && green > 230 && blue > 230) {
        this.bitmap.data[idx + 3] = 0;
      }
    });

    console.log("Manually calculating exact bounding box of the logo...");
    let minX = image.bitmap.width;
    let minY = image.bitmap.height;
    let maxX = 0;
    let maxY = 0;

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const alpha = this.bitmap.data[idx + 3];
      if (alpha > 20) { // If pixel is visible
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    });

    // Crop the image tightly to the visible logo
    const cropWidth = maxX - minX + 1;
    const cropHeight = maxY - minY + 1;
    console.log(`Cropping away dead space: x=${minX}, y=${minY}, w=${cropWidth}, h=${cropHeight}`);
    
    // Ensure we actually found a valid bounding box before cropping
    if (cropWidth > 0 && cropHeight > 0) {
        image.crop({ x: minX, y: minY, w: cropWidth, h: cropHeight });
        
        // Scale it up perfectly for tab bars
        image.resize({ w: 192, h: 192 });
        
        image.write('public/favicon.png');
        console.log("Favicon aggressively cropped, scaled, and processed successfully!");
    } else {
        console.log("Error: Image was empty!");
    }
  } catch (err) {
    console.error("Error processing favicon:", err);
  }
}

processFavicon();
