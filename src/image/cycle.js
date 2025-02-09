const fs = require("fs");
const path = require("path");

// Function to check if a file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Function to cycle through images
module.exports = async function cycleImages(imageFolder = path.join(__dirname, "images"), baseName = "screenshot_", fileExtension = ".png", startIndex = 0, endIndex = 391, delayMs = 2000) {
  /**
   * @param {string} imageFolder - The folder containing the images.
   * @param {string} baseName - The base name of the images.
   * @param {string} fileExtension - The file extension of the images.
   * @param {number} startIndex - The starting index of the images.
   * @param {number} endIndex - The ending index of the images.
   * @param {number} delayMs - The delay between each image in milliseconds.
   * 
   * @description Cycles through the images in the specified folder and displays them with a delay between each image.
   * @example Example Usage
   * // Import the function
   * const { cycleImages } = require('api-plugin-path/src/image/cycle');
   * 
   * // Configurable settings
   * const imageFolder = path.join(__dirname, "images"); // Folder where images are stored
   * const baseName = "screenshot_"; // Base name for images
   * const fileExtension = ".png"; // Image format
   * const startIndex = 0; // Starting image number
   * const endIndex = 391; // Last image number
   * const delayMs = 2000; // Delay in milliseconds (2000ms = 2 seconds)
   * 
   * // Call the function
   * cycleImages(imageFolder, baseName, fileExtension, startIndex, endIndex, delayMs);
   * @example
   */
  let imagePaths = [];

  for (let i = startIndex; i <= endIndex; i++) {
      const imageName = `${baseName}${i}${fileExtension}`;
      const imagePath = path.join(imageFolder, imageName);

      if (fs.existsSync(imagePath)) {
          console.log(`Displaying: ${imageName}`);
          imagePaths.push(imagePath); // Add valid images to array
          await new Promise((resolve) => setTimeout(resolve, delayMs)); // Delay before next image
      } else {
          console.log(`Skipping: ${imageName} (Not found)`);
      }
  }

  return imagePaths;
}