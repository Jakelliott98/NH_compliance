

export default function CreateSiteSlug ( siteName: string ) {

    const slug = siteName.split(' ').join('-')
    return slug;

}