"use client";

import React, { useEffect, useRef } from "react";

export function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const throttleLastRunRef = useRef<number>(0);

  // Load content from URL hash
  const loadContentFromHash = () => {
    if (!editorRef.current) return;

    const urlHash = window.location.hash.slice(1);

    if (urlHash) {
      try {
        const decodedContent = atob(urlHash);
        editorRef.current.innerHTML = decodedContent;
      } catch {
        // If decoding fails, try to use it as-is
        editorRef.current.innerHTML = urlHash;
      }
    }
  };

  // Update URL hash function
  const updateUrlHash = (content: string) => {
    const encodedContent = btoa(content);
    if (window.location.hash !== `#${encodedContent}`) {
      window.history.replaceState(null, "", `#${encodedContent}`);
    }
  };

  // Debounced URL update (waits 500ms after user stops typing)
  const debouncedUpdateUrl = (content: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      updateUrlHash(content);
    }, 500);
  };

  // Throttled operation (runs at most once per 100ms)
  const throttledOperation = () => {
    const now = Date.now();
    if (now - throttleLastRunRef.current >= 100) {
      // Placeholder for any immediate operations needed
      // Currently just using debounce for URL updates
      throttleLastRunRef.current = now;
    }
  };

  // Load content on mount and when URL hash changes
  useEffect(() => {
    loadContentFromHash();

    // Listen for hash changes (back/forward navigation)
    const handleHashChange = () => {
      loadContentFromHash();
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      // Cleanup debounce timeout on unmount
      const timeout = debounceTimeoutRef.current;
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  // Save content to URL hash whenever it changes (debounced and throttled)
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;

    // Throttled operation (runs at most once per 100ms)
    throttledOperation();

    // Debounced URL update (waits 500ms after user stops typing)
    debouncedUpdateUrl(newContent);
  };

  return (
    <section className="text-sm h-screen w-full no-scrollbar overflow-y-auto overflow-x-auto">
      <div
        ref={editorRef}
        className="max-w-7xl outline-none mx-auto px-4 py-10 h-full no-scrollbar overflow-y-auto overflow-x-auto"
        contentEditable={true}
        onInput={handleInput}
        suppressContentEditableWarning={true}
      />
    </section>
  );
}
