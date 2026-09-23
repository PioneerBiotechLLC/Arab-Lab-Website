// Blog categories. The slug is the URL (/blog/category/[slug]); names are shown on cards and in breadcrumbs.
export type Category = { slug: string; name: string; nameAr: string; description: string; descriptionAr: string }

export const categories: Category[] = [
  { slug: 'microbiology-qc', name: 'Microbiology QC', nameAr: 'مراقبة الجودة الميكروبيولوجية', description: 'Sterility testing, environmental monitoring and the reagents behind pharmaceutical microbiology.', descriptionAr: 'اختبار العقم والمراقبة البيئية والكواشف التي تقوم عليها الميكروبيولوجيا الدوائية.' },
  { slug: 'endotoxin-testing', name: 'Endotoxin testing', nameAr: 'اختبار الإندوتوكسين', description: 'Endotoxin and pyrogen testing methods, interference and control strategies.', descriptionAr: 'طرق اختبار الإندوتوكسين والمواد المولدة للحمى، والتداخل، واستراتيجيات الضبط.' },
  { slug: 'bioprocessing', name: 'Filtration & bioprocessing', nameAr: 'الترشيح والمعالجة الحيوية', description: 'Sterile filtration, mycoplasma removal and single-use bioprocessing.', descriptionAr: 'الترشيح المعقم وإزالة الميكوبلازما والمعالجة الحيوية أحادية الاستخدام.' },
  { slug: 'liquid-handling', name: 'Liquid handling', nameAr: 'مناولة السوائل', description: 'Pipetting accuracy, calibration and liquid-handling practice in QC laboratories.', descriptionAr: 'دقة السحب بالماصات ومعايرتها وممارسات مناولة السوائل في مختبرات مراقبة الجودة.' },
  { slug: 'food-beverage', name: 'Food & beverage QC', nameAr: 'مراقبة جودة الأغذية والمشروبات', description: 'Setting up and running food and beverage quality control laboratories.', descriptionAr: 'إنشاء مختبرات مراقبة جودة الأغذية والمشروبات وتشغيلها.' },
  { slug: 'lab-projects', name: 'Laboratory projects', nameAr: 'مشاريع المختبرات', description: 'Planning, building and qualifying new laboratories.', descriptionAr: 'تخطيط المختبرات الجديدة وبناؤها وتأهيلها.' },
  { slug: 'regulatory', name: 'Regulatory', nameAr: 'الشؤون التنظيمية', description: 'Regulatory pathways for laboratory and pharmaceutical products in the region.', descriptionAr: 'المسارات التنظيمية للمنتجات المخبرية والدوائية في المنطقة.' },
]

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug)
