<?php

// app/Http/Resources/SecurityDataResource.php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SecurityDataResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'description' => $this->description,
            'value' => $this->value,
            'severity' => $this->severity,
            'detected_at' => $this->detected_at,
            'status' => $this->status,
            'resolved_at' => $this->resolved_at,
            'assigned_to' => $this->assigned_to,
            'response_time' => $this->response_time,
            'threat_source' => $this->threat_source,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
