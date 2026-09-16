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
    name: 'Juan Sebastián Cárdenas',
    role: 'CEO & Founder • Estrategia Financiera',
    tag: 'CEO & FOUNDER',
    tagColor: '#7EDBFF',
    bio: 'Especialista con más de ocho años de experiencia en auditoría y control financiero, valoración de compañías y estructuración de estrategias financieras para compañías líderes de sector.',
    education: [
      'Master en Alta Dirección Empresarial',
      'Doble Especialización en Gerencia Financiera y Finanzas Internacionales',
      'Administrador de Empresas',
    ],
    imageUrl: '',
  },
  {
    name: 'Edwin Rodríguez',
    role: 'Counter & Founder • Director Tributario',
    tag: 'DIRECTOR TRIBUTARIO',
    tagColor: '#4edea3',
    bio: 'Especialista en impuestos con más de 10 años de experiencia en gestión fiscal y riesgos tributarios para compañías líderes de sector.',
    education: [
      'Contador Público',
      'Especialista Tributario',
    ],
    imageUrl: '',
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
