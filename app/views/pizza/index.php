<?php require APPROOT . '/views/includes/head.php'; ?>

<!-- Nav Bar -->
<header class="header position-sticky top-0 js-header" id="navbar">
    <div class="header__container container max-width-lg">
        <div class="header__logo">
            <a href="">
                <img class="logo-image" src="<?= URLROOT ?>public/img/logo.png" alt="Your Logo">
            </a>
        </div>

        <button class="btn btn--subtle header__trigger js-header__trigger" aria-label="Toggle menu" aria-expanded="false" aria-controls="header-nav">
            <i class="header__trigger-icon" aria-hidden="true"></i>
            <span>Menu</span>
        </button>

        <nav style="display: flex;" class="header__nav js-header__nav" id="header-nav" role="navigation" aria-label="Main">
            <div class="grid gap-sm">
                <div class="header__nav-inner col-6@sm">
                    <div class="header__label">Main menu</div>
                    <ul class="header__list">
                        <button class="btn btn--primary header__nav-btn" aria-controls="drawer-cart-id">Show Cart</button>
                    </ul>
                </div>

                <button class="reset user-menu-control col-6@sm" aria-controls="user-menu" aria-label="Toggle user menu">
                    <figure class="user-menu-control__img-wrapper radius-50%">
                        <img class="user-menu-control__img" src="<?= URLROOT ?>public/img/businesscostumemalemanofficeusericon-1320196264882354682.png" alt="User picture">
                    </figure>

                    <svg class="icon icon--xxs margin-left-xxs" aria-hidden="true" viewBox="0 0 12 12">
                        <polyline points="1 4 6 9 11 4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </svg>
                </button>

                <menu id="user-menu" class="menu js-menu">
                    <li role="menuitem">
                        <a class="menu__content js-menu__content" href="#0">
                            <svg class="icon menu__icon" aria-hidden="true" viewBox="0 0 16 16">
                                <circle cx="8" cy="3.5" r="3.5" />
                                <path d="M14.747,14.15a6.995,6.995,0,0,0-13.494,0A1.428,1.428,0,0,0,1.5,15.4a1.531,1.531,0,0,0,1.209.6H13.288a1.531,1.531,0,0,0,1.209-.6A1.428,1.428,0,0,0,14.747,14.15Z" />
                            </svg>
                            <span>Profile</span>
                        </a>
                    </li>
                    <li class="menu__separator" role="separator"></li>

                    <li role="menuitem">
                        <a class="menu__content js-menu__content" href="#0">Logout</a>
                    </li>
                </menu>
            </div>
        </nav>
    </div>
</header>

<!-- Toast Notifications -->
<div class="toast toast--hidden toast--top-left js-toast" role="alert" aria-live="assertive" aria-atomic="true" id="toast-1">
    <div class="flex items-start justify-between">
        <div class="toast__icon-wrapper toast__icon-wrapper--success margin-right-xs">
            <svg class="icon" viewBox="0 0 16 16">
                <title>Success</title>
                <g>
                    <path d="M6,15a1,1,0,0,1-.707-.293l-5-5A1,1,0,1,1,1.707,8.293L5.86,12.445,14.178.431a1,1,0,1,1,1.644,1.138l-9,13A1,1,0,0,1,6.09,15C6.06,15,6.03,15,6,15Z"></path>
                </g>
            </svg>
        </div>

        <div class="text-component text-sm">
            <h1 class="toast__title text-md">Thank you</h1>
            <p class="toast__p">Je moeder paste niet in de cart.</p>
        </div>

        <button class="reset toast__close-btn margin-left-xxxxs js-toast__close-btn js-tab-focus">
            <svg class="icon" viewBox="0 0 12 12">
                <title>Close notification</title>
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <line x1="1" y1="1" x2="11" y2="11" />
                    <line x1="11" y1="1" x2="1" y2="11" />
                </g>
            </svg>
        </button>
    </div>
</div>


