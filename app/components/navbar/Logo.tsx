'use client';

import Image from 'next/image'
import { useRouter } from 'next/navigation';

const Logo = () => {
    return ( 
        <Image
        className="hidden md:block cursor-pointer"
        alt="logo"
        height="100"
        width="100"
        src="/images/logo.png"
        priority={true}
        />
    );
}
export default Logo;