import {
  FileCode,
  FileText,
  FileJson,
  FileType,
  File,
} from 'lucide-react';

export const getFileIcon = (filename: string, className = 'w-4 h-4') => {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'py':
      return <FileCode className={`${className} text-yellow-400`} />;
    case 'js':
    case 'jsx':
      return <FileCode className={`${className} text-yellow-300`} />;
    case 'ts':
    case 'tsx':
      return <FileCode className={`${className} text-blue-400`} />;
    case 'java':
      return <FileCode className={`${className} text-orange-400`} />;
    case 'cpp':
    case 'cc':
    case 'cxx':
      return <FileCode className={`${className} text-blue-600`} />;
    case 'c':
      return <FileCode className={`${className} text-blue-500`} />;
    case 'h':
    case 'hpp':
      return <FileCode className={`${className} text-purple-400`} />;
    case 'html':
    case 'htm':
      return <FileCode className={`${className} text-orange-500`} />;
    case 'css':
      return <FileCode className={`${className} text-blue-300`} />;
    case 'scss':
    case 'sass':
      return <FileCode className={`${className} text-pink-400`} />;
    case 'json':
      return <FileJson className={`${className} text-yellow-300`} />;
    case 'md':
    case 'markdown':
      return <FileText className={`${className} text-gray-400`} />;
    case 'sql':
      return <FileType className={`${className} text-green-400`} />;
    case 'r':
      return <FileCode className={`${className} text-blue-500`} />;
    case 'kt':
      return <FileCode className={`${className} text-purple-500`} />;
    case 'go':
      return <FileCode className={`${className} text-cyan-400`} />;
    case 'rs':
      return <FileCode className={`${className} text-orange-600`} />;
    case 'php':
      return <FileCode className={`${className} text-purple-400`} />;
    case 'rb':
      return <FileCode className={`${className} text-red-500`} />;
    case 'swift':
      return <FileCode className={`${className} text-orange-500`} />;
    case 'xml':
      return <FileCode className={`${className} text-orange-400`} />;
    case 'yaml':
    case 'yml':
      return <FileCode className={`${className} text-gray-300`} />;
    case 'dockerfile':
      return <FileCode className={`${className} text-blue-400`} />;
    case 'sh':
    case 'bash':
      return <FileCode className={`${className} text-green-500`} />;
    default:
      return <File className={`${className} text-gray-400`} />;
  }
};

export const getLanguageFromFilename = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  const languageMap: Record<string, string> = {
    'py': 'python',
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'java': 'java',
    'cpp': 'cpp',
    'cc': 'cpp',
    'cxx': 'cpp',
    'c': 'c',
    'h': 'c',
    'hpp': 'cpp',
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'scss',
    'json': 'json',
    'md': 'markdown',
    'sql': 'sql',
    'r': 'r',
    'kt': 'kotlin',
    'go': 'go',
    'rs': 'rust',
    'php': 'php',
    'rb': 'ruby',
    'swift': 'swift',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
  };
  
  return languageMap[ext || ''] || 'plaintext';
};
