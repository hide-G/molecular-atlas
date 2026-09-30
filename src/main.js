import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js';
import { Engine } from '@babylonjs/core/Engines/engine.js';
import { HighlightLayer } from '@babylonjs/core/Layers/highlightLayer.js';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight.js';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight.js';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js';
import { Mesh } from '@babylonjs/core/Meshes/mesh.js';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder.js';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode.js';
import { Scene } from '@babylonjs/core/scene.js';
import { elements, molecules } from './molecules.js';
import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="app-shell">
    <header class="topbar">
      <a class="brand" href="#" aria-label="Molecular Atlas ホーム">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span><strong>Molecular</strong> Atlas</span>
      </a>
      <p class="topbar-copy">分子のかたちを、手のひらに。</p>
      <div class="topbar-badge"><span></span> 3D INTERACTIVE</div>
    </header>

    <main class="workspace">
      <aside class="library-panel" aria-label="分子ライブラリ">
        <div class="panel-heading">
          <p class="eyebrow">MOLECULE LIBRARY</p>
          <h1>分子を選ぶ</h1>
          <p>${molecules.length}種類の構造を収録</p>
        </div>
        <div class="molecule-list" id="molecule-list"></div>
        <div class="library-foot">
          <span class="dot-grid" aria-hidden="true"></span>
          <p>DRAG TO ORBIT<br>SCROLL TO ZOOM</p>
        </div>
      </aside>

      <section class="viewer" aria-label="3D分子ビューア">
        <canvas id="render-canvas" aria-label="ドラッグで回転できる3D分子模型"></canvas>
        <div class="viewer-glow" aria-hidden="true"></div>
        <div class="viewer-toolbar" aria-label="ビューア操作">
          <button id="reset-view" class="icon-button" type="button" title="視点をリセット" aria-label="視点をリセット">
            <svg viewBox="0 0 24 24"><path d="M4 4v6h6M20 20v-6h-6M5.6 15a7 7 0 0 0 11.7 2.7L20 14M4 10l2.7-3.7A7 7 0 0 1 18.4 9"/></svg>
          </button>
          <button id="fullscreen" class="icon-button" type="button" title="全画面表示" aria-label="全画面表示">
            <svg viewBox="0 0 24 24"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/></svg>
          </button>
          <button id="snapshot" class="icon-button" type="button" title="画像を保存" aria-label="画像を保存">
            <svg viewBox="0 0 24 24"><path d="M4 7h3l1.5-2h7L17 7h3v12H4z"/><circle cx="12" cy="13" r="4"/></svg>
          </button>
        </div>
        <div class="display-switch" role="group" aria-label="表示形式">
          <button type="button" data-mode="ball-stick" class="active">球棒モデル</button>
          <button type="button" data-mode="space-fill">空間充填</button>
        </div>
        <div class="drag-hint"><span>↔</span> ドラッグして回転</div>
        <div id="atom-tooltip" class="atom-tooltip" aria-live="polite" hidden></div>
        <div class="loading" id="loading"><span></span><p>分子を組み立てています</p></div>
      </section>

      <aside class="detail-panel" aria-live="polite">
        <div class="molecule-index" id="molecule-index">01 / 07</div>
        <p class="eyebrow" id="category"></p>
        <h2 id="molecule-name"></h2>
        <p class="english-name" id="english-name"></p>
        <div class="formula-card">
          <span>分子式</span>
          <strong id="formula"></strong>
        </div>
        <p class="description" id="description"></p>
        <dl class="stats">
          <div><dt>原子数</dt><dd id="atom-count"></dd></div>
          <div><dt>結合数</dt><dd id="bond-count"></dd></div>
        </dl>
        <div class="fact-card">
          <span class="fact-icon">✦</span>
          <div><strong>MOLECULE NOTE</strong><p id="fact"></p></div>
        </div>
        <div class="legend-wrap">
          <p class="eyebrow">ELEMENTS</p>
          <div id="legend" class="legend"></div>
        </div>
        <label class="rotation-toggle">
          <span><strong>自動回転</strong><small>ゆっくり構造を眺める</small></span>
          <input id="auto-rotate" type="checkbox" checked />
          <i aria-hidden="true"></i>
        </label>
      </aside>
    </main>
  </div>
