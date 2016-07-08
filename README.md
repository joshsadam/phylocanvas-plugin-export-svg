# Phylocanvas Export SVG Plugin
Export Phylocanvas trees as SVG.

## Usage
```
npm install phylocanvas phylocanvas-plugin-export-svg
```
```javascript
import Phylocanvas from 'phylocanvas';
import exportSvgPlugin from 'phylocanvas-plugin-export-svg';

Phylocanvas.plugin(exportSvgPlugin);

const tree = Phylocanvas.createTree('id', {
  // config defaults
  exportSvg: {},
})

tree.exportSVG.getSVG();
// or
tree.exportSVG.getSerialisedSVG();
```

## Methods

* `getSVG()`: returns the shadow inline SVG element
* `getSerialisedSVG(fixNamedEntities = false)`: returns string serialised SVG. Pass `fixNamedEntities` as `true` to convert named entities to numbered entities.
