## Functions

<dl>
<dt><a href="#withLoadEager">withLoadEager()</a></dt>
<dd><p>Hook into the end of loadEager function.</p>
</dd>
<dt><a href="#withLoadLazy">withLoadLazy()</a></dt>
<dd><p>Hook into the end of loadLazy function.</p>
</dd>
<dt><a href="#withLoadDelayed">withLoadDelayed()</a></dt>
<dd><p>Overrides the loadDelayed function.</p>
</dd>
<dt><a href="#withBuildAutoBlocks">withBuildAutoBlocks()</a></dt>
<dd><p>Overrides the buildAutoBlocks function.</p>
</dd>
<dt><a href="#withLoadHeader">withLoadHeader()</a></dt>
<dd><p>Overrides the loadHeader function.</p>
</dd>
<dt><a href="#withLoadFooter">withLoadFooter()</a></dt>
<dd><p>Overrides the loadFooter function.</p>
</dd>
<dt><a href="#withDecorateSections">withDecorateSections()</a></dt>
<dd><p>Overrides the decorateSections function.</p>
</dd>
<dt><a href="#withDecorateBlock">withDecorateBlock()</a></dt>
<dd><p>Overrides the decorateSections function.</p>
</dd>
<dt><a href="#withDecorateIcons">withDecorateIcons()</a></dt>
<dd><p>Overrides the decorateIcons function.</p>
</dd>
<dt><a href="#withDecorateButtons">withDecorateButtons()</a></dt>
<dd><p>Overrides the decorateIcons function.</p>
</dd>
<dt><a href="#withPostDecorateBlockHook">withPostDecorateBlockHook()</a></dt>
<dd><p>Hook direct after block decoration and before waitForLCP.</p>
</dd>
<dt><a href="#decorate">decorate()</a></dt>
<dd><p>Decorate the page</p>
</dd>
<dt><a href="#decorateBlocks">decorateBlocks(main)</a></dt>
<dd><p>Decorates all blocks in a container element.</p>
</dd>
<dt><a href="#decorateMain">decorateMain(main)</a></dt>
<dd><p>Decorates the main element.</p>
</dd>
<dt><a href="#sampleRUM">sampleRUM(checkpoint, data)</a></dt>
<dd><p>log RUM if part of the sample.</p>
</dd>
<dt><a href="#loadEager">loadEager()</a></dt>
<dd><p>loads everything needed to get to LCP.
Should be overridden by subclasses.</p>
</dd>
<dt><a href="#loadLazy">loadLazy()</a></dt>
<dd><p>loads everything that doesn&#39;t need to be delayed.</p>
</dd>
<dt><a href="#loadDelayed">loadDelayed()</a></dt>
<dd><p>loads everything that happens a lot later, without impacting
the user experience.</p>
</dd>
<dt><a href="#buildAutoBlocks">buildAutoBlocks(main)</a></dt>
<dd><p>Builds all synthetic blocks in a container element.</p>
</dd>
<dt><a href="#loadHeader">loadHeader(header)</a></dt>
<dd><p>Loads the header block.</p>
</dd>
<dt><a href="#loadFooter">loadFooter(footer)</a></dt>
<dd><p>Loads the footer block.</p>
</dd>
<dt><a href="#decorateSections">decorateSections(main)</a></dt>
<dd><p>Decorates all sections in a container element.</p>
</dd>
<dt><a href="#decorateBlock">decorateBlock(block)</a></dt>
<dd><p>Decorates a block.</p>
</dd>
<dt><a href="#decorateIcons">decorateIcons(block)</a></dt>
<dd><p>Decorates all Icons.</p>
</dd>
<dt><a href="#decorateButtons">decorateButtons(block)</a></dt>
<dd><p>Decorates paragraphs containing a single link as buttons.</p>
</dd>
<dt><a href="#waitForLCP">waitForLCP()</a></dt>
<dd><p>load LCP block and/or wait for LCP in default content.</p>
</dd>
<dt><a href="#initHlx">initHlx()</a></dt>
<dd><p>Initializes helix</p>
</dd>
<dt><a href="#addPublishDependencies">addPublishDependencies(url)</a></dt>
<dd><p>Adds one or more URLs to the dependencies for publishing.</p>
</dd>
<dt><a href="#decorateBlock">decorateBlock(block)</a></dt>
<dd><p>Decorates a block.</p>
</dd>
<dt><a href="#decorateBlocks">decorateBlocks(main)</a></dt>
<dd><p>Decorates all blocks in a container element.</p>
</dd>
<dt><a href="#toClassName">toClassName(name)</a> ⇒ <code>string</code></dt>
<dd><p>Sanitizes a name for use as class name.</p>
</dd>
<dt><a href="#toCamelCase">toCamelCase(name)</a> ⇒ <code>string</code></dt>
<dd><p>Sanitizes a name for use as a js property name.</p>
</dd>
<dt><a href="#readBlockConfig">readBlockConfig(block)</a> ⇒ <code>object</code></dt>
<dd><p>Extracts the config from a block.</p>
</dd>
<dt><a href="#decorateSections">decorateSections(main)</a></dt>
<dd><p>Decorates all sections in a container element.</p>
</dd>
<dt><a href="#normalizeHeadings">normalizeHeadings(elem, allowedHeadings)</a></dt>
<dd><p>Normalizes all headings within a container element.</p>
</dd>
<dt><a href="#addFavIcon">addFavIcon(href)</a></dt>
<dd><p>Adds the favicon.</p>
</dd>
<dt><a href="#decorateTemplateAndTheme">decorateTemplateAndTheme()</a></dt>
<dd><p>Set template (page structure) and theme (page styles).</p>
</dd>
<dt><a href="#decorateIcons">decorateIcons(element)</a></dt>
<dd><p>Replace icons with inline SVG and prefix with codeBasePath.</p>
</dd>
<dt><a href="#decorateButtons">decorateButtons(element)</a></dt>
<dd><p>Decorates paragraphs containing a single link as buttons.</p>
</dd>
<dt><a href="#createOptimizedPicture">createOptimizedPicture(src, eager, breakpoints)</a></dt>
<dd><p>Returns a picture element with webp and fallbacks</p>
</dd>
<dt><a href="#getOptimizedImagePath">getOptimizedImagePath(src, breakpoints)</a></dt>
<dd><p>Given a set of breakpoints, returns the appropriate image URL for the most optimized version.</p>
</dd>
<dt><a href="#removeStylingFromImages">removeStylingFromImages(main)</a></dt>
<dd><p>Removes formatting from images.</p>
</dd>
<dt><a href="#loadScript">loadScript(url, callback, type)</a> ⇒ <code>Element</code></dt>
<dd><p>loads a script by adding a script tag to the head.</p>
</dd>
<dt><a href="#loadCSS">loadCSS(href)</a></dt>
<dd><p>Loads a CSS file.</p>
</dd>
<dt><a href="#updateSectionsStatus">updateSectionsStatus(main)</a></dt>
<dd><p>Updates all section status in a container element.</p>
</dd>
<dt><a href="#loadBlock">loadBlock(block)</a></dt>
<dd><p>Loads JS and CSS for a block.</p>
</dd>
<dt><a href="#loadBlocks">loadBlocks(main)</a></dt>
<dd><p>Loads JS and CSS for all blocks in a container element.</p>
</dd>
<dt><a href="#buildBlock">buildBlock(blockName, content)</a></dt>
<dd><p>Builds a block DOM Element from a two dimensional array</p>
</dd>
<dt><a href="#loadHeader">loadHeader(header)</a></dt>
<dd><p>Loads the header block.</p>
</dd>
<dt><a href="#loadFooter">loadFooter(footer)</a></dt>
<dd><p>Loads the footer block.</p>
</dd>
<dt><a href="#waitForLCP">waitForLCP()</a></dt>
<dd><p>load LCP block and/or wait for LCP in default content.</p>
</dd>
<dt><a href="#fetchPlaceholders">fetchPlaceholders(prefix)</a></dt>
<dd><p>Gets placeholders object</p>
</dd>
<dt><a href="#getMetadata">getMetadata(name)</a> ⇒ <code>string</code></dt>
<dd><p>Retrieves the content of metadata tags.</p>
</dd>
<dt><a href="#sampleRUM">sampleRUM(checkpoint, data)</a></dt>
<dd><p>log RUM if part of the sample.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#AppConfig">AppConfig</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="withLoadEager"></a>

