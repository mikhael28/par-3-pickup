declare const self: ServiceWorkerGlobalScope;

const getBuildManifest = (): NextBuildManifest => {
  const manifest = self.__BUILD_MANIFEST;
  console.log("manifest ts: ", manifest);
  return Object.entries(manifest).reduce<NextBuildManifest>(
    (manifest, [page, assets]) => ({
      ...manifest,
      //   [page]: assets.map((url) => `/_next/${url}`),
    }),
    {}
  );
};

export default getBuildManifest;
