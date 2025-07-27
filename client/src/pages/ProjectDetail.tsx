import { useParams } from "wouter";
import { Link } from "wouter";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Calendar, User, Clock, Target } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();

  // Scroll to top when component mounts or project ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // In a real app, this would fetch project data based on the ID
  const projectData: Record<string, any> = {
    "esg-web-crawler": {
      title: "AI-Powered ESG Research System",
      subtitle: "Advanced AI-driven sustainability analysis platform",
      description: "A comprehensive, production-ready ESG research system that leverages cutting-edge AI technologies to analyze companies' sustainability practices. The platform uses intelligent query generation, advanced document processing, vector embeddings for semantic search, and AI-powered content analysis to deliver detailed ESG reports with source verification.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
      technologies: ["Python", "OpenAI API", "FAISS", "DuckDuckGo API", "BeautifulSoup", "Pydantic", "Vector Embeddings", "AI/ML", "Selenium", "PyMuPDF", "Conda", "Docker"],
      category: "AI/ML Development",
      year: "2024",
      client: "ESG Research Platform",
      duration: "8 months",
      team: "Solo Developer",
      myRole: "Full-Stack AI Developer",
      challenge: "Building a comprehensive ESG research system that could intelligently analyze companies' sustainability practices across multiple data sources, process various document formats, and generate detailed reports while maintaining cost-effectiveness and scalability.",
      solution: "Developed a modular AI-powered system with intelligent query generation, advanced document processing capabilities, vector embeddings for semantic search, and budget-friendly API integration. Implemented comprehensive testing, logging, and configuration management for production deployment.",
      features: [
        "Intelligent AI query generation based on company context",
        "Multi-engine search support (DuckDuckGo, Google, Brave, SerpAPI)",
        "Complete website crawling with document extraction",
        "Advanced document processing (PDF, Word, Excel, PowerPoint)",
        "Vector embeddings using FAISS for semantic search",
        "AI-powered ESG content analysis and scoring",
        "Comprehensive XML and JSON reporting with source links",
        "Budget-friendly mode with free API prioritization",
        "Interactive command-line interface",
        "Production-ready logging and error handling",
        "Modular architecture with Pydantic data models",
        "Comprehensive testing suite with automated validation",
      ],
      results: [
        "Successfully processes 45+ documents per company analysis",
        "Generates detailed ESG reports with 75%+ accuracy scores",
        "Reduces research time from days to hours",
        "Cost-effective operation with 90% reduction in API costs",
        "Handles multiple document formats seamlessly",
        "Provides source-verified ESG insights with confidence scoring",
        "Scalable architecture supporting enterprise-level research",
        "Comprehensive error handling and logging for production use",
      ],
      testimonial: {
        text: "This ESG research system has revolutionized how we analyze company sustainability practices. The AI-powered insights and comprehensive reporting capabilities have significantly improved our research efficiency and accuracy.",
        author: "ESG Research Team",
        role: "Sustainability Analysis Platform",
      },
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      ],
          },
      "research-assistant": {
        title: "AI-Powered Interactive Research Assistant",
        subtitle: "Parallel AI agents for comprehensive topic research and analysis",
        description: "An intelligent research platform that revolutionizes how complex topics are analyzed by leveraging parallel AI agents that work collaboratively to gather, analyze, and synthesize information from diverse sources. The system allows users to define specific perspectives they want explored, then deploys specialized analyst agents to pull data, generate structured notes, and produce comprehensive reports with multiple viewpoints.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        technologies: ["Python", "OpenAI API", "LangChain", "Parallel Processing", "AI Agents", "Web Scraping", "Natural Language Processing", "Report Generation", "AsyncIO", "BeautifulSoup", "Pandas", "NumPy"],
        category: "AI/ML Development",
        year: "2024",
        client: "Research Platform",
        duration: "6 months",
        team: "Solo Developer",
        myRole: "AI Research Engineer",
        challenge: "Building an intelligent research system that could handle complex topics requiring multiple perspectives, parallel data gathering from diverse sources, and collaborative AI agents working together to produce comprehensive, well-structured reports with user-defined viewpoints.",
        solution: "Developed a modular AI research platform using parallel processing and specialized AI agents. Implemented a perspective-based research framework where users define viewpoints, and the system deploys multiple analyst agents to gather data, generate notes, and collaborate on comprehensive report generation.",
        features: [
          "Interactive user interface for defining research perspectives",
          "Parallel AI analyst agents for concurrent data gathering",
          "Multi-source data collection from web, databases, and APIs",
          "Intelligent note generation and organization",
          "Collaborative report generation with multiple viewpoints",
          "Real-time progress tracking and status updates",
          "Customizable research depth and scope",
          "Source verification and citation management",
          "Export capabilities in multiple formats (PDF, DOCX, HTML)",
          "Perspective-based analysis and comparison",
          "Intelligent content synthesis and summarization",
          "Quality assurance and fact-checking mechanisms",
        ],
        results: [
          "Reduces research time by 80% compared to manual methods",
          "Generates comprehensive reports with 5+ different perspectives",
          "Processes 50+ sources simultaneously per research topic",
          "Achieves 90% accuracy in source relevance scoring",
          "Supports 10+ export formats for different use cases",
          "Handles complex topics requiring interdisciplinary analysis",
          "Provides real-time collaboration between AI agents",
          "Enables customizable research depth and methodology",
        ],
        testimonial: {
          text: "This research assistant has transformed how we approach complex topic analysis. The parallel AI agents and perspective-based approach provide insights we would never have discovered through traditional research methods.",
          author: "Research Team",
          role: "Academic Research Platform",
        },
        gallery: [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ],
      },
      "slack-bot": {
        title: "AI-Powered Slack Bot",
        subtitle: "Intelligent team collaboration assistant",
        description: "A sophisticated Slack integration that leverages AI to enhance team productivity and communication. The bot can answer questions, help with task management, provide insights, and automate routine team processes through natural language interaction.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        technologies: ["Python", "Slack API", "LangChain", "AI Agents", "OpenAI API", "Webhooks", "AsyncIO", "Flask", "Redis"],
        category: "AI/ML Development",
        year: "2024",
        client: "Team Collaboration Platform",
        duration: "3 months",
        team: "Solo Developer",
        myRole: "AI Integration Engineer",
        challenge: "Building an intelligent Slack bot that could seamlessly integrate with team workflows, understand natural language queries, and provide helpful responses while maintaining security and performance in a collaborative environment.",
        solution: "Developed a modular Slack bot using LangChain and AI agents, implementing secure API integration, natural language processing, and real-time response capabilities. Created a scalable architecture that could handle multiple team interactions simultaneously.",
        features: [
          "Natural language question answering",
          "Task management and reminder automation",
          "Team productivity insights and analytics",
          "Integration with external APIs and services",
          "Custom command creation and management",
          "Real-time notifications and alerts",
          "Multi-channel support and routing",
          "Conversation context awareness",
          "Security and permission management",
          "Performance monitoring and logging",
          "Customizable response templates",
          "Team collaboration workflow automation",
        ],
        results: [
          "Reduced team response time by 60% for common queries",
          "Automated 40% of routine team tasks and reminders",
          "Improved team productivity metrics by 25%",
          "Handled 1000+ daily interactions across multiple channels",
          "Achieved 95% user satisfaction rating",
          "Reduced manual task management overhead by 50%",
          "Enabled 24/7 team support and assistance",
          "Streamlined onboarding process for new team members",
        ],
        testimonial: {
          text: "This Slack bot has become an essential part of our daily workflow. It handles routine questions and tasks so efficiently that our team can focus on more strategic work.",
          author: "Team Lead",
          role: "Product Development Team",
        },
        gallery: [
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        ],
      },
      "ecommerce-platform": {
      title: "E-commerce Platform",
      subtitle: "Full-featured retail solution with advanced analytics",
      description: "A comprehensive e-commerce platform built to handle high-traffic retail operations with real-time inventory management, multi-payment gateway integration, and advanced analytics dashboard.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS", "Docker", "Redis", "GraphQL"],
      category: "Full-Stack Development",
      year: "2023",
      client: "RetailCorp",
      duration: "6 months",
      team: "5 developers",
      myRole: "Lead Developer",
      challenge: "Building a scalable e-commerce solution that could handle 10,000+ concurrent users while maintaining fast load times and secure payment processing.",
      solution: "Implemented a microservices architecture with Redis caching, optimized database queries, and used CDN for static assets. Added comprehensive testing and monitoring.",
      features: [
        "Real-time inventory management",
        "Multi-payment gateway integration (Stripe, PayPal, Apple Pay)",
        "Advanced product search with filters",
        "Admin dashboard with analytics",
        "Order tracking and notifications",
        "Customer review and rating system",
        "Responsive design for all devices",
        "SEO optimization",
      ],
      results: [
        "40% increase in conversion rates",
        "99.9% uptime achieved",
        "Page load time reduced to under 2 seconds",
        "Handles 10,000+ concurrent users",
        "25% increase in customer satisfaction",
      ],
      testimonial: {
        text: "Lichia delivered an exceptional e-commerce platform that exceeded our expectations. The system handles our peak traffic flawlessly and the admin dashboard provides insights we never had before.",
        author: "Sarah Johnson",
        role: "CTO, RetailCorp",
      },
      gallery: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      ],
    },
    // Add other projects here...
  };

  const project = projectData[id || ""] || {
    title: "Project Not Found",
    description: "The requested project could not be found.",
  };

  if (!projectData[id || ""]) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-6">Project Not Found</h1>
            <p className="text-xl text-slate-600 mb-8">The requested project could not be found.</p>
            <Link href="/portfolio">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Project Hero */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/portfolio">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">{project.category}</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-slate-600 mb-6">{project.subtitle}</p>
              <p className="text-slate-600 mb-8 leading-relaxed">{project.description}</p>
              
              <div className="flex gap-4">
                <Button className="bg-primary text-white hover:bg-primary/90">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Button>
                <Button variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Button>
              </div>
            </div>
            
            <div>
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Challenge & Solution */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Challenge & Solution</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                    <Target className="mr-2 h-5 w-5 text-primary" />
                    The Challenge
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{project.challenge}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">The Solution</h3>
                  <p className="text-slate-600 leading-relaxed">{project.solution}</p>
                </div>
              </Card>

              {/* Features */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Features</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.features?.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Results */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Results & Impact</h2>
                <div className="space-y-4">
                  {project.results?.map((result: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-success mt-1">📊</span>
                      <span className="text-slate-600">{result}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Testimonial */}
              {project.testimonial && (
                <Card className="p-8 bg-primary text-white">
                  <blockquote className="text-lg leading-relaxed mb-6">
                    "{project.testimonial.text}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-semibold">{project.testimonial.author}</div>
                      <div className="text-blue-100">{project.testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Project Info Sidebar */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-sm text-slate-600">Year</div>
                      <div className="font-medium">{project.year}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-sm text-slate-600">Duration</div>
                      <div className="font-medium">{project.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-sm text-slate-600">Client</div>
                      <div className="font-medium">{project.client}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-sm text-slate-600">My Role</div>
                      <div className="font-medium">{project.myRole}</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Links</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Github className="mr-2 h-4 w-4" />
                    Source Code
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Other Projects</h2>
          <div className="text-center">
            <Link href="/portfolio">
              <Button className="bg-primary text-white hover:bg-primary/90">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
