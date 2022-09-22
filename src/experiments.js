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

/* eslint-disable no-param-reassign */

import { getMetadata } from './metadata.js';
import { toClassName, toCamelCase } from './decorators.js';
import { sampleRUM } from './rum.js';

export function checkTesting() {
  const tesing = getMetadata('testing');
  return (tesing && tesing.toLowerCase() === 'on');
}

/**
 * this is an extensible stub to take on audience mappings
 * @param {string} audience
 * @return {boolean} is member of this audience
 */

function checkExperimentAudience(audience) {
  if (audience === 'mobile') {
    return window.innerWidth < 600;
  }
  if (audience === 'desktop') {
    return window.innerWidth > 600;
  }
  return true;
}

/**
 * Replaces element with content from path
 * @param {string} path
 * @param {HTMLElement} element
 */
export async function replaceInner(path, element) {
  const plainPath = `${path}.plain.html`;
  try {
    const resp = await fetch(plainPath);
    const html = await resp.text();
    element.innerHTML = html;
  } catch (e) {
    console.log(`error loading content: ${plainPath}`, e);
  }
  return null;
}

/**
 * gets the variant id that this visitor has been assigned to if any
 * @param {string} experimentId
 * @return {string} assigned variant or empty string if none set
 */

function getLastExperimentVariant(experimentId) {
  console.log('get last experiment', experimentId);
  const experimentsStr = localStorage.getItem('hlx-experiments');
  if (experimentsStr) {
    const experiments = JSON.parse(experimentsStr);
    if (experiments[experimentId]) {
      return experiments[experimentId].variant;
    }
  }
  return '';
}

/**
 * sets/updates the variant id that is assigned to this visitor,
 * also cleans up old variant ids
 * @param {string} experimentId
 * @param {variant} variant
 */

function setLastExperimentVariant(experimentId, variant) {
  const experimentsStr = localStorage.getItem('hlx-experiments');
  const experiments = experimentsStr ? JSON.parse(experimentsStr) : {};

  const now = new Date();
  const expKeys = Object.keys(experiments);
  expKeys.forEach((key) => {
    const date = new Date(experiments[key].date);
    if (now - date > (1000 * 86400 * 30)) {
      delete experiments[key];
    }
  });
  const [date] = now.toISOString().split('T');

  experiments[experimentId] = { variant, date };
  localStorage.setItem('hlx-experiments', JSON.stringify(experiments));
}

/**
 * Gets the experiment name, if any for the page based on env, useragent, query params
 * @returns {string} experimentid
 */
export function getExperiment() {
  let experiment = toClassName(getMetadata('experiment'));

  // if (!window.location.host.includes('adobe.com')
  // && !window.location.host.includes('.hlx.live')) {
  //  experiment = '';
  //  // reason = 'not prod host';
  // }
  if (window.location.hash) {
    experiment = '';
    // reason = 'suppressed by #';
  }

  if (navigator.userAgent.match(/bot|crawl|spider/i)) {
    experiment = '';
    // reason = 'bot detected';
  }

  const usp = new URLSearchParams(window.location.search);
  if (usp.has('experiment')) {
    [experiment] = usp.get('experiment').split('/');
  }

  return experiment;
}

/**
 * Gets experiment config from the manifest or the instant experiement
 * metdata and transforms it to more easily consumable structure.
 *
 * the manifest consists of two sheets "settings" and "experiences"
 *
 * "settings" is applicable to the entire test and contains information
 * like "Audience", "Status" or "Blocks".
 *
 * "experience" hosts the experiences in columns, consisting of:
 * a "Percentage Split", "Label" and a set of "Pages".
 *
 *
 * @param {string} experimentId
 * @returns {object} containing the experiment manifest
 */
