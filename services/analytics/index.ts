import { addPageView as storeAddPageView, addAuthEvent } from '../../stores/analytics';

// Track page views
export function trackPageView(path?: string) {
  const currentPath = path || (typeof window !== 'undefined' ? window.location.pathname : '');
  storeAddPageView(currentPath);
}

// Track auth events
export function trackAuthEvent(eventName: string, properties?: Record<string, any>) {
  addAuthEvent(eventName, properties);
}

// You can add more tracking functions as needed
export function trackOrderEvent(eventName: string, properties?: Record<string, any>) {
  // Implementation similar to trackAuthEvent
}
