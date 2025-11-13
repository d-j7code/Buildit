// Lingo.dev configuration
// This is a placeholder configuration for lingo.dev
// Update this when the correct lingo.dev package is available

export default {
  // Source language
  sourceLocale: 'en',
  
  // Target languages for localization
  locales: ['en', 'es', 'fr', 'de', 'ja'],
  
  // Directory for translation files
  catalogs: [
    {
      path: 'src/locales/{locale}/messages',
      include: ['src/'],
      exclude: ['**/node_modules/**']
    }
  ],
  
  // Compiler options
  compilerOptions: {
    strict: true,
    verbose: false
  },
  
  // Format for translation files
  format: 'po'
}