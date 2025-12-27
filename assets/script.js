// variables for eventlisteners

const plusButton = document.querySelector('.plus-button');
const indexButton = document.querySelector('.index-button');
const filterButton = document.querySelector('.filter-button');
const aboutButton = document.querySelector('.about');
const websiteTitle = document.querySelector('.name');

// Video List
const videoList = document.querySelector('.video-list');
const singleVideos = document.querySelectorAll('.single-video');
const singleVideosDesktop = document.querySelectorAll('.single-video-desktop');


let player = null;

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// STARTANIMATION

// randomly choose a color for the starting animation

document.addEventListener("DOMContentLoaded", function() {
    // Get all the color elements
    const colorElements = document.querySelectorAll('.single-video-container .color');
    
    // Convert NodeList to Array for easier manipulation
    const colors = Array.from(colorElements).map(el => el.textContent.trim());
    
    // Check if there are any colors
    if (colors.length > 0) {
        // Randomly select one color
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Set the CSS variable --start-animation-color to the selected color
        document.documentElement.style.setProperty('--start-animation-color', randomColor);
    }
});



const arrowsCirlce = document.querySelector('.arrows-circle');
const arrowOne = document.querySelector('.arrow-1');
const arrowTwo = document.querySelector('.arrow-2');
const arrowThree = document.querySelector('.arrow-3');

function addVisibleClasses() {
    setTimeout(() => {
        arrowsCirlce.classList.add('visible');
    }, 1000);

    setTimeout(() => {
        arrowThree.classList.add('visible');
    }, 1300);

    setTimeout(() => {
        arrowTwo.classList.add('visible');
    }, 1600);

    setTimeout(() => {
        arrowOne.classList.add('visible');
    }, 1900);

    setTimeout(() => {
        arrowsCirlce.classList.remove('visible');
        arrowOne.classList.remove('visible');
        arrowTwo.classList.remove('visible');
        arrowThree.classList.remove('visible');
    }, 3000);
}

function loopVisibility() {
    addVisibleClasses();
    setInterval(() => {
        addVisibleClasses();
    }, 4000); // Adjust this duration as needed to match the total time of your sequences
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        loopVisibility();
    }, 200);

});

function hideArrows() {
    const swipeArrows = document.querySelectorAll('.swipe-arrow');
    
    // Clear any pending timeouts for arrow animations
    if (window.arrowAnimationTimeouts) {
        window.arrowAnimationTimeouts.forEach(timeout => clearTimeout(timeout));
        window.arrowAnimationTimeouts = [];
    }
    
    // Remove visible class from all arrows
    swipeArrows.forEach(arrow => {
        arrow.classList.remove('visible');
    });
}


//Scroll Animation out of view

const overlayTop = document.querySelector('.overlay-top');
const overlayBottom = document.querySelector('.overlay-bottom');

document.addEventListener('DOMContentLoaded', () => {

    const startInView = document.querySelector('.start-in-view');
    const startAnimation = document.querySelector('.start-animation');
    const projectTitleVisible = document.querySelector('.project-title-visible');
    const clientVisible = document.querySelector('.client-visible');
    const body = document.querySelector('.body');


    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '-1px',
        threshold: 0 // Trigger when any part of the element leaves the viewport
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {

                startAnimation.classList.add('not-displayed');

                setTimeout(() => {
                    overlayTop.classList.remove('blur-start');
                    overlayBottom.classList.remove('blur-start');
                    body.classList.add('no-scroll');
                }, 500);

                setTimeout(() => {
                    projectTitleVisible.classList.remove('not-visible');
                    clientVisible.classList.remove('not-visible');
                }, 1200);

                updateCurrentVideo();

                const swipeArrows = document.querySelectorAll('.swipe-arrow');
                const totalArrows = swipeArrows.length;
                const totalAnimationTime = (totalArrows * 100) + 2000;
    
                // Initialize the array if it doesn't exist
                if (!window.arrowAnimationTimeouts) {
                    window.arrowAnimationTimeouts = [];
                }

                // Store the initial timeout
                const initialTimeout = setTimeout(() => {
                    swipeArrows.forEach((arrow, index) => {
                        const arrowTimeout = setTimeout(() => {
                            arrow.classList.add('visible');
                        }, index * 100);
                        window.arrowAnimationTimeouts.push(arrowTimeout);
                    });

                    const hideTimeout = setTimeout(() => {
                        swipeArrows.forEach(arrow => {
                            arrow.classList.remove('visible');
                        });
                    }, totalAnimationTime);
                    window.arrowAnimationTimeouts.push(hideTimeout);
                }, 2000);
                window.arrowAnimationTimeouts.push(initialTimeout);

                // Stop observing since the action is done
                observer.disconnect();
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(startInView);
});




// document.addEventListener("scroll", function () {
//     const startInView = document.querySelector('.start-in-view');
//     const startAnimation = document.querySelector('.start-animation');
//     const startInViewRect = startInView.getBoundingClientRect();

//     if (startInViewRect.bottom < 1) {
//         console.log("condition fullfilled");

//         startAnimation.classList.add('not-displayed');

//         setTimeout(() => {
//             overlayTop.classList.remove('blur-start');
//             overlayBottom.classList.remove('blur-start');
//         }, 500);

//         const projectTitleVisible = document.querySelector('.project-title-visible');
//         const clientVisible = document.querySelector('.client-visible');

//         setTimeout(() => {
//             projectTitleVisible.classList.remove('not-visible');
//             clientVisible.classList.remove('not-visible');
//         }, 1200);

        
//         updateCurrentVideo();
//     }
// });









//VIDEOS

//lazyloading of videos

document.addEventListener('DOMContentLoaded', function () {
    const lazyVideos = [].slice.call(document.querySelectorAll('video.lazy'));

    const canPlayWebM = document.createElement('video').canPlayType('video/webm; codecs="vp8, vorbis"') !== "";
    console.log('WebM supported:', canPlayWebM);

    if (canPlayWebM) {
        const mp4Sources = document.querySelectorAll('.mp4-source');
        mp4Sources.forEach(source => {
            source.remove();
        });
        console.log('Removed MP4 sources as WebM is supported');
    }

    if ('IntersectionObserver' in window) {
        // Function to create an observer with given options
        function createLazyVideoObserver(options) {
            return new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const videoElement = entry.target;

                        // Skip if already loaded
                        if (!videoElement.classList.contains('lazy')) return;

                        console.log('Video is intersecting, starting to load:', videoElement);

                        // Load all sources
                        for (let source of videoElement.children) {
                            if (source.tagName === 'SOURCE' && source.dataset.src) {
                                source.src = source.dataset.src;
                                console.log('Loading source data-src:', source.dataset.src);
                            }
                        }
                        
                        if (videoElement.dataset.src) {
                            videoElement.src = videoElement.dataset.src;
                            console.log('Loading video data-src:', videoElement.dataset.src);
                        }

                        videoElement.load();
                        videoElement.classList.remove('lazy');

                        // Reset video to beginning after loading
                        if (videoElement.readyState >= 3) {
                            videoElement.currentTime = 0;
                            videoElement.pause();
                        } else {
                            videoElement.addEventListener('loadeddata', function onLoadedData() {
                                videoElement.currentTime = 0;
                                videoElement.pause();
                                videoElement.removeEventListener('loadeddata', onLoadedData);
                            });
                        }

                        console.log('Video has been loaded and observer is disconnected:', videoElement);
                        observer.unobserve(videoElement);
                    }
                });
            }, options);
        }

        // Initial strict observer
        let lazyVideoObserver = createLazyVideoObserver({
            rootMargin: '0px 0px 0px 0px',
            threshold: 0.5
        });

        lazyVideos.forEach(function (lazyVideo) {
            lazyVideoObserver.observe(lazyVideo);
            console.log('Observer is now watching:', lazyVideo);
        });
        
        // After 4 seconds, switch to more permissive loading
        setTimeout(() => {
            console.log('Switching to more permissive lazy loading parameters');
            
            // Disconnect the current observer
            lazyVideoObserver.disconnect();
            
            // Create a new observer with more permissive settings
            lazyVideoObserver = createLazyVideoObserver({
                rootMargin: '0px 0px 500px 0px',
                threshold: 0
            });
            
            // Re-observe any videos that are still lazy
            document.querySelectorAll('video.lazy').forEach(lazyVideo => {
                lazyVideoObserver.observe(lazyVideo);
                console.log('Permissive observer now watching:', lazyVideo);
            });
            
        }, 3000); // 4 seconds
    } else {
        console.log('IntersectionObserver is not supported in this browser.');
    }
});





