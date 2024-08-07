const {execSync} = require('child_process')

const runCommand = command => {
    try {
        execSync(`${command}`,{stdio:'inherit'})
    } catch (e) {
        console.error(`Failed to execute ${command}`, e)
        return false
    }
    return true
}

const repoName = process.argv[2]
const gitCheckoutCommand = `git clone --depth 1 https://github.com/marufBS/create-vite-mern ${repoName}`
const installDepsCommand = `cd ${repoName} && npm install`

console.log(`Creating project with name ${repoName}`)
const checkOut = runCommand(gitCheckoutCommand)
if(!checkOut) process.exit(-1)

console.log(`Installing dependencies for ${repoName}`)
const installedDeps = runCommand(installDepsCommand)
if(!installedDeps) process.exit(-1)

console.log("Congratulations! You are ready to Deploy")
console.log(`cd ${repoName} && npm run dev`)
