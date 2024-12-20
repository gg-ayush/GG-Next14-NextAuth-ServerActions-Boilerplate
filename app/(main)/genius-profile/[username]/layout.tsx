"use client";
'use cache'
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { PublicAvatarProvider } from "@/src/components/comp/AvatarManager/provider/AvatarManagerPublicContext";
import { Button } from "@/src/ui/button";

import CustomToolTip from "@/src/components/comp/CustomComponents/CustomToolTip";

interface GeniusProfileLayoutProps {
  children: ReactNode;
  params: {
    username: string;
  };
}

export default function GeniusProfileLayout({
  children,
  params,
}: GeniusProfileLayoutProps) {
  const { username } = params;
  const pathname = usePathname();

  // Determine the active tab
  const isHomeActive = pathname === `/genius-profile/${username}`;
  const isGalleryActive = pathname.includes(
    `/genius-profile/${username}/gallery`
  );
  const isProjectsActive = pathname.includes(
    `/genius-profile/${username}/projects`
  );

  return (
    <PublicAvatarProvider username={username}>
      <div className="relative size-full">
        <div className="flex h-full gap-x-3 text-black dark:text-white">
          <div className="flex-1 border-2 rounded-lg w-full mx-[69px] overflow-hidden transition-transform duration-300 ease-in-out">
            <div
              key={pathname}
              className="px-4 pb-4 pt-8 h-full relative overflow-hidden scroll-container"
              style={{ scrollBehavior: "smooth" }}
            >
              {children}
              <div
                className={`absolute -bottom-2 z-50 left-1/2 -translate-x-1/2 flex space-x-4 mb-4 transition-all duration-300 ease-in-out`}
              >
                <ul className="relative mx-auto flex w-fit gap-1 rounded-full bg-white/20 dark:bg-black/20 p-1 transition-all duration-300 ease-in-out">
                  {/* Home Link */}
                  <Link
                    href={`/genius-profile/${username}`}
                    className="group relative"
                  >
                    <Button
                      className={`rounded-full flex justify-center items-center transition-color duration-300 ease-in-out ${
                        isHomeActive
                          ? "bg-black text-sky-500 hover:bg-black/80 hover:text-white h-[32px]"
                          : "dark:bg-white bg-gray-200 text-black hover:bg-black hover:text-white size-[32px]"
                      }`}
                    >
                      {isHomeActive ? "HOME" : "H"}
                    </Button>
                    {!isHomeActive && <CustomToolTip content="Home" />}
                  </Link>

                  {/* Gallery Link */}
                  <Link
                    href={`/genius-profile/${username}/gallery`}
                    className="group"
                  >
                    <Button
                      className={`rounded-full  flex justify-center items-center transition-color duration-300 ease-in-out ${
                        isGalleryActive
                          ? "bg-black text-sky-500  hover:bg-black/80 hover:text-white h-[32px]"
                          : "dark:bg-white bg-gray-200 text-black  hover:bg-black hover:text-white size-[32px]"
                      }`}
                    >
                      {isGalleryActive ? "GALLERY" : "G"}
                    </Button>
                    {!isGalleryActive && <CustomToolTip content="Gallery" />}
                  </Link>

                  {/* Projects Link */}
                  <Link
                    href={`/genius-profile/${username}/projects`}
                    className="group"
                  >
                    <Button
                      className={`rounded-full  flex justify-center items-center transition-color duration-300 ease-in-out ${
                        isProjectsActive
                          ? "bg-black text-sky-500  hover:bg-black/80 hover:text-white h-[32px]"
                          : "dark:bg-white bg-gray-200 text-black  hover:bg-black hover:text-white size-[32px]"
                      }`}
                    >
                      {isProjectsActive ? "PROJECTS" : "P"}
                    </Button>
                    {!isProjectsActive && <CustomToolTip content="Projects" />}
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicAvatarProvider>
  );
}
