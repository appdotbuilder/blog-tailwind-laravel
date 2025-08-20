<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display the specified post.
     */
    public function show(Post $post)
    {
        // Only show published posts
        if ($post->status !== 'published') {
            abort(404);
        }

        $post->load([
            'author',
            'categories',
            'comments' => function ($query) {
                $query->approved()->latest();
            }
        ]);

        // Get related posts
        $relatedPosts = Post::published()
            ->whereHas('categories', function ($query) use ($post) {
                $query->whereIn('categories.id', $post->categories->pluck('id'));
            })
            ->where('id', '!=', $post->id)
            ->with(['author', 'categories'])
            ->inRandomOrder()
            ->take(3)
            ->get();

        return Inertia::render('blog/post', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}