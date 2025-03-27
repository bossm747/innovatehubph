
import React, { useEffect } from 'react';

interface FacebookFeedProps {
  pageUrl: string;
  width?: number;
  height?: number;
  showTimeline?: boolean;
  smallHeader?: boolean;
  hideCover?: boolean;
}

// Define the FB SDK interface
interface FacebookSDK {
  init: (params: {
    xfbml: boolean;
    version: string;
  }) => void;
  XFBML: {
    parse: (element?: HTMLElement) => void;
  };
}

// Add type definition for window.FB and fbAsyncInit
declare global {
  interface Window {
    FB: FacebookSDK;
    fbAsyncInit: () => void;
  }
}

const FacebookFeed: React.FC<FacebookFeedProps> = ({
  pageUrl,
  width = 340,
  height = 500,
  showTimeline = true,
  smallHeader = false,
  hideCover = false,
}) => {
  useEffect(() => {
    // Load Facebook SDK
    const loadFacebookSDK = () => {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v16.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
      
      // Initialize FB SDK
      window.fbAsyncInit = function() {
        window.FB.init({
          xfbml: true,
          version: 'v16.0'
        });
      };
    };

    // Check if FB SDK is already loaded
    if (!window.FB) {
      loadFacebookSDK();
    } else {
      // If already loaded, parse XFBML again to render the plugin
      window.FB.XFBML.parse();
    }

    return () => {
      // Clean up function if needed
    };
  }, [pageUrl]);

  return (
    <div className="fb-page-container relative overflow-hidden rounded-lg shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-50"></div>
      <div className="relative z-10 p-4">
        <div 
          className="fb-page" 
          data-href={pageUrl}
          data-tabs={showTimeline ? "timeline" : ""}
          data-width={width.toString()}
          data-height={height.toString()}
          data-small-header={smallHeader.toString()}
          data-adapt-container-width="true"
          data-hide-cover={hideCover.toString()}
          data-show-facepile="true"
        >
          <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
            <a href={pageUrl}>PlataPay</a>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default FacebookFeed;