<!-- filter on the left side -->
<section class="adv-filter padding-y-lg js-adv-filter">
    <div class="container max-width-adaptive-lg">
        <div class="margin-bottom-md hide@md no-js:is-hidden">
            <button class="btn btn--subtle width-100%" aria-controls="filter-panel">Show filters</button>
        </div>

        <div class="flex@md">
            <aside id="filter-panel" class="sidebar sidebar--static@md js-sidebar" aria-labelledby="filter-panel-title">
                <div class="sidebar__panel max-width-100% width-100%">
                    <header class="sidebar__header bg padding-y-sm padding-x-md border-bottom z-index-2">
                        <h1 class="text-md text-truncate" id="filter-panel-title">Filters</h1>

                        <button class="reset sidebar__close-btn js-sidebar__close-btn js-tab-focus">
                            <svg class="icon icon--xs" viewBox="0 0 16 16">
                                <title>Close panel</title>
                                <g stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
                                    <line x1="13.5" y1="2.5" x2="2.5" y2="13.5"></line>
                                    <line x1="2.5" y1="2.5" x2="13.5" y2="13.5"></line>
                                </g>
                            </svg>
                        </button>
                    </header>

                    <!-- <form id="filter-form" class="position-relative z-index-1 js-adv-filter__form" action="" method="get"> -->
                    <form>
                        <div class="padding-md padding-0@md margin-bottom-sm@md">
                            <a href="<?= URLROOT ?>pizzacontroller/productoverview/" class="reset text-sm color-contrast-high text-underline cursor-pointer margin-bottom-sm text-xs@md js-adv-filter__reset js-tab-focus" type="reset">Reset all filters</a>

                            <div class="search-input search-input--icon-left text-sm@md">
                                <input class="search-input__input form-control" type="search" name="search-products" id="search-products" placeholder="Try category 1..." aria-label="Search" data-filter="searchInput" aria-controls="adv-filter-gallery">

                                <button class="search-input__btn">
                                    <svg class="icon" viewBox="0 0 20 20">
                                        <title>Submit</title>
                                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                            <circle cx="8" cy="8" r="6" />
                                            <line x1="12.242" y1="12.242" x2="18" y2="18" />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <ul class="accordion js-accordion" data-animation="on" data-multi-items="on">
                            <li class="accordion__item accordion__item--is-open js-accordion__item js-adv-filter__item" data-default-text="All" data-multi-select-text="{n} filters selected">
                                <button class="reset accordion__header padding-y-sm padding-x-md padding-x-xs@md js-tab-focus" type="button">
                                    <div>
                                        <div class="text-sm@md">Ingredients</div>
                                        <div class="text-sm color-contrast-low"><i class="sr-only">Active filters: </i><span class="js-adv-filter__selection">All</span></div>
                                    </div>

                                    <svg class="icon accordion__icon-arrow-v2 no-js:is-hidden" viewBox="0 0 20 20">
                                        <g class="icon__group" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                                            <line x1="3" y1="3" x2="17" y2="17" />
                                            <line x1="17" y1="3" x2="3" y2="17" />
                                        </g>
                                    </svg>
                                </button>


                                <div class="accordion__panel js-accordion__panel">
                                    <div class="padding-top-xxxs padding-x-md padding-bottom-md padding-x-xs@md">
                                        <!-- 👆 aria-controls -> filter plugin -->
                                        <!-- 👆 data-btn-labels, data-ellipsis, data-btn-class -> read more component -->
                                        <?php foreach ($data['ingredients'] as $ingredient) : ?>
                                            <div>
                                                <input class="checkbox" name="ingredients" type="checkbox" id="checkbox-<?= $ingredient->ingredientId ?>" value="<?= $ingredient->ingredientId?>" data-filter="<?= $ingredient->ingredientId ?>">
                                                <label for="checkbox-<?= $ingredient->ingredientId ?>"><?= $ingredient->ingredientName ?></label>
                                            </div>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                            </li>

                            <li class="accordion__item js-accordion__item js-adv-filter__item" data-default-text="All">
                                <button class="reset accordion__header padding-y-sm padding-x-md padding-x-xs@md js-tab-focus" type="button">
                                    <div>
                                        <div class="text-sm@md">Products</div>
                                        <div class="text-sm color-contrast-low"><i class="sr-only">Active filters: </i><span class="js-adv-filter__selection">All</span></div>
                                    </div>

                                    <svg class="icon accordion__icon-arrow-v2 no-js:is-hidden" viewBox="0 0 20 20">
                                        <g class="icon__group" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                                            <line x1="3" y1="3" x2="17" y2="17" />
                                            <line x1="17" y1="3" x2="3" y2="17" />
                                        </g>
                                    </svg>
                                </button>

                                <div class="accordion__panel js-accordion__panel">
                                    <div class="padding-top-xxxs padding-x-md padding-bottom-md padding-x-xs@md">
                                        <ul class="adv-filter__radio-list flex flex-column gap-xxxs" aria-controls="adv-filter-gallery">
                                            <li>
                                                <input class="radio" type="radio" name="type" id="radio-all" data-filter="*" checked>
                                                <label for="radio-all">All</label>
                                            </li>
                                            <?php foreach ($data['productType'] as $key => $value) : ?>
                                                <li>
                                                    <input class="radio" type="radio" name="type" id="radio-<?= $key ?>" data-filter="<?= $key ?>" value="<?= $key ?>">
                                                    <label for="radio-<?= $key ?>"><?= $value ?></label>
                                                </li>
                                            <?php endforeach; ?>
                                        </ul>
                                    </div>
                                </div>
                            </li>

                            <li class="accordion__item accordion__item--is-open js-accordion__item js-adv-filter__item" data-number-format="${n}">
                                <button class="reset accordion__header padding-y-sm padding-x-md padding-x-xs@md js-tab-focus" type="button">
                                    <div>
                                        <div class="text-sm@md">Price</div>
                                        <div class="text-sm color-contrast-low"><i class="sr-only">Active filters: </i><span class="js-adv-filter__selection">$0 - $100</span></div>
                                    </div>

                                    <svg class="icon accordion__icon-arrow-v2 no-js:is-hidden" viewBox="0 0 20 20">
                                        <g class="icon__group" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                                            <line x1="3" y1="3" x2="17" y2="17" />
                                            <line x1="17" y1="3" x2="3" y2="17" />
                                        </g>
                                    </svg>
                                </button>

                                <div class="accordion__panel js-accordion__panel">
                                    <div class="padding-top-xxxs padding-x-md padding-bottom-md padding-x-xs@md flex justify-center">
                                        <div class="slider slider--multi-value js-slider js-filter__custom-control" aria-controls="adv-filter-gallery" data-filter="priceRange">
                                            <div class="slider__range">
                                                <label class="sr-only" for="slider-min-value">Slider min value</label>
                                                <input class="slider__input" type="range" id="slider-min-value" name="slider-min-value" min="0" max="100" step="1" value="0">
                                            </div>

                                            <div class="slider__range">
                                                <label class="sr-only" for="slider-max-value">Slider max value</label>
                                                <input class="slider__input" type="range" id="slider-max-value" name="slider-max-value" min="0" max="100" step="1" value="100">
                                            </div>

                                            <div class="margin-top-xs text-center text-sm" aria-hidden="true">
                                                <span class="slider__value">$<span class="js-slider__value">0</span> - $<span class="js-slider__value">100</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li class="accordion__item js-accordion__item js-adv-filter__item" data-default-text="All" data-multi-select-text="{n} filters selected" data-number-format="{n}">
                                <button class="reset accordion__header padding-y-sm padding-x-md padding-x-xs@md js-tab-focus" type="button">
                                    <div>
                                        <div class="text-sm@md">Rating</div>
                                        <div class="text-sm color-contrast-low"><i class="sr-only">Active filters: </i><span class="js-adv-filter__selection">all</span></div>
                                    </div>

                                    <svg class="icon accordion__icon-arrow-v2 no-js:is-hidden" viewBox="0 0 20 20">
                                        <g class="icon__group" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                                            <line x1="3" y1="3" x2="17" y2="17" />
                                            <line x1="17" y1="3" x2="3" y2="17" />
                                        </g>
                                    </svg>
                                </button>

                                <div class="accordion__panel js-accordion__panel">
                                    <div class="padding-top-xxxs padding-x-md padding-bottom-md padding-x-xs@md">
                                        <div class="flex justify-between items-center">
                                            <label class="text-sm" for="index-value">Quantity</label>

                                            <div class="number-input number-input--v2 js-number-input js-filter__custom-control" aria-controls="adv-filter-gallery" data-filter="indexValue">
                                                <input class="form-control text-sm@md js-number-input__value" type="number" name="index-value" id="index-value" min="1" max="5" step="1" value="1">

                                                <button class="reset number-input__btn number-input__btn--plus js-number-input__btn" aria-label="Increase Number">
                                                    <svg class="icon" viewBox="0 0 12 12" aria-hidden="true">
                                                        <path d="M11,5H7V1A1,1,0,0,0,5,1V5H1A1,1,0,0,0,1,7H5v4a1,1,0,0,0,2,0V7h4a1,1,0,0,0,0-2Z" />
                                                    </svg>
                                                </button>

                                                <button class="reset number-input__btn number-input__btn--minus js-number-input__btn" aria-label="Decrease Number">
                                                    <svg class="icon" viewBox="0 0 12 12" aria-hidden="true">
                                                        <path d="M11,7H1A1,1,0,0,1,1,5H11a1,1,0,0,1,0,2Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li class="accordion__item accordion__item--is-open position-relative z-index-2 js-accordion__item js-adv-filter__item">
                                <button class="reset accordion__header padding-y-sm padding-x-md padding-x-xs@md js-tab-focus" type="button">
                                    <div>
                                        <div class="text-sm@md">Store</div>
                                        <div class="text-sm color-contrast-low"><i class="sr-only">Active filters: </i><span class="js-adv-filter__selection">All</span></div>
                                    </div>

                                    <svg class="icon accordion__icon-arrow-v2 no-js:is-hidden" viewBox="0 0 20 20">
                                        <g class="icon__group" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                                            <line x1="3" y1="3" x2="17" y2="17" />
                                            <line x1="17" y1="3" x2="3" y2="17" />
                                        </g>
                                    </svg>
                                </button>

                                <div class="accordion__panel js-accordion__panel">
                                    <div class="padding-top-xxxs padding-x-md padding-bottom-md padding-x-xs@md flex">
                                        <label class="sr-only" for="select-filter-option">Select Store:</label>

                                        <div class="select width-100% js-select" data-trigger-class="btn btn--subtle flex-grow">
                                            <!-- data-trigger-class -> custom select component 👆 -->
                                            <select name="select-filter-option" id="select-filter-option" aria-controls="adv-filter-gallery" data-filter="true">
                                                <option value="*" selected>All</option>
                                                <?php foreach ($data['stores'] as $store) : ?>
                                                    <option value="<?= $store->storeId ?>"><?= $store->storeName ?></option>
                                                <?php endforeach; ?>
                                            </select>

                                            <svg class="icon icon--xxs margin-left-xxs" aria-hidden="true" viewBox="0 0 12 12">
                                                <path d="M10.947,3.276A.5.5,0,0,0,10.5,3h-9a.5.5,0,0,0-.4.8l4.5,6a.5.5,0,0,0,.8,0l4.5-6A.5.5,0,0,0,10.947,3.276Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button type="submit" class="btn btn--primary text-sm width-100%">Apply Filters</button>
                    </form>
                </div>
            </aside>

            <main class="flex-grow padding-left-xl@md sidebar-loaded:show">
                <div class="flex items-center justify-between margin-bottom-sm">
                    <p class="text-sm"><span class="js-adv-filter__results-count"></span> results</p>
                </div>

                <div>
                    <ul class="grid gap-sm js-adv-filter__gallery" id="adv-filter-gallery">
                        <?php foreach ($data['products'] as $product) : ?>
                            <li class="col-4@xs flex flex-center padding-sm">
                                <div class="card">
                                    <figure class="card__img-wrapper">
                                        <?php if ($product->imagePath) : ?>
                                            <img src="<?= $product->imagePath ?>" alt="<?= $product->productName ?> Image">
                                        <?php else : ?>
                                            <!-- Add a default image or placeholder if the imagePath is not available -->
                                            <img src="<?= URLROOT . '/path/to/default/image.jpg' ?>" alt="Default Image">
                                        <?php endif; ?>
                                    </figure>
                                    <div class="padding-xs">
                                        <h3 class="margin-top-xs margin-bottom-sm text-sm color-contrast-medium line-height-md"><?= $product->productName ?></h3>
                                        <div class="margin-top-xs">
                                            <span class="prod-card__price">€<?= $product->productPrice ?></span>
                                        </div>
                                        <button class="btn btn--primary text-sm width-100% addToCartBtn">Add To Cart</button>
                                        <input type="hidden" class="productId" value="<?= $product->productId ?>">
                                        <input type="hidden" class="productName" value="<?= $product->productName ?>">
                                        <input type="hidden" class="productPrice" value="<?= $product->productPrice ?>">
                                        <input type="hidden" class="imagePath" value="<?= $product->imagePath ?>">
                                    </div>
                                </div>
                            </li>
                        <?php endforeach; ?>
                    </ul>

                    <div class="margin-top-md" data-fallback-gallery-id="adv-filter-gallery">
                        <p class="color-contrast-medium text-center">No results</p>
                    </div>
                </div>
            </main>
        </div>
    </div>
