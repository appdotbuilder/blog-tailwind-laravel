import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { User, Tag, MessageCircle, Heart, Star, ArrowLeft } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
    description?: string;
    posts_count: number;
}

interface Author {
    id: number;
    name: string;
    email: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    published_at: string;
    author: Author;
    categories: Category[];
}

interface PaginationData {
    data: Post[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    category: Category;
    posts: PaginationData;
    categories: Category[];
    [key: string]: unknown;
}

export default function CategoryPage({ category, posts, categories }: Props) {
    return (
        <>
            <Head title={`${category.name} Posts 🏷️ - BlogTastic!`} />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50">
                {/* Navigation */}
                <nav className="bg-white border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="bg-yellow-400 p-2 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <Star className="w-6 h-6 text-black" />
                                </div>
                                <span className="text-2xl font-bold text-black">BlogTastic! 🎨</span>
                            </Link>

                            <div className="flex items-center space-x-4">
                                <Link href="/blog" className="btn-sky">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    All Posts
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Category Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center mb-6">
                            <div 
                                className="px-8 py-4 rounded-full text-3xl font-bold text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                                style={{ backgroundColor: category.color }}
                            >
                                #{category.name} 🏷️
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
                            {category.name} Stories
                        </h1>
                        
                        {category.description && (
                            <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto mb-6">
                                {category.description}
                            </p>
                        )}
                        
                        <div className="flex items-center justify-center space-x-6 text-lg">
                            <div className="bg-white px-4 py-2 rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <span className="font-bold">{posts.total}</span> amazing posts! 📚
                            </div>
                        </div>
                        
                        <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Content */}
                        <div className="lg:w-3/4">
                            {posts.data.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {posts.data.map((post) => (
                                            <article key={post.id} className="blog-card" onClick={() => router.get(`/posts/${post.slug}`)}>
                                                <div className="relative overflow-hidden rounded-lg border-2 border-black mb-4">
                                                    <img
                                                        src={post.featured_image}
                                                        alt={post.title}
                                                        className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex flex-wrap gap-2">
                                                        {post.categories.slice(0, 2).map((cat) => (
                                                            <span
                                                                key={cat.id}
                                                                className="category-tag text-xs"
                                                                style={{ backgroundColor: cat.color }}
                                                            >
                                                                #{cat.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-black line-clamp-2 hover:text-orange-500 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                                                    <div className="flex items-center justify-between pt-2 border-t-2 border-dashed border-gray-200">
                                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                            <User className="w-3 h-3" />
                                                            <span>{post.author.name}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                            <div className="flex items-center space-x-1">
                                                                <Heart className="w-3 h-3" />
                                                                <span>{Math.floor(Math.random() * 50) + 10}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <MessageCircle className="w-3 h-3" />
                                                                <span>{Math.floor(Math.random() * 20) + 1}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {posts.last_page > 1 && (
                                        <div className="flex justify-center mt-12">
                                            <div className="flex space-x-2">
                                                {posts.links.map((link, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => link.url && router.get(link.url)}
                                                        disabled={!link.url}
                                                        className={`px-4 py-2 rounded-full font-semibold border-2 border-black transition-all ${
                                                            link.active
                                                                ? 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                                                                : link.url
                                                                    ? 'bg-white hover:bg-gray-50 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        }`}
                                                        style={{
                                                            backgroundColor: link.active ? category.color : undefined
                                                        }}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="text-8xl mb-6">📭</div>
                                    <h2 className="text-3xl font-bold text-black mb-4">No posts yet in this category!</h2>
                                    <p className="text-xl text-gray-600 mb-8">
                                        But don't worry, amazing content is coming soon! ✨
                                    </p>
                                    <Link href="/blog" className="btn-orange">
                                        Explore Other Categories 🚀
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-1/4">
                            <div className="bg-white rounded-xl p-6 card-shadow mb-8">
                                <h3 className="text-2xl font-bold text-black mb-4 flex items-center">
                                    <Tag className="w-6 h-6 mr-2" />
                                    Other Categories 🏷️
                                </h3>
                                <div className="space-y-3">
                                    {categories.filter(cat => cat.id !== category.id).map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={`/categories/${cat.slug}`}
                                            className="flex items-center justify-between p-3 rounded-lg border-2 border-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
                                            style={{ backgroundColor: cat.color }}
                                        >
                                            <span className="font-semibold text-black">
                                                {cat.name}
                                            </span>
                                            <span className="text-sm text-black opacity-75">
                                                {cat.posts_count}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Category Fun Fact */}
                            <div 
                                className="rounded-xl p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                style={{ backgroundColor: category.color }}
                            >
                                <h3 className="text-xl font-bold text-black mb-4">Category Spotlight! ✨</h3>
                                <div className="space-y-3 text-black">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Total Posts</span>
                                        <span className="bg-white px-3 py-1 rounded-full font-bold border border-black">
                                            {category.posts_count} 🎉
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Readers Love</span>
                                        <span className="bg-white px-3 py-1 rounded-full font-bold border border-black">
                                            ❤️ 100%
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Fun Level</span>
                                        <span className="bg-white px-3 py-1 rounded-full font-bold border border-black">
                                            🚀 MAX!
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}