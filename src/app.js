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

/* eslint-disable class-methods-use-this, max-classes-per-file */

import {
  initHlx,
  waitForLCP,
  sampleRUM,
  loadHeader,
  loadFooter,
  loadBlocks,
  loadCSS,
  addFavIcon,
  registerPerformanceLogger,
  decorateSections,
  decorateBlock,
  decorateButtons,
  decorateIcons,
  decorateTemplateAndTheme,
  removeStylingFromImages,
  decorateTesting,
} from './core.js';

const defaultConfig = {
  lazyStyles: false,
  autoAppear: true,
  favIcon: '/styles/icon.svg',
  enableBlockLoader: true,
  loadHeader: true,
  loadFooter: true,
  experimentsEnabled: false,
};

/**
 * @typedef {object} AppConfig
 * @property {boolean} rumEnabled
 * @property {string} rumGeneration
 * @property {string} blocksSelector
 * @property {string[]} productionDomains
 * @property {string[]} lcpBlocks
 * @property {boolean} lazyStyles
 * @property {boolean} autoAppear
 * @property {string} favIcon
 * @property {string} iconsPath
 * @property {boolean} enableBlockLoader
 * @property {boolean} loadHeader
 * @property {boolean} loadFooter
 * @property {boolean} experimentsEnabled
 */

export default class HelixApp {
  /** @param {AppConfig} config */
  constructor(config = defaultConfig) {
    this.config = config;
    initHlx();

    if (this.config.rumEnabled) {
      this.sampleRUM('top');
      window.addEventListener('load', () => sampleRUM('load'));
      window.addEventListener('unhandledrejection', (event) => {
        sampleRUM('error', { source: event.reason.sourceURL, target: event.reason.line });
      });
      window.addEventListener('error', (event) => {
        sampleRUM('error', { source: event.filename, target: event.lineno });
      });
    }

    if (window.name.includes('performance')) {
      registerPerformanceLogger();
    }
  }

  static init(config) {
    return new HelixApp(config);
  }

  /**
   * Hook into the end of loadEager function.
   */
  withLoadEager(override) {
    this.loadEagerHook = override;
    return this;
  }

  /**
   * Hook into the end of loadLazy function.
   */
  withLoadLazy(override) {
    this.loadLazyHook = override;
    return this;
  }

  /**
   * Hook direct after block decoration and before waitForLCP.
   */
  withDecorateMain(hook) {
    this.decorateMainHook = hook;
    return this;
  }

  /**
   * Overrides the loadDelayed function.
   */
  withLoadDelayed(override) {
    this.loadDelayed = override;
    return this;
  }

  /**
   * Overrides the buildAutoBlocks function.
   */
  withBuildAutoBlocks(override) {
    this.buildAutoBlocks = override;
    return this;
  }

  /**
   * Overrides the loadHeader function.
   */
  withLoadHeader(override) {
    this.loadHeader = override;
    return this;
  }

  /**
   * Overrides the loadFooter function.
   */
  withLoadFooter(override) {
    this.loadFooter = override;
    return this;
  }

  /**
   * Overrides the decorateSections function.
   */
  withDecorateSections(override) {
    this.decorateSections = override;
    return this;
  }

  /**
   * Overrides the decorateSections function.
   */
  withDecorateBlock(override) {
    this.decorateBlock = override;
    return this;
  }

  /**
   * Overrides the decorateIcons function.
   */
  withDecorateIcons(override) {
    this.decorateIcons = override;
    return this;
  }

  /**
   * Overrides the decorateIcons function.
   */
  withDecorateButtons(override) {
    this.decorateButtons = override;
    return this;
  }

  /**
   * Decorate the page
   */
  async decorate() {
    await this.loadEager(document);
    await this.loadLazy(document);
    this.loadDelayed(document);
  }

  /**
   * Decorates all blocks in a container element.
   * @param {Element} main The container element
   * @preserve Exclude from terser
   */
  decorateBlocks(main) {
    main
      .querySelectorAll(this.config.blocksSelector ?? 'div.section > div > div')
      .forEach((block) => this.decorateBlock(block));
  }

