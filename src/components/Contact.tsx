import { userInfo } from "@/data/user-data";
import ProfileCard from "./ProfileCard";

const Contact = () => {
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center">
          Let's Work Together
        </h2>

        <div className="max-w-xl mx-auto">
          <ProfileCard
            name="Khoo Thien Zhi"
            title="CPEG Student at HKUST"
            handle="thienzhi_"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/thienzhi.png"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={true}
            className="mx-auto w-fit"
            behindGradient={
              "radial-gradient(farthest-side circle at 50% 50%, hsla(260, 100%, 85%, calc(var(--card-opacity) * 0.25)) 10%, hsla(260, 60%, 70%, calc(var(--card-opacity) * 0.15)) 40%, transparent 70%), radial-gradient(35% 52% at 50% 50%, hsla(200, 85%, 60%, 0.12) 0%, transparent 100%), radial-gradient(100% 100% at 50% 50%, hsla(260, 70%, 70%, 0.12) 1%, transparent 76%), conic-gradient(from 124deg at 50% 50%, hsla(270, 70%, 60%, 0.15) 0%, hsla(200, 70%, 60%, 0.15) 50%, hsla(270, 70%, 60%, 0.15) 100%)"
            }
            onContactClick={() => window.open(userInfo.contact.linkedin, '_blank', 'noopener,noreferrer')}
          />

          <div className="mt-10 flex flex-col items-center space-y-6">
            <a href={`https://outlook.live.com/mail/0/deeplink/compose?to=${userInfo.contact.email}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
                </svg>
              </div>
              <span>{userInfo.contact.email}</span>
            </a>
            <a href={userInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span>LinkedIn</span>
            </a>
            <a href={`https://wa.me/85244924625`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
                </svg>
              </div>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
