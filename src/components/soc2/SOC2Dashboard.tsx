import { useState } from "react";
import { Shield, Eye, Activity, BarChart3, Table, MessageCircle, Bell, Zap } from "lucide-react";
import { ComplianceCanvas, ComplianceNodeData } from "./ComplianceCanvas";
import { NodePropertiesPanel } from "./NodePropertiesPanel";
import { ComplianceScorecard } from "./ComplianceScorecard";
import { RiskHeatmap } from "./RiskHeatmap";
import { StatusIndicator } from "./StatusIndicator";
import { AlertsStream } from "./AlertsStream";
import { GamificationLayer } from "./GamificationLayer";
import { EnhancedFooter } from "./EnhancedFooter";
import { EnhancedWorkflowVisualization } from "./EnhancedWorkflowVisualization";
import { HorizontalWorkflowMonitor } from "./HorizontalWorkflowMonitor";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react"


export const SOC2Dashboard = () => {
  const [activeView, setActiveView] = useState('canvas');
  const [selectedNode, setSelectedNode] = useState<ComplianceNodeData | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);

  const handleNodeSelect = (nodeData: ComplianceNodeData | null) => {
    setSelectedNode(nodeData);
    setIsPanelOpen(!!nodeData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: {
        staggerChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 , transition: {
        type: "spring" as const, 
        stiffness: 100,
        damping: 10
    } }

  };

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6 space-y-4 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <motion.div
         initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{
    duration: 2,
    type: "spring",
    stiffness: 100
  }}
>
          <h1 className="text-2xl flex sm:text-3xl font-bold text-foreground mb-2">
           <span>
  <img
    className="w-[80px] h-[60px] mt-[-10px] animate-pulse"
    src="/logo.png"
    alt="ReguLattice Logo"
    style={{
      filter: 'drop-shadow(0 0 8px #0ea5e9) drop-shadow(0 0 12px #0ea5e9)',
    }}
  />
</span>
            ReguLattice
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Intelligent Compliance Automation Platform
          </p>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <StatusIndicator status="green" label="System Health" />
            <StatusIndicator status="amber" label="Active Alerts" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsAlertsOpen(true)}
              className="relative"
            >
              <Bell className="h-4 w-4 mr-2" />
              Alerts
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
              >
                3
              </Badge>
            </Button>
            <a href="#EnhancedFooter"><Button 
              variant="outline" 
              size="sm"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Ask Grok
            </Button></a>
            <Badge variant="secondary" className="bg-primary/10 text-primary text-xs sm:text-sm">
              <Zap className="h-3 w-3 mr-1" />
              Last Scan: 30s ago
            </Badge>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <Card className="p-4 sm:p-6 bg-gradient-card border border-border/50 shadow-card">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }} 
        >
          
          <motion.div variants={itemVariants} className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-status-green mb-1">98.2%</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Overall Compliance</div>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-status-amber mb-1">3</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Active Issues</div>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">127</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Controls Monitored</div>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-foreground mb-1">24/7</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Automated Scanning</div>
          </motion.div>
        </motion.div>
      </Card>

      {/* Gamification Layer */}
      <GamificationLayer />

      {/* Multi-View Interface */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
          <TabsTrigger value="workflow" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Live Workflow</span>
          </TabsTrigger>
          <TabsTrigger value="canvas" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Canvas Flow</span>
          </TabsTrigger>
          <TabsTrigger value="scorecard" className="flex items-center gap-2">
            <Table className="h-4 w-4" />
            <span className="hidden sm:inline">Scorecard</span>
          </TabsTrigger>
          <TabsTrigger value="heatmap" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Risk Heatmap</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workflow" className="mt-6">
          <HorizontalWorkflowMonitor />
        </TabsContent>

        <TabsContent value="canvas" className="mt-6">
          <ComplianceCanvas onNodeSelect={handleNodeSelect} />
        </TabsContent>

        <TabsContent value="scorecard" className="mt-6">
          <ComplianceScorecard />
        </TabsContent>

        <TabsContent value="heatmap" className="mt-6">
          <RiskHeatmap />
        </TabsContent>
      </Tabs>

      {/* Enhanced Footer */}
      <EnhancedFooter />

      {/* Node Properties Panel */}
      <NodePropertiesPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        nodeData={selectedNode}
      />

      {/* Alerts Stream */}
      <AlertsStream
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
      />
    </div>
  );
};