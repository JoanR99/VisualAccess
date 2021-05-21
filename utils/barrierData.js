const barrierData = {
  H25: {
    barrierName: 'Titulo de página web',
    description: 'El elemento "title" de la página no tiene contenido.',
    successCriterion: [
      {
        name: 'Success Criterion 2.4.2: Page Titled',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/page-titled',
      },
    ],
  },
  H32: {
    barrierName: 'Cambios de contexto.',
    description:
      'elemento(s) "form" no tiene(n) un botón de tipo "submit" (input type="submit", input type="image", o button type="submit").',
    successCriterion: [
      {
        name: 'Success Criterion 3.2.2: On Input',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/on-input',
      },
    ],
  },
  H35: {
    barrierName: 'Alternativas textuales a elementos "applet".',
    description:
      'elemnto(s) "applet" no tienen alternativas textuales utilizando el atributo "alt" y proporcionando la alternativa de texto en el cuerpo del elemento.',
    successCriterion: [
      {
        name: 'Success Criterion 1.1.1: Non-text Content',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content',
      },
    ],
  },
  H37: {
    barrierName: 'Atributos "alt" en imagenes.',
    description:
      'elemento(s) "img" no especifican una alternativa de texto corto con el atributo "alt"',
    successCriterion: [
      {
        name: 'Success Criterion 1.1.1: Non-text Content',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content',
      },
    ],
  },
  H44: {
    barrierName: 'Asociar etiquetas de texto con controles  de formulario.',
    description:
      'control(es) de formulario no estan asociados con un elemento "label".',
    successCriterion: [
      {
        name: 'Success Criterion 1.1.1: Non-text Content',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content',
      },
      {
        name: 'Success Criterion 1.3.1: Info and Relationships',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships',
      },
      {
        name: 'Success Criterion 3.3.2: Labels or Instructions',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions',
      },
      {
        name: 'Success Criterion 4.1.2: Name, Role, Value',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value',
      },
    ],
  },
  H57: {
    barrierName: 'Lenguaje de página web.',
    description:
      'No se especifica el lenguaje de la página a traves del atributo "lang" del elemento "html".',
    successCriterion: [
      {
        name: 'Success Criterion 3.1.1: Language of Page',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-page',
      },
    ],
  },
  H63: {
    barrierName:
      'Asociar celdas de encabezado y celdas de datos en las tablas.',
    description:
      'elemento(s) "th" dentro de un elemento "table" no especifican el atributo "scope".',
    successCriterion: [
      {
        name: 'Success Criterion 1.3.1: Info and Relationships',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships',
      },
    ],
  },
  H64: {
    barrierName: 'Atributo "title"  en los elementos "frame" e "iframe".',
    description:
      'elemento(s) "frame" o "iframe" no especifican el atributo "title" para describir su contenido.',
    successCriterion: [
      {
        name: 'Success Criterion 2.4.1: Bypass Blocks',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks',
      },
      {
        name: 'Success Criterion 4.1.2: Name, Role, Value',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value',
      },
    ],
  },
  H93: {
    barrierName: 'Elementos con el mismo atributo "id".',
    description: 'caso(s) de elemntos con el mismo atributo "id"',
    successCriterion: [
      {
        name: 'Success Criterion 4.1.1: Parsing',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/parsing',
      },
    ],
  },
  H95: {
    barrierName: 'Elementos "track" para subtitulos en elementos de "video".',
    description:
      'elemento(s) "video" no posee(n) un elemento "track" para subtitulos.',
    successCriterion: [
      {
        name: 'Success Criterion 1.2.2: Captions (Prerecorded)',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded',
      },
    ],
  },
  H96: {
    barrierName: 'Elementos "track" para descripción en elementos "video".',
    description:
      'elemento(s) "video" no posee(n) un elemento "track" para descripción.',
    successCriterion: [
      {
        name: 'Success Criterion 1.2.1: Audio-only and Video-only (Prerecorded)',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded',
      },
      {
        name: 'Success Criterion 1.2.3: Audio Description or Media Alternative (Prerecorded)',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-or-media-alternative-prerecorded',
      },
      {
        name: 'Success Criterion 1.2.5: Audio Description (Prerecorded)',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-prerecorded',
      },
      {
        name: 'Success Criterion 1.2.7: Extended Audio Description (Prerecorded)',
        link: 'https://www.w3.org/WAI/WCAG21/Understanding/extended-audio-description-prerecorded',
      },
    ],
  },
};

module.exports = barrierData;
