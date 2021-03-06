<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:api'])->group(
    function () {
        Route::post('/accounts', 'Api\AccountsController@store');
        Route::post('/services', 'Api\ServicesController@store');
        Route::post('/licenses', 'Api\LicensesController@store');
        Route::post('/skills', 'Api\SkillsController@store');
        Route::post('/skills/categories', 'Api\SkillCategoriesController@store');
        Route::post('/works', 'Api\WorksController@store');

        Route::delete('/accounts/{id}', 'Api\AccountsController@destroy');
        Route::delete('/services/{id}', 'Api\ServicesController@destroy');
        Route::delete('/licenses/{id}', 'Api\LicensesController@destroy');
        Route::delete('/skills/{id}', 'Api\SkillsController@destroy');
        Route::delete('/skills/categories/{id}', 'Api\SkillCategoriesController@destroy');
        Route::delete('/works/{id}', 'Api\WorksController@destroy');

        Route::patch('/accounts/{id}', 'Api\AccountsController@update');
        Route::patch('/accounts/{id}/visible', 'Api\AccountsController@visible');
        Route::patch('/accounts/{id}/invisible', 'Api\AccountsController@invisible');
        Route::patch('/user/introduction', 'Api\UserController@introductionUpdate');
    }
);

Route::get('/accounts', 'Api\AccountsController@index')->name('api.accounts');
Route::get('/services', 'Api\ServicesController@index')->name('api.services');
Route::get('/licenses', 'Api\LicensesController@index')->name('api.licenses');
Route::get('/skills', 'Api\SkillsController@index')->name('api.skills');
Route::get('/skills/categories', 'Api\SkillCategoriesController@index')->name('api.skill_categories');
Route::get('/works', 'Api\WorksController@index')->name('api.works');
Route::get('/tags', 'Api\TagsController@index')->name('api.tags');
Route::get('/user/introduction', 'Api\UserController@introduction');

Route::get('/works/{id}', 'Api\WorksController@show');
Route::get('/tags/{id}', 'Api\TagsController@show');

Route::get('/dev_ops/auto_deploy', 'Api\DevOps\AutoDeployController@index');
