module.exports = {
    name: 'node-red',
    script: 'node_modules/node-red/red.js',
    args: '--userDir /data ' + process.env.FLOWS,
    node_args: process.env.NODE_OPTIONS,
    watch: true,
}