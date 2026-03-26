@echo off
chcp 65001 >nul 2>&1
echo Ready to delete folders...
echo.

setlocal enabledelayedexpansion

set "folders=377 378 379 380 381 382 383 384 385 386 387 388 392 393 414 415 418 424 428 429 430 431 434 437 438 442 443 445 446 453 454 463 475 470 468 490 493 492 494 495 496 497 498 499 500 501 503 504 505 507 511 513 517 524 522 530 521 533 537 538 543 546 548 549 389 390 394 395 397 398 399 402 409 413 423 426 427 436 448 461 472 478 480 486 510 514 518 528 532 536 539 540 545 410 411 416 425 433 435 440 450 451 452 462 467 483 484 488 489 508 509 515 516 525"

echo Deleting folders...
for %%f in (%folders%) do (
    if exist "%%f" (
        rmdir /s /q "%%f" 2>nul
        if !errorlevel! equ 0 (
            echo Deleted: %%f
        ) else (
            echo Failed: %%f
        )
    ) else (
        echo Not found: %%f
    )
)

echo.
echo Done.
pause


