

export default function createSiteSlug ( siteName: string ) {

    const slug = siteName.split(' ').join('-')
    return slug;

}