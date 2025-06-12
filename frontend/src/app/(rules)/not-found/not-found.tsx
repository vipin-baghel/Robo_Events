import { useEffect } from "react"

export const NotFound = () => {
  useEffect(() => {
    const hideElements = () => {
      document.body.style.overflow = 'hidden';
       
      const header = document.querySelector('header');
      const headerParent = header?.parentElement;
      if(headerParent){
        headerParent.style.display = 'none';
      } else if (header){
        header.style.display = 'none';
      }

      const countdownBanner = document.querySelector('[class*="countdown"], [class*="banner"]');
        if (countdownBanner) {
                (countdownBanner as HTMLElement).style.display = 'none';
        }
      
        const footer = document.querySelector('footer');
            if (footer) footer.style.display = 'none';
        const main = document.querySelector('main');
            if (main) {
                main.style.background = 'white';
                main.style.minHeight = '100vh';
            }  
    };
     hideElements();
      const timeoutId = setTimeout(hideElements, 0);
        
        return () => {
            clearTimeout(timeoutId);
            document.body.style.overflow = 'auto';
            
            // Restore elements
            const header = document.querySelector('header');
            const headerParent = header?.parentElement;
            if (headerParent) {
                headerParent.style.display = '';
            } else if (header) {
                header.style.display = '';
            }
            
            const countdownBanner = document.querySelector('[class*="countdown"], [class*="banner"]');
            if (countdownBanner) {
                (countdownBanner as HTMLElement).style.display = '';
            }
            
            const footer = document.querySelector('footer');
            if (footer) footer.style.display = '';
            
            const main = document.querySelector('main');
            if (main) {
                main.style.background = '';
                main.style.minHeight = '';
            }
        };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen fixed inset-0 bg-white z-[999]">
      <div className="space-y-2">
        <p className="text-2xl font-semibold text-gray-800">404 - Page Not Found</p>
        <p  className="text-gray-600">Sorry, the page you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      </div>
    </div>
  )
}