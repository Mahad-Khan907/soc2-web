import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Swal from 'sweetalert2';
import {
  Shield,
  FileText,
  Database,
  AlertTriangle,
  GraduationCap,
  Users,
  ClipboardCheck,
  Award,
  Plus,
  Trash2,
  Copy,
  Settings,
} from 'lucide-react';
import { ComplianceNodeData } from './ComplianceCanvas';
import { motion } from 'framer-motion';

const nodeTypes = [
  { type: 'framework', label: 'Framework', icon: Shield, color: 'bg-primary/10 text-primary' },
  { type: 'policy', label: 'Policy', icon: FileText, color: 'bg-blue-500/10 text-blue-400' },
  { type: 'evidence', label: 'Evidence', icon: Database, color: 'bg-green-500/10 text-green-400' },
  { type: 'risk', label: 'Risk AI', icon: AlertTriangle, color: 'bg-orange-500/10 text-orange-400' },
  { type: 'training', label: 'Training', icon: GraduationCap, color: 'bg-purple-500/10 text-purple-400' },
  { type: 'vendor', label: 'Vendor', icon: Users, color: 'bg-cyan-500/10 text-cyan-400' },
  { type: 'audit', label: 'Audit', icon: ClipboardCheck, color: 'bg-yellow-500/10 text-yellow-400' },
  { type: 'trust-center', label: 'Trust Center', icon: Award, color: 'bg-pink-500/10 text-pink-400' },
];

interface NodeToolbarProps {
  onAddNode: (type: ComplianceNodeData['type']) => void;
  onClearAll: () => void;
  onExport: () => void;
}

export const NodeToolbar = ({ onAddNode, onClearAll, onExport }: NodeToolbarProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const, 
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <Card className="p-4 bg-gradient-card border border-border/50 mb-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-lg font-semibold text-foreground"
          >
            Node Palette
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => Swal.fire({
                title: 'Export Flow',
                text: 'Click Confirm to export the flow.',
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm!',
                cancelButtonText: 'No, cancel'
              })
                .then((result) => {
                  if (result.isConfirmed) {
                    onExport();
                    Swal.fire(
                      'Exported!',
                      'The flow has been exported.',
                      'success'
                    )
                  }
                })
              }
            >
              <Copy className="h-4 w-4 mr-2" />
              Export Flow
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                Swal.fire({
                  title: 'Clear Canvas',
                  text: 'Are you sure you want to clear the canvas? \n This action cannot be undone.',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, clear it!',
                  cancelButtonText: 'No, cancel'
                })
                  .then((result) => {
                    if (result.isConfirmed) {
                      onClearAll();
                      Swal.fire(
                        'Cleared!',
                        'The canvas has been cleared.',
                        'success'
                      )
                    }
                  })
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {nodeTypes.map((nodeType) => {
            const Icon = nodeType.icon;
            return (
              <motion.div key={nodeType.type} variants={itemVariants}>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-auto w-full p-3 flex flex-col gap-2 hover:scale-105 transition-transform"
                  onClick={() => {
                    Swal.fire({
                      title: 'Add Node',
                      text: `Are you sure you want to add a ${nodeType.label} node to the canvas?`,
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, add it!',
                      cancelButtonText: 'No, cancel'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        onAddNode(nodeType.type as ComplianceNodeData['type'])
                        Swal.fire(
                          'Added!',
                          `${nodeType.label} node added to the canvas.`,
                          'success'
                        )
                      }
                    })
                  }}
                >
                  <div className={`p-2 rounded-lg ${nodeType.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs">{nodeType.label}</span>
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Plus className="h-4 w-4" />
          <span>Click any node type to add it to the canvas</span>
        </motion.div>
      </div>
    </Card>
  );
};