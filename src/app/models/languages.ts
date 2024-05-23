export class Languages {
  languages = [
    {
      code: 'en',
      name: 'main-menu.languages.english',
      emoji: '🇺🇸',
      translation: '', //-- English is the default language in rest countries API
    },
    {
      code: 'es',
      name: 'main-menu.languages.spanish',
      emoji: '🇪🇸',
      translation: 'spa',//-- This is according to rest countries API
    },
  ];
  constructor() {}

}
