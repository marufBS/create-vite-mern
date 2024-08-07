#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const args = process.argv.slice(2);

function createProject(projectName) {
    const projectPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
        console.error(`Directory ${projectName} already exists.`);
        process.exit(1);
    }

    // Create the project directory
    fs.mkdirSync(projectPath);

    // Initialize the project (this example uses Vite for a React project)
    console.log(`Creating a new Vite project in ${projectPath}`);
    execSync(`npm create vite@latest ${projectName} --template react`, { stdio: 'inherit' });

    console.log('Project setup complete.');
}

if (args.length < 1) {
    rl.question('Please provide a project name: ', (projectName) => {
        if (!projectName) {
            console.error('Project name is required.');
            process.exit(1);
        }
        createProject(projectName);
        rl.close();
    });
} else {
    createProject(args[0]);
}
