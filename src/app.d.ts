// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
interface Window {
  gtag?: (command: string, action: string, params?) => void
  // Add other analytics providers as needed
  // mixpanel?: any
}