const videos = document.querySelectorAll('.single-video-container');

// Function to skip one frame for each video
function skipOneFrameForAllVideos() {
    videos.forEach(videoContainer => {
        let videoElement;

        // Determine which video to use based on element visibility
        const singleVideo = videoContainer.querySelector('.single-video');
        const singleVideoDesktop = videoContainer.querySelector('.single-video-desktop');

        if (singleVideo && getComputedStyle(singleVideo).display !== 'none') {
            videoElement = singleVideo;
        } else if (singleVideoDesktop && getComputedStyle(singleVideoDesktop).display !== 'none') {
            videoElement = singleVideoDesktop;
        }

        // Ready state checks how much data of the video is loaded
        if (videoElement.readyState >= 3) {
            videoElement.currentTime = 0;
        } else {
            videoElement.addEventListener('loadeddata', function onLoadedData() {
                videoElement.currentTime = 0;
                videoElement.removeEventListener('loadeddata', onLoadedData); // Remove the event listener after it's triggered
            });
        }
    });
}

// document.addEventListener('DOMContentLoaded', skipOneFrameForAllVideos);






//Update current Video
//Checks for the video that is currently displayed in the middle of the viewport
function findCurrentVideo(videos) {

for (const video of videos) {
    const rect = video.getBoundingClientRect();
    //checks if the top of a video is above the middle of the viewport and the bottom underneath
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        return video;
    }
}
return null;
}




let previousVideo = null;
isNewVideo = false;

