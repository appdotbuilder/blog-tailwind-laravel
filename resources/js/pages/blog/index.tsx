import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Search, User, Calendar, Tag, MessageCircle, Heart, Star, Grid, List } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
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
    comments_count?: number;
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
    posts: PaginationData;
    categories: Category[];
    [key: string]: unknown;
}

export default function BlogIndex({ posts, categories }: Props) {
    const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.get('/blog', { search: searchTerm });
        }
    };

    return (
        <>
            <Head title="All Blog Posts 📚 - BlogTastic!" />
            
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

                            <div className="hidden md:flex items-center space-x-6">
                                <Link href="/" className="text-black font-semibold hover:text-orange-500 transition-colors">
                                    Home
                                </Link>
                                <Link href="/blog" className="text-orange-500 font-semibold">
                                    Blog
                                </Link>
                                <a href="#categories" className="text-black font-semibold hover:text-orange-500 transition-colors">
                                    Categories
                                </a>
                            </div>

                            <div className="flex items-center space-x-4">
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search posts... 🔍"
                                        className="w-48 lg:w-64 pl-4 pr-10 py-2 border-2 border-black rounded-full bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:scale-110 transition-transform"
                                    >
                                        <Search className="w-4 h-4 text-gray-600" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Content */}
                        <div className="lg:w-3/4">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">
                                        All Stories 📖
                                    </h1>
                                    <p className="text-lg text-gray-600">
                                        Discover amazing content from our creative community! ✨
                                    </p>
                                    <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mt-2 rounded-full"></div>
                                </div>
                                
                                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg border-2 border-black transition-all ${
                                            viewMode === 'grid' 
                                                ? 'bg-emerald-300 shadow-md' 
                                                : 'bg-white hover:bg-gray-50'
                                        }`}
                                    >
                                        <Grid className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg border-2 border-black transition-all ${
                                            viewMode === 'list' 
                                                ? 'bg-emerald-300 shadow-md' 
                                                : 'bg-white hover:bg-gray-50'
                                        }`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Posts Grid/List */}
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {posts.data.map((post) => (
                                        <article key={post.id} className="bg-white rounded-lg p-4 border-2 border-black shadow-lg hover:shadow-xl hover:-translate-x-1 hover:-translate-y-1 cursor-pointer transition-all duration-200" onClick={() => router.get(`/posts/${post.slug}`)}>
                                            <div className="relative overflow-hidden rounded-lg border-2 border-black mb-4">
                                                <img
                                                    src={post.featured_image}
                                                    alt={post.title}
                                                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex flex-wrap gap-2">
                                                    {post.categories.slice(0, 2).map((category) => (
                                                        <span
                                                            key={category.id}
                                                            className="inline-block px-2 py-1 rounded-full text-xs font-semibold text-black border border-black"
                                                            style={{ backgroundColor: category.color }}
                                                        >
                                                            #{category.name}
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
                            ) : (
                                <div className="space-y-6">
                                    {posts.data.map((post) => (
                                        <article key={post.id} className="bg-white rounded-lg p-4 border-2 border-black shadow-lg hover:shadow-xl hover:-translate-x-1 hover:-translate-y-1 cursor-pointer transition-all duration-200 flex flex-col sm:flex-row gap-6" onClick={() => router.get(`/posts/${post.slug}`)}>
                                            <div className="sm:w-1/3">
                                                <div className="relative overflow-hidden rounded-lg border-2 border-black h-48 sm:h-32">
                                                    <img
                                                        src={post.featured_image}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:w-2/3 space-y-3">
                                                <div className="flex flex-wrap gap-2">
                                                    {post.categories.slice(0, 2).map((category) => (
                                                        <span
                                                            key={category.id}
                                                            className="inline-block px-2 py-1 rounded-full text-xs font-semibold text-black border border-black"
                                                            style={{ backgroundColor: category.color }}
                                                        >
                                                            #{category.name}
                                                        </span>
                                                    ))}
                                                </div>
                                                <h3 className="text-xl font-bold text-black hover:text-orange-500 transition-colors">
                                                    {post.title}
                                                </h3>
                                                <p className="text-gray-600">{post.excerpt}</p>
                                                <div className="flex items-center justify-between pt-2 border-t-2 border-dashed border-gray-200">
                                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                        <User className="w-3 h-3" />
                                                        <span>{post.author.name}</span>
                                                        <Calendar className="w-3 h-3 ml-4" />
                                                        <span>{new Date(post.published_at).toLocaleDateString()}</span>
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
                            )}

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
                                                        ? 'bg-orange-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                                                        : link.url
                                                            ? 'bg-white hover:bg-gray-50 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-1/4">
                            <div className="bg-white rounded-xl p-6 card-shadow mb-8">
                                <h3 className="text-2xl font-bold text-black mb-4 flex items-center">
                                    <Tag className="w-6 h-6 mr-2" />
                                    Categories 🏷️
                                </h3>
                                <div className="space-y-3">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={`/categories/${category.slug}`}
                                            className="flex items-center justify-between p-3 rounded-lg border-2 border-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
                                            style={{ backgroundColor: category.color }}
                                        >
                                            <span className="font-semibold text-black">
                                                {category.name}
                                            </span>
                                            <span className="text-sm text-black opacity-75">
                                                {category.posts_count}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Fun Stats */}
                            <div className="bg-gradient-to-br from-pink-100 to-yellow-100 rounded-xl p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <h3 className="text-xl font-bold text-black mb-4">Fun Stats! 📊</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Total Posts</span>
                                        <span className="bg-mint-400 px-3 py-1 rounded-full font-bold border border-black">
                                            {posts.total} 🎉
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Categories</span>
                                        <span className="bg-sky-400 px-3 py-1 rounded-full font-bold border border-black">
                                            {categories.length} 🏷️
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Happy Readers</span>
                                        <span className="bg-yellow-400 px-3 py-1 rounded-full font-bold border border-black">
                                            {Math.floor(Math.random() * 1000) + 500} 😊
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