const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean|string} - true if valid, error message if invalid
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return true;
}

/**
 * Validate URL format
 * @param {string} url
 * @returns {boolean|string} - true if valid, error message if invalid
 */
function validateURL(url) {
  if (!url) return 'URL is required';
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch {
    return 'Invalid URL format';
  }
}

/**
 * Format phone number to (XXX) XXX-XXXX
 * @param {string} phone
 * @returns {string}
 */
function formatPhone(phone) {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX if 10 digits
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return phone; // Return as-is if not 10 digits
}

/**
 * Generate URL-safe slug from name
 * @param {string} name
 * @returns {string}
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single
    .trim();
}

/**
 * Calculate years in business from established year
 * @param {string|number} established
 * @returns {string}
 */
function calculateYears(established) {
  const currentYear = new Date().getFullYear();
  const years = currentYear - parseInt(established);
  return years.toString();
}

/**
 * Update JSON file with new data
 * @param {string} filePath
 * @param {object} updates
 */
function updateJsonFile(filePath, updates) {
  try {
    const fullPath = path.resolve(filePath);

    // Read existing file
    let data = {};
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      data = JSON.parse(content);
    }

    // Merge updates
    const updated = { ...data, ...updates };

    // Write back
    fs.writeFileSync(fullPath, JSON.stringify(updated, null, 2) + '\n');

    return true;
  } catch (error) {
    console.error(`Error updating JSON file ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Update SCSS variable in file
 * @param {string} filePath
 * @param {string} variable
 * @param {string} value
 */
function updateScssVariable(filePath, variable, value) {
  try {
    const fullPath = path.resolve(filePath);

    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`);
      return false;
    }

    let content = fs.readFileSync(fullPath, 'utf8');

    // Match variable assignment (e.g., $active-scheme: artisan;)
    const regex = new RegExp(`(\\$${variable}:\\s*)([^;]+)(;)`, 'g');

    if (!regex.test(content)) {
      console.error(`Variable $${variable} not found in ${filePath}`);
      return false;
    }

    // Replace the value
    content = content.replace(regex, `$1${value}$3`);

    fs.writeFileSync(fullPath, content);

    return true;
  } catch (error) {
    console.error(`Error updating SCSS variable in ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Update YAML file with new data
 * @param {string} filePath
 * @param {object} updates
 */
function updateYamlFile(filePath, updates) {
  try {
    const fullPath = path.resolve(filePath);

    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`);
      return false;
    }

    // Read and parse YAML
    const content = fs.readFileSync(fullPath, 'utf8');
    const data = yaml.load(content);

    // Apply updates (deep merge for nested objects)
    function deepMerge(target, source) {
      for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          target[key] = target[key] || {};
          deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
      return target;
    }

    const updated = deepMerge(data, updates);

    // Write back
    const yamlContent = yaml.dump(updated, {
      lineWidth: -1,  // Don't wrap lines
      noRefs: true    // Don't use anchors/references
    });

    fs.writeFileSync(fullPath, yamlContent);

    return true;
  } catch (error) {
    console.error(`Error updating YAML file ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Update specific field in package.json
 * @param {string} field
 * @param {any} value
 */
function updatePackageJson(field, value) {
  const filePath = path.resolve('package.json');

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const pkg = JSON.parse(content);

    // Support nested fields like 'repository.url'
    const fields = field.split('.');
    let current = pkg;

    for (let i = 0; i < fields.length - 1; i++) {
      if (!current[fields[i]]) {
        current[fields[i]] = {};
      }
      current = current[fields[i]];
    }

    current[fields[fields.length - 1]] = value;

    fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n');

    return true;
  } catch (error) {
    console.error(`Error updating package.json:`, error.message);
    return false;
  }
}

/**
 * Validate required field is not empty
 * @param {string} value
 * @returns {boolean|string}
 */
function validateRequired(value) {
  if (!value || value.trim() === '') {
    return 'This field is required';
  }
  return true;
}

/**
 * Validate year format (4 digits, reasonable range)
 * @param {string} year
 * @returns {boolean|string}
 */
function validateYear(year) {
  const currentYear = new Date().getFullYear();
  const yearNum = parseInt(year);

  if (isNaN(yearNum)) {
    return 'Year must be a number';
  }

  if (year.length !== 4) {
    return 'Year must be 4 digits';
  }

  if (yearNum < 1900 || yearNum > currentYear) {
    return `Year must be between 1900 and ${currentYear}`;
  }

  return true;
}

module.exports = {
  validateEmail,
  validateURL,
  formatPhone,
  generateSlug,
  calculateYears,
  updateJsonFile,
  updateScssVariable,
  updateYamlFile,
  updatePackageJson,
  validateRequired,
  validateYear
};
