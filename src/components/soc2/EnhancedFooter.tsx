"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Database, 
  Shield, 
  Users, 
  Settings, 
  MessageCircle, 
  FileText,
  BarChart3,
  HelpCircle,
  Send,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion for animations

const quickLinks = [
  { label: 'Evidence Library', icon: Database, description: 'Compliance Evidence', href: '#evidence', a: "https://www.google.com/search?q=tell+me+about+soc2+evidence+library&authuser=0&aep=21&udm=50&utm_source=google&utm_campaign=aim_aware&utm_content=oo-seaport-10215&mtid=1C_MaJLrF_rm7_UP-P_SmQg&mstk=AUtExfAzt7dR5v0Rajg0uTx1CXt5iYWKnFeyizR_suQtvpOkECYBEHTo0Ber8YLyK3lUGesjksRuvCcz3DooJPebsgOLBd13viqjPMeVX0MZUvG8i0Ab1xtgTysR8j6EHQn0kgBWxrUiCMTNQQZxBpT-SUrxNXdPN7NdnV1zD2QWU75UupklOB3zb08SfWw-AcW8SEhvw_weMNRMkGG3lqpSGDlQ0OoTrXsCOVxhrRRg8Zgwp4yrlWKwqloadiXKyuqUMMTUKOgBy7H_V0jYc8sz0lvBGqZ300zlh-DIyS-KWnobkpGKfgNMvxh3kutuxX6txUVs6ep-TmPY6w&csuir=1" },
  { label: 'Frameworks', icon: Shield, description: 'SOC2, ISO27001, HIPAA', href: '#frameworks' , a: "https://www.google.com/search?q=tell+me+about+frameworks+SOC2%2C+ISO27001%2C+HIPAA&oq=tell+me+about+frameworks+SOC2%2C+ISO27001%2C+HIPAA&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQIRgKGKAB0gEIOTMzMWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8" },
  { label: 'Vendors', icon: Users, description: 'Third-party assessments', href: '#vendors' , a: "https://www.google.com/search?q=tell+me+about+vendors+third+party+assisment&oq=tell+me+about+vendors+third+party+assisment&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQIRgKGKABMgkIAhAhGAoYoAHSAQkxNDk0MmowajeoAgCwAgA&sourceid=chrome&ie=UTF-8" },
  { label: 'Reports', icon: BarChart3, description: 'Audit readiness reports', href: '#reports' , a:"https://www.google.com/search?q=tell+me+about+reports+Audit+readiness+reports&oq=tell+me+about+reports+Audit+readiness+reports&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigAdIBCDY1MzlqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8" },
  { label: 'Policies', icon: FileText, description: 'Policy management', href: '#policies' , a: "https://www.google.com/search?q=tell+me+about+policies+policy+management&oq=tell+me+about+policies+policy+management&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIKCAEQABiiBBiJBTIKCAIQABiiBBiJBTIKCAMQABiABBiiBNIBCDk0MDlqMGo3qAIAsAIA&sourceid=chrome&ie=UTF8" },
  { label: 'Settings', icon: Settings, description: 'System configuration', href: '#settings' , a: "https://en.wikipedia.org/wiki/System_configuration" }
];

export const EnhancedFooter = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const handleAiChat = async () => {
    if (!chatMessage.trim()) return;
    setIsAiTyping(true);
    setAiResponse('');
    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: chatMessage }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Something went wrong');
      }
      const data = await response.json();
      setAiResponse(data.response);
    } catch (err: any) {
      setAiResponse(`Error: ${err.message}`);
    } finally {
      setIsAiTyping(false);
      setChatMessage('');
    }
  };

  // Define parent and child variants for the staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,    
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };


  return (
    <footer id="EnhancedFooter" className="border-t border-border/50 bg-gradient-card mt-8">
      <div className="p-1 sm:p-6 space-y-6">

        {/* Quick Links */}
        <div className="px-2 sm:px-4 md:px-6 lg:px-8">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2"
          >
            <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            Quick Links
          </motion.h3>

          {/* This is the parent container for the staggered animation */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a 
                  key={link.label}
                  href={link.a || link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants} // Apply child variants to each link
                >
                  <Button
                    variant="outline"
                    className="h-auto p-4 sm:p-5 flex flex-col items-center gap-2 hover:bg-accent/50 transition-colors text-center w-full"
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    <div>
                      <div className="text-xs sm:text-sm font-medium">{link.label}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1 leading-tight">{link.description}</div>
                    </div>
                  </Button>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* AI Chat Assistant */}
          <Card className="p-4 bg-gradient-status border border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Grok AI Assistant</h3>
                <p className="text-xs text-muted-foreground">
                  Ask me about SOC2 compliance gaps, evidence requirements, or audit preparation
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Ask about compliance gaps, evidence requirements, audit prep..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiChat()}
                className="flex-1 bg-background/50 border-primary/30"
                disabled={isAiTyping}
              />
              <Button 
                onClick={handleAiChat}
                disabled={!chatMessage.trim() || isAiTyping}
                className="px-3"
              >
                {isAiTyping ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* AI Response */}
            {aiResponse && (
              <div className="mt-4 p-2 bg-background border border-primary/30 rounded text-sm">
                <strong>Grok AI:</strong>
                <p className="mt-1">{aiResponse}</p>
              </div>
            )}

            {/* Suggested Questions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                "What SOC2 controls am I missing?",
                "How ready are we for audit?",
                "Show me high-risk gaps"
              ].map((suggestion, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="sm"
                  className="text-xs h-7 bg-primary/10 text-primary hover:bg-primary/20"
                  onClick={() => setChatMessage(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* System Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/20 text-center sm:text-left"
        >
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">ReguLattice</span> v2.1.0 • 
            Intelligent Compliance Automation Platform • 
            <span className="text-status-green"> System Health: Optimal</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 text-xs text-muted-foreground">
            <span>🌙 Dark Mode</span>
            <span className="text-primary">Fintech Blue Theme</span>
            <span className="text-status-green">Compliance Green Accents</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};