<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecurityData extends Model
{
    use HasFactory;
    protected $fillable = [
        'type',
        'description',
        'value',
        'severity',
        'detected_at',
        'status',
        'resolved_at',
        'assigned_to',
        'response_time',
        'threat_source'
    ];
}
