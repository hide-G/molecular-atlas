const atom = (element, x, y, z) => ({ element, position: [x, y, z] });
const bond = (from, to, order = 1) => ({ from, to, order });

export const elements = {
  H: { name: '水素', color: '#f4f7fb', radius: 0.31, vdw: 1.2, mass: '1.008' },
  C: { name: '炭素', color: '#303943', radius: 0.76, vdw: 1.7, mass: '12.011' },
  N: { name: '窒素', color: '#4f73ff', radius: 0.71, vdw: 1.55, mass: '14.007' },
  O: { name: '酸素', color: '#ff4f59', radius: 0.66, vdw: 1.52, mass: '15.999' },
};

const water = {
  id: 'water',
  name: '水',
  englishName: 'Water',
  formula: 'H₂O',
  category: '生命の基本分子',
  description: '酸素原子を中心に、2つの水素原子が約104.5°の角度で結合した折れ線形の分子です。',
  fact: '分子の形と電荷の偏りにより極性をもち、水素結合をつくります。',
  atoms: [
    atom('O', 0, 0, 0),
    atom('H', -0.757, 0.586, 0),
    atom('H', 0.757, 0.586, 0),
  ],
  bonds: [bond(0, 1), bond(0, 2)],
};

const carbonDioxide = {
  id: 'carbon-dioxide',
  name: '二酸化炭素',
  englishName: 'Carbon dioxide',
  formula: 'CO₂',
  category: '直線分子',
  description: '炭素原子の両側に酸素原子が並ぶ、結合角180°の直線形分子です。',
  fact: '各C=O結合には極性がありますが、対称形のため分子全体の双極子は打ち消されます。',
  atoms: [atom('O', -1.16, 0, 0), atom('C', 0, 0, 0), atom('O', 1.16, 0, 0)],
  bonds: [bond(0, 1, 2), bond(1, 2, 2)],
};

const ammonia = {
  id: 'ammonia',
  name: 'アンモニア',
  englishName: 'Ammonia',
  formula: 'NH₃',
  category: '三角錐形分子',
  description: '窒素原子を頂点とする三角錐形で、H–N–H結合角は約107°です。',
  fact: '窒素上の孤立電子対が、分子の形と塩基性に大きく関わっています。',
  atoms: [
    atom('N', 0, 0.18, 0),
    atom('H', 0, -0.36, 0.88),
    atom('H', 0.762, -0.36, -0.44),
    atom('H', -0.762, -0.36, -0.44),
  ],
  bonds: [bond(0, 1), bond(0, 2), bond(0, 3)],
};

const methane = {
  id: 'methane',
  name: 'メタン',
  englishName: 'Methane',
  formula: 'CH₄',
  category: '正四面体形分子',
  description: '炭素を中心に4つの水素が正四面体の頂点方向へ伸びる、対称性の高い分子です。',
  fact: 'H–C–H結合角は約109.5°で、炭素のsp³混成軌道を反映しています。',
  atoms: [
    atom('C', 0, 0, 0),
    atom('H', 0.629, 0.629, 0.629),
    atom('H', 0.629, -0.629, -0.629),
    atom('H', -0.629, 0.629, -0.629),
    atom('H', -0.629, -0.629, 0.629),
  ],
  bonds: [bond(0, 1), bond(0, 2), bond(0, 3), bond(0, 4)],
};

const ethanol = {
  id: 'ethanol',
  name: 'エタノール',
  englishName: 'Ethanol',
  formula: 'C₂H₆O',
  category: '有機分子',
  description: '2つの炭素からなる骨格にヒドロキシ基（–OH）をもつ、代表的なアルコールです。',
  fact: '炭化水素部分と極性をもつヒドロキシ基の両方を備え、水にもよく混ざります。',
  atoms: [
    atom('C', -0.76, 0, 0), atom('C', 0.76, 0, 0), atom('O', 1.48, 1.16, 0),
    atom('H', 2.42, 0.98, 0),
    atom('H', -1.15, 0.65, 0.8), atom('H', -1.15, 0.65, -0.8), atom('H', -1.15, -1.0, 0),
    atom('H', 1.12, -0.57, 0.86), atom('H', 1.12, -0.57, -0.86),
  ],
  bonds: [
    bond(0, 1), bond(1, 2), bond(2, 3),
    bond(0, 4), bond(0, 5), bond(0, 6), bond(1, 7), bond(1, 8),
  ],
};

