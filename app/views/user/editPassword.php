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
                <li><a class="s-tabs__link" href="<?= URLROOT ?>user/edit">Profile</a></li>
                <li><a class="s-tabs__link s-tabs__link--current" href="<?= URLROOT ?>user/editPassword">Password</a></li>
            </ul>
        </nav>
    </div>

    <div class="bg radius-md shadow-xs">
        <form action="<?= URLROOT ?>user/editPassword/" method="post">
            <div class="padding-md">
                <div class="margin-bottom-sm">
                    <div class="grid gap-xxs">
                        <div class="col-6@lg">
                            <input class="form-control width-100%" type="hidden" name="id" id="id" value="<?= $_SESSION['user']->customerId ?>">
                        </div>
                    </div>
                </div>
                <!-- old password -->
                <fieldset class="margin-bottom-xl">
                    <legend class="form-legend margin-bottom-md">Current Password</legend>

                    <div class="margin-bottom-sm">
                        <div class="grid gap-xxs">
                            <div class="col-3@lg">
                                <label class="inline-block text-sm padding-top-xs@lg" for="old-password">Old Password</label>
                            </div>

                            <div class="col-6@lg">
                                <div class="password js-password ">
                                    <input class="password__input form-control width-100% js-password__input" type="password" name="old-password" id="old-password">

                                    <button class="password__btn flex flex-center js-password__btn js-tab-focus">
                                        <span class="password__btn-label" aria-label="Show password" title="Show password">
                                            <svg class="icon block" viewBox="0 0 20 20">
                                                <path d="M1,10s4-6,9-6,9,6,9,6-4,6-9,6S1,10,1,10Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                                <circle fill="currentColor" cx="10" cy="10" r="3" />
                                            </svg>
                                        </span>

                                        <span class="password__btn-label" aria-label="Hide password" title="Hide password">
                                            <svg class="icon block" viewBox="0 0 20 20">
                                                <circle fill="currentColor" cx="10" cy="10" r="3" />
                                                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                                    <line x1="2" y1="18" x2="18" y2="2" />
                                                    <path d="M5.511,14.489A18.132,18.132,0,0,1,1,10s4-6,9-6a8.276,8.276,0,0,1,4.489,1.511" />
                                                    <path d="M17,7.606A18.257,18.257,0,0,1,19,10s-4,6-9,6a6.383,6.383,0,0,1-1-.079" />
                                                </g>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <!-- new password -->
                <fieldset class="margin-bottom-md">
                    <legend class="form-legend margin-bottom-md">New Password</legend>

                    <div class="margin-bottom-sm">
                        <div class="grid gap-xxs">
                            <div class="col-3@lg">
                                <label class="inline-block text-sm padding-top-xs@lg" for="new-password">New Password</label>
                            </div>

                            <div class="col-6@lg">
                                <div class="password js-password ">
                                    <input class="password__input form-control width-100% js-password__input" type="password" name="new-password" id="new-password">

                                    <button class="password__btn flex flex-center js-password__btn js-tab-focus">
                                        <span class="password__btn-label" aria-label="Show password" title="Show password">
                                            <svg class="icon block" viewBox="0 0 20 20">
                                                <path d="M1,10s4-6,9-6,9,6,9,6-4,6-9,6S1,10,1,10Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                                <circle fill="currentColor" cx="10" cy="10" r="3" />
                                            </svg>
                                        </span>

                                        <span class="password__btn-label" aria-label="Hide password" title="Hide password">
                                            <svg class="icon block" viewBox="0 0 20 20">
                                                <circle fill="currentColor" cx="10" cy="10" r="3" />
                                                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                                    <line x1="2" y1="18" x2="18" y2="2" />
                                                    <path d="M5.511,14.489A18.132,18.132,0,0,1,1,10s4-6,9-6a8.276,8.276,0,0,1,4.489,1.511" />
                                                    <path d="M17,7.606A18.257,18.257,0,0,1,19,10s-4,6-9,6a6.383,6.383,0,0,1-1-.079" />
                                                </g>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="grid gap-xxs">
                            <div class="col-3@lg">
                                <label class="inline-block text-sm padding-top-xs@lg" for="new-password-2">Confirm New Password</label>
                            </div>

                            <div class="col-6@lg">
                                <div class="password js-password ">
                                    <input class="password__input form-control width-100% js-password__input" type="password" name="new-password-2" id="new-password-2">

                                    <button class="password__btn flex flex-center js-password__btn js-tab-focus">
                                        <span class="password__btn-label" aria-label="Show password" title="Show password">
                                            <svg class="icon block" viewBox="0 0 20 20">
                                                <path d="M1,10s4-6,9-6,9,6,9,6-4,6-9,6S1,10,1,10Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                                <circle fill="currentColor" cx="10" cy="10" r="3" />
                                            </svg>
                                        </span>

                                        <span class="password__btn-label" aria-label="Hide password" title="Hide password">
                                            <svg class="icon block" viewBox="0 0 20 20">
                                                <circle fill="currentColor" cx="10" cy="10" r="3" />
                                                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                                    <line x1="2" y1="18" x2="18" y2="2" />
                                                    <path d="M5.511,14.489A18.132,18.132,0,0,1,1,10s4-6,9-6a8.276,8.276,0,0,1,4.489,1.511" />
                                                    <path d="M17,7.606A18.257,18.257,0,0,1,19,10s-4,6-9,6a6.383,6.383,0,0,1-1-.079" />
                                                </g>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>


            <div class="border-top border-alpha padding-md text-right">
                <button class="btn btn--primary btn--md">Save</button>
            </div>
        </form>
    </div>
</div>
<?php require APPROOT . '/views/includes/footer.php'; ?>