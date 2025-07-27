import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Linkedin, Github, Send, Clock, Globe } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(100, "Subject must be less than 100 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // In a real application, this would send data to a backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "lichiareghu@gmail.com",
      href: "mailto:lichiareghu@gmail.com",
      description: "Best way to reach me",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+44 7767 967 594",
      href: "tel:+447767967594",
      description: "Available during business hours",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Stevenage, UK",
      href: "#",
      description: "Open to remote work",
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
      href: "#",
      description: "Usually much faster",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/lichiareghu",
      username: "@lichiareghu",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/lichiareghu",
      username: "@lichiareghu",
    },
    {
      icon: Globe,
      label: "Website",
      href: "https://lichiareghu.dev",
      username: "lichiareghu.dev",
    },
  ];

  const services = [
    {
      title: "Web Development",
      description: "Full-stack web applications using modern technologies",
    },
    {
      title: "Mobile Applications",
      description: "Cross-platform mobile apps with React Native",
    },
    {
      title: "UI/UX Design",
      description: "User-centered design and interface development",
    },
    {
      title: "Technical Consulting",
      description: "Architecture planning and technology recommendations",
    },
    {
      title: "Code Review",
      description: "Code quality assessment and best practices guidance",
    },
    {
      title: "Team Mentoring",
      description: "Developer training and team skill enhancement",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Let's Work <span className="text-primary">Together</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            I'm always open to discussing new opportunities, interesting projects,
            and ways we can collaborate to bring your ideas to life.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Get In Touch</h2>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{info.label}</h3>
                      {info.href !== "#" ? (
                        <a 
                          href={info.href}
                          className="text-primary font-medium hover:text-primary/80 smooth-transition"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-slate-900 font-medium">{info.value}</p>
                      )}
                      <p className="text-slate-600 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Connect With Me</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 smooth-transition"
                    >
                      <social.icon className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-slate-900 text-sm">{social.label}</div>
                        <div className="text-slate-600 text-xs">{social.username}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Me a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="col-span-2 sm:col-span-1">
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="col-span-2 sm:col-span-1">
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Project Discussion" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell me about your project..." 
                              className="min-h-[120px] resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-white hover:bg-primary/90"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How I Can Help</h2>
            <p className="text-xl text-slate-600">Services I offer to help bring your project to life</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg smooth-transition">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Whether you have a detailed plan or just an idea, I'd love to discuss how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:lichia.reghu@example.com"
              className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-blue-50 smooth-transition inline-flex items-center justify-center"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Me Directly
            </a>
            <a 
              href="tel:+1234567890"
              className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary smooth-transition inline-flex items-center justify-center"
            >
              <Phone className="mr-2 h-4 w-4" />
              Schedule a Call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
