import * as bespoke from "bespoke";
import bullets from "bespoke-bullets";
import backdrop from "bespoke-backdrop";
import multimedia from "bespoke-multimedia";
import extern from "bespoke-extern";
import state from "bespoke-state";
// import classes from "bespoke-classes";

// Import and Register the languages you need
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('java', java);

import {
    classes,
    debug,
    editor,
    hash,
    nav,
    progress,
    scale,
    viewMode,
    speakerView,
    highlight
} from "@tblaisot/prez-as-adoc/bespoke/plugins"

const config = {
    parent: '.slides',
    slides: 'section.slide',
    notes: 'aside.speaker-notes'
}

// Bespoke.js
bespoke.from(config, [
    classes(),
    nav(),
    scale(config),
    bullets('[data-step], .olist[data-step] li, .ulist[data-step] li'),
    hash(),
    // overview(),
    multimedia(),
    progress(),
    // extern(bespoke),
    speakerView(config),
    debug(),
    state(),
    editor(),
    viewMode(),
    backdrop(),
    highlight(),
]);
