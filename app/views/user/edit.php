<?php require APPROOT . '/views/includes/head.php'; ?>


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
        <form onsubmit="editProfile(event)">
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
                                <input class="form-control width-100%" type="text" name="firstname" id="firstname" value="<?= $_SESSION['user']->customerFirstName ?>">
                            </div>
                        </div>
                    </div>

                    <div class="margin-bottom-sm">
                        <div class="grid gap-xxs">
                            <div class="col-3@lg">
                                <label class="inline-block text-sm padding-top-xs@lg" for="lastname">Last Name</label>
                            </div>

                            <div class="col-6@lg">
                                <input class="form-control width-100%" type="text" name="lastname" id="lastname" value="<?= $_SESSION['user']->customerLastName ?>">
                            </div>
                        </div>
                    </div>

                    <div class="margin-bottom-sm">
                        <div class="grid gap-xxs">
                            <div class="col-3@lg">
                                <label class="inline-block text-sm padding-top-xs@lg" for="streetname">Streetname</label>
                            </div>

                            <div class="col-6@lg">
                                <input class="form-control width-100%" type="text" name="streetname" id="streetname" value="<?= $_SESSION['user']->customerStreetName ?>">
                            </div>
                        </div>
                    </div>

                    <div class="margin-bottom-sm">
                        <div class="grid gap-xxs">
                            <div class="col-3@lg">
                                <label class="inline-block text-sm padding-top-xs@lg" for="zipcode">Zipcode</label>
                            </div>

                            <div class="col-6@lg">
                                <input class="form-control width-100%" type="text" name="zipcode" id="zipcode" value="<?= $_SESSION['user']->customerZipCode ?>">
                            </div>
                        </div>
                    </div>

                    <div class="margin-bottom-sm">
                        <div class="grid gap-xxs">
                            <div class="col-3@lg">
                                <label class="inline-block text-sm padding-top-xs@lg" for="city">City</label>
                            </div>

                            <div class="col-6@lg">
                                <input class="form-control width-100%" type="text" name="city" id="city" value="<?= $_SESSION['user']->customerCity ?>">
                            </div>
                        </div>
                    </div>

                    <div class="margin-bottom-sm">
                        <div class="grid gap-xxs">
                            <div class="col-3@lg">
                                <label class="inline-block text-sm padding-top-xs@lg" for="phonenumber">Phone Number</label>
                            </div>

                            <div class="col-6@lg">
                                <input class="form-control width-100%" type="text" name="phonenumber" id="phonenumber" value="<?= $_SESSION['user']->customerPhone ?>">
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