import 'phylocanvas/polyfill';

import Phylocanvas from 'phylocanvas';
import scalebarPlugin from '../src';

Phylocanvas.plugin(scalebarPlugin);

const tree = Phylocanvas.createTree('phylocanvas', {
  scalebar: {
    fillStyle: 'green',
    strokeStyle: 'red',
  },
  padding: 10,
});

tree.setTreeType('rectangular');
tree.containerElement.style.overflow = 'hidden';

const subtreeButton = document.createElement('button');
subtreeButton.innerHTML = 'subtree';
subtreeButton.addEventListener('click', () => {
  const branch = tree.branches.E;
  branch.redrawTreeFromBranch();
});
document.body.appendChild(subtreeButton);

const resetButton = document.createElement('button');
resetButton.innerHTML = 'Redraw Original';
resetButton.addEventListener('click', () => tree.redrawOriginalTree());
document.body.appendChild(resetButton);

const textarea = document.createElement('textarea');
const svgDiv = document.getElementById('svg');

const exportButton = document.createElement('button');
exportButton.innerHTML = 'Export Serialised SVG';
exportButton.addEventListener('click', () => {
  const svg = tree.exportSVG.getSVG();
  textarea.innerHTML = svg.outerHTML;
  svgDiv.appendChild(svg);
});
document.body.appendChild(exportButton);

document.body.appendChild(textarea);

tree.on('error', event => { throw event.error; });

tree.on('loaded', () => console.log('loaded'));

tree.load('((TestLabel:0.2,(C:0.3,(G:0.2,H:0.3)D:0.4)E:0.5)F:0.1)A;');

window.tree = tree;
