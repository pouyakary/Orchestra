const path = require('path')
const { execSync } = require('child_process')

async function compileLESS() {
    console.log('--> Compiling LESS stylesheets...')
    const lessPath = path.join(__dirname, 'sheets', 'ui.less')
    const outputPath = path.join(__dirname, 'view', 'style.css')
    execSync(`npx lessc "${lessPath}" "${outputPath}"`, { stdio: 'inherit' })
    console.log('--> Done.')
}

compileLESS().catch(err => {
    console.error(err)
    process.exit(1)
})
