declare const self: ServiceWorkerGlobalScope;

const getBuildManifest = (): NextBuildManifest => {
  const manifest = self.__BUILD_MANIFEST;
  console.log("manifest ts: ", manifest);
  return Object.entries(manifest).reduce<NextBuildManifest>(
    (manifest, [page, assets]) => ({
      ...manifest,
      //   @TODO: investigate service worker, works on mobile, broken on desktop. M1 issue?
      //   [page]: assets.map((url) => `/_next/${url}`),
    }),
    {}
  );
};

export default getBuildManifest;
