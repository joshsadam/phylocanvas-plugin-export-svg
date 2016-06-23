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

  getSerializedSvg() {
    // const svgCtx = new C2S(this.canvas.width, this.canvas.height);
    const svgCtx = new C2S(400, 300);

    svgCtx.___test = 1;

    const canvasCxt = this.tree.canvas;

    // svgCtx.canvas = this.canvas;

    // const currentElement = svgCtx.__currentElement;

    this.tree.canvas = svgCtx;
    // svgCtx.__currentElement = currentElement;

    svgCtx.save();
    this.tree.draw(svgCtx);
    svgCtx.restore();

    const serializedSVG = svgCtx.getSerializedSvg();
    const svg = svgCtx.getSvg();
    console.log({ serializedSVG, svg });

    this.tree.canvas = canvasCxt;
    this.tree.draw();

    return svg;
  }

  getSvg() {
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
