import Fuse from "fuse.js";

export const fuzzySearch = (list, keys = [], pattern) => {
    const options = {
        isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        threshold: 0.4,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys
    };

    const fuse = new Fuse(list, options);
    console.log(fuse)
    const results = fuse.search(pattern).map(e => e.item)
    console.log(results)
    return results
}