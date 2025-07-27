import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    // Check if there's a hash in the URL and scroll to it
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          const offset = 120; // Scroll to 120px above the element
          window.scrollTo({
            top: absoluteElementTop - offset,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, []);

  const skills = [
    { name: "Python/Flask/FastAPI", level: 80 },
    { name: "AWS/Cloud", level: 50 },
    { name: "Docker", level: 50 },
    { name: "LangGraph", level: 80 },
    { name: "MySQL", level: 90 },
    { name: "Postgres", level: 90 },
    { name: "Superset", level: 80 },
  ];

  const interests = [
    "AI Solution Design",
    "Cloud Architecture",
    "Technical Writing",
    "Microservices",
    "AI Security",
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            About <span className="text-primary">Lichia Reghu</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
          Committed to unraveling the complexities of user experience requirements to create effective technical strategies for AI solutions.
          </p>
        </div>
      </section>

      {/* Detailed Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">My Story</h2>
              
              <div className="prose prose-lg text-slate-600 space-y-6">
                <p>
                  With a strong current focus on Agentic AI and Retrieval-Augmented Generation (RAG), I specialize in building intelligent systems that blend reasoning, context awareness, and real-world utility. I've worked extensively with Agentic SDKs such as OpenAI and LangGraph, creating modular, dynamic agents that can adapt to different workflows. My experience also includes building conversational agents and chatbots, as well as training custom machine learning models using Sentence Transformers for semantic understanding. I bring precision to every part of the AI stack—from embedding generation to inference—and care deeply about aligning solutions with business outcomes. I ensure that the systems I design are fault tolerant, operationally stable, and continuously monitored for performance deviations, enabling proactive improvements and minimizing downtime in production environments.
                </p>
                
                <p id="story-continued">
                  In addition to my AI work, I've participated in building data infrastructure and pipelines that support scalable analytics and decision-making. I've worked with modern ETL tools like Fivetran and Airbyte, as well as structured data warehouses for organizing transformed and consumable datasets. From ingestion to modeling, my goal is to design pipelines that are resilient, maintainable, and efficient, supporting both operational needs and downstream intelligence systems such as dashboards and personalized recommendation engines.
                </p>
                
                <p>
                  My career began as an engineering tutor, where I cultivated the skill of making complex concepts approachable. I then spent 13 years at India's largest telecom company, growing from an engineer into senior roles and gaining deep expertise in systems thinking, operations, and enterprise-scale engineering. It was during this time that I designed my first reporting solution—an experience that marked the beginning of my transition into full-fledged solution architecture and AI system design. Since then, I've worked with startups and small businesses to turn ideas into functioning prototypes, helping them harness data and AI in meaningful ways.
                </p>
                
                <p>
                  Outside of work, I find joy in singing and listening to old melodies, cooking, and spending quality time with myself for reflection and rest. Whether I'm solving a technical challenge or mentoring others, my approach is grounded in clarity, creativity, and thoughtful execution.
                </p>
              </div>
            </div>
            
            <div>
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Quick Facts</h3>
                <div className="space-y-3 text-slate-600">
                  <div><strong>Location:</strong> Stevenage, UK</div>
                  <div><strong>Experience:</strong> 4 Years</div>
                  <div><strong>Focus:</strong> AI Solution Architecture</div>
                  <div><strong>Education:</strong> M-Tech in Microelectronics and VLSI</div>
                  <div><strong>Languages:</strong> English, Kannada, Hindi, Tamil</div>
                  <div><strong>Availability:</strong> Open to opportunities</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Technical Expertise</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-slate-900">{skill.name}</h3>
                  <span className="text-sm text-slate-600">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interests & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Interests & Passions</h2>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">My Values</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Commitment to Quality</h3>
                  <p className="text-slate-600">I believe in delivering high-quality, reliable solutions that exceed expectations and create lasting impact.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Continuous Learning</h3>
                  <p className="text-slate-600">I stay current with emerging technologies and industry trends to deliver cutting-edge AI solutions.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Growth Oriented</h3>
                  <p className="text-slate-600">I embrace challenges as opportunities to expand my skills and push the boundaries of what's possible.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Collaboration</h3>
                  <p className="text-slate-600">I believe the best solutions emerge from working together with teams and stakeholders to achieve shared goals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Build Something Amazing Together</h2>
          <p className="text-xl text-blue-100 mb-8">
            I'm always excited to work on new projects and collaborate with talented teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-blue-50 smooth-transition">
              Get In Touch
            </a>
            <a href="/portfolio" className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary smooth-transition">
              View My Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
