import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Github,
  Linkedin,
  Mail,
  Briefcase,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import profilePhoto from "@/assets/images/profile-photo.jpg";
import pythonLogo from "../../../logos/python-logo.png";
import dockerLogo from "../../../logos/docker.png";
import awsLogo from "../../../logos/aws.png";
import langgraphLogo from "../../../logos/langgraph.png";
import postgresLogo from "../../../logos/postgres.png";
import supersetLogo from "../../../logos/superset.png";
import airbyteLogo from "../../../logos/airbyte.png";
import dbtLogo from "../../../logos/dbt.png";
import qdrantLogo from "../../../logos/qdrant.png";

const Home = () => {
  const skills = [
    { name: "Python", icon: pythonLogo, color: "text-blue-600" },
    { name: "Docker", icon: dockerLogo, color: "text-blue-600" },
    { name: "AWS", icon: awsLogo, color: "text-orange-500" },
    { name: "LangGraph", icon: langgraphLogo, color: "text-purple-500" },
    { name: "Postgres", icon: postgresLogo, color: "text-blue-500" },
    { name: "Superset", icon: supersetLogo, color: "text-green-500" },
    { name: "Airbyte", icon: airbyteLogo, color: "text-indigo-500" },
    { name: "DBT", icon: dbtLogo, color: "text-orange-600" },
    { name: "Qdrant", icon: qdrantLogo, color: "text-blue-700" },
  ];

  const projects = [
    {
      id: "esg-web-crawler",
      title: "AI-Powered ESG Research System",
      description: "Advanced AI-driven sustainability analysis platform with intelligent query generation and vector embeddings",
      image: "https://images.unsplash.com/photo-1753191326444-f00046939b59?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tech: ["Python", "OpenAI API", "FAISS", "AI/ML"],
      techColors: ["bg-blue-100 text-blue-800", "bg-green-100 text-green-800", "bg-purple-100 text-purple-800", "bg-orange-100 text-orange-800"],
      githubUrl: "https://github.com/lichiareghu/web_crawler",
    },
    {
      id: "research-assistant",
      title: "AI-Powered Research Assistant",
      description: "Interactive research platform with parallel AI agents for comprehensive topic analysis",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["Python", "OpenAI API", "LangChain", "AI Agents"],
      techColors: ["bg-blue-100 text-blue-800", "bg-green-100 text-green-800", "bg-purple-100 text-purple-800", "bg-orange-100 text-orange-800"],
    },
    {
      id: "task-management",
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates and team features",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["Vue.js", "Firebase", "Tailwind"],
      techColors: ["bg-blue-100 text-blue-800", "bg-orange-100 text-orange-800", "bg-yellow-100 text-yellow-800"],
    },
    {
      id: "analytics",
      title: "Analytics Dashboard",
      description: "Data visualization platform with interactive charts and real-time analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["Angular", "D3.js", "Express"],
      techColors: ["bg-red-100 text-red-800", "bg-blue-100 text-blue-800", "bg-gray-100 text-gray-800"],
    },
    {
      id: "slack-bot",
      title: "Slack Bot",
      description: "A chatbot that can be used to answer questions and help with tasks for your team.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["Python", "Slack API", "LangChain", "AI Agents"],
      techColors: ["bg-red-100 text-red-800", "bg-blue-100 text-blue-800", "bg-gray-100 text-gray-800"],
    },
  ];

  const stats = [
    { number: "5", label: "Projects Completed" },
    { number: "4", label: "Years Experience" },
    { number: "3", label: "Happy Clients" },
    { number: "1", label: "AI Models Deployed" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="gradient-bg py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
                Hi, I'm <span className="text-primary">Lichia Reghu</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                AI Engineer focused on Agentic AI and RAG, turning cutting-edge ideas into real-world impact. I prototype smart solutions for businesses, build data pipelines that power decision-making, and help small teams scale with AI. Currently exploring AWS cloud to expand my cloud capabilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/portfolio">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    <Briefcase className="mr-2 h-4 w-4" />
                    View My Work
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    <Mail className="mr-2 h-4 w-4" />
                    Get In Touch
                  </Button>
                </Link>
              </div>
              <div className="flex gap-6 justify-center lg:justify-start mt-8">
                <a href="https://www.linkedin.com/in/lichiareghu" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary smooth-transition text-xl">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="https://github.com/lichiareghu" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary smooth-transition text-xl">
                  <Github className="h-6 w-6" />
                </a>
                <a href="mailto:lichiareghu@gmail.com" className="text-slate-600 hover:text-primary smooth-transition text-xl">
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img 
                src={profilePhoto} 
                alt="Lichia Reghu - Professional headshot" 
                className="w-80 h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">About Me</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Committed to unraveling the complexities of user experience requirements to create effective technical strategies for AI solutions.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">My Journey</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                With a strong current focus on Agentic AI and Retrieval-Augmented Generation (RAG), I specialize in building intelligent systems that blend reasoning, context awareness, and real-world utility. I've worked extensively with Agentic SDKs such as OpenAI and LangGraph, creating modular, dynamic agents that can adapt to different workflows. My experience also includes building conversational agents and chatbots, as well as training custom machine learning models using Sentence Transformers for semantic understanding. I bring precision to every part of the AI stack—from embedding generation to inference—and care deeply about aligning solutions with business outcomes. I ensure that the systems I design are fault tolerant, operationally stable, and continuously monitored for performance deviations, enabling proactive improvements and minimizing downtime in production environments.
              </p>
              <Link href="/about#story-continued">
                <Button variant="link" className="text-primary font-medium p-0">
                  Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 text-center bg-slate-50">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Technical Skills</h2>
            <p className="text-xl text-slate-600">Technologies I work with on a daily basis</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map((skill, index) => (
              <Card key={index} className="skill-badge p-4 text-center shadow-sm hover:shadow-md cursor-pointer">
                <div className="mb-2 flex justify-center">
                  <img 
                    src={skill.icon} 
                    alt={`${skill.name} logo`} 
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div className="font-medium text-slate-900">{skill.name}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-slate-600">A selection of my recent work</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link key={index} href={`/portfolio/${project.id}`} className="block">
                <Card className="project-card overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{project.title}</h3>
                    <p className="text-slate-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className={`px-2 py-1 rounded text-sm ${project.techColors[techIndex]}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <span className="text-primary hover:text-primary/80 smooth-transition">
                        <ExternalLink className="inline mr-1 h-4 w-4" />View Details
                      </span>
                      {project.githubUrl ? (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:text-slate-800 smooth-transition"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="inline mr-1 h-4 w-4" />Code
                        </a>
                      ) : (
                        <span className="text-slate-600 hover:text-slate-800 smooth-transition">
                          <Github className="inline mr-1 h-4 w-4" />Code
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/portfolio">
              <Button className="bg-primary text-white hover:bg-primary/90">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">Lichia Reghu</h3>
              <p className="mb-4">
                AI Engineer specializing in Agentic AI and RAG systems, turning cutting-edge ideas into real-world impact.
              </p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/lichiareghu" target="_blank" rel="noopener noreferrer" className="hover:text-white smooth-transition">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://github.com/lichiareghu" target="_blank" rel="noopener noreferrer" className="hover:text-white smooth-transition">
                  <Github className="h-5 w-5" />
                </a>
                <a href="mailto:lichiareghu@gmail.com" className="hover:text-white smooth-transition">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/"><a className="block hover:text-white smooth-transition">Home</a></Link>
                <Link href="/about"><a className="block hover:text-white smooth-transition">About</a></Link>
                <Link href="/portfolio"><a className="block hover:text-white smooth-transition">Portfolio</a></Link>
                <Link href="/contact"><a className="block hover:text-white smooth-transition">Contact</a></Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <div className="space-y-2">
                <p>Technical Consultation & Solution Design</p>
                <p>Requirements Discovery & Alignment</p>
                <p>Agentic AI System Design</p>
                <p>AI Prototype Development</p>
                <p>Data Pipeline & Dashboard Solutions</p>
                <p>AI Readiness Assessment</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p>&copy; 2024 Lichia Reghu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