export async function getExperimentConfig(experimentId) {
  const instantExperiment = getMetadata('instant-experiment');
  if (instantExperiment) {
    const config = {
      experimentName: `Instant Experiment: ${experimentId}`,
      audience: '',
      status: 'Active',
      id: experimentId,
      variants: {},
      variantNames: [],
    };

    const pages = instantExperiment.split(',').map((p) => new URL(p.trim()).pathname);
    const evenSplit = 1 / (pages.length + 1);

    config.variantNames.push('control');
    config.variants.control = {
      percentageSplit: '',
      pages: [window.location.pathname],
      blocks: [],
      label: 'Control',
    };

    pages.forEach((page, i) => {
      const vname = `challenger-${i + 1}`;
      config.variantNames.push(vname);
      config.variants[vname] = {
        percentageSplit: `${evenSplit}`,
        pages: [page],
        label: `Challenger ${i + 1}`,
      };
    });

    return (config);
  } else {
    const path = `/express/experiments/${experimentId}/manifest.json`;
    try {
      const config = {};
      const resp = await fetch(path);
      const json = await resp.json();
      json.settings.data.forEach((line) => {
        const key = toCamelCase(line.Name);
        config[key] = line.Value;
      });
      config.id = experimentId;
      config.manifest = path;
      const variants = {};
      let variantNames = Object.keys(json.experiences.data[0]);
      variantNames.shift();
      variantNames = variantNames.map((vn) => toCamelCase(vn));
      variantNames.forEach((variantName) => {
        variants[variantName] = {};
      });
      let lastKey = 'default';
      json.experiences.data.forEach((line) => {
        let key = toCamelCase(line.Name);
        if (!key) key = lastKey;
        lastKey = key;
        const vns = Object.keys(line);
        vns.shift();
        vns.forEach((vn) => {
          const camelVN = toCamelCase(vn);
          if (key === 'pages' || key === 'blocks') {
            variants[camelVN][key] = variants[camelVN][key] || [];
            if (key === 'pages') variants[camelVN][key].push(new URL(line[vn]).pathname);
            else variants[camelVN][key].push(line[vn]);
          } else {
            variants[camelVN][key] = line[vn];
          }
        });
      });
      config.variants = variants;
      config.variantNames = variantNames;
      console.log(config);
      return config;
    } catch (e) {
      console.log(`error loading experiment manifest: ${path}`, e);
    }
    return null;
  }
}

/**
 * checks if a test is active on this page and if so executes the test
 */
export async function decorateTesting() {
  try {
    // let reason = '';
    const usp = new URLSearchParams(window.location.search);
    const experiment = getExperiment();
    const [forcedExperiment, forcedVariant] = usp.get('experiment') ? usp.get('experiment').split('/') : [];

    if (experiment) {
      console.log('experiment', experiment);
      const config = await getExperimentConfig(experiment);
      console.log(config);
      if (toCamelCase(config.status) === 'active' || forcedExperiment) {
        config.run = forcedExperiment || checkExperimentAudience(toClassName(config.audience));
        console.log('run', config.run, config.audience);

        window.hlx = window.hlx || {};
        window.hlx.experiment = config;
        if (config.run) {
          const forced = forcedVariant || getLastExperimentVariant(config.id);
          if (forced && config.variantNames.includes(forced)) {
            config.selectedVariant = forced;
          } else {
            let random = Math.random();
            let i = config.variantNames.length;
            while (random > 0 && i > 0) {
              i -= 1;
              console.log(random, i);
              random -= +config.variants[config.variantNames[i]].percentageSplit;
            }
            config.selectedVariant = config.variantNames[i];
          }
          setLastExperimentVariant(config.id, config.selectedVariant);
          sampleRUM('experiment', { source: config.id, target: config.selectedVariant });
          console.log(`running experiment (${window.hlx.experiment.id}) -> ${window.hlx.experiment.selectedVariant}`);
          if (config.selectedVariant !== 'control') {
            const currentPath = window.location.pathname;
            const pageIndex = config.variants.control.pages.indexOf(currentPath);
            console.log(pageIndex, config.variants.control.pages, currentPath);
            if (pageIndex >= 0) {
              const page = config.variants[config.selectedVariant].pages[pageIndex];
              if (page) {
                const experimentPath = new URL(page, window.location.href).pathname.split('.')[0];
                if (experimentPath && experimentPath !== currentPath) {
                  await replaceInner(experimentPath, document.querySelector('main'));
                }
              }
            }
          }
        }
      }
    }
  } catch (e) {
    console.log('error testing', e);
  }
}