function updateCurrentVideo() {

    // Find the current video
    const currentVideo = findCurrentVideo(videos);
    let currentVideoElement;

    if (!currentVideo) {

        const numberDigits = document.querySelector('.number-digits');
        const projectTitleVisible = document.querySelector('.project-title-visible');
        const clientVisible = document.querySelector('.client-visible');

        // Update numberDigits and set innerHTML of projectTitleVisible and clientVisible to empty strings
        numberDigits.innerHTML = "00";
        projectTitleVisible.innerHTML = " ";
        clientVisible.innerHTML = " ";

        plusButton.classList.add('not-displayed');

        return;
    }


    // Determine which video to use based on element visibility
    // Determine which video to use based on element visibility
    const singleVideo = currentVideo.querySelector('.single-video');
    const singleVideoDesktop = currentVideo.querySelector('.single-video-desktop');

    if (singleVideo && getComputedStyle(singleVideo).display !== 'none') {
        currentVideoElement = singleVideo;
    } else if (singleVideoDesktop && getComputedStyle(singleVideoDesktop).display !== 'none') {
        currentVideoElement = singleVideoDesktop;
    }


    if(!currentVideoElement) {
        return;
    }

    currentVideoElement.videoCounter = 0; // Attach counter to the video element
    currentVideoElement.hasTriggeredAt2 = false;

    const videoIndex = Array.from(videos).indexOf(currentVideo);
    const swipeArrowsContainer = document.querySelector('.swipe-arrows-container');

    if (videos.length === videoIndex + 1 ) {
        swipeArrowsContainer.classList.add('rotate');
    } else {
        swipeArrowsContainer.classList.remove('rotate');
    }
    
    currentVideoElement.addEventListener('timeupdate', function() {
        if (this.currentTime >= 0.5 && this.currentTime <= 1.5 && !this.hasTriggeredAt2) {
            const projectInformationVisible = plusButton.classList.contains('visible');
            const indexVisible = indexButton.classList.contains('visible');
            const filterVisible = filterButton.classList.contains('visible')
            const aboutVisible = aboutButton.classList.contains('visible')

            const swipeArrows = document.querySelectorAll('.swipe-arrow');
            const totalArrows = swipeArrows.length;
            const totalAnimationTime = (totalArrows * 100) + 2000;

            if (!projectInformationVisible && !indexVisible && !filterVisible && !aboutVisible) {
                if (this.videoCounter >= 1) { // Use the video's own counter
                    // Store all timeouts in an array so they can be cleared if needed
                    window.arrowAnimationTimeouts = [];
                    
                    swipeArrows.forEach((arrow, index) => {
                        const timeout = setTimeout(() => {
                            arrow.classList.add('visible');
                        }, index * 100);
                        window.arrowAnimationTimeouts.push(timeout);
                    });

                    const hideTimeout = setTimeout(() => {
                        swipeArrows.forEach(arrow => {
                            arrow.classList.remove('visible');
                        });
                    }, totalAnimationTime);
                    window.arrowAnimationTimeouts.push(hideTimeout);
                }
            }

            this.videoCounter++; // Increment the video's own counter
            this.hasTriggeredAt2 = true;
            console.log('current Video counter: ', this.videoCounter);


        } else if (this.currentTime < 0.5 || this.currentTime > 1.5) {
            // Reset flag when time is outside the range
            this.hasTriggeredAt2 = false;
        }
    });

    // Only play the current video
    videos.forEach(video => {
        let videoElement;

        // Determine which video to use based on element visibility
        const singleVideo = video.querySelector('.single-video');
        const singleVideoDesktop = video.querySelector('.single-video-desktop');

        if (singleVideo && getComputedStyle(singleVideo).display !== 'none') {
            videoElement = singleVideo;
        } else if (singleVideoDesktop && getComputedStyle(singleVideoDesktop).display !== 'none') {
            videoElement = singleVideoDesktop;
        }

        if (videoElement === currentVideoElement && !indexButton.classList.contains('visible')) {
            // Check and play the video if ready, or wait for it to be ready
            playVideoWhenReady(videoElement);
        } else {
            videoElement.pause();
        }
    });

    plusButton.classList.remove('not-displayed');


    // Update title and client of the current video
    const projectTitle = currentVideo.querySelector('.project-title').innerHTML;
    const client = currentVideo.querySelector('.client').innerHTML;
    const duration = currentVideo.querySelector('.duration').innerHTML;
    const year = currentVideo.querySelector('.year').innerHTML;
    const location = currentVideo.querySelector('.location').innerHTML;
    const typeOfProject = currentVideo.querySelector('.type-of-project').innerHTML;
    const director = currentVideo.querySelector('.director').innerHTML;
    const executiveProducer = currentVideo.querySelector('.executive-producer').innerHTML;
    const producer = currentVideo.querySelector('.producer').innerHTML;
    const creativeDirector = currentVideo.querySelector('.creative-director').innerHTML;
    const concept = currentVideo.querySelector('.concept').innerHTML;
    const camera = currentVideo.querySelector('.camera').innerHTML;
    const steadicam = currentVideo.querySelector('.steadicam').innerHTML;
    const firstAC = currentVideo.querySelector('.first-ac').innerHTML;
    const secondAC = currentVideo.querySelector('.second-ac').innerHTML;
    const droneOP = currentVideo.querySelector('.drone-op').innerHTML;
    const gaffer = currentVideo.querySelector('.gaffer').innerHTML;
    const leadElectric = currentVideo.querySelector('.lead-electric').innerHTML;
    const styling = currentVideo.querySelector('.styling').innerHTML;
    const makeUpHair = currentVideo.querySelector('.make-up-hair').innerHTML;
    const setDesign = currentVideo.querySelector('.set-design').innerHTML;
    const productionAssistance = currentVideo.querySelector('.production-assistance').innerHTML;
    const edit = currentVideo.querySelector('.edit').innerHTML;
    const vfx = currentVideo.querySelector('.vfx').innerHTML;
    const colorgrading = currentVideo.querySelector('.colorgrading').innerHTML;
    const threeD = currentVideo.querySelector('.three-d').innerHTML;
    const assistance = currentVideo.querySelector('.assistance').innerHTML;
    const bts = currentVideo.querySelector('.bts').innerHTML;   
    const soundDesign = currentVideo.querySelector('.sound-design').innerHTML;
    const productionCompany = currentVideo.querySelector('.production-company').innerHTML;
    const label = currentVideo.querySelector('.label').innerHTML;

    const projectTitleVisible = document.querySelector('.project-title-visible');
    const clientVisible = document.querySelector('.client-visible');
    const durationVisible = document.querySelector('.duration-visible');
    const typeVisible = document.querySelector('.type-visible');
    const locationVisible = document.querySelector('.location-visible');
    const yearVisible = document.querySelector('.year-visible');
    const directorVisible = document.querySelector('.director-visible');
    const executiveProducerVisible = document.querySelector('.executive-producer-visible');
    const producerVisible = document.querySelector('.producer-visible');
    const creativeDirectorVisible = document.querySelector('.creative-director-visible');
    const conceptVisible = document.querySelector('.concept-visible');
    const cameraVisible = document.querySelector('.camera-visible');
    const steadicamVisible = document.querySelector('.steadicam-visible');
    const firstACVisible = document.querySelector('.first-ac-visible');
    const secondACVisible = document.querySelector('.second-ac-visible');
    const droneOPVisible = document.querySelector('.drone-op-visible');
    const gafferVisible = document.querySelector('.gaffer-visible');
    const leadElectricVisible = document.querySelector('.lead-electric-visible');
    const stylingVisible = document.querySelector('.styling-visible');
    const makeUpHairVisible = document.querySelector('.make-up-hair-visible');
    const setDesignVisible = document.querySelector('.set-design-visible');
    const productionAssistanceVisible = document.querySelector('.prouduction-assistance-visible');
    const editVisible = document.querySelector('.edit-visible');
    const vfxVisible = document.querySelector('.vfx-visible');
    const colorGradingVisible = document.querySelector('.color-grading-visible');
    const threeDVisible = document.querySelector('.three-d-visible');
    const assistanceVisible = document.querySelector('.assistance-visible');
    const btsVisible = document.querySelector('.bts-visible');
    const soundDesignVisible = document.querySelector('.sound-design-visible');
    const productionCompanyVisible = document.querySelector('.production-company-visible');
    const labelVisible = document.querySelector('.label-visible');

    //replace comma in case there is multiple people involved for one position
    function replaceCommaWithBreak(text) {
        return text.replace(/, /g, '<br>');
    }
    
    projectTitleVisible.innerHTML = projectTitle;
    clientVisible.innerHTML = client;
    typeVisible.innerHTML = typeOfProject;
    durationVisible.innerHTML = duration + " min.";
    locationVisible.innerHTML = location;
    yearVisible.innerHTML = year;
    directorVisible.innerHTML = replaceCommaWithBreak(director);
    producerVisible.innerHTML = replaceCommaWithBreak(producer);
    executiveProducerVisible.innerHTML = replaceCommaWithBreak(executiveProducer);
    creativeDirectorVisible.innerHTML = replaceCommaWithBreak(creativeDirector);
    conceptVisible.innerHTML = replaceCommaWithBreak(concept);
    cameraVisible.innerHTML = replaceCommaWithBreak(camera);
    steadicamVisible.innerHTML = replaceCommaWithBreak(steadicam);
    firstACVisible.innerHTML = replaceCommaWithBreak(firstAC);
    secondACVisible.innerHTML = replaceCommaWithBreak(secondAC);
    droneOPVisible.innerHTML = replaceCommaWithBreak(droneOP);
    gafferVisible.innerHTML = replaceCommaWithBreak(gaffer);
    leadElectricVisible.innerHTML = replaceCommaWithBreak(leadElectric);
    stylingVisible.innerHTML = replaceCommaWithBreak(styling);
    makeUpHairVisible.innerHTML = replaceCommaWithBreak(makeUpHair);
    setDesignVisible.innerHTML = replaceCommaWithBreak(setDesign);
    productionAssistanceVisible.innerHTML = replaceCommaWithBreak(productionAssistance);
    editVisible.innerHTML = replaceCommaWithBreak(edit);
    vfxVisible.innerHTML = replaceCommaWithBreak(vfx);
    colorGradingVisible.innerHTML = replaceCommaWithBreak(colorgrading);
    threeDVisible.innerHTML = replaceCommaWithBreak(threeD);
    assistanceVisible.innerHTML = replaceCommaWithBreak(assistance);
    btsVisible.innerHTML = replaceCommaWithBreak(bts);
    soundDesignVisible.innerHTML = replaceCommaWithBreak(soundDesign);
    productionCompanyVisible.innerHTML = replaceCommaWithBreak(productionCompany);
    labelVisible.innerHTML = replaceCommaWithBreak(label);
    
    function hideEmptyElements() {
        // List of all elements that need to be checked
        const elements = [ 
            directorVisible, producerVisible, executiveProducerVisible, creativeDirectorVisible, conceptVisible, cameraVisible, 
            steadicamVisible, firstACVisible, secondACVisible, droneOPVisible, gafferVisible, leadElectricVisible, stylingVisible, makeUpHairVisible, 
            setDesignVisible, productionAssistanceVisible, editVisible, vfxVisible, 
            colorGradingVisible, threeDVisible, assistanceVisible, btsVisible, 
            soundDesignVisible, productionCompanyVisible, labelVisible
        ];
    
        // Iterate through each element and check its innerHTML
        elements.forEach(function(element) {
            if (element.innerHTML.trim() === "") {
                // If innerHTML is empty, set the closest ancestor with class 'info-grid-line' to display none
                const ancestorInfoGridLine = element.closest('.info-grid-line');
                if (ancestorInfoGridLine) {
                    ancestorInfoGridLine.style.display = 'none';
                }
            }
        });
    }
    
    // Call the function after setting innerHTML
    hideEmptyElements();


    // Update the numberDigits element with the current video number
    const visibleVideos = getVisibleVideos();
    const currentVideoIndex = findCurrentVideoIndex(visibleVideos, currentVideo);
    const numberDigits = document.querySelector('.number-digits');
    numberDigits.innerHTML = currentVideoIndex.toString().padStart(2, '0');


    if (previousVideo !== currentVideo) {

        previousVideo = currentVideo;
        isNewVideo = true;

        //Reset the none visible credit informations
        const allInfoGridLines = document.querySelectorAll('.info-grid-line');
        allInfoGridLines.forEach(function(line) {
        line.style.display = '';

        hideEmptyElements();
    });

    } else {
        isNewVideo = false;
    }

    // updateTimeline();
    updateCurrentVideoColor();

}

