// Every route's content comes from build-time content globs, so the whole site is
// statically knowable. This also turns an accidentally-dynamic route into a build
// error rather than a silent serverless function.
export const prerender = true;
