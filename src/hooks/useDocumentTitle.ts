import { useEffect } from 'react';

export function useDocumentTitle(title: string, suffix: string = ' - Git Workshop') {
  useEffect(() => {
    document.title = title + suffix;
  }, [title, suffix]);
}