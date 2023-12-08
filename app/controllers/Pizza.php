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

        $promos = $this->promotionModel->getPromotions();
        $stores = $this->storeModel->getStores();
        $reviews = $this->productModel->getReviews();
        $ingredients = $this->ingredientModel->getIngredients();

        $typeFilter = $params['type'] ?? null;
        $selectedIngredients = $params['ingredients'] ?? [];
        $rating = $params['rating'] ?? null;
        $searchProduct = $params['search'] ?? null;
        $priceMin = $params['pricemin'] ?? null;
        $priceMax = $params['pricemax'] ?? null;

        $pageNumber = isset($params['page']) ? intval($params['page']) : 1;

        $recordsPerPage = 6; // You want to display 4 products per page
        $offset = ($pageNumber - 1) * $recordsPerPage;

        $productsResult = $this->productModel->getHomePageProducts($params, $offset, $recordsPerPage);
        $totalProducts = count($this->productModel->getHomePageProducts($params));

        $totalPages = ceil($totalProducts / $recordsPerPage);
        $pageNumber = max(1, min($pageNumber, $totalPages));

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
                }
            }
        }

        foreach ($products as $product) {
            $product->imagePath = $this->screenModel->getScreenImage($product->productId);
        }

        foreach ($promos as $promotion) {
            $promotion->imagePath = $this->screenModel->getScreenImage($promotion->promotionId);
        }

        foreach ($reviews as $review) {
            $review->imagePath = $this->screenModel->getScreenImage($review->reviewId);
        }

        $nextPage = $pageNumber < $totalPages ? $pageNumber + 1 : null;
        $prevPage = $pageNumber > 1 ? $pageNumber - 1 : null;
        $numberButtons = [];
        for ($i = 1; $i <= $totalPages; $i++) {
            $numberButtons[] = $i;
        }

        $paginationButtons = [
            'nextPage' => $nextPage,
            'prevPage' => $prevPage,
            'numberButtons' => $numberButtons
        ];

        $urlQuery = [];

        foreach ($paginationButtons as $buttonName => $buttonValue) {
            if (is_array($buttonValue)) {
                foreach ($buttonValue as $numberButton) {
                    $urlQuery[$buttonName][$numberButton] = URLROOT . "pizza/overview/{page:" . $numberButton . ";";

                    // Iterate through each key-value pair
                    foreach ($params as $key => $value) {
                        if ($key !== 'page') {
                            // Check if the key is "ingredients"
                            if (is_array($value)) {
                                // If the key is "ingredients" and the value is an array, format it as "key[value1,value2];"
                                $urlQuery[$buttonName][$numberButton] .= $key . ':[' . implode(',', $value) . '];';
                            } else {
                                // If the key is not "ingredients" or the value is not an array, append key and value to the URL format
                                $urlQuery[$buttonName][$numberButton] .= $key . ':' . $value . ';';
                            }
                        }
                    }
                    $urlQuery[$buttonName][$numberButton] .= "}";
                }
            } else {
                $urlQuery[$buttonName] = URLROOT . "pizza/overview/{page:" . $buttonValue . ";";

                // Iterate through each key-value pair
                foreach ($params as $key => $value) {
                    if ($key !== 'page') {
                        // Check if the key is "ingredients"
                        if (is_array($value)) {
                            // If the key is "ingredients" and the value is an array, format it as "key[value1,value2];"
                            $urlQuery[$buttonName] .= $key . ':[' . implode(',', $value) . '];';
                        } else {
                            // If the key is not "ingredients" or the value is not an array, append key and value to the URL format
                            $urlQuery[$buttonName] .= $key . ':' . $value . ';';
                        }
                    }
                }
                $urlQuery[$buttonName] .= "}";
            }
        }

        // Helper::dump($urlQuery); exit;

        $data = [
            'title' => "pizza Palace",
            'promos' => $promos,
            'ingredients' => $ingredients,
            'productType' => $productType,
            'stores' => $stores,
            'products' => $products,
            'reviews' => $reviews,
            'params' => $params,
            'currentPage' => $pageNumber,
            'totalPages' => $totalPages,
            'totalProducts' => $totalProducts,
            'urlQuery' => $urlQuery,
        ];

        $this->view('pizza/index', $data);
    }
}
