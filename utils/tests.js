module.exports.H25 = async ($) => {
  if ($) {
    let titleLength = $('head title').length;
    let pasosVerificacion = [];
    let errorCount = 0;
    if (titleLength > 0) {
      pasosVerificacion.push(1);
      if ($('head title').text() === '') {
        errorCount++;
        pasosVerificacion.push(0);
      } else {
        pasosVerificacion.push(1);
      }
    } else {
      errorCount++;
      return { verificationSteps: 0, elementCount: null, errorCount };
    }
    return {
      verificationSteps: [pasosVerificacion],
      elementCount: titleLength,
      errorCount,
    };
  } else {
    return null;
  }
};

module.exports.H32 = async ($) => {
  if ($) {
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
        elementCount: formLength,
        errorCount,
      };
    } else {
      return { verificationSteps: null, elementCount: null, errorCount: null };
    }
  } else {
    return null;
  }
};

module.exports.H35 = async ($) => {
  if ($) {
    let appletLength = $('applet').length;
    let errorCount = 0;
    if (appletLength > 0) {
      let verificationSteps = [];
      $('applet').each(function (i, e) {
        verificationSteps[i] = [1];
        if ($(this).attr('alt') && $(this).attr('alt') != '') {
          verificationSteps[i].push(1);
          if ($(this).text().trim() == $(this).attr('alt').trim()) {
            verificationSteps[i].push(1);
          } else {
            errorCount++;
            verificationSteps[i].push(0);
          }
        } else {
          errorCount++;
          verificationSteps[i].push(0);
        }
      });

      return {
        verificationSteps,
        elementCount: appletLength,
        errorCount,
      };
    } else {
      return { verificationSteps: null, elementCount: null, errorCount: null };
    }
  } else {
    return null;
  }
};

module.exports.H36 = async ($) => {
  if ($) {
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
        elementCount: inputImagetLength,
        errorCount,
      };
    } else {
      return { verificationSteps: null, elementCount: null, errorCount: null };
    }
  } else {
    return null;
  }
};

module.exports.H37 = async ($) => {
  if ($) {
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
        elementCount: imgLength,
        errorCount,
      };
    } else {
      return { verificationSteps: null, elementCount: null, errorCount: null };
    }
  } else {
    return null;
  }
};

module.exports.H44 = async ($) => {
  if ($) {
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
        elementCount: inputLength,
        errorCount,
      };
    } else {
      return { verificationSteps: null, elementCount: null, errorCount: null };
    }
  } else {
    return null;
  }
};

module.exports.H46 = async ($) => {
  if ($) {
    let embedLength = $('embed').length;
    let errorCount = 0;

    if (embedLength > 0) {
      let verificationSteps = [];
      let noembedLength = $('embed:has(noembed), embed + noembed').length;

      for (let i = 0; i < embedLength; i++) {
        verificationSteps[i] = [1];
        if (i < noembedLength) {
          verificationSteps[i].push(1);
        } else {
          errorCount++;
          verificationSteps[i].push(0);
        }
      }

      return {
        verificationSteps,
        elementCount: embedLength,
        errorCount,
      };
    } else {
      return { verificationSteps: null, elementCount: null, errorCount: null };
    }
  } else {
    return null;
  }
};

module.exports.H57 = async ($) => {
  if ($) {
    let htmlLength = $('html').length;
    let errorCount = 0;

    if (htmlLength > 0) {
      let verificationSteps = [];
      verificationSteps[0] = [1];
      if ($('html').attr('lang') && $('html').attr('lang') != '') {
        verificationSteps[0].push(1);
      } else {
        errorCount++;
        verificationSteps[0].push(0);
      }

      return {
        verificationSteps,
        elementCount: htmlLength,
        errorCount,
      };
    }
  } else {
    return null;
  }
};

module.exports.H63 = async ($) => {
  if ($) {
    let tableLength = $('th').length;
    let errorCount = 0;

    if (tableLength > 0) {
      let verificationSteps = [];

      $('th').each(function (i, e) {
        verificationSteps[i] = [1];
        if ($(this).attr('scope') && $(this).attr('scope').length > 0) {
          verificationSteps[i].push(1);

          if (
            ['row', 'col', 'rowgroup', 'colgroup'].includes(
              $(this).attr('scope').trim()
            )
          ) {
            verificationSteps[i].push(1);
          } else {
            errorCount++;
            verificationSteps[i].push(0);
          }
        } else {
          errorCount++;
          verificationSteps[i].push(0);
        }
      });

      return {
        verificationSteps,
        elementCount: tableLength,
        errorCount,
      };
    } else {
      return { verificationSteps: null, elementCount: null, errorCount: null };
    }
  } else {
    return null;
  }
};

module.exports.H64 = async ($) => {
  if ($) {
    let frameLength = $('iframe').length;
    let errorCount = 0;

    if (frameLength > 0) {
      let verificationSteps = [];

      $('iframe').each(function (i, e) {
        verificationSteps[i] = [1];
        if ($(this).attr('title') && $(this).attr('title').length > 0) {
          verificationSteps[i].push(1);
        } else {
          errorCount++;
          verificationSteps[i].push(0);
        }
      });

      return {
        verificationSteps,
        elementCount: frameLength,
        errorCount,
      };
    } else {
      return { verificationSteps: null, elementCount: null, errorCount: null };
    }
  } else {
    return null;
  }
};

module.exports.H93 = async ($) => {
  if ($) {
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
        elementCount: idLength,
        errorCount,
      };
    } else {
      return { verificationSteps: null, elementCount: null, errorCount: null };
    }
  } else {
    return null;
  }
};

module.exports.H96 = async ($) => {
  if ($) {
    let videoLength = $('video').length;
    let errorCount = 0;

    if (videoLength > 0) {
      let verificationSteps = [];
      let trackLength = $('video > track[kind="descriptions"]').length;
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
        elementCount: videoLength,
        errorCount,
      };
    } else {
      return { verificationSteps: null, elementCount: null, errorCount: null };
    }
  } else {
    return null;
  }
};
