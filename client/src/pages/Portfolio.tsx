import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ExternalLink, Github, Eye } from "lucide-react";
import { useState } from "react";

const Portfolio = () => {
  const projects = [
    {
      id: "esg-web-crawler",
      title: "AI-Powered ESG Research System",
      description: "A comprehensive, production-ready ESG research system that uses advanced AI techniques to analyze companies' sustainability practices and generate detailed reports with intelligent query generation and vector embeddings.",
      longDescription: "This sophisticated ESG research platform leverages cutting-edge AI technologies to provide comprehensive sustainability analysis for companies worldwide. The system features intelligent query generation, advanced document processing, vector embeddings for semantic search, and AI-powered content analysis to deliver detailed ESG reports with source verification.",
      image: "https://images.unsplash.com/photo-1753191326444-f00046939b59?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tech: ["Python", "OpenAI API", "FAISS", "DuckDuckGo API", "BeautifulSoup", "Pydantic", "Vector Embeddings", "AI/ML"],
      category: "AI/ML",
      year: "2024",
      client: "ESG Research Platform",
      duration: "8 months",
      featured: true,
    },
          {
        id: "research-assistant",
        title: "AI-Powered Interactive Research Assistant",
        description: "An intelligent research platform that employs parallel analyst agents to conduct comprehensive topic research. Users define research perspectives and the system generates detailed reports through collaborative AI agents working across multiple data sources.",
        longDescription: "This innovative research assistant revolutionizes how complex topics are analyzed by leveraging parallel AI agents that work collaboratively to gather, analyze, and synthesize information. The system allows users to define specific perspectives they want explored, then deploys specialized analyst agents to pull data from diverse sources, generate structured notes, and produce comprehensive reports with multiple viewpoints.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        tech: ["Python", "OpenAI API", "LangChain", "Parallel Processing", "AI Agents", "Web Scraping", "Natural Language Processing", "Report Generation"],
        category: "AI/ML",
        year: "2024",
        client: "Research Platform",
        duration: "6 months",
        featured: true,
    },
    {
      id: "task-management",
      title: "Task Management Application",
      description: "Collaborative project management tool with real-time updates, team collaboration features, and advanced reporting capabilities.",
      longDescription: "A comprehensive project management solution designed for remote teams. Features include kanban boards, time tracking, team chat, file sharing, and detailed project analytics.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["Vue.js", "Firebase", "Tailwind CSS", "Node.js", "Socket.io"],
      category: "Web App",
      year: "2023",
      client: "StartupXYZ",
      duration: "4 months",
      featured: true,
    },
    {
      id: "analytics-dashboard",
      title: "Analytics Dashboard",
      description: "Real-time data visualization platform with interactive charts, custom reports, and advanced filtering capabilities.",
      longDescription: "A powerful analytics platform that transforms complex data into actionable insights. Features include real-time data processing, custom dashboard creation, and automated report generation.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["Angular", "D3.js", "Express", "PostgreSQL", "Redis"],
      category: "Data Visualization",
      year: "2022",
      client: "DataCorp",
      duration: "8 months",
      featured: true,
    },
    {
      id: "mobile-banking",
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication, real-time transactions, and advanced security features.",
      longDescription: "A modern mobile banking solution built with security as the top priority. Features include biometric authentication, real-time fraud detection, and seamless user experience.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["React Native", "Node.js", "PostgreSQL", "JWT", "Biometrics"],
      category: "Mobile",
      year: "2022",
      client: "FinanceBank",
      duration: "10 months",
      featured: false,
    },
    {
      id: "learning-platform",
      title: "Online Learning Platform",
      description: "Educational platform with video streaming, interactive quizzes, progress tracking, and certification system.",
      longDescription: "A comprehensive e-learning platform designed for professional development. Features include video courses, interactive assessments, progress tracking, and certification management.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["Next.js", "Prisma", "MySQL", "Stripe", "Cloudinary"],
      category: "Education",
      year: "2022",
      client: "EduTech",
      duration: "5 months",
      featured: false,
    },
    {
      id: "inventory-system",
      title: "Inventory Management System",
      description: "Enterprise inventory management solution with barcode scanning, automated reordering, and real-time tracking.",
      longDescription: "A robust inventory management system designed for manufacturing companies. Features include barcode integration, automated stock alerts, supplier management, and detailed reporting.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["Python", "Django", "PostgreSQL", "Redis", "Celery"],
      category: "Enterprise",
      year: "2021",
      client: "ManufactureCorp",
      duration: "7 months",
      featured: false,
    },
    {
      id: "slack-bot",
      title: "AI-Powered Slack Bot",
      description: "Intelligent chatbot for team collaboration that answers questions and assists with tasks using advanced AI capabilities.",
      longDescription: "A sophisticated Slack integration that leverages AI to enhance team productivity and communication. The bot can answer questions, help with task management, provide insights, and automate routine team processes through natural language interaction.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tech: ["Python", "Slack API", "LangChain", "AI Agents", "OpenAI API", "Webhooks"],
      category: "AI/ML",
      year: "2024",
      client: "Team Collaboration Platform",
      duration: "3 months",
      featured: false,
    },
  ];

  const categories = ["All", "AI/ML", "Full-Stack", "Web App", "Mobile", "Data Visualization", "Education", "Enterprise"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            My <span className="text-primary">Portfolio</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            A showcase of projects that demonstrate my skills in full-stack development,
            from concept to deployment.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-primary text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="project-card overflow-hidden shadow-lg">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover"
                  />
                  {project.featured && (
                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {project.year}
                    </Badge>
                  </div>
                  <p className="text-slate-600 mb-4 text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tech.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href={`/portfolio/${project.id}`}>
                      <Button size="sm" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        View Details
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline" className="px-2">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="px-2">
                      <Github className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Have a Project in Mind?</h2>
          <p className="text-xl text-blue-100 mb-8">
            I'm always excited to work on new challenges and bring ideas to life.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-primary hover:bg-blue-50">
              Let's Discuss Your Project
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
