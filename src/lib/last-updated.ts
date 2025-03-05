export const BUILD_DATE = typeof import.meta.env.BUILD_DATE === 'string'
  ? new Date(import.meta.env.BUILD_DATE)
  : new Date();