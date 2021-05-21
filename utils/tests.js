module.exports.H25 = async ($) => {
  let titleLength = $('head title').length;
  let pasosVerificacion = [];
  let errorCount = 0;
  if (titleLength > 0) {
    pasosVerificacion.push(1); //si el titulo esta implementado, cumple con el primer paso
    if ($('head title').text() === '') {
      errorCount++;
      pasosVerificacion.push(0); // si el titulo esta implementado pero no tiene contenido, el segundo paso no se cumple
    } else {
      pasosVerificacion.push(1); // si el titulo esta implementado y tiene contenido, el segundo paso  se cumple
    }
  } else {
    errorCount++;
    return { verificationSteps: 0, element: null }; //si el titulo no esta implementado, no se cumple
  }
  return {
    verificationSteps: [pasosVerificacion],
    element: { elementCount: titleLength, errorCount },
  };
};

module.exports.H32 = async ($) => {
  let formLength = $('form').length;
  let errorCount = 0;
  if (formLength > 0) {
    let verificationSteps = [];
    let submitLength = $(
      'form > button[type="submit"], form > input[type="submit"], form > input[type="image"]'
    ).length;

    if (submitLength > 0) {
      for (let i = 0; i < submitLength; i++) {
        verificationSteps.push([1, 1]);
      }
    }

    if (formLength > submitLength) {
      let formWithoutSubmitCount = formLength - submitLength;
      for (let i = 0; i < formWithoutSubmitCount; i++) {
        verificationSteps.push([1, 0]);
      }
      errorCount = formWithoutSubmitCount;
    }

    return {
      verificationSteps,
      element: { elementCount: formLength, errorCount },
    };
  } else {
    return { verificationSteps: null, element: null };
  }
};

module.exports.H35 = async ($) => {
  let appletLength = $('applet').length;
  let errorCount = 0;
  if (appletLength > 0) {
    let verificationSteps = [];
    $('applet').each(function (i, e) {
      verificationSteps[i] = [1];
      if ($(this).attr('alt') && $(this).attr('alt') != '') {
        verificationSteps[i].push(1);
      } else {
        errorCount++;

        verificationSteps[i].push(0);
      }
      if ($(this.text() === $(this).attr('alt'))) {
        verificationSteps[i].push(1);
      } else {
        errorCount++;
        verificationSteps[i].push(0);
      }
    });

    return {
      verificationSteps,
      element: { elementCount: appletLength, errorCount },
    };
  } else {
    return { verificationSteps: null, element: null };
  }
};

module.exports.H36 = async ($) => {
  let inputImagetLength = $('input[type="image"]').length;
  let errorCount = 0;

  if (inputImagetLength > 0) {
    let verificationSteps = [];
    $('input[type="image"]').each(function (i, e) {
      verificationSteps[i] = [1];
      if ($(this).attr('alt') && $(this).attr('alt') != '') {
        verificationSteps[i].push(1);
      } else {
        errorCount++;

        verificationSteps[i].push(0);
      }
    });
    return {
      verificationSteps,
      element: { elementCount: inputImagetLength, errorCount },
    };
  } else {
    return { verificationSteps: null, element: null };
  }
};

module.exports.H37 = async ($) => {
  let imgLength = $('img').length;
  let errorCount = 0;
  if (imgLength > 0) {
    let verificationSteps = [];
    $('img').each(function (i, e) {
      verificationSteps[i] = [1];
      if ($(this).attr('alt') && $(this).attr('alt') != '') {
        verificationSteps[i].push(1);
      } else {
        errorCount++;
        verificationSteps[i].push(0);
      }
    });

    return {
      verificationSteps,
      element: { elementCount: imgLength, errorCount },
    };
  } else {
    return { verificationSteps: null, element: null };
  }
};

module.exports.H44 = async ($) => {
  let inputLength = $(
    'input[type="text"], input[type="file"], input[type="password"], input[type="checkbox"], select, textarea'
  ).length;
  let errorCount = 0;

  if (inputLength > 0) {
    let verificationSteps = [];

    $(
      'input[type="text"], input[type="file"], input[type="password"], input[type="checkbox"], select, textarea'
    ).each(function (i, e) {
      verificationSteps[i] = [1];
      let id = $(this).attr('id');
      if (id && id === $(`label[for=${id}]`).attr('for')) {
        verificationSteps[i].push(1);
      } else {
        errorCount++;

        verificationSteps[i].push(0);
      }
    });

    return {
      verificationSteps,
      element: { elementCount: inputLength, errorCount },
    };
  } else {
    return { verificationSteps: null, element: null };
  }
};

