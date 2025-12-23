#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const {
  validateEmail,
  validateURL,
  formatPhone,
  generateSlug,
  calculateYears,
  updateJsonFile,
  updateScssVariable,
  updatePackageJson,
  validateRequired,
  validateYear
} = require('./setup-utils');

const THEMES = {
  artisan: 'Artisan (default) - Warm golden with blue-gray accents',
  modern: 'Modern - Tech-inspired blue palette',
  elegant: 'Elegant - Sophisticated brown tones',
  rustic: 'Rustic - Earthy green colors',
  vibrant: 'Vibrant - Energetic red and blue',
  minimalist: 'Minimalist - Clean neutral palette',
  luxury: 'Luxury - Dark premium aesthetic'
};

console.log(chalk.bold.cyan('\n╔═══════════════════════════════════════════════╗'));
console.log(chalk.bold.cyan('║                                               ║'));
console.log(chalk.bold.cyan('║         SSG-Starter Site Setup Wizard         ║'));
console.log(chalk.bold.cyan('║                                               ║'));
console.log(chalk.bold.cyan('╚═══════════════════════════════════════════════╝\n'));

console.log(chalk.gray('This wizard will configure your site by updating:'));
console.log(chalk.gray('  • Business information'));
console.log(chalk.gray('  • Author profiles'));
console.log(chalk.gray('  • Theme selection'));
console.log(chalk.gray('  • Repository settings\n'));

