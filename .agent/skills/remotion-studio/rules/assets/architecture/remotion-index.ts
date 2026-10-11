
/**

 * index.ts

 * Entry Point for Remotion - registers all compositions

 */



import { registerRoot } from 'remotion';

import { Composition } from 'remotion';

import { AgXScene } from './scenes/AgXScene';

import { ToonScene } from './scenes/ToonScene';

import './style.css'; // Tailwind import



export const RemotionRoot: React.FC = () => {

  return (

    <>

      <Composition

        id="AgX"

        component={AgXScene}

        durationInFrames={300}

        fps={30}

        width={1920}

        height={1080}

        defaultProps={{

            title: "Viron Creative Engine",

            subtitle: "Photorealism Standard"

        }}

      />

      <Composition

        id="Toon"

        component={ToonScene}

        durationInFrames={300}

        fps={30}

        width={1920}

        height={1080}

        defaultProps={{

            title: "Viron Stylized",

            subtitle: "NPR Rendering"

        }}

      />

    </>

  );

};



registerRoot(RemotionRoot);