## withLoadEager()
Hook into the end of loadEager function.

**Kind**: global function  
<a name="withLoadLazy"></a>

## withLoadLazy()
Hook into the end of loadLazy function.

**Kind**: global function  
<a name="withLoadDelayed"></a>

## withLoadDelayed()
Overrides the loadDelayed function.

**Kind**: global function  
<a name="withBuildAutoBlocks"></a>

## withBuildAutoBlocks()
Overrides the buildAutoBlocks function.

**Kind**: global function  
<a name="withLoadHeader"></a>

## withLoadHeader()
Overrides the loadHeader function.

**Kind**: global function  
<a name="withLoadFooter"></a>

## withLoadFooter()
Overrides the loadFooter function.

**Kind**: global function  
<a name="withDecorateSections"></a>

## withDecorateSections()
Overrides the decorateSections function.

**Kind**: global function  
<a name="withDecorateBlock"></a>

## withDecorateBlock()
Overrides the decorateSections function.

**Kind**: global function  
<a name="withDecorateIcons"></a>

## withDecorateIcons()
Overrides the decorateIcons function.

**Kind**: global function  
<a name="withDecorateButtons"></a>

## withDecorateButtons()
Overrides the decorateIcons function.

**Kind**: global function  
<a name="withPostDecorateBlockHook"></a>

