<?php require APPROOT . '/views/includes/head.php'; ?>
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
                </div>

                <!-- User is logged in -->
                <button class="reset user-menu-control col-12@sm" aria-controls="user-menu" aria-label="Toggle user menu">
                    <figure class="user-menu-control__img-wrapper radius-50%">
                        <img class="user-menu-control__img" src="<?= URLROOT ?>public/img/businesscostumemalemanofficeusericon-1320196264882354682.png" alt="User picture">
                    </figure>

                    <svg class="icon icon--xxs margin-left-xxs" aria-hidden="true" viewBox="0 0 12 12">
                        <polyline points="1 4 6 9 11 4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </svg>
                </button>
                <menu id="user-menu" class="menu js-menu">
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
            </div>
        </nav>
    </div>
</header>


<div class="container max-width-adaptive-lg">
    <div class="margin-bottom-md">
        <nav class="s-tabs">
            <ul class="s-tabs__list">
                <li><a class="s-tabs__link s-tabs__link--current" href="<?= URLROOT ?>user/edit">Profile</a></li>
                <li><a class="s-tabs__link" href="<?= URLROOT ?>user/editPassword">Password</a></li>
            </ul>
        </nav>
    </div>

    <div class="bg radius-md shadow-xs">
        <form action="<?= URLROOT ?>user/edit/" method="post">
            <div class="padding-md">
                <!-- basic form controls -->
                <fieldset class="margin-bottom-xl">
                    <legend class="form-legend margin-bottom-md">Profile Settings</legend>

                    <div class="margin-bottom-sm">
                        <div class="grid gap-xxs">
                            <div class="col-6@lg">
                                <input class="form-control width-100%" type="hidden" name="id" id="id" value="<?= $_SESSION['user']->customerId ?>">
                            </div>
                        </div>
                    </div>
                    <!-- input text -->
                    <div class="margin-bottom-sm">
                        <div class="grid gap-xxs">
                            <div class="col-3@lg">
                                <label class="inline-block text-sm padding-top-xs@lg" for="firstname">First Name</label>
                            </div>

                            <div class="col-6@lg">
                                <input class="form-control width-100%" type="text" name="firstname" id="firstname" value="<?= $_SESSION['user']->customerFirstName ?>" required>
                            </div>
                        </div>
                    </div>

                    <div class="margin-bottom-sm">
                        <div class="grid gap-xxs">
                            <div class="col-3@lg">
                                <label class="inline-block text-sm padding-top-xs@lg" for="lastname">Last Name</label>
                            </div>

                            <div class="col-6@lg">
                                <input class="form-control width-100%" type="text" name="lastname" id="lastname" value="<?= $_SESSION['user']->customerLastName ?>" required>
                            </div>
                        </div>
                    </div>

                    <div class="margin-bottom-sm">
                        <div class="grid gap-xxs">
                            <div class="col-3@lg">
                                <label class="inline-block text-sm padding-top-xs@lg" for="streetname">Streetname</label>
                            </div>

                            <div class="col-6@lg">
                                <input class="form-control width-100%" type="text" name="streetname" id="streetname" value="<?= $_SESSION['user']->customerStreetName ?>" required>
                            </div>
                        </div>
                    </div>

                    <div class="margin-bottom-sm">
                        <div class="grid gap-xxs">
                            <div class="col-3@lg">
                                <label class="inline-block text-sm padding-top-xs@lg" for="zipcode">Zipcode</label>
                            </div>

                            <div class="col-6@lg">
                                <input class="form-control width-100%" type="text" name="zipcode" id="zipcode" value="<?= $_SESSION['user']->customerZipCode ?>" required>
                            </div>
                        </div>
                    </div>

                    <div class="margin-bottom-sm">
                        <div class="grid gap-xxs">
                            <div class="col-3@lg">
                                <label class="inline-block text-sm padding-top-xs@lg" for="city">City</label>
                            </div>

                            <div class="col-6@lg">
                                <input class="form-control width-100%" type="text" name="city" id="city" value="<?= $_SESSION['user']->customerCity ?>" required>
                            </div>
                        </div>
                    </div>

                    <div class="margin-bottom-sm">
                        <div class="grid gap-xxs">
                            <div class="col-3@lg">
                                <label class="inline-block text-sm padding-top-xs@lg" for="phonenumber">Phone Number</label>
                            </div>

                            <div class="col-6@lg">
                                <input class="form-control width-100%" type="text" name="phonenumber" id="phonenumber" value="<?= $_SESSION['user']->customerPhone ?>" required>
                            </div>
                        </div>
                    </div>

                    <!-- input email -->
                    <div class="margin-bottom-sm">
                        <div class="grid gap-xxs">
                            <div class="col-3@lg">
                                <label class="inline-block text-sm padding-top-xs@lg" for="email">Email</label>
                            </div>

                            <div class="col-6@lg">
                                <input class="form-control width-100%" type="email" name="email" id="email" value="<?= $_SESSION['user']->customerEmail ?>">
                            </div>
                        </div>
                    </div>
            </div>
            <div class="border-top border-alpha padding-md text-right">
                <button class="btn btn--primary btn--md">Save</button>
            </div>
        </form>
    </div>
</div>
<?php require APPROOT . '/views/includes/footer.php'; ?>