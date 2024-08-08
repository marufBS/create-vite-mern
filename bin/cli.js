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

function fetchRepo() {
    
}



function createProject(projectName) {
    const projectPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
        console.error(`Directory ${projectName} already exists.`);
        process.exit(1);
        // Create the project directory
    } else {
        fs.mkdirSync(projectPath);
        console.log('Project setup complete.');
        fetchRepo()
        process.exit(1)
    }



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