async function main() {
  try {
    // Business Information
    console.log(chalk.bold.yellow('\n📋 BUSINESS INFORMATION\n'));

    const businessInfo = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Business name:',
        validate: validateRequired
      },
      {
        type: 'input',
        name: 'email',
        message: 'Business email:',
        validate: validateEmail
      },
      {
        type: 'input',
        name: 'phone',
        message: 'Phone number:',
        validate: validateRequired,
        filter: (input) => input.replace(/\D/g, '')  // Remove non-digits
      },
      {
        type: 'confirm',
        name: 'hasEmergencyPhone',
        message: 'Do you have an emergency phone number?',
        default: false
      }
    ]);

    let emergencyPhone = null;
    if (businessInfo.hasEmergencyPhone) {
      const emergency = await inquirer.prompt([
        {
          type: 'input',
          name: 'phone',
          message: 'Emergency phone number:',
          validate: validateRequired,
          filter: (input) => input.replace(/\D/g, '')
        }
      ]);
      emergencyPhone = emergency.phone;
    }

    // Address
    console.log(chalk.bold.yellow('\n📍 BUSINESS ADDRESS\n'));

    const address = await inquirer.prompt([
      {
        type: 'input',
        name: 'lineOne',
        message: 'Street address:',
        validate: validateRequired
      },
      {
        type: 'input',
        name: 'lineTwo',
        message: 'Suite/Apt (optional):',
        default: ''
      },
      {
        type: 'input',
        name: 'city',
        message: 'City:',
        validate: validateRequired
      },
      {
        type: 'input',
        name: 'county',
        message: 'State/County (2 letters):',
        validate: (input) => {
          if (!input || input.length !== 2) return 'Please enter 2-letter state code';
          return true;
        },
        filter: (input) => input.toUpperCase()
      },
      {
        type: 'input',
        name: 'postcode',
        message: 'ZIP/Postal code:',
        validate: validateRequired
      }
    ]);

    // Generate Google Maps link
    const mapQuery = `${address.lineOne} ${address.city} ${address.county}`;
    address.mapLink = `https://maps.google.com/?q=${encodeURIComponent(mapQuery)}`;

    // Business Details
    console.log(chalk.bold.yellow('\n🏢 BUSINESS DETAILS\n'));

    const details = await inquirer.prompt([
      {
        type: 'input',
        name: 'domain',
        message: 'Website domain (e.g., www.example.com):',
        validate: validateRequired
      },
      {
        type: 'input',
        name: 'established',
        message: 'Year established:',
        validate: validateYear
      },
      {
        type: 'input',
        name: 'teamSize',
        message: 'Team size (number of employees):',
        default: '1',
        validate: (input) => {
          if (isNaN(input) || parseInt(input) < 1) return 'Please enter a valid number';
          return true;
        }
      }
    ]);

    // Services
    console.log(chalk.bold.yellow('\n🔧 SERVICES\n'));
    console.log(chalk.gray('Enter your services one at a time. Press Enter with empty input when done.\n'));

    const services = [];
    let serviceIndex = 1;
    let addingServices = true;

    while (addingServices) {
      const serviceAnswer = await inquirer.prompt([
        {
          type: 'input',
          name: 'service',
          message: `Service ${serviceIndex}:`,
          validate: (input) => {
            // Allow empty input to stop, but require at least 3 services
            if (!input && services.length < 3) {
              return 'Please enter at least 3 services';
            }
            return true;
          }
        }
      ]);

      if (serviceAnswer.service) {
        services.push(serviceAnswer.service);
        serviceIndex++;
      } else {
        addingServices = false;
      }
    }

    // Business Hours
    console.log(chalk.bold.yellow('\n🕐 BUSINESS HOURS\n'));

    const useTemplate = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'useDefault',
        message: 'Use standard business hours template (Mon-Fri 9-5, Sat 10-3, Sun Closed)?',
        default: true
      }
    ]);

    let hours;
    if (useTemplate.useDefault) {
      hours = {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "10:00 AM - 3:00 PM",
        sunday: "Closed"
      };
    } else {
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      hours = {};

      console.log(chalk.gray('Enter hours for each day (e.g., "9:00 AM - 5:00 PM" or "Closed"):\n'));

      for (const day of days) {
        const answer = await inquirer.prompt([
          {
            type: 'input',
            name: 'hours',
            message: `${day.charAt(0).toUpperCase() + day.slice(1)}:`,
            default: day === 'sunday' ? 'Closed' : '9:00 AM - 5:00 PM'
          }
        ]);
        hours[day] = answer.hours;
      }
    }

    // Authors
    console.log(chalk.bold.yellow('\n✍️  AUTHOR PROFILES\n'));

    const authors = {};
    let addingAuthors = true;
    let authorCount = 1;

    while (addingAuthors) {
      console.log(chalk.cyan(`\nAuthor ${authorCount}:\n`));

      const author = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Full name:',
          validate: validateRequired
        },
        {
          type: 'input',
          name: 'title',
          message: 'Professional title:',
          validate: validateRequired
        },
        {
          type: 'input',
          name: 'bio',
          message: 'Bio (brief description):',
          validate: validateRequired
        }
      ]);

      const slug = generateSlug(author.name);

      authors[slug] = {
        name: author.name,
        slug: slug,
        image: `/assets/images/authors/${slug}.jpg`,
        bio: author.bio,
        title: author.title
      };

      authorCount++;

      const continueAdding = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'addAnother',
          message: 'Add another author?',
          default: false
        }
      ]);

      addingAuthors = continueAdding.addAnother;
    }

    // Theme Selection
    console.log(chalk.bold.yellow('\n🎨 THEME SELECTION\n'));

    const themeChoices = Object.keys(THEMES).map(key => ({
      name: THEMES[key],
      value: key
    }));

    const themeAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'theme',
        message: 'Choose a color theme for your site:',
        choices: themeChoices,
        default: 'artisan'
      }
    ]);

    // Repository Settings
    console.log(chalk.bold.yellow('\n🔗 REPOSITORY SETTINGS\n'));

    const repo = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Git repository URL (e.g., https://github.com/username/repo.git):',
        validate: (input) => {
          if (!input) return 'Repository URL is required';
          if (!input.includes('github.com') && !input.includes('gitlab.com')) {
            return 'Please enter a valid GitHub or GitLab URL';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'branch',
        message: 'Default branch name:',
        choices: ['main', 'master'],
        default: 'main'
      }
    ]);

    // Netlify Deployment
    const deployAnswer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'netlify',
        message: 'Planning to deploy on Netlify?',
        default: true
      }
    ]);

    // === APPLY CONFIGURATION ===
    console.log(chalk.bold.cyan('\n\n╔═══════════════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║                                               ║'));
    console.log(chalk.bold.cyan('║          Applying Configuration...            ║'));
    console.log(chalk.bold.cyan('║                                               ║'));
    console.log(chalk.bold.cyan('╚═══════════════════════════════════════════════╝\n'));

    // Update client.json
    const clientData = {
      name: businessInfo.name,
      email: businessInfo.email,
      phone: businessInfo.phone,
      phoneFormatted: formatPhone(businessInfo.phone),
      emergencyPhone: emergencyPhone || businessInfo.phone,
      emergencyPhoneFormatted: emergencyPhone ? formatPhone(emergencyPhone) : formatPhone(businessInfo.phone),
      address: address,
      domain: details.domain,
      hours: hours,
      services: services,
      established: details.established,
      yearsInBusiness: calculateYears(details.established),
      teamSize: details.teamSize
    };

    updateJsonFile('src/_data/client.json', clientData);
    console.log(chalk.green('✓ Updated client.json'));

    // Update authors.json
    updateJsonFile('src/_data/authors.json', authors);
    console.log(chalk.green('✓ Updated authors.json'));

    // Update theme in SCSS
    updateScssVariable('src/assets/css/abstracts/_schemes.scss', 'active-scheme', themeAnswer.theme);
    console.log(chalk.green(`✓ Set theme to ${themeAnswer.theme}`));

    // Update package.json
    const repoPath = repo.url.replace('.git', '').replace('https://github.com/', '');
    updatePackageJson('name', generateSlug(businessInfo.name));
    updatePackageJson('description', `${businessInfo.name} - Built with SSG-Starter`);
    updatePackageJson('repository.url', repo.url);
    updatePackageJson('homepage', `https://github.com/${repoPath}#readme`);
    updatePackageJson('bugs.url', `https://github.com/${repoPath}/issues`);
    console.log(chalk.green('✓ Updated package.json'));

    // Update CMS config (author options and branch)
    const cmsConfigPath = 'src/admin/config.yml';
    let cmsConfig = fs.readFileSync(cmsConfigPath, 'utf8');

    // Update branch
    cmsConfig = cmsConfig.replace(/branch:\s*main/, `branch: ${repo.branch}`);

    // Update author options
    const authorOptions = Object.keys(authors).map(slug =>
      `    - { label: "${authors[slug].name}", value: "${slug}" }`
    ).join('\n');

    cmsConfig = cmsConfig.replace(
      /- \{ label: "Author One".*\n.*- \{ label: "Author Two".*\n/,
      authorOptions + '\n'
    );

    fs.writeFileSync(cmsConfigPath, cmsConfig);
    console.log(chalk.green('✓ Updated CMS configuration'));

    // Success message
    console.log(chalk.bold.green('\n\n✨ Configuration Complete! ✨\n'));

    console.log(chalk.bold.cyan('━'.repeat(60)));
    console.log(chalk.bold.yellow('\n📝 REMAINING MANUAL TASKS:\n'));
    console.log(chalk.gray('1. Add author photos to:'));
    console.log(chalk.white('   src/assets/images/authors/'));
    Object.keys(authors).forEach(slug => {
      console.log(chalk.gray(`     • ${slug}.jpg`));
    });

    console.log(chalk.gray('\n2. Add logo files to:'));
    console.log(chalk.white('   src/assets/images/'));
    console.log(chalk.gray('     • logo-light.png (for dark backgrounds)'));
    console.log(chalk.gray('     • logo-color.png (for light backgrounds)'));

    console.log(chalk.gray('\n3. Update favicons in:'));
    console.log(chalk.white('   src/assets/favicons/'));
    console.log(chalk.gray('   Use https://realfavicongenerator.net/'));

    console.log(chalk.gray('\n4. Add social sharing image:'));
    console.log(chalk.white('   src/assets/images/social.jpg'));
    console.log(chalk.gray('   Recommended size: 1200x630px'));

    console.log(chalk.gray('\n5. Review and customize page content:'));
    console.log(chalk.white('   src/index.html (homepage)'));
    console.log(chalk.white('   src/pages/*.html'));

    if (deployAnswer.netlify) {
      console.log(chalk.bold.yellow('\n🚀 NETLIFY DEPLOYMENT STEPS:\n'));
      console.log(chalk.gray('1. Push your code to GitHub'));
      console.log(chalk.gray('2. Connect repository to Netlify'));
      console.log(chalk.gray('3. Build settings:'));
      console.log(chalk.white('   Build command: npm run build'));
      console.log(chalk.white('   Publish directory: public'));
      console.log(chalk.gray('4. Enable Netlify Identity (for CMS access)'));
      console.log(chalk.gray('5. Enable Git Gateway (for CMS functionality)'));
    }

    console.log(chalk.bold.cyan('\n━'.repeat(60)));
    console.log(chalk.bold.yellow('\n🎯 NEXT STEPS:\n'));
    console.log(chalk.white('1. Review generated configuration files'));
    console.log(chalk.white('2. Add required assets (images, logos, favicons)'));
    console.log(chalk.white('3. Start development server:'));
    console.log(chalk.cyan('   npm start\n'));
    console.log(chalk.white('4. Access your site at:'));
    console.log(chalk.cyan('   http://localhost:8080\n'));
    console.log(chalk.white('5. Access CMS at:'));
    console.log(chalk.cyan('   http://localhost:8080/admin'));
    console.log(chalk.gray('   (Remember to run npm run start:proxy for local CMS)\n'));

    console.log(chalk.bold.cyan('━'.repeat(60)));
    console.log(chalk.bold.green('\n🎉 Happy building!\n'));

  } catch (error) {
    if (error.isTtyError) {
      console.error(chalk.red('\n❌ Prompt could not be rendered in this environment'));
    } else {
      console.error(chalk.red('\n❌ Setup failed:'), error.message);
    }
    process.exit(1);
  }
}

main();
