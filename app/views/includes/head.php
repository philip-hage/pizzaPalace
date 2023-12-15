<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>
        document.getElementsByTagName("html")[0].className += " js";
    </script>
    <!-- font -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?= URLROOT; ?>/assets/css/style.css">
    <link rel="stylesheet" href="<?= URLROOT; ?>/public/css/style.css">
    <script src="<?= URLROOT; ?>assets/js/dark-mode.js"></script>
    <title>Pizza Site</title>
</head>

<body>

    <?php session_start(); ?>


    <header class="header position-relative js-header" id="navbar">
        <div class="header__container container max-width-lg">
            <div class="header__logo">
                <a href="<?= URLROOT ?>pizza/overview/">
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
                        <?php if (CURRENTCONTROLLER !== 'User' && CURRENTCONTROLLER !== 'Stores') : ?>
                        <ul class="header__list">
                            <button class="btn btn--primary header__nav-btn" aria-controls="drawer-cart-id">Show Cart</button>
                        </ul>
                        <?php endif; ?>
                    </div>
                    <!-- User is logged in -->
                    <button class="reset user-menu-control <?= (CURRENTCONTROLLER !== 'User' && CURRENTCONTROLLER !== 'Stores') ? 'col-6@sm' : 'col-12@sm' ?> " aria-controls="user-menu" aria-label="Toggle user menu">
                        <figure class="user-menu-control__img-wrapper radius-50%">
                            <img class="user-menu-control__img" src="<?= URLROOT ?>public/img/businesscostumemalemanofficeusericon-1320196264882354682.png" alt="User picture">
                        </figure>

                        <svg class="icon icon--xxs margin-left-xxs" aria-hidden="true" viewBox="0 0 12 12">
                            <polyline points="1 4 6 9 11 4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                        </svg>
                    </button>
                </div>
                <menu id="user-menu" class="menu js-menu">
                    <div class="padding-md padding-sm@md margin-top-auto flex-shrink-0 border-top border-alpha">
                        <div class="flex items-center justify-between@md">
                            <p class="text-sm@md">Dark Mode</p>

                            <div class="switch dark-mode-switch margin-left-xxs">
                                <input class="switch__input" type="checkbox" id="switch-light-dark">
                                <label aria-hidden="true" class="switch__label" for="switch-light-dark">On</label>
                                <div aria-hidden="true" class="switch__marker"></div>
                            </div>
                        </div>
                    </div>
                    <li class="menu__separator" role="separator"></li>
                    <?php if (isset($_SESSION['user'])) : ?>
                        <li role="menuitem">
                            <a class="menu__content js-menu__content" href="<?= URLROOT ?>user/edit/">
                                <svg class="icon menu__icon" aria-hidden="true" viewBox="0 0 16 16">
                                    <circle cx="8" cy="3.5" r="3.5" />
                                    <path d="M14.747,14.15a6.995,6.995,0,0,0-13.494,0A1.428,1.428,0,0,0,1.5,15.4a1.531,1.531,0,0,0,1.209.6H13.288a1.531,1.531,0,0,0,1.209-.6A1.428,1.428,0,0,0,14.747,14.15Z" />
                                </svg>
                                <span>Profile</span>
                            </a>
                        </li>
                        <!-- Move Sign In button inside the user menu -->
                        <li role="menuitem">
                            <a class="menu__content js-menu__content" href="<?= URLROOT ?>user/logout">Logout</a>
                        </li>
                    <?php else : ?>
                        <!-- User is not logged in -->
                        <li role="menuitem">
                            <a class="menu__content js-menu__content" href="<?= URLROOT ?>user/login">Sign in</a>
                        </li>
                    <?php endif; ?>
                    </li>
                </menu>
            </nav>
        </div>
    </header>