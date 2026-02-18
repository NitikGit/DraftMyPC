// Prebuilt PC Templates for common use cases

import { pcComponents } from './pcComponents';

export const prebuiltTemplates = [
  {
    id: 'template-1',
    name: 'Budget Gaming PC',
    description: 'Perfect entry-level gaming setup for 1080p esports and casual gaming at 60+ FPS',
    category: 'Gaming',
    targetUse: ['Esports Gaming', 'Casual Gaming', 'Light Streaming'],
    components: {
      cpu: 'cpu-2',
      gpu: 'gpu-1',
      motherboard: 'mb-2',
      ram: 'ram-2',
      storage: 'storage-1',
      psu: 'psu-2',
      case: 'case-1',
      cooler: 'cooler-1'
    },
    totalPrice: 95000,
    performanceNotes: 'Runs esports titles at 100+ FPS, AAA games at 60 FPS medium settings',
    image: '🎮'
  },
  {
    id: 'template-2',
    name: 'Basic Office PC',
    description: 'Reliable workstation for office productivity, web browsing, and light multitasking',
    category: 'Office',
    targetUse: ['Office Work', 'Web Browsing', 'Document Editing', 'Video Calls'],
    components: {
      cpu: 'cpu-1',
      gpu: 'gpu-2',
      motherboard: 'mb-1',
      ram: 'ram-1',
      storage: 'storage-1',
      psu: 'psu-1',
      case: 'case-1',
      cooler: 'cooler-1'
    },
    totalPrice: 68000,
    performanceNotes: 'Smooth multitasking with 20+ browser tabs, fast boot times',
    image: '💼'
  },
  {
    id: 'template-3',
    name: 'Content Creator Build',
    description: 'Optimized for video editing, 3D rendering, and content creation workflows',
    category: 'Workstation',
    targetUse: ['Video Editing', '3D Rendering', 'Photo Editing', 'Streaming'],
    components: {
      cpu: 'cpu-7',
      gpu: 'gpu-9',
      motherboard: 'mb-4',
      ram: 'ram-5',
      storage: 'storage-5',
      psu: 'psu-4',
      case: 'case-3',
      cooler: 'cooler-4'
    },
    totalPrice: 385000,
    performanceNotes: '4K video editing without proxies, fast render times, smooth multitasking',
    image: '🎬'
  },
  {
    id: 'template-4',
    name: 'Mid-Range Gaming Beast',
    description: 'Excellent 1440p gaming experience with high refresh rate support',
    category: 'Gaming',
    targetUse: ['1440p Gaming', 'High FPS Gaming', 'VR Ready', 'Streaming'],
    components: {
      cpu: 'cpu-4',
      gpu: 'gpu-6',
      motherboard: 'mb-4',
      ram: 'ram-4',
      storage: 'storage-2',
      psu: 'psu-3',
      case: 'case-2',
      cooler: 'cooler-2'
    },
    totalPrice: 195000,
    performanceNotes: '1440p gaming at 100+ FPS, ray tracing capable, VR ready',
    image: '🔥'
  },
  {
    id: 'template-5',
    name: 'Ultimate 4K Gaming',
    description: 'No-compromise 4K gaming and content creation powerhouse',
    category: 'Enthusiast',
    targetUse: ['4K Gaming', 'Professional Work', 'Streaming + Gaming', 'Future Proof'],
    components: {
      cpu: 'cpu-6',
      gpu: 'gpu-10',
      motherboard: 'mb-5',
      ram: 'ram-5',
      storage: 'storage-5',
      psu: 'psu-5',
      case: 'case-4',
      cooler: 'cooler-5'
    },
    totalPrice: 525000,
    performanceNotes: '4K gaming at 60+ FPS with ray tracing, top-tier performance in all games',
    image: '👑'
  },
  {
    id: 'template-6',
    name: 'Compact Powerhouse',
    description: 'High performance in a compact form factor, perfect for small spaces',
    category: 'Compact',
    targetUse: ['Small Space Gaming', 'Living Room PC', 'LAN Party', 'Portable Power'],
    components: {
      cpu: 'cpu-5',
      gpu: 'gpu-4',
      motherboard: 'mb-3',
      ram: 'ram-3',
      storage: 'storage-3',
      psu: 'psu-3',
      case: 'case-1',
      cooler: 'cooler-3'
    },
    totalPrice: 185000,
    performanceNotes: 'Great 1080p/1440p gaming in a compact footprint',
    image: '📦'
  },
  {
    id: 'template-7',
    name: 'Silent Workstation',
    description: 'Whisper-quiet operation for focused work environments',
    category: 'Silent',
    targetUse: ['Quiet Computing', 'Office Environment', 'Audio Production', 'Home Studio'],
    components: {
      cpu: 'cpu-4',
      gpu: 'gpu-5',
      motherboard: 'mb-4',
      ram: 'ram-3',
      storage: 'storage-3',
      psu: 'psu-3',
      case: 'case-2',
      cooler: 'cooler-3'
    },
    totalPrice: 175000,
    performanceNotes: 'Near-silent operation under load, excellent for audio-sensitive environments',
    image: '🔇'
  }
];

export const getTemplateById = (id) => {
  return prebuiltTemplates.find(t => t.id === id);
};

export const getTemplatesByCategory = (category) => {
  return prebuiltTemplates.filter(t => t.category === category);
};

export const getTemplateComponents = (template) => {
  return {
    cpu: pcComponents.find(c => c.id === template.components.cpu),
    gpu: pcComponents.find(c => c.id === template.components.gpu),
    motherboard: pcComponents.find(c => c.id === template.components.motherboard),
    ram: pcComponents.find(c => c.id === template.components.ram),
    storage: pcComponents.find(c => c.id === template.components.storage),
    psu: pcComponents.find(c => c.id === template.components.psu),
    case: pcComponents.find(c => c.id === template.components.case),
    cooler: pcComponents.find(c => c.id === template.components.cooler)
  };
};

export const calculateTemplatePrice = (template) => {
  const components = getTemplateComponents(template);

  return Object.values(components).reduce((sum, comp) => {
    return sum + (comp ? comp.price : 0);
  }, 0);
};
