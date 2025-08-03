import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Building } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "AI Engineer and Solutions Architect",
      company: "Bettercoach GmbH",
      location: "Berlin, Germany",
      period: "2023 - Present",
      duration: "2 years",
      type: "Contract",
      description: "Specialized in Agentic AI and RAG systems, building intelligent solutions that combine reasoning, context awareness, and real-world utility. Work extensively with OpenAI, LangGraph, and custom ML models.",
      achievements: [
        "Developed 3 production-ready AI agents using LangGraph and OpenAI APIs",
        "Built RAG systems that improved information retrieval accuracy by 85%",
        "Created custom embedding models using Sentence Transformers for semantic understanding",
        "Implemented fault-tolerant AI systems with 99.9% uptime in production",
        "Reduced AI model inference time by 60% through optimization techniques",
      ],
      technologies: ["Python", "OpenAI API", "LangGraph", "Sentence Transformers", "FAISS", "Docker", "AWS", "PostgreSQL"],
      current: true,
    },
    {
      title: "BI Consultant",
      company: "Ooodles Ltd",
      location: "London, UK",
      period: "2022 - 2023",
      duration: "1 year",
      type: "Contract",
      description: "Participated in the development of a BI tool for a CFO and Team. The tool was used to analyze and visualize data from the client's database.",
      achievements: [
        "Built 8 client projects from concept to deployment, all delivered on time",
        "Improved application performance by 40% through code optimization",
        "Implemented automated testing reducing bugs in production by 70%",
        "Led migration of legacy systems to modern tech stack",
        "Collaborated with design team to improve user experience metrics by 25%",
      ],
      technologies: ["Python", "DBT", "Redshift", "PostgreSQL", "SAP Database", "Fivetran", "ETL"],
      current: false,
    },
    {
      title: "Sub Divisional Engineer",
      company: "BSNL",
      location: "Kerala, India",
      period: "2021 - 2022",
      duration: "1 year",
      type: "Full-time",
      description: "Led telecommunications infrastructure projects, managed network operations, and supervised maintainance teams. Oversaw maintenance of telecom equipment and coordinated with vendors for network upgrades and expansions.",
      achievements: [
        "Developed Bespoke ETL pipeline for technical reporting of GSM Mobile core network",
        "Designed and implemented report to track network traffic of POI (Point of Interconnection)",
        "Automated the process of generating daily reports for Voice Traffic, Kerala",
        "Developed a report to recommend traffic rerouting for optimal network performance",
        "Mentored 1 junior engineer in data analysis, reporting and Telecom Operations and Maintainance",
      ],
      technologies: ["Python", "Pandas", "SQL", "Telecom"],
      current: false,
    },
    {
      title: "Junior Telecom Officer",
      company: "BSNL",
      location: "India",
      period: "2022 - 2009",
      duration: "13 years",
      type: "Full-time",
      description: "Worked as a Junior Telecom Officer in BSNL, Kerala. My responsibilities included managing network operations, supervising maintainance teams, and coordinating with vendors for network upgrades and expansions.",
      achievements: [
        "Managed network operations and maintained telecom equipments for different stations",
        "Supervised maintainance teams and coordinated with vendors for network upgrades",
        "Managed customer complaints and resolved them within the SLA",
        "Mentored junior engineers on equipment maintainance and operations",
      ],
      technologies: ["Python", "Pandas", "SQL", "Telecom"],
      current: false,
    }, 
    {
      title: "Lecturer",
      company: "Amrita Vishwa Vidyapeetham",
      location: "Tamil Nadu, India",
      period: "2004 - 2008",
      duration: "4 years",
      type: "Full-time",
      description: "Worked as a Lecturer in Amrita Vishwa Vidyapeetham, Kerala. My responsibilities included teaching students and conducting research.",
      achievements: [
        "Taught students in the field of Electronics and Communication Engineering",
        "Conducted research in the field of Electronics and Communication Engineering",
        "Mentored students in the field of Electronics and Communication Engineering serving as their advisor",
      ],
      technologies: ["Engineering Laboratory"],
      current: false,
    },           
  ];

  const certifications = [
    {
      title: "Introduction to LangGraph",
      issuer: "LangChain Academy",
      date: "2025-06-15",
      credential: "s0jdlmqoym",
      logo: "🦜",
    },
    {
      title: "AI Solutions Architecture",
      issuer: "ELVTR",
      date: "2024",
      logo: "🔴",
    },
    {
      title: "Python and Apps Kickstarter course",
      issuer: "Code First Girls",
      date: "2024",
      credential: "CK24SWABP",
      logo: "⚛️",
    },
    {
      title: "Introduction to Data and SQL",
      issuer: "Code First Girls",
      date: "2023",
      credential: "CK23LDNBTD",
      logo: "🚢",
    },
    {
      title: "Tableau Desktop Certified Associate",
      issuer: "Simplilearn",
      date: "2022",
      credential: "3213186",
      logo: "🚢",
    },   
    {
      title: "Machine Learning Advanced Certification Training",
      issuer: "Simplilearn",
      date: "2021",
      credential: "2869506",
      logo: "🚢",
    },      
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Career <span className="text-primary">Experience</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            My professional journey through AI development, data analysis, reporting, telecom operations and teaching,
            building insights and delivering actionable solutions.
          </p>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Professional Experience</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"></div>
            
            {experiences.map((experience, index) => (
              <div key={index} className="relative mb-12 md:pl-16">
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full transform -translate-x-2 hidden md:block"></div>
                
                <Card className="p-8 shadow-lg">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-2xl font-bold text-slate-900">{experience.title}</h3>
                        {experience.current && (
                          <Badge className="bg-success text-white">Current</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-primary font-medium mb-2">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {experience.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {experience.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-slate-600 mb-4">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {experience.period}
                        </div>
                        <Badge variant="outline">{experience.duration}</Badge>
                        <Badge variant="outline">{experience.type}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {experience.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start gap-2 text-slate-600">
                          <span className="text-primary mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Professional Certifications</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-6 hover:shadow-lg smooth-transition">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{cert.logo}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-primary font-medium mb-2">{cert.issuer}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">{cert.date}</span>
                      <Badge variant="outline" className="text-xs">
                        {cert.credential}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Summary */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Skills Gained Through Experience</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Technical Leadership</h3>
              <p className="text-slate-600">
                Leading maintainance teams, architectural decisions, and mentoring junior developers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Full-Stack Development</h3>
              <p className="text-slate-600">
                End-to-end application development from database design to user interface.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">DevOps & Cloud</h3>
              <p className="text-slate-600">
                CI/CD implementation, cloud architecture, and infrastructure automation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;
