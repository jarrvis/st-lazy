import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stlazy',
  outputTargets:[
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null 
    }
  ],
  //globalScript: "src/utils/utils.ts",
};
