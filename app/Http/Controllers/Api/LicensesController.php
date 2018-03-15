<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\License;

class LicensesController extends Controller
{
    public function index(Request $request)
    {
        return License::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'get_at' => 'required|date_format:Ym',
        ]);
        License::create($validatedData);
        return redirect()->route('admin_licenses');
    }

    public function destroy(Request $request, $id)
    {
        $license = License::find($id);
        $license->delete();
        $data = [
            'status' => 200,
            'data' => [
                'id' => (int)$id,
            ],
        ];
        return response()->json($data);
    }
}