// Function to find and return the visible videos
function getVisibleVideos() {
    return Array.from(videos).filter(video => video.style.display !== 'none');
}

// Function to find the index of the current video within the visible videos
function findCurrentVideoIndex(visibleVideos, currentVideo) {
    return visibleVideos.indexOf(currentVideo) + 1; // +1 to make it 1-based index
}



//function to play video when its ready
function playVideoWhenReady(videoElement) {

    const tryPlay = () => {
        if (videoElement.readyState >= 3) {
            videoElement.play().catch(error => {
                console.warn('Video play request interrupted:', error);
                handleBatterySavingMode();
            });
        } else {
            videoElement.addEventListener('loadeddata', function onLoadedData() {
                videoElement.play().catch(error => {
                    console.warn('Video play request interrupted:', error);
                    handleBatterySavingMode();
                });
                videoElement.removeEventListener('loadeddata', onLoadedData);
            });
        }
    };

    // Try to play the video immediately
    tryPlay();

    let handleBatterySavingModeCounter = 0;

    // Function to handle video load failure
    function handleBatterySavingMode() {

        const batterySavingModeContainer = document.querySelector('.battery-saving-mode-container');

        handleBatterySavingModeCounter++;

        if (handleBatterySavingModeCounter > 1) {
            return;
        }

        batterySavingModeContainer.style.display = 'flex';

        setTimeout(() => {
            batterySavingModeContainer.style.display = 'none';
        }, 5000);  
    }

    // Retry if not ready
    const interval = setInterval(() => {
        if (videoElement.readyState >= 3) {
            clearInterval(interval);
            tryPlay();
        } 
    }, 500); // Retry every 500ms until the video is ready
}




// Get the timeline elements
const timeline = document.querySelector('.timeline');
const timeBar = document.getElementById('time-bar');
const timeCounter = document.querySelector('.time-counter-number');

let animationFrameId = null;

function updateTimeline() {

    const currentVideo = findCurrentVideo(videos);

    // If there is no current video, reset the time bar and time counter
    if (!currentVideo) {
        timeBar.style.width = '0%';
        timeCounter.innerHTML = formatTime(0);
        return;
    }

    // Determine which video to use based on element visibility
    const singleVideo = currentVideo.querySelector('.single-video');
    const singleVideoDesktop = currentVideo.querySelector('.single-video-desktop');

    if (singleVideo && getComputedStyle(singleVideo).display !== 'none') {
        videoElement = singleVideo;
    } else if (singleVideoDesktop && getComputedStyle(singleVideoDesktop).display !== 'none') {
        videoElement = singleVideoDesktop;
    }

    if (!videoElement) return;

    if (!(videoElement.readyState >= 2)) {
        return;
    }

    const currentTime = videoElement.currentTime;
    const duration = videoElement.duration;
    const percentage = (currentTime / duration) * 100;

    if (duration > 0) {
        timeBar.style.width = `calc(${percentage}%)`;

        const remainingTime = duration - currentTime;
        const formattedTime = formatTime(remainingTime);
        timeCounter.innerHTML = `${formattedTime}`;
    }

    // Disable transition from 100% width to 0% width
    if (percentage < 0.0001 || percentage > 99.9999) {

        console.log("Transition disabled");
        // Temporarily disable the transition
        timeBar.style.transition = 'none';
        timeBar.style.width = '0%';

        // Use setTimeout to re-enable the transition
        setTimeout(() => {
            timeBar.style.transition = ''; // Restores the default transition
        }, 50);
    }
}

// Update the timeline at a fixed interval (e.g., 100ms)
const updateTimelineInterval = 100; // in milliseconds
setInterval(updateTimeline, updateTimelineInterval);


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const tenths = Math.floor((seconds % 1) * 10);
    return `${minutes}<span class="colon">:</span>${secs < 10 ? '0' : ''}${secs}<span class="colon">:</span>${tenths}`;
}


document.addEventListener('DOMContentLoaded', updateCurrentVideo);
videoList.addEventListener('scroll', updateCurrentVideo);



//Color switch Button

const colorButton = document.querySelector('.color-button');
const colorButtonCircle = document.querySelector('.color-circle');

function changeColor() {

    const overlayBackground = document.querySelector('.overlay-background');
    const fullVideoControlsContainer = document.querySelectorAll('.full-video-controls-container');
    const fullVideoLoadingScreen = document.querySelectorAll('.full-video-loading-screen');
    const swipeArrowsContainer = document.querySelector('.swipe-arrows-container')

    const currentVideo = findCurrentVideo(videos);
    const currentColor = currentVideo.querySelector('.color');
    const currentColorHexCode = currentColor.innerHTML.trim();
    const currentColorHexCodeForButton = currentColorHexCode.substring(1);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (overlayTop.classList.contains('white')) {

                colorButtonCircle.classList.add('selected');

                overlayTop.classList.remove('white');
                overlayTop.classList.add('custom-color');

                overlayBottom.classList.remove('white');
                overlayBottom.classList.add('custom-color');

                overlayBackground.classList.remove('white');
                overlayBackground.classList.add('custom-color');

                swipeArrowsContainer.classList.remove('white');
                swipeArrowsContainer.classList.add('custom-color');

                fullVideoControlsContainer.forEach(container => {
                    container.classList.remove('white');
                    container.classList.add('custom-color');
                });

                fullVideoLoadingScreen.forEach(screen => {
                    screen.classList.remove('white');
                    screen.classList.add('custom-color');
                });

                randomizeHexCode();

            } else {

                colorButtonCircle.classList.remove('selected');


                overlayTop.classList.remove('custom-color');
                overlayTop.classList.add('white');
                
                overlayBottom.classList.remove('custom-color');
                overlayBottom.classList.add('white');

                overlayBackground.classList.remove('custom-color');
                overlayBackground.classList.add('white');

                swipeArrowsContainer.classList.remove('custom-color');
                swipeArrowsContainer.classList.add('white');

                fullVideoControlsContainer.forEach(container => {
                    container.classList.add('white');
                    container.classList.remove('custom-color');
                });

                fullVideoLoadingScreen.forEach(screen => {
                    screen.classList.add('white');
                    screen.classList.remove('custom-color');
                });

                randomizeHexCode();
            }
        });
    });
}

colorButton.addEventListener('click', changeColor);




//update custom color variable

const colorButtonCode = document.querySelector('.hex-code');
let previousColorHexCode = '';

function updateCurrentVideoColor() {
    const currentVideo = findCurrentVideo(videos);
    const currentColor = currentVideo.querySelector('.color');
    const currentColorHexCode = currentColor.innerHTML.trim();
    const currentColorHexCodeForButton = currentColorHexCode.substring(1);

    document.documentElement.style.setProperty('--primary-color', currentColorHexCode);

    // Convert the hex color to RGB
    const [r, g, b] = hexToRgb(currentColorHexCode);
    // Calculate the luminance
    const luminance = calculateLuminance(r, g, b);
    // Determine the secondary color based on luminance
    const secondaryColor = luminance > 0.1 ? '#000000' : '#d9d9d9';
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);

    // Update the Hex Code in the Hex Code
    if (!overlayTop.classList.contains('white') && isNewVideo) {
        randomizeHexCode();
    }
};

