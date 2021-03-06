<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class License extends Model
{
    protected $fillable = [
        'name',
        'get_at',
    ];

    protected $casts = [
        'get_at' => 'string',
    ];
}
