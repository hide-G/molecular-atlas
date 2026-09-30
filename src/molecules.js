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

const atomsFromCoordinates = (symbols, coordinates) =>
  symbols.map((element, index) => atom(element, ...coordinates[index]));
const bondsFromIndices = (entries) => entries.map(([from, to, order = 1]) => bond(from, to, order));

const lacticAcidCoordinates = [
  [-1.391, -1.1177, 0.183], [1.4821, 1.041, 0.2494], [1.2275, -1.1171, -0.4061],
  [-0.7091, 0.1081, 0.4023], [-1.3584, 1.1687, -0.4696], [0.7489, -0.0829, 0.0411],
  [-0.7771, 0.3549, 1.4667], [-1.2762, 0.9076, -1.5309], [-0.8944, 2.1491, -0.3244],
  [-2.427, 1.2531, -0.2446], [-2.2883, -1.0228, 0.5458], [2.4235, 0.9141, 0.0044],
];
const lacticAcidBonds = bondsFromIndices([
  [0, 3], [0, 10], [1, 5], [1, 11], [2, 5, 2], [3, 4], [3, 5], [3, 6],
  [4, 7], [4, 8], [4, 9],
]);

function createLacticAcid(stereo) {
  const isR = stereo === 'R';
  const atoms = atomsFromCoordinates(
    ['O', 'O', 'O', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H'],
    lacticAcidCoordinates.map(([x, y, z]) => [isR ? x : -x, y, z]),
  );
  return {
    id: `lactic-acid-${stereo.toLowerCase()}`,
    name: `(${stereo})-乳酸`,
    englishName: `(${stereo})-Lactic acid`,
    formula: 'C₃H₆O₃',
    category: `鏡像異性体・${stereo}体`,
    description: '中心の炭素に–OH、–COOH、–CH₃、Hという4種類の基が結合した、キラルな分子です。',
    fact: `結合の種類と順序は同じでも、(${isR ? 'S' : 'R'})体とは鏡像関係にあり、回転だけでは完全に重ね合わせられません。`,
    stereo,
    mirrorId: `lactic-acid-${isR ? 's' : 'r'}`,
    sourceLabel: 'PubChem 3D conformer reference · CID 61503 / 107689',
    sourceUrl: isR
      ? 'https://pubchem.ncbi.nlm.nih.gov/compound/61503'
      : 'https://pubchem.ncbi.nlm.nih.gov/compound/107689',
    atoms,
    bonds: lacticAcidBonds,
  };
}

const betaDGlucose = {
  id: 'beta-d-glucose',
  name: 'β-D-グルコース',
  englishName: 'β-D-Glucopyranose',
  formula: 'C₆H₁₂O₆',
  category: '糖・多官能基分子',
  description: '6員環の骨格に多数のヒドロキシ基をもつ単糖で、生体の主要なエネルギー源となるグルコースの環状構造です。',
  fact: '環状構造には5つの不斉炭素があり、置換基の立体的な向きが分子の性質を決めます。',
  sourceLabel: 'PubChem 3D conformer · CID 64689',
  sourceUrl: 'https://pubchem.ncbi.nlm.nih.gov/compound/64689',
  atoms: atomsFromCoordinates(
    ['O', 'O', 'O', 'O', 'O', 'O', 'C', 'C', 'C', 'C', 'C', 'C',
      'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
    [
      [-0.6679, 1.1587, 0.257], [-0.887, -2.4483, -0.3388], [1.8623, -2.0693, 0.4696],
      [2.8609, 0.5414, -0.4619], [1.1222, 2.6552, 0.2574], [-3.3742, 0.9717, -0.1865],
      [-0.3727, -1.247, 0.23], [1.0856, -1.0709, -0.194], [-1.2211, -0.0621, -0.2375],
      [1.6082, 0.3151, 0.1839], [0.6388, 1.4132, -0.2534], [-2.655, -0.1577, 0.274],
      [-0.4248, -1.3522, 1.3206], [1.2066, -1.2487, -1.2697], [-1.2548, -0.0098, -1.3343],
      [1.7952, 0.3598, 1.2636], [0.5967, 1.5141, -1.344], [-2.6916, -0.1535, 1.3685],
      [-3.1564, -1.0581, -0.0922], [-0.8514, -2.3615, -1.3066], [1.4973, -2.9356, 0.22],
      [2.7165, 0.4989, -1.4227], [1.4876, 2.5033, 1.1448], [-2.9192, 1.7652, 0.144],
    ],
  ),
  bonds: bondsFromIndices([
    [0, 8], [0, 10], [1, 6], [1, 19], [2, 7], [2, 20], [3, 9], [3, 21],
    [4, 10], [4, 22], [5, 11], [5, 23], [6, 7], [6, 8], [6, 12], [7, 9],
    [7, 13], [8, 11], [8, 14], [9, 10], [9, 15], [10, 16], [11, 17], [11, 18],
  ]),
};

const caffeine = {
  id: 'caffeine',
  name: 'カフェイン',
  englishName: 'Caffeine',
  formula: 'C₈H₁₀N₄O₂',
  category: '複素環式化合物',
  description: '炭素・水素・窒素・酸素の24原子からなるアルカロイドで、縮合した2つの環と3つのメチル基をもちます。',
  fact: 'アデノシン受容体への作用で知られます。環の主要部分はほぼ平面ですが、メチル基の水素は立体的に配置されます。',
  sourceLabel: 'PubChem 3D conformer · CID 2519',
  sourceUrl: 'https://pubchem.ncbi.nlm.nih.gov/compound/2519',
  atoms: atomsFromCoordinates(
    ['O', 'O', 'N', 'N', 'N', 'N', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C',
      'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
    [
      [0.47, 2.5688, 0.0006], [-3.1271, -0.4436, -0.0003], [-0.9686, -1.3125, 0],
      [2.2182, 0.1412, -0.0003], [-1.3477, 1.0797, -0.0001], [1.4119, -1.9372, 0.0002],
      [0.8579, 0.2592, -0.0008], [0.3897, -1.0264, -0.0004], [0.0307, 1.422, -0.0006],
      [-1.9061, -0.2495, -0.0004], [2.5032, -1.1998, 0.0003], [-1.4276, -2.696, 0.0008],
      [3.1926, 1.2061, 0.0003], [-2.2969, 2.1881, 0.0007], [3.5163, -1.5787, 0.0008],
      [-1.0451, -3.1973, -0.8937], [-2.5186, -2.7596, 0.0011], [-1.0447, -3.1963, 0.8957],
      [4.1992, 0.7801, 0.0002], [3.0468, 1.8092, -0.8992], [3.0466, 1.8083, 0.9004],
      [-1.8087, 3.1651, -0.0003], [-2.9322, 2.1027, 0.8881], [-2.9346, 2.1021, -0.8849],
    ],
  ),
  bonds: bondsFromIndices([
    [0, 8, 2], [1, 9, 2], [2, 7], [2, 9], [2, 11], [3, 6], [3, 10], [3, 12],
    [4, 8], [4, 9], [4, 13], [5, 7], [5, 10, 2], [6, 7, 2], [6, 8], [10, 14],
    [11, 15], [11, 16], [11, 17], [12, 18], [12, 19], [12, 20], [13, 21], [13, 22], [13, 23],
  ]),
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
  createLacticAcid('R'),
  createLacticAcid('S'),
  createBenzene(),
  betaDGlucose,
  caffeine,
  createFullerene(),
];