  /**
   * Decorates the main element.
   * @param {Element} main The main element
   */
  decorateMain(main) {
    removeStylingFromImages(main);
    this.decorateButtons(main);
    this.decorateIcons(main);
    this.buildAutoBlocks(main);
    this.decorateSections(main);
    this.decorateBlocks(main);

    if (this.decorateMainHook) {
      this.decorateMainHook(main);
    }
  }

  /**
   * log RUM if part of the sample.
   * @param {string} checkpoint identifies the checkpoint in funnel
   * @param {Object} data additional data for RUM sample
   * @preserve Exclude from terser
   */
  sampleRUM(event, data = {}) {
    sampleRUM(event, data, this.config.rumGeneration);
  }

  /**
   * loads everything needed to get to LCP.
   * Should be overridden by subclasses.
   */
  async loadEager(doc) {
    decorateTemplateAndTheme();
    const main = doc.querySelector('main');
    if (main) {
      this.decorateMain(main);
      await this.waitForLCP(this.config.lcpBlocks ?? []);
    }
    if (this.loadEagerHook) {
      await this.loadEagerHook(doc);
    }
  }

  /**
   * loads everything that doesn't need to be delayed.
   */
  async loadLazy(doc) {
    const main = doc.querySelector('main');
    // In some cases we don't want the block loader to run (storybook)
    if (this.config.enableBlockLoader ?? defaultConfig.enableBlockLoader) {
      await loadBlocks(main);
    }

    const { hash } = window.location;
    if (hash) {
      try {
        const element = main.querySelector(hash);
        if (hash && element) element.scrollIntoView();
      } catch {
        /* do nothing */
      }
    }

    if (this.config.loadHeader ?? defaultConfig.loadHeader) {
      this.loadHeader(doc.querySelector('header'));
    }

    if (this.config.loadFooter ?? defaultConfig.loadFooter) {
      this.loadFooter(doc.querySelector('footer'));
    }

    if (this.config.lazyStyles ?? defaultConfig.lazyStyles) {
      loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
    }

    if (this.config.experimentsEnabled ?? defaultConfig.experimentsEnabled) {
      if (!window.hlx.lighthouse) decorateTesting();
    }

    addFavIcon(`${window.hlx.codeBasePath}${this.config.favIcon ?? defaultConfig.favIcon}`);
    if (this.loadLazyHook) {
      this.loadLazyHook(doc);
    }
    sampleRUM('lazy');
    sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
    sampleRUM.observe(main.querySelectorAll('picture > img'));
  }

  /**
   * loads everything that happens a lot later, without impacting
   * the user experience.
   */
  loadDelayed() { }

  /**
   * Builds all synthetic blocks in a container element.
   * @param {Element} main The container element
   */
  buildAutoBlocks() { }

  /**
   * Loads the header block.
   * @param {Element} header The header element
   */
  async loadHeader(header) {
    loadHeader(header);
  }

  /**
   * Loads the footer block.
   * @param {Element} footer The footer element
   */
  async loadFooter(footer) {
    loadFooter(footer);
  }

  /**
   * Decorates all sections in a container element.
   * @param {Element} main The container element
   * @preserve Exclude from terser
   */
  decorateSections(main) {
    decorateSections(main);
  }

  /**
   * Decorates a block.
   * @param {Element} block The block element
   * @preserve Exclude from terser
   */
  decorateBlock(block) {
    decorateBlock(block);
  }

  /**
   * Decorates all Icons.
   * @param {Element} block The block element
   * @preserve Exclude from terser
   */
  decorateIcons(main) {
    decorateIcons(main, this.config.iconsPath);
  }

  /**
   * Decorates paragraphs containing a single link as buttons.
   * @param {Element} block The block element
   * @preserve Exclude from terser
   */
  decorateButtons(main) {
    decorateButtons(main);
  }

  /**
   * load LCP block and/or wait for LCP in default content.
   * @preserve Exclude from terser
   */
  waitForLCP(lcpBlocks) {
    return waitForLCP(lcpBlocks, this.config.autoAppear ?? defaultConfig.autoAppear);
  }
}
