export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production') {
    const body = JSON.stringify(metric);
    
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/metrics', body);
    } else {
      fetch('/api/metrics', { body, method: 'POST', keepalive: true });
    }
  }
};

export const getMetricsEndpoint = () => {
  return '/api/metrics';
};