## withPostDecorateBlockHook()
Hook direct after block decoration and before waitForLCP.

**Kind**: global function  
<a name="decorate"></a>

## decorate()
Decorate the page

**Kind**: global function  
<a name="decorateBlocks"></a>

## decorateBlocks(main)
Decorates all blocks in a container element.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| main | <code>Element</code> | The container element |

<a name="decorateMain"></a>

## decorateMain(main)
Decorates the main element.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| main | <code>Element</code> | The main element |

<a name="sampleRUM"></a>

## sampleRUM(checkpoint, data)
log RUM if part of the sample.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| checkpoint | <code>string</code> | identifies the checkpoint in funnel |
| data | <code>Object</code> | additional data for RUM sample |

<a name="loadEager"></a>

## loadEager()
loads everything needed to get to LCP.
Should be overridden by subclasses.

**Kind**: global function  
<a name="loadLazy"></a>

## loadLazy()
loads everything that doesn't need to be delayed.

**Kind**: global function  
<a name="loadDelayed"></a>

## loadDelayed()
loads everything that happens a lot later, without impacting
the user experience.

**Kind**: global function  
<a name="buildAutoBlocks"></a>

## buildAutoBlocks(main)
Builds all synthetic blocks in a container element.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| main | <code>Element</code> | The container element |

<a name="loadHeader"></a>

## loadHeader(header)
Loads the header block.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| header | <code>Element</code> | The header element |

<a name="loadFooter"></a>

## loadFooter(footer)
Loads the footer block.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| footer | <code>Element</code> | The footer element |

<a name="decorateSections"></a>

## decorateSections(main)
Decorates all sections in a container element.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| main | <code>Element</code> | The container element |

<a name="decorateBlock"></a>

## decorateBlock(block)
Decorates a block.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Element</code> | The block element |

<a name="decorateIcons"></a>

## decorateIcons(block)
Decorates all Icons.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Element</code> | The block element |

<a name="decorateButtons"></a>

## decorateButtons(block)
Decorates paragraphs containing a single link as buttons.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Element</code> | The block element |

<a name="waitForLCP"></a>

## waitForLCP()
load LCP block and/or wait for LCP in default content.

**Kind**: global function  
**License**: Exclude from terser  
<a name="initHlx"></a>

## initHlx()
Initializes helix

**Kind**: global function  
**License**: Exclude from terser  
<a name="addPublishDependencies"></a>

## addPublishDependencies(url)
Adds one or more URLs to the dependencies for publishing.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> \| <code>Array.&lt;string&gt;</code> | The URL(s) to add as dependencies |

<a name="decorateBlock"></a>

## decorateBlock(block)
Decorates a block.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Element</code> | The block element |

<a name="decorateBlocks"></a>

## decorateBlocks(main)
Decorates all blocks in a container element.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| main | <code>Element</code> | The container element |

<a name="toClassName"></a>

## toClassName(name) ⇒ <code>string</code>
Sanitizes a name for use as class name.

**Kind**: global function  
**Returns**: <code>string</code> - The class name  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The unsanitized name |

<a name="toCamelCase"></a>

## toCamelCase(name) ⇒ <code>string</code>
Sanitizes a name for use as a js property name.

**Kind**: global function  
**Returns**: <code>string</code> - The camelCased name  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The unsanitized name |

<a name="readBlockConfig"></a>

## readBlockConfig(block) ⇒ <code>object</code>
Extracts the config from a block.

**Kind**: global function  
**Returns**: <code>object</code> - The block config  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Element</code> | The block element |

<a name="decorateSections"></a>

## decorateSections(main)
Decorates all sections in a container element.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| main | <code>Element</code> | The container element |