//randomize digits of HEX Code

function getRandomHexChar() {
    const hexChars = '0123456789ABCDEF';
    return hexChars[Math.floor(Math.random() * 16)];
}

//randomize Hex Code for transition between 2 different colors of video overlay

function randomizeHexCode() {
    let interval;
    let counter = 0;

    interval = setInterval(() => {
        let randomHex = '';
        for (let i = 0; i < 6; i++) {
            randomHex += getRandomHexChar();
        }
        colorButtonCode.innerHTML = randomHex;
        counter += 1;
        
        if (counter >= 7) { // 10 intervals of 0.05 seconds = 0.5 seconds
            clearInterval(interval);
        }
    }, 50);

    const currentVideo = findCurrentVideo(videos);
    const currentColor = currentVideo.querySelector('.color');
    const currentColorHexCode = currentColor.innerHTML.trim();
    const currentColorHexCodeForButton = currentColorHexCode.substring(1);

    if (colorButtonCircle.classList.contains('selected')) {
        setTimeout(() => {

            colorButtonCode.innerHTML = currentColorHexCodeForButton;
            previousColorHexCode = currentColorHexCode; // Update the previous color
        }, 500); // Update hex code after 0.5 seconds
    } else {
        setTimeout(() => {
            colorButtonCode.innerHTML = 'FFFFFF';
        }, 500);
    }
}



//check if type should be white or black depending on the brightness of the custom color

// Function to convert hex to RGB
function hexToRgb(hex) {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');
    // Parse the r, g, b values
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r, g, b];
}

// Function to calculate luminance
function calculateLuminance(r, g, b) {
    // Convert sRGB to linear RGB
    let a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    // Calculate the luminance
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}



//About Information


// Function to toggle the visible class on about button
function toggleVisibleClassAbout() {

    hideArrows();

    //Check if anything else is active at the moment
    const projectInformationVisible = plusButton.classList.contains('visible');
    const indexVisible = indexButton.classList.contains('visible');
    const filterVisible = filterButton.classList.contains('visible')
    const aboutVisible = aboutButton.classList.contains('visible')

    if (projectInformationVisible || indexVisible || filterVisible) {
        return; // Exit the function early if any condition is not met
    }

    const overlayBackground = document.querySelector('.overlay-background');
    const aboutInfo = document.querySelector('.about-info');
    const aboutText = document.querySelector('.about-text');
    const body = document.querySelector('.body');

    const projectTitleVisible = document.querySelector('.project-title-visible');
    const clientVisible = document.querySelector('.client-visible');


    if (!aboutButton.classList.contains('visible')) {

        aboutButton.classList.add('visible');
        overlayTop.classList.add('about-displayed');
        overlayBottom.classList.add('about-displayed');

        aboutButton.innerHTML = 'Close'; // Change text to 'Close'

        body.classList.add('about-opening-step-1');

        videoList.classList.add('no-scroll');



        setTimeout(() => {

            body.classList.remove('about-opening-step-1');
            body.classList.add('about-opening-step-2');

            overlayBackground.classList.remove('not-visible')
            overlayBackground.classList.add('opening-step')
    
            setTimeout(() => {
                overlayBackground.classList.remove('opening-step');
                overlayBackground.classList.add('visible');
            }, 100);

        }, 300);

        setTimeout(() => {

            body.classList.remove('about-opening-step-2');
            body.classList.add('about-opening-step-3');

            
        }, 800);

        setTimeout(() => {

            body.classList.remove('about-opening-step-3');
            body.classList.add('about-opening-step-4');
            
        }, 1300);


    } else {

        aboutButton.innerHTML = 'About'; // Change text to 'Close'

        body.classList.remove('about-opening-step-4');
        body.classList.add('about-closing-step-1');

        setTimeout(() => {

            body.classList.remove('about-closing-step-1');
            body.classList.add('about-closing-step-2');

            overlayBackground.classList.remove('visible')
            overlayBackground.classList.add('opening-step')
    
            setTimeout(() => {
                overlayBackground.classList.remove('opening-step');
                overlayBackground.classList.add('not-visible');
            }, 100);   

        }, 500);

        setTimeout(() => {

            aboutButton.classList.remove('visible');

            overlayTop.classList.remove('about-displayed');
            overlayBottom.classList.remove('about-displayed');
                
            body.classList.remove('about-closing-step-2');

        }, 1000);

        setTimeout(() => {

            videoList.classList.remove('no-scroll');

        }, 1800);

    }
}

// Add click event listener to the about-button element
aboutButton.addEventListener('click', toggleVisibleClassAbout);




//replace every comma in clients list with a linebreak

document.addEventListener('DOMContentLoaded', function() {
    // Get the container element with the class 'about-clients'
    const aboutClients = document.querySelector('.about-clients');

    // Check if the container exists
    if (aboutClients) {
        // Get the inner HTML of the container
        const clientsList = aboutClients.innerHTML;

        // Replace every ", " with "<br>"
        const updatedClientsList = clientsList.replace(/, /g, '<br>');

        // Set the updated content back to the container
        aboutClients.innerHTML = updatedClientsList;
    }
});










//Open Filter

// Function to toggle the visible class on about button
function toggleVisibleClassFilter() {
    console.log('toggleVisibleClassFilter');
    //Check if anything else is active at the moment
    const projectInformationVisible = plusButton.classList.contains('visible');
    const indexVisible = indexButton.classList.contains('visible');
    const filterVisible = filterButton.classList.contains('visible')
    const aboutVisible = aboutButton.classList.contains('visible')

    if (projectInformationVisible || aboutVisible) {
        return; // Exit the function early if any condition is not met
    }

    const overlayBackground = document.querySelector('.overlay-background');
    const filterOptions = document.querySelector('.filter-options');
    const body = document.querySelector('.body');


    if (!filterButton.classList.contains('visible')) {

        filterButton.classList.add('visible');

        overlayBackground.classList.remove('not-visible')
        overlayBackground.classList.add('opening-step')

        videoList.classList.add('no-scroll');

        setTimeout(() => {
            overlayBackground.classList.remove('opening-step');
            overlayBackground.classList.add('visible');
        }, 100);

        overlayTop.classList.add('filter-displayed');
        overlayBottom.classList.add('filter-displayed');

        body.classList.add('filter-opening-step-1');

        filterButton.innerHTML = 'Close'; // Change text to 'Close'

        setTimeout(() => {
            body.classList.remove('filter-opening-step-1');
            body.classList.add('filter-opening-step-2');

        }, 500);

    } else {

        body.classList.remove('filter-opening-step-2');
        body.classList.add('filter-opening-step-1');

        filterButton.innerHTML = 'Filter'; // Change text to 'Close'


        setTimeout(() => {

            filterButton.classList.remove('visible');

            overlayBackground.classList.remove('visible')
            overlayBackground.classList.add('opening-step')
    
            setTimeout(() => {
                overlayBackground.classList.remove('opening-step');
                overlayBackground.classList.add('not-visible');
            }, 100);

            overlayTop.classList.remove('filter-displayed');
            overlayBottom.classList.remove('filter-displayed');
            
            body.classList.remove('filter-opening-step-1');

            videoList.classList.remove('no-scroll');
    
        }, 500);

    }
}

filterButton.addEventListener('click', toggleVisibleClassFilter);



