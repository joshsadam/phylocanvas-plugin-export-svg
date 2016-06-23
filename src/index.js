import { Tree } from 'phylocanvas';
import C2S from 'canvas2svg';

const DEFAULTS = {
};

class ExportSVG {

  constructor(tree, options = {}) {
    this.tree = tree;
    this.canvas = tree.canvas.canvas;
    this.cxt = tree.canvas;

    Object.assign(this, DEFAULTS, options);
  }

  getSVG() {
    // save a copy of the tree original drawing context
    const originalCxt = this.tree.canvas;

    // replace the tree drawing context with the SVG drawing context
    const svgCtx = new C2S(this.canvas.width, this.canvas.height);
    this.tree.canvas = svgCtx;

    // draw the tree on the SVG drawing context
    svgCtx.save();
    this.tree.draw(svgCtx);
    svgCtx.restore();

    // get the SVG element
    const svg = svgCtx.getSvg();

    // restore the tree original drawing context
    this.tree.canvas = originalCxt;
    this.tree.draw();

    return svg;
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
