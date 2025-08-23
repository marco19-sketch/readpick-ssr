// import Image from 'next/image';
import '@/styles/splash.css';

export default function SplashScreen() {
    return (
      <div className='splash-page'>
        {/* <Image
          src="/assets/images/leaves-1280.avif"
          sizes="(max-width: 480px) 480px,
         (max-width: 768px) 768px,
         (max-width: 1024px) 1024px,
         (max-width: 1600px) 1600px,
         1920px"
         height='854'
         width='1280'
         alt=''
         aria-label='splash-page'
         className='splash-image'
         decoding='async'
         priority='true'
        /> */}
        <h1 className='splash-title'>WELCOME</h1>
           </div>
    );
}