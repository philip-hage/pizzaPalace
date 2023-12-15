<?php
class Stores extends Controller
{
  private $storeModel;
  private $screenModel;

  public function __construct()
  {
    $this->storeModel = $this->model('StoreModel');
    $this->screenModel = $this->model('ScreenModel');
  }

  public function overview()
  {
    $stores = $this->storeModel->getStores();

    foreach ($stores as $store) {
      $store->imagePath = $this->screenModel->getScreenImage($store->storeId);
    }

    $data = [
      'title' => "Pizza Palace",
      'stores' => $stores
    ];
    $this->view('stores/overview', $data);
  }
}