document.addEventListener('DOMContentLoaded', () => {
    const filterOptions = document.querySelectorAll('.filter-option');
    const amountOfVideos = document.querySelector('.amount-digits');

    filterOptions.forEach(option => {
        option.addEventListener('click', function () {
            if (!this.classList.contains('selected')) {
                // Remove 'selected' class from all filter options and their children
                filterOptions.forEach(option => {
                    option.classList.remove('selected');
                    option.querySelector('.filter-circle').classList.remove('selected');
                    option.querySelector('.filter-word').classList.remove('selected');
                });
                // Add 'selected' class to the clicked filter option and its children
                this.classList.add('selected');
                this.querySelector('.filter-circle').classList.add('selected');
                this.querySelector('.filter-word').classList.add('selected');

                // Filter the videos based on the selected filter
                filterVideos();
                updateCurrentVideo();
                updateIndexNumbers();
            }
        });
    });

    function filterVideos() {
        const selectedFilter = document.querySelector('.filter-option.selected .filter-word').innerHTML;
        let visibleCount = 0;

        videos.forEach(video => {
            const typeOfProject = video.querySelector('.type-of-project').innerHTML;
            if (selectedFilter === 'All' || typeOfProject === selectedFilter) {
                video.style.display = '';
                visibleCount++;
            } else {
                video.style.display = 'none';
            }
        });

        amountOfVideos.innerHTML = visibleCount.toString().padStart(2, '0');

    }

    // Initial filter on page load
    filterVideos();
});





//PROJECT INFORMATIONS

function openProjectInformations() {

    hideArrows();

    //Check if anything else is active at the moment
    const indexVisible = indexButton.classList.contains('visible');
    const filterVisible = filterButton.classList.contains('visible')
    const aboutVisible = aboutButton.classList.contains('visible')

    if (aboutVisible || indexVisible || filterVisible) {
        return; // Exit the function early if any condition is not met
    }

    const overlayBackground = document.querySelector('.overlay-background');
    const body = document.querySelector('.body');
    const projectInfoAll = document.querySelector('.project-info-all');
    const fullVideoButtonOpacity = document.querySelector('.full-video-button');
    console.log(fullVideoButton);

    const projectInformationVisible = plusButton.classList.contains('visible');

    if (!projectInformationVisible) {

        plusButton.classList.remove('not-visible');
        plusButton.classList.add('visible');

        videoList.classList.add('no-scroll');

        overlayBackground.classList.remove('not-visible')
        overlayBackground.classList.add('opening-step')

        setTimeout(() => {
            overlayBackground.classList.remove('opening-step');
            overlayBackground.classList.add('visible');
        }, 100);

        overlayTop.classList.add('info-displayed');
        overlayBottom.classList.add('info-displayed');

        body.classList.add('info-opening-step-1');

        setTimeout(() => {
            body.classList.remove('info-opening-step-1');
            body.classList.add('info-opening-step-2');
        }, 500);

        setTimeout(() => {
            body.classList.remove('info-opening-step-2');
            body.classList.add('info-opening-step-3');
        }, 800);


    } else {

        body.classList.remove('info-opening-step-3');
        body.classList.add('info-closing-step-1');

        plusButton.classList.remove('visible');
        plusButton.classList.add('not-visible');

        setTimeout(() => {
    
            overlayBackground.classList.remove('visible')
            overlayBackground.classList.add('opening-step')
    
            setTimeout(() => {
                overlayBackground.classList.remove('opening-step');
                overlayBackground.classList.add('not-visible');
            }, 100);
    
            // projectInfoAll.classList.remove('not-visible')
            // projectInfoAll.classList.add('visible')
    
            overlayTop.classList.remove('info-displayed');
            overlayBottom.classList.remove('info-displayed');
    
            body.classList.remove('info-closing-step-1');
            body.classList.add('info-closing-step-2');

        }, 300);

        setTimeout(() => {
    
            body.classList.remove('info-closing-step-2');
            body.classList.add('info-closing-step-3');

        }, 800);

        setTimeout(() => {
    
            body.classList.remove('info-closing-step-3');
            videoList.classList.remove('no-scroll');

        }, 1000);

    }
};

plusButton.addEventListener('click', openProjectInformations);

singleVideos.forEach(video => {
    video.addEventListener('click', openProjectInformations);
});
singleVideosDesktop.forEach(video => {
    video.addEventListener('click', openProjectInformations);
});

//View full video

const fullVideoButton = document.querySelector('.full-video-button');

// Play and Pause Button

