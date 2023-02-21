import type { MDXComponents } from 'mdx/types'

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // p: ({ children }) => <p style={{ fontSize: "100px" }}>{children}</p>,
    ...components,
  }
}