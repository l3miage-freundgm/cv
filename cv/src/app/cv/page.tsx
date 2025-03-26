"use client"
import React, { useState, useRef, type JSX } from 'react';
import * as htmlToImage from 'html-to-image';
import * as jsPDF from 'jspdf';
import {Card, CardBody, Image, Button, Slider, CardHeader, Avatar} from "@heroui/react";
import {
  User,
  Mail, 
  Phone,
  Code,
  Briefcase,
  Download,
  Linkedin,
  Github,
  Wrench,
} from 'lucide-react';

// Comprehensive Interfaces
interface Skill {
  id: string;
  category: string;
  skills: string[];
  proficiency: number;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  achievements: string[];
  technologies: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubLink?: string;
}

const CV: React.FC = () => {
  // State Management
  const [activeSection, setActiveSection] = useState<'summary' | 'skills' | 'experience' | 'projects'>('summary');
  // const [contactForm, setContactForm] = useState({
  //   name: '',
  //   email: '',
  //   subject: '',
  //   message: '',
  // });
  // const [formSubmitted, setFormSubmitted] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  // Comprehensive Data Structures
  const skills: Skill[] = [
    {
      id: 'dev-stack',
      category: 'Software Development',
      skills: ['Python', 'TypeScript', 'Java', 'JavaScript'],
      proficiency: 90,
    },
    {
      id: 'frontend',
      category: 'Frontend Technologies',
      skills: ['React', 'Angular', 'Next.js', 'Tailwind CSS'],
      proficiency: 85,
    },
    {
      id: 'backend',
      category: 'Backend Technologies',
      skills: ['Node.js', 'Spring', '.NET', 'Flask', 'FastAPI'],
      proficiency: 80,
    },
  ];

  const experiences: Experience[] = [
    {
      id: 'soitec',
      company: 'Soitec',
      position: 'Data Engineer',
      startDate: 'Sep 2023',
      endDate: 'Present',
      location: 'Grenoble, France',
      achievements: [
        'Developed ETL pipelines using Talend for multi-source data integration',
        'Created Python Flask API for advanced monitoring systems',
        'Designed interactive Tableau dashboards for critical KPIs',
      ],
      technologies: ['Python', 'Talend', 'Flask', 'Tableau'],
    },
  ];

  const projects: Project[] = [
    {
      id: 'data-pipeline',
      name: 'Enterprise Data Integration Platform',
      description: 'Scalable ETL solution for comprehensive data management',
      technologies: ['Python', 'Apache Airflow', 'PostgreSQL'],
      githubLink: 'https://github.com/matiasfreund/data-pipeline',
    },
  ];

  // PDF and Image Export Handlers
  const exportCV = async (format: 'pdf' | 'image') => {
    if (!cvRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(cvRef.current);
      if (format === 'pdf') {
        const pdf = new jsPDF.jsPDF();
        pdf.addImage(dataUrl, 'PNG', 10, 10, 190, 277);
        pdf.save('matias-freund-cv.pdf');
      } else {
        const link = document.createElement('a');
        link.download = 'matias-freund-cv.png';
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error('Export failed', error);
    }
  };

  // Contact Form Submission (not used in this snippet)
  // const handleContactSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('/api/contact', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(contactForm),
  //     });
  //     if (response.ok) {
  //       setFormSubmitted(true);
  //       setTimeout(() => {
  //         setFormSubmitted(false);
  //         setContactForm({
  //           name: '',
  //           email: '',
  //           subject: '',
  //           message: '',
  //         });
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     console.error('Submission failed', error);
  //   }
  // };

  // Navigation items typed to match the union of sections
  const navItems: { section: 'summary' | 'skills' | 'experience' | 'projects'; icon: JSX.Element; label: string }[] = [
    { section: 'summary', icon: <User className="mr-2" />, label: 'Profile' },
    { section: 'skills', icon: <Wrench className="mr-2" />, label: 'Skills' },
    { section: 'experience', icon: <Briefcase className="mr-2" />, label: 'Experience' },
    { section: 'projects', icon: <Code className="mr-2" />, label: 'Projects' },
  ];

  return (
    // <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    //   <div ref={cvRef} className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-3 min-h-[800px]">
    //     {/* Sidebar */}
    //     <div className="col-span-1 bg-gradient-to-b from-blue-600 to-purple-700 text-white p-6 flex flex-col">
    //       <div className="text-center mb-8">
    //         <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg">
    //           <img src="https://media.licdn.com/dms/image/v2/D4E35AQHtaOpZ4sb3nQ/profile-framedphoto-shrink_200_200/B4EZVE6G1iG0AY-/0/1740617838169?e=1743552000&v=beta&t=4Eu696Icj2WHpbkEO6XsQqK9T-KApfnXa8Pf4Kt-3DA" alt="Matias Freund" className="w-full h-full object-cover" />
    //         </div>
    //         <h1 className="text-2xl font-bold">Matias Freund</h1>
    //         <p className="text-sm opacity-80">Software Developer</p>
    //       </div>

    //       <nav className="space-y-4">
    //         {navItems.map(({ section, icon, label }) => (
    //           <button
    //             key={section}
    //             onClick={() => setActiveSection(section)}
    //             className={`w-full text-left p-2 rounded-lg transition-all duration-300 ${
    //               activeSection === section ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70'
    //             }`}
    //           >
    //             <div className="flex items-center">
    //               {icon}
    //               {label}
    //             </div>
    //           </button>
    //         ))}
    //       </nav>

    //       <div className="mt-auto space-y-4">
    //         <a href="mailto:matiasfreund@gmail.com" className="flex items-center text-white/80 hover:text-white">
    //           <Mail className="mr-2" size={18} />
    //           matiasfreund@gmail.com
    //         </a>
    //         <a href="tel:+33688865744" className="flex items-center text-white/80 hover:text-white">
    //           <Phone className="mr-2" size={18} />
    //           +33 06 88 86 57 44
    //         </a>
    //       </div>
    //     </div>

    //     {/* Main Content */}
    //     <div className="col-span-2 p-8">
    //       {activeSection === 'summary' && (
    //         <div>
    //           <h2 className="text-2xl font-bold mb-4 text-blue-700">Professional Summary</h2>
    //           <p className="text-gray-700 leading-relaxed">
    //             Innovative software developer with a strong background in full-stack development, data engineering, and cloud infrastructure.
    //             Passionate about creating efficient, scalable solutions that drive business value. Experienced in Python, TypeScript, and modern web technologies with a proven track record of delivering robust technical solutions.
    //           </p>
    //         </div>
    //       )}

    //       {activeSection === 'skills' && (
    //         <div>
    //           <h2 className="text-2xl font-bold mb-6 text-blue-700">Technical Skills</h2>
    //           {skills.map((skillCategory) => (
    //             <div key={skillCategory.id} className="mb-6">
    //               <h3 className="font-semibold text-gray-700 mb-3">{skillCategory.category}</h3>
    //               <div className="flex flex-wrap gap-2">
    //                 {skillCategory.skills.map((skill) => (
    //                   <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
    //                     {skill}
    //                   </span>
    //                 ))}
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       )}

    //       {activeSection === 'experience' && (
    //         <div>
    //           <h2 className="text-2xl font-bold mb-6 text-blue-700">Experience</h2>
    //           {experiences.map((exp) => (
    //             <div key={exp.id} className="mb-6">
    //               <h3 className="font-semibold text-gray-700">
    //                 {exp.position} at {exp.company}
    //               </h3>
    //               <p className="text-gray-600">
    //                 {exp.startDate} - {exp.endDate} | {exp.location}
    //               </p>
    //               <ul className="list-disc list-inside text-gray-700 mt-2">
    //                 {exp.achievements.map((ach, idx) => (
    //                   <li key={idx}>{ach}</li>
    //                 ))}
    //               </ul>
    //             </div>
    //           ))}
    //         </div>
    //       )}

    //       {activeSection === 'projects' && (
    //         <div>
    //           <h2 className="text-2xl font-bold mb-6 text-blue-700">Projects</h2>
    //           {projects.map((proj) => (
    //             <div key={proj.id} className="mb-6">
    //               <h3 className="font-semibold text-gray-700">{proj.name}</h3>
    //               <p className="text-gray-600">{proj.description}</p>
    //               <div className="flex flex-wrap gap-2 mt-2">
    //                 {proj.technologies.map((tech) => (
    //                   <span key={tech} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
    //                     {tech}
    //                   </span>
    //                 ))}
    //               </div>
    //               {proj.githubLink && (
    //                 <a
    //                   href={proj.githubLink}
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                   className="text-blue-600 mt-2 inline-block"
    //                 >
    //                   View on GitHub
    //                 </a>
    //               )}
    //             </div>
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //   </div>
      
          
    //   {/* Floating Action Buttons */}
    //   <div className="fixed bottom-6 right-6 space-x-4">
    //     <button
    //       onClick={() => exportCV('pdf')}
    //       className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
    //       title="Download PDF"
    //     >
    //       <Download />
    //     </button>
    //     <button
    //       onClick={() => window.open('https://linkedin.com/in/matias-freund', '_blank')}
    //       className="bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition"
    //       title="LinkedIn Profile"
    //     >
    //       <Linkedin />
    //     </button>
    //     <button
    //       onClick={() => window.open('https://github.com/matiasfreund', '_blank')}
    //       className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-black transition"
    //       title="GitHub Profile"
    //     >
    //       <Github />
    //     </button>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Avatar
          isBordered
          radius="full"
          className="w-32 h-32 text-tiny"
          src="https://media.licdn.com/dms/image/v2/D4E35AQHtaOpZ4sb3nQ/profile-framedphoto-shrink_200_200/B4EZVE6G1iG0AY-/0/1740617838169?e=1743552000&v=beta&t=4Eu696Icj2WHpbkEO6XsQqK9T-KApfnXa8Pf4Kt-3DA"
          alt="Matias Freund Galeano"
        />
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
        
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://heroui.com/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
      </Card>    
    </div>
    
  );
};

export default CV;
