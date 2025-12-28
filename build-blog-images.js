/**
 * Blog Image Thumbnail Generator
 *
 * Automatically generates thumbnail versions of blog images for use in
 * post navigation, article cards, and other components.
 *
 * Generated files:
 * - Original: image.jpg → public/images/blog/image.jpg
 * - Thumbnail: image.jpg → public/images/blog/image-thumb.jpg
 *
 * Thumbnail specs: 300px width, maintains aspect ratio, 85% quality
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = './src/assets/images/blog';
const OUTPUT_DIR = './public/images/blog';
const THUMBNAIL_WIDTH = 300;
const THUMBNAIL_QUALITY = 85;

// Supported image formats
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * Ensure output directory exists
 */
function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

/**
 * Check if file is an image
 */
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

/**
 * Generate thumbnail for a single image
 */
async function generateThumbnail(sourceFile) {
  const ext = path.extname(sourceFile);
  const basename = path.basename(sourceFile, ext);
  const sourcePath = path.join(SOURCE_DIR, sourceFile);
  const outputPath = path.join(OUTPUT_DIR, `${basename}-thumb${ext}`);

  try {
    // Generate thumbnail
    await sharp(sourcePath)
      .resize(THUMBNAIL_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: THUMBNAIL_QUALITY })
      .png({ quality: THUMBNAIL_QUALITY })
      .webp({ quality: THUMBNAIL_QUALITY })
      .toFile(outputPath);

    console.log(`✓ Generated: ${basename}-thumb${ext}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to generate thumbnail for ${sourceFile}:`, error.message);
    return false;
  }
}

/**
 * Copy original image to public directory
 */
async function copyOriginal(sourceFile) {
  const sourcePath = path.join(SOURCE_DIR, sourceFile);
  const outputPath = path.join(OUTPUT_DIR, sourceFile);

  try {
    // Copy file
    fs.copyFileSync(sourcePath, outputPath);
    console.log(`✓ Copied: ${sourceFile}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to copy ${sourceFile}:`, error.message);
    return false;
  }
}

/**
 * Process all blog images
 */
async function processAllImages() {
  console.log('\n🖼️  Processing blog images...\n');

  ensureOutputDir();

  // Get all image files from source directory
  let files;
  try {
    files = fs.readdirSync(SOURCE_DIR);
  } catch (error) {
    console.error(`Error reading source directory: ${error.message}`);
    process.exit(1);
  }

  const imageFiles = files.filter(isImageFile);

  if (imageFiles.length === 0) {
    console.log('No images found in source directory.');
    return;
  }

  console.log(`Found ${imageFiles.length} image(s) to process\n`);

  let successCount = 0;
  let errorCount = 0;

  // Process each image
  for (const file of imageFiles) {
    console.log(`Processing: ${file}`);

    // Copy original
    const copySuccess = await copyOriginal(file);

    // Generate thumbnail
    const thumbSuccess = await generateThumbnail(file);

    if (copySuccess && thumbSuccess) {
      successCount++;
    } else {
      errorCount++;
    }

    console.log('');
  }

  // Summary
  console.log('─'.repeat(50));
  console.log(`✅ Successfully processed: ${successCount} image(s)`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount}`);
  }
  console.log('─'.repeat(50) + '\n');
}

// Run the script
processAllImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
