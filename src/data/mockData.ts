export const TAX_CONSTANTS = {
  UVT_2026: 49799,
  MAX_CAP_UVT: 1340, // Max 1.340 UVT limit for exempt income & deductions
  MAX_PREPAID_MONTHLY_UVT: 16,
  DEPENDENT_UVT: 72,
  MAX_INVOICE_DEDUCTION_UVT: 240,
};

export interface TeamMember {
  name: string;
  role: string;
  tag: string;
  tagColor: string;
  bio: string;
  education: string[];
  imageUrl: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Carlos Eduardo Vargas, MSc.',
    role: 'Socio Director • Estrategia Corporativa & M&A',
    tag: 'SOCIO FUNDADOR',
    tagColor: '#7EDBFF',
    bio: 'Especialista en valoración de empresas y fusiones transfronterizas. Ex-miembro del equipo de reestructuración corporativa en banca de inversión regional con más de 14 años liderando transacciones.',
    education: [
      'Universidad de los Andes • Finanzas Corporativas',
      'Wharton Executive Education • Mergers & Acquisitions',
    ],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCYNEB2w3d2OEeCpbh-bgvH_EZ1rI-ZByCvG8WSjNpGXfYJ7ilxDG97Ziz3HHTYABF-pWAVY3hHX8VmaQAFNZXuLn5B1sg35kFfaolgfjcR9E5qjFzBiawfRyjHikbj3v9TETwaWhsK01Qd-3MNDi8n3pUxO_LWFn9bDdv6jDZeA4FD6Ei4THF1qtiTM8-jkWB6ljOwrPAiZjEBlxbh10oKMJSFJ3H_l58TBI0fl4BSEYWbyjci57Oi',
  },
  {
    name: 'Dra. Marcela Restrepo S.',
    role: 'Directora • Planeación Tributaria & Litigios DIAN',
    tag: 'SOCIA LITIGIOS',
    tagColor: '#4edea3',
    bio: 'Líder en estructuración fiscal patrimonial y defensa contenciosa ante la DIAN y el Consejo de Estado con más de 12 años de trayectoria intachable y 98.2% de efectividad.',
    education: [
      'Pontificia Universidad Javeriana • Derecho Tributario',
      'Instituto Colombiano de Derecho Tributario (ICDT)',
    ],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC7O3lYeQF3kDAAg5JVRhoHSY5pKouJGB_1d6d7Dz6LSjC4R9HjbNP35EzzPk1he2KVS7JEPGwOuzpWKaBV4HX56J6WihvjP6YWQjxNvy1PfKmiVT7QI51MBBTJ4EETboPFXrYzz6aAcdv_a-30EHzdy_T820gLN2Vomjdx9rF8_Mb8YelyL7Qw9tzrMnfIYwP-PPTIefW_pM8geSPphl-rQ0HsS0RSC4-xznCCtsDnVaeq0DIyYn9A',
  },
  {
    name: 'Felipe Morales Holguín, CFA',
    role: 'Director • Wealth Management & Finanzas Cuantitativas',
    tag: 'DIRECTOR WEALTH',
    tagColor: '#b4c5ff',
    bio: 'Especializado en asignación estratégica de activos (SAA), preservación de capital para family offices e inversión estructurada offshore en EE.UU., Panamá y Europa.',
    education: [
      'IE Business School (Madrid) • Master in Advanced Finance',
      'CFA Institute Charterholder #481903',
    ],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBu3zPURzJQqjOmQhQ0KLZs0UI54OS_-IvWCh9SDKBXtkzjJyfSp3qLu2BgZk8Qdok1ZWNT_8VNZsL8o73Z4RTtcq1tdmS9NVxK3IQjJyBi2RjNpQV-_LftrMzuTMloxQenkzs0JgzBZ3ZEojr466ukNdnzANL1nWMeYWEf-84UF_km7mPyuXUnP0JMyZoe2u9kjKskk4L-xzg44khtwXUAY15IJ60lp2RsVL-ML1wfIe367jgDPESm',
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  subtitle: string;
  initials: string;
  avatarUrl?: string;
  color: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Rediseñaron por completo nuestro esquema de presupuesto corporativo. Gracias a la planeación fiscal de JEV logramos un ahorro tributario legítimo de más de 65 millones este periodo sin contingencias.',
    author: 'Gerente General',
    title: 'NH',
    subtitle: 'Natur Heline S.A.S. • Bogotá',
    initials: 'NH',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAGLFpodl6XUbVRYPzPcsoDtsFrRf62K088iCQwFJgXROYNlT7trbf0phBUHtjP10jB6I8ZCpXwvNztpWPTtXtoSWdpJhF82_td81V0oZjDsHUUntQa17NTGWrHBSfTiX14U8EWy80d5K6f3PyTlPKQp2HSH0q29I3TGZyjGiuOnZivBG28orUtU_Ha1Km4zMiinH92T7VGo1vFgJ3DMlqwSTa3ABxhIZnmTIXSUQGcJ3yAoBNONtM1',
    color: '#2563eb',
  },
  {
    quote:
      'Como fundadores no entendíamos a profundidad los números de balance para presentar a fondos. JEV estructuró nuestro modelo financiero y punto de equilibrio en tiempo récord.',
    author: 'Co-Founder & CEO',
    title: 'FS',
    subtitle: 'Startup SaaS Fintech • Medellín',
    initials: 'FS',
    color: '#00a572',
  },
  {
    quote:
      'Mi declaración de renta solía ser un dolor de cabeza anual. El acompañamiento de JEV me brindó total tranquilidad jurídica y ordenó las inversiones patrimoniales de mi familia.',
    author: 'Inversionista Privado',
    title: 'MR',
    subtitle: 'Persona Natural • Cali',
    initials: 'MR',
    color: '#7EDBFF',
  },
  {
    quote:
      'El nivel de exactitud con el que aplican las reformas tributarias y las UVTs proyectadas nos dio total serenidad para estructurar nuestro Family Office. Cero contingencias con la DIAN y un ahorro neto palpable desde el primer año fiscal.',
    author: 'Dra. Camila Santamaría',
    title: 'Managing Partner',
    subtitle: 'Inversiones Andinas Capital',
    initials: 'CS',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBLFRQkuIG8wEXIkSukD7Qy8wcccjLTNfIPs00uKg69uruHePquSIkfNP8rQKQQA1fZoGn8Jt2BvVEDyB3lCBZTDABzMCVLeyqbjXHSdLmxDTW1siU_lnUS07jz7IADkOQI3R_dz_4hd3YYlq2JjkRKU06H832YNGsAAIy42nhpGm8K7BohkOaEOuSJDmJBacbmZ9g_t0O4q66CxmTNR68-Rc_uS0hEzyNMwpRnxhkYox-yBKvfXRoS',
    color: '#ffb77d',
  },
];
