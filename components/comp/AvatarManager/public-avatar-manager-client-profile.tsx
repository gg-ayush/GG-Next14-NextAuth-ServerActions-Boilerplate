"use client";

import { Avatar } from "@/components/comp/Avatar";
import { Suspense } from "react";
import AvatarSkeleton from "../GeniusUserProfile/skeleton/AvatarSkeleton";
import { usePublicAvatar } from "./provider/AvatarManagerPublicContext";

export default function PublicAvatarManagerClientProfile({
  fov,
  cameraInitialDistance,
  cameraTarget,
}: {
  fov: number;
  cameraInitialDistance: number;
  cameraTarget: number;
}) {
  const { selectedPublicAvatar, currentPublicEmote } = usePublicAvatar();

  return (
    <>
      <Suspense fallback={<AvatarSkeleton />}>
        <Avatar
          key="avatar publicx"
          modelSrc={
            selectedPublicAvatar ||
            "https://models.readyplayer.me/66fbd22e36a151e549ea8397.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
          }
          shadows={false}
          animationSrc={currentPublicEmote}
          style={{ background: "rgb(0,0,6)", pointerEvents: "none" }}
          fov={fov}
          cameraTarget={cameraTarget}
          cameraInitialDistance={cameraInitialDistance}
          effects={{ ambientOcclusion: false }}
          followModel={true}
          // Disable interactivity
          headMovement={false} // Disable head tracking
          idleRotation={true}
        />
      </Suspense>
    </>
  );
}