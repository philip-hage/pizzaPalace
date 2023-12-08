<?php require APPROOT . '/views/includes/head.php'; ?>
<body class="bg-dark min-height-100vh flex flex-center padding-md"> 
  <form class="bg radius-md shadow-sm padding-lg max-width-xxs" action="<?= URLROOT ?>user/login/" method="post">
    <div class="text-center margin-bottom-md">
      <h1>Log in</h1>
    </div>
  
    <p class="text-center margin-y-sm">or</p>
  
    <div class="margin-bottom-sm">
      <label class="form-label margin-bottom-xxxs" for="customeremail">Email</label>
      <input class="form-control width-100%" type="email" name="customeremail" id="customeremail" placeholder="email@myemail.com">
    </div>
  
    <div class="margin-bottom-sm">
      <div class="flex justify-between margin-bottom-xxxs">
        <label class="form-label" for="customerpassword">Password</label> 
        <span class="text-sm"><a href="password-reset.html">Forgot?</a></span>
      </div>
  
      <input class="form-control width-100%" type="password" name="customerpassword" id="customerpassword1">
    </div>
  
    <div class="margin-bottom-sm">
      <button class="btn btn--primary btn--md width-100%">Login</button>
    </div>
  
    <div class="text-center">
      <p class="text-sm">Don't have an account? <a href="<?= URLROOT ?>user/userSignin/">Get started</a></p>
    </div>
  </form>
</body>
<?php require APPROOT . '/views/includes/footer.php'; ?>