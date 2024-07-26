<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\SecurityData;
use App\Http\Requests\SecurityDataStoreRequest;
use App\Http\Requests\SecurityDataUpdateRequest;
use App\Http\Resources\SecurityDataResource;

class SecurityDataController extends Controller
{
    public function index()
    {
        return SecurityDataResource::collection(SecurityData::orderBy('created_at', 'desc')->paginate(20));
    }

    public function store(SecurityDataStoreRequest $request)
    {
        $data = SecurityData::create($request->all());
        return new SecurityDataResource($data);
    }

    public function show($id)
    {
        $data = SecurityData::findOrFail($id);
        return new SecurityDataResource($data);
    }

    public function update(SecurityDataUpdateRequest $request, $id)
    {
        $data = SecurityData::findOrFail($id);
        $data->update($request->all());
        return new SecurityDataResource($data);
    }

    public function destroy($id)
    {
        $data = SecurityData::findOrFail($id);
        $data->delete();
        return response()->json(null, 204);
    }
}

