// PC Components Catalog
// Includes specs, pricing, performance tiers, and best use cases

export const pcComponents = [
  // CPUs - Budget
  {
    id: 'cpu-1',
    name: 'Intel Core i3-12100F',
    category: 'cpu',
    brand: 'Intel',
    model: 'i3-12100F',
    price: 15000,
    imageUrl: '/placeholder.svg',
    specs: {
      cores: 4,
      threads: 8,
      baseSpeed: '3.3 GHz',
      boostSpeed: '4.3 GHz',
      cache: '12MB',
      tdp: '58W',
      socket: 'LGA 1700'
    },
    performanceTier: 'budget',
    bestFor: ['Basic Gaming', 'Office Work', 'Web Browsing'],
    retailerLinks: [
      { name: 'ITTI', price: 15000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 15500, url: 'https://neostore.com.np' },
      { name: 'Ocean Computer', price: 14800, url: 'https://oceancomputer.com.np' }
    ]
  },
  {
    id: 'cpu-2',
    name: 'AMD Ryzen 5 5500',
    category: 'cpu',
    brand: 'AMD',
    model: 'Ryzen 5 5500',
    price: 18000,
    imageUrl: '/placeholder.svg',
    specs: {
      cores: 6,
      threads: 12,
      baseSpeed: '3.6 GHz',
      boostSpeed: '4.2 GHz',
      cache: '19MB',
      tdp: '65W',
      socket: 'AM4'
    },
    performanceTier: 'budget',
    bestFor: ['Budget Gaming', 'Streaming', 'Productivity'],
    retailerLinks: [
      { name: 'ITTI', price: 18000, url: 'https://itti.com.np' },
      { name: 'Daraz', price: 18500, url: 'https://daraz.com.np' }
    ]
  },
  // CPUs - Mid Range
  {
    id: 'cpu-3',
    name: 'Intel Core i5-13400F',
    category: 'cpu',
    brand: 'Intel',
    model: 'i5-13400F',
    price: 32000,
    imageUrl: '/placeholder.svg',
    specs: {
      cores: 10,
      threads: 16,
      baseSpeed: '2.5 GHz',
      boostSpeed: '4.6 GHz',
      cache: '20MB',
      tdp: '65W',
      socket: 'LGA 1700'
    },
    performanceTier: 'mid-range',
    bestFor: ['1080p Gaming', 'Content Creation', 'Multitasking'],
    retailerLinks: [
      { name: 'ITTI', price: 32000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 32500, url: 'https://neostore.com.np' },
      { name: 'Ocean Computer', price: 31800, url: 'https://oceancomputer.com.np' }
    ]
  },
  {
    id: 'cpu-4',
    name: 'AMD Ryzen 5 7600',
    category: 'cpu',
    brand: 'AMD',
    model: 'Ryzen 5 7600',
    price: 38000,
    imageUrl: '/placeholder.svg',
    specs: {
      cores: 6,
      threads: 12,
      baseSpeed: '3.8 GHz',
      boostSpeed: '5.1 GHz',
      cache: '38MB',
      tdp: '65W',
      socket: 'AM5'
    },
    performanceTier: 'mid-range',
    bestFor: ['1440p Gaming', 'Streaming', 'Video Editing'],
    retailerLinks: [
      { name: 'ITTI', price: 38000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 38500, url: 'https://neostore.com.np' }
    ]
  },
  {
    id: 'cpu-5',
    name: 'Intel Core i5-14600K',
    category: 'cpu',
    brand: 'Intel',
    model: 'i5-14600K',
    price: 45000,
    imageUrl: '/placeholder.svg',
    specs: {
      cores: 14,
      threads: 20,
      baseSpeed: '3.5 GHz',
      boostSpeed: '5.3 GHz',
      cache: '24MB',
      tdp: '125W',
      socket: 'LGA 1700'
    },
    performanceTier: 'high-end',
    bestFor: ['High FPS Gaming', '3D Rendering', 'Heavy Multitasking'],
    retailerLinks: [
      { name: 'ITTI', price: 45000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 46000, url: 'https://neostore.com.np' },
      { name: 'Ocean Computer', price: 44500, url: 'https://oceancomputer.com.np' }
    ]
  },
  // CPUs - High End
  {
    id: 'cpu-6',
    name: 'AMD Ryzen 7 7800X3D',
    category: 'cpu',
    brand: 'AMD',
    model: 'Ryzen 7 7800X3D',
    price: 62000,
    imageUrl: '/placeholder.svg',
    specs: {
      cores: 8,
      threads: 16,
      baseSpeed: '4.2 GHz',
      boostSpeed: '5.0 GHz',
      cache: '104MB',
      tdp: '120W',
      socket: 'AM5'
    },
    performanceTier: 'high-end',
    bestFor: ['Best Gaming CPU', '4K Gaming', 'Esports'],
    retailerLinks: [
      { name: 'ITTI', price: 62000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 63000, url: 'https://neostore.com.np' }
    ]
  },
  {
    id: 'cpu-7',
    name: 'Intel Core i7-14700K',
    category: 'cpu',
    brand: 'Intel',
    model: 'i7-14700K',
    price: 68500,
    imageUrl: '/placeholder.svg',
    specs: {
      cores: 20,
      threads: 28,
      baseSpeed: '3.4 GHz',
      boostSpeed: '5.6 GHz',
      cache: '33MB',
      tdp: '125W',
      socket: 'LGA 1700'
    },
    performanceTier: 'enthusiast',
    bestFor: ['Professional Work', '4K Gaming', 'Content Creation'],
    retailerLinks: [
      { name: 'ITTI', price: 68500, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 69000, url: 'https://neostore.com.np' },
      { name: 'Ocean Computer', price: 68000, url: 'https://oceancomputer.com.np' }
    ]
  },
  {
    id: 'cpu-8',
    name: 'Intel Core i9-14900K',
    category: 'cpu',
    brand: 'Intel',
    model: 'i9-14900K',
    price: 95000,
    imageUrl: '/placeholder.svg',
    specs: {
      cores: 24,
      threads: 32,
      baseSpeed: '3.2 GHz',
      boostSpeed: '6.0 GHz',
      cache: '36MB',
      tdp: '125W',
      socket: 'LGA 1700'
    },
    performanceTier: 'enthusiast',
    bestFor: ['Ultimate Performance', 'Workstation', 'Streaming + Gaming'],
    retailerLinks: [
      { name: 'ITTI', price: 95000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 96000, url: 'https://neostore.com.np' }
    ]
  },

  // GPUs - Budget
  {
    id: 'gpu-1',
    name: 'NVIDIA GTX 1650',
    category: 'gpu',
    brand: 'NVIDIA',
    model: 'GTX 1650',
    price: 25000,
    imageUrl: '/placeholder.svg',
    specs: {
      vram: '4GB GDDR6',
      coreClock: '1485 MHz',
      boostClock: '1665 MHz',
      tdp: '75W',
      memory: '128-bit',
      ports: 'HDMI, DP, DVI'
    },
    performanceTier: 'budget',
    bestFor: ['1080p Low-Medium', 'Esports', 'Light Gaming'],
    retailerLinks: [
      { name: 'ITTI', price: 25000, url: 'https://itti.com.np' },
      { name: 'Daraz', price: 25500, url: 'https://daraz.com.np' }
    ]
  },
  {
    id: 'gpu-2',
    name: 'AMD RX 6500 XT',
    category: 'gpu',
    brand: 'AMD',
    model: 'RX 6500 XT',
    price: 22000,
    imageUrl: '/placeholder.svg',
    specs: {
      vram: '4GB GDDR6',
      coreClock: '2310 MHz',
      boostClock: '2815 MHz',
      tdp: '107W',
      memory: '64-bit',
      ports: 'HDMI, DP'
    },
    performanceTier: 'budget',
    bestFor: ['Esports', '1080p Gaming', 'Entry Level'],
    retailerLinks: [
      { name: 'ITTI', price: 22000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 22500, url: 'https://neostore.com.np' }
    ]
  },
  {
    id: 'gpu-3',
    name: 'NVIDIA RTX 3060',
    category: 'gpu',
    brand: 'NVIDIA',
    model: 'RTX 3060',
    price: 48000,
    imageUrl: '/placeholder.svg',
    specs: {
      vram: '12GB GDDR6',
      coreClock: '1320 MHz',
      boostClock: '1777 MHz',
      tdp: '170W',
      memory: '192-bit',
      rayTracing: 'Yes',
      dlss: 'DLSS 2.0'
    },
    performanceTier: 'mid-range',
    bestFor: ['1080p High', '1440p Medium', 'Ray Tracing'],
    retailerLinks: [
      { name: 'ITTI', price: 48000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 48500, url: 'https://neostore.com.np' },
      { name: 'Ocean Computer', price: 47500, url: 'https://oceancomputer.com.np' }
    ]
  },
  // GPUs - Mid Range
  {
    id: 'gpu-4',
    name: 'NVIDIA RTX 4060',
    category: 'gpu',
    brand: 'NVIDIA',
    model: 'RTX 4060',
    price: 55000,
    imageUrl: '/placeholder.svg',
    specs: {
      vram: '8GB GDDR6',
      coreClock: '1830 MHz',
      boostClock: '2460 MHz',
      tdp: '115W',
      memory: '128-bit',
      rayTracing: 'Yes (Gen 3)',
      dlss: 'DLSS 3.0'
    },
    performanceTier: 'mid-range',
    bestFor: ['1080p Ultra', '1440p High', 'Ray Tracing'],
    retailerLinks: [
      { name: 'ITTI', price: 55000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 56000, url: 'https://neostore.com.np' }
    ]
  },
  {
    id: 'gpu-5',
    name: 'AMD RX 7600',
    category: 'gpu',
    brand: 'AMD',
    model: 'RX 7600',
    price: 45000,
    imageUrl: '/placeholder.svg',
    specs: {
      vram: '8GB GDDR6',
      coreClock: '1720 MHz',
      boostClock: '2655 MHz',
      tdp: '165W',
      memory: '128-bit',
      rayTracing: 'Yes (RDNA 3)',
      fsr: 'FSR 3.0'
    },
    performanceTier: 'mid-range',
    bestFor: ['1080p Ultra', '1440p Medium', 'Value Gaming'],
    retailerLinks: [
      { name: 'ITTI', price: 45000, url: 'https://itti.com.np' },
      { name: 'Ocean Computer', price: 44500, url: 'https://oceancomputer.com.np' }
    ]
  },
  {
    id: 'gpu-6',
    name: 'NVIDIA RTX 4060 Ti',
    category: 'gpu',
    brand: 'NVIDIA',
    model: 'RTX 4060 Ti',
    price: 78000,
    imageUrl: '/placeholder.svg',
    specs: {
      vram: '8GB GDDR6',
      coreClock: '2310 MHz',
      boostClock: '2535 MHz',
      tdp: '160W',
      memory: '128-bit',
      rayTracing: 'Yes (Gen 3)',
      dlss: 'DLSS 3.0'
    },
    performanceTier: 'mid-range',
    bestFor: ['1080p 144Hz', '1440p High', 'Ray Tracing'],
    retailerLinks: [
      { name: 'ITTI', price: 78000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 78500, url: 'https://neostore.com.np' },
      { name: 'Daraz', price: 79500, url: 'https://daraz.com.np' }
    ]
  },
  // GPUs - High End
  {
    id: 'gpu-7',
    name: 'AMD RX 7800 XT',
    category: 'gpu',
    brand: 'AMD',
    model: 'RX 7800 XT',
    price: 98000,
    imageUrl: '/placeholder.svg',
    specs: {
      vram: '16GB GDDR6',
      coreClock: '1295 MHz',
      boostClock: '2430 MHz',
      tdp: '263W',
      memory: '256-bit',
      rayTracing: 'Yes (RDNA 3)',
      fsr: 'FSR 3.0'
    },
    performanceTier: 'high-end',
    bestFor: ['1440p Ultra', '4K Medium', 'High VRAM Games'],
    retailerLinks: [
      { name: 'ITTI', price: 98000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 98500, url: 'https://neostore.com.np' },
      { name: 'Ocean Computer', price: 97500, url: 'https://oceancomputer.com.np' }
    ]
  },
  {
    id: 'gpu-8',
    name: 'NVIDIA RTX 4070',
    category: 'gpu',
    brand: 'NVIDIA',
    model: 'RTX 4070',
    price: 105000,
    imageUrl: '/placeholder.svg',
    specs: {
      vram: '12GB GDDR6X',
      coreClock: '1920 MHz',
      boostClock: '2475 MHz',
      tdp: '200W',
      memory: '192-bit',
      rayTracing: 'Yes (Gen 3)',
      dlss: 'DLSS 3.0'
    },
    performanceTier: 'high-end',
    bestFor: ['1440p Ultra', '4K Medium', 'Ray Tracing'],
    retailerLinks: [
      { name: 'ITTI', price: 105000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 106000, url: 'https://neostore.com.np' }
    ]
  },
  {
    id: 'gpu-9',
    name: 'NVIDIA RTX 4070 Ti',
    category: 'gpu',
    brand: 'NVIDIA',
    model: 'RTX 4070 Ti',
    price: 125000,
    imageUrl: '/placeholder.svg',
    specs: {
      vram: '12GB GDDR6X',
      coreClock: '2310 MHz',
      boostClock: '2610 MHz',
      tdp: '285W',
      memory: '192-bit',
      rayTracing: 'Yes (Gen 3)',
      dlss: 'DLSS 3.0'
    },
    performanceTier: 'high-end',
    bestFor: ['4K Gaming', '1440p 144Hz', 'Content Creation'],
    retailerLinks: [
      { name: 'ITTI', price: 125000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 127000, url: 'https://neostore.com.np' },
      { name: 'Ocean Computer', price: 124500, url: 'https://oceancomputer.com.np' }
    ]
  },
  {
    id: 'gpu-10',
    name: 'NVIDIA RTX 4080',
    category: 'gpu',
    brand: 'NVIDIA',
    model: 'RTX 4080',
    price: 185000,
    imageUrl: '/placeholder.svg',
    specs: {
      vram: '16GB GDDR6X',
      coreClock: '2205 MHz',
      boostClock: '2505 MHz',
      tdp: '320W',
      memory: '256-bit',
      rayTracing: 'Yes (Gen 3)',
      dlss: 'DLSS 3.0'
    },
    performanceTier: 'enthusiast',
    bestFor: ['4K Ultra', '4K 120Hz', 'Professional Work'],
    retailerLinks: [
      { name: 'ITTI', price: 185000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 187000, url: 'https://neostore.com.np' }
    ]
  },

  // Motherboards - Budget
  {
    id: 'mb-1',
    name: 'Gigabyte B660M DS3H',
    category: 'motherboard',
    brand: 'Gigabyte',
    model: 'B660M DS3H',
    price: 15000,
    imageUrl: '/placeholder.svg',
    specs: {
      socket: 'LGA 1700',
      chipset: 'B660',
      formFactor: 'Micro-ATX',
      ramSlots: 2,
      maxRam: '64GB DDR4',
      m2Slots: 1,
      pcie: 'PCIe 4.0 x16'
    },
    performanceTier: 'budget',
    bestFor: ['Budget Builds', 'Office PCs', 'Basic Gaming'],
    retailerLinks: [
      { name: 'ITTI', price: 15000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 15500, url: 'https://neostore.com.np' }
    ]
  },
  {
    id: 'mb-2',
    name: 'MSI B550M PRO-VDH',
    category: 'motherboard',
    brand: 'MSI',
    model: 'B550M PRO-VDH',
    price: 14500,
    imageUrl: '/placeholder.svg',
    specs: {
      socket: 'AM4',
      chipset: 'B550',
      formFactor: 'Micro-ATX',
      ramSlots: 4,
      maxRam: '128GB DDR4',
      m2Slots: 2,
      pcie: 'PCIe 4.0 x16'
    },
    performanceTier: 'budget',
    bestFor: ['AMD Budget Builds', 'Upgradability', 'Value'],
    retailerLinks: [
      { name: 'ITTI', price: 14500, url: 'https://itti.com.np' },
      { name: 'Ocean Computer', price: 14200, url: 'https://oceancomputer.com.np' }
    ]
  },
  // Motherboards - Mid Range
  {
    id: 'mb-3',
    name: 'ASUS TUF Gaming B760M-PLUS',
    category: 'motherboard',
    brand: 'ASUS',
    model: 'TUF Gaming B760M-PLUS',
    price: 25000,
    imageUrl: '/placeholder.svg',
    specs: {
      socket: 'LGA 1700',
      chipset: 'B760',
      formFactor: 'Micro-ATX',
      ramSlots: 4,
      maxRam: '128GB DDR5',
      m2Slots: 2,
      pcie: 'PCIe 5.0 x16'
    },
    performanceTier: 'mid-range',
    bestFor: ['Gaming Builds', 'DDR5 Ready', 'Future Proof'],
    retailerLinks: [
      { name: 'ITTI', price: 25000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 25500, url: 'https://neostore.com.np' }
    ]
  },
  {
    id: 'mb-4',
    name: 'Gigabyte B650 AORUS Elite AX',
    category: 'motherboard',
    brand: 'Gigabyte',
    model: 'B650 AORUS Elite AX',
    price: 32000,
    imageUrl: '/placeholder.svg',
    specs: {
      socket: 'AM5',
      chipset: 'B650',
      formFactor: 'ATX',
      ramSlots: 4,
      maxRam: '128GB DDR5',
      m2Slots: 3,
      pcie: 'PCIe 5.0 x16',
      wifi: 'WiFi 6E'
    },
    performanceTier: 'mid-range',
    bestFor: ['AM5 Builds', 'Feature Rich', 'WiFi Included'],
    retailerLinks: [
      { name: 'ITTI', price: 32000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 32500, url: 'https://neostore.com.np' }
    ]
  },
  // Motherboards - High End
  {
    id: 'mb-5',
    name: 'ASUS ROG Strix Z790-E Gaming',
    category: 'motherboard',
    brand: 'ASUS',
    model: 'ROG Strix Z790-E Gaming',
    price: 65000,
    imageUrl: '/placeholder.svg',
    specs: {
      socket: 'LGA 1700',
      chipset: 'Z790',
      formFactor: 'ATX',
      ramSlots: 4,
      maxRam: '192GB DDR5',
      m2Slots: 5,
      pcie: 'PCIe 5.0 x16',
      wifi: 'WiFi 6E'
    },
    performanceTier: 'enthusiast',
    bestFor: ['Enthusiast Builds', 'Overclocking', 'Maximum Features'],
    retailerLinks: [
      { name: 'ITTI', price: 65000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 66000, url: 'https://neostore.com.np' }
    ]
  },

  // RAM - Budget
  {
    id: 'ram-1',
    name: 'Kingston Fury Beast 8GB DDR4',
    category: 'ram',
    brand: 'Kingston',
    model: 'Fury Beast 8GB',
    price: 4500,
    imageUrl: '/placeholder.svg',
    specs: {
      capacity: '8GB',
      type: 'DDR4',
      speed: '3200 MHz',
      latency: 'CL16',
      voltage: '1.35V',
      heatspreader: 'Yes'
    },
    performanceTier: 'budget',
    bestFor: ['Budget Builds', 'Basic Gaming', 'Office Work'],
    retailerLinks: [
      { name: 'ITTI', price: 4500, url: 'https://itti.com.np' },
      { name: 'Daraz', price: 4800, url: 'https://daraz.com.np' }
    ]
  },
  {
    id: 'ram-2',
    name: 'Corsair Vengeance LPX 16GB DDR4',
    category: 'ram',
    brand: 'Corsair',
    model: 'Vengeance LPX 16GB',
    price: 8500,
    imageUrl: '/placeholder.svg',
    specs: {
      capacity: '16GB (2x8GB)',
      type: 'DDR4',
      speed: '3200 MHz',
      latency: 'CL16',
      voltage: '1.35V',
      heatspreader: 'Yes'
    },
    performanceTier: 'budget',
    bestFor: ['Gaming', 'Multitasking', 'Streaming'],
    retailerLinks: [
      { name: 'ITTI', price: 8500, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 8800, url: 'https://neostore.com.np' }
    ]
  },
  // RAM - Mid Range
  {
    id: 'ram-3',
    name: 'G.Skill Trident Z RGB 32GB DDR4',
    category: 'ram',
    brand: 'G.Skill',
    model: 'Trident Z RGB 32GB',
    price: 18000,
    imageUrl: '/placeholder.svg',
    specs: {
      capacity: '32GB (2x16GB)',
      type: 'DDR4',
      speed: '3600 MHz',
      latency: 'CL18',
      voltage: '1.35V',
      rgb: 'Yes'
    },
    performanceTier: 'mid-range',
    bestFor: ['Content Creation', 'Heavy Multitasking', 'Future Proof'],
    retailerLinks: [
      { name: 'ITTI', price: 18000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 18500, url: 'https://neostore.com.np' }
    ]
  },
  {
    id: 'ram-4',
    name: 'Kingston Fury Beast 32GB DDR5',
    category: 'ram',
    brand: 'Kingston',
    model: 'Fury Beast 32GB DDR5',
    price: 22000,
    imageUrl: '/placeholder.svg',
    specs: {
      capacity: '32GB (2x16GB)',
      type: 'DDR5',
      speed: '5200 MHz',
      latency: 'CL40',
      voltage: '1.25V',
      heatspreader: 'Yes'
    },
    performanceTier: 'mid-range',
    bestFor: ['DDR5 Platforms', 'Future Proof', 'High Bandwidth'],
    retailerLinks: [
      { name: 'ITTI', price: 22000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 22500, url: 'https://neostore.com.np' }
    ]
  },
  // RAM - High End
  {
    id: 'ram-5',
    name: 'G.Skill Trident Z5 RGB 64GB DDR5',
    category: 'ram',
    brand: 'G.Skill',
    model: 'Trident Z5 RGB 64GB',
    price: 45000,
    imageUrl: '/placeholder.svg',
    specs: {
      capacity: '64GB (2x32GB)',
      type: 'DDR5',
      speed: '6000 MHz',
      latency: 'CL36',
      voltage: '1.35V',
      rgb: 'Yes'
    },
    performanceTier: 'enthusiast',
    bestFor: ['Workstations', 'Video Production', 'Maximum Performance'],
    retailerLinks: [
      { name: 'ITTI', price: 45000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 46000, url: 'https://neostore.com.np' }
    ]
  },

  // Storage - Budget
  {
    id: 'storage-1',
    name: 'Kingston NV2 500GB NVMe',
    category: 'storage',
    brand: 'Kingston',
    model: 'NV2 500GB',
    price: 6500,
    imageUrl: '/placeholder.svg',
    specs: {
      capacity: '500GB',
      type: 'NVMe SSD',
      interface: 'PCIe 4.0 x4',
      readSpeed: '3500 MB/s',
      writeSpeed: '2100 MB/s',
      formFactor: 'M.2 2280'
    },
    performanceTier: 'budget',
    bestFor: ['Boot Drive', 'Budget Builds', 'OS + Games'],
    retailerLinks: [
      { name: 'ITTI', price: 6500, url: 'https://itti.com.np' },
      { name: 'Daraz', price: 6800, url: 'https://daraz.com.np' }
    ]
  },
  {
    id: 'storage-2',
    name: 'WD Blue SN580 1TB NVMe',
    category: 'storage',
    brand: 'Western Digital',
    model: 'Blue SN580 1TB',
    price: 12000,
    imageUrl: '/placeholder.svg',
    specs: {
      capacity: '1TB',
      type: 'NVMe SSD',
      interface: 'PCIe 4.0 x4',
      readSpeed: '4150 MB/s',
      writeSpeed: '4150 MB/s',
      formFactor: 'M.2 2280'
    },
    performanceTier: 'mid-range',
    bestFor: ['Gaming', 'Main Storage', 'Fast Loading'],
    retailerLinks: [
      { name: 'ITTI', price: 12000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 12500, url: 'https://neostore.com.np' }
    ]
  },
  // Storage - Mid Range
  {
    id: 'storage-3',
    name: 'Samsung 980 Pro 1TB NVMe',
    category: 'storage',
    brand: 'Samsung',
    model: '980 Pro 1TB',
    price: 18000,
    imageUrl: '/placeholder.svg',
    specs: {
      capacity: '1TB',
      type: 'NVMe SSD',
      interface: 'PCIe 4.0 x4',
      readSpeed: '7000 MB/s',
      writeSpeed: '5000 MB/s',
      formFactor: 'M.2 2280'
    },
    performanceTier: 'high-end',
    bestFor: ['Professional Work', 'Maximum Speed', 'Content Creation'],
    retailerLinks: [
      { name: 'ITTI', price: 18000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 18500, url: 'https://neostore.com.np' }
    ]
  },
  {
    id: 'storage-4',
    name: 'Seagate Barracuda 2TB HDD',
    category: 'storage',
    brand: 'Seagate',
    model: 'Barracuda 2TB',
    price: 8500,
    imageUrl: '/placeholder.svg',
    specs: {
      capacity: '2TB',
      type: 'HDD',
      interface: 'SATA III',
      rpm: '7200 RPM',
      cache: '256MB',
      formFactor: '3.5"'
    },
    performanceTier: 'budget',
    bestFor: ['Mass Storage', 'Backup', 'Media Library'],
    retailerLinks: [
      { name: 'ITTI', price: 8500, url: 'https://itti.com.np' },
      { name: 'Ocean Computer', price: 8200, url: 'https://oceancomputer.com.np' }
    ]
  },
  {
    id: 'storage-5',
    name: 'Samsung 990 Pro 2TB NVMe',
    category: 'storage',
    brand: 'Samsung',
    model: '990 Pro 2TB',
    price: 32000,
    imageUrl: '/placeholder.svg',
    specs: {
      capacity: '2TB',
      type: 'NVMe SSD',
      interface: 'PCIe 5.0 x4',
      readSpeed: '7450 MB/s',
      writeSpeed: '6900 MB/s',
      formFactor: 'M.2 2280'
    },
    performanceTier: 'enthusiast',
    bestFor: ['Maximum Performance', 'Large Games Library', 'Professional Work'],
    retailerLinks: [
      { name: 'ITTI', price: 32000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 33000, url: 'https://neostore.com.np' }
    ]
  },

  // PSU - Budget
  {
    id: 'psu-1',
    name: 'Corsair CV450 450W',
    category: 'psu',
    brand: 'Corsair',
    model: 'CV450',
    price: 6500,
    imageUrl: '/placeholder.svg',
    specs: {
      wattage: '450W',
      efficiency: '80+ Bronze',
      modular: 'Non-Modular',
      fanSize: '120mm',
      protection: 'OVP, UVP, SCP'
    },
    performanceTier: 'budget',
    bestFor: ['Budget Builds', 'Office PCs', 'Low Power Systems'],
    retailerLinks: [
      { name: 'ITTI', price: 6500, url: 'https://itti.com.np' },
      { name: 'Daraz', price: 6800, url: 'https://daraz.com.np' }
    ]
  },
  {
    id: 'psu-2',
    name: 'Cooler Master MWE 550W',
    category: 'psu',
    brand: 'Cooler Master',
    model: 'MWE 550',
    price: 8000,
    imageUrl: '/placeholder.svg',
    specs: {
      wattage: '550W',
      efficiency: '80+ Bronze',
      modular: 'Non-Modular',
      fanSize: '120mm',
      protection: 'OVP, OCP, SCP, OPP'
    },
    performanceTier: 'budget',
    bestFor: ['Entry Gaming', 'Mid-range Builds', 'Reliable Power'],
    retailerLinks: [
      { name: 'ITTI', price: 8000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 8200, url: 'https://neostore.com.np' }
    ]
  },
  // PSU - Mid Range
  {
    id: 'psu-3',
    name: 'Corsair RM650 650W',
    category: 'psu',
    brand: 'Corsair',
    model: 'RM650',
    price: 14000,
    imageUrl: '/placeholder.svg',
    specs: {
      wattage: '650W',
      efficiency: '80+ Gold',
      modular: 'Fully Modular',
      fanSize: '135mm',
      protection: 'OVP, UVP, SCP, OCP, OTP'
    },
    performanceTier: 'mid-range',
    bestFor: ['Gaming Builds', 'RTX 4060/4070', 'Quiet Operation'],
    retailerLinks: [
      { name: 'ITTI', price: 14000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 14500, url: 'https://neostore.com.np' }
    ]
  },
  {
    id: 'psu-4',
    name: 'Seasonic Focus GX-750 750W',
    category: 'psu',
    brand: 'Seasonic',
    model: 'Focus GX-750',
    price: 18000,
    imageUrl: '/placeholder.svg',
    specs: {
      wattage: '750W',
      efficiency: '80+ Gold',
      modular: 'Fully Modular',
      fanSize: '120mm',
      protection: 'OPP, OVP, UVP, OCP, OTP, SCP'
    },
    performanceTier: 'high-end',
    bestFor: ['High-End Gaming', 'RTX 4070 Ti', 'Reliable Brand'],
    retailerLinks: [
      { name: 'ITTI', price: 18000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 18500, url: 'https://neostore.com.np' }
    ]
  },
  // PSU - High End
  {
    id: 'psu-5',
    name: 'Corsair RM1000x 1000W',
    category: 'psu',
    brand: 'Corsair',
    model: 'RM1000x',
    price: 28000,
    imageUrl: '/placeholder.svg',
    specs: {
      wattage: '1000W',
      efficiency: '80+ Gold',
      modular: 'Fully Modular',
      fanSize: '135mm',
      protection: 'OVP, UVP, SCP, OCP, OTP'
    },
    performanceTier: 'enthusiast',
    bestFor: ['RTX 4080/4090', 'Multi-GPU', 'Overclocking'],
    retailerLinks: [
      { name: 'ITTI', price: 28000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 29000, url: 'https://neostore.com.np' }
    ]
  },

  // Cases - Budget
  {
    id: 'case-1',
    name: 'Deepcool Matrexx 40',
    category: 'case',
    brand: 'Deepcool',
    model: 'Matrexx 40',
    price: 5500,
    imageUrl: '/placeholder.svg',
    specs: {
      formFactor: 'Micro-ATX',
      gpuLength: '320mm',
      coolerHeight: '165mm',
      driveBays: '2x 3.5", 3x 2.5"',
      fans: '1x 120mm'
    },
    performanceTier: 'budget',
    bestFor: ['Budget Builds', 'Compact Setups', 'Basic Gaming'],
    retailerLinks: [
      { name: 'ITTI', price: 5500, url: 'https://itti.com.np' },
      { name: 'Daraz', price: 5800, url: 'https://daraz.com.np' }
    ]
  },
  {
    id: 'case-2',
    name: 'Corsair 4000D Airflow',
    category: 'case',
    brand: 'Corsair',
    model: '4000D Airflow',
    price: 15000,
    imageUrl: '/placeholder.svg',
    specs: {
      formFactor: 'Mid Tower ATX',
      gpuLength: '360mm',
      coolerHeight: '170mm',
      driveBays: '2x 3.5", 2x 2.5"',
      fans: '2x 120mm',
      glassPanel: 'Yes'
    },
    performanceTier: 'mid-range',
    bestFor: ['Gaming Builds', 'Airflow', 'Cable Management'],
    retailerLinks: [
      { name: 'ITTI', price: 15000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 15500, url: 'https://neostore.com.np' }
    ]
  },
  // Cases - High End
  {
    id: 'case-3',
    name: 'NZXT H510 Elite',
    category: 'case',
    brand: 'NZXT',
    model: 'H510 Elite',
    price: 22000,
    imageUrl: '/placeholder.svg',
    specs: {
      formFactor: 'Mid Tower ATX',
      gpuLength: '381mm',
      coolerHeight: '165mm',
      driveBays: '2x 3.5", 2x 2.5"',
      fans: '2x 140mm RGB',
      glassPanel: 'Dual Glass'
    },
    performanceTier: 'high-end',
    bestFor: ['Showcase Builds', 'RGB Lovers', 'Premium Aesthetics'],
    retailerLinks: [
      { name: 'ITTI', price: 22000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 22500, url: 'https://neostore.com.np' }
    ]
  },
  {
    id: 'case-4',
    name: 'Lian Li O11 Dynamic',
    category: 'case',
    brand: 'Lian Li',
    model: 'O11 Dynamic',
    price: 25000,
    imageUrl: '/placeholder.svg',
    specs: {
      formFactor: 'Mid Tower ATX',
      gpuLength: '420mm',
      coolerHeight: '155mm',
      driveBays: '2x 3.5", 4x 2.5"',
      fans: 'Up to 9x 120mm',
      glassPanel: 'Triple Glass'
    },
    performanceTier: 'enthusiast',
    bestFor: ['Custom Water Cooling', 'Maximum Airflow', 'Showcase Builds'],
    retailerLinks: [
      { name: 'ITTI', price: 25000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 26000, url: 'https://neostore.com.np' }
    ]
  },

  // Coolers - Budget
  {
    id: 'cooler-1',
    name: 'Deepcool GAMMAXX 400',
    category: 'cooler',
    brand: 'Deepcool',
    model: 'GAMMAXX 400',
    price: 3500,
    imageUrl: '/placeholder.svg',
    specs: {
      type: 'Air Cooler',
      fanSize: '120mm',
      heatpipes: 4,
      tdp: '180W',
      noise: '21 dB',
      height: '155mm'
    },
    performanceTier: 'budget',
    bestFor: ['Budget Cooling', 'Low Noise', 'Entry Gaming'],
    retailerLinks: [
      { name: 'ITTI', price: 3500, url: 'https://itti.com.np' },
      { name: 'Daraz', price: 3800, url: 'https://daraz.com.np' }
    ]
  },
  {
    id: 'cooler-2',
    name: 'Cooler Master Hyper 212',
    category: 'cooler',
    brand: 'Cooler Master',
    model: 'Hyper 212',
    price: 5500,
    imageUrl: '/placeholder.svg',
    specs: {
      type: 'Air Cooler',
      fanSize: '120mm',
      heatpipes: 4,
      tdp: '150W',
      noise: '26 dB',
      height: '158mm'
    },
    performanceTier: 'budget',
    bestFor: ['Value Cooling', 'Reliable Brand', 'Mid-range CPUs'],
    retailerLinks: [
      { name: 'ITTI', price: 5500, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 5800, url: 'https://neostore.com.np' }
    ]
  },
  // Coolers - Mid Range
  {
    id: 'cooler-3',
    name: 'Noctua NH-U12S',
    category: 'cooler',
    brand: 'Noctua',
    model: 'NH-U12S',
    price: 12000,
    imageUrl: '/placeholder.svg',
    specs: {
      type: 'Air Cooler',
      fanSize: '120mm',
      heatpipes: 5,
      tdp: '250W',
      noise: '22 dB',
      height: '158mm'
    },
    performanceTier: 'mid-range',
    bestFor: ['Silent Operation', 'High Quality', 'i7/Ryzen 7'],
    retailerLinks: [
      { name: 'ITTI', price: 12000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 12500, url: 'https://neostore.com.np' }
    ]
  },
  {
    id: 'cooler-4',
    name: 'Corsair iCUE H100i Elite',
    category: 'cooler',
    brand: 'Corsair',
    model: 'iCUE H100i Elite',
    price: 22000,
    imageUrl: '/placeholder.svg',
    specs: {
      type: 'AIO Liquid',
      radiator: '240mm',
      fans: '2x 120mm RGB',
      tdp: '350W',
      noise: '36 dB',
      pump: 'Magnetic Bearing'
    },
    performanceTier: 'high-end',
    bestFor: ['High-End CPUs', 'RGB Aesthetics', 'Overclocking'],
    retailerLinks: [
      { name: 'ITTI', price: 22000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 23000, url: 'https://neostore.com.np' }
    ]
  },
  // Coolers - High End
  {
    id: 'cooler-5',
    name: 'NZXT Kraken X63',
    category: 'cooler',
    brand: 'NZXT',
    model: 'Kraken X63',
    price: 28000,
    imageUrl: '/placeholder.svg',
    specs: {
      type: 'AIO Liquid',
      radiator: '280mm',
      fans: '2x 140mm',
      tdp: '400W',
      noise: '21-36 dB',
      pump: 'CAM Software'
    },
    performanceTier: 'enthusiast',
    bestFor: ['i9/Ryzen 9', 'Maximum Cooling', 'Premium Builds'],
    retailerLinks: [
      { name: 'ITTI', price: 28000, url: 'https://itti.com.np' },
      { name: 'Neo Store', price: 29000, url: 'https://neostore.com.np' }
    ]
  }
];

// Helper functions
export const getComponentsByCategory = (category) => {
  return pcComponents.filter(c => c.category === category);
};

export const getComponentsByTier = (tier) => {
  return pcComponents.filter(c => c.performanceTier === tier);
};

export const getBestPrice = (component) => {
  if (!component.retailerLinks || component.retailerLinks.length === 0) {
    return undefined;
  }

  return component.retailerLinks.reduce((min, link) =>
    link.price < min.price ? link : min
  , component.retailerLinks[0]);
};

export const searchComponents = (query, category) => {
  const lowerQuery = query.toLowerCase();

  return pcComponents.filter(c => {
    const matchesQuery =
      c.name.toLowerCase().includes(lowerQuery) ||
      c.brand.toLowerCase().includes(lowerQuery) ||
      c.model.toLowerCase().includes(lowerQuery);

    const matchesCategory = category ? c.category === category : true;

    return matchesQuery && matchesCategory;
  });
};

export const filterByPriceRange = (min, max, components) => {
  const source = components || pcComponents;
  return source.filter(c => c.price >= min && c.price <= max);
};
