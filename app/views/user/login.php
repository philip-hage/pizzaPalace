<?php require APPROOT . '/views/includes/head.php'; ?>
<div class="bg-dark min-height-100vh flex flex-center padding-md">
  <form class="bg radius-md shadow-sm padding-lg max-width-xxs" onsubmit="login(event)">
    <div class="text-center margin-bottom-md">
      <h1>Log in</h1>
    </div>
    <div class="margin-bottom-sm">
      <input type="hidden" name="loginfailed">
    </div>
    <div class="margin-bottom-sm">
      <label class="form-label margin-bottom-xxxs" for="customeremail">Email</label>
      <input class="form-control width-100%" type="email" name="customeremail" id="customeremail" placeholder="email@myemail.com">
    </div>

    <div class="margin-bottom-sm">

      <input class="form-control width-100%" type="password" name="customerpassword" id="customerpassword" placeholder="password">
    </div>

    <div class="margin-bottom-sm">
      <button class="btn btn--primary btn--md width-100%">Login</button>
    </div>

    <div class="text-center">
      <p class="text-sm">Don't have an account? <a href="<?= URLROOT ?>user/userSignin/">Get started</a></p>
    </div>
  </form>
</div>
<?php require APPROOT . '/views/includes/footer.php'; ?>