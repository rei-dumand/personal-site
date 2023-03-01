import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `posts/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            description: 'The title of the post',
            required: true,
        },
        subtitle: {
            type: 'string',
            description: 'The subtitle of the post',
            required: true,
        },
        date: {
            type: 'string',
            description: 'The date of the post',
            required: true,
        },
        excerpt: {
            type: 'string',
            description: 'Post excerpt',
            required: true,
        },
        coverImage: {
            type: 'string',
            description: 'Link to post cover image',
            required: true,
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (post) => `${post._raw.flattenedPath.split('/').slice(1)}`,
        },
        slugAsParams: {
            type: "string",
            resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
          },
    },
}))

export default makeSource({
    contentDirPath: './content',
    documentTypes: [Post],
})