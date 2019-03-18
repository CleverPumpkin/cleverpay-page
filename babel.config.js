// @ts-ignore
module.exports = {
  presets: ['@babel/preset-typescript', ['@babel/preset-env', { useBuiltIns: 'entry' }]],
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread'],
}
