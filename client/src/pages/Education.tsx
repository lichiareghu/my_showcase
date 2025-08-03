import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, BookOpen, Calendar } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Master of Technology in Microelectronics and VLSI Design",
      institution: "National Institute of Technology, Calicut",
      location: "Kerala, India",
      period: "2006 - 2008",
      gpa: "8.69/10",
      honors: "Second Top scorer in the department",
      description: "Specialized in Microelectronics and MOS Device Modeling",
      coursework: [
        "Semiconductor Device Theory",
        "Digital Integrated Sytem Design",
        "MOS Device Modelling",
      ],
      projects: [
        "Senior Capstone: Effect of gate underlap in double gate SOI FINFET",
      ],
    },
    {
      degree: "Bachelor of Technology in Electronics and Communication Engineering",
      institution: "Cochin University of Science and Technology",
      location: "Kerala, India",
      period: "2000 - 2004",
      gpa: "7.5/10",
      honors: "Top scorer in the department",
      description: "Specialized in Electronics and communication engineering with focus on GSM Mobile Telecommunication",
      coursework: [
        "Computer Networks",
        "VLSI System Design",
        "Digital Communication",
      ],
      projects: [
        "Senior Capstone: Communication module for Rocket Launching trajectory correction",
      ],
    },
  ];

  const certifications = [
    {
      title: "Introduction to LangGraph",
      issuer: "LangChain Academy",
      date: "2025",
      expiry: "Lifetime",
      credentialId: "s0jdlmqoym",
      description: "Advanced certification in LangGraph Agentic Framework",
      skills: ["LangGraph"],
      logo: "☁️",
      color: "bg-orange-100 text-orange-800",
    },
    {
      title: "AI Solutions Architecture",
      issuer: "ELVTR",
      date: "2024",
      expiry: "Lifetime",
      description: "Professional certification in architecting AI solutions.",
      skills: ["Amazon Bedrock", "Intelligent Document Processing", "Agentic AI"],
      logo: "🔴",
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Python and Apps Kickstarter course",
      issuer: "Code First Girls",
      date: "2024",
      expiry: "Lifetime",
      credentialId: "CK24SWABP",
      description: "Basic course in python development",
      skills: ["Python"],
      logo: "⚛️",
      color: "bg-cyan-100 text-cyan-800",
    },
    {
      title: "Introduction to Data and SQL",
      issuer: "Code First Girls",
      date: "2023",
      expiry: "Lifetime",
      credentialId: "CK23LDNBTD",
      description: "Basic database course in MySQL.",
      skills: ["SQL", "Database Design"],
      logo: "🚢",
      color: "bg-purple-100 text-purple-800",
    },
    {
      title: "Tableau Desktop Certified Associate",
      issuer: "Simplilearn",
      date: "2022",
      expiry: "Lifetime",
      credentialId: "3213186",
      description: "Professional certification in Tableau Desktop.",
      skills: ["Dashboard Development", "Data Cleaning", "Data Analysis"],
      logo: "🍃",
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Machine Learning Advanced Certification Training",
      issuer: "Simplilearn",
      date: "2021",
      expiry: "Lifetime",
      credentialId: "2869506",
      description: "Basic course on Machine Learning model development.",
      skills: ["Regression","Random Forest", "Gradient Boosting", "Neural Networks"],
      logo: "🎯",
      color: "bg-yellow-100 text-yellow-800",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Education & <span className="text-primary">Certifications</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            My academic journey and continuous learning through professional certifications
            and specialized training programs.
          </p>
        </div>
      </section>

      {/* Formal Education */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            <GraduationCap className="inline-block mr-2 h-8 w-8 text-primary" />
            Formal Education
          </h2>
          
          {education.map((edu, index) => (
            <Card key={index} className="p-8 shadow-lg">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{edu.degree}</h3>
                      <p className="text-lg text-primary font-medium mb-1">{edu.institution}</p>
                      <p className="text-slate-600 mb-2">{edu.location}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {edu.period}
                        </span>
                        <Badge variant="outline">GPA: {edu.gpa}</Badge>
                        <Badge className="bg-success text-white">{edu.honors}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">{edu.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Key Coursework:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {edu.coursework.map((course, courseIndex) => (
                        <Badge key={courseIndex} variant="secondary" className="justify-start">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Notable Projects:</h4>
                  <ul className="space-y-2">
                    {edu.projects.map((project, projectIndex) => (
                      <li key={projectIndex} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-primary mt-1">•</span>
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Professional Certifications */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            <Award className="inline-block mr-2 h-8 w-8 text-primary" />
            Professional Certifications
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-6 hover:shadow-lg smooth-transition">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl">{cert.logo}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-primary font-medium mb-2">{cert.issuer}</p>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        Issued: {cert.date}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Expires: {cert.expiry}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm mb-4">{cert.description}</p>
                
                <div className="mb-3">
                  <p className="text-xs text-slate-500 mb-2">Key Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} className={`text-xs ${cert.color}`}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-xs text-slate-500">
                  Credential ID: {cert.credentialId}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Philosophy */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Commitment to Lifelong Learning</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Technology evolves rapidly, and I believe in staying current through continuous education,
            hands-on practice, and sharing knowledge with the developer community.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Learn</h3>
              <p className="text-blue-100">Constantly updating skills through courses and certifications</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🔨</div>
              <h3 className="text-xl font-semibold mb-2">Practice</h3>
              <p className="text-blue-100">Applying new knowledge in real-world projects</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Share</h3>
              <p className="text-blue-100">Contributing to the community through mentoring and writing</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;
