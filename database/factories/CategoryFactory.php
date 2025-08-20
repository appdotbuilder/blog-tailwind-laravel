<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->randomElement([
            'Technology', 'Web Development', 'Design', 'JavaScript', 
            'PHP', 'Laravel', 'React', 'Vue.js', 'CSS', 'HTML',
            'Mobile Apps', 'iOS', 'Android', 'Python', 'Data Science',
            'Machine Learning', 'AI', 'DevOps', 'Cloud', 'Security'
        ]);

        $colors = [
            '#34d399', // mint
            '#60a5fa', // sky blue
            '#fb923c', // orange
            '#fbbf24', // yellow
            '#f472b6', // pink
            '#a78bfa', // purple
            '#4ade80', // green
            '#f87171', // red
        ];

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->faker->sentence(10),
            'color' => $this->faker->randomElement($colors),
        ];
    }
}