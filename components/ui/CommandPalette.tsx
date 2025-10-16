"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiX,
  FiHome,
  FiCode,
  FiBookOpen,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiZap,
  FiUser,
  FiMail,
  FiLayout,
} from "react-icons/fi";
import Fuse from "fuse.js";
import { useCommandPalette } from "@/components/providers/CommandPaletteProvider";
import { allProjects, allPosts } from "@/.contentlayer/generated";

interface SearchItem {
  title: string;
  description: string;
  url: string;
  type: "page" | "section" | "project" | "post";
  category?: string;
}

// Build search items dynamically
const buildSearchItems = (): SearchItem[] => {
  const items: SearchItem[] = [
    // Menu Pages
    {
      title: "Home",
      description: "Main landing page",
      url: "/",
      type: "page",
      category: "Menu",
    },
    {
      title: "Projects",
      description: "View all projects",
      url: "/projects",
      type: "page",
      category: "Menu",
    },
    {
      title: "Blog",
      description: "Read blog posts",
      url: "/blog",
      type: "page",
      category: "Menu",
    },
    {
      title: "Contact",
      description: "Get in touch",
      url: "/contact",
      type: "page",
      category: "Menu",
    },

    // Dashboard Sections (ordered: Hero - About - Projects - Blog)
    {
      title: "Hero",
      description: "Welcome section",
      url: "/",
      type: "section",
      category: "Portfolio",
    },
    {
      title: "About",
      description: "Learn more about me",
      url: "/#about",
      type: "section",
      category: "Portfolio",
    },
    {
      title: "Projects",
      description: "Featured projects showcase",
      url: "/#projects",
      type: "section",
      category: "Portfolio",
    },
    {
      title: "Blog",
      description: "Latest blog posts",
      url: "/#blog",
      type: "section",
      category: "Portfolio",
    },

    // Social Links
    {
      title: "GitHub",
      description: "View my GitHub profile",
      url: "https://github.com/farianbr",
      type: "page",
      category: "Social",
    },
    {
      title: "LinkedIn",
      description: "Connect on LinkedIn",
      url: "https://linkedin.com/in/farianbr",
      type: "page",
      category: "Social",
    },
    {
      title: "Twitter",
      description: "Follow me on Twitter",
      url: "https://twitter.com/farianbr",
      type: "page",
      category: "Social",
    },
  ];

  // Add all published projects
  const publishedProjects = allProjects
    .filter((project: any) => project.published)
    .map((project: any) => ({
      title: project.title,
      description: project.description || "Project",
      url: project.url,
      type: "project" as const,
      category: "Projects",
    }));

  // Add all published blog posts
  const publishedPosts = allPosts
    .filter((post: any) => post.published)
    .map((post: any) => ({
      title: post.title,
      description: post.description || "Blog post",
      url: post.url,
      type: "post" as const,
      category: "Blog",
    }));

  return [...items, ...publishedProjects, ...publishedPosts];
};

export default function CommandPalette() {
  const { isOpen, close, open } = useCommandPalette();
  const [query, setQuery] = useState("");
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  // Build search items on mount
  useEffect(() => {
    const items = buildSearchItems();
    setSearchItems(items);
    setResults(items);
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(searchItems, {
        keys: ["title", "description", "category"],
        threshold: 0.3,
      }),
    [searchItems]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          close();
        } else {
          open();
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, close, open]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setSelectedIndex(0); // Always start with first item selected
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults(searchItems);
    } else {
      const fuseResults = fuse.search(query);
      setResults(fuseResults.map((result) => result.item));
    }
    setSelectedIndex(0);
  }, [query, fuse, searchItems]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        const url = results[selectedIndex].url;
        const isExternal =
          url.startsWith("http://") || url.startsWith("https://");

        if (isExternal) {
          window.open(url, "_blank", "noopener,noreferrer");
        } else {
          const convertedUrl = url.replace("/projects/", "/projects?project=");
          router.push(convertedUrl);
        }
        close();
        setQuery("");
      }
    } else if (e.key === "Escape") {
      close();
      setQuery("");
    }
  };

  const handleSelect = (url: string) => {
    const isExternal = url.startsWith("http://") || url.startsWith("https://");

    if (isExternal) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      const convertedUrl = url.replace("/projects/", "/projects?project=");
      router.push(convertedUrl);
    }
    close();
    setQuery("");
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
            className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none focus:outline-none focus:ring-0 border-0 dark:text-white"
            style={{ outline: "none", boxShadow: "none" }}
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
              {/* Group by category */}
              {["Menu", "Portfolio", "Social", "Projects", "Blog"].map(
                (category) => {
                  const categoryItems = results.filter(
                    (item) => item.category === category
                  );
                  if (categoryItems.length === 0) return null;

                  return (
                    <div key={category} className="mb-3">
                      <div className="mb-1 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {category}
                      </div>
                      {categoryItems.map((item) => {
                        const globalIndex = results.indexOf(item);
                        return (
                          <div
                            key={item.url}
                            ref={
                              globalIndex === selectedIndex ? selectedRef : null
                            }
                            onClick={() => handleSelect(item.url)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`flex w-full cursor-pointer items-start gap-3 rounded-lg p-3 text-left transition-colors ${
                              globalIndex === selectedIndex
                                ? "bg-primary-50 dark:bg-primary-900/20"
                                : "hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                          >
                            <div className="mt-0.5">
                              {item.type === "page" &&
                                item.category === "Menu" &&
                                item.title === "Home" && (
                                  <FiHome className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                                )}
                              {item.type === "page" &&
                                item.category === "Menu" &&
                                item.title === "Projects" && (
                                  <FiCode className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                                )}
                              {item.type === "page" &&
                                item.category === "Menu" &&
                                item.title === "Blog" && (
                                  <FiBookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                                )}
                              {item.type === "page" &&
                                item.category === "Menu" &&
                                item.title === "Contact" && (
                                  <FiMail className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                                )}
                              {item.type === "section" &&
                                item.title === "Hero" && (
                                  <FiZap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                )}
                              {item.type === "section" &&
                                item.title === "About" && (
                                  <FiUser className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                )}
                              {item.type === "section" &&
                                item.title === "Projects" && (
                                  <FiLayout className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                )}
                              {item.type === "section" &&
                                item.title === "Blog" && (
                                  <FiBookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                )}
                              {item.type === "page" &&
                                item.category === "Social" &&
                                item.title === "GitHub" && (
                                  <FiGithub className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                )}
                              {item.type === "page" &&
                                item.category === "Social" &&
                                item.title === "LinkedIn" && (
                                  <FiLinkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                )}
                              {item.type === "page" &&
                                item.category === "Social" &&
                                item.title === "Twitter" && (
                                  <FiTwitter className="h-5 w-5 text-sky-500 dark:text-sky-400" />
                                )}
                              {item.type === "project" && (
                                <FiCode className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                              )}
                              {item.type === "post" && (
                                <FiBookOpen className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {item.title}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }
              )}
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
