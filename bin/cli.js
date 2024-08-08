#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const axios = require('axios');
const chalk = require('chalk');
const AdmZip = require('adm-zip');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const args = process.argv.slice(2);

async function fetchRepo(outputPath) {
    try {
        // Step 1: Download the ZIP file
        const response = await axios({
            method: 'get',
            url: 'https://codeload.github.com/thisisudayan/is-android-package/zip/refs/heads/main',
            responseType: 'arraybuffer', // To get the data as a buffer
        });

        // Step 2: Save the ZIP file to disk
        const zipPath = `${outputPath}/downloaded.zip`;
        fs.writeFileSync(zipPath, response.data);

        // Step 3: Extract the ZIP file
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(outputPath, true);

        console.log('Extraction complete!');
        process.exit(1)
    } catch (error) {
        console.error('Error downloading or extracting the ZIP file:', error);
        process.exit(1)
    }
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
        fetchRepo(projectName)
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