function openFullVideo() {

    const currentVideo = findCurrentVideo(videos);
    const fullVideoContainer = currentVideo.querySelector('.full-video-container');
    const fullVideo = currentVideo.querySelector('.full-video');
    console.log('fullVideo', fullVideo);

    const fullVideoLoadingScreen = currentVideo.querySelector('.full-video-loading-screen');
    const fullVideoControlsContainer = currentVideo.querySelector('.full-video-controls-container');
    const fullVideoPauseButton = currentVideo.querySelector('.full-video-pause-button');
    const closeFullVideoButton = currentVideo.querySelector('.full-video-close-button');
    const body = document.querySelector('.body');
    
    // Ensure we have found the visible video
    if (!fullVideo) {
        console.error('No visible video element found');
        return;
    }

    let currentVideoElement;

    // Determine which video to use based on element visibility
    const singleVideo = currentVideo.querySelector('.single-video');
    const singleVideoDesktop = currentVideo.querySelector('.single-video-desktop');

    if (singleVideo && getComputedStyle(singleVideo).display !== 'none') {
        currentVideoElement = singleVideo;
    } else if (singleVideoDesktop && getComputedStyle(singleVideoDesktop).display !== 'none') {
        currentVideoElement = singleVideoDesktop;
    }

    currentVideoElement.pause();

    fullVideoButton.classList.add('full-video-displayed');
    body.classList.add('full-video-opening-step-1');
    console.log('opening-step-1 added');


    // Lazy load Vimeo iframe by setting the src
    if (fullVideo.dataset.src && !fullVideo.src) {
        fullVideo.src = fullVideo.dataset.src;
        fullVideo.removeAttribute('data-src');
    }

    setTimeout(() => {
        body.classList.remove('full-video-opening-step-1');
        body.classList.add('full-video-opening-step-2');
        console.log('opening-step-2 added');
    }, 250);


    setTimeout(() => {
        body.classList.remove('full-video-opening-step-2');
        body.classList.add('full-video-opening-step-3');
        body.classList.remove('info-opening-step-3');
        console.log('opening-step-3 added');


        // Check if this video has been opened before
        if (!fullVideoContainer.hasAttribute('data-opened')) {
            fullVideoLoadingScreen.classList.add('displayed', 'opacity', 'blur');
            console.log('fullVideoLoadingScreen added', fullVideoLoadingScreen);

            if (isMobileDevice()) {
                console.log('Full Video Controls visible added');
                fullVideoControlsContainer.classList.add('visible');
            }

            setTimeout(() => {
                fullVideoLoadingScreen.classList.remove('blur');
            }, 10);
            
            // Mark this video as opened
            fullVideoContainer.setAttribute('data-opened', 'true');
        }

        if (!isMobileDevice()) {
            console.log('Desktop device detected');

            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) { // Firefox
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
                document.documentElement.msRequestFullscreen();
            } 
        }

    }, 500);

    setTimeout(() => {

        body.classList.remove('full-video-opening-step-3');
        body.classList.add('full-video-opening-step-4');
        console.log('opening-step-4 added');

        updateFullVideoTimeline(player);

        // Start the interval to update the timeline
        player.updateInterval = setInterval(() => {
            updateFullVideoTimeline(player);
        }, 100);

        setupSeekBar(player);

    }, 1000);

    // Add event listeners for mousemove and touchstart
    let controlsTimeout;

    function showControls() {
        console.log('showControls');
        fullVideoControlsContainer.classList.add('visible');
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => {
            fullVideoControlsContainer.classList.remove('visible');
        }, 2000);
    }

    player = new Vimeo.Player(fullVideo);

    player.ready().then(() => {
        console.log("Played");
        return player.play(); // This now works because it's called after a user interaction
    }).catch(error => {
        console.log("Play error:", error);
    });

    player.on('bufferstart', () => {
        console.log('Buffering started...');
        fullVideoLoadingScreen.classList.add('displayed', 'opacity', 'blur');

        if (!isMobileDevice()) {
            console.log('Full Video Controls visible removed');
            fullVideoControlsContainer.classList.remove('visible');
        }

        document.removeEventListener('mousemove', showControls);
        document.removeEventListener('touchstart', showControls);

        setTimeout(() => {
            fullVideoLoadingScreen.classList.remove('blur');
        }, 10);

        player.play();
    });

    player.on('bufferend', () => {
        console.log('Buffering ended...');
        setTimeout(() => {
            fullVideoLoadingScreen.classList.remove('displayed', 'opacity', 'blur');
            fullVideoLoadingScreen.classList.add('blur');
            document.addEventListener('mousemove', showControls);
            document.addEventListener('touchstart', showControls);

        }, 500);
    });

    player.on('play', () => {
        updatePlayPauseButton(player);
    });

    player.on('pause', () => {

        if (!isMobileDevice()) {
            showControls();
            updatePlayPauseButton(player);
        } else {
            updatePlayPauseButton(player);
            fullVideoControlsContainer.classList.add('visible');
        }
    });

    player.on('ended', () => {

        if (!isMobileDevice()) {
            showControls();
            updatePlayPauseButton(player);
        } else {
            console.log('Full Video Controls visible added');
            updatePlayPauseButton(player);
            fullVideoControlsContainer.classList.add('visible');
        }
    });

    player.on('playing', () => {
        console.log('Video is actually playing...');

        if (isMobileDevice()) {
            console.log('Mobile device detected');

            player.requestFullscreen().catch(error => {
                console.log('Fullscreen request failed:', error);
            });
            console.log('Full Video Controls visible removed');
            fullVideoControlsContainer.classList.remove('visible');
        }
    });

    // Store all event handler references on the player object
    player.eventHandlers = {
        showControls: showControls,
        togglePlayPause: () => togglePlayPause(player),
        closeFullVideo: () => closeFullVideo(player),
        handleKeydown: (event) => {
            if (event.key === 'Escape') {
                closeFullVideo(player);
            }
        }
    };

    // Add event listeners using the stored references
    document.addEventListener('mousemove', player.eventHandlers.showControls);
    document.addEventListener('touchstart', player.eventHandlers.showControls);
    document.addEventListener('keydown', player.eventHandlers.handleKeydown);
    fullVideo.addEventListener('touchstart', showControls);
    fullVideoPauseButton.addEventListener('click', player.eventHandlers.togglePlayPause);
    closeFullVideoButton.addEventListener('click', player.eventHandlers.closeFullVideo);
}

fullVideoButton.addEventListener('click', openFullVideo);



// Play and Pause Button Logic

function togglePlayPause(player) {

    const currentVideo = findCurrentVideo(videos);
    const fullVideoPauseSign = currentVideo.querySelector('.full-video-pause-sign');
    const fullVideoPlaySign = currentVideo.querySelector('.full-video-play-sign');
    
    // Get the player state
    player.getPaused().then(paused => {
        if (paused) {
            player.play();
            fullVideoPauseSign.style.display = 'flex';
            fullVideoPlaySign.style.display = 'none';
        } else {
            player.pause();
            fullVideoPauseSign.style.display = '';
            fullVideoPlaySign.style.display = '';
        }
    }).catch(error => {
        console.error('Error toggling play/pause:', error);
    });
}

function updatePlayPauseButton(player) {

    const currentVideo = findCurrentVideo(videos);
    const fullVideoPauseSign = currentVideo.querySelector('.full-video-pause-sign');
    const fullVideoPlaySign = currentVideo.querySelector('.full-video-play-sign');
    
    // Get the player state
    player.getPaused().then(paused => {
        if (paused) {
            fullVideoPauseSign.style.display = '';
            fullVideoPlaySign.style.display = '';

        } else {
            fullVideoPauseSign.style.display = 'flex';
            fullVideoPlaySign.style.display = 'none';
        }
    }).catch(error => {
        console.error('Error toggling play/pause:', error);
    });
}




//Closing Full Video

function closeFullVideo(player) {

    const currentVideo = findCurrentVideo(videos);
    const fullVideoControlsContainer = currentVideo.querySelector('.full-video-controls-container');
    const body = document.querySelector('.body');
    const fullVideoPauseButton = currentVideo.querySelector('.full-video-pause-button');
    const closeFullVideoButton = currentVideo.querySelector('.full-video-close-button');
    const timeBarFullVideoOutline = currentVideo.querySelector('.time-bar-full-video-outline');

    let currentVideoElement;

    // Determine which video to use based on element visibility
    const singleVideo = currentVideo.querySelector('.single-video');
    const singleVideoDesktop = currentVideo.querySelector('.single-video-desktop');

    if (singleVideo && getComputedStyle(singleVideo).display !== 'none') {
        currentVideoElement = singleVideo;
        currentVideoElement.play();
    } else if (singleVideoDesktop && getComputedStyle(singleVideoDesktop).display !== 'none') {
        currentVideoElement = singleVideoDesktop;
        currentVideoElement.play();
    }

    body.classList.remove('full-video-opening-step-4');
    body.classList.add('full-video-opening-step-3');

    fullVideoControlsContainer.classList.remove('visible');

    player.pause().catch(error => {
        console.error("Error pausing video:", error);
    });

    player.off('play');
    player.off('pause');
    player.off('ended');
    player.off('bufferstart');
    player.off('bufferend');

    if (player.updateInterval) {
        clearInterval(player.updateInterval);
    }

    document.removeEventListener('mousemove', player.eventHandlers.showControls);
    document.removeEventListener('touchstart', player.eventHandlers.showControls);
    document.removeEventListener('keydown', player.eventHandlers.handleKeydown);
    fullVideoPauseButton.removeEventListener('click', player.eventHandlers.togglePlayPause);
    closeFullVideoButton.removeEventListener('click', player.eventHandlers.closeFullVideo);
    timeBarFullVideoOutline.removeEventListener('click', player.eventHandlers.seekVideo);

    setTimeout(() => {

        body.classList.remove('full-video-opening-step-3');
        body.classList.add('full-video-opening-step-2');

        body.classList.add('info-opening-step-3');

    }, 250);

    setTimeout(() => {

        if (!isMobileDevice()) {
            console.log('exitFullscreen');
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }
        }

        currentVideoElement.play();
        updateTimeline();

    }, 500);

    setTimeout(() => {

        body.classList.remove('full-video-opening-step-2');
        body.classList.add('full-video-opening-step-1');

    }, 750);

    setTimeout(() => {

        player.setCurrentTime(0).catch(error => {
            console.error("Error resetting video time:", error);
        });

        player = null;

        body.classList.remove('full-video-opening-step-1');
        updateCurrentVideo();

    }, 1000);
}




