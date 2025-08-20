<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(random_int(4, 8));
        $publishedAt = $this->faker->dateTimeBetween('-6 months', 'now');

        return [
            'title' => rtrim($title, '.'),
            'slug' => Str::slug($title),
            'excerpt' => $this->faker->paragraph(2),
            'content' => $this->generateBlogContent(),
            'featured_image' => 'https://picsum.photos/800/400?random=' . $this->faker->numberBetween(1, 1000),
            'status' => 'published',
            'is_featured' => $this->faker->boolean(20), // 20% chance of being featured
            'published_at' => $publishedAt,
            'user_id' => User::factory(),
        ];
    }

    /**
     * Generate realistic blog content.
     *
     * @return string
     */
    public function generateBlogContent(): string
    {
        $paragraphs = [];
        $paragraphCount = random_int(8, 15);

        for ($i = 0; $i < $paragraphCount; $i++) {
            if ($i === 0) {
                // First paragraph - introduction
                $paragraphs[] = "# Introduction\n\n" . $this->faker->paragraph(4);
            } elseif ($i === $paragraphCount - 1) {
                // Last paragraph - conclusion
                $paragraphs[] = "# Conclusion\n\n" . $this->faker->paragraph(3);
            } elseif ($i % 4 === 0) {
                // Add headings every 4 paragraphs
                $heading = $this->faker->sentence(3);
                $paragraphs[] = "## " . rtrim($heading, '.') . "\n\n" . $this->faker->paragraph(4);
            } else {
                $paragraphs[] = $this->faker->paragraph(random_int(3, 6));
            }
        }

        return implode("\n\n", $paragraphs);
    }

    /**
     * Indicate that the post is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    /**
     * Indicate that the post is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }
}