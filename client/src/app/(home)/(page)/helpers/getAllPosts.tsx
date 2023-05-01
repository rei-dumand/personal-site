import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

const getAllPosts = () => allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

export default getAllPosts
