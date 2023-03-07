import React from 'react'
import { usePosts } from '../context/postContext'
import { VscEmptyWindow } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { PostCard } from '../components/PostCard'

export const HomePage = () => {
    const { posts } = usePosts();


    const renderMain = () => {
        if (!posts.length) return <div className='flex flex-col justify-center items-center'>
            <VscEmptyWindow className='w-48 h-48 text-white' />
            <h1 className='text-white text-2xl'>There are no posts</h1>
        </div>
        return (<div className='grid grid-cols-3 gap-2'>
            {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>)
    }

    return (
        <div className='text-white'>
            <header className='flex justify-between py-4'>
                <h1 className='text-2xl text-gray-300 font-bold'>Posts ({posts.length})</h1>
                <Link to='/new' className='px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white'>Create New Post</Link>
            </header>
            {renderMain()}
        </div>
    )
}