<?php require APPROOT . '/views/includes/head.php'; ?>
<body class="bg-dark min-height-100vh flex flex-center padding-md">
  <form class="bg radius-md shadow-sm padding-lg max-width-xxs" action="<?= URLROOT ?>user/userSignin/" method="post">
    <div class="text-component text-center margin-bottom-md">
      <h1>Get started</h1>
      <p>Already have an account? <a href="<?= URLROOT ?>user/login/">Login</a></p>
    </div>

    <div class="margin-bottom-sm">
      <div class="grid gap-xs">
        <div class="col-6@md">
          <label class="form-label margin-bottom-xxxs" for="input-first-name">First name</label>
          <input class="form-control width-100%" type="text" name="customerfirstname" id="input-first-name">
        </div>
  
        <div class="col-6@md">
          <label class="form-label margin-bottom-xxxs" for="input-last-name">Last name</label>
          <input class="form-control width-100%" type="text" name="customerlastname" id="input-last-name">
        </div>
      </div>
    </div>
  
    <div class="margin-bottom-sm">
      <label class="form-label margin-bottom-xxxs" for="input-customer-streetname">StreetName</label>
      <input class="form-control width-100%" type="text" name="customerstreetname" id="input-customer-streetname">
    </div>

    <div class="margin-bottom-sm">
      <label class="form-label margin-bottom-xxxs" for="input-zip-code">ZipCode</label>
      <input class="form-control width-100%" type="text" name="customerzipcode" id="input-zip-code">
    </div>

    <div class="margin-bottom-sm">
      <label class="form-label margin-bottom-xxxs" for="customercity">City</label>
      <input class="form-control width-100%" type="text" name="customercity" id="customercity">
    </div>

    <div class="margin-bottom-sm">
      <label class="form-label margin-bottom-xxxs" for="customeremail">Email</label>
      <input class="form-control width-100%" type="email" name="customeremail" id="customeremail" placeholder="email@myemail.com">
    </div>

    <div class="margin-bottom-sm">
      <label class="form-label margin-bottom-xxxs" for="customerphone">Phone</label>
      <input class="form-control width-100%" type="text" name="customerphone" id="customerphone">
    </div>
  
    <div class="margin-bottom-md">
      <label class="form-label margin-bottom-xxxs" for="customerpassword">Password</label> 
      <input class="form-control width-100%" type="password" name="customerpassword" id="customerpassword">
      <p class="text-xs color-contrast-medium margin-top-xxs">Minimum 6 characters</p>
    </div>
  
    <div class="margin-bottom-sm">
      <button class="btn btn--primary btn--md width-100%">Sign in</button>
    </div>
  
    <div class="text-center">
      <p class="text-xs color-contrast-medium">By joining, you agree to our <a href="#0">Terms</a> and <a href="#0">Privacy Policy</a>.</p>
    </div>
  </form>
</body>

<?php require APPROOT . '/views/includes/footer.php'; ?>