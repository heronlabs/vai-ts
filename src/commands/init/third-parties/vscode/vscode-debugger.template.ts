export const vsCodeDebuggerConfig = (): string => {
  const template = `
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "nodemon",
      "runtimeExecutable": "nodemon",
      "program": "${process.cwd()}/build/src/index.js",
      "restart": true,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "skipFiles": [
        "<node_internals>/**"
      ]
    }
  ]
}
`;

  return template.trimStart();
};
