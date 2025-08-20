<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display posts for the specified category.
     */
    public function show(Category $category)
    {
        $posts = $category->posts()
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->with(['author', 'categories'])
            ->latest('published_at')
            ->paginate(12);

        $allCategories = Category::withCount('posts')
            ->orderBy('name')
            ->get();

        return Inertia::render('blog/category', [
            'category' => $category,
            'posts' => $posts,
            'categories' => $allCategories,
        ]);
    }
}