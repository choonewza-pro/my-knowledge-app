import { Link } from 'react-router-dom';
import { Hero, KnowledgeCard } from '../components/features';
import { Card } from '../components/common';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { knowledgeItems } from '../data/knowledgeItems';
import { features } from '../data/features';
import { ROUTES } from '../utils/constants';

export default function HomePage() {
  useDocumentTitle('My Knowledge Base - บันทึกและสรุปความรู้', '');

  return (
    <>
      <Hero
        title="My Knowledge Base"
        subtitle="บันทึกและสรุปความรู้ในหัวข้อต่างๆ ทั้งการพัฒนาโปรแกรม การสร้างระบบ AI และความรู้ทั่วไป"
        ctaText="สำรวจความรู้"
        ctaLink="#knowledge"
      />

      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              จุดเด่นของแอป
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              แพลตฟอร์มบันทึกความรู้ที่ออกแบบมาให้จัดการและค้นหาข้อมูลได้ง่าย
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.id}
                variant="elevated"
                hover
                className="text-center p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-purple-700 text-4xl text-white group-hover:scale-110 transition-transform duration-300">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-base-content/70">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="knowledge" className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              เนื้อหาความรู้
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              เลือกหัวข้อที่คุณสนใจเพื่อเริ่มเรียนรู้
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {knowledgeItems.map((item) => (
              <Link key={item.id} to={item.link} className="block group">
                <KnowledgeCard
                  icon={<i className={item.icon}></i>}
                  title={item.title}
                  description={item.description}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-linear-to-br from-purple-500 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            เริ่มสำรวจความรู้
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg opacity-90">
            ค้นพบบทความและบันทึกความรู้ที่น่าสนใจในหัวข้อต่างๆ
          </p>
          <Link
            to={ROUTES.KNOWLEDGE.GIT_COMMANDS}
            className="inline-flex items-center px-8 py-4 bg-white text-purple-700 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            ดูบทความทั้งหมด
            <i className="bi-arrow-right ml-2"></i>
          </Link>
        </div>
      </section>
    </>
  );
}