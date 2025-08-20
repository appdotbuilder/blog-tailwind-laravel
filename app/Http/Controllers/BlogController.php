<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display the blog homepage.
     */
    public function index()
    {
        $featuredPost = Post::published()
            ->featured()
            ->with(['author', 'categories'])
            ->latest('published_at')
            ->first();

        $latestPosts = Post::published()
            ->with(['author', 'categories'])
            ->when($featuredPost, function ($query) use ($featuredPost) {
                return $query->where('id', '!=', $featuredPost->id);
            })
            ->latest('published_at')
            ->take(6)
            ->get();

        $categories = Category::withCount('posts')
            ->orderBy('name')
            ->get();

        return Inertia::render('blog/index', [
            'featuredPost' => $featuredPost,
            'latestPosts' => $latestPosts,
            'categories' => $categories,
        ]);
    }

    /**
     * Display the blog list page.
     */
    public function show()
    {
        $posts = Post::published()
            ->with(['author', 'categories'])
            ->latest('published_at')
            ->paginate(12);

        $categories = Category::withCount('posts')
            ->orderBy('name')
            ->get();

        return Inertia::render('blog/list', [
            'posts' => $posts,
            'categories' => $categories,
        ]);
    }
}