`;

const canvas = document.querySelector('#render-canvas');
const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
const scene = new Scene(engine);
scene.clearColor = new Color4(0.018, 0.047, 0.075, 1);
scene.ambientColor = new Color3(0.12, 0.17, 0.24);

const camera = new ArcRotateCamera('camera', Math.PI / 2.7, Math.PI / 2.25, 7, Vector3.Zero(), scene);
camera.attachControl(canvas, true);
camera.lowerRadiusLimit = 3;
camera.upperRadiusLimit = 25;
camera.wheelPrecision = 32;
camera.pinchPrecision = 75;
camera.panningSensibility = 0;
camera.inertia = 0.78;

const hemisphere = new HemisphericLight('hemisphere', new Vector3(0.2, 1, 0.3), scene);
hemisphere.intensity = 1.4;
hemisphere.diffuse = new Color3(0.7, 0.83, 1);
hemisphere.groundColor = new Color3(0.05, 0.11, 0.17);
const rimLight = new DirectionalLight('rim', new Vector3(0.6, -0.5, 0.8), scene);
rimLight.intensity = 1.6;
rimLight.diffuse = Color3.FromHexString('#6de5df');

const highlight = new HighlightLayer('selection-highlight', scene);
highlight.innerGlow = false;
highlight.outerGlow = true;
highlight.blurHorizontalSize = 1.5;
highlight.blurVerticalSize = 1.5;

const materialCache = new Map();
const bondMaterial = new StandardMaterial('bond-material', scene);
bondMaterial.diffuseColor = Color3.FromHexString('#83919e');
bondMaterial.specularColor = Color3.FromHexString('#c9f8f3');
bondMaterial.alpha = 0.82;

let moleculeRoot = null;
let atomMeshes = [];
let bondMeshes = [];
let selectedMesh = null;
let activeMolecule = null;
let displayMode = localStorage.getItem('molecular-atlas-mode') || 'ball-stick';
let autoRotate = true;
let isPointerDown = false;

function getAtomMaterial(symbol) {
  if (materialCache.has(symbol)) return materialCache.get(symbol);
  const material = new StandardMaterial(`material-${symbol}`, scene);
  material.diffuseColor = Color3.FromHexString(elements[symbol].color);
  material.specularColor = Color3.FromHexString(symbol === 'C' ? '#b8e1df' : '#ffffff');
  material.specularPower = 96;
  materialCache.set(symbol, material);
  return material;
}

function offsetBondPoints(start, end, order) {
  if (order === 1) return [[start, end]];
  const direction = end.subtract(start).normalize();
  const reference = Math.abs(Vector3.Dot(direction, Vector3.Up())) > 0.9 ? Vector3.Right() : Vector3.Up();
  const offset = Vector3.Cross(direction, reference).normalize().scale(0.105);
  return [[start.add(offset), end.add(offset)], [start.subtract(offset), end.subtract(offset)]];
}

function clearSelection() {
  if (selectedMesh) highlight.removeMesh(selectedMesh);
  selectedMesh = null;
  document.querySelector('#atom-tooltip').hidden = true;
}

function buildMolecule(molecule) {
  clearSelection();
  if (moleculeRoot) moleculeRoot.dispose(false, false);
  moleculeRoot = new TransformNode(`molecule-${molecule.id}`, scene);
  atomMeshes = [];
  bondMeshes = [];

  molecule.atoms.forEach((atomData, index) => {
    const element = elements[atomData.element];
    const visualRadius = element.radius * 0.53 + 0.12;
    const mesh = MeshBuilder.CreateSphere(`atom-${index}`, {
      diameter: visualRadius * 2,
      segments: molecule.atoms.length > 30 ? 16 : 28,
    }, scene);
    mesh.position = Vector3.FromArray(atomData.position);
    mesh.material = getAtomMaterial(atomData.element);
    mesh.parent = moleculeRoot;
    mesh.metadata = { type: 'atom', index, symbol: atomData.element, visualRadius };
    atomMeshes.push(mesh);
  });

  molecule.bonds.forEach((bondData, bondIndex) => {
    const start = Vector3.FromArray(molecule.atoms[bondData.from].position);
    const end = Vector3.FromArray(molecule.atoms[bondData.to].position);
    offsetBondPoints(start, end, bondData.order).forEach(([from, to], lineIndex) => {
      const mesh = MeshBuilder.CreateTube(`bond-${bondIndex}-${lineIndex}`, {
        path: [from, to],
        radius: molecule.atoms.length > 30 ? 0.075 : 0.095,
        tessellation: 10,
        cap: Mesh.CAP_ALL,
      }, scene);
      mesh.material = bondMaterial;
      mesh.parent = moleculeRoot;
      mesh.isPickable = false;
      bondMeshes.push(mesh);
    });
  });

  applyDisplayMode();
  resetCamera(false);
}

function applyDisplayMode() {
  const isSpaceFill = displayMode === 'space-fill';
  atomMeshes.forEach((mesh) => {
    const element = elements[mesh.metadata.symbol];
    const scale = isSpaceFill ? element.vdw / mesh.metadata.visualRadius : 1;
    mesh.scaling.setAll(scale);
  });
  bondMeshes.forEach((mesh) => { mesh.setEnabled(!isSpaceFill); });
  document.querySelectorAll('[data-mode]').forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === displayMode);
  });
}

function resetCamera(animate = true) {
  if (!activeMolecule) return;
  const maxDistance = Math.max(...activeMolecule.atoms.map(({ position }) => Math.hypot(...position)));
  const atomMargin = displayMode === 'space-fill'
    ? Math.max(...activeMolecule.atoms.map(({ element }) => elements[element].vdw))
    : 0.5;
  const targetRadius = Math.max(5.2, (maxDistance + atomMargin) * 2.5);
  if (!animate) {
    camera.alpha = Math.PI / 2.7;
    camera.beta = Math.PI / 2.25;
    camera.radius = targetRadius;
    return;
  }
  const start = { alpha: camera.alpha, beta: camera.beta, radius: camera.radius };
  const startedAt = performance.now();
  const duration = 420;
  const tick = (now) => {
    const linear = Math.min((now - startedAt) / duration, 1);
    const t = 1 - (1 - linear) ** 3;
    camera.alpha = start.alpha + (Math.PI / 2.7 - start.alpha) * t;
    camera.beta = start.beta + (Math.PI / 2.25 - start.beta) * t;
    camera.radius = start.radius + (targetRadius - start.radius) * t;
    if (linear < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function updateDetails(molecule, index) {
  document.querySelector('#molecule-index').textContent = `${String(index + 1).padStart(2, '0')} / ${String(molecules.length).padStart(2, '0')}`;
  document.querySelector('#category').textContent = molecule.category;
  document.querySelector('#molecule-name').textContent = molecule.name;
  document.querySelector('#english-name').textContent = molecule.englishName;
  document.querySelector('#formula').textContent = molecule.formula;
  document.querySelector('#description').textContent = molecule.description;
  document.querySelector('#atom-count').textContent = `${molecule.atoms.length}`;
  document.querySelector('#bond-count').textContent = `${molecule.bonds.length}`;
  document.querySelector('#fact').textContent = molecule.fact;

  const symbols = [...new Set(molecule.atoms.map(({ element }) => element))];
  document.querySelector('#legend').innerHTML = symbols.map((symbol) => `
    <span><i style="--element-color: ${elements[symbol].color}"></i>${elements[symbol].name}<b>${symbol}</b></span>
  `).join('');
}

function selectMolecule(id, skipLoading = false) {
  const index = molecules.findIndex((molecule) => molecule.id === id);
  if (index < 0) return;
  activeMolecule = molecules[index];
  document.querySelectorAll('.molecule-button').forEach((button) => {
    const active = button.dataset.id === id;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  updateDetails(activeMolecule, index);
  localStorage.setItem('molecular-atlas-molecule', id);

  const loading = document.querySelector('#loading');
  if (!skipLoading) loading.classList.remove('hidden');
  requestAnimationFrame(() => {
    buildMolecule(activeMolecule);
    requestAnimationFrame(() => loading.classList.add('hidden'));
  });
}

function renderLibrary() {
  const list = document.querySelector('#molecule-list');
  list.innerHTML = molecules.map((molecule, index) => `
    <button class="molecule-button" type="button" data-id="${molecule.id}" aria-pressed="false">
      <span class="list-number">${String(index + 1).padStart(2, '0')}</span>
      <span class="molecule-copy"><strong>${molecule.name}</strong><small>${molecule.englishName}</small></span>
      <span class="list-formula">${molecule.formula}</span>
    </button>
  `).join('');
  list.addEventListener('click', (event) => {
    const button = event.target.closest('.molecule-button');
    if (button) selectMolecule(button.dataset.id);
  });
}

scene.onPointerPick = (_event, pickInfo) => {
  const mesh = pickInfo.pickedMesh;
  if (!mesh?.metadata || mesh.metadata.type !== 'atom') {
    clearSelection();
    return;
  }
  clearSelection();
  selectedMesh = mesh;
  highlight.addMesh(mesh, Color3.FromHexString('#79f5e7'));
  const { index, symbol } = mesh.metadata;
  const data = elements[symbol];
  const tooltip = document.querySelector('#atom-tooltip');
  tooltip.innerHTML = `<i style="--element-color:${data.color}"></i><span><b>${data.name} (${symbol})</b><small>原子 #${index + 1} ・ 原子量 ${data.mass}</small></span>`;
  tooltip.hidden = false;
};

