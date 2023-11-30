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

    public function productOverview()
    {
        global $productType;
        $pizzas = $this->productModel->getPizzas();
        $drinks = $this->productModel->getDrinks();
        $snacks = $this->productModel->getSnacks();
        $ingredients = $this->ingredientModel->getIngredients();
        $stores = $this->storeModel->getStores();

        // Fetch image paths for pizzas
        foreach ($pizzas as $pizza) {
            // Access properties using -> instead of []
            $pizza->imagePath = $this->screenModel->getScreenImage($pizza->productId);
        }

        // Fetch image paths for drinks
        foreach ($drinks as $drink) {
            $drink->imagePath = $this->screenModel->getScreenImage($drink->productId);
        }
 
        // Fetch image paths for snacks
        foreach ($snacks as $snack) {
            $snack->imagePath = $this->screenModel->getScreenImage($snack->productId);
        }

        $data = [
            'title' => 'Pizza Overview',
            'pizzas' => $pizzas,
            'drinks' => $drinks,
            'snacks' => $snacks,
            'ingredients' => $ingredients,
            'productType' => $productType,
            'stores' => $stores
        ];

        $this->view('pizza/index', $data);
    }
}
