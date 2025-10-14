'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiFileText, FiFolder, FiX } from 'react-icons/fi';
import Fuse from 'fuse.js';
import { useCommandPalette } from '@/components/providers/CommandPaletteProvider';

interface SearchItem {
  title: string;
  description: string;
  url: string;
  type: 'page' | 'project' | 'post';
}

const searchItems: SearchItem[] = [
  { title: 'Home', description: 'Main landing page', url: '/', type: 'page' },
  { title: 'About', description: 'Learn more about me', url: '#about', type: 'page' },
  { title: 'Projects', description: 'View my projects', url: '#projects', type: 'page' },
  { title: 'Blog', description: 'Read my blog posts', url: '/blog', type: 'page' },
  { title: 'Contact', description: 'Get in touch', url: '/contact', type: 'page' },
];

export default function CommandPalette() {
  const { isOpen, close, open } = useCommandPalette();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>(searchItems);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(searchItems, {
        keys: ['title', 'description'],
        threshold: 0.3,
      }),
    []
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          close();
        } else {
          open();
        }
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, close, open]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults(searchItems);
    } else {
      const fuseResults = fuse.search(query);
      setResults(fuseResults.map((result) => result.item));
    }
    setSelectedIndex(0);
  }, [query, fuse]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        router.push(results[selectedIndex].url);
        close();
        setQuery('');
      }
    } else if (e.key === 'Escape') {
      close();
      setQuery('');
    }
  };

  const handleSelect = (url: string) => {
    router.push(url);
    close();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[20vh] backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center border-b border-gray-200 p-4 dark:border-gray-800">
          <FiSearch className="mr-3 h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, projects, and posts..."
            className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none dark:text-white"
          />
          <button
            onClick={close}
            className="ml-2 rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No results found
            </div>
          ) : (
            <div>
              {results.map((item, index) => (
                <div
                  key={item.url}
                >
                  <div
                    onClick={() => handleSelect(item.url)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors ${
                      index === selectedIndex
                        ? 'bg-primary-50 dark:bg-primary-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="mt-0.5">
                      {item.type === 'page' && (
                        <FiFileText className="h-5 w-5 text-gray-400" />
                      )}
                      {item.type === 'project' && (
                        <FiFolder className="h-5 w-5 text-gray-400" />
                      )}
                      {item.type === 'post' && (
                        <FiFileText className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-4 py-2 text-xs text-gray-500 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <span>Navigate with ↑↓, select with ↵</span>
            <span>Close with ESC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
