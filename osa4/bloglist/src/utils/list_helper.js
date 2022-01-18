var _ = require('lodash');

const dummy = (blogs) => 1

totalLikes = (blogs) => blogs
                            .map(blog => blog.likes)
                            .reduce((likes, total) => likes+total)

favoriteBlog = (blogs) =>
                        blogs
                            .reduce((blog, favorite) => blog.likes > favorite.likes ? blog : favorite)

mostBlogs = (blogs) => {
    const most = _.maxBy(_.toPairs(_.mapValues(_.groupBy(blogs, value => value.author), "length")), val => val[1])
    return {author: most[0], blogs: most[1]}
}

mostLikes = (blogs) => {
    const most =
        _.maxBy(
            _.toPairs(
                _.mapValues(
                    _.groupBy(
                        blogs, 
                        value => value.author
                    ),
                    val => _.sumBy(val, "likes")
                )
            ),
            val => val[1])
            
    return {author: most[0], likes: most[1]}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}