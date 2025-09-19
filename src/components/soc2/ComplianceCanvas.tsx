import { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ComplianceNode } from './ComplianceNode';
import { NodePropertiesPanel } from './NodePropertiesPanel';
import { NodeToolbar } from './NodeToolbar';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Save } from 'lucide-react';
import Swal from 'sweetalert2';

export interface ComplianceNodeData {
  type: 'framework' | 'policy' | 'evidence' | 'risk' | 'training' | 'vendor' | 'audit' | 'trust-center';
  title: string;
  description: string;
  status: 'compliant' | 'at-risk' | 'non-compliant';
  owner?: string;
  evidence?: string[];
  xpEarned?: number;
}

const nodeTypes = {
  complianceNode: ComplianceNode,
};

const initialNodes: Node<ComplianceNodeData>[] = [
  {
    id: '1',
    type: 'complianceNode',
    position: { x: 100, y: 100 },
    data: {
      type: 'framework',
      title: 'SOC 2 Type II',
      description: 'Security and availability framework',
      status: 'compliant',
      owner: 'Security Team',
      xpEarned: 250,
    },
  },
  {
    id: '2',
    type: 'complianceNode',
    position: { x: 400, y: 100 },
    data: {
      type: 'policy',
      title: 'IT Security Policy',
      description: 'Internal security guidelines',
      status: 'compliant',
      owner: 'IT Team',
      xpEarned: 150,
    },
  },
  {
    id: '3',
    type: 'complianceNode',
    position: { x: 700, y: 100 },
    data: {
      type: 'evidence',
      title: 'Server Logs',
      description: 'System access monitoring',
      status: 'compliant',
      owner: 'DevOps Team',
      evidence: ['access-logs.csv', 'security-events.log'],
      xpEarned: 100,
    },
  },
  {
    id: '4',
    type: 'complianceNode',
    position: { x: 250, y: 300 },
    data: {
      type: 'risk',
      title: 'AI Risk Assessment',
      description: 'Predictive compliance analysis',
      status: 'at-risk',
      owner: 'Risk Team',
      xpEarned: 75,
    },
  },
  {
    id: '5',
    type: 'complianceNode',
    position: { x: 550, y: 300 },
    data: {
      type: 'training',
      title: 'Security Training',
      description: 'Employee awareness program',
      status: 'compliant',
      owner: 'HR Team',
      xpEarned: 200,
    },
  },
  {
    id: '6',
    type: 'complianceNode',
    position: { x: 850, y: 300 },
    data: {
      type: 'vendor',
      title: 'AWS Assessment',
      description: 'Cloud provider compliance',
      status: 'compliant',
      owner: 'Procurement Team',
      xpEarned: 180,
    },
  },
  {
    id: '7',
    type: 'complianceNode',
    position: { x: 400, y: 500 },
    data: {
      type: 'audit',
      title: 'Audit Readiness',
      description: 'SOC 2 preparation report',
      status: 'non-compliant',
      owner: 'Compliance Team',
      xpEarned: 0,
    },
  },
  {
    id: '8',
    type: 'complianceNode',
    position: { x: 700, y: 500 },
    data: {
      type: 'trust-center',
      title: 'Public Trust Center',
      description: 'Customer compliance portal',
      status: 'compliant',
      owner: 'Marketing Team',
      xpEarned: 300,
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e1-4', source: '1', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e5-6', source: '5', target: '6', animated: true },
  { id: 'e4-7', source: '4', target: '7', animated: true },
  { id: 'e7-8', source: '7', target: '8', animated: true },
];

interface ComplianceCanvasProps {
  onNodeSelect: (nodeData: ComplianceNodeData | null) => void;
}

export const ComplianceCanvas = ({ onNodeSelect }: ComplianceCanvasProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isRunning, setIsRunning] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node<ComplianceNodeData>) => {
      onNodeSelect(node.data);
    },
    [onNodeSelect]
  );

  const onPaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  const handleAddNode = useCallback((type: ComplianceNodeData['type']) => {
    const newNode: Node<ComplianceNodeData> = {
      id: `${Date.now()}`,
      type: 'complianceNode',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      data: {
        type,
        title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        description: `${type} node description`,
        status: 'compliant',
        owner: 'Unassigned',
        xpEarned: 0,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const handleClearAll = useCallback(() => {
    if (confirm) {
      setNodes([]);
      setEdges([]);
    }
  }, [setNodes, setEdges]);

  const handleExport = useCallback(() => {
    const flowData = { nodes, edges };
    const dataStr = JSON.stringify(flowData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'regulattice-flow.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  const handleRun = useCallback(() => {
    setIsRunning(!isRunning);
    // Simulate workflow execution
    if (isRunning === true) {
      Swal.fire({
        title: 'Workflow Stopped',
        text: 'The workflow has been stopped.',
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        timer: 2500
      })
    }
    else {
      Swal.fire({
        title: 'Workflow Started',
        text: 'The workflow has been started.',
        icon: "success",
        showConfirmButton: true,
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        timer: 2500
      })
    }
  }, [isRunning]);

  const handleReset = useCallback(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setIsRunning(false);
  }, [setNodes, setEdges]);

  const handleSave = useCallback(() => {
    // Simulate saving
    alert('Workflow saved successfully!');
  }, []);

  return (
    <div className="space-y-4">
      <NodeToolbar 
        onAddNode={handleAddNode}
        onClearAll={handleClearAll}
        onExport={handleExport}
      />
      
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant={isRunning ? "destructive" : "default"}
          size="sm"
          onClick={handleRun}
        >
          {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {isRunning ? 'Stop' : 'Run'} Workflow
        </Button>
        <div className='flex-col flex gap-2 sm:flex-row'>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        <Button variant="outline" size="sm" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        </div>
      </div>

    <div className="w-full overflow-x-auto">
  <div
    className="
      aspect-square        
      w-[90vw]              
      max-w-[700px]         
      mx-auto 
      bg-gradient-to-br from-gray-900 via-gray-800 to-black 
      border border-gray-700 
      rounded-full
      shadow-2xl
      flex-shrink-0
      overflow-hidden
    "
  >
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
      nodeTypes={nodeTypes}
      connectionMode={ConnectionMode.Loose}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      minZoom={0.3}
      maxZoom={1.5}
      zoomOnScroll={true}
      panOnScroll={true}
      attributionPosition="top-center"
      className="compliance-canvas"
    >
      <Background color="hsl(var(--muted-foreground))" gap={20} />
      <Controls className="bg-card border border-border/50 text-foreground" />
      <div className='hidden md:block'>
      <MiniMap
        className="bg-card border border-border/50"
        nodeColor={(node) => {
          switch (node.data?.status) {
            case 'compliant':
              return 'hsl(var(--status-green))';
            case 'at-risk':
              return 'hsl(var(--status-amber))';
            case 'non-compliant':
              return 'hsl(var(--status-red))';
            default:
              return 'hsl(var(--muted))';
          }
        }}
      /></div>
    </ReactFlow>
  </div>
</div>




    </div>
  );
};