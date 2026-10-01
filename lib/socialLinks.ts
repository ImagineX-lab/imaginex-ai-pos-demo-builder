export interface SocialLink {
  id: string;
  name: string;
  url: string;
  color: string;
  hoverBg: string;
  icon: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://www.facebook.com/share/1D2eCxExC8/?mibextid=wwXIfr',
    color: '#1877F2',
    hoverBg: 'hover:bg-[#1877F2]/20 hover:border-[#1877F2]/50 hover:text-[#1877F2]',
    icon: 'facebook',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    url: 'https://wa.me/94761945587',
    color: '#25D366',
    hoverBg: 'hover:bg-[#25D366]/20 hover:border-[#25D366]/50 hover:text-[#25D366]',
    icon: 'whatsapp',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    url: 'https://www.tiktok.com/@imaginex.it.solut?_r=1&_t=ZS-9A7EmRC7Mlc',
    color: '#00F2FE',
    hoverBg: 'hover:bg-[#00F2FE]/20 hover:border-[#00F2FE]/50 hover:text-[#00F2FE]',
    icon: 'tiktok',
  },
];
