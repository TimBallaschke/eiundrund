<!DOCTYPE html>
<html lang="en">


    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Director Eiundrund is celebrated for his distinctive style, seamlessly blending artistic vision and storytelling into every project.">
        <meta name="keywords" content="Eiundrund, Musikvideo, Videoproduktion, Bewegtbild, Director, Kameramann, Visueller Künstler, Regisseur, Musikindustrie, Urbannino, Musikvideoregisseur, Hamburg, kreative Musikvideos 2024, hochwertige Musikvideoproduktion, Musikvideo Ideen, Musikvideo Konzepte, Hamburg, Berlin, Julius Eirund, Musikvideoregisseur, Filmproduktion für Musiker, Professionelle Videoproduktion, Musikvideoproduktion Hamburg, Musikvideoproduktion Berlin">
        <title>Eiundrund | Videoproduktion Hamburg & Berlin</title>

        <link rel="icon" type="image/svg+xml" href="./assets/favicon/favicon.svg">

        <?= css('assets/styles/index.css') ?>

        <!-- defer oder async?/wohin der script tag? -->
        <script src="https://player.vimeo.com/api/player.js"></script>
        <script src="assets/script.js" defer></script> 
        
    </head>

    <body class="body">
        <div class="battery-saving-mode-container">
            <div class="battery-saving-mode-text regular">
                Please turn off battery saving mode.
            </div>
        </div>
        <div class="start-animation">
            <div class="start-in-view">
                <div class="start-background-color"></div>
                <div class="start-word-container">
                    <div class="start-word">Eiundrund Eiundrund Eiundrund Eiundrund Eiundrund Eiundrund Eiundrund Eiundrund Eiundrund Eiundrund</div>
                </div>
                <div class="arrows-circle">
                    <div class="arrow-container">
                        <div class="arrow-1 arrow"></div>
                        <div class="arrow-2 arrow"></div>
                        <div class="arrow-3 arrow"></div>
                    </div>
                </div>
            </div>
            <div class="start-out-of-view"></div>
        </div> 

        <!-- Overlay -->
        <div class="overlay-top white blur-start">
            <div class="title">
                <h1 class="name expanded">Eiundrund</h1>
                
                <?php $about = $site->find('about'); ?>
                <div class="about regular">About</div>
                <div class="about-info">
                    <div class="about-text-container">
                        <div class="info-headline small">
                            <div class="info-brackets">[</div>
                            <div class="info-word">About</div>
                            <div class="info-brackets">]</div>
                        </div>
                        <div class="about-text regular-no-uppercase about-animate">
                            <?= $about->about_textarea() ?>
                        </div>
                    </div>
                    <div class="about-clients-container">
                        <div class="info-headline small">
                            <div class="info-brackets">[</div>
                            <div class="info-word">Clients</div>
                            <div class="info-brackets">]</div>
                        </div>
                        <div class="about-clients regular about-animate">
                            <?= $about->clients_textarea() ?>
                        </div>
                    </div>
                    <div class="about-contact-container">
                        <div class="info-headline small">
                            <div class="info-brackets">[</div>
                            <div class="info-word">Contact</div>
                            <div class="info-brackets">]</div>
                        </div>
                        <div class="about-contact about-animate">
                            <div class="about-contact-mail regular">
                                <div class="info-grid-line">
                                    <div class="info-grid-line-title">E-Mail:</div>
                                    <div><?= $about->e_mail() ?></div>
                                </div>
                            </div>
                            <div class="about-contact-instagram regular">
                                <div class="info-grid-line">
                                    <div class="info-grid-line-title">Instagram:</div>
                                    <a href="https://www.instagram.com/eiundrund/" class="link-instagram"><?= $about->instagram() ?></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="website-credit">
                        <div class="website-credit-text small">
                            Website by Tim Ballaschke <a href="https://timballaschke.com/" class="link">timballaschke.com</a> <a href="https://www.instagram.com/ttimmba/?hl=de" class="link">@ttimmba</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="timeline">
                <div class="start-stripe"></div>
                <div class="time-bar" id="time-bar"></div>
                <div class="end-stripe"></div>
            </div>
            <div class="project-info-header">
                <div class="time-counter">
                    <div class="time-counter-number mono-small">0:00:0</div>
                </div>
                <div class="project-number mono">
                    <span class="bracket-monument">(</span>
                    <span class="number-digits">01</span>
                    <span class="bracket-monument">)</span>
                </div>
                <div class="project-title-visible regular"></div>
                <div class="client-visible regular"></div>
                <div class="plus-button-container">
                    <div class="plus-button">
                        <div class="plus">
                            <div class="plus-horizontal"></div>
                            <div class="plus-vertical"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="project-info-all not-visible">
                <div class="info-grid">
                    <div class="info-headline small">
                        <div class="info-brackets">[</div>
                        <div class="info-word">Info</div>
                        <div class="info-brackets">]</div>
                    </div>
                    <div class="info-grid-lines regular">
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Duration:</div>
                            <div class="duration-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Type:</div>
                            <div class="type-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Location:</div>
                            <div class="location-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Year:</div>    
                            <div class="year-visible"></div>    
                        </div>
                    </div>
                </div>
                <div class="credits-grid">
                    <div class="info-headline small">
                        <div class="info-brackets">[</div>
                        <div class="info-word small">Credits</div>
                        <div class="info-brackets">]</div>
                    </div>
                    <div class="info-grid-lines regular">
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Director:</div>
                            <div class="director-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="desktop info-grid-line-title">Executive Producer:</div>
                            <div class="mobile info-grid-line-title">EP:</div>
                            <div class="executive-producer-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Producer:</div>
                            <div class="producer-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="desktop info-grid-line-title">Creative Director:</div>
                            <div class="mobile info-grid-line-title">CD:</div>
                            <div class="creative-director-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Concept:</div>
                            <div class="concept-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Camera:</div>
                            <div class="camera-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Steadicam:</div>
                            <div class="steadicam-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">1. AC:</div>
                            <div class="first-ac-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">2. AC:</div>
                            <div class="second-ac-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Drone OP:</div>
                            <div class="drone-op-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Gaffer:</div>
                            <div class="gaffer-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Lead Electric:</div>
                            <div class="lead-electric-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Styling:</div>
                            <div class="styling-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Make-Up & Hair:</div>
                            <div class="make-up-hair-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Set-design:</div>
                            <div class="set-design-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="desktop info-grid-line-title">Production Assistance:</div>
                            <div class="mobile info-grid-line-title">PA:</div>
                            <div class="prouduction-assistance-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Edit:</div>
                            <div class="edit-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">VFX:</div>
                            <div class="vfx-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Color Grading:</div>
                            <div class="color-grading-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">3D:</div>
                            <div class="three-d-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Assistance:</div>
                            <div class="assistance-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">BTS:</div>
                            <div class="bts-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Sound Design:</div>
                            <div class="sound-design-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="desktop info-grid-line-title">Production Company:</div>
                            <div class="mobile info-grid-line-title">Prod. Company:</div>
                            <div class="production-company-visible"></div>
                        </div>
                        <div class="info-grid-line project-information-grid">
                            <div class="info-grid-line-title">Label:</div>
                            <div class="label-visible"></div>
                        </div>
                    </div>
                </div>
                <div class="full-video-button">
                    <div class="full-video-word expanded">
                        Watch Full Video
                    </div>
                </div>
                <div class="credit-line small">
                    Some rights reserved. Eiundrund <span>©</span> Copyright 2024
                </div>
            </div>
        </div>
        <div class="overlay-bottom white blur-start">
            <div class="pointer-events-block"></div>
            <div class="bottom-buttons-container">
                <div class="bottom-buttons-left">
                    <div class="projects-amount mono">
                        <span class="bracket-monument">(</span>
                        <span class="amount-digits">23</span>
                        <span class="bracket-monument">)</span>
                    </div>
                    <div class="filter-options">
                        <div class="filter-option filter-option-1 selected">
                            <div class="filter-circle circle selected"></div>
                            <div class="filter-word regular selected">All</div>
                        </div>
                        <div class="filter-option filter-option-2">
                            <div class="filter-circle circle"></div>
                            <div class="filter-word regular">Musicvideo</div>
                        </div>
                        <div class="filter-option filter-option-3">
                            <div class="filter-circle circle"></div>
                            <div class="filter-word regular">Aftermovie</div>
                        </div>
                        <div class="filter-option filter-option-4">
                            <div class="filter-circle circle"></div>
                            <div class="filter-word regular">Showreel</div>
                        </div>
                        <div class="filter-option filter-option-5">
                            <div class="filter-circle circle"></div>
                            <div class="filter-word regular">Commercial</div>
                        </div>
                    </div>                               
                    <div class="filter-button regular">Filter</div>
                    <div class="index-button regular">Overview</div>
                </div>
                <div class="color-button">
                    <div class="color-circle circle">
                    </div>
                    <div class="hex-code mono">ffffff</div>
                </div>
            </div>
        </div>
        <div class="overlay-background white not-visible">
            <div class="overlay-background-color"></div>
            <div class="overlay-background-blur"></div>
        </div>
        <div class="swipe-arrows-container white">
            <div class="swipe-arrows">
                <div class="swipe-arrow swipe-arrow-1"></div>
                <div class="swipe-arrow swipe-arrow-2"></div>
                <div class="swipe-arrow swipe-arrow-3"></div>
                <div class="swipe-arrow swipe-arrow-4"></div>
                <div class="swipe-arrow swipe-arrow-5"></div>
            </div>
        </div>
        <div class="screen-blackout"></div>

        <!-- Videos -->

        <div class="video-list">
            <?php foreach ($site->find('videos')->children() as $video): ?>
                <div class="single-video-container">
                    <div class="project-info-index">
                        <div class="project-number-index mono">
                            <span class="bracket-monument">(</span>
                            <span class="number-digits number-index">01</span>
                            <span class="bracket-monument">)</span>
                        </div>    
                        <div class="project-title regular"><?= $video->project_title()?></div>
                        <div class="client regular"><?= $video->client()?></div>
                        <div class="plus-button-index-container">
                            <div class="plus-button-index">
                                <div class="plus-index">
                                    <div class="plus-index-horizontal"></div>
                                    <div class="plus-index-vertical"></div>
                                </div>
                            </div>
                            <div class="plus-button-index-background-color"></div>
                        </div>
                    </div>
                    <div class="still-image">
                        <?php if($stillImage = $video->still_image()->toFile()): ?>
                            <img data-src="<?= $stillImage->thumb(['width' => 600, 'quality' => 80, 'format' => 'webp'])->url() ?>" alt="No image" class="lazy-image">
                        <?php endif ?>
                    </div>




                    <!-- Video informations not visible -->
                    <div class="duration"><?= $video->duration()?></div>
                    <div class="year"><?= $video->year()?></div>
                    <div class="location"><?= $video->location()?></div>
                    <div class="type-of-project"><?= $video->type_of_project()?></div>
                    <div class="director"><?= $video->director()?></div>
                    <div class="executive-producer"><?= $video->executive_producer()?></div>
                    <div class="producer"><?= $video->producer()?></div>
                    <div class="creative-director"><?= $video->creative_director()?></div>
                    <div class="concept"><?= $video->concept()?></div>
                    <div class="camera"><?= $video->camera()?></div>
                    <div class="steadicam"><?= $video->steadicam()?></div>
                    <div class="first-ac"><?= $video->first_ac()?></div>
                    <div class="second-ac"><?= $video->second_ac()?></div>
                    <div class="drone-op"><?= $video->drone_op()?></div>
                    <div class="gaffer"><?= $video->gaffer()?></div>
                    <div class="lead-electric"><?= $video->lead_electric()?></div>
                    <div class="styling"><?= $video->styling()?></div>
                    <div class="make-up-hair"><?= $video->make_up_and_hair()?></div>
                    <div class="set-design"><?= $video->setdesign()?></div>
                    <div class="production-assistance"><?= $video->production_assistance()?></div>
                    <div class="edit"><?= $video->edit()?></div>
                    <div class="vfx"><?= $video->vfx()?></div>
                    <div class="colorgrading"><?= $video->color_grading()?></div>
                    <div class="three-d"><?= $video->three_d()?></div>
                    <div class="assistance"><?= $video->assistance()?></div>
                    <div class="bts"><?= $video->bts()?></div>
                    <div class="sound-design"><?= $video->sound_design()?></div>
                    <div class="production-company"><?= $video->production_company()?></div>
                    <div class="label"><?= $video->label()?></div>


                    <div class="color"><?= $video->color()?></div>

                    <?php $mobileWebm = $video->mobile_webm()->toFile(); ?>
                    <?php $mobileMp4 = $video->mobile_mp4()->toFile(); ?>
                    <video class="single-video lazy" autoplay="" muted="" playsinline="" loop>
                        <?php if($mobileWebm): ?>
                        <source data-src="<?= $mobileWebm->url() ?>" type="video/webm">
                        <?php endif ?>
                        <?php if($mobileMp4): ?>
                        <source data-src="<?= $mobileMp4->url() ?>" type="video/mp4">
                        <?php endif ?>
                    </video>

                    <?php $desktopWebm = $video->desktop_webm()->toFile(); ?>
                    <?php $desktopMp4 = $video->desktop_mp4()->toFile(); ?>

                    <video class="single-video-desktop lazy" autoplay="" muted="" playsinline="" loop>
                        <?php if($desktopWebm): ?>
                        <source data-src="<?= $desktopWebm->url() ?>" type="video/webm">
                        <?php endif ?>
                        <?php if($desktopMp4): ?>
                        <source data-src="<?= $desktopMp4->url() ?>" type="video/mp4" class="mp4-source">
                        <?php endif ?>
                    </video>

                    <?php $vimeoID = $video->vimeo_id()->value(); ?>
                    <?php if ($vimeoID): ?>
                        <div class="full-video-container">
                            <iframe
                                class="full-video"
                                data-src="https://player.vimeo.com/video/<?= $vimeoID ?>?controls=0"
                                frameborder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                            ></iframe>
                            <div class="full-video-loading-screen white">
                            <div class="full-video-loading-screen-black"></div>
                            <div class="full-video-loading-screen-color"></div>
                            <div class="full-video-loading-screen-text">Lo<span class="letter-a">a</span>ding Lo<span class="letter-a">a</span>ding Lo<span class="letter-a">a</span>ding Lo<span class="letter-a">a</span>ding Lo<span class="letter-a">a</span>ding Lo<span class="letter-a">a</span>ding Lo<span class="letter-a">a</span>ding Lo<span class="letter-a">a</span>ding Lo<span class="letter-a">a</span>ding Lo<span class="letter-a">a</span>ding Lo<span class="letter-a">a</span>ding Lo<span class="letter-a">a</span>ding Lo<span class="letter-a">a</span>ding Lo<span class="letter-a">a</span>ding</div>
                        </div>
                        <div class="full-video-controls-container white">
                            <div class="full-video-controls">         
                                <div class="timeline-full-video">
                                    <div class="time-bar-full-video" id="time-bar-full-video"></div>
                                    <div class="time-bar-full-video-outline"></div>
                                    <div class="time-counter-full-video">
                                        <div class="time-counter-number-full-video-left mono-small"></div>
                                        <div class="time-counter-number-full-video-right mono-small"></div>
                                    </div>
                                </div>
                                <div class="full-video-pause-button-container">
                                    <div class="full-video-pause-button">
                                        <div class="full-video-pause-sign">
                                            <div class="pause-sign-rectangle"></div>
                                            <div class="pause-sign-rectangle"></div>
                                        </div>
                                        <div class="full-video-play-sign">
                                            <div class="play-sign"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="full-video-close-button expanded">Close</div>
                            </div>
                        </div>
                        </div>
                    <?php endif ?>
                </div>
            <?php endforeach ?>
        </div>
    </body>
</html>  