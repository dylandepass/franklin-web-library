/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable class-methods-use-this */

import {
  initHlx,
  waitForLCP,
  sampleRUM,
  loadHeader,
  loadFooter,
  decorateBlocks,
  loadBlocks,
  makeLinksRelative,
  loadCSS,
  addFavIcon,
  decorateSections,
  decoratePictures,
  removeStylingFromImages,
  registerPerformanceLogger,
} from './core.js';

export default class HelixApp {
  constructor(config) {
    this.config = config;
    this.rumEnabled = false;
    initHlx();

    this.loadPage(document);

    if (this.rumEnabled) {
      this.sampleRUM('top');
      window.addEventListener('load', () => sampleRUM('load'));
      document.addEventListener('click', () => sampleRUM('click'));
    }

    if (window.name.includes('performance')) {
      registerPerformanceLogger();
    }
  }

  sampleRUM(event) {
    sampleRUM(event, this.config.rumGeneration);
  }

  /**
   * Decorates the page.
   */
  async loadPage(doc) {
    await this.loadEager(doc);

    const main = doc.querySelector('main');
    if (main) {
      this.decorateMain(main);
      await waitForLCP(this.config.lcpBlocks);
    }

    await this.loadLazy(doc);
    this.loadDelayed(doc);
  }

  /**
   * loads everything needed to get to LCP.
   * Should be overridden by subclasses.
   */
  async loadEager(doc) {
    return Promise.resolve(doc);
  }

  /**
   * Decorates the main element.
   * @param {Element} main The main element
   */
  decorateMain(main) {
    // forward compatible pictures redecoration
    this.decoratePictures(main);
    this.removeStylingFromImages(main);
    this.makeLinksRelative(main, this.config.productionDomains);
    this.decorateSections(main);
    this.decorateBlocks(main);
  }

  /**
   * loads everything that doesn't need to be delayed.
   */
  async loadLazy(doc) {
    const main = doc.querySelector('main');
    await loadBlocks(main);

    this.loadHeader(doc.querySelector('header'));
    this.loadFooter(doc.querySelector('footer'));

    loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  }

  /**
   * loads everything that happens a lot later, without impacting
   * the user experience.
   */
  loadDelayed() {
    addFavIcon(`${window.hlx.codeBasePath}/icon.svg`);
  }

  /**
   *
   * Override these methods to add custom behavior.
   *
   */

  /**
   * Loads the header block.
   * @param {Element} header The header element
   */
  async loadHeader(header) {
    loadHeader(header, this.config.productionDomains);
  }

  /**
   * Loads the footer block.
   * @param {Element} footer The footer element
   */
  async loadFooter(footer) {
    loadFooter(footer, this.config.productionDomains);
  }

  /**
   * Removes formatting from images.
   * @param {Element} main The container element
   */
  removeStylingFromImages(main) {
    removeStylingFromImages(main);
  }

  /**
   * Turns absolute links within the domain into relative links.
   * @param {Element} main The container element
   */
  makeLinksRelative(main, productionDomains) {
    makeLinksRelative(main, productionDomains);
  }

  /**
   * Decorates all sections in a container element.
   * @param {Element} $main The container element
   */
  decorateSections(main) {
    decorateSections(main);
  }

  /**
   * Decorates all blocks in a container element.
   * @param {Element} $main The container element
   */
  decorateBlocks(main) {
    decorateBlocks(main);
  }

  /**
   * Decorates the picture elements.
   * @param {Element} main The container element
   */
  decoratePictures(main) {
    decoratePictures(main);
  }
}