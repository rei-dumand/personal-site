import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

const getAllPosts = () => {
    return allPosts.sort((a, b) => {
        return compareDesc(new Date(a.date), new Date(b.date))
    })
}

export default getAllPosts