</section>

<!-- Basket -->
<div class="drawer dr-cart js-drawer" id="drawer-cart-id">
    <div class="drawer__content bg-light inner-glow shadow-md flex flex-column" role="alertdialog" aria-labelledby="drawer-cart-title">
        <header class="flex items-center justify-between flex-shrink-0 border-bottom border-contrast-lower padding-x-sm padding-y-xs">
            <h1 id="cartcount" class="text-base text-truncate"></h1>
            <button class="reset drawer__close-btn js-drawer__close js-tab-focus">
                <svg class="icon icon--xs" viewBox="0 0 16 16">
                    <title>Close drawer panel</title>
                    <g stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
                        <line x1="13.5" y1="2.5" x2="2.5" y2="13.5"></line>
                        <line x1="2.5" y1="2.5" x2="13.5" y2="13.5"></line>
                    </g>
                </svg>
            </button>
        </header>

        <div class="drawer__body padding-x-sm padding-bottom-sm js-drawer__body">
            <ol id="selectedProductsList">
            </ol>
        </div>

        <footer class="padding-x-sm padding-y-xs border-top border-contrast-lower flex-shrink-0">
            <p class="text-sm flex justify-between" id="totalPrice"><span>Subtotal:</span> <span></span></p>
            <a href="<?= URLROOT; ?>pizzacontroller/pizzaCheckout" class="btn btn--primary btn--md width-100% margin-top-xs">Checkout &rarr;</a>
        </footer>
    </div>