function createBenzene() {
  const atoms = [];
  const bonds = [];
  for (let i = 0; i < 6; i += 1) {
    const angle = Math.PI / 2 + (i * Math.PI) / 3;
    atoms.push(atom('C', Math.cos(angle) * 1.4, Math.sin(angle) * 1.4, 0));
  }
  for (let i = 0; i < 6; i += 1) {
    const angle = Math.PI / 2 + (i * Math.PI) / 3;
    atoms.push(atom('H', Math.cos(angle) * 2.48, Math.sin(angle) * 2.48, 0));
    bonds.push(bond(i, (i + 1) % 6, i % 2 === 0 ? 2 : 1));
    bonds.push(bond(i, i + 6));
  }
  return {
    id: 'benzene',
    name: 'ベンゼン',
    englishName: 'Benzene',
    formula: 'C₆H₆',
    category: '芳香族分子',
    description: '6つの炭素が平面上で正六角形の環をつくる、芳香族化合物の基本構造です。',
    fact: '実際の6本のC–C結合は等価で、π電子が環全体に非局在化しています。模型では交互の結合で表現しています。',
    atoms,
    bonds,
  };
}

function createFullerene() {
  const phi = (1 + Math.sqrt(5)) / 2;
  const vertices = [];
  for (const a of [-1, 1]) {
    for (const b of [-1, 1]) {
      vertices.push([0, a, b * phi], [a, b * phi, 0], [b * phi, 0, a]);
    }
  }

  const edges = [];
  for (let i = 0; i < vertices.length; i += 1) {
    for (let j = i + 1; j < vertices.length; j += 1) {
      const distance = Math.hypot(
        vertices[i][0] - vertices[j][0],
        vertices[i][1] - vertices[j][1],
        vertices[i][2] - vertices[j][2],
      );
      if (Math.abs(distance - 2) < 0.001) edges.push([i, j]);
    }
  }

  const directedIndex = new Map();
  const atoms = [];
  const scale = 2.16;
  for (const [a, b] of edges) {
    for (const [from, to] of [[a, b], [b, a]]) {
      const v = vertices[from];
      const w = vertices[to];
      const index = atoms.length;
      directedIndex.set(`${from}-${to}`, index);
      atoms.push(atom(
        'C',
        ((2 * v[0] + w[0]) / 3) * scale,
        ((2 * v[1] + w[1]) / 3) * scale,
        ((2 * v[2] + w[2]) / 3) * scale,
      ));
    }
  }

  const bonds = [];
  for (const [a, b] of edges) {
    bonds.push(bond(directedIndex.get(`${a}-${b}`), directedIndex.get(`${b}-${a}`), 2));
  }
  for (let center = 0; center < vertices.length; center += 1) {
    const neighbors = edges.flatMap(([a, b]) => (a === center ? [b] : b === center ? [a] : []));
    for (let i = 0; i < neighbors.length; i += 1) {
      for (let j = i + 1; j < neighbors.length; j += 1) {
        const areAdjacent = edges.some(([a, b]) =>
          (a === neighbors[i] && b === neighbors[j]) || (a === neighbors[j] && b === neighbors[i]));
        if (areAdjacent) {
          bonds.push(bond(
            directedIndex.get(`${center}-${neighbors[i]}`),
            directedIndex.get(`${center}-${neighbors[j]}`),
          ));
        }
      }
    }
  }

  return {
    id: 'fullerene-c60',
    name: 'フラーレン C60',
    englishName: 'Buckminsterfullerene',
    formula: 'C₆₀',
    category: '炭素クラスター',
    description: '60個の炭素原子が、12個の五角形と20個の六角形からなる中空のかご状構造をつくります。',
    fact: 'サッカーボールと同じ切頂二十面体型の構造です。1985年に発見され、研究者らは1996年にノーベル化学賞を受賞しました。',
    atoms,
    bonds,
  };
}

export const molecules = [
  water,
  carbonDioxide,
  ammonia,
  methane,
  ethanol,
  createBenzene(),
  createFullerene(),
];
