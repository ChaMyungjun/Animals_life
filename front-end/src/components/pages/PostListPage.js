import React from 'react'
import HeaderContainer from '../common/HeaderContainer'
import PostListContainer from '../../containers/posts/PostListContainer'
import PaginationContainer from "../../containers/posts/PaginationContainer";
import {Helmet} from 'react-helmet-async'


const PostListPage = () => {
    return (
        <React.Fragment>
            <Helmet>
                <title>PostList</title>
            </Helmet>
            <HeaderContainer />
            <PostListContainer />
            <PaginationContainer />
        </React.Fragment>
    )
}

export default PostListPage