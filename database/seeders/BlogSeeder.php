<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a main author
        $author = User::factory()->create([
            'name' => 'Alex Chen',
            'email' => 'alex@example.com',
        ]);

        // Create additional authors
        $additionalAuthors = User::factory(4)->create();
        $allAuthors = collect([$author])->merge($additionalAuthors);

        // Create categories
        $categories = Category::factory(12)->create();

        // Create posts
        $posts = Post::factory(25)->create([
            'user_id' => fn() => $allAuthors->random()->id,
        ]);

        // Make sure we have at least one featured post
        $posts->first()->update(['is_featured' => true]);

        // Assign categories to posts (many-to-many relationship)
        $posts->each(function ($post) use ($categories) {
            $randomCategories = $categories->random(random_int(1, 3));
            $post->categories()->attach($randomCategories->pluck('id'));
        });

        // Create comments for posts
        $posts->each(function ($post) {
            $commentCount = random_int(0, 8);
            Comment::factory($commentCount)->create([
                'post_id' => $post->id,
            ]);
        });
    }
}