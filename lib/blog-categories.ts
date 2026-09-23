// Blog categories. The slug is the URL (/blog/category/[slug]); names are shown on cards and in breadcrumbs.
export type Category = { slug: string; name: string; nameAr: string; description: string }

export const categories: Category[] = [
  { slug: 'microbiology-qc', name: 'Microbiology QC', nameAr: 'مراقبة الجودة الميكروبيولوجية', description: 'Sterility testing, environmental monitoring and the reagents behind pharmaceutical microbiology.' },
  { slug: 'endotoxin-testing', name: 'Endotoxin testing', nameAr: 'اختبار الإندوتوكسين', description: 'Endotoxin and pyrogen testing methods, interference and control strategies.' },
  { slug: 'bioprocessing', name: 'Filtration & bioprocessing', nameAr: 'الترشيح والمعالجة الحيوية', description: 'Sterile filtration, mycoplasma removal and single-use bioprocessing.' },
  { slug: 'liquid-handling', name: 'Liquid handling', nameAr: 'مناولة السوائل', description: 'Pipetting accuracy, calibration and liquid-handling practice in QC laboratories.' },
  { slug: 'food-beverage', name: 'Food & beverage QC', nameAr: 'مراقبة جودة الأغذية والمشروبات', description: 'Setting up and running food and beverage quality control laboratories.' },
  { slug: 'lab-projects', name: 'Laboratory projects', nameAr: 'مشاريع المختبرات', description: 'Planning, building and qualifying new laboratories.' },
  { slug: 'regulatory', name: 'Regulatory', nameAr: 'الشؤون التنظيمية', description: 'Regulatory pathways for laboratory and pharmaceutical products in the region.' },
]

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug)
