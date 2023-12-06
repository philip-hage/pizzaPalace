<?php

class Pizza extends Controller
{
    private $productModel;
    private $screenModel;
    private $ingredientModel;
    private $storeModel;
    private $promotionModel;

    public function __construct()
    {
        $this->productModel = $this->model('ProductModel');
        $this->screenModel = $this->model('ScreenModel');
        $this->ingredientModel = $this->model('IngredientModel');
        $this->storeModel = $this->model('StoreModel');
        $this->promotionModel = $this->model('PromotionModel');
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
        $promotions = $this->promotionModel->getPromotions();

        foreach ($promotions as $promotion) {
            $promotion->imagePath = $this->screenModel->getScreenImage($promotion->promotionId);
        }

        $typeFilter = isset($params['type']) ? $params['type'] : null;
        $selectedIngredients = isset($params['ingredients']) ? $params['ingredients'] : [];
        $rating = isset($params['rating']) ? $params['rating'] : null;
        $searchProduct = isset($params['search']) ? $params['search'] : null;
        $priceMin = isset($params['pricemin']) ? $params['pricemin'] : null;
        $priceMax = isset($params['pricemax']) ? $params['pricemax'] : null;

        if ($typeFilter || $selectedIngredients || $rating || $searchProduct || $priceMin) {

            // Initialize an empty array to store filter conditions
            $filterConditions = [];

            if ($typeFilter) {
                $filterConditions['type'] = $typeFilter;
            } else {
                $productsResult = $this->productModel->getProducts();
            }

            if ($selectedIngredients) {
                $filterConditions['ingredients'] = $selectedIngredients;
            } else {
                $productsResult = $this->productModel->getProducts();
            }

            if ($rating) {
                $filterConditions['rating'] = $rating;
            } else {
                $productsResult = $this->productModel->getProducts();
            }

            if ($priceMin) {
                $filterConditions['price'] = ['min' => $priceMin, 'max' => $priceMax];
            } else {
                $productsResult = $this->productModel->getProducts();
            }

            if ($searchProduct) {
                $productsResult = $this->productModel->getProductBySearch(['search' => $searchProduct]);
            } else {
                $productsResult = $this->productModel->getProductsByFilters($filterConditions);
            }

            // Group products by productId to eliminate duplicates
            $products = [];
            foreach ($productsResult as $product) {
                $productId = $product->productId;
                if (!isset($products[$productId])) {
                    $products[$productId] = $product;
                    if ($rating) {
                        $ratings = $this->productModel->getReviewByProduct($productId);
                        $totalRatings = count($ratings);
                        $productRating = 0;

                        if ($totalRatings > 0) {
                            foreach ($ratings as $review) {
                                $productRating = $productRating + $review->reviewRating;
                            }
                            $finalProductRating = (int)round($productRating / $totalRatings);
                        } else {
                            // Handle the case where there are no ratings (avoid division by zero)
                            $finalProductRating = 0; // You can set a default value or handle it accordingly
                        }
                        if ($finalProductRating >= $rating) {
                            $products[$productId]->productRating = $finalProductRating;
                        } else {
                            unset($products[$productId]);
                        }
                        // Helper::dump($rating);exit;
                    }
                }
            }

            foreach ($products as $product) {
                $product->imagePath = $this->screenModel->getScreenImage($product->productId);
            }
        } else {
            // Extract page number from $params
            $pageNumber = isset($params['page']) ? intval($params['page']) : 1;

            // Define records per page and calculate offset
            $recordsPerPage = 4; // You can adjust this based on your needs
            $offset = ($pageNumber - 1) * $recordsPerPage;

            $products = $this->productModel->getProductsByPagination($offset, $recordsPerPage);

            $countProducts = $this->productModel->getTotalProductCount();

            // Calculate total number of pages
            $totalPages = ceil($countProducts / $recordsPerPage);

            // Ensure $pageNumber is within valid range
            $pageNumber = max(1, min($pageNumber, $totalPages));

            // $products = $this->productModel->getProducts();

            foreach ($products as $product) {
                $product->imagePath = $this->screenModel->getScreenImage($product->productId);
            }
        }

        $data = [
            'title' => 'Pizza Overview',
            'ingredients' => $ingredients,
            'productType' => $productType,
            'stores' => $stores,
            'products' => $products,
            'promotions' => $promotions,
            'priceMin' => $priceMin,
            'priceMax' => $priceMax,
            'params' => $params,
            'pageNumber' => $pageNumber,
            'recordsPerPage' => $recordsPerPage,
            'totalPages' => $totalPages,
            'countProducts' => $countProducts,
        ];

        $this->view('pizza/index', $data);
    }
}