// Update Timeline for Full video

function updateFullVideoTimeline(player) {
    const currentVideo = findCurrentVideo(videos);
    if (!currentVideo) return;

    const timeBarFullVideo = currentVideo.querySelector('.time-bar-full-video');
    const timeCounterNumberFullVideoLeft = currentVideo.querySelector('.time-counter-number-full-video-left');
    const timeCounterNumberFullVideoRight = currentVideo.querySelector('.time-counter-number-full-video-right');

    // Get current time and duration using Vimeo Player API
    Promise.all([
        player.getCurrentTime(),
        player.getDuration()
    ]).then(([currentTime, duration]) => {
        if (duration > 0) {
            const percentage = (currentTime / duration) * 100;
            timeBarFullVideo.style.width = `${percentage}%`;

            // Calculate and format the remaining time
            const remainingTime = duration - currentTime;
            const formattedTimeLeft = formatTimeFullVideo(currentTime);
            const formattedTimeRight = formatTimeFullVideo(remainingTime);
            timeCounterNumberFullVideoLeft.innerHTML = `${formattedTimeLeft}`;
            timeCounterNumberFullVideoRight.innerHTML = `${formattedTimeRight}`;
        }
    }).catch(error => {
        console.error('Error updating timeline:', error);
    });
}

function setupSeekBar(player) {

    const currentVideo = findCurrentVideo(videos);
    if (!currentVideo) return;

    const timeBarFullVideoOutline = currentVideo.querySelector('.time-bar-full-video-outline');

    // Event listener for seeking in the video
    player.eventHandlers.seekVideo = (event) => {
        const outlineRect = timeBarFullVideoOutline.getBoundingClientRect();
        const clickPosition = event.clientX - outlineRect.left;
        const outlineWidth = outlineRect.width;
        const clickPercentage = clickPosition / outlineWidth;

        // Get the duration and set the new time using Vimeo Player API
        player.getDuration().then(duration => {
            const newTime = duration * clickPercentage;
            player.setCurrentTime(newTime).catch(error => {
                console.error('Error seeking video:', error);
            });
        }).catch(error => {
            console.error('Error getting video duration:', error);
        });
    };

    // Add the event listener using the stored reference
    timeBarFullVideoOutline.addEventListener('click', player.eventHandlers.seekVideo);
}





// Function to format time in minutes, seconds, and tenths of a second
function formatTimeFullVideo(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const tenths = Math.floor((seconds % 1) * 10);

    // Ensure minutes and seconds have two digits
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = secs.toString().padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}:${tenths}`;
}





//Index

function openIndex() {

    hideArrows();

    //Check if anything else is active at the moment
    const projectInformationVisible = plusButton.classList.contains('visible');
    const filterVisible = filterButton.classList.contains('visible')
    const aboutVisible = aboutButton.classList.contains('visible')

    const lazyImages = document.querySelectorAll('.lazy-image');
    lazyImages.forEach((lazyImage) => {
        if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
        }
    });

    if (projectInformationVisible || aboutVisible || filterVisible) {
        return; // Exit the function early if any condition is not met
    }

    const body = document.querySelector('.body');
    const indexVisible = indexButton.classList.contains('visible');

    if (!indexVisible) {

        indexButton.classList.add('visible');
        
        body.classList.add('index-opening-step-1');

        indexButton.innerHTML = 'Close'; // Change text to 'Close'

        
        videos.forEach(video => {
            const videoElement = video.querySelector('video');
            videoElement.pause();
        });


        setTimeout(() => {
            body.classList.remove('index-opening-step-1');
            body.classList.add('index-opening-step-2');
        }, 500);
        
        setTimeout(() => {
            body.classList.remove('index-opening-step-2');
            body.classList.add('index-opening-step-3');

            videoList.scrollTo({
                top: 0,
                behavior: 'auto'
            });
        }, 1000);

        setTimeout(() => {
            body.classList.remove('index-opening-step-3');
            body.classList.add('index-opening-step-4');
        }, 1500);

        setTimeout(() => {
            body.classList.remove('index-opening-step-4');
            body.classList.add('index-opening-step-5');
        }, 1800);

    } else {

        indexButton.innerHTML = 'Overview';

        indexButton.classList.remove('visible');
        
        body.classList.remove('index-opening-step-5');
        body.classList.add('index-opening-step-4');    

        setTimeout(() => {
            body.classList.remove('index-opening-step-4');
            body.classList.add('index-opening-step-3');
        }, 300);
        
        setTimeout(() => {
            body.classList.remove('index-opening-step-3');
            body.classList.add('index-opening-step-2');

        }, 600);

        setTimeout(() => {
            body.classList.remove('index-opening-step-2');
            body.classList.add('index-opening-step-1');
        }, 1100);

        setTimeout(() => {
            body.classList.remove('index-opening-step-1');
            updateCurrentVideo();
        }, 1600);
    }
}

indexButton.addEventListener('click', openIndex);




// Function to scroll the parent container to the top of the viewport and remove animation classes
function closeIndex(singleVideoContainer) {

    const body = document.querySelector('.body');
    const indexVisible = indexButton.classList.contains('visible');

    if (indexVisible) {

        indexButton.innerHTML = 'Overview';

        indexButton.classList.remove('visible');
        
        body.classList.remove('index-opening-step-5');
        body.classList.add('index-opening-step-4');    

        setTimeout(() => {
            body.classList.remove('index-opening-step-4');
            body.classList.add('index-opening-step-3');
        }, 300);
        
        setTimeout(() => {
            body.classList.remove('index-opening-step-3');
            body.classList.add('index-opening-step-2');

        }, 600);

        setTimeout(() => {
            body.classList.remove('index-opening-step-2');
            body.classList.add('index-opening-step-1');
            singleVideoContainer.scrollIntoView();

        }, 1100);

        setTimeout(() => {
            body.classList.remove('index-opening-step-1');
            updateCurrentVideo();
        }, 1600);
    }

}



// Add event listeners to the .single-video-container elements
document.querySelectorAll('.single-video-container').forEach(singleVideoContainer => {
    singleVideoContainer.addEventListener('click', function() {
        closeIndex(this);
    });
});

//asign correct number to Index Info of videos

document.addEventListener('DOMContentLoaded', function() {

    updateIndexNumbers();

});


// Function to update index numbers based on visible videos
function updateIndexNumbers() {
    const visibleVideos = getVisibleVideos();
    visibleVideos.forEach((video, index) => {
        const indexNumberElement = video.querySelector('.number-index');
        if (indexNumberElement) {
            indexNumberElement.innerHTML = (index + 1).toString().padStart(2, '0');
        }
    });
}

function closeAll() {

    console.log('closeAll');
    //Check if anything else is active at the moment
    const projectInformationVisible = plusButton.classList.contains('visible');
    const indexVisible = indexButton.classList.contains('visible');
    const filterVisible = filterButton.classList.contains('visible')
    const aboutVisible = aboutButton.classList.contains('visible')

    if (indexVisible) {
        openIndex();
    } else if (filterVisible) {
        toggleVisibleClassFilter();
    } else if (aboutVisible) {
        toggleVisibleClassAbout();
    } else if (projectInformationVisible) {
        openProjectInformations();
    }
}

websiteTitle.addEventListener('click', closeAll);












