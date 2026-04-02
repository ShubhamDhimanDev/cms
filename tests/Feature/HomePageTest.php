<?php

use Inertia\Testing\AssertableInertia;

it('renders the public home page', function () {
    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page
            ->component('welcome')
            ->where('canRegister', true)
        );
});
