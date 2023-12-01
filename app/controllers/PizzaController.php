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

    public function overview($params = NULL)
    {
        global $productType;

        $ingredients = $this->ingredientModel->getIngredients();
        $stores = $this->storeModel->getStores();

        $typeFilter = isset($params['type']) ? $params['type'] : null;
        $selectedIngredients = isset($params['ingredients']) ? $params['ingredients'] : [];

        if ($typeFilter || $selectedIngredients) {

            if($selectedIngredients){
                $productsResult = $this->productModel->getProductByIngredient(['type' => $typeFilter, 'ingredients' => $selectedIngredients]);
            } elseif ($typeFilter) {
                $productsResult = $this->productModel->getProductByType(['type' => $typeFilter]);
            }

            // Group products by productId to eliminate duplicates
            $products = [];
            foreach ($productsResult as $product) {
                $productId = $product->productId;
                if (!isset($products[$productId])) {
                    $products[$productId] = $product;
                }
            }

            foreach ($products as $product) {
                $product->imagePath = $this->screenModel->getScreenImage($product->productId);
            }
        } else {
            $products = $this->productModel->getProducts();


            foreach ($products as $product) {
                $product->imagePath = $this->screenModel->getScreenImage($product->productId);
            }
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
