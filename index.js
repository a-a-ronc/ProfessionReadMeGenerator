// TODO: Include packages needed for this application
const fs = require('fs');
// const path = require('path');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

function generateReadME(data) {
  const badgeLicense = {
    MIT: 'https://img.shields.io/badge/License-MIT-yellow.svg',
    Apache: 'https://img.shields.io/badge/License-Apache%202.0-blue.svg',
    GNU: 'https://img.shields.io/badge/License-GPLv3-blue.svg',
    BSD: 'https://img.shields.io/badge/License-BSD%203--Clause-blue.svg',
    CreativeCommons: 'https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg',
  }

// Get the license badge URL based on the user's selection
const badgeLicenseURL = badgeLicense[data.license];

// Generate the README content based on the provided data
return `
# ${data.title}

## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#test  )
- [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

## License
[![License](https://img.shields.io/badge/License-${data.license}-blue.svg)](LICENSE)

This project is licensed under the ${data.license} license.

## Contributing
${data.contributing}

## Tests
${data.test}

## Questions
For questions, contact ${data.email}. Visit [GitHub](https://github.com/${data.username}).
;`
}

// Added questions for the user to answer to fill out the readme file that is going to be 
// generated
const questions = [
  {
    type: 'input',
    message: 'What is the title of the project?',
    name: 'title',
  },
  {
    type: 'input',
    message: 'What is the description of the application?',
    name: 'description',
  },
  {
    type: 'input',
    message: 'Input the table of contents items: ',
    name: 'tableofcontents',
    
  },
  {
    type: 'input',
    message: 'Describe the installation steps: ',
    name: 'installation',
  },
  {
    type: 'input',
    message: 'Input the steps needed to interface with the application',
    name: 'usage',
  },
  {
    type: 'list',
    message: 'Select a license for your application: ',
    name: 'license',
    choices: ['MIT', 'Apache', 'GNU', 'BSD', 'CreativeCommons']
  },
  {
    type: 'input',
    message: 'Enter any contributors: ',
    name: 'contributing',
  },
  {
    type: 'input',
    message: 'Enter any test instruction: ',
    name: 'test',
  },
  {
    type: 'input',
    message: 'Enter your github username: ',
    name: 'github',
  },
  {
    type: 'input',
    message: 'Enter your email used for github: ',
    name: 'email',
  },
];

inquirer.prompt(questions).then((answers) =>{
  try{
    const readMEResponse = generateReadME(answers);
    fs.writeFileSync('README.md',readMEResponse);

    console.log('README.md',readMEResponse);
    console.log('README has been generated successfully!!!');
  } catch(error){
    console.error('Resulted in error generating README: ', error);
  }
})



