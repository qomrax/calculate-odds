module.exports = {
    apps: [
        {
            name: 'flask-calculate',
            script: 'python3 calculate.py --port 5000'
        },
        {
            name: 'node-calculate',
            script: 'npm run dev'
        }
    ]
}
