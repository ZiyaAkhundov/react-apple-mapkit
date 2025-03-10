let loadingPromise: Promise<void> | null = null;

export default function mapLoader(token: string): Promise<void> {
    if (loadingPromise !== null) {
      return loadingPromise;
    }
  
    loadingPromise = new Promise((resolve) => {
      const script = document.createElement('script');
      script.addEventListener('load', () => {
        mapkit.init({
          authorizationCallback: (done) => done(token),
        });
  
        resolve();
      }, { once: true });
      script.src = 'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    });
    return loadingPromise;
  }