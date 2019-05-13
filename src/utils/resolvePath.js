import path from 'path';
export function isExternalLink (path) {
    return /^(http:|https:|mailto:|tel:)\/\//.test(path);
}
export function resolvePath (basePath, routePath) {
    if (isExternalLink(routePath)){
        return routePath;
    }
    return path.resolve(basePath, routePath);
}
