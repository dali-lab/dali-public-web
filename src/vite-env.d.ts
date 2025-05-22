/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NOTION_API_KEY: string
  readonly VITE_NOTION_PROJECTS_DATABASE_ID: string
  readonly VITE_NOTION_MEMBERS_DATABASE_ID: string
  readonly VITE_NOTION_EDUCATION_DATABASE_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.mp4' {
  const src: string
  export default src
} 