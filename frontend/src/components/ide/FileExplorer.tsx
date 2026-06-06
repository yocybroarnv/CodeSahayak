import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  FileJson,
  FileType,
  ChevronRight,
  ChevronDown,
  Plus,
  MoreVertical,
  Trash2,
  Edit3,
  Copy,
} from 'lucide-react';
import { useIDEStore, type FileNode } from '@/store/ideStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const getFileIcon = (name: string, isFolder: boolean) => {
  if (isFolder) return null;
  
  const ext = name.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'py':
      return <FileCode className="w-4 h-4 text-yellow-400" />;
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
      return <FileCode className="w-4 h-4 text-blue-400" />;
    case 'java':
      return <FileCode className="w-4 h-4 text-orange-400" />;
    case 'cpp':
    case 'c':
    case 'h':
      return <FileCode className="w-4 h-4 text-blue-600" />;
    case 'html':
    case 'htm':
      return <FileCode className="w-4 h-4 text-orange-500" />;
    case 'css':
      return <FileCode className="w-4 h-4 text-blue-300" />;
    case 'json':
      return <FileJson className="w-4 h-4 text-yellow-300" />;
    case 'md':
      return <FileText className="w-4 h-4 text-gray-400" />;
    case 'sql':
      return <FileType className="w-4 h-4 text-green-400" />;
    default:
      return <FileText className="w-4 h-4 text-gray-400" />;
  }
};

interface FileTreeItemProps {
  node: FileNode;
  depth: number;
  onSelect: (node: FileNode) => void;
}

function FileTreeItem({ node, depth, onSelect }: FileTreeItemProps) {
  const { openTab, deleteFile, activeFileId } = useIDEStore();
  const [isExpanded, setIsExpanded] = useState(node.isOpen ?? false);
  
  const isActive = activeFileId === node.id;
  const paddingLeft = depth * 12 + 8;
  
  const handleClick = () => {
    if (node.isFolder) {
      setIsExpanded(!isExpanded);
    } else {
      onSelect(node);
      openTab(node);
    }
  };
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={`group flex items-center gap-1 py-1.5 px-2 cursor-pointer text-sm transition-colors ${
          isActive
            ? 'bg-[#6C5CE7]/10 text-[#6C5CE7] font-medium'
            : 'text-[#636E72] hover:bg-[#F6F7FB] hover:text-[#1A1D2B]'
        }`}
        style={{ paddingLeft }}
        onClick={handleClick}
      >
        {node.isFolder && (
          <span className="w-4 h-4 flex items-center justify-center">
            {isExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </span>
        )}
        
        {!node.isFolder && <span className="w-4" />}
        
        <span className="w-5 h-5 flex items-center justify-center">
          {node.isFolder ? (
            isExpanded ? (
              <FolderOpen className="w-4 h-4 text-[#6C5CE7]" />
            ) : (
              <Folder className="w-4 h-4 text-[#6C5CE7]" />
            )
          ) : (
            getFileIcon(node.name, false)
          )}
        </span>
        
        <span className="flex-1 truncate ml-1">{node.name}</span>
        
        {!node.isFolder && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); }}>
                <Edit3 className="w-4 h-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); }}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile(node.id);
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </motion.div>
      
      <AnimatePresence>
        {node.isFolder && isExpanded && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.children.map((child) => (
              <FileTreeItem
                key={child.id}
                node={child}
                depth={depth + 1}
                onSelect={onSelect}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FileExplorer() {
  const { files, setActiveFile, addFile } = useIDEStore();
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  
  const handleCreateFile = () => {
    if (newFileName.trim()) {
      const newFile: FileNode = {
        id: `file-${Date.now()}`,
        name: newFileName,
        path: `/${newFileName}`,
        content: '',
        language: newFileName.split('.').pop() || 'txt',
        isFolder: false,
        parentId: 'src',
      };
      addFile(newFile, 'src');
      setNewFileName('');
      setShowNewFileInput(false);
    }
  };
  
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#E8EAF6]">
        <span className="text-xs font-semibold text-[#636E72] uppercase tracking-wider">
          Explorer
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 text-[#636E72] hover:text-[#1A1D2B] hover:bg-[#F6F7FB]"
            onClick={() => setShowNewFileInput(true)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* New File Input */}
      <AnimatePresence>
        {showNewFileInput && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-3 py-2"
          >
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateFile()}
              onBlur={handleCreateFile}
              placeholder="filename.py"
              className="w-full px-2 py-1 text-sm bg-white text-[#1A1D2B] rounded border border-[#E8EAF6] focus:border-[#6C5CE7] focus:outline-none"
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* File Tree */}
      <div className="flex-1 overflow-auto py-2 file-explorer-scrollbar">
        {files.map((node) => (
          <FileTreeItem
            key={node.id}
            node={node}
            depth={0}
            onSelect={(n) => setActiveFile(n.id)}
          />
        ))}
      </div>
    </div>
  );
}
