import C2S from 'canvas2svg';

class ExportSVG {

  constructor(tree, options = {}) {
    this.tree = tree;
    this.canvas = tree.canvas.canvas;
    Object.assign(this, options);
  }

  exportSVG(method, args = []) {
    // save a copy of the tree original drawing context
    const originalCxt = this.tree.canvas;

    // replace the tree drawing context with the SVG drawing context
    const { width, height } = this.tree.canvas.canvas;
    const svgCtx = new C2S(width, height);
    this.tree.canvas = svgCtx;

    // draw the tree on the SVG drawing context
    this.tree.draw();

    // get the SVG element
    const svg = svgCtx[method].apply(svgCtx, args);

    // restore the tree original drawing context
    this.tree.canvas = originalCxt;
    this.tree.draw();

    return svg;
  }

  getSVG() {
    return this.exportSVG('getSvg');
  }

  getSerialisedSVG(fixNamedEntities = false) {
    return this.exportSVG('getSerializedSvg', [ fixNamedEntities ]);
  }

}

export default function plugin(decorate) {
  decorate(this, 'createTree', (delegate, args) => {
    const tree = delegate(...args);
    const [ , config = {} ] = args;
    tree.exportSVG = new ExportSVG(tree, config.exportSVG);
    return tree;
  });

  this.ExportSVG = ExportSVG;
}
