/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { terser } from 'rollup-plugin-terser';

const banner = `/*
 * Copyright ${new Date().getFullYear()} Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 * @preserve
 */`;

const bundles = [
  {
    source: 'src/index.js',
    outputFile: 'dist/franklin-web-library',
  },
  {
    source: 'src/components/form/index.js',
    outputFile: 'dist/franklin-web-forms',
  },
  {
    source: 'cli/index.js',
    outputFile: 'bin/cli',
    minify: false,
  },
];

export default [...bundles.map(({ outputFile, source, minify = true }) => ({
  input: source,
  inlineDynamicImports: true,
  output: [
    {
      file: `${outputFile}.esm.js`,
      format: 'es',
      sourcemap: false,
      exports: 'auto',
    },
    minify && {
      file: `${outputFile}.esm.min.js`,
      format: 'es',
      sourcemap: false,
      exports: 'auto',
      plugins: [terser()],
      banner,
    },
  ].filter((m) => m),
}))];