<a name="normalizeHeadings"></a>

## normalizeHeadings(elem, allowedHeadings)
Normalizes all headings within a container element.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Element</code> | The container element |
| allowedHeadings | <code>Array.&lt;string&gt;</code> | The list of allowed headings (h1 ... h6) |

<a name="addFavIcon"></a>

## addFavIcon(href)
Adds the favicon.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| href | <code>string</code> | The favicon URL |

<a name="decorateTemplateAndTheme"></a>

## decorateTemplateAndTheme()
Set template (page structure) and theme (page styles).

**Kind**: global function  
<a name="decorateIcons"></a>

## decorateIcons(element)
Replace icons with inline SVG and prefix with codeBasePath.

**Kind**: global function  

| Param | Type |
| --- | --- |
| element | <code>Element</code> | 

<a name="decorateButtons"></a>

## decorateButtons(element)
Decorates paragraphs containing a single link as buttons.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | container element |

<a name="createOptimizedPicture"></a>

## createOptimizedPicture(src, eager, breakpoints)
Returns a picture element with webp and fallbacks

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | The image URL |
| eager | <code>boolean</code> | load image eager |
| breakpoints | <code>Array</code> | breakpoints and corresponding params (eg. width) |

<a name="getOptimizedImagePath"></a>

## getOptimizedImagePath(src, breakpoints)
Given a set of breakpoints, returns the appropriate image URL for the most optimized version.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | The image URL |
| breakpoints | <code>Array</code> | breakpoints and corresponding params (eg. width) |

<a name="removeStylingFromImages"></a>

## removeStylingFromImages(main)
Removes formatting from images.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| main | <code>Element</code> | The container element |

<a name="loadScript"></a>

## loadScript(url, callback, type) ⇒ <code>Element</code>
loads a script by adding a script tag to the head.

**Kind**: global function  
**Returns**: <code>Element</code> - script element  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL of the js file |
| callback | <code>function</code> | callback on load |
| type | <code>string</code> | type attribute of script tag |

<a name="loadCSS"></a>

## loadCSS(href)
Loads a CSS file.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| href | <code>string</code> | The path to the CSS file |

<a name="updateSectionsStatus"></a>

## updateSectionsStatus(main)
Updates all section status in a container element.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| main | <code>Element</code> | The container element |

<a name="loadBlock"></a>

## loadBlock(block)
Loads JS and CSS for a block.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Element</code> | The block element |

<a name="loadBlocks"></a>

## loadBlocks(main)
Loads JS and CSS for all blocks in a container element.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| main | <code>Element</code> | The container element |

<a name="buildBlock"></a>

## buildBlock(blockName, content)
Builds a block DOM Element from a two dimensional array

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| blockName | <code>string</code> | name of the block |
| content | <code>any</code> | two dimensional array or string or object of content |

<a name="loadHeader"></a>

## loadHeader(header)
Loads the header block.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| header | <code>Element</code> | The header element |

<a name="loadFooter"></a>

## loadFooter(footer)
Loads the footer block.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| footer | <code>Element</code> | The footer element |

<a name="waitForLCP"></a>

## waitForLCP()
load LCP block and/or wait for LCP in default content.

**Kind**: global function  
**License**: Exclude from terser  
<a name="fetchPlaceholders"></a>

## fetchPlaceholders(prefix)
Gets placeholders object

**Kind**: global function  

| Param | Type |
| --- | --- |
| prefix | <code>string</code> | 

<a name="getMetadata"></a>

## getMetadata(name) ⇒ <code>string</code>
Retrieves the content of metadata tags.

**Kind**: global function  
**Returns**: <code>string</code> - The metadata value(s)  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The metadata name (or property) |

<a name="sampleRUM"></a>

## sampleRUM(checkpoint, data)
log RUM if part of the sample.

**Kind**: global function  
**License**: Exclude from terser  

| Param | Type | Description |
| --- | --- | --- |
| checkpoint | <code>string</code> | identifies the checkpoint in funnel |
| data | <code>Object</code> | additional data for RUM sample |

<a name="AppConfig"></a>

## AppConfig : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| rumEnabled | <code>boolean</code> | 
| rumGeneration | <code>string</code> | 
| blocksSelector | <code>string</code> | 
| productionDomains | <code>Array.&lt;string&gt;</code> | 
| lcpBlocks | <code>Array.&lt;string&gt;</code> | 
| lazyStyles | <code>boolean</code> | 
| autoAppear | <code>boolean</code> | 
| favIcon | <code>string</code> | 

