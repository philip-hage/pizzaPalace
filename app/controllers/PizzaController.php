<?php

use function PHPSTORM_META\map;

class PizzaController extends Controller
{
    private $productModel;
    private $screenModel;
    private $ingredientModel;
    private $storeModel;

    public function __construct()
    {
        $this->productModel = $this->model('ProductModel');
        $this->screenModel = $this->model('ScreenModel');
        $this->ingredientModel = $this->model('IngredientModel');
        $this->storeModel = $this->model('StoreModel');
    }

    public function index()
    {
        $data = [
            'title' => 'Pizza Palace'
        ];
        $this->view('pizza/index', $data);
    }

    public function productOverview($params = NULL)
    {
        // Helper::dump($params);exit;
        global $productType;

        $ingredients = $this->productModel->getProductByIngredient();
        $stores = $this->storeModel->getStores();

        $typeFilter = isset($params['type']) ? $params['type'] : null;

        $products = $this->productModel->getProductByType(['type' => $typeFilter]);

        foreach ($products as $product)
        {
            $product->imagePath = $this->screenModel->getScreenImage($product->productId);
        }

        $data = [
            'title' => 'Pizza Overview',
            'ingredients' => $ingredients,
            'productType' => $productType,
            'stores' => $stores,
            'products' => $products
        ];

        $this->view('pizza/index', $data);
    }
}
