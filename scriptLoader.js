  includeJs(...files) {
    const oldArg = files.flat();
    if (oldArg.length > 0) {
      // push script name to var
      const logScript = String(oldArg[0].match(/(?<=src=")(.*?)(?=")/g));
      const newArg = oldArg.slice(1);
      const scriptElm = document.createElement('script');
      scriptElm.type = oldArg[0].match(/(?<=type=")(.*?)(?=")/g);
      scriptElm.src = oldArg[0].match(/(?<=src=")(.*?)(?=")/g);
      scriptElm.addEventListener('load', () => functionExports.includeJs(newArg), false);

      document.body.appendChild(scriptElm);

      console.log(`Loaded script ${logScript.substring(logScript.lastIndexOf('/') + 1)}`);
    }

...

includeJs(
  '<script src="src/js/example1.js" type="text/javascript"></script>',
  '<script src="src/js/example2.js" type="module"></script>',
  '<script src="src/js/example3.js" type="text/javascript"></script>'
);
