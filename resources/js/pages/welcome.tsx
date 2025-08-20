import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Search, User, Calendar, MessageCircle, ArrowRight, Heart, Star } from 'lucide-react';

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

interface Props {
    featuredPost?: Post;
    latestPosts: Post[];
    categories: Category[];
    [key: string]: unknown;
}

export default function Welcome({ featuredPost, latestPosts, categories }: Props) {
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.get('/blog', { search: searchTerm });
        }
    };

    return (
        <>
            <Head title="🎨 Creative Blog - Where Ideas Come Alive!" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                {/* Navigation */}
                <nav className="bg-white border-b-4 border-black shadow-lg sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="bg-yellow-400 p-2 rounded-full border-2 border-black shadow-md">
                                    <Star className="w-6 h-6 text-black" />
                                </div>
                                <span className="text-2xl font-bold text-black">BlogTastic! 🎨</span>
                            </Link>

                            <div className="hidden md:flex items-center space-x-6">
                                <Link href="/" className="text-black font-semibold hover:text-orange-500 transition-colors">
                                    Home
                                </Link>
                                <Link href="/blog" className="text-black font-semibold hover:text-orange-500 transition-colors">
                                    Blog
                                </Link>
                                <a href="#categories" className="text-black font-semibold hover:text-orange-500 transition-colors">
                                    Categories
                                </a>
                                <a href="#about" className="text-black font-semibold hover:text-orange-500 transition-colors">
                                    About
                                </a>
                            </div>

                            <div className="hidden lg:block">
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search posts... 🔍"
                                        className="w-64 pl-4 pr-10 py-2 border-2 border-black rounded-full bg-white shadow-md focus:outline-none focus:shadow-lg transition-all"
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

                {/* Hero Section */}
                {featuredPost && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="text-center mb-8">
                            <h1 className="text-5xl md:text-7xl font-bold text-black mb-4">
                                Welcome to BlogTastic! ✨
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-700 font-medium">
                                Where creativity meets storytelling in the most colorful way! 🌈
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 border-2 border-black shadow-xl hover:-translate-x-2 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                             onClick={() => router.get(`/posts/${featuredPost.slug}`)}>
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="lg:w-1/2">
                                    <div className="relative overflow-hidden rounded-xl border-2 border-black shadow-lg">
                                        <img
                                            src={featuredPost.featured_image}
                                            alt={featuredPost.title}
                                            className="w-full h-64 object-cover"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-orange-400 px-3 py-1 rounded-full text-sm font-semibold text-black border-2 border-black shadow-md">
                                                ⭐ Featured
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 flex flex-col justify-center">
                                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 mb-6">
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <User className="w-4 h-4" />
                                            <span className="font-medium">{featuredPost.author.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(featuredPost.published_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <button className="px-6 py-3 rounded-full font-semibold text-black bg-orange-400 border-2 border-black hover:shadow-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 w-fit">
                                        Read Amazing Story! 🚀
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Latest Posts */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                            Latest Stories 📚
                        </h2>
                        <p className="text-xl text-gray-700 font-medium">
                            Fresh content served with a splash of creativity!
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestPosts.map((post) => (
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

                    <div className="text-center mt-12">
                        <Link href="/blog" className="px-6 py-3 rounded-full font-semibold text-black bg-sky-400 border-2 border-black hover:shadow-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 inline-flex items-center">
                            See All Stories! 🌟 <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </section>

                {/* Categories Section */}
                <section id="categories" className="bg-gradient-to-r from-purple-100 to-pink-100 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                                Explore Categories 🏷️
                            </h2>
                            <p className="text-xl text-gray-700 font-medium">
                                Find your favorite topics and dive deep into awesome content!
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/categories/${category.slug}`}
                                    className="inline-block px-4 py-4 rounded-full text-center font-semibold text-black border-2 border-black hover:shadow-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 block"
                                    style={{ backgroundColor: category.color }}
                                >
                                    <div className="font-bold">{category.name}</div>
                                    <div className="text-xs opacity-75 mt-1">
                                        {category.posts_count} posts
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer id="about" className="bg-black text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="bg-yellow-400 p-2 rounded-full border-2 border-white">
                                        <Star className="w-6 h-6 text-black" />
                                    </div>
                                    <span className="text-2xl font-bold">BlogTastic! 🎨</span>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    A colorful corner of the internet where creativity meets storytelling. 
                                    Join our community of passionate writers and readers! ✨
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-yellow-400">Quick Links 🚀</h3>
                                <ul className="space-y-2">
                                    <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                                    <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">All Posts</Link></li>
                                    <li><a href="#categories" className="text-gray-300 hover:text-white transition-colors">Categories</a></li>
                                    <li><Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-pink-400">Connect With Us 💫</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="bg-blue-500 p-2 rounded-full hover:scale-110 transition-transform">
                                        <span className="text-white">📘</span>
                                    </a>
                                    <a href="#" className="bg-pink-500 p-2 rounded-full hover:scale-110 transition-transform">
                                        <span className="text-white">📸</span>
                                    </a>
                                    <a href="#" className="bg-blue-400 p-2 rounded-full hover:scale-110 transition-transform">
                                        <span className="text-white">🐦</span>
                                    </a>
                                    <a href="#" className="bg-red-500 p-2 rounded-full hover:scale-110 transition-transform">
                                        <span className="text-white">📺</span>
                                    </a>
                                </div>
                                <p className="text-gray-300 mt-4 text-sm">
                                    Follow us for daily doses of creativity and inspiration! 🌟
                                </p>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                            <p className="text-gray-400">
                                Made with 💖 and lots of ☕ • © 2024 BlogTastic! All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}