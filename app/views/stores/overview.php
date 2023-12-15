<?php require APPROOT . '/views/includes/head.php'; ?>
<div class="grid gap-sm">
    <?php foreach ($data['stores'] as $store) : ?>

        <a href="<?= URLROOT ?>pizza/overview/" class="card-v3 col-4@sm" aria-label="Link description" onclick="localStorage.setItem('selectedStore', JSON.stringify({'storeId': '<?= $store->storeId ?>', 'storeName': '<?= htmlspecialchars($store->storeName) ?>'}))">

            <div class="card-v3__content">
                <img class="card-v3__img" src="<?= $store->imagePath ?>" alt="Image description">
                <div class="card-v3__label"><?= $store->storeStreetName ?></div>
                <h3><?= $store->storeName ?></h3>
            </div>

            <div class="card-v3__footer">
                <span>Select Store</span>

                <svg class="icon" viewBox="0 0 16 16" aria-hidden="true">
                    <g fill="currentColor">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h14"></path>
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 8l-5 5"></path>
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3l5 5"></path>
                    </g>
                </svg>
            </div>
        </a>
    <?php endforeach; ?>
</div>


<?php require APPROOT . '/views/includes/footer.php'; ?>