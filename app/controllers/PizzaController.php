<?php 


class PizzaController extends Controller
{
    private $pizzaModel;

    public function __construct()
    {
        $this->pizzaModel = $this->model('PizzaModel');
    }

    public function productOverview()
    {
        $pizzas = $this->pizzaModel->getPizzas();
        $drinks = $this->pizzaModel->getDrinks();
        $snacks = $this->pizzaModel->getSnacks();
        $promotions = $this->pizzaModel->getPromotions();
        $data = [
            'title' => 'Pizza Overview',
            'pizzas' => $pizzas,
            'drinks' => $drinks,
            'snacks' => $snacks,
            'promotions' => $promotions
        ];
        $this->view('pizza/index', $data);
    }

    
}