</div>
</div>
<br>

<!-- Pagination -->
<nav class="pagination " aria-label="Pagination">
    <ol class="pagination__list flex flex-wrap gap-xxxs justify-center">
        <li>
            <a href="#0" class="pagination__item pagination__item--disabled" aria-label="Go to previous page">
                <svg class="icon icon--xs margin-right-xxxs flip-x" viewBox="0 0 16 16">
                    <polyline points="6 2 12 8 6 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
                <span>Prev</span>
            </a>
        </li>

        <li class="display@sm">
            <a href="#0" class="pagination__item" aria-label="Go to page 1">1</a>
        </li>

        <li class="display@sm">
            <a href="#0" class="pagination__item" aria-label="Go to page 2">2</a>
        </li>

        <li class="display@sm">
            <a href="#0" class="pagination__item pagination__item--selected" aria-label="Current Page, page 3" aria-current="page">3</a>
        </li>

        <li class="display@sm">
            <a href="#0" class="pagination__item" aria-label="Go to page 4">4</a>
        </li>

        <li class="display@sm" aria-hidden="true">
            <span class="pagination__item pagination__item--ellipsis">...</span>
        </li>

        <li class="display@sm">
            <a href="#0" class="pagination__item" aria-label="Go to page 20">20</a>
        </li>

        <li>
            <a href="#0" class="pagination__item" aria-label="Go to next page">
                <span>Next</span>
                <svg class="icon icon--xs margin-left-xxxs" viewBox="0 0 16 16">
                    <polyline points="6 2 12 8 6 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
            </a>
        </li>
    </ol>
