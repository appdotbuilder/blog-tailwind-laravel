import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, MessageCircle, Heart, Star, ArrowLeft, Clock, Eye } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
}

interface Author {
    id: number;
    name: string;
    email: string;
}

interface Comment {
    id: number;
    author_name: string;
    author_email: string;
    content: string;
    created_at: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    published_at: string;
    author: Author;
    categories: Category[];
    comments: Comment[];
}

interface Props {
    post: Post;
    relatedPosts: Post[];
    [key: string]: unknown;
}

export default function BlogPost({ post, relatedPosts }: Props) {
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const formatContent = (content: string) => {
        // Simple markdown-like formatting
        return content
            .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-black mb-6 mt-8">$1</h1>')
            .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-black mb-4 mt-6">$2</h2>')
            .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-black mb-3 mt-5">$3</h3>')
            .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-gray-700">')
            .replace(/^(.+)$/gm, '<p class="mb-4 leading-relaxed text-gray-700">$1</p>')
            .replace(/<p class="mb-4 leading-relaxed text-gray-700"><h([123])/g, '<h$1')
            .replace(/h([123])><\/p>/g, 'h$1>');
    };

    return (
        <>
            <Head title={`${post.title} - BlogTastic!`} />
            
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
                                <Link href="/blog" className="px-6 py-3 rounded-full font-semibold text-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 bg-sky-400">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Blog
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Post Header */}
                    <header className="mb-12">
                        <div className="text-center mb-8">
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {post.categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/categories/${category.slug}`}
                                        className="category-tag"
                                        style={{ backgroundColor: category.color }}
                                    >
                                        #{category.name}
                                    </Link>
                                ))}
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
                                {post.title}
                            </h1>
                            
                            {/* Fun cartoon line accent */}
                            <div className="relative mb-8">
                                <div className="h-2 bg-gradient-to-r from-pink-400 via-yellow-400 to-mint-400 rounded-full mx-auto w-24"></div>
                                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-400 rounded-full border-2 border-black"></div>
                            </div>

                            <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto">
                                {post.excerpt}
                            </p>
                        </div>

                        {/* Author & Meta */}
                        <div className="bg-white rounded-xl p-6 card-shadow mx-auto max-w-2xl">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-full border-3 border-black flex items-center justify-center font-bold text-xl text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                        {getInitials(post.author.name)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-black">{post.author.name} ✍️</h3>
                                        <p className="text-gray-600 text-sm">Author & Creative Soul</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col sm:items-end space-y-2">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                            {new Date(post.published_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-3 h-3" />
                                            <span>5 min read</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Eye className="w-3 h-3" />
                                            <span>{Math.floor(Math.random() * 1000) + 100} views</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <div className="mb-12">
                        <div className="relative overflow-hidden rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-64 md:h-96 object-cover"
                            />
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="bg-white rounded-2xl p-8 md:p-12 card-shadow mb-12">
                        <div 
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                        />
                        
                        {/* Engagement Actions */}
                        <div className="border-t-4 border-dashed border-gray-200 pt-8 mt-12">
                            <div className="flex flex-wrap justify-center gap-4">
                                <button className="btn-pink flex items-center">
                                    <Heart className="w-4 h-4 mr-2" />
                                    Love it! ({Math.floor(Math.random() * 50) + 20})
                                </button>
                                <button className="btn-sky flex items-center">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Comment ({post.comments.length})
                                </button>
                                <button className="btn-yellow flex items-center">
                                    📤 Share
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <section className="bg-white rounded-2xl p-8 card-shadow mb-12">
                        <h3 className="text-3xl font-bold text-black mb-8 flex items-center">
                            <MessageCircle className="w-8 h-8 mr-3 text-pink-500" />
                            Comments 💬 ({post.comments.length})
                        </h3>

                        {post.comments.length > 0 ? (
                            <div className="space-y-6">
                                {post.comments.slice(0, 5).map((comment) => (
                                    <div key={comment.id} className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-purple-400 rounded-full border-2 border-black flex items-center justify-center font-bold text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                {getInitials(comment.author_name)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h4 className="font-bold text-black">{comment.author_name}</h4>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(comment.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">💭</div>
                                <p className="text-xl text-gray-600 font-medium">Be the first to share your thoughts!</p>
                                <p className="text-gray-500 mt-2">Start a conversation and let's make this post even more amazing!</p>
                            </div>
                        )}

                        {/* Comment Form */}
                        <div className="mt-8 pt-8 border-t-4 border-dashed border-gray-200">
                            <h4 className="text-xl font-bold text-black mb-4">Leave a comment! 📝</h4>
                            <div className="bg-gradient-to-r from-mint-50 to-sky-50 rounded-xl p-6 border-2 border-black">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Your awesome name 😊"
                                        className="px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                                    />
                                    <input
                                        type="email"
                                        placeholder="your@email.com 📧"
                                        className="px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                                    />
                                </div>
                                <textarea
                                    rows={4}
                                    placeholder="Share your thoughts, questions, or just say hello! 💭"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all mb-4"
                                />
                                <button className="btn-mint">
                                    Post Comment! 🚀
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section>
                            <h3 className="text-3xl font-bold text-black mb-8 text-center">
                                You might also love these! 💖
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <article 
                                        key={relatedPost.id} 
                                        className="blog-card cursor-pointer"
                                        onClick={() => router.get(`/posts/${relatedPost.slug}`)}
                                    >
                                        <div className="relative overflow-hidden rounded-lg border-2 border-black mb-4">
                                            <img
                                                src={relatedPost.featured_image}
                                                alt={relatedPost.title}
                                                className="w-full h-32 object-cover hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap gap-1">
                                                {relatedPost.categories.slice(0, 1).map((category) => (
                                                    <span
                                                        key={category.id}
                                                        className="category-tag text-xs"
                                                        style={{ backgroundColor: category.color }}
                                                    >
                                                        #{category.name}
                                                    </span>
                                                ))}
                                            </div>
                                            <h4 className="text-lg font-bold text-black line-clamp-2 hover:text-orange-500 transition-colors">
                                                {relatedPost.title}
                                            </h4>
                                            <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}
                </article>
            </div>
        </>
    );
}