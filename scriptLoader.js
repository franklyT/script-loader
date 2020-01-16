function includeJs(...files) {
  const timer = performance.now();
  const oldArg = files.flat();
  if (oldArg.length > 0) {
    // push script name to var
    let logScript = String(oldArg[0].match(/(?<=src=")(.*?)(?=")/g));
    logScript = logScript.substring(logScript.lastIndexOf('/') + 1);
    const newArg = oldArg.slice(1);
    const scriptElm = document.createElement('script');
    scriptElm.type = oldArg[0].match(/(?<=type=")(.*?)(?=")/g);
    scriptElm.src = oldArg[0].match(/(?<=src=")(.*?)(?=")/g);
    scriptElm.addEventListener(
      'load',
      () => {
        console.log(`${Math.round(performance.now() - timer)} ms to load.`), includeJs(newArg);
      },
      false
    );

    document.body.appendChild(scriptElm);

    console.log(`Loaded script ${logScript}`);
  }
}
// ...

includeJs(
  '<script src="src/js/example1.js" type="text/javascript"></script>',
  '<script src="src/js/example2.js" type="module"></script>',
  '<script src="src/js/example3.js" type="text/javascript"></script>'
);
