import { useState } from 'react';
import { Plus } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        className="flex w-full items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-medium text-black">{question}</span>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-red-700 text-white transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
        >
          <Plus size={20} />
        </div>
      </button>
      {isOpen && (
        <div className="animate-in fade-in slide-in-from-top-2 mt-4 text-gray-600 duration-300">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: 'How do I join the community?',
      answer:
        'You can join our community by signing up through our portal and participating in our regular events and workshops.',
    },
    {
      question: 'What benefits will I get after joining?',
      answer:
        "As a member, you'll get access to exclusive workshops, networking opportunities with industry professionals, and hands-on experience through collaborative projects.",
    },
    {
      question: 'What do I need to do to become a core member?',
      answer:
        'To become a core member, you should be an active contributor to our projects and consistently participate in community activities for at least 3 months.',
    },
  ];

  return (
    <section>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="block h-px w-6 bg-red-700" />
          <h2 className="text-xs font-bold tracking-widest uppercase text-red-700">
            FAQ
          </h2>
        </div>
        <h3 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Frequently Asked Questions
        </h3>
      </div>
    <div className="grid grid-cols-1 items-start gap-12 py-16 md:grid-cols-2 md:gap-24">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
      <div className="flex flex-col justify-start space-y-10 pt-4">
        <div className="space-y-6">
          <h2 className="text-4xl leading-tight font-bold text-black md:text-5xl lg:text-6xl">
            How You Can Be Part Of Us?
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-gray-500">
            Stay updated with our community activities, events, and opportunities. We regularly
            share news, workshops, and projects happening at Biratnagar International College.
          </p>
        </div>
        <div className="flex w-full items-center gap-4">
          <div className="relative flex-1">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full rounded-full border border-gray-200 bg-gray-50 px-8 py-5 text-gray-800 placeholder-gray-400 shadow-sm transition-all focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:outline-none"
              />
          </div>
          <button className="rounded-full bg-red-700 px-10 py-5 font-bold whitespace-nowrap text-white transition-all hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 active:scale-95">
            Lets Talk
          </button>
        </div>
      </div>
    </div>
              </section>
  );
};

export default FAQ;