canvas.addEventListener('pointerdown', () => { isPointerDown = true; });
window.addEventListener('pointerup', () => { isPointerDown = false; });
canvas.addEventListener('pointermove', () => {
  const pick = scene.pick(scene.pointerX, scene.pointerY);
  canvas.style.cursor = pick?.pickedMesh?.metadata?.type === 'atom' ? 'pointer' : 'grab';
});

document.querySelectorAll('[data-mode]').forEach((button) => {
  button.addEventListener('click', () => {
    displayMode = button.dataset.mode;
    localStorage.setItem('molecular-atlas-mode', displayMode);
    applyDisplayMode();
    resetCamera();
  });
});

document.querySelector('#reset-view').addEventListener('click', () => resetCamera());
document.querySelector('#auto-rotate').addEventListener('change', (event) => { autoRotate = event.target.checked; });
document.querySelector('#fullscreen').addEventListener('click', () => {
  const viewer = document.querySelector('.viewer');
  if (document.fullscreenElement) document.exitFullscreen();
  else viewer.requestFullscreen();
});
document.querySelector('#snapshot').addEventListener('click', () => {
  scene.render();
  const link = document.createElement('a');
  link.download = `${activeMolecule.id}-molecular-atlas.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
});

document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'r') resetCamera();
  if (event.code === 'Space' && event.target === document.body) {
    event.preventDefault();
    const checkbox = document.querySelector('#auto-rotate');
    checkbox.checked = !checkbox.checked;
    autoRotate = checkbox.checked;
  }
});

scene.onBeforeRenderObservable.add(() => {
  if (autoRotate && !isPointerDown && moleculeRoot) moleculeRoot.rotation.y += engine.getDeltaTime() * 0.00016;
});

engine.runRenderLoop(() => scene.render());
window.addEventListener('resize', () => engine.resize());

renderLibrary();
const savedMolecule = localStorage.getItem('molecular-atlas-molecule');
selectMolecule(molecules.some(({ id }) => id === savedMolecule) ? savedMolecule : molecules[0].id, true);