module.exports.H46 = async ($) => {
  let embedLength = $('embed').length;
  let errorCount = 0;

  if (embedLength > 0) {
    let verificationSteps = [];
    let noembedLength = $('embed > noembed, embed + noembed').length;

    $('embed').each(function (i, e) {
      verificationSteps[i] = [1];
    });

    for (let i = 0; i < verificationSteps.length; i++) {
      if (i < noembedLength) {
        verificationSteps[i].push(1);
      } else {
        errorCount++;
        verificationSteps[i].push(0);
      }
    }

    return {
      verificationSteps,
      element: { elementCount: embedLength, errorCount },
    };
  } else {
    return { verificationSteps: null, element: null };
  }
};

module.exports.H57 = async ($) => {
  let htmlLength = $('html').length;
  let errorCount = 0;

  if (htmlLength > 0) {
    let verificationSteps = [];
    verificationSteps[0] = [1];
    if ($('html').attr('lang') && $('html').attr('lang').length > 0) {
      verificationSteps[0].push(1);
    } else {
      errorCount++;
      verificationSteps[0].push(0);
    }

    if ($('html').attr('lang') != '' && $('html').attr('lang') != undefined) {
      verificationSteps[0].push(1);
    } else {
      errorCount++;
      verificationSteps[0].push(0);
    }

    return {
      verificationSteps,
      element: { elementCount: htmlLength, errorCount },
    };
  } else {
    return { verificationSteps: null, element: null };
  }
};

module.exports.H63 = async ($) => {
  let tableLength = $('table > th').length;
  let errorCount = 0;

  if (tableLength > 0) {
    let verificationSteps = [];

    $('table > th').each(function (i, e) {
      verificationSteps[i] = [1];
      if ($(this).attr('scope') && $(this).attr('scope').length > 0) {
        verificationSteps[i].push(1);
      } else {
        errorCount++;
        verificationSteps[i].push(0);
      }
      if (
        $(this).attr('scope').includes(['row', 'col', 'rowgroup', 'colgroup'])
      ) {
        verificationSteps[i].push(1);
      } else {
        errorCount++;
        verificationSteps[i].push(0);
      }
    });

    return {
      verificationSteps,
      element: { elementCount: tableLength, errorCount },
    };
  } else {
    return { verificationSteps: null, element: null };
  }
};

module.exports.H64 = async ($) => {
  let frameLength = $('frame, iframe').length;
  let errorCount = 0;

  if (frameLength > 0) {
    let verificationSteps = [];

    $('frame, iframe').each(function (i, e) {
      verificationSteps[i] = [1];
      if ($(this).attr('title') && $(this).attr('title').length > 0) {
        verificationSteps[i].push(1);
      } else {
        errorCount++;
        verificationSteps[i].push(0);
      }
      if ($(this).attr('title') != '') {
        verificationSteps[i].push(1);
      } else {
        errorCount++;
        verificationSteps[i].push(0);
      }
    });

    return {
      verificationSteps,
      element: { elementCount: frameLength, errorCount },
    };
  } else {
    return { verificationSteps: null, element: null };
  }
};

module.exports.H93 = async ($) => {
  let idLength = $('[id]').length;
  let errorCount = 0;

  if (idLength > 0) {
    let verificationSteps = [];
    let idArray = [];

    $('[id]').each(function (i, e) {
      idArray[i] = $(this).attr('id');
    });

    let idSet = new Set(idArray);

    for (let i = 0; i < idSet.size; i++) {
      verificationSteps.push([1, 1]);
    }

    if (idSet.size < idArray.length) {
      let repitedElementsCount = idArray.length - idSet.size;
      for (let i = 0; i < repitedElementsCount; i++) {
        verificationSteps.push([1, 0]);
      }
      errorCount = repitedElementsCount;
    }

    return {
      verificationSteps,
      element: { elementCount: idLength, errorCount },
    };
  } else {
    return { verificationSteps: null, element: null };
  }
};

module.exports.H95 = async ($) => {
  let videoLength = $('video').length;
  let errorCount = 0;

  if (videoLength > 0) {
    let verificationSteps = [];
    let trackLength = $('video > track[kind="captions"]');
    for (let i = 0; i < videoLength; i++) {
      verificationSteps[i] = [1];
      if (i < trackLength) {
        verificationSteps[i].push(1);
      } else {
        errorCount++;
        verificationSteps[i].push(0);
      }
    }

    return {
      verificationSteps,
      element: { elementCount: videoLength, errorCount },
    };
  } else {
    return { verificationSteps: null, element: null };
  }
};

module.exports.H96 = async ($) => {
  let videoLength = $('video').length;
  let errorCount = 0;

  if (videoLength > 0) {
    let verificationSteps = [];
    let trackLength = $('video > track[kind="descriptions"]');
    for (let i = 0; i < videoLength; i++) {
      verificationSteps[i] = [1];
      if (i < trackLength) {
        verificationSteps[i].push(1);
      } else {
        errorCount++;
        verificationSteps[i].push(0);
      }
    }

    return {
      verificationSteps,
      element: { elementCount: videoLength, errorCount },
    };
  } else {
    return { verificationSteps: null, element: null };
  }
};
