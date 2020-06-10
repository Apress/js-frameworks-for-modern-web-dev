({
  // build input directory for application code
  appDir: './src',
  // build output directory for application code
  dir: './build',
  // path relative to build input directory where scripts live
  baseUrl: 'public/scripts',
  // pre-defined configuration file used to resolve dependencies
  mainConfigFile: './src/public/scripts/main.js',
  // include all text! references as inline modules
  inlineText: true,
  // do not copy files that were combined in build output
  removeCombined: true,

  // specific modules to be built
  modules: [
    {
      name: 'main'
    }
  ],

  // uglify the output
  optimize: 'uglify'
})