import React, { useState } from 'react';
import { PageId } from '../types';
import {
  BookOpen,
  HelpCircle,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Activity,
  Dna,
  Heart,
  Droplet,
  ShieldCheck,
  Stethoscope,
  Info,
  Sparkles,
} from 'lucide-react';

interface AwarenessPageProps {
  onNavigate: (page: PageId) => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

export const AwarenessPage: React.FC<AwarenessPageProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What is Thalassemia and how is it inherited?',
      answer:
        'Thalassemia is an inherited (genetic) blood disorder where the body is unable to synthesize sufficient healthy hemoglobin, the oxygen-carrying protein in red blood cells. It is passed from parents to children in an autosomal recessive manner. If both parents are healthy carriers (Thalassemia Trait/Minor), with each pregnancy there is a 25% chance of having a child with Thalassemia Major, a 50% chance of a carrier child, and a 25% chance of a completely unaffected child.',
    },
    {
      question: 'What is the difference between Thalassemia Trait (Minor) and Thalassemia Major?',
      answer:
        'Thalassemia Trait (Minor) means a person has inherited the mutated gene from only one parent. Carriers are completely healthy, do not need blood transfusions, have a normal lifespan, and often only discover their carrier status during routine blood tests (mildly low MCV/MCH). Thalassemia Major occurs when a child inherits mutated genes from both parents; they develop severe life-threatening anemia in infancy and require regular blood transfusions every 2 to 4 weeks for life.',
    },
    {
      question: 'Why do Thalassemia Major patients need regular blood transfusions?',
      answer:
        'Because their bone marrow cannot produce normal red blood cells, their hemoglobin levels drop dangerously low (often below 6–7 g/dL). Regular blood transfusions replenish healthy red blood cells, suppress abnormal bone marrow hyperactivity (which causes facial bone deformities), support physical growth, and prevent cardiac failure.',
    },
    {
      question: 'What is Iron Chelation Therapy and why is it mandatory?',
      answer:
        'The human body cannot naturally excrete excess iron. Every bag of transfused blood contains approximately 200–250 mg of iron. Over time, this iron accumulates in vital organs—especially the heart, liver, and endocrine glands. Iron chelation medicines (such as Deferasirox or Desferrioxamine) bind to toxic free iron and remove it through urine and stool, protecting vital organ function.',
    },
    {
      question: 'Can Thalassemia be completely prevented in Bangladesh?',
      answer:
        'Yes! Thalassemia is 100% preventable through pre-marital carrier screening. If individuals get tested with a simple Hemoglobin (Hb) Electrophoresis blood test before marriage, two carriers can avoid marrying each other, thereby completely eliminating the birth of children with Thalassemia Major.',
    },
    {
      question: 'Is bone marrow transplantation (BMT) a cure?',
      answer:
        'Allogeneic Hematopoietic Stem Cell (Bone Marrow) Transplantation from an HLA-matched sibling or matched donor currently represents the only widely established curative therapy. Gene therapy is also emerging globally. When BMT is performed early before iron overload complications develop, success rates exceed 85–90%.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-rose-600" />
          <span>Patient & Community Health Education</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          Understanding Thalassemia
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Comprehensive medical awareness, hereditary genetics, transfusion guidelines, iron chelation protocols, and prevention strategies in Bangladesh.
        </p>
      </div>

      {/* 2. Educational Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: What is Thalassemia */}
        <div className="p-6 rounded-3xl bg-[#fff8f8] border-2 border-red-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
            <Droplet className="w-5 h-5 fill-red-600" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 font-display">
            1. Introduction & Nature
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Thalassemia is a group of inherited autosomal recessive blood disorders characterized by reduced or absent synthesis of alpha or beta globin chains in hemoglobin. This leads to ineffective erythropoiesis and early destruction of red blood cells (hemolysis).
          </p>
        </div>

        {/* Card 2: Causes & Genetics */}
        <div className="p-6 rounded-3xl bg-[#fff8f8] border-2 border-red-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <Dna className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 font-display">
            2. Causes & Genetics
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Caused by genetic mutations in the HBB gene (Beta Thalassemia) on chromosome 11 or HBA genes on chromosome 16. In Bangladesh, <strong>Beta Thalassemia Trait</strong> and <strong>Hb E-Beta Thalassemia</strong> are the most prevalent clinical presentations.
          </p>
        </div>

        {/* Card 3: Clinical Symptoms */}
        <div className="p-6 rounded-3xl bg-[#fff8f8] border-2 border-red-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 font-display">
            3. Common Symptoms
          </h3>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed font-medium">
            <li>Pale skin, severe pallor, extreme fatigue</li>
            <li>Jaundice (yellowing of skin and eyes)</li>
            <li>Enlarged abdomen due to Splenomegaly & Hepatomegaly</li>
            <li>Delayed physical and sexual development</li>
            <li>Typical "thalassemic facies" (prominent cheekbones)</li>
          </ul>
        </div>

        {/* Card 4: Diagnosis */}
        <div className="p-6 rounded-3xl bg-[#fff8f8] border-2 border-red-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Stethoscope className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 font-display">
            4. Diagnostic Testing
          </h3>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed font-medium">
            <li><strong>Complete Blood Count (CBC):</strong> Low Hb, low MCV (&lt;80 fL), low MCH</li>
            <li><strong>Hb Electrophoresis / HPLC:</strong> Quantifies HbA, HbA2, HbF, and abnormal variants (HbE)</li>
            <li><strong>Serum Ferritin:</strong> Measures iron overload level</li>
            <li><strong>DNA Mutation Analysis:</strong> Confirmatory genetic testing</li>
          </ul>
        </div>

        {/* Card 5: Blood Transfusion & Iron Chelation */}
        <div className="p-6 rounded-3xl bg-[#fff8f8] border-2 border-red-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5 fill-emerald-600 text-emerald-600" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 font-display">
            5. Treatment Protocol
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Target pre-transfusion hemoglobin is maintained between <strong>9.5 – 10.5 g/dL</strong> to support growth and suppress bone marrow expansion. Daily oral iron chelation (Deferasirox / Desirox) is required once serum ferritin exceeds 1,000 ng/mL.
          </p>
        </div>

        {/* Card 6: Prevention Strategies */}
        <div className="p-6 rounded-3xl bg-[#fff8f8] border-2 border-red-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 font-display">
            6. Prevention in Bangladesh
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Pre-marital screening is the most powerful tool. If all young adults test their carrier status before marriage, Thalassemia can be eradicated within a single generation, following successful international models like Cyprus and Italy.
          </p>
        </div>
      </div>

      {/* 3. Detailed Transfusion Guidelines Section */}
      <div className="bg-[#fff8f8] rounded-3xl p-8 sm:p-10 border-2 border-red-200 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-red-600">
            Clinical Best Practices
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
            Safe Blood Transfusion Guidelines
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Standard protocols recommended by international thalassemia federations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-600">
          <div className="p-5 rounded-2xl bg-white border border-red-200/80 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">1. Voluntary Non-Remunerated Donors</h4>
            <p className="leading-relaxed font-medium">
              Always source blood from healthy voluntary donors rather than professional/paid donors to minimize transfusion-transmitted viral infections.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-red-200/80 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">2. Leuko-Depletion Filtration</h4>
            <p className="leading-relaxed font-medium">
              White blood cells (leukocytes) in donor blood are the primary cause of febrile non-hemolytic transfusion reactions. Use bed-side or pre-storage leuko-filters.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-red-200/80 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">3. Extended Antigen Phenotyping</h4>
            <p className="leading-relaxed font-medium">
              Beyond ABO and Rh(D), match Rh sub-antigens (C, c, E, e) and Kell (K) to prevent alloimmunization in chronically transfused patients.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Frequently Asked Questions (Accordion) */}
      <div className="bg-[#fff8f8] rounded-3xl p-8 sm:p-10 border-2 border-red-200 shadow-xs space-y-6">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-extrabold uppercase tracking-wider text-red-600">
            Got Questions?
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-red-200 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm text-slate-900 bg-red-50/50 hover:bg-red-100/60 flex items-center justify-between gap-4"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-red-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-5 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-red-100 font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Mandatory Medical Disclaimer Note */}
      <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-4 leading-relaxed">
        <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-sm text-amber-950 mb-1">Educational Notice & Medical Disclaimer</h4>
          <p>
            This information is provided for educational and awareness purposes and does not replace professional medical advice, diagnosis, or personalized treatment. Consult a registered physician, hematologist, or specialized thalassemia center for any medical decisions.
          </p>
        </div>
      </div>
    </div>
  );
};
