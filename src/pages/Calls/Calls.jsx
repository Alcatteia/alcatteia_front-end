import { useEffect, useRef } from "react";
import "./styles.css";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


// eslint-disable-next-line no-unused-vars
function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}



export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function Calls() {
  const roomID = "salinha";
  const containerRef = useRef(null);

  useEffect(() => {
    const appID = 1314647224;
    const serverSecret = "535f4eac9eb427a2a1b43e7b5295da51";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      "salinha"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });

    return () => {
      zp.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Rola a página para o topo ao carregar o componente.
  }, []);

  return (
    <div
      ref={containerRef}
      className="myCallContainer px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-6"
      style={{ height: '100vh' }}
    ></div>
  );
}