</nav>
<br>
<!-- Footer -->
<footer class="main-footer position-relative z-index-1 padding-top-xl footer">
    <div class="container max-width-lg">
        <div class="grid gap-lg">
            <div class="col-3@lg order-2@lg text-right@lg">
                <a class="main-footer__logo" href="#0">
                    <svg width="104" height="30" viewBox="0 0 104 30">
                        <title>Go to homepage</title>
                        <path d="M37.54 24.08V3.72h4.92v16.37h8.47v4zM60.47 24.37a7.82 7.82 0 01-5.73-2.25 8.36 8.36 0 01-2-5.62 8.32 8.32 0 012.08-5.71 8 8 0 015.64-2.18 8.07 8.07 0 015.68 2.2 8.49 8.49 0 012 5.69 8.63 8.63 0 01-1.78 5.38 7.6 7.6 0 01-5.89 2.49zm0-3.67c2.42 0 2.73-3 2.73-4.23s-.31-4.26-2.73-4.26-2.79 3-2.79 4.26.32 4.23 2.82 4.23zM95.49 24.37a7.82 7.82 0 01-5.73-2.25 8.36 8.36 0 01-2-5.62 8.32 8.32 0 012.08-5.71 8.4 8.4 0 0111.31 0 8.43 8.43 0 012 5.69 8.6 8.6 0 01-1.77 5.38 7.6 7.6 0 01-5.89 2.51zm0-3.67c2.42 0 2.73-3 2.73-4.23s-.31-4.26-2.73-4.26-2.8 3-2.8 4.26.31 4.23 2.83 4.23zM77.66 30c-5.74 0-7-3.25-7.23-4.52l4.6-.26c.41.91 1.17 1.41 2.76 1.41a2.45 2.45 0 002.82-2.53v-2.68a7 7 0 01-1.7 1.75 6.12 6.12 0 01-5.85-.08c-2.41-1.37-3-4.25-3-6.66 0-.89.12-3.67 1.45-5.42a5.67 5.67 0 014.64-2.4c1.2 0 3 .25 4.46 2.82V8.81h4.85v15.33a5.2 5.2 0 01-2.12 4.32A9.92 9.92 0 0177.66 30zm.15-9.66c2.53 0 2.81-2.69 2.81-3.91s-.31-4-2.81-4-2.81 2.8-2.81 4 .27 3.91 2.81 3.91zM55.56 3.72h9.81v2.41h-9.81z" fill="var(--color-contrast-higher)" />
                        <circle cx="15" cy="15" r="15" fill="var(--color-primary)" />
                    </svg>
                </a>
            </div>

            <nav class="col-9@lg order-1@lg">
                <ul class="grid gap-lg">
                    <li class="col-6@xs col-3@md">
                        <h4 class="margin-bottom-sm text-base@md">Product</h4>
                        <ul class="grid gap-xs text-sm@md">
                            <li><a href="#0" class="main-footer__link">Pricing</a></li>
                            <li><a href="#0" class="main-footer__link">Teams</a></li>
                            <li><a href="#0" class="main-footer__link">Updates</a></li>
                            <li><a href="#0" class="main-footer__link">Features</a></li>
                            <li><a href="#0" class="main-footer__link">Integrations</a></li>
                            <li><a href="#0" class="main-footer__link">Support</a></li>
                        </ul>
                    </li>

                    <li class="col-6@xs col-3@md">
                        <h4 class="margin-bottom-sm text-base@md">Developers</h4>
                        <ul class="grid gap-xs text-sm@md">
                            <li><a href="#0" class="main-footer__link">Documentation</a></li>
                            <li><a href="#0" class="main-footer__link">API reference</a></li>
                            <li><a href="#0" class="main-footer__link">API status</a></li>
                            <li><a href="#0" class="main-footer__link">Open source</a></li>
                        </ul>
                    </li>

                    <li class="col-6@xs col-3@md">
                        <h4 class="margin-bottom-sm text-base@md">Resources</h4>
                        <ul class="grid gap-xs text-sm@md">
                            <li><a href="#0" class="main-footer__link">Tutorials</a></li>
                            <li><a href="#0" class="main-footer__link">Docs</a></li>
                            <li><a href="#0" class="main-footer__link">Community</a></li>
                            <li><a href="#0" class="main-footer__link">Case studies</a></li>
                            <li><a href="#0" class="main-footer__link">Help center</a></li>
                        </ul>
                    </li>

                    <li class="col-6@xs col-3@md">
                        <h4 class="margin-bottom-sm text-base@md">About</h4>
                        <ul class="grid gap-xs text-sm@md">
                            <li><a href="#0" class="main-footer__link">Company</a></li>
                            <li><a href="#0" class="main-footer__link">Customers</a></li>
                            <li><a href="#0" class="main-footer__link">Careers</a></li>
                            <li><a href="#0" class="main-footer__link">Education</a></li>
                            <li><a href="#0" class="main-footer__link">Our story</a></li>
                            <li><a href="#0" class="main-footer__link">Press kit</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>

        <div class="flex flex-column border-top padding-y-xs margin-top-lg flex-row@md justify-between@md items-center@md">
            <div class="margin-bottom-sm margin-bottom-0@md">
                <div class="text-sm text-xs@md color-contrast-medium flex flex-wrap gap-xs">
                    <span>&copy; myWebsite</span>
                    <a href="#0" class="color-contrast-high">Terms</a>
                    <a href="#0" class="color-contrast-high">Privacy</a>
                </div>
            </div>

            <div class="flex items-center gap-xs">
                <a href="#0" class="main-footer__social">
                    <svg class="icon block" viewBox="0 0 16 16">
                        <title>Follow us on Twitter</title>
                        <g>
                            <path d="M16,3c-0.6,0.3-1.2,0.4-1.9,0.5c0.7-0.4,1.2-1,1.4-1.8c-0.6,0.4-1.3,0.6-2.1,0.8c-0.6-0.6-1.5-1-2.4-1 C9.3,1.5,7.8,3,7.8,4.8c0,0.3,0,0.5,0.1,0.7C5.2,5.4,2.7,4.1,1.1,2.1c-0.3,0.5-0.4,1-0.4,1.7c0,1.1,0.6,2.1,1.5,2.7 c-0.5,0-1-0.2-1.5-0.4c0,0,0,0,0,0c0,1.6,1.1,2.9,2.6,3.2C3,9.4,2.7,9.4,2.4,9.4c-0.2,0-0.4,0-0.6-0.1c0.4,1.3,1.6,2.3,3.1,2.3 c-1.1,0.9-2.5,1.4-4.1,1.4c-0.3,0-0.5,0-0.8,0c1.5,0.9,3.2,1.5,5,1.5c6,0,9.3-5,9.3-9.3c0-0.1,0-0.3,0-0.4C15,4.3,15.6,3.7,16,3z"></path>
                        </g>
                    </svg>
                </a>

                <a href="#0" class="main-footer__social">
                    <svg class="icon block" viewBox="0 0 16 16">
                        <title>Follow us on Youtube</title>
                        <g>
                            <path d="M15.8,4.8c-0.2-1.3-0.8-2.2-2.2-2.4C11.4,2,8,2,8,2S4.6,2,2.4,2.4C1,2.6,0.3,3.5,0.2,4.8C0,6.1,0,8,0,8 s0,1.9,0.2,3.2c0.2,1.3,0.8,2.2,2.2,2.4C4.6,14,8,14,8,14s3.4,0,5.6-0.4c1.4-0.3,2-1.1,2.2-2.4C16,9.9,16,8,16,8S16,6.1,15.8,4.8z M6,11V5l5,3L6,11z"></path>
                        </g>
                    </svg>
                </a>

                <a href="#0" class="main-footer__social">
                    <svg class="icon block" viewBox="0 0 16 16">
                        <title>Follow us on Github</title>
                        <g>
                            <path d="M8,0.2c-4.4,0-8,3.6-8,8c0,3.5,2.3,6.5,5.5,7.6 C5.9,15.9,6,15.6,6,15.4c0-0.2,0-0.7,0-1.4C3.8,14.5,3.3,13,3.3,13c-0.4-0.9-0.9-1.2-0.9-1.2c-0.7-0.5,0.1-0.5,0.1-0.5 c0.8,0.1,1.2,0.8,1.2,0.8C4.4,13.4,5.6,13,6,12.8c0.1-0.5,0.3-0.9,0.5-1.1c-1.8-0.2-3.6-0.9-3.6-4c0-0.9,0.3-1.6,0.8-2.1 c-0.1-0.2-0.4-1,0.1-2.1c0,0,0.7-0.2,2.2,0.8c0.6-0.2,1.3-0.3,2-0.3c0.7,0,1.4,0.1,2,0.3c1.5-1,2.2-0.8,2.2-0.8 c0.4,1.1,0.2,1.9,0.1,2.1c0.5,0.6,0.8,1.3,0.8,2.1c0,3.1-1.9,3.7-3.7,3.9C9.7,12,10,12.5,10,13.2c0,1.1,0,1.9,0,2.2 c0,0.2,0.1,0.5,0.6,0.4c3.2-1.1,5.5-4.1,5.5-7.6C16,3.8,12.4,0.2,8,0.2z"></path>
                        </g>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</footer>

<script src="<?= URLROOT; ?>public/js/app.js"></script>


<?php require APPROOT . '/views/includes/footer.php'; ?>